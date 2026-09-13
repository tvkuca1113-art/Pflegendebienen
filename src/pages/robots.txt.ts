import type { APIRoute } from 'astro';
import { SITE, IS_DEMO } from '../config/site.mjs';

/**
 * Crawling stays ALLOWED in demo mode on purpose: a `noindex` meta tag can only
 * work if crawlers are permitted to fetch the page and read it. Blocking in
 * robots.txt would hide the directive. See HANDOVER.md, section 5.
 */
export const GET: APIRoute = () => {
  const body = IS_DEMO
    ? `# Vorschau-Umgebung. Das Crawlen ist erlaubt, damit die Direktive
# "noindex, nofollow" auf jeder Seite gelesen werden kann.
User-agent: *
Allow: /

Sitemap: ${SITE.origin}/sitemap.xml
`
    : `User-agent: *
Allow: /

Sitemap: ${SITE.origin}/sitemap.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
