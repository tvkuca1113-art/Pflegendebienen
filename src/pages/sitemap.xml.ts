import type { APIRoute } from 'astro';
import { ROUTES } from '../data/routes';
import { SITE } from '../config/site.mjs';
import { RESEARCH_DATE_ISO } from '../data/business';

export const GET: APIRoute = () => {
  const urls = ROUTES.map(
    (r) => `  <url>
    <loc>${SITE.origin}${r.path}</loc>
    <lastmod>${RESEARCH_DATE_ISO}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  ).join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
