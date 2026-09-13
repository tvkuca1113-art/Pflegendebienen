export type FaqItem = { q: string; a: string };

/** Homepage FAQ — mirrored 1:1 into FAQPage structured data. */
export const FAQ: readonly FaqItem[] = [
  {
    q: 'Kann ich mich melden, wenn noch kein Pflegegrad vorliegt?',
    a: 'Ja. Sie können Ihre Situation zunächst mit uns besprechen. Welche Leistungen finanziert werden können, hängt vom konkreten Anspruch ab. Eine ärztlich verordnete Behandlungspflege folgt anderen Voraussetzungen als Leistungen der Pflegeversicherung.',
  },
  {
    q: 'Wie schnell kann die Pflege beginnen?',
    a: 'Das hängt von Ihrem Bedarf, Ihrem Wohnort und den verfügbaren Möglichkeiten ab. Bitte rufen Sie uns an, damit ein möglicher Beginn persönlich geklärt werden kann.',
  },
  {
    q: 'Was ist der Unterschied zwischen Grundpflege und Behandlungspflege?',
    a: 'Grundpflege unterstützt bei alltäglichen Verrichtungen wie Körperpflege, Ernährung und Bewegung. Behandlungspflege umfasst medizinische Maßnahmen wie Medikamentengabe oder Wundversorgung und richtet sich nach den entsprechenden ärztlichen Vorgaben.',
  },
  {
    q: 'Helfen Sie auch im Haushalt?',
    a: 'Ja. Haushaltsführung und Einkaufen gehören zum veröffentlichten Angebot. Welche Unterstützung im Einzelfall möglich ist, wird gemeinsam besprochen.',
  },
  {
    q: 'Wer hilft, wenn Angehörige vorübergehend ausfallen?',
    a: 'Unter bestimmten Voraussetzungen kann Verhinderungspflege genutzt werden. Wir besprechen mit Ihnen, ob unser Angebot zu Ihrer Situation passt. Die Leistungsansprüche klären Sie mit Ihrer Pflegekasse.',
  },
  {
    q: 'Kommen immer dieselben Pflegekräfte?',
    a: 'Bitte sprechen Sie Ihre Wünsche zur Betreuung direkt mit uns ab. Eine feste Person oder eine bestimmte Besetzung lässt sich über die Website nicht verbindlich zusagen.',
  },
  {
    q: 'Welche Informationen helfen beim ersten Gespräch?',
    a: 'Hilfreich sind Ihr Wohnort, die gewünschte Unterstützung und der gewünschte Beginn. Falls vorhanden, können Sie auch Ihren Pflegegrad und eine ärztliche Verordnung ansprechen. Sie müssen nicht alle Antworten schon parat haben.',
  },
];
