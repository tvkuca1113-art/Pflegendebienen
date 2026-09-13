/**
 * Employee portraits published on the company's own team page.
 *
 * Only first names are shown — exactly as the published files are labelled.
 * No roles, qualifications, languages or years of service are stated, because
 * none of that was confirmed. See HANDOVER.md.
 */
export type TeamMember = { key: string; firstName: string };

export const TEAM: readonly TeamMember[] = [
  { key: 'laura', firstName: 'Laura' },
  { key: 'ljiljana', firstName: 'Ljiljana' },
  { key: 'zlatko', firstName: 'Zlatko' },
  { key: 'shine', firstName: 'Shine' },
  { key: 'berina', firstName: 'Berina' },
  { key: 'anica', firstName: 'Anica' },
  { key: 'adriana', firstName: 'Adriana' },
  { key: 'waheeda', firstName: 'Waheeda' },
  { key: 'vedad', firstName: 'Vedad' },
  { key: 'kristina', firstName: 'Kristina' },
  { key: 'alma', firstName: 'Alma' },
  { key: 'minadir', firstName: 'Minadir' },
  { key: 'aleksandra', firstName: 'Aleksandra' },
  { key: 'marija-t', firstName: 'Marija' },
  { key: 'tea', firstName: 'Tea' },
  { key: 'marko', firstName: 'Marko' },
  { key: 'selma', firstName: 'Selma' },
  { key: 'mirjana', firstName: 'Mirjana' },
  { key: 'aldijana', firstName: 'Aldijana' },
  { key: 'oliver', firstName: 'Oliver' },
  { key: 'danica', firstName: 'Danica' },
  { key: 'muhamed', firstName: 'Muhamed' },
  { key: 'eva', firstName: 'Eva' },
  { key: 'sanja', firstName: 'Sanja' },
];
