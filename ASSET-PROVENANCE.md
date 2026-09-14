# Bildnachweis und Herkunft

Stand: 14.09.2026. Jede auf der Website verwendete Datei ist hier mit Quelle,
Maßen, Motiv, Platzierung, Rechtelage und Bildausschnitt verzeichnet.

**Rechtelage kurz:** Die Fotos des Unternehmens stammen aus öffentlich
zugänglichen Veröffentlichungen (eigene Website, Facebook, der auf der Website
eingebettete öffentliche Instagram-Feed). Ein öffentlicher Beitrag belegt für
sich genommen **kein** Nutzungsrecht für die Website und keine Einwilligung der
abgebildeten Personen. Beides ist vor der Veröffentlichung zu bestätigen
(siehe OWNER-QUESTIONS.md, Punkt 1).

---

## 1. Logo — unverändert

| Datei | Maße | Herkunft | Platzierung |
|---|---|---|---|
| `public/logo-original.png` | 195 × 120 | pflegendebienen.de | Kopfzeile, Favicon, Social-Preview, strukturierte Daten |
| `public/logo-weiss-90px.png` | 147 × 90 | pflegendebienen.de (helle Variante) | Fußzeile |

Bytegleich übernommen. Nicht neu gezeichnet, nicht eingefärbt, nicht animiert,
nie auf Kleidung montiert. Die Schnittstellenfarbe `#F4A11B` ist eine
Design-Entscheidung; die Logodatei selbst behält ihr gemessenes `#F89B1C`.

## 2. KI-generierte Symbolbilder — im Bild gekennzeichnet

Beide zeigen **keine** Patientinnen, Patienten oder Mitarbeitenden dieses
Pflegedienstes. Beide tragen sichtbar „Symbolbild, KI-generiert".
Hände, Finger, Griffe und Objektgeometrie wurden in der Vergrößerung geprüft:
korrekte Daumen- und Fingerzahl, plausible Griffe, keine verschmolzenen Finger.

| Datei | Maße | Motiv | Platzierung | Bildausschnitt |
|---|---|---|---|---|
| `src/assets/illustrative/gespraech-zuhause.jpg` | 1536 × 1024 | Ältere Frau im Gespräch mit einer jüngeren Frau auf dem Sofa, Wohnzimmer | Startseite, Hero | Desktop `66% 34%`, mobil dasselbe; Gesichter bleiben in jedem Zuschnitt frei, die Textfläche liegt über der ruhigen linken Wand |
| `src/assets/illustrative/einkauf-kueche.jpg` | 1536 × 1024 | Älterer Mann räumt am Küchentisch Einkäufe mit einer Helferin aus | `/leistungen/haushalt-betreuung/`, einmalig | `50% 45%`; Hände und Apfel vollständig im Bild |

Warum kein echtes Foto im Hero: In den geprüften öffentlichen Beiträgen gibt es
**keine** Aufnahme, die eine ältere Person zu Hause bei der Unterstützung zeigt.
Vorhanden sind Gruppenfotos, Geburtstage und Selfies – gut für Arbeitgeber- und
Teamdarstellung, nicht für die Patientenansprache. Die Anforderung an ein echtes
Ersatzfoto steht in OWNER-QUESTIONS.md, Punkt 2.

## 3. Echte Fotos des Unternehmens

| Datei | Maße | Motiv | Platzierung | Bildausschnitt |
|---|---|---|---|---|
| `marija-jelacic-bjelovuk.jpeg` | 1000 × 1000 | Porträt der Inhaberin und Pflegedienstleitung | Startseite (rund, 150 px), `/ueber-uns/` | zentriert |
| `dusko-bjelovuk.jpeg` | 1000 × 1000 | Porträt des Inhabers | `/ueber-uns/` | zentriert |
| `team-garten-facebook.jpg` | 1440 × 1080 | Team im Garten, als Selfie aufgenommen | `/karriere/` Bildstrecke, `/ueber-uns/`, `/leistungen/` | `50% 45%` |
| `team-gruppe-facebook.jpg` | 960 × 1280 | Gruppenfoto im Freien, alle Gesichter sichtbar | `/karriere/` Kopfbereich (12:7, `50% 55%`), `/ueber-uns/` | `50% 55%` bzw. `50% 38%` |
| `team-alltag-facebook.jpg` | 960 × 1280 | Teammitglieder in gelben Poloshirts, kleine Feier im Büro | `/karriere/` Bildstrecke | `50% 30%` |
| `team-kaffeepause-instagram.webp` | 640 × 480 | Gemeinsame Kaffeepause | Startseite, Karriere-Teaser; `/ueber-uns/` | zentriert |
| `team-fortbildung-instagram.webp` | 640 × 480 | Fortbildung am großen Tisch, 19.03.2026 | Startseite, Einblicke | zentriert |
| `team-gemeinsam-instagram.webp` | 640 × 480 | Gemeinsames Treffen am gedeckten Tisch, 23.03.2026 | Startseite, Einblicke | zentriert |
| `team-terrasse-instagram.webp` | 640 × 480 | Kaffeepause auf der Terrasse, 10.03.2026 | Startseite, Einblicke | zentriert |
| `team-laura-sanja-facebook.jpg` | 960 × 1280 | Geburtstag im Büro, 06.08.2026 | `/ueber-uns/` Archiv | `50% 35%` |
| 24 Porträts in `src/assets/team/` | je 200 × 200 | Team-Porträts der Website | `/ueber-uns/`, rund, 96 px | zentriert |

Quellen der Social-Dateien sind in `docs/SELECTED_ASSETS.json` und
`docs/ASSET_SOURCES.json` mit Beitrags-URL und Prüfsumme hinterlegt. Alle
Dateien liegen lokal; es wird **nichts** von Facebook- oder Instagram-CDNs
nachgeladen.

## 4. Nicht verwendet

| Datei | Grund |
|---|---|
| `hero-garten-original.jpg` (1536 × 1024) | Zwei Frauen und ein Kind im Garten, von der bestehenden Website. Das Verhältnis der Personen ist nicht belegt; in einem Pflegekontext platziert würde das Bild eine Betreuungssituation suggerieren, die es nicht zeigt. Bleibt im Repository als Reserve. |

## 5. Abgeleitete Dateien

`public/favicon.png`, `public/apple-touch-icon.png` und
`public/social-preview.jpg` erzeugt `scripts/generate-static-images.mjs` aus dem
Originallogo und dem Hero-Symbolbild. Reine Skalierung und Komposition, keine
Neuzeichnung.

## 6. Ausgabeformate

Astro erzeugt aus jeder Datei WebP-Ableitungen mit `srcset`, `sizes` und festen
Maßen. Das Hero-Bild lädt `eager` mit `fetchpriority="high"`, alle übrigen
`lazy`. AVIF ist nicht aktiviert: Der Gewinn gegenüber WebP wäre bei diesen
Motivgrößen gering, die Buildzeit aber deutlich länger. Umschaltbar über
`image.formats` in `astro.config.mjs`.
