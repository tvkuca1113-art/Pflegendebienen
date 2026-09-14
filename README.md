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
npm run verify:interaction   # 38 Prüfungen, braucht einen laufenden preview auf Port 4321
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
| `src/assets/selected/` | Echte Fotos des Unternehmens |
| `src/assets/illustrative/` | KI-generierte Symbolbilder (im Bild gekennzeichnet) |
| `src/assets/team/` | Team-Porträts für die Über-uns-Seite |
| `public/logo-original.png` | Originallogo, bytegleich, nicht verändern |
| `docs/` | Rechercheunterlagen und Bildquellen |

Texte werden in `src/data/` gepflegt, nicht in den Komponenten.

## Schalter

| Variable | Standard | Wirkung |
|---|---|---|
| `PUBLIC_SITE_MODE` | `demo` | `production` entfernt `noindex` und die Vorschau-Hinweise |
| `PUBLIC_SITE_ORIGIN` | `https://demo.pflegendebienen.de` | Canonical, Sitemap, Open Graph |
| `PUBLIC_RECRUITMENT` | an | `false` entfernt Karriereabschnitt, Menüeinträge und `/karriere/` |

## Grundregeln für dieses Projekt

- **Das Originallogo bleibt unverändert.** Nicht neu zeichnen, einfärben,
  vereinfachen oder animieren.
- **Nichts erfinden.** Öffnungszeiten, Kapazitäten, Preise, Reaktionszeiten,
  Bewertungen, Zertifikate und Zulassungen fehlen bewusst, solange sie nicht
  belegt sind. `npm run verify:content` prüft das automatisch.
- **Verhinderungspflege ist eine Leistung nach § 39 SGB XI**, nicht nach SGB V.
- **Die Adresse Kurfürstenstr. 16 ist der Firmensitz, kein Besucherbüro.**
- **Kein Scheinformular.** Es gibt keinen autorisierten Empfänger; Telefon,
  WhatsApp und die als Rückrufanfrage bezeichnete E-Mail sind die echten Kontaktwege.
- **Die Markenfarbe wird aus `public/logo-original.png` gemessen** (`#F89B1C`),
  nicht geschätzt. Dunkle Schrift auf Gelb, nie umgekehrt.
- **Zwei Symbolbilder sind KI-generiert** und im Bild gekennzeichnet. Sie zeigen keine
  Patientinnen, Patienten oder Mitarbeitenden.
- **Die Situationsauswahl fragt nie nach Daten** und speichert nichts – auch nicht in
  der URL, in WhatsApp-Nachrichten oder in Analysewerkzeugen.
- **Kein Tracking**, keine eingebetteten Social-Feeds, keine externen Schriften.

## Deployment auf Vercel

Das Projekt ist eine rein statische Ausgabe; `vercel.json` legt Framework,
Build-Befehl, Ausgabeordner, Trailing-Slash-Verhalten und Cache-Header fest.

1. Repository in Vercel importieren und den Branch wählen. Build-Befehl und
   Ausgabeordner müssen nicht von Hand gesetzt werden.
2. **Eine Umgebungsvariable setzen**, damit Canonical-URLs, Sitemap und
   Open-Graph-Angaben auf die tatsächliche Adresse zeigen:

   ```
   PUBLIC_SITE_ORIGIN = https://<projekt>.vercel.app
   ```

3. Deployen. Die Seite bleibt im Vorschau-Modus: jede Seite trägt
   `noindex, nofollow`, im Footer steht der Vorschau-Hinweis.

Ohne diese Variable funktioniert die Seite ebenfalls, die Canonical-URLs
zeigen dann aber auf den Platzhalter `https://demo.pflegendebienen.de`.

## Produktivbetrieb

Erst nach Freigabe und Rechtsprüfung — zusätzlich zur obigen Variable:

```
PUBLIC_SITE_MODE   = production
PUBLIC_SITE_ORIGIN = https://pflegendebienen.de
```

Das entfernt `noindex` und alle Vorschau-Hinweise. Details und Checkliste in
[HANDOVER.md](./HANDOVER.md), Abschnitte 4 und 5.
