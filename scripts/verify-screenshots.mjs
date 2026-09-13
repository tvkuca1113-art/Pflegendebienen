import { chromium } from 'playwright';
import path from 'node:path';
import { mkdirSync } from 'node:fs';

const OUT = process.env.SHOT_DIR || 'screenshots';
const BASE = process.env.BASE || 'http://localhost:4321';
const routes = (process.env.ROUTES ||
  '/,/leistungen/,/leistungen/grundpflege/,/leistungen/behandlungspflege/,' +
  '/leistungen/haushalt-betreuung/,/leistungen/verhinderungspflege/,/pflegeberatung/,' +
  '/kosten-finanzierung/,/muenchen-west/,/germering/,/ueber-uns/,/kontakt/,' +
  '/impressum/,/datenschutz/,/404.html').split(',');
const viewports = [
  { name: 'desktop', width: 1440, height: 1000, dsf: 1 },
  { name: 'mobile', width: 390, height: 844, dsf: 2, mobile: true },
];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const issues = [];

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dsf,
    isMobile: !!vp.mobile,
    hasTouch: !!vp.mobile,
    locale: 'de-DE',
  });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => issues.push(`[js-error ${vp.name}] ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') issues.push(`[console ${vp.name}] ${m.text()}`); });
  page.on('response', (r) => { if (r.status() >= 400) issues.push(`[http ${r.status()} ${vp.name}] ${r.url()}`); });

  for (const route of routes) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    // Scroll the whole page so lazy images and reveals actually resolve.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.waitForLoadState('networkidle');
    // fullPage capture can skip lazily-decoded images: force decode first.
    await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('img')];
      imgs.forEach((i) => { i.loading = 'eager'; i.decoding = 'sync'; });
      await Promise.all(imgs.map((i) => (i.decode ? i.decode().catch(() => {}) : null)));
    });
    await page.waitForTimeout(900);
    // horizontal overflow check
    const overflow = await page.evaluate(() => {
      const de = document.documentElement;
      const wide = [...document.querySelectorAll('body *')]
        .filter((el) => el.getBoundingClientRect().right > de.clientWidth + 2)
        .slice(0, 6)
        .map((el) => el.tagName.toLowerCase() + '.' + (el.className?.toString().split(' ')[0] || ''));
      return { scrollW: de.scrollWidth, clientW: de.clientWidth, wide };
    });
    if (overflow.scrollW > overflow.clientW + 1) {
      issues.push(`[overflow ${vp.name} ${route}] ${overflow.scrollW}>${overflow.clientW} :: ${overflow.wide.join(', ')}`);
    }
    const slug = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-|-$/g, '');
    await page.screenshot({ path: path.join(OUT, `${slug}-${vp.name}.png`), fullPage: true });
  }
  await ctx.close();
}
await browser.close();
console.log(issues.length ? issues.join('\n') : 'NO ISSUES DETECTED');
