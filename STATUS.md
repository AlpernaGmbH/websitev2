# STATUS.md

Stand: 04.10.2026. Release 1 läuft als Vorschau auf Vercel (Projekt `alperna-website`), nicht indexiert, nicht auf der eigenen Domain.

## Fertig
- Seiten: Startseite, Über uns, Projekte mit 14 Detailseiten, Blog mit 40 Beiträgen, Kontakt, Impressum, Datenschutz, 404
- Sitemap (61 URLs), Schema (Organisation, Breadcrumb, FAQ, Artikel), Open-Graph-Bild, Icon
- Kontaktformular als Route Handler mit Honigtopf, Begrenzung und Prüfung
- Alle Bilder selbst gehostet (121 Dateien, 4,9 MB), Slugs 1:1 zur Live-Site

## Offen
- Videos: 18 Videos (199 MB) liegen noch bei Framer. Nicht ins Git. Speicherort und Kompression klären (Vercel Blob oder gleichwertig). Die drei Video-Testimonials (Appenzellerland Sport, BC Trogen Speicher, LifeBoost) erscheinen erst danach
- Kontaktformular: ohne `RESEND_API_KEY` und `CONTACT_FROM` oder `N8N_WEBHOOK_URL` zeigt es die Rückfallmeldung. n8n-Workflow in die Notion-Datenbank steht noch aus
- Datenschutz und Impressum sind unveränderte Texte der bisherigen Website und müssen vor dem Go-live von Menschen angepasst werden (Kontaktformular, Hosting, Schriften)
- Blog: Kategorien sind vorläufig nach Thema zugeordnet (Framer exportiert sie nicht ins HTML). Titelbilder der bisherigen Beiträge sind nicht übernommen, sie passen nicht zum neuen Look
- Projekttexte sind Originale der Live-Site, die Überarbeitung nach BRAND-VOICE folgt
- Anzahl erstellter Websites: erst eintragen, wenn exakt gezählt (`site.config.ts`)
- Go-live: Domain, DNS, Vercel Pro, `NEXT_PUBLIC_INDEXABLE=1`, Search Console, GA4 prüfen. Weiterleitung `/projekte-alperna/regina-massagen` auf `/projekte/regina-massagen`
