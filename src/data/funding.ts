/**
 * Funding orientation figures.
 *
 * Every amount carries a visible "Informationsstand" and a nearby official
 * source link. No calculator, no guaranteed coverage, no company prices.
 */
import { RESEARCH_DATE } from './business';

export const INFORMATIONSSTAND = RESEARCH_DATE;

export const SOURCES = {
  verhinderungspflege: {
    label: 'Bundesministerium für Gesundheit: Verhinderungspflege',
    url: 'https://www.bundesgesundheitsministerium.de/verhinderungspflege',
  },
  entlastungsbetragBmg: {
    label: 'Bundesministerium für Gesundheit: Weitere Leistungen und Angebote zur Unterstützung im Alltag',
    url: 'https://www.bundesgesundheitsministerium.de/pflege-zu-hause/weitere-leistungen-und-angebote-zur-unterstuetzung-im-alltag',
  },
  entlastungsbetrag: {
    label: 'gesund.bund.de: Entlastungsbetrag',
    url: 'https://gesund.bund.de/entlastungsbetrag',
  },
  pflegeZuHause: {
    label: 'Bundesministerium für Gesundheit: Pflege zu Hause',
    url: 'https://www.bundesgesundheitsministerium.de/pflege-zu-hause',
  },
} as const;

export type FundingPillar = {
  title: string;
  short: string;
  detail: string[];
};

/** Three concise explanations used on the homepage and the funding page. */
export const PILLARS: readonly FundingPillar[] = [
  {
    title: 'Pflegekasse',
    short:
      'Je nach Pflegegrad und Anspruch kommen Leistungen für Pflege, Betreuung und Entlastung infrage.',
    detail: [
      'Die Pflegekasse ist Teil der Pflegeversicherung und an einen anerkannten Pflegegrad geknüpft. Aus ihr können je nach Anspruch Leistungen für die Pflege zu Hause, für Betreuung und für Entlastung finanziert werden.',
      'Welche Leistung in Ihrem Fall zur Verfügung steht und wie sie abgerechnet wird, hängt vom Pflegegrad und vom vereinbarten Leistungsumfang ab.',
    ],
  },
  {
    title: 'Krankenkasse',
    short:
      'Ärztlich verordnete häusliche Krankenpflege kann unter bestimmten Voraussetzungen übernommen werden.',
    detail: [
      'Die Krankenkasse ist für medizinisch veranlasste Leistungen zuständig. Häusliche Krankenpflege – zum Beispiel Wundversorgung oder Medikamentengabe – beruht auf einer ärztlichen Verordnung.',
      'Die Kasse entscheidet über die Genehmigung im Einzelfall. Eine Kostenübernahme lässt sich über die Website nicht zusagen.',
    ],
  },
  {
    title: 'Eigener Anteil',
    short:
      'Welche Kosten privat zu tragen sind, muss für den vereinbarten Leistungsumfang geklärt werden.',
    detail: [
      'Nicht jede gewünschte Unterstützung wird vollständig von einer Kasse getragen. Was darüber hinausgeht, ist privat zu tragen.',
      'Wir besprechen mit Ihnen, welcher Leistungsumfang sinnvoll erscheint und welche Positionen Sie mit Ihrer Kasse klären sollten. Feste Preise nennen wir über die Website nicht.',
    ],
  },
];

export type FundingFigure = {
  amount: string;
  title: string;
  body: string;
  caveat: string;
  source: { label: string; url: string };
  secondSource?: { label: string; url: string };
};

/** Verified orientation figures. Re-check against the sources before launch. */
export const FIGURES: readonly FundingFigure[] = [
  {
    amount: 'bis zu 131 €',
    title: 'Entlastungsbetrag, monatlich',
    body: 'Anspruchsberechtigte Menschen mit einem Pflegegrad, die zu Hause leben, können monatlich bis zu 131 Euro für erstattungsfähige Leistungen einsetzen. Das gilt auch bei Pflegegrad 1.',
    caveat:
      'Es handelt sich nicht um eine allgemeine Geldleistung und nicht um eine Zusage, dass jede auf dieser Website beschriebene Leistung erstattungsfähig ist.',
    source: SOURCES.entlastungsbetrag,
    secondSource: SOURCES.entlastungsbetragBmg,
  },
  {
    amount: 'bis zu 3.539 €',
    title: 'Gemeinsames Jahresbudget für Verhinderungs- und Kurzzeitpflege',
    body: 'Für Pflegegrad 2 bis 5 steht unter den geltenden Voraussetzungen ein gemeinsames Jahresbudget von bis zu 3.539 Euro für Verhinderungspflege und Kurzzeitpflege zur Verfügung.',
    caveat:
      'Das ist ein gemeinsames Budget für beide Leistungen – nicht 3.539 Euro je Leistung – und kein Preis für unsere Leistungen.',
    source: SOURCES.verhinderungspflege,
  },
];
