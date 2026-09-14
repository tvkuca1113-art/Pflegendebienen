/**
 * Primary navigation stays short: four decisions a visitor actually makes.
 * Everything else lives in the secondary row and the mobile menu, so the
 * service pages keep their internal links and crawlability.
 */
export type NavItem = { label: string; href: string };

export const MAIN_NAV: readonly NavItem[] = [
  { label: 'Hilfe finden', href: '/leistungen/' },
  { label: 'Kosten', href: '/kosten-finanzierung/' },
  { label: 'Einsatzgebiet', href: '/muenchen-west/' },
  { label: 'Kontakt', href: '/kontakt/' },
];

export const SECONDARY_NAV: readonly NavItem[] = [
  { label: 'Über uns', href: '/ueber-uns/' },
  { label: 'Arbeiten bei uns', href: '/karriere/' },
];

export const SERVICE_NAV: readonly NavItem[] = [
  { label: 'Grundpflege', href: '/leistungen/grundpflege/' },
  { label: 'Behandlungspflege', href: '/leistungen/behandlungspflege/' },
  { label: 'Haushalt & Betreuung', href: '/leistungen/haushalt-betreuung/' },
  { label: 'Verhinderungspflege', href: '/leistungen/verhinderungspflege/' },
  { label: 'Pflegeberatung', href: '/pflegeberatung/' },
];

export const FOOTER_NAV = {
  leistungen: [{ label: 'Alle Leistungen', href: '/leistungen/' }, ...SERVICE_NAV],
  orientierung: [
    { label: 'Kosten & Finanzierung', href: '/kosten-finanzierung/' },
    { label: 'München-West', href: '/muenchen-west/' },
    { label: 'Germering', href: '/germering/' },
    { label: 'Über uns', href: '/ueber-uns/' },
    { label: 'Kontakt', href: '/kontakt/' },
  ],
  rechtliches: [
    { label: 'Impressum', href: '/impressum/' },
    { label: 'Datenschutz', href: '/datenschutz/' },
  ],
} as const;
