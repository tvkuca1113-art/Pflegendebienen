/**
 * Validation shared by the browser, the server endpoint and the tests, so all
 * three agree on what a valid callback request is.
 *
 * Deliberately narrow: no diagnosis, no care documents, no insurance number.
 * Only what is needed to ring somebody back.
 */
export type CallbackKind = 'care' | 'job';

export type CallbackInput = {
  name?: string;
  phone?: string;
  place?: string;
  /** Optional: when the person is easiest to reach. */
  time?: string;
  /** Careers only. */
  area?: string;
  message?: string;
  channel?: string;
  start?: string;
  /** Must stay empty — filled only by bots. */
  company?: string;
};

export type FieldErrors = Partial<Record<keyof CallbackInput, string>>;

export const TIME_OPTIONS = [
  'Vormittags',
  'Nachmittags',
  'Abends',
  'Egal',
] as const;

export const JOB_AREAS = [
  'Pflegefachkraft',
  'Pflegeassistenz',
  'Hauswirtschaft & Betreuung',
  'Noch offen',
] as const;

export const JOB_CHANNELS = ['Telefon', 'E-Mail'] as const;

const trim = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const digits = (v: string) => (v.match(/\d/g) ?? []).length;

/** At least 6 digits, only characters a phone number may contain. */
export const isPhone = (v: string) => /^[0-9+()\/\s.-]{6,25}$/.test(v) && digits(v) >= 6;
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v);

export function validateCallback(input: CallbackInput, kind: CallbackKind = 'care'): FieldErrors {
  const errors: FieldErrors = {};
  const name = trim(input.name);
  const phone = trim(input.phone);
  const place = trim(input.place);

  if (name.length < 2) errors.name = 'Bitte geben Sie Ihren Namen an.';
  else if (name.length > 80) errors.name = 'Bitte kürzen Sie den Namen.';

  if (kind === 'care') {
    if (!phone) errors.phone = 'Bitte geben Sie eine Telefonnummer an, damit wir zurückrufen können.';
    else if (!isPhone(phone)) errors.phone = 'Diese Telefonnummer sieht nicht vollständig aus. Beispiel: 089 54637889';

    if (place.length < 2) errors.place = 'Bitte nennen Sie Ihren Ort oder Stadtteil.';
    else if (place.length > 60) errors.place = 'Bitte kürzen Sie die Ortsangabe.';

    const time = trim(input.time);
    if (time && !TIME_OPTIONS.includes(time as (typeof TIME_OPTIONS)[number])) {
      errors.time = 'Bitte wählen Sie eine der angebotenen Zeiten.';
    }
  } else {
    const channel = trim(input.channel);
    if (!JOB_CHANNELS.includes(channel as (typeof JOB_CHANNELS)[number])) {
      errors.channel = 'Bitte wählen Sie, wie wir Sie erreichen dürfen.';
    } else if (channel === 'Telefon') {
      if (!phone) errors.phone = 'Bitte geben Sie eine Telefonnummer an.';
      else if (!isPhone(phone)) errors.phone = 'Diese Telefonnummer sieht nicht vollständig aus.';
    } else {
      if (!phone) errors.phone = 'Bitte geben Sie eine E-Mail-Adresse an.';
      else if (!isEmail(phone)) errors.phone = 'Diese E-Mail-Adresse sieht nicht vollständig aus.';
    }

    const area = trim(input.area);
    if (!JOB_AREAS.includes(area as (typeof JOB_AREAS)[number])) {
      errors.area = 'Bitte wählen Sie einen Bereich aus.';
    }
    if (trim(input.message).length > 800) errors.message = 'Bitte fassen Sie sich etwas kürzer.';
  }

  return errors;
}

export const hasErrors = (e: FieldErrors) => Object.keys(e).length > 0;

/** Stable key for rejecting the same request twice in a row. */
export function fingerprint(input: CallbackInput, kind: CallbackKind): string {
  return [kind, trim(input.name), trim(input.phone), trim(input.place)]
    .join('|')
    .toLowerCase()
    .replace(/\s+/g, ' ');
}
