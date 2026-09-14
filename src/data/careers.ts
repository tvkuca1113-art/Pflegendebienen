/**
 * Careers content. Addressed with "du"; the patient-facing pages keep "Sie".
 *
 * Nothing here states an employment term. No vacancies, salaries, benefits,
 * hiring urgency or JobPosting markup — none of that is confirmed. The three
 * areas are explicitly areas of interest, and the conditions block is worded
 * as topics for the conversation.
 */
export const CAREER_AREAS = [
  {
    title: 'Pflegefachkräfte',
    text: 'Du hast eine abgeschlossene Pflegeausbildung und möchtest Menschen zu Hause versorgen – von der Grundpflege bis zur ärztlich verordneten Behandlungspflege.',
  },
  {
    title: 'Pflegeassistenz',
    text: 'Du unterstützt bei der Körperpflege und im Alltag und arbeitest eng mit den Pflegefachkräften zusammen.',
  },
  {
    title: 'Hauswirtschaft & Betreuung',
    text: 'Du hilfst im Haushalt, beim Einkaufen und begleitest Menschen durch ihren Tag – oft der Teil, der am meisten entlastet.',
  },
] as const;

export const CAREER_FACTS = [
  {
    title: 'Kurze Wege',
    text: 'Unsere Touren liegen in München-West und rund um Germering. Zwei Büros, ein Team.',
  },
  {
    title: 'Die ganze Bandbreite',
    text: 'Grundpflege, Behandlungspflege, Hauswirtschaft, Betreuung und Verhinderungspflege.',
  },
  {
    title: 'Inhabergeführt',
    text: 'Marija Jelačić Bjelovuk leitet den Pflegedienst, Duško Bjelovuk die Organisation. Kurze Entscheidungswege.',
  },
] as const;

/** Worded as topics to clarify, because no employer offer is verified. */
export const CAREER_TOPICS = [
  'Welche Arbeitszeiten für dich passen',
  'Welche Aufgaben du übernehmen möchtest',
  'Ab wann du einsteigen könntest',
  'Wie die Einarbeitung abläuft',
  'Welche praktischen Bedingungen dir wichtig sind',
] as const;

export const CAREER_STEPS = [
  { title: 'Kurz melden', text: 'Schreib uns, welche Aufgabe du suchst und wie wir dich erreichen.' },
  { title: 'Miteinander reden', text: 'Wir rufen zurück und besprechen, was zu dir passen könnte.' },
  { title: 'Nächsten Schritt vereinbaren', text: 'Wenn es für beide Seiten stimmt, verabreden wir, wie es weitergeht.' },
] as const;

export const CAREER_FAQ = [
  {
    q: 'Welche Unterlagen brauche ich für die erste Kontaktaufnahme?',
    a: 'Zunächst keine. Ein paar Sätze zu deiner bisherigen Tätigkeit und der gesuchten Aufgabe reichen völlig. Zeugnisse und Nachweise besprechen wir erst, wenn es konkret wird.',
  },
  {
    q: 'Kann ich mich melden, ohne dass eine Stelle ausgeschrieben ist?',
    a: 'Ja, genau dafür ist diese Seite da. Wir schreiben hier keine Stellen aus, freuen uns aber über Initiativbewerbungen und melden uns zurück.',
  },
  {
    q: 'Was sollte in meiner Nachricht stehen?',
    a: 'Dein Name, wie wir dich erreichen, welcher Bereich dich interessiert und ab wann du könntest. Eine kurze Nachricht dazu, was du bisher gemacht hast, hilft uns beim Einordnen.',
  },
  {
    q: 'Wie geht es nach meiner Nachricht weiter?',
    a: 'Wir melden uns bei dir und besprechen in Ruhe, welche Aufgabe passen könnte. Was danach kommt, verabreden wir gemeinsam – nichts davon ist ein Automatismus.',
  },
] as const;
