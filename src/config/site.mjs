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

/**
 * Recruitment section and its menu links. One switch controls the homepage
 * section, the secondary navigation entry and the /karriere/ route, so the
 * owner can remove all of it in one place.
 */
export const recruitmentEnabled = env.PUBLIC_RECRUITMENT !== 'false';

/**
 * Callback delivery.
 *
 * 'server'  — the form posts to /api/rueckruf and shows success only after the
 *             server confirms the delivery provider accepted the message.
 * 'draft'   — no delivery is configured, so the same form opens a prepared
 *             e-mail draft in the visitor's own programme. It is labelled as
 *             such and never reports that anything was sent.
 *
 * See OWNER-QUESTIONS.md for the environment variables 'server' mode needs.
 */
export const callbackMode = env.PUBLIC_CALLBACK_MODE === 'server' ? 'server' : 'draft';
