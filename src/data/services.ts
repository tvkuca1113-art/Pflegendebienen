/**
 * Services as published by the company, re-grouped for the new site.
 *
 * Content corrections applied from the brief:
 * - Verhinderungspflege is classified under SGB XI § 39 (the old site grouped
 *   it under SGB V — that categorisation is not reproduced here).
 * - No § 37 Abs. 3 counselling authorisation is claimed for Pflegeberatung.
 * - Palliativpflege is mentioned within the overview only, without claiming
 *   SAPV, intensive care or a dedicated palliative team.
 */

export type ServiceLink = { label: string; href: string };

export type Service = {
  slug: string;
  path: string;
  navLabel: string;
  /** Short label used inside the guide and on cards. */
  cardTitle: string;
  cardText: string;
  h1: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  /** Legal basis shown as a factual note, not as a coverage promise. */
  legalBasis?: string;
  /** Short labels for the overview page — same published offer, condensed. */
  highlights: string[];
  /** Optional illustrative photograph shown once, in its own context. */
  photo?: { src: string; alt: string; caption: string };
  /** Benefit-led opening line, above the fold on the service page. */
  lede: string;
  intro: string;
  whatItMeans: { heading: string; paragraphs: string[] };
  /** Concrete items published in the company's own offer. */
  scope: { heading: string; note?: string; items: string[] };
  whenRelevant: { heading: string; items: string[] };
  funding: { heading: string; paragraphs: string[] };
  questionsToPrepare: string[];
  related: ServiceLink[];
};

export const SERVICES: readonly Service[] = [
  {
    slug: 'grundpflege',
    lede: 'Waschen, Anziehen, Aufstehen: Wir helfen genau dort, wo es allein nicht mehr sicher geht – und lassen alles andere weiter selbst machen.',
    path: '/leistungen/grundpflege/',
    navLabel: 'Grundpflege',
    cardTitle: 'Körperpflege & Alltag',
    cardText:
      'Unterstützung beim Waschen, Anziehen, Essen oder bei der Bewegung – abgestimmt auf den vereinbarten Bedarf.',
    h1: 'Grundpflege: Unterstützung bei Körperpflege und Alltag',
    eyebrow: 'Körperbezogene Pflegemaßnahmen',
    metaTitle: 'Grundpflege in München-West & Germering | Pflegende Bienen',
    metaDescription:
      'Körperpflege, Unterstützung beim Essen und bei der Bewegung zu Hause. Wie die Grundpflege bei den Pflegenden Bienen abläuft und wie Sie ein Gespräch vereinbaren.',
    legalBasis: 'Körperbezogene Pflegemaßnahmen im Rahmen der Pflegeversicherung (SGB XI)',
    highlights: ['Körperpflege', 'Waschen & Ankleiden', 'Essen und Trinken', 'Mobilität'],
    intro:
      'Wenn alltägliche Handgriffe schwerer werden, muss niemand alles allein schaffen. Die Grundpflege unterstützt genau dort, wo es im Tagesablauf zuerst schwierig wird – zu Hause, in der gewohnten Umgebung.',
    whatItMeans: {
      heading: 'Was Grundpflege bedeutet',
      paragraphs: [
        'Grundpflege umfasst die körperbezogenen Verrichtungen des Alltags: Körperpflege, Unterstützung bei der Ernährung und Hilfe bei der Bewegung. Sie richtet sich nach dem, was im Einzelfall gebraucht wird, und wird gemeinsam mit Ihnen vereinbart.',
        'Der Umfang wird nicht pauschal festgelegt. Manche Menschen benötigen an einzelnen Tagen Unterstützung, andere mehrmals täglich. Was in Ihrem Fall sinnvoll ist, besprechen wir im persönlichen Gespräch.',
      ],
    },
    scope: {
      heading: 'Was bei den Pflegenden Bienen dazugehört',
      note: 'Der genaue Umfang wird individuell vereinbart.',
      items: [
        'Unterstützung bei der Körperpflege, beim Waschen und beim An- und Auskleiden',
        'Hilfe beim Essen und Trinken',
        'Unterstützung bei der Mobilität, etwa beim Aufstehen und bei Wegen in der Wohnung',
      ],
    },
    whenRelevant: {
      heading: 'Wann Grundpflege infrage kommt',
      items: [
        'Wenn die tägliche Körperpflege ohne Hilfe nicht mehr sicher möglich ist.',
        'Wenn Angehörige die Unterstützung nicht mehr allein leisten können oder wollen.',
        'Wenn nach einem Krankenhausaufenthalt vorübergehend mehr Hilfe nötig ist.',
        'Wenn die Beweglichkeit nachlässt und Stürze zum Thema werden.',
      ],
    },
    funding: {
      heading: 'Was zur Finanzierung geklärt werden muss',
      paragraphs: [
        'Leistungen der Grundpflege können über die Pflegekasse infrage kommen, wenn ein entsprechender Anspruch besteht. Maßgeblich sind unter anderem der Pflegegrad und der vereinbarte Leistungsumfang.',
        'Ob und in welcher Höhe Kosten übernommen werden und welcher Eigenanteil verbleibt, klären Sie mit Ihrer Pflegekasse. Wir besprechen mit Ihnen, welche Unterlagen dafür hilfreich sind.',
      ],
    },
    questionsToPrepare: [
      'Bei welchen Verrichtungen wird die Unterstützung im Alltag zuerst gebraucht?',
      'Zu welchen Tageszeiten wäre Hilfe am wichtigsten?',
      'Liegt bereits ein Pflegegrad vor oder ist ein Antrag geplant?',
    ],
    related: [
      { label: 'Haushalt & Betreuung', href: '/leistungen/haushalt-betreuung/' },
      { label: 'Kosten & Finanzierung', href: '/kosten-finanzierung/' },
      { label: 'Pflegeberatung', href: '/pflegeberatung/' },
    ],
  },
  {
    slug: 'behandlungspflege',
    lede: 'Wundversorgung, Medikamente, Kompression: Was ärztlich verordnet ist, führen wir fachgerecht bei Ihnen zu Hause durch.',
    path: '/leistungen/behandlungspflege/',
    navLabel: 'Behandlungspflege',
    cardTitle: 'Ärztlich verordnete Pflege',
    cardText:
      'Zum Beispiel Medikamentengabe, Wundversorgung oder Kompressionsversorgung zu Hause. Wir besprechen, welche Verordnung und Unterlagen dafür benötigt werden.',
    h1: 'Behandlungspflege: ärztlich verordnete Versorgung zu Hause',
    eyebrow: 'Medizinische Pflege nach ärztlicher Verordnung',
    metaTitle: 'Behandlungspflege München-West & Germering | Pflegende Bienen',
    metaDescription:
      'Medikamentengabe, Wundversorgung, Kompressionsversorgung und weitere ärztlich verordnete Maßnahmen zu Hause. Welche Voraussetzungen dafür zu klären sind.',
    legalBasis: 'Häusliche Krankenpflege nach ärztlicher Verordnung (SGB V)',
    highlights: ['Medikamentengabe', 'Wundversorgung', 'Kompressionsversorgung', 'PEG-Versorgung'],
    intro:
      'Manche pflegerischen Maßnahmen sind medizinisch veranlasst. Sie beruhen auf einer ärztlichen Verordnung und folgen anderen Voraussetzungen als Leistungen der Pflegeversicherung.',
    whatItMeans: {
      heading: 'Was Behandlungspflege bedeutet',
      paragraphs: [
        'Behandlungspflege umfasst medizinische Maßnahmen, die zu Hause durchgeführt werden können, statt dafür eine Einrichtung aufzusuchen. Grundlage ist jeweils eine ärztliche Verordnung; zusätzlich können Genehmigungsvoraussetzungen der Krankenkasse gelten.',
        'Welche Maßnahme verordnet wird, entscheidet die behandelnde Arztpraxis. Wir führen sie fachgerecht zu Hause durch und stimmen den Ablauf mit Ihnen und der Praxis ab.',
      ],
    },
    scope: {
      heading: 'Was wir zu Hause übernehmen',
      note: 'Alle Maßnahmen setzen eine ärztliche Verordnung voraus.',
      items: [
        'Medikamentengabe',
        'Wundversorgung',
        'Kompressionsstrümpfe und Kompressionsverbände',
        'Diabetesüberwachung',
        'Blutdruck- und Pulsmessung',
        'PEG-Versorgung',
        'Häusliche Krankenpflege zur Vermeidung eines Krankenhausaufenthalts, soweit anwendbar',
      ],
    },
    whenRelevant: {
      heading: 'Wann Behandlungspflege infrage kommt',
      items: [
        'Wenn eine ärztliche Verordnung für Maßnahmen zu Hause vorliegt oder ausgestellt werden soll.',
        'Wenn nach einem Krankenhausaufenthalt eine Weiterversorgung organisiert werden muss.',
        'Wenn eine Wunde regelmäßig versorgt werden muss.',
        'Wenn Medikamente zuverlässig gestellt oder verabreicht werden müssen.',
      ],
    },
    funding: {
      heading: 'Was zur Finanzierung geklärt werden muss',
      paragraphs: [
        'Ärztlich verordnete häusliche Krankenpflege kann unter bestimmten Voraussetzungen von der Krankenkasse übernommen werden. Das ist etwas anderes als die Leistungen der Pflegekasse.',
        'Ob die Kasse die Verordnung genehmigt, entscheidet sie im Einzelfall. Wir sagen Ihnen, welche Unterlagen für die Klärung üblicherweise gebraucht werden, und sichern keine Kostenübernahme zu.',
      ],
    },
    questionsToPrepare: [
      'Liegt bereits eine ärztliche Verordnung vor oder steht ein Arzttermin an?',
      'Um welche Maßnahme geht es und wie häufig wird sie benötigt?',
      'Welche Krankenkasse ist zuständig?',
    ],
    related: [
      { label: 'Grundpflege', href: '/leistungen/grundpflege/' },
      { label: 'Kosten & Finanzierung', href: '/kosten-finanzierung/' },
      { label: 'Kontakt aufnehmen', href: '/kontakt/' },
    ],
  },
  {
    slug: 'haushalt-betreuung',
    path: '/leistungen/haushalt-betreuung/',
    navLabel: 'Haushalt & Betreuung',
    cardTitle: 'Haushalt & Begleitung',
    cardText:
      'Hilfe im Haushalt, beim Einkaufen und bei Wegen im Alltag – auch gemeinsame Spaziergänge und die Begleitung zu Arztterminen.',
    h1: 'Hauswirtschaft und Betreuung im Alltag',
    eyebrow: 'Alltagshilfe & Begleitung',
    metaTitle: 'Haushaltshilfe & Seniorenbetreuung München-West | Pflegende Bienen',
    metaDescription:
      'Unterstützung im Haushalt, beim Einkaufen, bei Spaziergängen und bei der Begleitung zu Arztterminen in München-West und Germering.',
    highlights: ['Haushaltsführung', 'Einkäufe', 'Gesellschaft im Alltag', 'Arztbegleitung'],
    photo: {
      src: 'einkauf-kueche.jpg',
      alt: 'Ein älterer Mann räumt am Küchentisch gemeinsam mit einer Helferin Einkäufe aus',
      caption: 'KI-generiertes Symbolbild',
    },
    lede: 'Einkaufen, Wäsche, Post, ein Gang zum Arzt: Wir übernehmen, was im Alltag liegen bleibt – und bringen Zeit für ein Gespräch mit.',
    intro:
      'Nicht jede Unterstützung ist pflegerisch. Oft geht es darum, dass der Haushalt weiterläuft, Wege erledigt werden und jemand Zeit mitbringt.',
    whatItMeans: {
      heading: 'Was Hauswirtschaft und Betreuung bedeuten',
      paragraphs: [
        'Hauswirtschaftliche Unterstützung und Betreuung ergänzen die pflegerische Versorgung oder stehen für sich. Der Umfang wird individuell vereinbart und richtet sich nach dem, was im Alltag tatsächlich entlastet.',
        'Diese Leistungen können auch dann sinnvoll sein, wenn körperliche Pflege noch gar kein Thema ist – zum Beispiel, wenn Einkäufe und Wege beschwerlich werden.',
      ],
    },
    scope: {
      heading: 'Was wir übernehmen',
      note: 'Was davon sinnvoll ist, besprechen wir gemeinsam.',
      items: [
        'Unterstützung bei der Haushaltsführung',
        'Einkäufe und Besorgungen',
        'Gesellschaft und gemeinsame Zeit im Alltag',
        'Gemeinsame Spaziergänge',
        'Begleitung zu Arztterminen',
      ],
    },
    whenRelevant: {
      heading: 'Wann Alltagshilfe infrage kommt',
      items: [
        'Wenn Einkaufen, Wäsche oder Ordnung im Haushalt zunehmend schwerfallen.',
        'Wenn Wege außer Haus allein nicht mehr sicher möglich sind.',
        'Wenn Angehörige berufstätig sind und den Alltag nicht durchgehend abdecken können.',
        'Wenn Gesellschaft und ein verlässlicher Rhythmus im Alltag guttun.',
      ],
    },
    funding: {
      heading: 'Was zur Finanzierung geklärt werden muss',
      paragraphs: [
        'Je nach Anspruch können Leistungen der Pflegekasse für Betreuung und Entlastung infrage kommen, zum Beispiel der Entlastungsbetrag. Welche Leistung für welchen Einsatz abgerechnet werden kann, hängt vom Einzelfall ab.',
        'Ein Teil der Kosten kann privat zu tragen sein. Das klären wir für den vereinbarten Leistungsumfang mit Ihnen.',
      ],
    },
    questionsToPrepare: [
      'Welche Aufgaben im Haushalt sollen zuerst übernommen werden?',
      'Wie oft und zu welchen Zeiten wäre Unterstützung sinnvoll?',
      'Besteht bereits ein Pflegegrad, über den Entlastungsleistungen laufen könnten?',
    ],
    related: [
      { label: 'Entlastung für Angehörige', href: '/leistungen/verhinderungspflege/' },
      { label: 'Kosten & Finanzierung', href: '/kosten-finanzierung/' },
      { label: 'Einsatzgebiet München-West', href: '/muenchen-west/' },
    ],
  },
  {
    slug: 'verhinderungspflege',
    lede: 'Wenn Sie als pflegende Angehörige eine Pause brauchen, übernehmen wir die Versorgung für diese Zeit – geplant oder kurzfristig.',
    path: '/leistungen/verhinderungspflege/',
    navLabel: 'Verhinderungspflege',
    cardTitle: 'Entlastung für Angehörige',
    cardText:
      'Wenn Sie selbst pflegen und zeitweise Unterstützung brauchen, kann Verhinderungspflege eine Möglichkeit sein. Voraussetzungen und Umfang werden individuell geklärt.',
    h1: 'Verhinderungspflege: Entlastung für pflegende Angehörige',
    eyebrow: 'Leistung der Pflegeversicherung nach § 39 SGB XI',
    metaTitle: 'Verhinderungspflege München-West & Germering | Pflegende Bienen',
    metaDescription:
      'Wenn die pflegende Person vorübergehend ausfällt: Verhinderungspflege nach § 39 SGB XI. Voraussetzungen, Ablauf und Kontakt zu den Pflegenden Bienen.',
    legalBasis: 'Verhinderungspflege ist eine Leistung der Pflegeversicherung nach § 39 SGB XI',
    highlights: ['Vertretung bei Abwesenheit', 'Pflege im vereinbarten Umfang', 'Haushalt & Betreuung'],
    intro:
      'Wer zu Hause pflegt, braucht selbst manchmal eine Pause – geplant oder ganz unvorhergesehen. Für diesen Fall sieht die Pflegeversicherung die Verhinderungspflege vor.',
    whatItMeans: {
      heading: 'Was Verhinderungspflege bedeutet',
      paragraphs: [
        'Verhinderungspflege greift, wenn die Person, die sonst pflegt, vorübergehend verhindert ist – etwa wegen Urlaub, Krankheit oder eines eigenen Termins. Die Versorgung übernimmt dann für diese Zeit jemand anderes.',
        'Wichtig für die Einordnung: Verhinderungspflege ist eine Leistung der Pflegeversicherung nach § 39 SGB XI. Sie ist keine ärztlich verordnete Leistung der Krankenversicherung und wird deshalb auch anders beantragt.',
      ],
    },
    scope: {
      heading: 'Wie eine Vertretung aussehen kann',
      note: 'Ob wir zum gewünschten Zeitraum eine Vertretung übernehmen können, klären wir persönlich.',
      items: [
        'Übernahme der vereinbarten pflegerischen Unterstützung während der Abwesenheit',
        'Unterstützung im Haushalt und in der Betreuung im vereinbarten Umfang',
        'Abstimmung, welche Abläufe für die vertretende Pflegekraft wichtig sind',
      ],
    },
    whenRelevant: {
      heading: 'Wann Verhinderungspflege infrage kommt',
      items: [
        'Wenn Sie als pflegende Angehörige oder pflegender Angehöriger Urlaub machen möchten.',
        'Wenn Sie selbst krank werden und die Pflege nicht übernehmen können.',
        'Wenn berufliche oder familiäre Termine eine Vertretung nötig machen.',
        'Wenn Sie stundenweise regelmäßige Entlastung suchen.',
      ],
    },
    funding: {
      heading: 'Was zur Finanzierung geklärt werden muss',
      paragraphs: [
        'Verhinderungspflege wird bei der Pflegekasse beantragt. Voraussetzungen, Höhe und Dauer richten sich nach dem jeweiligen Anspruch – die Leistungsansprüche klären Sie deshalb direkt mit Ihrer Pflegekasse.',
        'Verhinderungspflege und Kurzzeitpflege greifen auf ein gemeinsames Jahresbudget zu. Eine Orientierung dazu finden Sie auf der Seite Kosten & Finanzierung.',
      ],
    },
    questionsToPrepare: [
      'Für welchen Zeitraum wird eine Vertretung gebraucht?',
      'Welche Aufgaben übernimmt die pflegende Person bisher im Alltag?',
      'Wurde bereits mit der Pflegekasse über Verhinderungspflege gesprochen?',
    ],
    related: [
      { label: 'Kosten & Finanzierung', href: '/kosten-finanzierung/' },
      { label: 'Haushalt & Betreuung', href: '/leistungen/haushalt-betreuung/' },
      { label: 'Pflegeberatung', href: '/pflegeberatung/' },
    ],
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);

/**
 * Additional published offers that are deliberately NOT marketed as
 * stand-alone in-house services.
 */
export const ADDITIONAL_OFFERS = {
  heading: 'Weitere Themen, die wir gern persönlich besprechen',
  items: [
    {
      title: 'Palliative Begleitung',
      text: 'Wir begleiten Menschen auch in der letzten Lebensphase zu Hause und stimmen den Umfang eng mit Ihnen und den behandelnden Ärztinnen und Ärzten ab. Eine spezialisierte ambulante Palliativversorgung (SAPV) und eine durchgehende Rund-um-die-Uhr-Betreuung gehören nicht dazu.',
    },
    {
      title: 'Mobile Physiotherapie, Fußpflege und Friseur',
      text: 'Diese Leistungen erbringen wir nicht selbst. Wenn Sie bereits von uns versorgt werden, helfen wir Ihnen aber gern dabei, Termine zu koordinieren – sprechen Sie uns einfach an.',
    },
  ],
} as const;
