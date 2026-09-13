/**
 * Deployment configuration.
 *
 * DEMO MODE (default): the site renders `noindex, nofollow` on every page and
 * robots.txt stays crawlable (so the noindex directive can actually be read).
 * Canonical URLs point at `origin`.
 *
 * To switch an approved site to production, set PUBLIC_SITE_MODE=production and
 * PUBLIC_SITE_ORIGIN=https://pflegendebienen.de in the build environment.
 * See HANDOVER.md, section 5.
 */
const env = typeof process !== 'undefined' ? process.env : {};

export const SITE = {
  mode: env.PUBLIC_SITE_MODE === 'production' ? 'production' : 'demo',
  origin: (env.PUBLIC_SITE_ORIGIN || 'https://demo.pflegendebienen.de').replace(/\/$/, ''),
  productionOrigin: 'https://pflegendebienen.de',
  locale: 'de-DE',
  lang: 'de',
};

export const IS_DEMO = SITE.mode !== 'production';
