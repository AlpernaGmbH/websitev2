# STATUS.md

Stand: 04.10.2026. Release 1 läuft als Vorschau auf Vercel (Projekt `alperna-website`), nicht indexiert, nicht auf der eigenen Domain.

## Fertig
- Design 1:1 nach Prototyp: Hero mit animierten Höhenlinien, Ticker, Aussagesatz mit Wort-Effekt, Leistungsliste, Ablauf und Team dunkel, FAQ, Kontakt, Footer mit Wortmarke. Gelb ist der einzige Akzent
- Startseite wie der Prototyp, ohne Projekte, Logos und Zitate. Texte vom Prototyp, korrigiert nach Plan 5.4
- Seiten: Über uns, Projekte (Liste, Filter, 14 Detailseiten), Blog (Liste, Filter, 40 Beiträge), Kontakt, Impressum, Datenschutz, 404
- Projekttexte in eigenen Worten, Originaltexte der Framer-Seite aus dem Repo entfernt (`npm run check` verhindert, dass sie zurückkommen)
- Sitemap (61 URLs), Schema, Open-Graph-Bild, Icon. Alle Bilder selbst gehostet
- Kontaktformular als Route Handler mit Honigtopf, Begrenzung und Prüfung

## Offen
- Videos: 18 Videos (199 MB) liegen noch bei Framer, nicht im Git. Speicherort und Kompression klären (Vercel Blob oder gleichwertig). Die drei Video-Testimonials erscheinen erst danach
- Kontaktformular: ohne `RESEND_API_KEY` und `CONTACT_FROM` oder `N8N_WEBHOOK_URL` zeigt es die Rückfallmeldung. n8n-Workflow in die Notion-Datenbank steht noch aus
- Datenschutz und Impressum sind unveränderte Texte der bisherigen Website und müssen vor dem Go-live von Menschen angepasst werden (Kontaktformular, Hosting, Schriften)
- Blog: Kategorien sind vorläufig nach Thema zugeordnet. Titelbilder der bisherigen Beiträge sind nicht übernommen
- Anzahl erstellter Websites: erst eintragen, wenn exakt gezählt (`site.config.ts`)
- Go-live: Domain, DNS, Vercel Pro, `NEXT_PUBLIC_INDEXABLE=1`, Search Console, GA4 prüfen. Weiterleitung `/projekte-alperna/regina-massagen` auf `/projekte/regina-massagen`
