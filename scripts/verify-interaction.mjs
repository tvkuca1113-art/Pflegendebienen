import { chromium, devices } from 'playwright';

const EXE = process.env.CHROME_PATH || process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
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

  // 2b. On desktop the answer belongs in the side panel, not under the grid
  await page.locator('[data-sit-choice="medikamente"]').click();
  await page.waitForTimeout(160);
  const placed = await page.evaluate(() => {
    const a = document.querySelector('[data-sit-answer="medikamente"]');
    const panel = document.querySelector('[data-sit-panel]');
    const intro = document.querySelector('[data-sit-intro]');
    return { inPanel: panel.contains(a), introHidden: intro.hidden };
  });
  placed.inPanel && placed.introHidden
    ? ok('selector: desktop answer renders in the side panel and replaces the hint')
    : bad('selector desktop placement: ' + JSON.stringify(placed));

  // 2c. Printing a Gesprächsnotiz fills the print block with the chosen answer
  const printed = await page.evaluate(async () => {
    window.print = () => { window.__printed = true; };
    document.querySelector('[data-sit-print="medikamente"]').click();
    await new Promise((r) => setTimeout(r, 80));
    const note = document.getElementById('gespraechsnotiz');
    const txt = note.innerText.replace(/\s+/g, ' ');
    const res = {
      called: window.__printed === true,
      printing: document.documentElement.classList.contains('is-printing-note'),
      hasTitle: /Gespr(ä|a)chsnotiz/i.test(txt),
      hasPhone: txt.includes('089 54637889'),
      hasSteps: txt.length > 200,
    };
    window.dispatchEvent(new Event('afterprint'));
    res.cleaned = !document.documentElement.classList.contains('is-printing-note')
      && document.getElementById('gespraechsnotiz').children.length === 0;
    return res;
  });
  Object.values(printed).every(Boolean)
    ? ok('selector: print action fills the Gesprächsnotiz, prints and cleans up')
    : bad('print: ' + JSON.stringify(printed));

  // 3. Clicking the open choice again closes it; reset works
  await page.locator('[data-sit-choice="orientierung"]').click();   // open
  await page.waitForTimeout(140);
  await page.locator('[data-sit-choice="orientierung"]').click();   // and close again
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
  const mailHref = await page.locator('#kontakt a[href^="mailto:"]').first().getAttribute('href');
  const mailLabel = await page.locator('#kontakt a[href^="mailto:"]').first().innerText();
  tel === 'tel:+498954637889' ? ok('contact: tel link correct') : bad('tel: ' + tel);
  const waText = decodeURIComponent(wa?.split('text=')[1] ?? '');
  const leaksChoice = ['Krankenhaus', 'Waschen', 'Medikamente', 'Haushalt', 'Entlastung', 'Orientierung']
    .some((label) => waText.includes(label));
  wa?.startsWith('https://wa.me/4917622906287?text=') && !leaksChoice && waText.length < 90
    ? ok(`contact: WhatsApp neutral message, no selected need prefilled ("${waText}")`)
    : bad('wa: ' + wa);
  mailHref === 'mailto:info@pflegendebienen.de' && mailLabel.includes('info@pflegendebienen.de')
    ? ok('contact: e-mail action opens the verified address and shows it plainly')
    : bad(`mail action: href=${mailHref} label=${mailLabel}`);

  // 8b. The callback form validates in the browser and never fakes a send
  const mode = await page.locator('[data-callback-form]').first().getAttribute('data-mode');
  await page.locator('#kontakt [data-callback-form] button[type="submit"]').click();
  await page.waitForTimeout(200);
  const empty = await page.evaluate(() => {
    const f = document.querySelector('#kontakt [data-callback-form]');
    const errs = [...f.querySelectorAll('[data-err]')].filter((e) => !e.hidden).map((e) => e.dataset.err);
    const status = f.querySelector('[data-status]');
    return { errs, focus: document.activeElement?.getAttribute('name'),
             status: status.hidden ? '' : status.innerText, state: status.getAttribute('data-state') };
  });
  empty.errs.includes('name') && empty.errs.includes('phone') && empty.focus === 'name'
    ? ok(`form: empty submit shows ${empty.errs.length} field errors and focuses the first one`)
    : bad('form empty submit: ' + JSON.stringify(empty));
  !/gesendet|gesendet worden|Danke für Ihre Anfrage/i.test(empty.status)
    ? ok('form: an invalid submit never claims anything was sent')
    : bad('form: invalid submit claimed a send');

  // Filling it correctly produces the honest outcome for the configured mode
  await page.fill('#kontakt [data-callback-form] [name="name"]', 'Anna Beispiel');
  await page.fill('#kontakt [data-callback-form] [name="phone"]', '0176 1234567');
  await page.fill('#kontakt [data-callback-form] [name="place"]', 'Laim');
  const mailto = await page.evaluate(async () => {
    const seen = [];
    const realOpen = window.open;
    window.open = (u) => { seen.push(String(u)); return { focus() {} }; };
    const realClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function () { seen.push(this.href); };
    const f = document.querySelector('#kontakt [data-callback-form]');
    f.querySelector('button[type="submit"]').click();
    await new Promise((r) => setTimeout(r, 400));
    window.open = realOpen;
    HTMLAnchorElement.prototype.click = realClick;
    const status = f.querySelector('[data-status]');
    return { seen, status: status.hidden ? '' : status.innerText.replace(/\s+/g, ' '),
             state: status.getAttribute('data-state'),
             errs: [...f.querySelectorAll('[data-err]')].filter((e) => !e.hidden).length };
  });
  if (mode === 'draft') {
    const m = mailto.seen[0] ?? '';
    m.startsWith('mailto:') && m.includes('Anna') && mailto.errs === 0
      ? ok('form (draft mode): a valid submit opens a prepared e-mail draft, no field errors')
      : bad('form draft submit: ' + JSON.stringify(mailto));
    /E-Mail-Programm|Entwurf/i.test(mailto.status) && !/gesendet/i.test(mailto.status)
      ? ok(`form: status explains the draft honestly ("${mailto.status.slice(0, 72)}…")`)
      : bad('form draft status: ' + mailto.status);
  } else {
    ok(`form: configured in "${mode}" mode; server delivery is not exercised without authorisation`);
  }

  // 8c. Social profiles are visible, open in a new tab and are labelled
  const social = await page.evaluate(() => {
    const pick = (sel) => [...document.querySelectorAll(sel)];
    const links = pick('a[href*="facebook.com"], a[href*="instagram.com"]');
    return links.map((a) => {
      const r = a.getBoundingClientRect();
      return { host: a.href.includes('facebook') ? 'fb' : 'ig', w: Math.round(r.width), h: Math.round(r.height),
               target: a.target, rel: a.rel, label: a.getAttribute('aria-label') || a.innerText.trim(),
               inHeader: !!a.closest('.site-header'), inFooter: !!a.closest('.site-footer') };
    });
  });
  const header = social.filter((s) => s.inHeader), footer = social.filter((s) => s.inFooter);
  header.length >= 2 && footer.length >= 2
    ? ok(`social: ${header.length} links in the header, ${footer.length} in the footer`)
    : bad('social placement: ' + JSON.stringify(social.map((s) => [s.host, s.inHeader, s.inFooter])));
  const badSocial = social.filter((s) => s.target !== '_blank' || !/noopener/.test(s.rel) || !s.label);
  badSocial.length === 0
    ? ok('social: every profile link opens in a new tab, is rel-protected and labelled')
    : bad('social attributes: ' + JSON.stringify(badSocial));

  // 8d. The careers page is complete and posts to the recruitment path
  const kp = await ctx.newPage();
  await kp.goto(BASE + '/karriere/', { waitUntil: 'networkidle' });
  const career = await kp.evaluate(() => {
    const h1 = document.querySelector('h1');
    const lh = parseFloat(getComputedStyle(h1).lineHeight);
    const form = document.querySelector('[data-callback-form]');
    return {
      h1: h1.innerText.replace(/\s+/g, ' '),
      h1Lines: Math.round(h1.getBoundingClientRect().height / lh),
      h2: [...document.querySelectorAll('main h2')].map((h) => h.innerText.trim()),
      kind: form?.dataset.kind,
      recipient: form?.dataset.recipient || '',
      areas: [...document.querySelectorAll('[data-callback-form] [name="area"] option')].length,
      words: document.querySelector('main').innerText.trim().split(/\s+/).length,
      du: /\bdu\b|\bdein/i.test(document.querySelector('main').innerText),
    };
  });
  career.h1Lines <= 2 && career.h2.length >= 6 && career.kind === 'job' && career.areas >= 4
    ? ok(`careers: H1 ${career.h1Lines} lines, ${career.h2.length} sections, job form with ${career.areas} areas`)
    : bad('careers: ' + JSON.stringify(career));
  career.words >= 350 && career.words <= 600
    ? ok(`careers: ${career.words} visible words, "du" address ${career.du ? 'used' : 'MISSING'}`)
    : bad(`careers: ${career.words} words, outside 350-600`);
  const careRecipient = await page.locator('#kontakt [data-callback-form]').getAttribute('data-recipient');
  careRecipient !== career.recipient
    ? ok('routing: the care form and the recruitment form use different recipients')
    : bad(`routing: both forms point at the same recipient "${careRecipient}"`);
  await kp.close();

  // 8e. Text contrast, composited through transparent layers. A scoped
  //     `.on-dark` rule that silently fails to match shows up here.
  const auditContrast = async (target) => {
    await target.addScriptTag({ path: 'scripts/lib/contrast-audit.js' });
    return target.evaluate(() => window.__contrastAudit());
  };
  for (const [label, route] of [['Startseite', '/'], ['Karriereseite', '/karriere/']]) {
    const cp = await ctx.newPage();
    await cp.goto(BASE + route, { waitUntil: 'networkidle' });
    await cp.waitForTimeout(400);
    const findings = await auditContrast(cp);
    findings.length === 0
      ? ok(`contrast ${label}: every visible text run meets WCAG AA (composited through transparency)`)
      : bad(`contrast ${label}: ` + findings.slice(0, 8).join(' | '));
    await cp.close();
  }

  // 8f. The AI disclosure stays present, but never pasted across the picture.
  const disclosure = await page.evaluate(() => {
    const img = document.querySelector('.hero__image')?.getBoundingClientRect();
    const c = document.querySelector('.hero__credit');
    if (!img || !c) return { missing: true };
    const r = c.getBoundingClientRect();
    const overlaps = r.top < img.bottom - 1 && r.bottom > img.top + 1
      && r.left < img.right - 1 && r.right > img.left + 1;
    return { text: c.innerText.trim(), overlaps, visible: r.height > 0 };
  });
  disclosure.visible && /KI/.test(disclosure.text || '') && !disclosure.overlaps
    ? ok(`hero: AI disclosure present as a caption ("${disclosure.text}"), not laid over the photograph`)
    : bad('hero AI disclosure: ' + JSON.stringify(disclosure));

  // 9. Hero copy and word budget
  const h1 = await page.locator('#hero-title').innerText();
  h1.replace(/\s+/g, ' ') === 'Zuhause gut versorgt. Als Familie entlastet.'
    ? ok('hero: H1 matches the brief') : bad('h1: ' + h1);
  const words = await page.evaluate(() => {
    const clone = document.querySelector('main').cloneNode(true);
    clone.querySelectorAll('[data-sit-answer], details > div, .visually-hidden').forEach((n) => n.remove());
    return clone.innerText.trim().split(/\s+/).filter(Boolean).length;
  });
  words >= 500 && words <= 700
    ? ok(`copy: ${words} visible homepage words (target 500-700)`)
    : bad(`copy: ${words} visible homepage words, outside 500-700`);

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

  // The recruitment page keeps the care channel out of its sticky bar
  const jp = await ctx.newPage();
  await jp.goto(BASE + '/karriere/', { waitUntil: 'networkidle' });
  await jp.waitForTimeout(400);
  const jobBarTop = await jp.locator('[data-contact-bar]').isVisible();
  await jp.evaluate(() => window.scrollTo({ top: 1800, behavior: 'instant' }));
  await jp.waitForTimeout(400);
  const jobBar = await jp.evaluate(() => {
    const bar = document.querySelector('[data-contact-bar]');
    return { shown: !bar.hidden,
             hrefs: [...bar.querySelectorAll('a')].map((a) => a.getAttribute('href')) };
  });
  !jobBarTop && jobBar.shown && jobBar.hrefs.includes('#interesse')
    && !jobBar.hrefs.some((h) => h.includes('wa.me'))
    ? ok('careers: sticky bar stays off the first screen and offers the recruitment path, not WhatsApp care')
    : bad(`careers bar: top=${jobBarTop} ${JSON.stringify(jobBar)}`);

  // Its two hero actions are the same width on a phone
  await jp.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  const jobCtas = await jp.evaluate(() =>
    [...document.querySelectorAll('.jobhero__actions .btn')].map((b) => Math.round(b.getBoundingClientRect().width)));
  jobCtas.length === 2 && jobCtas[0] === jobCtas[1]
    ? ok(`careers: both hero actions are ${jobCtas[0]}px wide`)
    : bad('careers hero actions: ' + JSON.stringify(jobCtas));
  await jp.close();

  // Selector layout at 390: one column of full-width choices, panel out of the way
  const layout = await page.evaluate(() => {
    const cols = getComputedStyle(document.querySelector('.sit__choices')).gridTemplateColumns.split(' ').length;
    const panel = document.querySelector('.sit__panel');
    return { cols, panelShown: panel.getBoundingClientRect().height > 0 };
  });
  layout.cols === 1 && !layout.panelShown
    ? ok('selector: single column of choices at 390px, desktop panel not rendered')
    : bad('selector layout at 390px: ' + JSON.stringify(layout));

  // On a phone the answer opens directly under its own choice, not in a panel
  await page.locator('[data-sit-choice="entlastung"]').click();
  await page.waitForTimeout(220);
  const mobPlace = await page.evaluate(() => {
    const a = document.querySelector('[data-sit-answer="entlastung"]');
    const slot = document.querySelector('[data-sit-slot="entlastung"]');
    const choice = document.querySelector('[data-sit-choice="entlastung"]');
    const r = a.getBoundingClientRect();
    return {
      inSlot: slot.contains(a),
      visible: r.height > 0,
      belowChoice: r.top >= choice.getBoundingClientRect().bottom - 2,
      width: Math.round(r.width),
      inViewport: r.left >= -1 && r.right <= window.innerWidth + 1,
    };
  });
  mobPlace.inSlot && mobPlace.visible && mobPlace.belowChoice && mobPlace.inViewport
    ? ok(`selector: mobile answer opens under its own choice, full width (${mobPlace.width}px)`)
    : bad('selector mobile placement: ' + JSON.stringify(mobPlace));

  // Choosing a locality carries it into the enquiry form
  await page.selectOption('[data-area-select]', 'Germering');
  await page.waitForTimeout(150);
  const prefill = await page.evaluate(() => {
    const cta = document.querySelector('[data-area-cta]');
    const inputs = [...document.querySelectorAll('[data-place]')].filter((el) => el.tagName === 'INPUT');
    return { cta: cta && !cta.hidden ? cta.innerText.replace(/\s+/g, ' ').trim() : '',
             values: inputs.map((i) => i.value) };
  });
  prefill.cta.includes('Germering') && prefill.values.some((v) => v === 'Germering')
    ? ok(`locality: "${prefill.cta}" and the form field is prefilled with "Germering"`)
    : bad('locality prefill: ' + JSON.stringify(prefill));

  // Tap targets and stacking: nothing important sits under the contact bar
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(200);
  const targets = await page.evaluate(() => {
    const name = (el) => (el.getAttribute('aria-label') || el.innerText || el.tagName).trim().slice(0, 36);
    const box = (el) => el.getBoundingClientRect();
    const visible = [...document.querySelectorAll('a, button, select, summary')]
      .filter((el) => { const r = box(el); return r.width > 0 && r.height > 0 && !el.closest('.skip-link'); });
    // WCAG 2.2 SC 2.5.8 exempts a link sitting inside a sentence of text.
    const inSentence = (el) => {
      const p = el.closest('p, li, address, figcaption, label');
      return !!p && p.innerText.trim().length > name(el).length + 12 && !el.closest('nav');
    };
    const small = visible
      .filter((el) => !inSentence(el))
      .filter((el) => { const r = box(el); return r.height < 24 || r.width < 24; })
      .map((el) => `${name(el)} ${Math.round(box(el).width)}x${Math.round(box(el).height)}`);
    // The contact and social actions are the point of the page: hold them to 44px.
    const primary = visible
      .filter((el) => /^(tel:|mailto:)/.test(el.getAttribute('href') || '')
        || /wa\.me|facebook\.com|instagram\.com/.test(el.getAttribute('href') || '')
        || el.matches('.btn, [data-callback-form] button, #nav-toggle'))
      .filter((el) => { const r = box(el); return r.height < 44 - 0.5; })
      .map((el) => `${name(el)} ${Math.round(box(el).width)}x${Math.round(box(el).height)}`);
    return { small, primary, checked: visible.length };
  });
  targets.small.length === 0
    ? ok(`mobile: all ${targets.checked} controls meet the 24px minimum (inline sentence links exempt)`)
    : bad('mobile controls under 24px: ' + targets.small.join(' | '));
  targets.primary.length === 0
    ? ok('mobile: every contact, social and form action is at least 44px tall')
    : bad('mobile primary actions under 44px: ' + targets.primary.join(' | '));

  await ctx.close();
}

/* --------------------- width sweep: 360 → 1440 ------------------------ */
{
  const widths = [360, 390, 430, 768, 1024, 1440];
  const routes = ['/', '/karriere/', '/leistungen/', '/leistungen/behandlungspflege/',
    '/kosten-finanzierung/', '/kontakt/', '/ueber-uns/', '/germering/', '/muenchen-west/',
    '/pflegeberatung/'];
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, locale: 'de-DE',
      isMobile: w < 768, hasTouch: w < 768 });
    const errs = [];
    for (const route of routes) {
      const page = await ctx.newPage();
      page.on('pageerror', (e) => errs.push(`${route} js: ${e.message}`));
      const res = await page.goto(BASE + route, { waitUntil: 'networkidle' });
      if (!res.ok()) errs.push(`${route} http ${res.status()}`);
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
      await page.waitForTimeout(250);
      const over = await page.evaluate(() => {
        const doc = document.documentElement;
        const spill = [...document.querySelectorAll('main *')]
          .filter((el) => el.getBoundingClientRect().right > doc.clientWidth + 1)
          .map((el) => el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0]);
        return { px: doc.scrollWidth - doc.clientWidth, spill: spill.slice(0, 3) };
      });
      if (over.px > 1) errs.push(`${route} overflow ${over.px}px (${over.spill.join(', ')})`);
      await page.close();
    }
    errs.length === 0
      ? ok(`${w}px: ${routes.length} pages load, no JS errors, no horizontal overflow`)
      : bad(`${w}px: ` + errs.join(' | '));
    await ctx.close();
  }
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
