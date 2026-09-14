export type FaqItem = { q: string; a: string };

/** Homepage FAQ — mirrored 1:1 into FAQPage structured data. */
export const FAQ: readonly FaqItem[] = [
  {
    q: 'Kann ich auch ohne Pflegegrad anfragen?',
    a: 'Ja, jederzeit. Wir besprechen, welche Unterstützung sinnvoll wäre und was sich darüber finanzieren lässt. Ärztlich verordnete Behandlungspflege ist ohnehin nicht an einen Pflegegrad gebunden.',
  },
  {
    q: 'Wie schnell kann die Pflege beginnen?',
    a: 'Oft schneller, als Familien erwarten. Wir klären im Gespräch, was gebraucht wird und wie unsere Touren in Ihrem Ort aussehen – und nennen Ihnen dann einen realistischen Termin.',
  },
  {
    q: 'Welche Kosten können für uns entstehen?',
    a: 'Das hängt vom Umfang der Hilfe ab. Pflegekasse und Krankenkasse tragen unterschiedliche Leistungen; was darüber hinausgeht, zahlen Sie selbst. Wir rechnen den geplanten Umfang gemeinsam mit Ihnen durch, bevor etwas vereinbart wird.',
  },
  {
    q: 'Kommen immer dieselben Pflegekräfte?',
    a: 'Vertraute Gesichter sind wichtig. Welche Pflegekräfte Sie besuchen und wie Vertretungen organisiert werden, besprechen wir mit Ihnen persönlich.',
  },
  {
    q: 'Was brauchen Sie für das erste Gespräch?',
    a: 'Ihren Wohnort, was im Alltag schwerfällt und ab wann Unterstützung gewünscht ist. Falls vorhanden, helfen Pflegegrad oder ärztliche Verordnung. Mehr braucht es für den Anfang nicht.',
  },
  {
    q: 'Was, wenn mein Angehöriger Hilfe noch nicht annehmen möchte?',
    a: 'Das ist häufig und verständlich. Oft hilft ein kleiner Anfang bei etwas Konkretem statt eines großen Pflegeplans. Entscheidend bleibt die Zustimmung der betroffenen Person – sprechen Sie uns an, wir überlegen gemeinsam.',
  },
];
