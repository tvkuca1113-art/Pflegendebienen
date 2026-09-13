import { SERVICES } from './services';

/** Every indexable route, in navigation order. Used for the XML sitemap. */
export const ROUTES: readonly { path: string; priority: string; changefreq: string }[] = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/leistungen/', priority: '0.9', changefreq: 'monthly' },
  ...SERVICES.map((s) => ({ path: s.path, priority: '0.8', changefreq: 'monthly' })),
  { path: '/pflegeberatung/', priority: '0.7', changefreq: 'monthly' },
  { path: '/kosten-finanzierung/', priority: '0.9', changefreq: 'monthly' },
  { path: '/muenchen-west/', priority: '0.8', changefreq: 'monthly' },
  { path: '/germering/', priority: '0.8', changefreq: 'monthly' },
  { path: '/ueber-uns/', priority: '0.7', changefreq: 'monthly' },
  { path: '/kontakt/', priority: '0.8', changefreq: 'monthly' },
  { path: '/impressum/', priority: '0.2', changefreq: 'yearly' },
  { path: '/datenschutz/', priority: '0.2', changefreq: 'yearly' },
];
