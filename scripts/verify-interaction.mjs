import { chromium, devices } from 'playwright';

const EXE = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE = process.env.BASE || 'http://127.0.0.1:4321';
const out = [];
const ok = (m) => out.push('PASS  ' + m);
const bad = (m) => out.push('FAIL  ' + m);

const browser = await chromium.launch({ executablePath: EXE });

/* ------------------------------ desktop ------------------------------ */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 }, locale: 'de-DE' });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => bad('js error: ' + e.message));
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });

  // 1. Selector collapsed on load, hint visible
  const openAnswers = await page.locator('[data-sit-answer]:visible').count();
  openAnswers === 0 ? ok('selector: collapsed on load') : bad(`selector: ${openAnswers} answers open on load`);

  // 2. All six choices open exactly one answer, with the right content
  const ids = ['krankenhaus', 'koerperpflege', 'medikamente', 'haushalt', 'entlastung', 'orientierung'];
  for (const id of ids) {
    await page.locator(`[data-sit-choice="${id}"]`).click();
    await page.waitForTimeout(140);
    const visible = await page.locator('[data-sit-answer]:visible').count();
    const shown = await page.locator(`[data-sit-answer="${id}"]`).isVisible();
    const expanded = await page.locator(`[data-sit-choice="${id}"]`).getAttribute('aria-expanded');
    const words = (await page.locator(`[data-sit-answer="${id}"]`).innerText())
      .replace(/Ihr nächster Schritt|Für das Gespräch merken|Auswahl zurücksetzen|089 54637889/g, '')
      .trim().split(/\s+/).length;
    const link = await page.locator(`[data-sit-answer="${id}"] a[href^="/"]`).first().getAttribute('href');
    const linkOk = (await page.request.get(BASE + link)).ok();
    visible === 1 && shown && expanded === 'true' && linkOk && words <= 95
      ? ok(`selector "${id}": one answer, ${words} words, link ${link} → 200`)
      : bad(`selector "${id}": visible=${visible} expanded=${expanded} words=${words} link=${link} ok=${linkOk}`);
  }

  // 3. Clicking the open choice again closes it; reset works
  await page.locator('[data-sit-choice="orientierung"]').click();
  await page.waitForTimeout(140);
  (await page.locator('[data-sit-answer]:visible').count()) === 0
    ? ok('selector: re-click closes the answer') : bad('selector: re-click did not close');

  await page.locator('[data-sit-choice="haushalt"]').click();
  await page.waitForTimeout(120);
  await page.locator('[data-sit-answer="haushalt"] [data-sit-reset]').click();
  await page.waitForTimeout(120);
  const afterReset = await page.locator('[data-sit-answer]:visible').count();
  const focusBack = await page.evaluate(() => document.activeElement?.getAttribute('data-sit-choice'));
  afterReset === 0 && focusBack === 'haushalt'
    ? ok('selector: reset clears and returns focus to the choice')
    : bad(`selector reset: visible=${afterReset} focus=${focusBack}`);

  // 4. Keyboard: choice is reachable and the answer receives focus, not hidden by the header
  await page.locator('[data-sit-choice="krankenhaus"]').focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);
  const kb = await page.evaluate(() => {
    const el = document.activeElement;
    const header = document.querySelector('.site-header').getBoundingClientRect().height;
    const r = el?.getBoundingClientRect();
    return { id: el?.getAttribute('data-sit-answer'), top: r?.top, header };
  });
  kb.id === 'krankenhaus' && kb.top >= kb.header - 1
    ? ok(`keyboard: focus moves to the answer, clear of the ${Math.round(kb.header)}px header`)
    : bad(`keyboard focus: ${JSON.stringify(kb)}`);

  // 5. Area check
  await page.selectOption('[data-area-select]', 'Pasing');
  await page.waitForTimeout(120);
  let msg = await page.locator('[data-area-result]').innerText();
  msg.includes('Pasing') && msg.includes('klären wir persönlich')
    ? ok('area: match message names the locality') : bad('area match: ' + msg);
  await page.selectOption('[data-area-select]', '__other');
  await page.waitForTimeout(120);
  msg = await page.locator('[data-area-result]').innerText();
  msg.includes('direkt bei uns an') ? ok('area: no-match message') : bad('area other: ' + msg);

  // 6. Navigation
  const nav = await page.locator('.nav__list').first().locator('a').allInnerTexts();
  JSON.stringify(nav) === JSON.stringify(['Hilfe finden', 'Kosten', 'Einsatzgebiet', 'Kontakt'])
    ? ok('nav: primary is ' + nav.join(' · ')) : bad('nav primary: ' + nav.join(','));
  const sec = await page.locator('.nav__list--secondary a').allInnerTexts();
  JSON.stringify(sec) === JSON.stringify(['Über uns', 'Arbeiten bei uns'])
    ? ok('nav: secondary is ' + sec.join(' · ')) : bad('nav secondary: ' + sec.join(','));

  // 7. Recruitment section + page
  const jobs = await page.locator('#jobs-title').isVisible();
  const karriere = await page.request.get(BASE + '/karriere/');
  jobs && karriere.ok() ? ok('recruitment: homepage section and /karriere/ reachable')
                        : bad(`recruitment: section=${jobs} page=${karriere.status()}`);

  // 8. Contact actions
  const tel = await page.locator('a[href^="tel:"]').first().getAttribute('href');
  const wa = await page.locator('a[href*="wa.me"]').first().getAttribute('href');
  const mailLabel = await page.locator('#kontakt a[href^="mailto:"]').first().innerText();
  tel === 'tel:+498954637889' ? ok('contact: tel link correct') : bad('tel: ' + tel);
  const waText = decodeURIComponent(wa?.split('text=')[1] ?? '');
  const leaksChoice = ['Krankenhaus', 'Waschen', 'Medikamente', 'Haushalt', 'Entlastung', 'Orientierung']
    .some((label) => waText.includes(label));
  wa?.startsWith('https://wa.me/4917622906287?text=') && !leaksChoice && waText.length < 90
    ? ok(`contact: WhatsApp neutral message, no selected need prefilled ("${waText}")`)
    : bad('wa: ' + wa);
  mailLabel.includes('Rückruf per E-Mail anfragen')
    ? ok('contact: e-mail action labelled as a request, not a submitted form') : bad('mail label: ' + mailLabel);

  // 9. Hero copy and word budget
  const h1 = await page.locator('h1').innerText();
  h1.replace(/\s+/g, ' ') === 'Zuhause bleiben. Pflege gemeinsam klären.'
    ? ok('hero: H1 matches the brief') : bad('h1: ' + h1);
  const words = await page.evaluate(() => {
    const clone = document.querySelector('main').cloneNode(true);
    clone.querySelectorAll('[data-sit-answer], details > div, .visually-hidden').forEach((n) => n.remove());
    return clone.innerText.trim().split(/\s+/).filter(Boolean).length;
  });
  words >= 650 && words <= 850
    ? ok(`copy: ${words} visible homepage words (target 650-850)`)
    : bad(`copy: ${words} visible homepage words, outside 650-850`);

  // 10. Logo untouched
  const logo = await page.locator('.brand__logo').evaluate((el) => ({
    w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height,
    nw: el.naturalWidth, nh: el.naturalHeight, src: el.getAttribute('src'),
  }));
  Math.abs(logo.w / logo.h - 195 / 120) < 0.02 && logo.src === '/logo-original.png'
    ? ok(`logo: original file, ${Math.round(logo.w)}×${Math.round(logo.h)}, ratio preserved`)
    : bad('logo: ' + JSON.stringify(logo));

  // 11. Skip link
  const fresh = await ctx.newPage();
  await fresh.goto(BASE + '/', { waitUntil: 'networkidle' });
  await fresh.keyboard.press('Tab');
  await fresh.waitForTimeout(350);
  const sl = await fresh.evaluate(() => {
    const el = document.activeElement;
    return { cls: el?.className, top: el?.getBoundingClientRect().top };
  });
  sl.cls === 'skip-link' && sl.top >= 0 ? ok('skip link: first tab stop and visible') : bad('skip link: ' + JSON.stringify(sl));
  await fresh.close();

  // 12. All internal links resolve
  const hrefs = await page.evaluate(() =>
    [...new Set([...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')))]);
  let broken = 0;
  for (const h of hrefs) if (!(await page.request.get(BASE + h)).ok()) { bad(`link ${h} broken`); broken++; }
  broken === 0 && ok(`links: all ${hrefs.length} internal links return 200`);

  await ctx.close();
}

/* ------------------------------ mobile ------------------------------- */
{
  // Real device profile: an iPhone 13 exposes 390 x 664 CSS px once the Safari
  // toolbars are showing, not the 844 px of its layout viewport. Testing
  // against 844 is how a hero can pass here and still look wrong on a phone.
  const ctx = await browser.newContext({ ...devices['iPhone 13'], locale: 'de-DE' });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // First view: headline, lead, primary action and part of the photo
  const first = await page.evaluate(() => {
    const vh = window.innerHeight;
    const r = (s) => document.querySelector(s)?.getBoundingClientRect();
    const h1El = document.querySelector('h1');
    const h1 = r('h1'), lead = r('.hero__lead'), cta = r('[data-hero-cta]'),
          img = r('.hero__image'), phone = r('.hero__phone');
    const lh = parseFloat(getComputedStyle(h1El).lineHeight);
    return {
      h1: h1.bottom <= vh, lead: lead.bottom <= vh, cta: cta.bottom <= vh,
      phone: phone.bottom <= vh,
      h1Lines: Math.round(h1.height / lh),
      photoPx: Math.max(0, Math.min(img.bottom, vh) - Math.max(img.top, 0)),
      photoWhole: img.bottom <= vh + 1,
      header: r('.site-header').height, vh,
    };
  });
  first.h1 && first.lead && first.cta && first.phone && first.photoPx >= 120
    ? ok(`mobile first view (390x${first.vh}): headline, lead, action, phone and ${Math.round(first.photoPx)}px of the photo`)
    : bad('mobile first view: ' + JSON.stringify(first));
  first.h1Lines <= 2
    ? ok(`mobile headline fits ${first.h1Lines} lines`)
    : bad(`mobile headline wraps to ${first.h1Lines} lines`);
  first.photoWhole
    ? ok('mobile: the photograph is not sliced by the fold')
    : bad('mobile: the photograph is cut off at the fold');
  first.header >= 70 && first.header <= 84
    ? ok(`mobile header ${Math.round(first.header)}px (target 72-80)`)
    : bad(`mobile header ${Math.round(first.header)}px`);

  // Contact bar appears only after the hero action leaves view
  const barAtTop = await page.locator('[data-contact-bar]').isVisible();
  !barAtTop ? ok('contact bar: hidden while the hero action is visible') : bad('contact bar visible at top');
  await page.evaluate(() => window.scrollTo({ top: 2200, behavior: 'instant' }));
  await page.waitForTimeout(400);
  const barMid = await page.locator('[data-contact-bar]').isVisible();
  barMid ? ok('contact bar: appears after the hero action leaves view') : bad('contact bar missing mid-page');
  await page.evaluate(() => {
    const el = document.getElementById('kontakt');
    window.scrollTo({ top: el.offsetTop + 200, behavior: 'instant' });
  });
  await page.waitForTimeout(500);
  const barAtContact = await page.locator('[data-contact-bar]').isVisible();
  !barAtContact ? ok('contact bar: hides when the contact section is on screen') : bad('contact bar overlaps contact section');

  // Does not cover a focused field
  await page.evaluate(() => window.scrollTo({ top: 2200, behavior: 'instant' }));
  await page.waitForTimeout(300);
  await page.locator('[data-area-select]').focus();
  await page.waitForTimeout(300);
  const barWhileTyping = await page.locator('[data-contact-bar]').isVisible();
  !barWhileTyping ? ok('contact bar: hides while a field has focus') : bad('contact bar stays over a focused field');

  // Mobile menu
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.locator('#nav-toggle').click();
  await page.waitForTimeout(200);
  const menuOpen = await page.locator('#mobile-nav').isVisible();
  const hasKarriere = await page.locator('#mobile-nav a[href="/karriere/"]').isVisible();
  menuOpen && hasKarriere ? ok('mobile menu: opens and includes "Arbeiten bei uns"') : bad('mobile menu state');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  !(await page.locator('#mobile-nav').isVisible()) ? ok('mobile menu: Escape closes') : bad('Escape did not close');

  // Selector layout at 390
  const cols = await page.evaluate(() =>
    getComputedStyle(document.querySelector('.sit__grid')).gridTemplateColumns.split(' ').length);
  cols === 2 ? ok('selector: 2 columns at 390px') : bad(`selector columns at 390px: ${cols}`);

  await ctx.close();
}

/* --------------------- zoom, reduced motion, no JS -------------------- */
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  await page.waitForTimeout(500);
  const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  over <= 1 ? ok('200% text zoom: no horizontal overflow') : bad(`200% zoom overflow ${over}px`);
  const clipped = await page.evaluate(() => {
    const h = document.querySelector('.hero');
    return getComputedStyle(h).height !== 'auto' && h.scrollHeight > h.clientHeight + 1;
  });
  !clipped ? ok('200% zoom: hero grows with the text, nothing clipped') : bad('hero clips enlarged text');
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const faded = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal')].filter((el) => getComputedStyle(el).opacity !== '1').length);
  faded === 0 ? ok('reduced motion: all content visible immediately') : bad(`${faded} elements still faded`);
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const answers = await page.locator('[data-sit-answer]:visible').count();
  const links = await page.locator('[data-sit-answer] a[href^="/"]').count();
  const faq = (await page.locator('.faq__a').first().textContent())?.length ?? 0;
  answers === 6 && links >= 6 ? ok('no JS: all six answers readable with ordinary service links')
                              : bad(`no JS: ${answers} answers, ${links} links`);
  faq > 40 ? ok('no JS: FAQ answers present in the HTML') : bad('no JS: FAQ answer missing');
  await ctx.close();
}

await browser.close();
console.log(out.join('\n'));
const failures = out.filter((l) => l.startsWith('FAIL')).length;
console.log(`\n${failures} failures`);
process.exit(failures ? 1 : 0);
