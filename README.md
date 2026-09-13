# Pflegende Bienen — Website

Statisch gerenderte Website für **Pflegende Bienen**, ambulanter Pflegedienst und
Seniorenbetreuung in München-West und Germering.

> **Diese Version ist eine nicht öffentliche Vorschau.** Alle Seiten sind auf
> `noindex, nofollow` gestellt. Vor einer Veröffentlichung sind die Punkte in
> [HANDOVER.md](./HANDOVER.md), Abschnitt 4, zu klären.

## Schnellstart

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # statische Ausgabe nach dist/
npm run preview  # dist/ lokal ausliefern
```

## Prüfungen

```bash
npm run verify               # astro check + HTML- und Inhaltsprüfung
npm run verify:interaction   # braucht einen laufenden preview auf Port 4321
npm run verify:screenshots   # Screenshots nach screenshots/ (Desktop + Mobil)
npm run measure:performance  # LCP/CLS lokal messen
```

## Aufbau

| Pfad | Inhalt |
|---|---|
| `src/data/` | Sämtliche Inhalte und geprüften Geschäftsdaten |
| `src/config/site.mjs` | Betriebsmodus (`demo`/`production`) und Origin |
| `src/lib/schema.ts` | Strukturierte Daten (JSON-LD) |
| `src/components/` | Wiederverwendbare Bausteine |
| `src/pages/` | Routen inklusive `sitemap.xml` und `robots.txt` |
| `src/assets/` | Originalfotos für die Bild-Pipeline |
| `public/logo-original.png` | Originallogo, bytegleich, nicht verändern |
| `docs/` | Rechercheunterlagen und Bildquellen |

Texte werden in `src/data/` gepflegt, nicht in den Komponenten.

## Grundregeln für dieses Projekt

- **Das Originallogo bleibt unverändert.** Nicht neu zeichnen, einfärben,
  vereinfachen oder animieren.
- **Nichts erfinden.** Öffnungszeiten, Kapazitäten, Preise, Reaktionszeiten,
  Bewertungen, Zertifikate und Zulassungen fehlen bewusst, solange sie nicht
  belegt sind. `npm run verify:content` prüft das automatisch.
- **Verhinderungspflege ist eine Leistung nach § 39 SGB XI**, nicht nach SGB V.
- **Die Adresse Kurfürstenstr. 16 ist der Firmensitz, kein Besucherbüro.**
- **Kein Scheinformular.** Es gibt keinen autorisierten Empfänger; Telefon,
  WhatsApp und E-Mail-Entwurf sind die echten Kontaktwege.
- **Kein Tracking**, keine eingebetteten Social-Feeds, keine externen Schriften.

## Produktivbetrieb

```bash
PUBLIC_SITE_MODE=production PUBLIC_SITE_ORIGIN=https://pflegendebienen.de npm run build
```

Details in [HANDOVER.md](./HANDOVER.md), Abschnitt 5.
