/**
 * Generates two derived files in public/ from the ORIGINAL supplied assets:
 *   - social-preview.jpg : 1200×630 card = warm panel + unmodified logo + the
 *                          real hero photograph, cropped centrally so no face
 *                          is cut. Nothing in the photograph is altered.
 *   - favicon.png / apple-touch-icon.png : the original logo, scaled and
 *                          padded on the warm brand background. The logo is
 *                          not redrawn, recoloured or reconstructed.
 *
 * Run via `npm run prebuild` (also wired into `npm run build`).
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAPER = { r: 255, g: 249, b: 240, alpha: 1 };

const logo = path.join(root, 'public/logo-original.png');
const hero = path.join(root, 'src/assets/selected/hero-garten-original.jpg');
const out = path.join(root, 'public');

await mkdir(out, { recursive: true });

/* --- Social preview ---------------------------------------------------- */
const W = 1200;
const H = 630;
const PHOTO_W = 700;

const photo = await sharp(hero)
  .resize(PHOTO_W, H, { fit: 'cover', position: 'centre' })
  .toBuffer();

const logoBig = await sharp(logo).resize({ width: 300 }).toBuffer();

await sharp({ create: { width: W, height: H, channels: 4, background: PAPER } })
  .composite([
    { input: photo, left: W - PHOTO_W, top: 0 },
    { input: logoBig, left: 74, top: Math.round(H / 2) - 92 },
    {
      // Thin brand rule under the logo, part of the layout, not of the photo.
      input: {
        create: { width: 132, height: 6, channels: 4, background: { r: 248, g: 155, b: 28, alpha: 1 } },
      },
      left: 74,
      top: Math.round(H / 2) + 122,
    },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(out, 'social-preview.jpg'));

/* --- Favicons ---------------------------------------------------------- */
for (const [file, size, pad] of [
  ['favicon.png', 64, 6],
  ['apple-touch-icon.png', 180, 18],
]) {
  const inner = await sharp(logo)
    .resize({ width: size - pad * 2, fit: 'inside' })
    .toBuffer();
  const meta = await sharp(inner).metadata();
  await sharp({ create: { width: size, height: size, channels: 4, background: PAPER } })
    .composite([{ input: inner, left: pad, top: Math.round((size - (meta.height ?? size)) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(out, file));
}

console.log('Static images generated from original assets.');
