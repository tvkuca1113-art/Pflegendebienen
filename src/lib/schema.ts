/**
 * Structured data.
 *
 * Only facts that are verified AND visible on the page are emitted. There is
 * deliberately no aggregateRating, review, openingHours, priceRange, geo,
 * award, credential, Physician or Hospital type anywhere in this file.
 */
import { SITE } from '../config/site.mjs';
import { BRAND, CONTACT, OFFICES, SOCIAL, SERVICE_AREA, ALL_AREA_NAMES } from '../data/business';
import { SERVICES } from '../data/services';

const abs = (path: string) => new URL(path, SITE.origin + '/').toString();

export const ORGANIZATION_ID = abs('/#organisation');

const areaServed = [
  ...SERVICE_AREA.munichDistricts.map((n) => ({
    '@type': 'Place',
    name: `${n}, München`,
  })),
  ...SERVICE_AREA.surroundingPlaces.map((n) => ({ '@type': 'Place', name: n })),
];

/** The single legal organisation both offices belong to. */
export function organizationGraph() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: BRAND.name,
    legalName: BRAND.legalName,
    description: BRAND.descriptor,
    url: abs('/'),
    logo: {
      '@type': 'ImageObject',
      url: abs('/logo-original.png'),
      width: 195,
      height: 120,
    },
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    sameAs: [SOCIAL.instagram, SOCIAL.facebook],
    areaServed,
  };
}

/** One LocalBusiness per real visitor office, linked to the organisation. */
export function officeGraph() {
  return OFFICES.map((o) => ({
    '@type': 'LocalBusiness',
    '@id': abs(`${o.pagePath}#standort`),
    name: `${BRAND.name} – ${o.label}`,
    description: `${BRAND.descriptor} in ${o.locality}.`,
    parentOrganization: { '@id': ORGANIZATION_ID },
    url: abs(o.pagePath),
    telephone: CONTACT.phoneE164,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: o.street,
      postalCode: o.postalCode,
      addressLocality: o.locality,
      addressRegion: o.region,
      addressCountry: o.country,
    },
    image: abs('/logo-original.png'),
    sameAs: [SOCIAL.instagram, SOCIAL.facebook],
    areaServed,
  }));
}

export function serviceGraph() {
  return SERVICES.map((s) => ({
    '@type': 'Service',
    '@id': abs(`${s.path}#leistung`),
    name: s.h1.split(':')[0]!.trim(),
    serviceType: s.navLabel,
    description: s.cardText,
    url: abs(s.path),
    provider: { '@id': ORGANIZATION_ID },
    areaServed,
  }));
}

export type Crumb = { name: string; path: string };

export function breadcrumbGraph(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function faqGraph(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function webPageGraph(opts: { path: string; title: string; description: string }) {
  return {
    '@type': 'WebPage',
    '@id': abs(opts.path) + '#webpage',
    url: abs(opts.path),
    name: opts.title,
    description: opts.description,
    inLanguage: SITE.locale,
    isPartOf: { '@type': 'WebSite', '@id': abs('/') + '#website', url: abs('/'), name: BRAND.name },
    about: { '@id': ORGANIZATION_ID },
  };
}

export function buildGraph(nodes: unknown[]) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}

export { abs, ALL_AREA_NAMES };
