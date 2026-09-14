/**
 * Three curated posts from the company's own public social profiles.
 * Summaries are written in our own words from the supplied post records
 * (docs/INSTAGRAM_POSTS.json). They are not patient reviews.
 */
export type Insight = {
  title: string;
  dateDisplay: string;
  dateISO: string;
  text: string;
  image: string;
  alt: string;
  sourceUrl: string;
  sourceLabel: string;
};

export const INSIGHTS: readonly Insight[] = [
  {
    title: 'Gemeinsam lernen',
    dateDisplay: '19.03.2026',
    dateISO: '2026-03-19',
    text: 'Eine gemeinsame Fortbildung im Büro. Das Team lernt regelmäßig zusammen.',
    image: 'team-fortbildung-instagram.webp',
    alt: 'Gemeinsame Fortbildung am großen Tisch im Büro der Pflegenden Bienen',
    sourceUrl: 'https://www.instagram.com/p/DWEl3z3CCsl/',
    sourceLabel: 'Beitrag auf Instagram ansehen',
  },
  {
    title: 'Zeit für ein gemeinsames Miteinander',
    dateDisplay: '23.03.2026',
    dateISO: '2026-03-23',
    text: 'Ein gemeinsames Treffen am gedeckten Tisch – Zeit füreinander abseits der Touren.',
    image: 'team-gemeinsam-instagram.webp',
    alt: 'Gemeinsames Treffen des Teams an einem gedeckten Tisch',
    sourceUrl: 'https://www.instagram.com/p/DWPHSbdiG7Q/',
    sourceLabel: 'Beitrag auf Instagram ansehen',
  },
  {
    title: 'Eine Pause zwischen den Einsätzen',
    dateDisplay: '10.03.2026',
    dateISO: '2026-03-10',
    text: 'Eine kurze Kaffeepause auf der Terrasse, bevor es weiter zu den Patientinnen und Patienten geht.',
    image: 'team-terrasse-instagram.webp',
    alt: 'Gemeinsame Kaffeepause des Teams auf einer Terrasse',
    sourceUrl: 'https://www.instagram.com/p/DVtRtxTCGhd/',
    sourceLabel: 'Beitrag auf Instagram ansehen',
  },
];

/** One additional archive post, used on the about page only. */
export const ARCHIVE_INSIGHT: Insight = {
  title: 'Geburtstagsgrüße im Team',
  dateDisplay: '06.08.2026',
  dateISO: '2026-08-06',
  text: 'Geburtstagsgrüße an Laura und Sanja, mit Blumen und Kuchen im Büro.',
  image: 'team-laura-sanja-facebook.jpg',
  alt: 'Laura und Sanja mit Blumen und Geburtstagskuchen',
  sourceUrl: 'https://www.instagram.com/p/Dbr5iN1iIyu/',
  sourceLabel: 'Beitrag auf Instagram ansehen',
};
