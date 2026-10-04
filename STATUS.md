# STATUS.md

Stand: 04.10.2026. Release 1 läuft als Vorschau auf Vercel (Projekt `alperna-website`), nicht indexiert, nicht auf der eigenen Domain.

## Fertig
- Design 1:1 nach Prototyp: Hero mit animierten Höhenlinien, Ticker, Aussagesatz mit Wort-Effekt, Leistungsliste, Ablauf und Team dunkel, FAQ, Kontakt, Footer mit Wortmarke. Gelb ist der einzige Akzent
- Startseite wie der Prototyp, ohne Projekte, Logos und Zitate. Texte vom Prototyp, korrigiert nach Plan 5.4
- Seiten: Über uns, Projekte (Liste, Filter, 14 Detailseiten), Blog (Liste, Filter, 40 Beiträge), Kontakt, Impressum, Datenschutz, 404
- Projekte als Raster: Fotokacheln (nur echte Fotos) und dunkle Zahlenkacheln mit Höhenlinien, wo kein gutes Foto existiert. Detailseite mit Titelbild neben den Kennzahlen, Galerie, Auswertung (Screenshots als Beleg) und «Nächstes Projekt». Logos kommen nicht mehr vor
- Projekttexte in eigenen Worten, Originaltexte der Framer-Seite aus dem Repo entfernt (`npm run check` verhindert, dass sie zurückkommen)
- Sitemap (61 URLs), Schema, Open-Graph-Bild, Icon. Alle Bilder selbst gehostet
- Kontaktformular als Route Handler mit Honigtopf, Begrenzung und Prüfung. Angeschlossen an den n8n-Workflow «Website-Kontakt (alperna.ch)»: Mail an kontakt@alperna.ch und Lead mit Status «Lead» im Notion Sales CRM (Kunden & Interessenten). `N8N_WEBHOOK_URL` ist in Vercel hinterlegt (Production und Preview), Ende-zu-Ende getestet
- Lighthouse mobil (lokal, Production-Build): Performance 94 bis 98, Accessibility 96 bis 100, Best Practices 100. SEO 100, sobald `NEXT_PUBLIC_INDEXABLE=1` gesetzt ist, in der Vorschau 69 wegen `noindex`

## Offen
- Videos: 18 Videos (199 MB) liegen noch bei Framer, nicht im Git. Speicherort und Kompression klären (Vercel Blob oder gleichwertig). Die drei Video-Testimonials erscheinen erst danach
- Kontaktformular: Testeintrag «TEST Claude (bitte ignorieren)» im Sales CRM von Hand löschen. Resend ist nicht nötig, die Mail läuft über n8n und Gmail
- Datenschutz und Impressum sind unveränderte Texte der bisherigen Website und müssen vor dem Go-live von Menschen angepasst werden (Kontaktformular mit n8n, Notion und Gmail, Hosting bei Vercel, Schriften)
- Blog: Kategorien sind vorläufig nach Thema zugeordnet. Titelbilder der bisherigen Beiträge sind nicht übernommen
- Anzahl erstellter Websites: erst eintragen, wenn exakt gezählt (`site.config.ts`)
- Go-live: Domain, DNS, Vercel Pro, `NEXT_PUBLIC_INDEXABLE=1`, Search Console, GA4 prüfen
