/**
 * The six situations on the homepage selector.
 *
 * Each answer stays short on purpose (roughly 60–85 words including bullets).
 * Depth belongs on the linked service page. Nothing here promises admission,
 * a start date, capacity, an entitlement or a medical assessment.
 */
export type Situation = {
  id: string;
  label: string;
  /** Headline of the answer panel. */
  answerTitle: string;
  answer: string;
  bullets: string[];
  link: { label: string; href: string };
  /** Second link, shown only where a second route genuinely helps. */
  altLink?: { label: string; href: string };
};

export const SITUATIONS: readonly Situation[] = [
  {
    id: 'krankenhaus',
    label: 'Nach dem Krankenhaus',
    answerTitle: 'Früh klären, was zu Hause gebraucht wird',
    answer:
      'Die Entlassung steht bevor? Klären Sie möglichst früh, welche Unterstützung zu Hause benötigt wird.',
    bullets: [
      'Notieren Sie den geplanten Entlassungstermin.',
      'Fragen Sie das Entlassmanagement der Klinik nach den nötigen Unterlagen.',
      'Rufen Sie uns an: Wir besprechen Wohnort, Bedarf und einen möglichen Beginn.',
    ],
    link: { label: 'Behandlungspflege', href: '/leistungen/behandlungspflege/' },
    altLink: { label: 'Grundpflege', href: '/leistungen/grundpflege/' },
  },
  {
    id: 'koerperpflege',
    label: 'Waschen & Anziehen',
    answerTitle: 'Unterstützung, die Selbstständigkeit erhält',
    answer:
      'Wir unterstützen beim Waschen, Anziehen und bei der Bewegung – und lassen dabei so viel wie möglich selbst tun.',
    bullets: [
      'Welche Handgriffe fallen schwer, welche gehen noch gut allein?',
      'Wie oft und zu welchen Tageszeiten wäre Hilfe am besten?',
      'Den genauen Umfang legen wir gemeinsam im Gespräch fest.',
    ],
    link: { label: 'Grundpflege', href: '/leistungen/grundpflege/' },
  },
  {
    id: 'medikamente',
    label: 'Medikamente & Verbände',
    answerTitle: 'Ärztlich verordnete Pflege zu Hause',
    answer:
      'Medikamentengabe, Wundversorgung oder Kompressionsversorgung können als häusliche Krankenpflege infrage kommen.',
    bullets: [
      'Sprechen Sie die Verordnung mit Ihrer Arztpraxis ab.',
      'Mit uns klären Sie, wie die Versorgung zu Hause abläuft.',
      'Zur Dosierung oder Behandlung beraten wir nicht – das gehört in die ärztliche Hand.',
    ],
    link: { label: 'Behandlungspflege', href: '/leistungen/behandlungspflege/' },
  },
  {
    id: 'haushalt',
    label: 'Haushalt & Begleitung',
    answerTitle: 'Hilfe im Alltag und auf Wegen',
    answer:
      'Wir unterstützen beim Einkaufen, im Haushalt und begleiten bei Wegen und Terminen im Alltag.',
    bullets: [
      'Welche Aufgaben sollen wir übernehmen?',
      'Wie oft wäre Unterstützung sinnvoll – wöchentlich oder öfter?',
      'Auch gemeinsame Spaziergänge und Arztbegleitung sind möglich.',
    ],
    link: { label: 'Haushalt & Betreuung', href: '/leistungen/haushalt-betreuung/' },
  },
  {
    id: 'entlastung',
    label: 'Entlastung für Angehörige',
    answerTitle: 'Sie brauchen Entlastung, wenn Sie selbst pflegen?',
    answer:
      'Wenn Sie zeitweise ausfallen oder eine Pause brauchen, kann Verhinderungspflege infrage kommen – je nach den Voraussetzungen im Einzelfall.',
    bullets: [
      'Für welchen Zeitraum brauchen Sie eine Vertretung?',
      'Welche Aufgaben übernehmen Sie bisher?',
      'Den Anspruch klären Sie mit Ihrer Pflegekasse, die Umsetzung mit uns.',
    ],
    link: { label: 'Verhinderungspflege', href: '/leistungen/verhinderungspflege/' },
  },
  {
    id: 'orientierung',
    label: 'Ich brauche Orientierung',
    answerTitle: 'Sie müssen den richtigen Fachbegriff nicht kennen',
    answer:
      'Erzählen Sie uns einfach, was im Alltag schwieriger geworden ist und was sich die betroffene Person wünscht.',
    bullets: [
      'Was fällt seit einiger Zeit schwer?',
      'Was möchte die betroffene Person weiterhin selbst tun?',
      'Wir ordnen gemeinsam ein, welche Unterstützung passen könnte.',
    ],
    link: { label: 'Pflegeberatung', href: '/pflegeberatung/' },
  },
];

export const AREA_MATCH = (ort: string) =>
  `Wir sind auch in ${ort} unterwegs. Ob ein Einsatz möglich ist, klären wir persönlich.`;
export const AREA_NO_MATCH = 'Bitte fragen Sie Ihren Ort direkt bei uns an.';
