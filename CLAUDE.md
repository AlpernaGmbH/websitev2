# CLAUDE.md: alperna.ch (Neubau)

## Projekt
Neubau von www.alperna.ch. Von Framer auf Next.js (App Router) mit Tailwind, statisch generiert, gehostet auf Vercel.
Der Prototyp (alperna-tool.vercel.app/website) ist die Design-Referenz, die Framer-Site ist die Inhalts-Referenz.
Aktueller Stand: Phase 1, Inhalt vor Code. Siehe Phasen unten.

Das Repo ist öffentlich. Interne Dokumente (Plan, COMPANY-MASTER, Zahlen zu Umsatz oder Kapazität) gehören nicht hinein.

## Phasen
1. Inhalt: Texte, Projektdaten, Blog-Export, Assets. Texte liegen in `content/`, Zahlen in `site.config.ts` und `data/`.
2. Bau Release 1: Tokens, Komponenten, Seiten, Formular, SEO, Preview-Deploy.
3. QA, danach Go-live. Domain und DNS klärt das Team später.

Release 1 enthält nicht: CMS, Marketing-Check, Motion-Spielereien, Preisseite, Mehrsprachigkeit, Blog auf Du umschreiben.

## Harte Regeln
1. **Framer wird nur gelesen.** Keine Änderungen, kein Publish, keine CMS-Edits. Quelle sind die öffentlichen Seiten.
2. **Alle URLs bleiben identisch zur Live-Site.** Slugs von 14 Projekten und 40 Blogbeiträgen 1:1.
3. **Keine Zahl ohne Quelle.** Zahlen stehen nur in `site.config.ts` oder `data/*.json`. Seitentexte verwenden Platzhalter. Fehlt eine Zahl, fällt sie weg (`websitesErstellt` ist offen).
4. **Nichts von framerusercontent.com einbinden.** Alle Bilder und Videos werden heruntergeladen und selbst gehostet. Videos nicht ins Git, sondern in Vercel Blob oder gleichwertigen Speicher.
5. **Bilder:** komprimierte Varianten der Live-Site sind erlaubt (Page Speed). Echte Fotos, kein Stock, keine KI-Bilder.
6. **Kein Telefon.** Anrufe werden nicht beantwortet. Kontakt über Formular, Calendly, WhatsApp, E-Mail. Kein `tel:`-Link.
7. **Rechtstexte schreibt kein Claude.** Impressum und Datenschutz werden von Menschen angepasst (Formular, Resend, n8n, Notion, Vercel statt Framer, Schriften).

## Sprache und Ton
- Du-Form. Hochdeutsch mit Schweizer Schreibweise: ss statt ß, «» als Anführungszeichen, CHF 1’000 (typografischer Apostroph, CHF vor der Zahl), 70 % mit Leerzeichen.
- Keine Gedankenstriche und keine Halbgeviertstriche als Interpunktion. Doppelpunkt, Komma oder Punkt.
- Kurze Sätze, meist 6 bis 12 Wörter. Keine Ausrufezeichen, keine Emojis.
- Führe mit Fall, Zahl, Einordnung. Kein Hot Take als Opener.
- «Jung» nur mit Beweis daneben. Offenheit ja, Selbstverkleinerung nein, Premium-Fassade nein.
- Wir sind Partner für den digitalen Auftritt. Nie «Agentur», nie «führend», nie «massgeschneidert», «ganzheitlich», «Mehrwert», «Lösung» als Verkaufsbegriff.
- Eigener Auftritt ohne Reichweiten-Jargon: «gefunden werden» statt «Reichweite», «mehr Anfragen» statt «Follower-Wachstum». Als Beleg in einem Fall bleiben Aufrufe und Follower erlaubt.
- Berg-Vokabular (Aufstieg, Etappe, Gipfel) nur in Headlines und in der Etappen-Sektion, höchstens eine Metapher pro Bildschirm.
- Andere werden nicht abgebaut. Keine Vergleichstabelle gegen «andere Dienstleister».
- Kein Studium als Verkaufsargument. Es darf als Fakt stehen, immer mit Beweis daneben.

**Schnell-Check vor jedem Text:**
1. Klingt das nach uns oder nach einer Agentur?
2. Versteht ein 50-jähriger Inhaber das, ohne abgestossen zu sein?
3. Führen wir mit Beweis statt mit Meinung?
4. Ist der Ton ruhig und seriös?
5. Bauen wir jemanden ab, um klug dazustehen? Dann umschreiben.

## Die sechs Bausteine
01 Website (Einstieg, ab ca. CHF 1’000, mit Shooting ca. CHF 2’000) · 02 Google-Unternehmensprofil · 03 Social Media (Einzelbeitrag ab CHF 180) · 04 Onlineshop (auf Anfrage) · 05 Online-Buchung (auf Anfrage) · 06 Google Ads (auf Anfrage, nur wenn es der sinnvollste nächste Schritt ist).
Pro Kunde immer nur den nächsten Baustein vorschlagen. Retainer-Preise stehen nicht auf der Website.

## Design
- Hintergrund Creme `#F3F1EC`, Karten und Flächen Off White `#FDFBFB`, Text Deep Black `#121110`.
- Akzent für Links, Buttons, Akzentwort, Schlusspunkt: Signal Blue `#2F00FF`. Gold `#FFD700` nur als Marker-Strich unter einem Wort pro Sektion und im Logo, nie als Fläche oder Textfarbe.
- Ein dunkles Band pro Seite (Footer oder CTA): Alpenblau Mitternacht `#0A0C10` bis Höhenblau `#2B3A5A`, dezentes Filmkorn.
- Schrift Geist (Headlines und Text), Geist Mono für Koordinaten, Labels, Kennzahlen-Beschriftungen. Selbst gehostet.
- H1 per `clamp`, Desktop höchstens ca. 120 px, Mobile ca. 44 px. Höchstens ein kursives Akzentwort pro Headline.
- Buttons als Pill: primär Signal Blue mit weissem Text, sekundär Outline Deep Black. Eingabefelder eckig, Karten Radius 0.
- Lighthouse mobil: Performance über 90, Accessibility über 95.

## Technik
- Inhalte als Dateien im Repo: Blog als MDX, Projekte aus `data/projekte.json`. Kein CMS.
- Formular als Route Handler: Versand an kontakt@alperna.ch, parallel Webhook an n8n in die Notion-Datenbank «Kunden & Interessenten». Honeypot plus Rate Limit, kein Captcha.
- Analytics: bestehende GA4-Property (`site.config.ts`), Events für Formular, Calendly-Klick, WhatsApp-Klick.
- Motion: höchstens sanfte Einblendungen. Kein GSAP, Lenis, Parallax.
- Schema: Organization oder LocalBusiness mit Adresse und UID, Article pro Beitrag, FAQPage, BreadcrumbList.
- Prototyp-Dateien als Design-Vorlage unter `reference/`, sobald sie im Repo liegen. Der Prototyp auf Vercel setzt vor dem Go-live `noindex` oder wird gelöscht.

## Ordner
- `site.config.ts`: Konstanten (Partnerzahl, Adresse, UID, Links)
- `content/*.md`: Seitentexte, ein File pro Seite
- `data/*.json`: Projekte und Zitate
