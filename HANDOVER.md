# Pflegende Bienen — Website-Vorschau: Übergabe

Stand: 13.09.2026 · Recherchestand der Unternehmensdaten: 13.09.2026

Diese Website ist eine **nicht öffentliche Vorschau**. Sie ist auf `noindex, nofollow`
gestellt und ersetzt die bestehende Website nicht automatisch. Abschnitt 5 beschreibt,
wie sie nach der Freigabe produktiv geschaltet wird.

---

## 1. Was umgesetzt wurde und wie das Projekt läuft

### Stack

| Thema | Entscheidung |
|---|---|
| Framework | Astro 7 (`output: 'static'`) — jede Route wird als vollständiges HTML vorgerendert |
| Sprache | TypeScript (strict), `astro check` ohne Fehler, Warnungen und Hinweise |
| Bilder | Astro Image + sharp, lokale Ableitungen in WebP mit `srcset`/`sizes` |
| Schriften | Manrope Variable und Lora 600, selbst gehostet (kein externer Font-Request) |
| Abhängigkeiten | astro, sharp, zwei Fontsource-Pakete, TypeScript, playwright (nur Prüfung) |
| JavaScript im Browser | ca. 2 KB inline, kein Framework-Runtime, keine Animations-Bibliothek |

### Befehle

```bash
npm install
npm run dev        # Entwicklungsserver
npm run build      # erzeugt Bilder-Derivate und baut nach dist/
npm run preview    # baut dist/ lokal aus
npm run verify     # astro check + HTML-Prüfung + Inhaltsprüfung
```

Weitere Prüfskripte (brauchen einen laufenden `npm run preview` auf Port 4321):

```bash
npm run verify:interaction    # Guide, Tastatur, Mobilmenü, 200 % Zoom, ohne JavaScript
npm run verify:screenshots    # Screenshots aller Seiten in screenshots/ (Desktop + Mobil)
npm run measure:performance   # LCP/CLS/Übertragungsvolumen lokal messen
```

### Struktur

```
src/
  config/site.mjs     Betriebsmodus (demo | production), Origin, Sprache
  data/               ALLE Inhalte und Fakten (business, services, faq, funding,
                      guide, insights, team, navigation, routes)
  lib/schema.ts       strukturierte Daten (JSON-LD)
  layouts/Base.astro  <head>, Landmarks, Skip-Link, Reveal-Logik
  components/         Header, Footer, Hero, Guide, FAQ, Photo, …
  pages/              Routen (inkl. sitemap.xml.ts und robots.txt.ts)
  assets/             Originalfotos (werden vom Bild-Pipeline verarbeitet)
public/               Originallogo (unverändert), Favicon, Social-Preview
docs/                 Rechercheunterlagen aus dem Paket (Quellennachweis)
```

Inhalte stehen ausschließlich in `src/data/`. Für Textänderungen muss keine
Komponente angefasst werden.

### Seiten

`/` · `/leistungen/` · `/leistungen/grundpflege/` · `/leistungen/behandlungspflege/` ·
`/leistungen/haushalt-betreuung/` · `/leistungen/verhinderungspflege/` ·
`/pflegeberatung/` · `/kosten-finanzierung/` · `/muenchen-west/` · `/germering/` ·
`/ueber-uns/` · `/kontakt/` · `/impressum/` · `/datenschutz/` · 404 ·
`/sitemap.xml` · `/robots.txt`

### Funktionen

- **Orientierungshilfe auf der Startseite** („Welche Unterstützung brauchen Sie
  gerade?"): fünf Situationen, jeweils mit passender Leistung, kurzer Erklärung,
  drei Vorbereitungsfragen und der echten Telefonnummer. Es werden **keine Daten
  abgefragt und nichts übertragen**. Ohne JavaScript sind alle fünf Antworten
  gleichzeitig lesbar.
- **Optionale Ortsprüfung** gegen das veröffentlichte Einsatzgebiet. Ein Treffer
  sagt ausdrücklich nur, dass der Ort zum veröffentlichten Gebiet gehört — nie,
  dass Kapazität frei ist.
- **Kontaktwege, die wirklich funktionieren**: Telefon, WhatsApp (mit neutralem
  Text) und ein E-Mail-Entwurf. Die Schaltfläche heißt bewusst
  „E-Mail-Entwurf öffnen" und nicht „Anfrage absenden".
- **Kein Kontaktformular**, weil kein autorisierter Empfänger existiert. Ein
  Formular würde einen Versand nur vortäuschen.
- **Mobile Kontaktleiste** („Anrufen" / „WhatsApp") unter 900 px. Der Body
  reserviert die passende Höhe plus Safe-Area, die Leiste verdeckt nichts.
- **FAQ** als native `details`/`summary`: Antworten stehen im HTML und
  funktionieren ohne JavaScript.
- **Signature-Motion**: ein abstraktes bernsteinfarbenes Band an der Hero-Kante
  (SVG, einmalige Einblendung) und sanfte Abschnitts-Einblendungen. Beides
  respektiert `prefers-reduced-motion`; eine Sicherung blendet Inhalte nach
  1,5 s in jedem Fall ein, damit nie etwas unsichtbar bleibt.

---

## 2. Verwendete Geschäftsdaten und Bildquellen

### Geschäftsdaten (aus dem Rechercheppaket, Stand 13.09.2026)

| Feld | Wert |
|---|---|
| Marke | Pflegende Bienen |
| Leistungsbezeichnung | Ambulanter Pflegedienst & Seniorenbetreuung |
| Slogan (sekundär) | „Damit das Leben lebenswert bleibt" |
| Firmierung (rechtlich) | Pflegende Bienen Marija Jelacic Bjelovuk und Dusko Bjelovuk GbR |
| Telefon | 089 54637889 → `tel:+498954637889` |
| E-Mail | info@pflegendebienen.de |
| Fax | 089 54637891 |
| WhatsApp | +49 176 22906287 → `https://wa.me/4917622906287` |
| Büro München | Fürstenrieder Str. 137, 80686 München |
| Büro Germering | Otto-Wagner-Str. 10, 82110 Germering |
| Sitz laut Impressum | Kurfürstenstr. 16, 82110 Germering — **kein Besucherbüro** |
| Inhaberin | Marija Jelačić Bjelovuk — Inhaberin & Pflegedienstleitung |
| Inhaber | Duško Bjelovuk — Organisation & interne Abläufe, d.bjelovuk@pflegendebienen.de, +49 179 9543008 |
| Instagram | https://www.instagram.com/pflegendebienen/ |
| Facebook | https://www.facebook.com/pflegendebienen/ |

Einsatzgebiet wie veröffentlicht — München: Neuhausen, Nymphenburg, Laim, Pasing,
Obermenzing, Aubing, Großhadern, Blumenau. Umland: Gräfelfing, Planegg, Germering,
Puchheim, Eichenau, Gilching.

Die rechtliche Schreibweise ohne diakritische Zeichen steht ausschließlich in
Impressum und Datenschutz; redaktionell werden die korrekt akzentuierten Namen
verwendet. Die Sitzadresse erscheint nirgends als Besucherbüro — auf jeder Seite,
auf der sie auftaucht, steht der entsprechende Hinweis.

Die „mehr als 20 Jahre Erfahrung" sind ausschließlich Marija Jelačić Bjelovuk
persönlich zugeschrieben, nicht dem Unternehmen.

### Bilder

Alle Bilder stammen aus dem gelieferten Paket und sind unverändert übernommen
(keine KI-Retusche, keine Szenenänderung). Quellen und Prüfsummen:
`docs/SELECTED_ASSETS.json` und `docs/ASSET_SOURCES.json`.

| Datei | Verwendung | Quelle |
|---|---|---|
| `public/logo-original.png` | Header, Social-Preview, Favicon | pflegendebienen.de (195 × 120 px, bytegleich, MD5 `3b5a04d0…`) |
| `public/logo-weiss-90px.png` | Footer (helle Variante) | Originalvariante aus `assets/originals` |
| `hero-garten-original.jpg` | Hero | pflegendebienen.de |
| `marija-jelacic-bjelovuk.jpeg` | Startseite + Über uns | pflegendebienen.de (1000 × 1000) |
| `dusko-bjelovuk.jpeg` | Startseite + Über uns | pflegendebienen.de (1000 × 1000) |
| `team-alltag-facebook.jpg` | Startseite, Abschnitt „Wobei dürfen wir…" | Facebook 1624282706363580 |
| `team-fortbildung-instagram.webp` | Einblicke, 19.03.2026 | instagram.com/p/DWEl3z3CCsl/ |
| `team-gemeinsam-instagram.webp` | Einblicke, 23.03.2026 | instagram.com/p/DWPHSbdiG7Q/ |
| `team-terrasse-instagram.webp` | Einblicke, 10.03.2026 | instagram.com/p/DVtRtxTCGhd/ |
| `team-garten-facebook.jpg` | Leistungen + Über uns | Facebook 1426070486184804 |
| `team-gruppe-facebook.jpg` | Über uns | Facebook 1633111288814055 |
| `team-kaffeepause-instagram.webp` | Über uns | instagram.com/p/DV2_4xAiEhL/ |
| `team-laura-sanja-facebook.jpg` | Über uns (Archiv, 06.08.2026) | Facebook 1674412474683936 |
| 24 Porträts in `src/assets/team/` | Über uns, kleine Profilbilder | Team-Seite von pflegendebienen.de |

Das Originallogo wurde **nicht** neu gezeichnet, eingefärbt, vereinfacht oder
animiert. Es wird mit 132 px (mobil) bzw. 145 px (Desktop) Breite im
Originalseitenverhältnis 195 : 120 dargestellt. Favicon und Social-Preview sind
reine Skalierungen bzw. Kompositionen aus dem Originallogo und dem echten
Hero-Foto (`scripts/generate-static-images.mjs`), keine Neuzeichnungen.

Die Team-Porträts zeigen **nur Vornamen**, so wie sie in den veröffentlichten
Dateinamen der Team-Seite stehen. Es werden keine Berufsbezeichnungen,
Qualifikationen, Sprachkenntnisse oder Dienstjahre behauptet.

Alle Bilder liegen lokal. Es wird nichts von Instagram- oder Facebook-CDNs
nachgeladen.

---

## 3. Tatsächlich durchgeführte Prüfungen und verbleibende Grenzen

Alle folgenden Prüfungen wurden am 13.09.2026 in dieser Umgebung ausgeführt.
Chromium 1194 über Playwright, lokaler Preview-Server.

### Build und Typen

- `astro check`: **0 Fehler, 0 Warnungen, 0 Hinweise** (58 Dateien).
- `npm run build`: 15 Seiten, erfolgreich.
- `npm audit`: **0 Schwachstellen**.

### HTML- und Metadaten-Prüfung (`npm run verify:html`, 15 Seiten)

Bestanden: genau ein `<h1>` je Seite · seitenspezifischer Title und Description ·
Canonical-URL · `noindex, nofollow` im Demo-Modus · `lang="de"` · jedes `<img>`
mit `alt` sowie `width`/`height` · valides JSON-LD · keine Social-CDN-Hotlinks ·
keine verbotenen Schema-Felder (`aggregateRating`, `Review`, `Physician`,
`Hospital`, `openingHours`, `priceRange`, `geo`, `award`, `hasCredential`).

### Inhaltsprüfung (`npm run verify:content`, 15 Seiten)

Bestanden: keine erfundenen Bewertungen, Öffnungszeiten, Kapazitäts- oder
Reaktionszusagen, Preise, Zertifikate oder Auszeichnungen · Verhinderungspflege
nirgends unter SGB V eingeordnet · „§ 39 SGB XI" auf der Verhinderungspflege-Seite
vorhanden · Sitzadresse nirgends ohne den Hinweis „kein Büro für Besuche" ·
SAPV nur innerhalb einer ausdrücklichen Abgrenzung · rechtliche Firmierung im
Impressum, akzentuierte Namen redaktionell.

### Interaktion und Barrierefreiheit (`npm run verify:interaction`, 24 Prüfungen, 0 Fehler)

| Prüfung | Ergebnis |
|---|---|
| Guide: Antworten eingeklappt beim Laden, genau eine sichtbar nach Auswahl | bestanden |
| Guide: Pfeiltasten wechseln die Auswahl (native Radiogruppe) | bestanden |
| Ortsprüfung: Treffer- und Nicht-Treffer-Meldung | bestanden |
| Skip-Link: erster Tabstopp, wird sichtbar, setzt den Fokus in `<main>` | bestanden |
| FAQ-Akkordeon öffnet per Klick und Tastatur | bestanden |
| `tel:`, `wa.me` (mit neutralem Text) und `mailto:` korrekt | bestanden |
| Logo 145 × 89 CSS aus 195 × 120 Original, Seitenverhältnis erhalten | bestanden |
| Kein interaktives Ziel unter 32 px Höhe (Schaltflächen ≥ 46–52 px) | bestanden |
| Alle 14 internen Links liefern HTTP 200 | bestanden |
| Mobil: Menü öffnet, `aria-expanded` korrekt, Escape schließt | bestanden |
| Mobil: Kontaktleiste verdeckt das Seitenende nicht | bestanden |
| 200 % Textzoom auf 390 px: kein horizontaler Überlauf | bestanden |
| `prefers-reduced-motion`: alle Inhalte sofort sichtbar | bestanden |
| Ohne JavaScript: alle Guide-Antworten und FAQ-Antworten lesbar, nichts versteckt | bestanden |

Zusätzlich: Screenshots aller 15 Seiten bei 1440 px und 390 px wurden erzeugt und
gesichtet. Auf keiner Seite gab es horizontalen Überlauf, JavaScript-Fehler,
Konsolenfehler oder HTTP-Fehler.

Kontrastwerte wurden rechnerisch geprüft (WCAG-Formel): Fließtext 8,9 : 1,
Haupttext 15,5 : 1, Textlinks 6,6 : 1, dunkle Schrift auf Markenorange 7,5 : 1,
heller Text auf dunklem Abschnitt 14,9 : 1, Rahmen der sekundären Schaltfläche
3,2 : 1. Alle Werte erfüllen mindestens WCAG AA.

### Gemessene Performance (`npm run measure:performance`)

Lokaler Preview-Server, **ohne Netzwerk- oder CPU-Drosselung**. Das sind keine
Feldwerte und kein Lighthouse-Ergebnis.

| Seite | LCP | CLS | Übertragung |
|---|---|---|---|
| `/` (Desktop 1440) | 256 ms | 0 | 227 KB |
| `/` (Mobil 390) | 148 ms | 0 | 265 KB |
| `/leistungen/` | 124–144 ms | 0 | 64–143 KB |
| `/kosten-finanzierung/` | 116–156 ms | 0 | 64 KB |
| `/ueber-uns/` | 136–192 ms | 0 | 261–405 KB |

Das Hero-Bild wird bewusst **nicht** lazy geladen (`loading="eager"`,
`fetchpriority="high"`, feste Maße). Alle übrigen Bilder sind lazy. CLS ist 0,
weil alle Bilder explizite Maße und Seitenverhältnisse haben.

### Verbleibende technische Grenzen

- **Kein Lighthouse-Lauf und keine Feldmessung.** Die Zahlen oben stammen aus der
  Performance-API auf einem lokalen Server ohne Drosselung. Unter realen
  Bedingungen (Hosting, Mobilfunk, langsames Gerät) fallen sie schlechter aus.
  Vor dem Launch sollte auf der Zielumgebung gemessen werden.
- **Kein automatisierter Audit mit axe oder ähnlichen Werkzeugen.** Geprüft wurde
  mit den oben aufgeführten gezielten Tests, Kontrastrechnung und manueller
  Sichtung — nicht mit einem vollständigen WCAG-Audit. Eine unabhängige Prüfung
  vor dem Launch ist sinnvoll, besonders wegen der älteren Zielgruppe.
- **Kein Test mit echten Screenreadern** (NVDA, VoiceOver) und kein Test auf
  echten Geräten; geprüft wurde in Chromium-Emulation.
- **Strukturierte Daten wurden nicht gegen das Google-Rich-Results-Werkzeug
  geprüft** (kein Zugang aus dieser Umgebung). Das JSON-LD ist syntaktisch valide
  und inhaltlich auf die belegten Felder beschränkt.
- **`hyphens: auto`** verbessert Umbrüche langer Komposita, ist aber
  browserabhängig. Als Absicherung sorgt `overflow-wrap: anywhere` dafür, dass
  auch ohne Trennwörterbuch nichts abgeschnitten wird.
- **Die Vorschau läuft unter `https://demo.pflegendebienen.de`** als Platzhalter-
  Origin. Vor dem Launch muss der echte Origin gesetzt werden (Abschnitt 5).

---

## 4. Vor der Veröffentlichung durch die Inhaber zu klären

Die folgenden Punkte wurden bewusst **nicht** erfunden. Sie fehlen auf der
Website oder sind ausdrücklich als ungeklärt gekennzeichnet.

### Bilder und Personen — vorrangig

1. **Nutzungsrechte an allen Fotos** schriftlich bestätigen (eigene Website,
   Facebook, Instagram).
2. **Einwilligungen der abgebildeten Personen** für die Verwendung auf der neuen
   Website einholen — insbesondere für die Team-Porträts, die Gruppenfotos und
   das Hero-Bild. Die im Hero abgebildeten Personen sind nicht als Patientinnen,
   Angehörige oder bestimmte Familie bezeichnet; das sollte so bleiben, solange
   nichts anderes belegt und eingewilligt ist.
3. **Vornamen der Team-Porträts prüfen** und entscheiden, ob Rollen ergänzt werden
   sollen. Aktuell steht bewusst keine einzige Funktionsbezeichnung dort.
4. Falls das Logo auch für Druck gebraucht wird: **größere Original- oder
   Vektordatei beim Unternehmen anfordern.** Die vorhandene Fassung hat
   195 × 120 px; eine SVG-Rekonstruktion wurde bewusst nicht erfunden.

### Betrieb und Erreichbarkeit

5. **Öffnungs- bzw. Erreichbarkeitszeiten** festlegen. Stehen aktuell nirgends.
   Die Bürokarten sagen stattdessen „bitte vorher telefonisch anmelden".
6. **Bedeutung der „24-Std-Hotline"** aus der alten Meta-Beschreibung klären.
   Wurde nicht übernommen, weil unklar ist, was genau zugesagt wird.
7. **Reaktionszeiten**: Falls eine Zusage gemacht werden soll („Rückruf binnen
   X"), muss sie betrieblich abgesichert sein. Aktuell wird keine gemacht.
8. **Kapazität und Aufnahmeprozess**: Die Website sagt überall, dass ein
   möglicher Beginn persönlich geklärt wird. Falls es einen definierten Ablauf
   gibt (Erstbesuch, Beratungsgespräch, Probezeitraum), sollte der
   Drei-Schritte-Abschnitt auf der Startseite daran angepasst werden.

### Leistungen und Zulassungen

9. **Beratungseinsätze nach § 37 Abs. 3 SGB XI**: Die Seite `/pflegeberatung/`
   sagt ausdrücklich, dass eine solche Zulassung nicht belegt ist. Falls sie
   besteht, bitte Nachweis liefern — dann kann der Absatz geändert werden.
10. **Palliative Begleitung**: Umfang klären. Aktuell nur als Gesprächsangebot
    erwähnt, mit ausdrücklicher Abgrenzung von SAPV und Rund-um-die-Uhr-Betreuung.
11. **Physiotherapie, Fußpflege, Friseur**: Aktuell als „nicht eigenständige
    Leistung, bitte mit dem Team absprechen" beschrieben. Falls Kooperationen
    bestehen, können sie benannt werden — mit Zustimmung der Partner.
12. **Sprachkenntnisse im Team**: nicht genannt, weil nicht belegt. Falls
    mehrsprachige Versorgung angeboten wird, ist das ein starkes Argument und
    sollte ergänzt werden.
13. **Aktuelle Stellen**: Die Karriere-Notiz auf `/ueber-uns/` ist bewusst eine
    allgemeine Einladung ohne Vakanzen. Falls Stellen offen sind, bitte konkret
    benennen.

### Finanzierung

14. **Beträge prüfen**: Entlastungsbetrag (bis 131 € monatlich) und gemeinsames
    Jahresbudget für Verhinderungs- und Kurzzeitpflege (bis 3.539 €) tragen den
    sichtbaren Hinweis „Informationsstand: 13.09.2026" und die amtlichen Quellen.
    **Vor dem Launch gegen die verlinkten Quellen erneut prüfen** und danach
    regelmäßig — die Werte in `src/data/funding.ts` und `RESEARCH_DATE` in
    `src/data/business.ts` aktualisieren.
15. Es gibt bewusst **keinen Kostenrechner und keine Preisliste**. Falls
    Preisangaben gewünscht sind, müssen sie fachlich belegt und gepflegt werden.

### Rechtstexte

16. **Impressum**: Die Felder Umsatzsteuer-ID bzw. Steuerbefreiung,
    Aufsichtsbehörde und Zulassung, Berufsbezeichnung, Berufshaftpflicht und die
    nach § 18 Abs. 2 MStV verantwortliche Person sind auf der Seite als offen
    markiert und müssen ergänzt werden. Nichts davon wurde erfunden.
17. **Der Verweis auf die EU-Online-Streitbeilegungsplattform wurde nicht
    übernommen** — die Plattform hat den Betrieb am 20.07.2025 eingestellt. Der
    alte Text sollte auch auf der bestehenden Website korrigiert werden.
18. **Datenschutz**: Hosting-Anbieter, Serverstandort und Speicherdauer der
    Logdateien eintragen, Auftragsverarbeitungsvertrag abschließen, ggf.
    Datenschutzbeauftragte benennen.
19. **Beide Rechtstexte anwaltlich prüfen lassen.** Die Seiten sind fachlich
    sauber aufgebaut, aber nicht juristisch geprüft.

### Externe Profile

20. **NAP-Konsistenz herstellen**: In externen Verzeichnissen taucht teilweise ein
    älterer Name („B. Tolj") und eine abweichende Adresse auf. Vor lokalem
    SEO-Aufbau sollten Name, Adresse und Telefonnummer über alle Profile
    angeglichen werden. **Das Google-Unternehmensprofil wurde von dieser Arbeit
    nicht angefasst** und es wurden keine Änderungen an Verzeichnissen gemeldet.

---

## 5. Von der Vorschau in den Produktivbetrieb

### Was im Demo-Modus passiert

- Jede Seite trägt `<meta name="robots" content="noindex, nofollow">`.
- `robots.txt` erlaubt das Crawlen **absichtlich** — eine `noindex`-Direktive kann
  nur wirken, wenn die Seite abgerufen werden darf. Ein `Disallow` würde die
  Direktive verstecken.
- Canonical-URLs und die Sitemap zeigen auf `https://demo.pflegendebienen.de`.
- Im Footer sowie in Impressum und Datenschutz steht ein sichtbarer Vorschau-Hinweis.

### Vorschau auf Vercel bereitstellen

`vercel.json` liegt im Projekt und legt Framework (`astro`), Build-Befehl
(`npm run build`), Ausgabeordner (`dist`), `trailingSlash: true` sowie
Cache- und Sicherheits-Header fest. In Vercel muss nichts von Hand konfiguriert
werden.

Eine Umgebungsvariable sollte gesetzt werden, damit Canonical-URLs, Sitemap und
Open-Graph-Angaben auf die tatsächliche Adresse zeigen:

```
PUBLIC_SITE_ORIGIN = https://<projekt>.vercel.app
```

Die Vorschau bleibt dabei auf `noindex, nofollow`. Ein sauberer Build aus einem
frischen Klon (`npm ci && npm run build`) wurde geprüft: 15 Seiten, keine
Fehler. Die abgeleiteten Dateien in `public/` (Favicon, Apple-Touch-Icon,
Social-Preview) liegen zusätzlich im Repository, damit sie auch dann vorhanden
sind, wenn ein Build-Schritt übersprungen wird.

### Umschalten (nach Freigabe und Rechtsprüfung)

1. Punkte aus Abschnitt 4 abarbeiten, insbesondere Bildrechte und Rechtstexte.
2. Beim Build zwei Umgebungsvariablen setzen (in Vercel unter
   *Settings → Environment Variables*):

   ```bash
   PUBLIC_SITE_MODE=production \
   PUBLIC_SITE_ORIGIN=https://pflegendebienen.de \
   npm run build
   ```

   Das entfernt automatisch alle `noindex`-Tags und die Vorschau-Hinweise und
   setzt Canonicals, Sitemap, `robots.txt`, Open-Graph-URLs und die IDs der
   strukturierten Daten auf die echte Domain.
3. `npm run verify` erneut ausführen. **Hinweis:** die HTML-Prüfung erwartet im
   Demo-Modus `noindex`; für einen Produktions-Build ist diese eine Zusicherung in
   `scripts/verify-html.mjs` umzustellen.
4. `dist/` als statische Seite ausliefern. Eine 404-Seite liegt unter `/404.html`.
5. Erst danach die Sitemap in der Google Search Console einreichen.
6. Vor dem endgültigen Wechsel: Weiterleitungen der bestehenden URLs planen, damit
   vorhandene Rankings nicht verloren gehen.

### Was bewusst nicht getan wurde

- Keine Änderung am Google-Unternehmensprofil und an externen Verzeichnissen.
- Keine Testanfrage an die echte Rufnummer, WhatsApp-Nummer oder E-Mail-Adresse.
- Keine Veröffentlichung, keine Indexierung, kein Domainwechsel.
- Keine Tracking-, Analyse- oder Werbe-Dienste — deshalb auch kein Cookie-Banner.
