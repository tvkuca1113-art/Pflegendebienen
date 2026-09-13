import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const dist = 'dist';
const pages = [];
(function walk(d) {
  for (const e of readdirSync(d)) {
    const f = path.join(d, e);
    if (statSync(f).isDirectory()) walk(f);
    else if (f.endsWith('.html')) pages.push(f);
  }
})(dist);

const forbidden = [
  'aggregateRating', 'reviewCount', 'ratingValue', '"Review"', '"Physician"', '"Hospital"',
  '"MedicalClinic"', 'openingHours', 'priceRange', '"geo"', 'award', 'hasCredential',
  'Platz verfügbar', 'lorem ipsum', 'Lorem ipsum', '100 % Kostenübernahme',
  'Anfrage gesendet', 'Anfrage absenden', 'kostenlose Erstberatung', '24-Std', '24 Std',
];

let problems = [];
for (const p of pages) {
  const html = readFileSync(p, 'utf8');
  for (const f of forbidden) if (html.includes(f)) problems.push(`${p}: forbidden "${f}"`);

  const h1 = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1 !== 1) problems.push(`${p}: ${h1} <h1> elements`);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  const canon = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1];
  if (!title || title.length < 15) problems.push(`${p}: weak title`);
  if (!desc || desc.length < 60) problems.push(`${p}: weak description (${desc?.length ?? 0})`);
  if (!canon) problems.push(`${p}: missing canonical`);
  if (robots !== 'noindex, nofollow') problems.push(`${p}: robots="${robots}"`);
  if (!html.includes('lang="de"')) problems.push(`${p}: missing lang`);

  // images must carry alt + dimensions
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    if (!/\salt="/.test(tag)) problems.push(`${p}: img without alt :: ${tag.slice(0, 90)}`);
    if (!/\swidth="/.test(tag) || !/\sheight="/.test(tag))
      problems.push(`${p}: img without dimensions :: ${tag.slice(0, 90)}`);
  }

  // JSON-LD must parse
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { problems.push(`${p}: invalid JSON-LD (${e.message})`); }
  }

  // no hotlinked social CDN
  if (/cdninstagram|fbcdn\.net|scontent\./.test(html)) problems.push(`${p}: social CDN hotlink`);
}

console.log(`Checked ${pages.length} pages.`);
console.log(problems.length ? problems.join('\n') : 'ALL CHECKS PASSED');
