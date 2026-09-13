import { chromium } from 'playwright';
const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE = 'http://127.0.0.1:4321';
const out = [];
const ok = (m) => out.push('PASS  ' + m);
const bad = (m) => out.push('FAIL  ' + m);

const browser = await chromium.launch({ executablePath: EXE });

/* ---------- desktop: guide, keyboard, links ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 }, locale: 'de-DE' });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });

  // 1. Guide collapses to placeholder with JS
  const visibleResults = await page.locator('[data-guide-result]:visible').count();
  visibleResults === 0 ? ok('guide: results collapsed on load') : bad(`guide: ${visibleResults} results visible on load`);
  const ph = await page.locator('[data-guide-placeholder]').isVisible();
  ph ? ok('guide: placeholder shown') : bad('guide: placeholder missing');

  // 2. Selecting an option reveals exactly one result
  await page.locator('label[for="guide-verordnet"]').click();
  await page.waitForTimeout(200);
  const shown = await page.locator('[data-guide-result]:visible').count();
  const title = await page.locator('[data-guide-result="verordnet"] h3').innerText();
  shown === 1 && title.includes('Behandlungspflege')
    ? ok(`guide: one result shown ("${title}")`)
    : bad(`guide: ${shown} results, title "${title}"`);

  // 3. Radio is keyboard reachable and arrow keys move selection
  await page.locator('#guide-verordnet').focus();
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(200);
  const checked = await page.locator('[data-guide-radio]:checked').getAttribute('value');
  checked === 'entlastung' ? ok('guide: arrow key moves selection') : bad(`guide: arrow key gave "${checked}"`);

  // 4. Area selector
  await page.selectOption('[data-area-select]', 'Laim');
  await page.waitForTimeout(150);
  let msg = await page.locator('[data-area-result]').innerText();
  msg.includes('veröffentlichten Einsatzgebiet') ? ok('area select: match message') : bad('area select: ' + msg);
  await page.selectOption('[data-area-select]', '__other');
  await page.waitForTimeout(150);
  msg = await page.locator('[data-area-result]').innerText();
  msg.includes('direkt bei uns an') ? ok('area select: no-match message') : bad('area select other: ' + msg);

  // 5. Skip link is the first tab stop on a fresh load and becomes visible
  const fresh = await ctx.newPage();
  await fresh.goto(BASE + '/', { waitUntil: 'networkidle' });
  await fresh.keyboard.press('Tab');
  await fresh.waitForTimeout(400); // let the slide-in transition finish
  const focused = await fresh.evaluate(() => {
    const el = document.activeElement;
    return { cls: el?.className, txt: el?.textContent?.trim(), top: el?.getBoundingClientRect().top };
  });
  focused.cls === 'skip-link' && focused.top >= 0
    ? ok(`skip link is first tab stop and visible when focused (top ${Math.round(focused.top)})`)
    : bad(`first tab stop: ${JSON.stringify(focused)}`);
  // ...and it actually moves focus into <main>
  await fresh.keyboard.press('Enter');
  await fresh.waitForTimeout(250);
  const landed = await fresh.evaluate(() => document.activeElement?.id || location.hash);
  landed.includes('inhalt') ? ok('skip link moves focus to main content') : bad('skip link target: ' + landed);
  await fresh.close();

  // 6. FAQ details work without JS help
  await page.locator('.faq__item').first().locator('summary').click();
  await page.waitForTimeout(150);
  const open = await page.locator('.faq__item').first().evaluate((e) => e.hasAttribute('open'));
  open ? ok('faq: accordion opens') : bad('faq: accordion did not open');

  // 7. Contact links
  const tel = await page.locator('a[href^="tel:"]').first().getAttribute('href');
  const wa = await page.locator('a[href*="wa.me"]').first().getAttribute('href');
  const mail = await page.locator('a[href^="mailto:"]').first().getAttribute('href');
  tel === 'tel:+498954637889' ? ok('tel link correct') : bad('tel link: ' + tel);
  wa?.startsWith('https://wa.me/4917622906287?text=') ? ok('whatsapp link correct with neutral text') : bad('wa: ' + wa);
  mail?.startsWith('mailto:info@pflegendebienen.de') ? ok('mail link correct') : bad('mail: ' + mail);

  // 8. Logo aspect ratio preserved and size in range
  const logo = await page.locator('.brand__logo').evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { w: r.width, h: r.height, nw: el.naturalWidth, nh: el.naturalHeight };
  });
  const ratioOk = Math.abs(logo.w / logo.h - logo.nw / logo.nh) < 0.02;
  const sizeOk = logo.w >= 120 && logo.w <= 155;
  ratioOk && sizeOk
    ? ok(`logo ${Math.round(logo.w)}×${Math.round(logo.h)} css from ${logo.nw}×${logo.nh} original, ratio preserved`)
    : bad(`logo ${JSON.stringify(logo)}`);

  // 9. Touch target sizes for primary controls
  const small = await page.evaluate(() => {
    const sel = 'a.btn, button, .nav__link, .arrow-link, .contact-bar__action, summary';
    return [...document.querySelectorAll(sel)]
      .filter((el) => el.offsetParent !== null)
      .map((el) => ({ t: el.textContent.trim().slice(0, 30), h: el.getBoundingClientRect().height }))
      .filter((x) => x.h < 32);
  });
  small.length === 0 ? ok('no interactive target under 32px high') : bad('small targets: ' + JSON.stringify(small));

  // 10. Internal links all resolve
  const hrefs = await page.evaluate(() =>
    [...new Set([...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')))]);
  for (const h of hrefs) {
    const r = await page.request.get(BASE + h);
    if (!r.ok()) bad(`internal link ${h} -> ${r.status()}`);
  }
  ok(`internal links checked: ${hrefs.length}`);

  await ctx.close();
}

/* ---------- mobile: menu, contact bar, zoom ---------- */
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'de-DE',
  });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });

  const barVisible = await page.locator('.contact-bar').isVisible();
  barVisible ? ok('mobile: contact bar visible') : bad('mobile: contact bar hidden');

  // menu opens/closes and is keyboard dismissable
  await page.locator('#nav-toggle').click();
  await page.waitForTimeout(200);
  const navOpen = await page.locator('#mobile-nav').isVisible();
  const expanded = await page.locator('#nav-toggle').getAttribute('aria-expanded');
  navOpen && expanded === 'true' ? ok('mobile: menu opens, aria-expanded=true') : bad('mobile menu open state');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  const navClosed = !(await page.locator('#mobile-nav').isVisible());
  navClosed ? ok('mobile: Escape closes menu') : bad('mobile: Escape did not close menu');

  // contact bar must not cover the page end
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await page.waitForTimeout(400);
  const covered = await page.evaluate(() => {
    const bar = document.querySelector('.contact-bar').getBoundingClientRect();
    const last = document.querySelector('.site-footer__demo, .site-footer__bottom').getBoundingClientRect();
    return last.bottom > bar.top;
  });
  covered ? bad('mobile: contact bar covers footer end') : ok('mobile: contact bar clears page end');

  // 200% zoom: no horizontal overflow
  await ctx.close();
  const zctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const zpage = await zctx.newPage();
  await zpage.goto(BASE + '/', { waitUntil: 'networkidle' });
  await zpage.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  await zpage.waitForTimeout(400);
  const zoomOverflow = await zpage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  zoomOverflow <= 1 ? ok('200% text zoom: no horizontal overflow') : bad(`200% zoom overflow ${zoomOverflow}px`);
  await zctx.close();
}

/* ---------- reduced motion ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal')].filter((el) => getComputedStyle(el).opacity !== '1').length);
  hidden === 0 ? ok('prefers-reduced-motion: all content visible immediately') : bad(`${hidden} reveal elements still faded`);
  await ctx.close();
}

/* ---------- no-JS ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const results = await page.locator('[data-guide-result]:visible').count();
  const faqText = await page.locator('.faq__answer').first().textContent();
  const revealsVisible = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal')].every((el) => getComputedStyle(el).opacity === '1'));
  results === 5 ? ok('no-JS: all guide answers readable') : bad(`no-JS: ${results} guide answers visible`);
  faqText.length > 40 ? ok('no-JS: FAQ answers present in HTML') : bad('no-JS: FAQ answer missing');
  revealsVisible ? ok('no-JS: no content hidden by reveal') : bad('no-JS: reveal hid content');
  await ctx.close();
}

await browser.close();
console.log(out.join('\n'));
console.log('\n' + out.filter((l) => l.startsWith('FAIL')).length + ' failures');
