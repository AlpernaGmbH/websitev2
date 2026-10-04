# STATUS.md

Stand: 04.10.2026. Release 1 läuft als Vorschau auf Vercel (Projekt `alperna-website`), nicht indexiert, nicht auf der eigenen Domain.

## Fertig
- Design 1:1 nach Prototyp: Hero mit animierten Höhenlinien, Ticker, Aussagesatz mit Wort-Effekt, Leistungsliste, Ablauf und Team dunkel, FAQ, Kontakt, Footer mit Wortmarke. Gelb ist der einzige Akzent
- Startseite wie der Prototyp, ohne Projekte, Logos und Zitate. Texte vom Prototyp, korrigiert nach Plan 5.4
- Videoeinbindung: Kundenvideo neben dem Zitat, Projektvideos als eigener Abschnitt, Vorschaubilder im Repo, Videos selbst im Blob-Speicher (nicht im Git)
- Seiten: Über uns, Projekte (Liste, Filter, 14 Detailseiten), Blog (Liste, Filter, 40 Beiträge), Kontakt, Impressum, Datenschutz, 404
- Projekte als Raster: Fotokacheln (nur echte Fotos) und dunkle Zahlenkacheln mit Höhenlinien, wo kein gutes Foto existiert. Detailseite mit Titelbild neben den Kennzahlen, Galerie, Auswertung (Screenshots als Beleg) und «Nächstes Projekt». Logos kommen nicht mehr vor
- Projekttexte in eigenen Worten, Originaltexte der Framer-Seite aus dem Repo entfernt (`npm run check` verhindert, dass sie zurückkommen)
- Sitemap (61 URLs), Schema, Open-Graph-Bild, Icon. Alle Bilder selbst gehostet
- Kontaktformular als Route Handler mit Honigtopf, Begrenzung und Prüfung. Angeschlossen an den n8n-Workflow «Website-Kontakt (alperna.ch)»: Mail an kontakt@alperna.ch und Lead mit Status «Lead» im Notion Sales CRM (Kunden & Interessenten). `N8N_WEBHOOK_URL` ist in Vercel hinterlegt (Production und Preview), Ende-zu-Ende getestet
- Lighthouse mobil (lokal, Production-Build): Performance 94 bis 98, Accessibility 96 bis 100, Best Practices 100. SEO 100, sobald `NEXT_PUBLIC_INDEXABLE=1` gesetzt ist, in der Vorschau 69 wegen `noindex`

## Stand vom Feedback am 04.10.2026
- Hero entrümpelt (keine Region, Koordinaten, Gipfel, Scroll-Hinweis). Studium nur als «BWL in St. Gallen», «seit drei Jahren dabei» statt «frisch gegründet», Gym-Geschichte entfernt
- Marketing-Check unter `/check`, als zweiter Hero-Knopf statt «Projekte ansehen», Link im Footer. Knopf «Mehr Tools» auf `/check` und im Ergebnis, ohne Ziel: der Link kommt in `site.config.ts` (`toolsUrl`)
- Sechs Leistungsseiten unter `/leistungen/<slug>` mit Warum, Zahlen mit Quelle, Grafik, passenden Projekten. Google-Profil zeigt Zahlen aus den USA (keine Schweizer Quelle gefunden), beschriftet

## Neue Abhängigkeit
- `@vercel/blob` (devDependency), nur für den Video-Upload in `scripts/media/videos.mjs`. Die Seite selbst lädt es nicht

## Offen
- Videos: Kompression und Einbindung sind fertig (18 Videos, 189 MB auf 49,5 MB). Der Blob-Speicher «alperna-medien» ist angelegt und mit dem Projekt verbunden. Es fehlt nur der Upload: `BLOB_READ_WRITE_TOKEN` aus Vercel (Storage, alperna-medien, `.env.local`) als Umgebungs-Secret im Claude-Code-Environment hinterlegen, danach `node scripts/media/videos.mjs --upload` in einer neuen Session, oder lokal mit ffmpeg. Bis dahin zeigt die Seite keine Videos. Die drei Kundenvideos (Appenzellerland Sport, BC Trogen Speicher, LifeBoost) erscheinen auf den Projektseiten neben dem Zitat. Das Intro-Video (`intro`, 92 Sekunden) ist nicht eingebunden, die Zuordnung zu einer Person ist offen
- Kontaktformular: Testeintrag «TEST Claude (bitte ignorieren)» im Sales CRM von Hand löschen. Resend ist nicht nötig, die Mail läuft über n8n und Gmail
- Marketing-Check: Die Analyse läuft im Agentur-Tool. Vor dem Go-live mit drei echten Betrieben testen. Im Datenschutz ergänzen, dass Firmenname, Ort, Branche und Website an das Analyse-Tool gehen
- Datenschutz und Impressum sind unveränderte Texte der bisherigen Website und müssen vor dem Go-live von Menschen angepasst werden (Kontaktformular mit n8n, Notion und Gmail, Hosting bei Vercel, Schriften)
- Blog: Kategorien sind vorläufig nach Thema zugeordnet. Titelbilder der bisherigen Beiträge sind nicht übernommen
- Anzahl erstellter Websites: erst eintragen, wenn exakt gezählt (`site.config.ts`)
- Go-live: Domain, DNS, Vercel Pro, `NEXT_PUBLIC_INDEXABLE=1`, Search Console, GA4 prüfen
