/**
 * Verified business data — single source of truth.
 *
 * Every value here was taken from the supplied research package
 * (docs/BUSINESS_FACTS.json, reviewed 13.09.2026) which in turn cites the
 * company's own website and Impressum. Nothing in this file may be invented.
 *
 * Explicitly NOT confirmed and therefore absent: opening hours, current
 * capacity, response times, prices, spoken languages, review ratings,
 * certifications, current vacancies.
 */

export const RESEARCH_DATE = '13.09.2026';
export const RESEARCH_DATE_ISO = '2026-09-13';

export const BRAND = {
  name: 'Pflegende Bienen',
  descriptor: 'Ambulanter Pflegedienst & Seniorenbetreuung',
  slogan: 'Damit das Leben lebenswert bleibt',
  /** Exact spelling from the current Impressum — keep for legal contexts. */
  legalName: 'Pflegende Bienen Marija Jelacic Bjelovuk und Dusko Bjelovuk GbR',
  officialWebsite: 'https://pflegendebienen.de/',
} as const;

export const CONTACT = {
  phoneDisplay: '089 54637889',
  phoneHref: 'tel:+498954637889',
  phoneE164: '+49 89 54637889',
  faxDisplay: '089 54637891',
  email: 'info@pflegendebienen.de',
  emailHref: 'mailto:info@pflegendebienen.de',
  whatsappDisplay: '+49 176 22906287',
  whatsappHref:
    'https://wa.me/4917622906287?text=' +
    encodeURIComponent('Guten Tag, ich möchte mich über Ihr Pflegeangebot informieren.'),
} as const;

export type Office = {
  id: 'muenchen' | 'germering';
  label: string;
  street: string;
  postalCode: string;
  locality: string;
  region: string;
  country: string;
  /** Ordinary external link — no embedded map SDK, no tracking. */
  directionsUrl: string;
  pagePath: string;
  pageLabel: string;
};

/** Visitor offices. The legal headquarters is deliberately NOT in this list. */
export const OFFICES: readonly Office[] = [
  {
    id: 'muenchen',
    label: 'Büro München',
    street: 'Fürstenrieder Str. 137',
    postalCode: '80686',
    locality: 'München',
    region: 'Bayern',
    country: 'DE',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=' +
      encodeURIComponent('Fürstenrieder Str. 137, 80686 München'),
    pagePath: '/muenchen-west/',
    pageLabel: 'München-West',
  },
  {
    id: 'germering',
    label: 'Büro Germering',
    street: 'Otto-Wagner-Str. 10',
    postalCode: '82110',
    locality: 'Germering',
    region: 'Bayern',
    country: 'DE',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=' +
      encodeURIComponent('Otto-Wagner-Str. 10, 82110 Germering'),
    pagePath: '/germering/',
    pageLabel: 'Germering',
  },
] as const;

/** Registered seat from the Impressum — distinct from the visitor offices. */
export const LEGAL_HEADQUARTERS = {
  street: 'Kurfürstenstr. 16',
  postalCode: '82110',
  locality: 'Germering',
  country: 'DE',
} as const;

export const OWNERS = {
  marija: {
    name: 'Marija Jelačić Bjelovuk',
    role: 'Inhaberin & Pflegedienstleitung',
    /** Attributed to her personally, not to the company's age. */
    experience:
      'Marija Jelačić Bjelovuk bringt mehr als 20 Jahre Erfahrung in der Pflege mit. Als Inhaberin und Pflegedienstleitung steht sie hinter dem pflegerischen Angebot der Pflegenden Bienen.',
  },
  dusko: {
    name: 'Duško Bjelovuk',
    role: 'Inhaber · Organisation & interne Abläufe',
    intro: 'Duško Bjelovuk kümmert sich als Inhaber um Organisation und interne Abläufe.',
    email: 'd.bjelovuk@pflegendebienen.de',
    mobileDisplay: '+49 179 9543008',
    mobileHref: 'tel:+491799543008',
  },
} as const;

export const SOCIAL = {
  instagram: 'https://www.instagram.com/pflegendebienen/',
  facebook: 'https://www.facebook.com/pflegendebienen/',
} as const;

/** Service areas named on the company website. Not proof of current capacity. */
export const SERVICE_AREA = {
  munichDistricts: [
    'Neuhausen',
    'Nymphenburg',
    'Laim',
    'Pasing',
    'Obermenzing',
    'Aubing',
    'Großhadern',
    'Blumenau',
  ],
  surroundingPlaces: ['Gräfelfing', 'Planegg', 'Germering', 'Puchheim', 'Eichenau', 'Gilching'],
} as const;

export const ALL_AREA_NAMES: readonly string[] = [
  ...SERVICE_AREA.munichDistricts,
  ...SERVICE_AREA.surroundingPlaces,
];

/** Factual reassurance only — no awards, ratings or response promises. */
export const TRUST_POINTS = [
  'Inhabergeführt',
  'Büros in München und Germering',
  'Pflege, Behandlungspflege und Alltagshilfe',
] as const;

export const fullAddress = (o: Office) => `${o.street}, ${o.postalCode} ${o.locality}`;
