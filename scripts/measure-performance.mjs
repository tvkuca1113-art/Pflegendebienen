import { chromium } from 'playwright';
const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE = 'http://127.0.0.1:4321';
const routes = ['/', '/leistungen/', '/kosten-finanzierung/', '/ueber-uns/'];
const b = await chromium.launch({ executablePath: EXE });

for (const profile of [
  { name: 'desktop 1440 (local, no throttle)', vp: { width: 1440, height: 950 }, mobile: false },
  { name: 'mobile 390 (local, no throttle)', vp: { width: 390, height: 844 }, mobile: true },
]) {
  console.log('\n### ' + profile.name);
  for (const r of routes) {
    const ctx = await b.newContext({ viewport: profile.vp, isMobile: profile.mobile, hasTouch: profile.mobile, deviceScaleFactor: profile.mobile ? 2 : 1 });
    const page = await ctx.newPage();
    let bytes = 0;
    page.on('response', async (res) => {
      const len = res.headers()['content-length'];
      if (len) bytes += Number(len);
    });
    await page.goto(BASE + r, { waitUntil: 'load' });
    const m = await page.evaluate(() => new Promise((resolve) => {
      let lcp = 0, cls = 0;
      new PerformanceObserver((l) => { for (const e of l.getEntries()) lcp = e.startTime; })
        .observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value; })
        .observe({ type: 'layout-shift', buffered: true });
      setTimeout(() => {
        const nav = performance.getEntriesByType('navigation')[0];
        const fcp = performance.getEntriesByName('first-contentful-paint')[0];
        resolve({
          lcp: Math.round(lcp), cls: +cls.toFixed(4),
          fcp: Math.round(fcp?.startTime ?? 0),
          dcl: Math.round(nav.domContentLoadedEventEnd),
          requests: performance.getEntriesByType('resource').length,
          transferKB: Math.round(performance.getEntriesByType('resource').reduce((a, e) => a + (e.transferSize || 0), 0) / 1024),
        });
      }, 2600);
    }));
    console.log(`${r.padEnd(24)} LCP ${String(m.lcp).padStart(5)}ms  FCP ${String(m.fcp).padStart(4)}ms  CLS ${String(m.cls).padStart(6)}  reqs ${String(m.requests).padStart(3)}  transfer ${m.transferKB}KB`);
    await ctx.close();
  }
}
await b.close();
