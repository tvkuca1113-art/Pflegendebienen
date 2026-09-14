export type FaqItem = { q: string; a: string };

/** Homepage FAQ — mirrored 1:1 into FAQPage structured data. */
export const FAQ: readonly FaqItem[] = [
  {
    q: 'Kann ich auch ohne Pflegegrad anfragen?',
    a: 'Ja. Melden Sie sich gern, auch wenn noch kein Pflegegrad vorliegt. Wir besprechen, welche Unterstützung sinnvoll wäre und was sich darüber finanzieren lässt. Ärztlich verordnete Behandlungspflege ist ohnehin nicht an einen Pflegegrad gebunden.',
  },
  {
    q: 'Wie schnell kann die Pflege beginnen?',
    a: 'Das hängt vom Bedarf, vom Wohnort und von unseren aktuellen Möglichkeiten ab. Rufen Sie uns an, dann sagen wir Ihnen ehrlich, was wir anbieten können. Einen festen Termin können wir über die Website nicht zusagen.',
  },
  {
    q: 'Welche Kosten können für uns entstehen?',
    a: 'Pflegekasse und Krankenkasse übernehmen unterschiedliche Leistungen, jeweils unter bestimmten Voraussetzungen. Was darüber hinausgeht, ist privat zu tragen. Wir gehen den geplanten Umfang mit Ihnen durch und sagen, was Sie mit Ihrer Kasse klären sollten.',
  },
  {
    q: 'Kommen immer dieselben Pflegekräfte?',
    a: 'Vertraute Gesichter sind vielen Menschen wichtig, und wir nehmen Ihre Wünsche dazu ernst. Wie sich das im Einsatzplan umsetzen lässt, besprechen wir persönlich. Eine feste Zusage dazu über die Website wäre unseriös.',
  },
  {
    q: 'Was brauchen Sie für das erste Gespräch?',
    a: 'Zunächst nur Ihre Schilderung: Wohnort, was im Alltag schwierig ist und ab wann Unterstützung gewünscht wird. Falls vorhanden, helfen Angaben zum Pflegegrad oder zu einer ärztlichen Verordnung. Sie müssen nichts vorbereiten.',
  },
  {
    q: 'Was, wenn mein Angehöriger Hilfe noch nicht annehmen möchte?',
    a: 'Das ist häufig und verständlich. Oft hilft ein kleiner Anfang bei etwas Konkretem statt eines großen Pflegeplans. Entscheidend bleibt die Zustimmung der betroffenen Person – sprechen Sie uns an, wir überlegen gemeinsam.',
  },
];
