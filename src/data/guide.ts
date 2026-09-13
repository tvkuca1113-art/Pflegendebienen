/**
 * Data for the on-page orientation guide ("Welche Unterstützung brauchen Sie
 * gerade?"). The guide never asks for personal data and never makes a medical
 * or availability decision — it points to the matching service page and to
 * questions worth preparing for the phone call.
 */
export type GuideOption = {
  id: string;
  label: string;
  /** Short answer headline shown after a choice. */
  resultTitle: string;
  resultText: string;
  /** Two or three practical questions to prepare for the call. */
  prepare: string[];
  primaryLink: { label: string; href: string };
  secondaryLink?: { label: string; href: string };
};

export const GUIDE_OPTIONS: readonly GuideOption[] = [
  {
    id: 'koerperpflege',
    label: 'Hilfe bei Körperpflege und Alltag',
    resultTitle: 'Das klingt nach Grundpflege',
    resultText:
      'Unterstützung beim Waschen, Anziehen, Essen oder bei der Bewegung gehört zur Grundpflege. Der Umfang wird individuell vereinbart – auch stundenweise Hilfe an einzelnen Tagen ist ein möglicher Anfang.',
    prepare: [
      'Welche Verrichtungen fallen im Alltag zuerst schwer?',
      'Zu welchen Tageszeiten wäre Unterstützung am wichtigsten?',
      'Liegt bereits ein Pflegegrad vor oder ist ein Antrag geplant?',
    ],
    primaryLink: { label: 'Grundpflege ansehen', href: '/leistungen/grundpflege/' },
    secondaryLink: { label: 'Haushalt & Betreuung', href: '/leistungen/haushalt-betreuung/' },
  },
  {
    id: 'verordnet',
    label: 'Ärztlich verordnete Versorgung',
    resultTitle: 'Das gehört zur Behandlungspflege',
    resultText:
      'Medikamentengabe, Wundversorgung oder Kompressionsversorgung zu Hause beruhen auf einer ärztlichen Verordnung. Wir besprechen mit Ihnen, welche Unterlagen dafür gebraucht werden und wie die Umsetzung aussehen kann.',
    prepare: [
      'Liegt eine ärztliche Verordnung vor oder steht ein Arzttermin an?',
      'Um welche Maßnahme geht es und wie häufig wird sie benötigt?',
      'Welche Krankenkasse ist zuständig?',
    ],
    primaryLink: { label: 'Behandlungspflege ansehen', href: '/leistungen/behandlungspflege/' },
    secondaryLink: { label: 'Kosten & Finanzierung', href: '/kosten-finanzierung/' },
  },
  {
    id: 'entlastung',
    label: 'Entlastung für eine pflegende Person',
    resultTitle: 'Verhinderungspflege kann eine Möglichkeit sein',
    resultText:
      'Wenn die Person, die sonst pflegt, vorübergehend ausfällt, sieht die Pflegeversicherung die Verhinderungspflege nach § 39 SGB XI vor. Voraussetzungen und Umfang klären Sie mit Ihrer Pflegekasse; ob wir eine Vertretung übernehmen können, besprechen wir persönlich.',
    prepare: [
      'Für welchen Zeitraum wird eine Vertretung gebraucht?',
      'Welche Aufgaben übernimmt die pflegende Person bisher?',
      'Wurde mit der Pflegekasse schon über Verhinderungspflege gesprochen?',
    ],
    primaryLink: { label: 'Verhinderungspflege ansehen', href: '/leistungen/verhinderungspflege/' },
    secondaryLink: { label: 'Kosten & Finanzierung', href: '/kosten-finanzierung/' },
  },
  {
    id: 'krankenhaus',
    label: 'Pflege nach einem Krankenhausaufenthalt organisieren',
    resultTitle: 'Meist greifen hier zwei Bereiche ineinander',
    resultText:
      'Nach einem Krankenhausaufenthalt sind häufig ärztlich verordnete Maßnahmen und Unterstützung im Alltag gleichzeitig ein Thema. Beides läuft über unterschiedliche Kostenträger. Rufen Sie uns an, damit wir die Reihenfolge gemeinsam sortieren können.',
    prepare: [
      'Wann ist die Entlassung geplant oder bereits erfolgt?',
      'Wurde vom Krankenhaus eine Verordnung oder ein Entlassplan mitgegeben?',
      'Welche Unterstützung ist zu Hause bereits vorhanden?',
    ],
    primaryLink: { label: 'Behandlungspflege ansehen', href: '/leistungen/behandlungspflege/' },
    secondaryLink: { label: 'Grundpflege ansehen', href: '/leistungen/grundpflege/' },
  },
  {
    id: 'unsicher',
    label: 'Ich bin noch unsicher',
    resultTitle: 'Das ist ein völlig normaler Anfang',
    resultText:
      'Sie müssen nicht wissen, wie eine Leistung heißt, um anzurufen. Schildern Sie einfach, was im Alltag schwierig geworden ist. Wir ordnen gemeinsam ein, welche Unterstützung infrage kommt und was dafür geklärt werden muss.',
    prepare: [
      'Was ist im Alltag zuletzt schwieriger geworden?',
      'Für wen suchen Sie Unterstützung und in welchem Ort?',
      'Gibt es bereits einen Pflegegrad, eine Verordnung oder einen Antrag?',
    ],
    primaryLink: { label: 'Alle Leistungen ansehen', href: '/leistungen/' },
    secondaryLink: { label: 'Pflegeberatung', href: '/pflegeberatung/' },
  },
];

export const GUIDE_AREA_MATCH =
  'Dieser Ort gehört zu unserem veröffentlichten Einsatzgebiet. Ob und wann ein Einsatz möglich ist, klären wir persönlich.';

export const GUIDE_AREA_NO_MATCH = 'Bitte fragen Sie Ihren Ort direkt bei uns an.';
