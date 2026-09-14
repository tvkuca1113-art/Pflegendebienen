# Fragen an die Inhaber und offene Konfiguration

Stand: 14.09.2026. Diese Datei ist **nicht** Teil der Website. Alles hier
Aufgeführte wurde bewusst nicht erfunden und steht deshalb auch nirgends im
sichtbaren Text.

---

## 1. Bildrechte und Einwilligungen — vorrangig

Bitte schriftlich bestätigen, bevor die Seite öffentlich geht:

- Nutzungsrechte an allen Team- und Gruppenfotos für die Website.
- Einwilligung **jeder** abgebildeten Person, insbesondere für die 24 Porträts
  auf `/ueber-uns/` und die Gruppenbilder auf `/karriere/`.
- Ein öffentlicher Facebook- oder Instagram-Beitrag genügt dafür nicht.

## 2. Ein echtes Hero-Foto — die größte offene Verbesserung

Im Hero steht heute ein KI-generiertes Symbolbild, sichtbar gekennzeichnet. In
den geprüften öffentlichen Beiträgen gibt es kein echtes Foto, das eine ältere
Person zu Hause bei der Unterstützung zeigt.

**Aufnahmeauftrag für ein Ersatzfoto:**

- Gespräch auf Augenhöhe, an einem Münchner Wohnzimmertisch oder auf dem Sofa.
- Die ältere Person steht im Bild im Mittelpunkt und ist aktiv beteiligt.
- Eine Pflegekraft oder eine Angehörige hört zu.
- Natürliches Fensterlicht, glaubwürdige Wohnungsdetails.
- **Nicht**: intime Pflegehandlungen, sichtbare Patientenunterlagen, gestellte Posen.
- Bitte **quer und hoch** aufnehmen, mindestens 2000 px an der langen Kante.
- Einwilligung der abgebildeten Personen gleich mitnehmen.

Sobald das Foto da ist: Datei nach `src/assets/selected/` legen und in
`src/components/Hero.astro` den `src` tauschen; die Zeile
`<p class="hero__credit">KI-generiertes Symbolbild</p>` dann entfernen.

## 3. Rückruf-Formular — fehlende Konfiguration

Die Formulare auf `/` und `/karriere/` sind vollständig gebaut: gemeinsame
Validierung (`src/lib/callback.ts`, 8 Tests), Fehlermeldungen pro Feld,
erhaltene Eingaben, Honigtopf gegen Bots.

Ausgeliefert wird derzeit im Modus **`draft`**: Das Formular öffnet eine
vorbereitete E-Mail im Programm der Besucherin. Die Schaltfläche heißt genau
das („Rückruf per E-Mail anfragen"), und es wird **nie** behauptet, etwas sei
abgeschickt worden.

**Für echten Serverversand fehlt:**

1. Ein Empfangsdienst (Formulardienst, E-Mail-API oder eigener Endpunkt) mit
   Auftragsverarbeitungsvertrag.
2. Diese Umgebungsvariablen in der Produktivumgebung:

   | Variable | Bedeutung |
   |---|---|
   | `PUBLIC_CALLBACK_MODE=server` | schaltet das Formular auf Serverversand |
   | `CALLBACK_API_URL` | Endpunkt des Versanddienstes |
   | `CALLBACK_API_KEY` | Zugangsschlüssel, **nur** serverseitig |
   | `CALLBACK_FROM` | Absenderadresse |
   | `CALLBACK_TO_CARE` | Empfänger für Pflegeanfragen |
   | `CALLBACK_TO_JOBS` | Empfänger für Bewerbungen (getrennt!) |

3. Zwei Schritte im Projekt: `npx astro add vercel`, `outputDirectory` aus
   `vercel.json` entfernen, und `src/server/rueckruf.endpoint.ts` nach
   `src/pages/api/rueckruf.ts` verschieben. Der Endpunkt ist fertig:
   Methodenprüfung, Größenlimit, Honigtopf, gemeinsame Validierung,
   Rate-Limit (5 pro 10 Minuten je IP), Dubletten-Fenster (10 Minuten),
   getrennte Empfänger, `202` erst nach Bestätigung des Versanddienstes.

**Wichtig:** Pflegeanfragen und Bewerbungen dürfen nie im selben Postfach landen.

## 4. Betrieb und Erreichbarkeit

- **Erreichbarkeitszeiten** stehen nirgends. Sollen welche genannt werden?
- **Reaktionszeit**: Es wird keine zugesagt. Falls gewünscht („Rückruf binnen X"),
  muss sie betrieblich abgesichert sein.
- **Kapazität**: Die Seite nennt keine freien Plätze. Gibt es einen definierten
  Aufnahmeprozess, passen wir die drei Schritte auf der Startseite an.
- **Feste Pflegekräfte**: Die FAQ sagt, dass Wünsche zur Kontinuität persönlich
  besprochen werden. Gibt es eine verlässliche Regel, kann sie dort stehen.

## 5. Leistungen

- **Beratungseinsätze nach § 37 Abs. 3 SGB XI**: `/pflegeberatung/` bittet um
  Rückfrage, statt eine Zulassung zu behaupten. Liegt sie vor? Bitte Nachweis.
- **Palliative Begleitung**: Als Angebot beschrieben, mit klarer Abgrenzung von
  SAPV und Rund-um-die-Uhr-Betreuung. Stimmt der Umfang so?
- **Physiotherapie, Fußpflege, Friseur**: Als „erbringen wir nicht selbst, helfen
  aber bei der Koordination" formuliert. Trifft das zu?
- **Sprachkenntnisse im Team**: nicht genannt, weil nicht belegt — und aus Namen
  nicht ableitbar. Mehrsprachige Versorgung wäre ein starkes Argument.

## 6. Stellen und Arbeitgeberaussagen

`/karriere/` nennt bewusst **keine** offenen Stellen, Gehälter, Zusatzleistungen,
Dienstpläne, Fortbildungsbudgets oder Dienstwagen — nichts davon ist bestätigt.
Die drei Bereiche sind ausdrücklich als Interessengebiete bezeichnet, und
`JobPosting`-Markup gibt es nicht.

Bitte klären:

- Gibt es aktuell offene Stellen? Wenn ja: Bezeichnung, Umfang, Voraussetzungen.
  Erst dann sind eine Ausschreibung und `JobPosting`-Markup zulässig.
- Welche Arbeitsbedingungen dürfen wir konkret nennen?
- Ist `d.bjelovuk@pflegendebienen.de` / `+49 179 9543008` weiterhin der richtige
  Bewerbungskontakt?
- Soll der Karrierebereich sichtbar bleiben? Abschalten: `PUBLIC_RECRUITMENT=false`
  entfernt Teaser, Menüeinträge, Sitemap-Eintrag und leitet `/karriere/` um.

## 7. Finanzierung

Die Beträge auf `/kosten-finanzierung/` (Entlastungsbetrag bis 131 € **monatlich**,
gemeinsames **Jahresbudget** für Verhinderungs- und Kurzzeitpflege bis 3.539 €)
tragen „Informationsstand: 13.09.2026" und die amtlichen Quellen. Vor dem Launch
gegen die Quellen prüfen und danach regelmäßig — `src/data/funding.ts` und
`RESEARCH_DATE` in `src/data/business.ts`.

## 8. Rechtstexte

- **Impressum**: Umsatzsteuer-ID bzw. Steuerbefreiung, Aufsichtsbehörde und
  Zulassung, Berufsbezeichnung, Berufshaftpflicht und die nach § 18 Abs. 2 MStV
  verantwortliche Person fehlen und müssen ergänzt werden.
- Der Verweis auf die zum 20.07.2025 eingestellte EU-Streitbeilegungsplattform
  wurde nicht übernommen.
- **Datenschutz**: Hosting-Anbieter, Serverstandort, Speicherdauer der Logdateien,
  Auftragsverarbeitungsvertrag; bei aktivem Formular zusätzlich der Versanddienst.
- **Beide Texte anwaltlich prüfen lassen.**

## 9. Externe Profile

In einzelnen Verzeichnissen erscheinen ein älterer Name und eine abweichende
Adresse. Vor lokalem SEO-Aufbau Name, Adresse und Telefonnummer über alle
Profile angleichen. Das Google-Unternehmensprofil wurde **nicht** angefasst.

## 10. Veröffentlichung

Die Vorschau steht auf `noindex, nofollow`. Das hält Suchmaschinen fern, ist
aber **kein Zugriffsschutz** — wer den Link hat, kann die Seite öffnen. Für
echten Schutz während der Abstimmung bitte den Passwortschutz der
Hosting-Umgebung nutzen.

Umschalten auf Produktion: `PUBLIC_SITE_MODE=production` und
`PUBLIC_SITE_ORIGIN=https://pflegendebienen.de`. Details in HANDOVER.md.
