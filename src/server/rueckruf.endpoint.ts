/**
 * Server contract for the callback request.
 *
 * NOT ACTIVE YET — activating it needs two things the project does not have:
 *
 *   1. `npx astro add vercel` and remove `outputDirectory` from vercel.json
 *      (the adapter writes to .vercel/output, which Vercel detects itself).
 *   2. Move this file to `src/pages/api/rueckruf.ts` and set the environment
 *      variables listed in OWNER-QUESTIONS.md.
 *
 * It is kept outside src/pages on purpose: a route exporting
 * `prerender = false` fails the static build while no adapter is installed,
 * and a broken build would be a worse outcome than a documented gap.
 *
 * Behaviour, once active:
 *   - POST only, JSON only, body capped.
 *   - Honeypot field must be empty.
 *   - Shared validation (src/lib/callback.ts), identical to the browser's.
 *   - Per-IP rate limit and a short duplicate window.
 *   - Care and recruitment go to *different* recipients; neither falls back
 *     to the other.
 *   - 202 is returned only after the delivery provider accepts the message.
 *     The browser must never show success on anything else.
 *   - The payload is not logged; only counters and error codes are.
 */
import type { APIRoute } from 'astro';
import { validateCallback, hasErrors, fingerprint, type CallbackKind } from '../lib/callback';

export const prerender = false;

const MAX_BODY = 8 * 1024;
const RATE_LIMIT = { windowMs: 10 * 60_000, max: 5 };
const DUPLICATE_WINDOW = 10 * 60_000;

const hits = new Map<string, number[]>();
const recent = new Map<string, number>();

function tooMany(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > RATE_LIMIT.max;
}

function isDuplicate(key: string): boolean {
  const now = Date.now();
  for (const [k, t] of recent) if (now - t > DUPLICATE_WINDOW) recent.delete(k);
  if (recent.has(key)) return true;
  recent.set(key, now);
  return false;
}

/** Swap for the provider the owner chooses. Must resolve only on acceptance. */
async function deliver(to: string, subject: string, body: string): Promise<void> {
  const endpoint = import.meta.env.CALLBACK_API_URL;
  const key = import.meta.env.CALLBACK_API_KEY;
  const from = import.meta.env.CALLBACK_FROM;
  if (!endpoint || !key || !from) throw new Error('delivery_not_configured');

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ from, to, subject, text: body }),
  });
  if (!res.ok) throw new Error(`delivery_rejected_${res.status}`);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const json = (status: number, payload: unknown) =>
    new Response(JSON.stringify(payload), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json(415, { ok: false, error: 'unsupported_media_type' });
  }
  const raw = await request.text();
  if (raw.length > MAX_BODY) return json(413, { ok: false, error: 'too_large' });

  let input: Record<string, string>;
  try {
    input = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: 'invalid_json' });
  }

  // Bots fill every field they find; people never see this one.
  if (typeof input.company === 'string' && input.company.trim() !== '') {
    return json(202, { ok: true });
  }

  const kind: CallbackKind = input.kind === 'job' ? 'job' : 'care';
  const errors = validateCallback(input, kind);
  if (hasErrors(errors)) return json(422, { ok: false, errors });

  if (tooMany(clientAddress ?? 'unknown')) {
    return json(429, { ok: false, error: 'rate_limited' });
  }
  if (isDuplicate(fingerprint(input, kind))) {
    return json(409, { ok: false, error: 'duplicate' });
  }

  const to =
    kind === 'job'
      ? import.meta.env.CALLBACK_TO_JOBS
      : import.meta.env.CALLBACK_TO_CARE;
  if (!to) return json(503, { ok: false, error: 'delivery_not_configured' });

  const lines =
    kind === 'job'
      ? [
          `Name: ${input.name}`,
          `Rückmeldung über: ${input.channel} – ${input.phone}`,
          `Bereich: ${input.area}`,
          `Gewünschter Start: ${input.start || 'keine Angabe'}`,
          `Nachricht: ${input.message || '–'}`,
        ]
      : [
          `Name: ${input.name}`,
          `Telefon: ${input.phone}`,
          `Ort: ${input.place}`,
          `Erreichbar: ${input.time || 'keine Angabe'}`,
        ];

  try {
    await deliver(
      to,
      kind === 'job' ? 'Interesse an einer Mitarbeit' : 'Rückrufbitte über die Website',
      lines.join('\n'),
    );
  } catch (error) {
    const code = error instanceof Error ? error.message : 'delivery_failed';
    return json(code === 'delivery_not_configured' ? 503 : 502, { ok: false, error: code });
  }

  return json(202, { ok: true });
};
