import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
const pages = [];
(function walk(d) { for (const e of readdirSync(d)) { const f = path.join(d, e);
  statSync(f).isDirectory() ? walk(f) : f.endsWith('.html') && pages.push(f); } })('dist');

const out = [];
const text = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');

// Claims the brief forbids
const banned = [
  ['Platz verfügbar', 'availability claim'],
  ['Kapazität frei', 'availability claim'],
  ['garantiert', 'guarantee'],
  ['Garantie', 'guarantee'],
  ['kostenlose Erstberatung', 'unconfirmed free consultation'],
  ['unverbindliche Erstberatung', 'unconfirmed free consultation'],
  ['24 Stunden erreichbar', 'unconfirmed availability'],
  ['24-Stunden', 'unconfirmed 24h claim'],
  ['rund um die Uhr erreichbar', 'unconfirmed availability'],
  ['Sterne', 'rating'],
  ['Bewertung', 'rating'],
  ['zertifiziert', 'unconfirmed certification'],
  ['Zertifikat', 'unconfirmed certification'],
  ['Auszeichnung', 'award'],
  ['ausgezeichnet mit', 'award'],
  ['Öffnungszeiten:', 'unconfirmed opening hours'],
  ['Mo–Fr', 'unconfirmed opening hours'],
  ['Mo-Fr', 'unconfirmed opening hours'],
  ['pro Stunde', 'price'],
  ['€/Std', 'price'],
  ['Stundensatz', 'price'],
  ['Wir melden uns innerhalb', 'response-time promise'],
  ['innerhalb von 24 Stunden', 'response-time promise'],
  ['Anfrage gesendet', 'fake form confirmation'],
  ['Vielen Dank für Ihre Anfrage', 'fake form confirmation'],
  ['Intensivpflege', 'intensive care claim'],
  ['24-Std', 'unconfirmed hotline'],
  ['Beratungseinsatz nach § 37', 'unproven authorisation'],
];

for (const p of pages) {
  const t = text(readFileSync(p, 'utf8'));
  for (const [needle, why] of banned) {
    if (t.includes(needle)) {
      const i = t.indexOf(needle);
      out.push(`${p}: "${needle}" (${why}) :: …${t.slice(Math.max(0, i - 70), i + 90)}…`);
    }
  }
  // SAPV may only appear inside an explicit disclaimer
  let sIdx = t.indexOf('SAPV');
  while (sIdx > -1) {
    const win = t.slice(Math.max(0, sIdx - 200), sIdx + 200);
    // An explicit negation must sit next to the term in either phrasing we use.
    const disclaimed = /nicht gemeint|nicht an|keine? |geh(ö|oe)ren nicht dazu|(bieten|erbringen|leisten) wir nicht/i.test(win);
    if (!disclaimed) out.push(`${p}: SAPV mentioned without disclaimer :: ${win}`);
    sIdx = t.indexOf('SAPV', sIdx + 1);
  }

  // Verhinderungspflege must never be presented under SGB V
  const vIdx = t.indexOf('Verhinderungspflege');
  if (vIdx > -1) {
    const win = t.slice(Math.max(0, vIdx - 160), vIdx + 200);
    if (/SGB V\b/.test(win) && !/SGB XI/.test(win))
      out.push(`${p}: Verhinderungspflege near "SGB V" without SGB XI :: ${win}`);
  }
  // Legal HQ must never be presented as a visitor office
  const kIdx = t.indexOf('Kurfürstenstr');
  if (kIdx > -1) {
    const win = t.slice(Math.max(0, kIdx - 200), kIdx + 220);
    if (!/(kein Besucherbüro|kein Büro für Besuche|Sitz)/i.test(win))
      out.push(`${p}: legal HQ shown without the "not a visitor office" note :: ${win}`);
  }
}

// Positive assertions
const home = text(readFileSync('dist/index.html', 'utf8'));
// What the redesigned homepage must still say. The co-owner biography and the
// old trust badges moved to /ueber-uns/ on purpose.
const must = [
  '089 54637889', 'Fürstenrieder Str. 137', 'Otto-Wagner-Str. 10',
  'Marija Jelačić Bjelovuk',
  'Zuhause gut versorgt.',            // hero promise
  'Was brauchen Sie gerade?',         // situation selector
  'Was zahlt die Kasse',              // costs section
  'Kommen Sie auch zu uns?',          // service area check
  'KI-generiertes Symbolbild',        // AI illustration disclosure
];
// And what must live on the about page instead.
const aboutMust = ['Duško Bjelovuk', 'Marija Jelačić Bjelovuk'];
const about = text(readFileSync('dist/ueber-uns/index.html', 'utf8'));
for (const m of aboutMust) if (!about.includes(m)) out.push(`ueber-uns missing: "${m}"`);
for (const m of must) if (!home.includes(m)) out.push(`homepage missing required content: "${m}"`);

// Costs must be explained before the owners are introduced (brief: costs before owners).
const iCosts = home.indexOf('Was zahlt die Kasse');
const iOwners = home.indexOf('Persönlich ansprechbar');
if (iCosts < 0 || iOwners < 0 || iCosts > iOwners)
  out.push('homepage: the costs section must come before the owner introduction');

// Social profiles must be reachable from every page, in the markup itself.
const SOCIAL = [
  ['facebook.com/', 'Facebook link'],
  ['instagram.com/', 'Instagram link'],
];
for (const p of pages) {
  const raw = readFileSync(p, 'utf8');
  for (const [needle, why] of SOCIAL)
    if (!raw.includes(needle)) out.push(`${p}: missing ${why}`);
}

// Verhinderungspflege page must state SGB XI § 39
const vp = text(readFileSync('dist/leistungen/verhinderungspflege/index.html', 'utf8'));
if (!/§ 39 SGB XI/.test(vp)) out.push('verhinderungspflege page: missing "§ 39 SGB XI"');

// Legal spelling in Impressum, accented spelling in editorial
const imp = text(readFileSync('dist/impressum/index.html', 'utf8'));
if (!imp.includes('Pflegende Bienen Marija Jelacic Bjelovuk und Dusko Bjelovuk GbR'))
  out.push('impressum: legal company spelling missing');
if (!text(readFileSync('dist/ueber-uns/index.html', 'utf8')).includes('Marija Jelačić Bjelovuk'))
  out.push('ueber-uns: accented editorial name missing');

console.log(`Audited ${pages.length} pages.`);
console.log(out.length ? out.join('\n\n') : 'NO PROHIBITED CLAIMS FOUND; ALL REQUIRED FACTS PRESENT');
