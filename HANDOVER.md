# Pflegende Bienen — Website: Übergabe

Redesign: 14.09.2026 · Recherchestand der Unternehmensdaten: 13.09.2026

Diese Website ist eine **nicht öffentliche Vorschau**. Sie ist auf `noindex, nofollow`
gestellt und ersetzt die bestehende Website nicht automatisch. Abschnitt 6 beschreibt
den Weg in den Produktivbetrieb.

---

## 1. Was dieser Redesign geändert hat

Die Startseite ist um die Entscheidung der Besucherin herum gebaut, nicht um die
Selbstdarstellung des Betriebs.

| Vorher | Jetzt |
|---|---|
| Überschrift brach in fünf kurze Zeilen | Zwei volle Sinnzeilen: „Zuhause gut versorgt. Als Familie entlastet." |
| Großes Team-Gruppenfoto vor den Entscheidungen | Ruhiges Alltagsbild im Hero, Team erst nach Kosten und Einsatzgebiet |
| Hero-Foto als abgerundete Kachel neben dem Text | **Eine** Szene: die Fotografie trägt den ganzen Bereich, das Textfeld liegt darin |
| Auf dem Telefon schnitt die Adressleiste von Safari das Foto an | Hero rechnet mit `svh` und echten Gerätehöhen; das Foto bleibt ganz |
| Leistungskarten **und** Situationsauswahl mit doppeltem Inhalt | Eine Situationsauswahl direkt unter dem Hero; die Kartensektion entfällt |
| Auswahl mit langer Einleitung, leerem Antwortfeld und Vorbehalten | Sechs kompakte Schaltflächen, kurze Antwort (51–59 Wörter), Gesprächsnotiz zum Drucken |
| Kosten erst nach der Inhaber-Vorstellung | Kosten, Ablauf und Einsatzgebiet vor dem Team |
| Facebook und Instagram nur im Fuß | Sichtbar in der Kopfzeile jeder Seite, im Fuß und bei den Einblicken |
| Kontaktformular ohne echten Weg nach draußen | Ein Formular, zwei ehrliche Modi (`server` / `draft`), getrennte Empfänger für Pflege und Bewerbung |
| Karriereseite als kurzer Teaser | Vollständige Seite mit acht Abschnitten, „du"-Ansprache und eigenem Bewerbungsformular |
| Wiederholte weiße Karten, Creme-Flächen, orange Buttons | Wechsel aus offenen Flächen, Salbei-Blöcken, einem dunklen Abschnitt |
| Sichtbare Hinweise auf fehlenden Formularempfänger und unbelegte Angaben | Entfernt; diese Punkte stehen nur noch hier und in OWNER-QUESTIONS.md |
| Zwei Schriftfamilien inkl. großer brauner Serif | Source Sans 3 für den Text, Manrope für Überschriften |

### Neue Startseiten-Reihenfolge

1. Hero — Überschrift, kurzer Text, „Pflege anfragen", Telefonnummer, Symbolbild
2. „Was brauchen Sie gerade?" — sechs Situationen mit je einer kurzen Antwort
3. „Was zahlt die Kasse – und was bleibt für Sie?" — drei Erklärungen, drei Schritte,
   Checkliste fürs erste Telefonat
4. „Kommen Sie auch zu uns?" — Ortsprüfung und die beiden Besucherbüros
5. „Persönlich ansprechbar." — eine kompakte Vorstellung von Marija Jelačić Bjelovuk
6. „Einblicke aus unserem Team" — drei eigene Beiträge mit Datum und Quelle
7. Häufige Fragen — sechs Antworten
8. „Lassen Sie uns Ihren nächsten Schritt klären." — Telefon, E-Mail, WhatsApp, Rückrufformular
9. „Dein Können zählt." — Karriereabschnitt, abschaltbar

Sichtbarer Textumfang der Startseite im Grundzustand: **602 Wörter** (Ziel 500–700,
ohne Navigation, Fußzeile und eingeklappte Antworten). Karriereseite: **475 Wörter**.

### Navigation

Hauptnavigation: **Hilfe finden · Kosten · Einsatzgebiet · Kontakt**.
Zweite Reihe: **Über uns · Arbeiten bei uns**. Daneben Facebook, Instagram und die
Rufnummer. Alle Leistungsseiten bleiben über „Hilfe finden", das Mobilmenü, die
Fußzeile und interne Links erreichbar; keine URL wurde geändert, keine Weiterleitung
ist nötig.

---

## 2. Gestaltung

### Farben — aus dem Originallogo gemessen

`public/logo-original.png` enthält genau **einen** gesättigten Farbwert:
**#F89B1C** (2614 Pixel). Der im Briefing genannte Startwert #F6A21A wurde durch
diesen gemessenen Wert ersetzt.

| Rolle | Wert | Kontrast |
|---|---|---|
| Marke | `#F89B1C` | dunkle Schrift darauf 6,96 : 1 |
| Warmes Weiß | `#FAF8F3` | – |
| Salbei | `#E8EDE3` | Text darauf 12,67 : 1 |
| Dunkler Abschnitt | `#313A2C` | heller Text darauf 11,16 : 1 |
| Haupttext | `#222821` | 14,20 : 1 auf Papier |
| Fließtext | `#4A5245` | 7,66 : 1 |
| Gedämpfte Labels | `#626C57` | 5,20 : 1 |
| Textlinks | `#7A4104` | 7,65 : 1 |
| Rahmen von Bedienelementen | `#7C8672` | 3,59 : 1 (Anforderung 3 : 1) |

Alle Werte wurden mit der WCAG-Formel berechnet, nicht geschätzt.

### Schrift und Maße

Eine Familie: **Source Sans 3 Variable**, selbst gehostet, latin-Subset vorgeladen.
Fließtext 18 px, H1 36 px mobil bis 58 px auf dem Desktop, Zeilenlänge rund 62 Zeichen.
Inhaltsbreite 1240 px, Außenabstand 20 px auf dem Handy, Kopfzeile 77 px mobil.

### Hero

**Desktop:** redaktioneller Split statt der üblichen Karte. Die Fotografie läuft ab
900 px randlos über ihre Bildschirmhälfte, vom unteren Rand der Kopfzeile bis zum Ende
des Hero. Der Text steht daneben auf ruhiger Papierfläche, die zur linken
Bildschirmkante ausläuft; seine Ausrichtung folgt weiterhin dem Raster der Seite.

**Kein Text liegt über der Fotografie.** Eine Überlagerung hätte einen Schleier über die
Gesichter gelegt und den Kontrast gesenkt — bei dieser Zielgruppe der falsche
Kompromiss. So bleibt der Text bei 14,20 : 1 und das Bild unangetastet.

**Mobil — nach dem, was ein Telefon wirklich zeigt.** Ein iPhone 13 hat bei
eingeblendeten Safari-Leisten **390 × 664 CSS-Pixel**, nicht die 844 seines
Layout-Viewports. Genau das war der Fehler der ersten Fassung: gegen 844 geprüft,
bestanden — und auf dem Gerät lag vom Foto nur ein Streifen hinter der Adressleiste.

Der Hero ist deshalb mit `svh` (kleinster Viewport) bemessen und endet
**absichtlich vor dem Seitenumbruch**:

```
min-height: calc(100svh - var(--header-h) - 2.5rem);
```

Die verbleibenden 2,5 rem lassen den Hinweisstreifen darunter hineinragen — ein
bewusster Hinweis, dass die Seite weitergeht, statt einer „falschen Unterkante". Die
Fotografie sitzt in einer `1fr`-Zeile und nimmt genau den Platz, der nach dem Text
übrig bleibt; ein Boden von 8 rem verhindert, dass sie zum Streifen schrumpft. Weil es
eine `min-height` ist, darf der Hero bei vergrößertem Text wachsen — nichts wird
abgeschnitten.

Gemessen mit echten Geräteprofilen:

| Gerät | sichtbare Höhe | Überschrift | Foto in der ersten Ansicht |
|---|---|---|---|
| iPhone SE | 568 px | 3 Zeilen | 27 px |
| iPhone 13 | 664 px | 2 Zeilen | 128 px, vollständig |
| iPhone 14 Pro Max | 740 px | 2 Zeilen | 266 px, vollständig |
| Pixel 7 | 839 px | 2 Zeilen | 367 px, vollständig |

Überschrift, Text, Hauptaktion und Telefonnummer sind auf allen vier Geräten in der
ersten Ansicht. Die Überschrift bleibt ab 390 px bei zwei Zeilen — drei Zeilen würden
auf einem Telefon die Hauptaktion nach unten drücken.

Die Bildunterschrift „KI-generiertes Symbolbild" sitzt als kleine Auszeichnung in der
unteren Ecke des Fotos, auf deckendem dunklem Grund.

**Grundlagen dieser Entscheidungen:** die `dvh`/`svh`-Einheiten gegen das
iOS-Safari-Viewport-Problem, die Regel „Überschrift auf dem Telefon höchstens zwei
Zeilen, sonst rutscht die Aktion unter den Umbruch", und der Hinweis, dass ein Hero
über die volle Viewport-Höhe als „falsche Unterkante" gelesen wird und das Scrollen
verhindert. Quellen stehen im Abschnitt unten.

### Logo

Unverändert: dieselbe Datei, dasselbe Seitenverhältnis 195 : 120, 98 px mobil und
128 px auf dem Desktop. Nicht neu gezeichnet, nicht eingefärbt, nicht animiert.

---

## 3. Die Situationsauswahl

Sechs Schaltflächen: Nach dem Krankenhaus · Waschen & Anziehen · Medikamente &
Verbände · Haushalt & Begleitung · Entlastung für Angehörige · Ich brauche Orientierung.
3 × 2 ab 61 rem, 2 × 3 ab 22 rem, eine Spalte darunter — die Abfragen sind bewusst in
`rem`, damit bei vergrößertem Text automatisch auf eine Spalte umgestellt wird.

- **Kein Konto, keine Kontaktdaten, keine Pflegegrad-Frage**, um eine Antwort zu sehen.
- Jede Antwort: eine Aussage, drei praktische Punkte, die echte Telefonnummer und der
  Link auf die passende Leistungsseite. Gemessen 47–55 Wörter.
- Auswahl wechseln, erneut klicken zum Schließen und „Auswahl zurücksetzen" funktionieren
  ohne Neuladen; der Fokus kehrt danach auf die Schaltfläche zurück.
- Bei Tastaturbedienung erhält das Antwortfeld den Fokus; es wird nur gescrollt, wenn
  es sonst hinter der Kopfzeile läge (`prefers-reduced-motion` wird beachtet).
- **Ohne JavaScript** sind alle sechs Antworten mit ihren gewöhnlichen Links sichtbar.
- „Für das Gespräch merken" erzeugt eine druckbare Notiz in einem versteckten
  `iframe`. Nichts wird gespeichert, übertragen, in die URL geschrieben oder in
  WhatsApp vorbefüllt.

---

## 4. Kontakt, Formular und Zahlen

### Was heute funktioniert

Telefon, WhatsApp (neutrale Nachricht, nichts aus der Auswahl vorbefüllt), die
geprüfte E-Mail-Adresse und ein Rückrufformular. Kein Weg behauptet mehr, als er tut.

### Rückrufformular — ein Formular, zwei ehrliche Modi

Das Formular ist gebaut und ausgeliefert. Welchen Weg es nimmt, entscheidet
`PUBLIC_CALLBACK_MODE`:

| Modus | Verhalten | Beschriftung |
|---|---|---|
| `draft` (Standard) | Öffnet einen fertig ausgefüllten E-Mail-Entwurf im Programm der Besucherin. Es wird **nichts** versendet und **nichts** gespeichert. | „Ihre E-Mail wurde vorbereitet …" |
| `server` | Sendet an `/api/rueckruf`; Erfolg wird erst gemeldet, wenn der Versanddienst die Nachricht angenommen hat (HTTP 202). | „Danke. Ihre Rückrufbitte ist bei uns angekommen." |

Beide Modi nutzen dieselbe Validierung (`src/lib/callback.ts`) im Browser, auf dem
Server und im Test. Der Serververtrag liegt fertig in
`src/server/rueckruf.endpoint.ts` — bewusst **außerhalb** von `src/pages`, damit der
statische Build nicht bricht: nur POST, nur JSON, 8 KiB Obergrenze, Honeypot,
Rate-Limit (5 Anfragen je 10 Minuten und IP), 10-Minuten-Sperre gegen
Doppelsendungen, getrennte Empfänger `CALLBACK_TO_CARE` und `CALLBACK_TO_JOBS`.

Zum Aktivieren fehlen nur noch Empfangsziel, Auftragsverarbeitungsvertrag und die
Umgebungsvariablen. Die vollständige Tabelle und die drei Schritte stehen in
OWNER-QUESTIONS.md, Punkt 3.

Erhoben werden Name, Telefon und Ort — verpflichtend sind nur Name und Telefon
(bei der Bewerbung Name, Erreichbarkeit und Bereich). Keine Diagnosen, keine
Pflegedokumente, keine Versichertennummern. Pflege- und Bewerbungsanfragen laufen
nie in denselben Posteingang.

### Mobile Kontaktleiste

Erscheint erst, wenn die Hauptaktion der Seite aus dem Bild gescrollt ist, und
verschwindet wieder, sobald der Kontaktbereich, eine geöffnete Situationsantwort oder
ein anderer gleichwertiger Weg sichtbar ist oder ein Eingabefeld den Fokus hat. Auf
`/karriere/` führt die zweite Schaltfläche zur Bewerbung statt zu WhatsApp, damit
Pflege- und Bewerbungswege getrennt bleiben. Der Platz am Seitenende wird nur
reserviert, solange die Leiste da ist; `env(safe-area-inset-bottom)` ist
berücksichtigt. Beim Drucken wird sie ausgeblendet.

### Messung (noch nicht eingerichtet)

Es ist **keine Analyse eingebaut** – kein Pixel, kein Session-Replay, keine Cookies.
Wenn später gemessen wird, sollte unterschieden werden zwischen Klicks auf Telefon
bzw. WhatsApp, angenommenen Rückrufanfragen und Bewerbungskontakten. Ein Klick auf die
Telefonnummer ist **kein** geführtes Gespräch und kein neuer Auftrag. Namen,
Kontaktdaten, Diagnosen, gewählte Pflegesituationen und genaue Orte gehören nicht in
Analysewerkzeuge. Die betriebliche Kennzahl ist die Zahl passender Pflegeanfragen und
tatsächlicher Versorgungsbeginne, bewertet im Verhältnis zur freien Kapazität.

---

## 5. Tatsächlich durchgeführte Prüfungen

Ausgeführt am 14.09.2026, Chromium 1194 über Playwright gegen den lokalen
Vorschau-Server. Alle Zahlen unten stammen aus diesen Läufen.

### Build und Code

`astro check`: **0 Fehler, 0 Warnungen, 0 Hinweise** · `npm run build`: 16 Seiten ·
`npm audit`: **0 Schwachstellen**.

### HTML und Inhalt (`npm run verify`, 16 Seiten)

Bestanden: genau ein `<h1>` je Seite (im DOM geprüft) · seitenspezifischer Title und
Description · Canonical · `noindex` in der Vorschau · `lang="de"` · jedes Bild mit
`alt`, `width` und `height` · valides JSON-LD ohne Bewertungen, Öffnungszeiten,
Preise, Auszeichnungen oder Qualifikationen · keine Social-CDN-Links · keine erfundenen
Kapazitäts-, Preis- oder Reaktionszusagen · Verhinderungspflege durchgehend unter
SGB XI · Sitzadresse nirgends als Besucherbüro.

### Interaktion und Barrierefreiheit (`npm run verify:interaction`) — 64 Prüfungen, 0 Fehler

| Prüfung | Ergebnis |
|---|---|
| Alle sechs Auswahlmöglichkeiten öffnen genau eine Antwort | bestanden, 51–59 Wörter je Antwort |
| Antwort erscheint am Desktop im Seitenfeld und ersetzt den Hinweis | bestanden |
| Gesprächsnotiz drucken: füllt den Druckblock, druckt, räumt wieder auf | bestanden |
| Erneuter Klick schließt; Zurücksetzen gibt den Fokus zurück | bestanden |
| Tastatur: Fokus landet im Antwortfeld, frei von der 107-px-Kopfzeile | bestanden |
| Auf dem Telefon öffnet die Antwort unter der eigenen Kachel, volle Breite | bestanden, 350 px |
| Jeder Antwort-Link liefert HTTP 200 | bestanden |
| Ortsprüfung: Treffer nennt den Ort, Nicht-Treffer verweist auf Rückfrage | bestanden |
| Ortswahl füllt das Anfrageformular vor | bestanden, „Pflege in Germering anfragen" |
| Formular leer abgeschickt: drei Feldfehler, Fokus im ersten Feld | bestanden |
| Ungültiges Absenden behauptet nie einen Versand | bestanden |
| Gültiges Absenden im Entwurfsmodus öffnet den vorbereiteten E-Mail-Entwurf | bestanden |
| Statustext erklärt den Entwurf ehrlich, ohne „gesendet" | bestanden |
| Pflege- und Bewerbungsformular haben verschiedene Empfänger | bestanden |
| Facebook und Instagram: vier Verweise in der Kopfzeile, zwei im Fuß | bestanden |
| Jeder Profil-Link: neuer Tab, `rel="noopener"`, eigene Beschriftung | bestanden |
| Karriereseite: H1 zwei Zeilen, sechs Abschnitte, Bewerbungsformular mit vier Bereichen | bestanden |
| Karriereseite 475 sichtbare Wörter, „du"-Ansprache | im Ziel 350–600 |
| Karriere-Kontaktleiste bleibt vom ersten Bildschirm weg und führt zur Bewerbung, nicht zu WhatsApp-Pflege | bestanden |
| Beide Aktionen im Karriere-Kopf gleich breit auf dem Telefon | bestanden, je 350 px |
| Navigation primär und sekundär wie gebrieft | bestanden |
| `tel:`, WhatsApp ohne vorbefüllte Auswahl, E-Mail auf die geprüfte Adresse | bestanden |
| Logo: Originaldatei, Seitenverhältnis erhalten | bestanden |
| Startseite 602 sichtbare Wörter | im Ziel 500–700 |
| Erste Ansicht auf echtem iPhone-13-Profil (390 × 664) | bestanden: Überschrift, Text, beide Aktionen, Telefon und 136 px Foto |
| Überschrift auf dem Telefon höchstens zwei Zeilen | bestanden |
| Fotografie wird vom Seitenumbruch nicht zerschnitten | bestanden |
| Mobile Kopfzeile 77 px | im Ziel 72–80 |
| Kontaktleiste: erst nach dem Hero, weg beim Kontaktbereich, bei offener Antwort und bei Fokus im Feld | bestanden |
| Mobilmenü öffnet, enthält „Arbeiten bei uns", schließt mit Escape | bestanden |
| Auswahl bei 390 px einspaltig, Desktop-Seitenfeld nicht gerendert | bestanden |
| Alle 60 sichtbaren Bedienelemente ≥ 24 px (WCAG 2.2, 2.5.8) | bestanden |
| Kontakt-, Social- und Formularaktionen ≥ 44 px hoch | bestanden |
| Skip-Link erster Tabstopp und sichtbar | bestanden |
| Alle 15 internen Links liefern 200 | bestanden |
| 200 % Textzoom: kein horizontaler Überlauf, Hero wächst mit | bestanden |
| `prefers-reduced-motion`: alles sofort sichtbar | bestanden |
| Ohne JavaScript: alle sechs Antworten und alle FAQ-Antworten lesbar | bestanden |
| Kontrast auf Start- und Karriereseite, durch transparente Ebenen hindurch gerechnet | bestanden, jede sichtbare Textstelle ≥ WCAG AA |

**Breitenlauf über zehn Seiten je Breite** (`/`, `/karriere/`, `/leistungen/`,
`/leistungen/behandlungspflege/`, `/kosten-finanzierung/`, `/kontakt/`, `/ueber-uns/`,
`/germering/`, `/muenchen-west/`, `/pflegeberatung/`):

| Breite | Ergebnis |
|---|---|
| 360 px | 10 Seiten, keine JS-Fehler, kein horizontaler Überlauf |
| 390 px | 10 Seiten, keine JS-Fehler, kein horizontaler Überlauf |
| 430 px | 10 Seiten, keine JS-Fehler, kein horizontaler Überlauf |
| 768 px | 10 Seiten, keine JS-Fehler, kein horizontaler Überlauf |
| 1024 px | 10 Seiten, keine JS-Fehler, kein horizontaler Überlauf |
| 1440 px | 10 Seiten, keine JS-Fehler, kein horizontaler Überlauf |

Zusätzlich wurden alle 16 Seiten in drei Ansichten (Desktop 1440, Tablet 768,
Telefon 390) sowie die Startseite und die Karriereseite auf fünf echten
Gerätehöhen (iPhone 13 390 × 664, iPhone SE 375 × 553, Pixel 7 412 × 732,
iPad 768 × 954, Desktop 1440 × 820) aufgenommen: `npm run verify:screenshots`
meldete **NO ISSUES DETECTED**.

**Quellen zur mobilen Hero-Gestaltung**

- [100vh-Problem in iOS Safari und die dvh-Einheit](https://dev.to/maciejtrzcinski/100vh-problem-with-ios-safari-3ge9)
- [Fix 100vh Layout Bugs on Mobile Safari — dvh/svh/lvh](https://us.corejsc.com/blog/fixing-100vh-mobile-safari-dynamic-viewport-bug/)
- [Mobile Hero Section: Key Elements for Conversion](https://conversionwise.com/blog/mobile-hero-section-key-elements-for-conversion)
- [Above the Fold: Best Practices](https://www.invespcro.com/blog/above-the-fold/)
- [Above the Fold Design Guide — „falsche Unterkante" und Scroll-Hinweis](https://madebyevoke.com/blog/above-the-fold-design-guide)
- [NN/g: UX Design for Seniors](https://www.nngroup.com/reports/senior-citizens-on-the-web/)

### Rückruf-Validierung (`npm run test`) — 8 Tests, 0 Fehler

Dieselbe Validierung läuft im Browser, auf dem Server und im Test (`src/lib/callback.ts`).
Geprüft: Pflichtfelder, Telefonnummern- und E-Mail-Form, Kanalwahl, Bereichsliste
der Bewerbung, Längenbegrenzung und der stabile Fingerabdruck für die
Doppelsendungssperre.

### Gemessene Performance (`npm run measure:performance`)

Lokaler Server, **ohne Netzwerk- oder CPU-Drosselung**. Keine Feldwerte, kein Lighthouse.

| Seite | LCP Desktop | LCP Mobil | CLS | Übertragung Desktop / Mobil |
|---|---|---|---|---|
| `/` | 272 ms | 188 ms | 0 | 217 KB / 217 KB |
| `/leistungen/` | 172 ms | 124 ms | 0 | 153 KB / 73 KB |
| `/kosten-finanzierung/` | 196 ms | 148 ms | 0 | 73 KB / 73 KB |
| `/karriere/` | 200 ms | 140 ms | 0 | 428 KB / 244 KB |
| `/ueber-uns/` | 760 ms | 656 ms | 0 | 457 KB / 329 KB |

Das Hero-Bild lädt `eager` mit `fetchpriority="high"` und festen Maßen; alle übrigen
Bilder sind `lazy`. CLS ist auf allen gemessenen Seiten 0. `/ueber-uns/` ist mit
24 Porträts die schwerste Seite – das ist der richtige Ort dafür.

### Ein Fehler, der dabei gefunden wurde

Die Beschriftungen des Rückrufformulars standen im dunklen Kontaktabschnitt fast
unlesbar da (1,13 : 1). Ursache war kein Farbwert, sondern Astros Scoping: in
`.on-dark .cbf__field label` hängt Astro auch an `.on-dark` das Scope-Attribut der
Komponente. Der Abschnitt gehört aber einer anderen Komponente, trägt dieses Attribut
also nicht – die Regel griff nie. Behoben mit `:global(.on-dark)` in `CallbackForm.astro`
und `SocialLinks.astro`. Die Kontrastprüfung oben rechnet jetzt durch transparente
Ebenen hindurch und fängt genau diesen Fall; ohne die Korrektur meldet sie ihn wieder.

### Was nicht geprüft wurde

- **Kein Lighthouse-Lauf und keine Feldmessung.** Die Zahlen oben sind Laborwerte ohne
  Drosselung; unter realen Bedingungen fallen sie schlechter aus.
- **Kein automatisierter Audit mit axe** und kein vollständiges WCAG-2.2-Audit.
  Geprüft wurde mit den oben aufgeführten gezielten Tests, Kontrastrechnung und
  manueller Sichtung.
- **Kein Test mit echten Screenreadern** (NVDA, VoiceOver) und nicht auf echten Geräten.
- **Strukturierte Daten nicht gegen das Google-Rich-Results-Werkzeug geprüft**
  (kein Zugang aus dieser Umgebung); das JSON-LD ist syntaktisch valide.
- **Keine Testanfrage** an die echte Rufnummer, WhatsApp-Nummer oder E-Mail-Adresse.

---

## 6. Vor der Veröffentlichung durch die Inhaber zu klären

### Vorrangig

1. **Bildrechte und Einwilligungen** für alle echten Team- und Gruppenfotos.
2. **Zwei Symbolbilder sind KI-generiert** (`src/assets/illustrative/`): das Gespräch
   auf dem Sofa im Hero und die Küchenszene auf der Seite Haushalt & Betreuung. Beide
   sind im Bild als „KI-generiertes Symbolbild" gekennzeichnet und zeigen **keine**
   Patientinnen, Patienten oder Mitarbeitenden. Falls das nicht gewünscht ist, können
   sie durch echte Fotos ersetzt werden — dann bitte die Bildunterschrift entfernen.
3. **Rückrufformular**: Empfangsziel und Zugangsdaten bereitstellen (Abschnitt 4).
4. **Aktuelle Kapazität und Aufnahmeprozess**: Die Seite sagt überall, dass ein
   möglicher Beginn persönlich geklärt wird. Gibt es einen festen Ablauf, sollte der
   Drei-Schritte-Abschnitt daran angepasst werden.
5. **Erreichbarkeitszeiten**: Stehen bewusst nirgends. Die Bürokarten bitten stattdessen
   um vorherige telefonische Anmeldung.
6. **Aktuelle Stellen**: Die Karriereseite ist eine Einladung zur Initiativbewerbung —
   ohne Positionen, Gehälter, Vorteile oder JobPosting-Markup. Gibt es offene Stellen,
   können sie ergänzt werden. Soll der Bereich ganz weg: `PUBLIC_RECRUITMENT=false`
   entfernt Abschnitt, Menüeinträge, Sitemap-Eintrag und leitet `/karriere/` um.

### Weiterhin offen

7. **Beratungseinsätze nach § 37 Abs. 3 SGB XI**: Die Seite `/pflegeberatung/` bittet
   um Rückfrage, statt eine Zulassung zu behaupten. Liegt sie vor, bitte Nachweis.
8. **Palliative Begleitung**: Umfang klären; aktuell mit ausdrücklicher Abgrenzung von
   SAPV und Rund-um-die-Uhr-Betreuung.
9. **Physiotherapie, Fußpflege, Friseur**: als nicht eigenständige Leistung beschrieben.
10. **Sprachkenntnisse im Team**: nicht genannt, weil nicht belegt — und aus Namen nicht
    ableitbar. Falls mehrsprachige Versorgung angeboten wird, ist das ein starkes Argument.
11. **Finanzierungsbeträge** auf `/kosten-finanzierung/` tragen „Informationsstand:
    13.09.2026" und die amtlichen Quellen. Vor dem Launch erneut prüfen und danach
    regelmäßig (`src/data/funding.ts`, `RESEARCH_DATE` in `src/data/business.ts`).
12. **Impressum**: Umsatzsteuer-ID bzw. Steuerbefreiung, Aufsichtsbehörde und Zulassung,
    Berufsbezeichnung, Berufshaftpflicht und die nach § 18 Abs. 2 MStV verantwortliche
    Person fehlen und müssen ergänzt werden. Nichts davon wurde erfunden. Der Verweis auf
    die zum 20.07.2025 eingestellte EU-Streitbeilegungsplattform wurde nicht übernommen.
13. **Datenschutz**: Hosting-Anbieter, Serverstandort, Speicherdauer der Logdateien,
    Auftragsverarbeitungsvertrag, ggf. Datenschutzbeauftragte.
14. **Beide Rechtstexte anwaltlich prüfen lassen.**
15. **NAP-Konsistenz**: In externen Verzeichnissen erscheint teils ein älterer Name und
    eine abweichende Adresse. Vor lokalem SEO-Aufbau angleichen. Das
    Google-Unternehmensprofil wurde **nicht** angefasst.

---

## 7. Betrieb

### Befehle

```bash
npm install
npm run dev          # Entwicklungsserver
npm run build        # Bilder-Derivate + statischer Build nach dist/
npm run preview      # dist/ lokal ausliefern
npm run test         # Rückruf-Validierung, 8 Tests
npm run verify       # astro check + Tests + HTML- + Inhaltsprüfung
```

Mit laufendem `npm run preview` auf Port 4321:

```bash
npm run verify:interaction    # 64 Interaktions- und Barrierefreiheitsprüfungen
npm run verify:screenshots    # alle Seiten bei 1440/768/390 px + fünf echte Gerätehöhen
npm run measure:performance   # LCP/CLS/Übertragung lokal messen
```

### Schalter

| Variable | Standard | Wirkung |
|---|---|---|
| `PUBLIC_SITE_MODE` | `demo` | `production` entfernt `noindex` und alle Vorschau-Hinweise |
| `PUBLIC_SITE_ORIGIN` | `https://demo.pflegendebienen.de` | Canonical, Sitemap, Open Graph, JSON-LD-IDs |
| `PUBLIC_RECRUITMENT` | an | `false` entfernt Karriereabschnitt, Menüeinträge und Route |
| `PUBLIC_CALLBACK_MODE` | `draft` | `server` schickt das Formular an `/api/rueckruf` statt einen E-Mail-Entwurf zu öffnen |

### Vorschau auf Vercel

`vercel.json` legt Framework, Build-Befehl, Ausgabeordner, `trailingSlash` sowie Cache-
und Sicherheits-Header fest. In Vercel nur `PUBLIC_SITE_ORIGIN` auf die tatsächliche
Adresse setzen. Ein sauberer Build aus einem frischen Klon (`npm ci && npm run build`)
wurde geprüft.

### Umschalten auf Produktion

1. Punkte aus Abschnitt 6 abarbeiten.
2. `PUBLIC_SITE_MODE=production` und `PUBLIC_SITE_ORIGIN=https://pflegendebienen.de` setzen.
3. `npm run verify` erneut ausführen. **Hinweis:** die HTML-Prüfung erwartet im
   Vorschau-Modus `noindex`; für einen Produktions-Build ist diese eine Zusicherung in
   `scripts/verify-html.mjs` umzustellen.
4. Weiterleitungen der bestehenden URLs planen, dann die Sitemap einreichen.

### Was bewusst nicht getan wurde

Keine Änderung am Google-Unternehmensprofil oder an externen Verzeichnissen. Keine
Testanfrage an das echte Unternehmen. Keine Veröffentlichung, keine Indexierung, kein
Domainwechsel. Keine Tracking-, Analyse- oder Werbedienste — und deshalb auch kein
Cookie-Banner.
