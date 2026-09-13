export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const MAIN_NAV: readonly NavItem[] = [
  {
    label: 'Leistungen',
    href: '/leistungen/',
    children: [
      { label: 'Grundpflege', href: '/leistungen/grundpflege/' },
      { label: 'Behandlungspflege', href: '/leistungen/behandlungspflege/' },
      { label: 'Haushalt & Betreuung', href: '/leistungen/haushalt-betreuung/' },
      { label: 'Verhinderungspflege', href: '/leistungen/verhinderungspflege/' },
      { label: 'Pflegeberatung', href: '/pflegeberatung/' },
    ],
  },
  { label: 'Kosten & Finanzierung', href: '/kosten-finanzierung/' },
  {
    label: 'Einsatzgebiet',
    href: '/muenchen-west/',
    children: [
      { label: 'München-West', href: '/muenchen-west/' },
      { label: 'Germering', href: '/germering/' },
    ],
  },
  { label: 'Über uns', href: '/ueber-uns/' },
  { label: 'Kontakt', href: '/kontakt/' },
];

export const FOOTER_NAV = {
  leistungen: [
    { label: 'Alle Leistungen', href: '/leistungen/' },
    { label: 'Grundpflege', href: '/leistungen/grundpflege/' },
    { label: 'Behandlungspflege', href: '/leistungen/behandlungspflege/' },
    { label: 'Haushalt & Betreuung', href: '/leistungen/haushalt-betreuung/' },
    { label: 'Verhinderungspflege', href: '/leistungen/verhinderungspflege/' },
    { label: 'Pflegeberatung', href: '/pflegeberatung/' },
  ],
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
