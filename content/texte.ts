// Alle Seitentexte der Website. Basis ist der Prototyp (alperna-tool.vercel.app/website),
// korrigiert nach Plan 5.4, BRAND-VOICE und GLOSSARY. Nichts davon stammt von der Framer-Seite.
// Zahlen kommen aus site.config.ts und data/*.json (scripts/check-content.mjs prüft das).
import { site } from '@/site.config'
import { chf, fmt } from '@/lib/format'

/** Text mit höchstens einem Akzentwort (kursiv, mit gelbem Marker) */
export type Teil = { t: string; em?: boolean }
export type Link = { label: string; href: string }

const partner = site.partnerAnzahl
const beitraege = `${fmt(site.beitraegeErstellt)}+`
const preise = site.preise
const jahre = ['null', 'ein', 'zwei', 'drei', 'vier', 'fünf'][site.seitJahren]

export const home = {
  meta: {
    title: 'Digitaler Auftritt für Ostschweizer KMU | Alperna GmbH',
    description: 'Website, Google-Profil und Social Media aus einer Hand. Wir sorgen dafür, dass Ostschweizer KMU online gefunden werden und Anfragen bekommen.',
  },
  hero: {
    badge: 'Partner für den digitalen Auftritt',
    zeilen: [[{ t: 'Dein digitaler' }], [{ t: 'Aufstieg', em: true }, { t: ' startet hier.' }]] as Teil[][],
    lead: 'Website, Google-Profil, Social Media: aus einer Hand, für KMU in der Ostschweiz.',
    ctaPrimaer: { label: 'Erstgespräch vereinbaren', href: '#kontakt' } as Link,
    ctaSekundaer: { label: 'Gratis Marketing-Check', href: '/check' } as Link,
    gruender: { namen: 'Andrej Good & Leander Züst', rolle: 'Gründer von Alperna' },
  },
  ticker: ['Website', 'Google-Profil', 'Social Media', 'Onlineshop', 'Online-Buchung', 'Google Ads'],
  statement: {
    label: 'Wer wir sind',
    parts: [
      { t: `Wir sind Andrej und Leander, Alperna GmbH in Speicher AR. Seit ${jahre} Jahren dabei, studieren ${site.studium} und haben ` },
      { t: `${partner} Partner`, em: true },
      { t: ', die zeigen, was wir können. Wir sorgen dafür, dass du ' },
      { t: 'gefunden wirst', em: true },
      { t: ', wenn jemand nach dir sucht.' },
    ] as Teil[],
  },
  bausteine: {
    label: 'Leistungen',
    h2: [{ t: 'Sechs Bausteine für deinen digitalen ' }, { t: 'Auftritt', em: true }, { t: '.' }] as Teil[],
    aside: 'Wir starten meist mit der Website. Danach schlagen wir dir immer nur den nächsten Baustein vor.',
    liste: [
      { slug: 'website' as const, titel: 'Website', tag: `Einstieg, ab ca. ${chf(preise.websiteAb)}`, text: `Eine Website, die auf dem Handy überzeugt und Anfragen bringt. Mit eigenem Shooting ca. ${chf(preise.websiteMitShooting)}.` },
      { slug: 'google-profil' as const, titel: 'Google-Profil', tag: 'Google Unternehmensprofil', text: 'Wer nach deiner Branche in der Region sucht, findet dich bei Google und auf Google Maps. Wir richten dein Profil ein oder bringen es in Ordnung.' },
      { slug: 'social-media' as const, titel: 'Social Media', tag: `Einzelner Beitrag ab ${chf(preise.einzelbeitrag)}`, text: 'Beiträge und Videos, die zu deinen Kunden passen. Wir planen, produzieren und posten, auf Wunsch komplett für dich.' },
      { slug: 'onlineshop' as const, titel: 'Onlineshop', tag: 'Auf Anfrage', text: 'Deine Produkte online verkaufen, ohne dich in die Technik einzuarbeiten. Umfang und Preis besprechen wir im Gespräch.' },
      { slug: 'online-buchung' as const, titel: 'Online-Buchung', tag: 'Auf Anfrage', text: 'Deine Kunden buchen Termine selbst, auch abends und am Wochenende. Das spart dir Telefonate und Nachrichten.' },
      { slug: 'google-ads' as const, titel: 'Google Ads', tag: 'Auf Anfrage', text: 'Wenn es für deinen Betrieb der sinnvollste nächste Schritt ist. Zuerst sorgen wir dafür, dass du auch ohne bezahlte Werbung gefunden wirst.' },
    ],
  },
  warum: {
    label: 'Warum Alperna',
    h2: [{ t: `Seit ${jahre} Jahren dabei. Und aus der ` }, { t: 'Region.', em: true }] as Teil[],
    punkte: [
      { titel: 'Aus der Region', text: 'Wir kennen die Ostschweiz, ihre Betriebe und ihre Kundschaft. Treffen vor Ort statt endloser Calls.' },
      { titel: `Seit ${jahre} Jahren dabei`, text: `Wir arbeiten seit ${jahre} Jahren an digitalen Auftritten und studieren beide ${site.studium}. Was wir schon gebaut haben, siehst du unter Projekte.`, link: { label: 'Projekte ansehen', href: '/projekte' } as Link },
      { titel: 'Fair und flexibel', text: 'Keine langen Laufzeiten. Wir fangen klein an, meist mit der Website. Der nächste Baustein kommt erst, wenn er dir etwas bringt.' },
    ],
  },
  ablauf: {
    label: 'So arbeiten wir',
    h2: [{ t: 'In vier Etappen ' }, { t: 'zum Gipfel.', em: true }] as Teil[],
    lead: 'Vom ersten Kaffee bis zum Auftritt, der läuft. Transparent, Schritt für Schritt.',
    cta: { label: 'Erstgespräch vereinbaren', href: '#kontakt' } as Link,
    etappen: [
      { titel: 'Kennenlernen', text: 'Kostenloses Erstgespräch bei dir im Betrieb oder per Video. Wir hören zu und stellen die richtigen Fragen.' },
      { titel: 'Vorschlag', text: 'Wir schauen uns deinen heutigen Auftritt an und schlagen dir den nächsten sinnvollen Baustein vor, mit klarem Preis.' },
      { titel: 'Umsetzung', text: 'Wir setzen den Baustein um und halten dich mit kurzen Updates auf dem Laufenden. Du siehst, woran wir arbeiten und warum.' },
      { titel: 'Betreuung', text: `Auf Wunsch betreuen wir deinen Auftritt weiter: Hosting, Anpassungen, Beiträge. Du erreichst uns per WhatsApp oder E-Mail, ${site.erreichbarkeitTageProJahr} Tage im Jahr.` },
    ],
  },
  team: {
    label: 'Über uns',
    h2: [{ t: 'Die Köpfe ' }, { t: 'hinter Alperna.', em: true }] as Teil[],
    aside: 'Zwei Gründer mit einer gemeinsamen Aufgabe: Betriebe aus der Region sollen online gefunden werden.',
    karten: [
      { id: 'andrej' as const, tag: 'Mitgründer', rolle: `Studium: ${site.studium}`, text: 'Ich schreibe die Texte, baue die Websites und filme vor Ort. Was ich dir zusage, halte ich. Wenn ein Schritt nichts bringt, sage ich es dir.' },
      { id: 'leander' as const, tag: 'Mitgründer', rolle: `Studium: ${site.studium}`, text: 'Ich plane die Inhalte und schneide die Videos. Mir ist wichtig, dass das Material nach deinem Betrieb aussieht und nicht nach Vorlage.' },
    ],
  },
  faq: {
    label: 'Häufige Fragen',
    h2: [{ t: 'Gut zu ' }, { t: 'wissen.', em: true }] as Teil[],
    weitere: { label: 'Andere Frage? Schreib uns', href: '#kontakt' } as Link,
    fragen: [
      { q: 'Seid ihr nicht zu jung?', a: `Wir sind jung, aber nicht neu im Geschäft. Wir arbeiten seit ${jahre} Jahren an digitalen Auftritten und studieren beide ${site.studium}. Unter Projekte siehst du, was wir umgesetzt haben, mit Zahlen.` },
      { q: 'Wie lange bin ich gebunden?', a: 'Wir arbeiten ohne lange Vertragslaufzeiten. Eine Website ist ein einmaliger Auftrag. Für Hosting und laufende Betreuung besprechen wir die Konditionen transparent im Erstgespräch.' },
      { q: 'Was kostet der Einstieg?', a: `Eine Website kostet ab ca. ${chf(preise.websiteAb)}, mit eigenem Shooting ca. ${chf(preise.websiteMitShooting)}. Ein einzelner Social-Media-Beitrag kostet ${chf(preise.einzelbeitrag)}. Alles Weitere besprechen wir nach dem Erstgespräch, damit du nur bezahlst, was dein Betrieb braucht.` },
      { q: 'Bringt das in unserer Region etwas?', a: 'Wir haben es in der Region schon umgesetzt. Der BC Trogen Speicher hat in 3 Monaten 690 % mehr Instagram-Aufrufe erzielt, die Website der Massagepraxis Regina brachte rund 12 Kontakt-Klicks in den ersten sechs Wochen. Ob es bei dir etwas bringt, klären wir im Erstgespräch. Das kostet nichts.' },
      { q: 'Versteht ihr unser Geschäft?', a: 'Wir fragen zuerst, bevor wir etwas vorschlagen. Im Erstgespräch erzählst du uns von deinem Betrieb, wir schauen uns deinen Auftritt an und sagen dir offen, was wir sehen. Erfahrung haben wir unter anderem mit einem Restaurant, einer Massagepraxis, einem Sportverein, Coaching und einem Gewerbeverband.' },
      { q: 'Behalte ich die Kontrolle?', a: 'Du weisst bei uns immer, was wir tun und warum. Du bekommst kurze Updates, und das Material, das wir für dich produzieren, kannst du selbst weiterverwenden.' },
      { q: 'Wie schnell meldet ihr euch?', a: 'Innert zwei Arbeitstagen nach deiner Anfrage.' },
    ],
  },
  kontakt: {
    label: 'Kontakt',
    h2: [{ t: 'Der nächste Schritt ist ein ' }, { t: 'Gespräch.', em: true }] as Teil[],
    lead: 'Erzähl uns kurz von deinem Betrieb. Wir melden uns innert zwei Arbeitstagen für ein unverbindliches Erstgespräch.',
    termin: 'Termin direkt buchen',
    standort: `${site.address.city} ${site.address.canton}, Ostschweiz`,
  },
}

export const ueberUns = {
  meta: {
    title: 'Über Alperna | Andrej Good und Leander Züst, Speicher AR',
    description: `Andrej Good und Leander Züst führen Alperna in Speicher AR: seit ${jahre} Jahren dabei, mit ${partner} Partnern.`,
  },
  label: 'Über uns',
  h1: [{ t: 'Zwei Gründer. Ein Ziel: dass du ' }, { t: 'gefunden wirst.', em: true }] as Teil[],
  sub: `Seit ${jahre} Jahren arbeiten wir für Betriebe, zuerst international, heute in der Ostschweiz.`,
  kennzahlen: [
    { wert: String(partner), label: 'Partner, mit denen wir gearbeitet haben' },
    { wert: beitraege, label: 'Beiträge erstellt' },
    { wert: `${site.seitJahren} Jahre`, label: 'gemeinsame Arbeit an Social-Media-Projekten' },
  ],
  story: {
    h2: 'Wie es dazu kam',
    absaetze: [
      `Ihren ersten Kunden in den USA haben sie gratis übernommen, um zu zeigen, was sie können. In ${site.ersterKunde.zeitraum} kamen ${site.ersterKunde.aufrufe} Aufrufe, ${fmt(site.ersterKunde.follower)} neue Follower und ${fmt(site.ersterKunde.umsatzUsd)} USD Umsatz für den Kunden zusammen. Das ist ein Handwerksbeleg, kein Versprechen für deinen Betrieb.`,
      'Daraus sind drei Jahre Arbeit geworden: zuerst mit internationalem Fokus, heute als Alperna GmbH in Speicher AR, für Betriebe in der Ostschweiz.',
    ],
  },
  jung: {
    h2: `Seit ${jahre} Jahren dabei`,
    absaetze: [
      `Wir arbeiten seit ${jahre} Jahren an digitalen Auftritten und studieren beide ${site.studium}. Wir suchen aktiv Aufträge. Deshalb ist der Preis fair.`,
      `Wir kommen aber nicht bei null an. ${partner} Partner, ${fmt(site.beitraegeErstellt)} Beiträge und die Projekte auf dieser Seite zeigen, was hinter dem jungen Auftritt steckt.`,
    ],
    link: { label: 'Projekte ansehen', href: '/projekte' } as Link,
  },
  team: {
    label: 'Team',
    h2: [{ t: 'Die ' }, { t: 'Gründer.', em: true }] as Teil[],
  },
  kulissen: {
    label: 'Hinter den Kulissen',
    h2: [{ t: 'So entsteht dein ' }, { t: 'Auftritt.', em: true }] as Teil[],
    aside: 'Einblicke in unsere Arbeit vor Ort bei Partnern.',
  },
}

export const kontakt = {
  meta: {
    title: 'Kontakt | Alperna GmbH, Speicher AR',
    description: 'Schreib uns kurz von deinem Betrieb. Wir melden uns innert zwei Arbeitstagen für ein kostenloses Erstgespräch.',
  },
  label: 'Kontakt',
  h1: [{ t: 'Erzähl uns kurz von deinem ' }, { t: 'Betrieb.', em: true }] as Teil[],
  sub: 'Wir melden uns innert zwei Arbeitstagen für ein kostenloses Erstgespräch. 30 Minuten, unverbindlich. Danach weisst du, woran du bist.',
  formular: {
    name: { label: 'Name *', platzhalter: 'Vorname Nachname', fehler: 'Bitte gib deinen Namen an.' },
    firma: { label: 'Firma', platzhalter: 'Muster AG' },
    email: { label: 'E-Mail *', platzhalter: 'name@firma.ch', fehler: 'Bitte gib eine gültige E-Mail-Adresse an.' },
    themen: { label: 'Wobei dürfen wir helfen?', optionen: ['Website', 'Google-Profil', 'Social Media', 'Onlineshop', 'Online-Buchung', 'Google Ads'] },
    nachricht: { label: 'Nachricht *', platzhalter: 'Worum geht es? Ein paar Sätze reichen.', fehler: 'Erzähl uns kurz, worum es geht.' },
    einwilligung: 'Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden',
    einwilligungFehler: 'Bitte bestätige die Einwilligung.',
    button: 'Anfrage senden',
    senden: 'Wird gesendet',
    erfolg: 'Danke, deine Nachricht ist angekommen. Wir melden uns innert zwei Arbeitstagen.',
    fehlerVersand: `Das hat leider nicht geklappt. Schreib uns direkt an ${site.email}.`,
  },
  wege: {
    termin: 'Termin direkt buchen',
    whatsapp: 'WhatsApp schreiben',
    whatsappHinweis: 'Anrufe nehmen wir leider nicht entgegen.',
    mail: 'E-Mail',
    standort: 'Standort',
  },
}

export const projektePage = {
  meta: {
    title: 'Projekte und Referenzen | Alperna GmbH, Ostschweiz',
    description: 'Websites, Videos und Social Media für Betriebe, Vereine und Verbände aus der Ostschweiz. Mit Ausgangslage und Zahlen.',
  },
  label: 'Referenzen',
  h1: [{ t: 'Das haben wir ' }, { t: 'umgesetzt.', em: true }] as Teil[],
  sub: 'Jeder Betrieb ist anders. Hier siehst du, wie die Ausgangslage aussah, was wir gemacht haben und was dabei herauskam.',
  filterAlle: 'Alle',
  international: {
    h2: 'Handwerksbeleg international',
    einordnung: 'Diese Fälle stammen aus der Zeit vor unserem Fokus auf die Ostschweiz und zeigen, was wir handwerklich können, nicht was dich erwartet.',
  },
  detail: {
    zurueck: 'Alle Projekte',
    ausgangslage: 'Ausgangslage',
    gemacht: 'Was wir gemacht haben',
    leistungen: 'Bausteine',
    ergebnis: 'Ergebnis',
    einblicke: 'Einblicke',
    videos: 'Videos',
    belege: 'Auswertung',
    naechstes: 'Nächstes Projekt',
    stimme: 'Stimme des Kunden',
    kunde: 'Mehr über den Kunden',
    ctaTitel: 'Ähnliches Projekt?',
    ctaText: 'Erzähl uns kurz von deinem Betrieb. Wir melden uns innert zwei Arbeitstagen.',
    cta: { label: 'Ähnliches Projekt besprechen', href: '/kontakt' } as Link,
  },
}

export const blogPage = {
  meta: {
    title: 'Praxiswissen für den digitalen Auftritt | Alperna Blog',
    description: 'Konkrete Anleitungen zu Website, Google-Profil und Social Media für KMU in der Ostschweiz, aus der täglichen Arbeit von Alperna.',
  },
  label: 'Blog',
  h1: [{ t: 'Praxiswissen für den digitalen ' }, { t: 'Auftritt.', em: true }] as Teil[],
  sub: 'Konkrete Anleitungen für KMU in der Ostschweiz, aus der täglichen Arbeit.',
  filterAlle: 'Alle',
  artikel: {
    zurueck: 'Alle Beiträge',
    boxTitel: 'Lieber machen lassen?',
    boxText: 'Wir schauen uns deinen Auftritt an und sagen dir, was als Nächstes am meisten bringt. Das Erstgespräch kostet nichts.',
    boxCta: { label: 'Erstgespräch vereinbaren', href: '/kontakt' } as Link,
  },
}

export const global = {
  nav: [
    { label: 'Startseite', href: '/', nurMobil: true },
    { label: 'Leistungen', href: '/#leistungen' },
    { label: 'Ablauf', href: '/#ablauf' },
    { label: 'Projekte', href: '/projekte' },
    { label: 'Über uns', href: '/ueber-uns' },
    { label: 'Blog', href: '/blog' },
  ],
  ctaHeader: { label: 'Erstgespräch', href: '/kontakt' } as Link,
  skip: 'Zum Inhalt springen',
  menue: 'Menü',
  menueZu: 'Schliessen',
  footer: {
    ctaText: [{ t: 'Dein nächster ' }, { t: 'Baustein.', em: true }] as Teil[],
    cta: { label: 'Erstgespräch vereinbaren', href: '/kontakt' } as Link,
    about: 'Partner für den digitalen Auftritt von KMU in St. Gallen, Speicher, Appenzell, im Rheintal und in der ganzen Ostschweiz.',
    seiten: 'Navigation',
    kontakt: 'Kontakt',
    links: [
      { label: 'Leistungen', href: '/#leistungen' },
      { label: 'Ablauf', href: '/#ablauf' },
      { label: 'Projekte', href: '/projekte' },
      { label: 'Marketing-Check', href: '/check' },
      { label: 'Über uns', href: '/ueber-uns' },
      { label: 'Blog', href: '/blog' },
      { label: 'Kontakt', href: '/kontakt' },
    ],
    rechtliches: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
    ],
  },
  fehlerseite: {
    h1: [{ t: 'Diese Seite ' }, { t: 'gibt es nicht.', em: true }] as Teil[],
    text: 'Vielleicht hilft dir die Startseite oder ein Blick auf die Projekte.',
    links: [
      { label: 'Zur Startseite', href: '/' },
      { label: 'Projekte ansehen', href: '/projekte' },
    ] as Link[],
  },
  rechtliches: {
    impressum: {
      title: 'Impressum | Alperna GmbH, Speicher AR',
      description: 'Impressum der Alperna GmbH, Röhrenbrugg 7, 9042 Speicher AR. UID CHE-132.724.195, Kontakt kontakt@alperna.ch.',
    },
    datenschutz: {
      title: 'Datenschutzerklärung | Alperna GmbH',
      description: 'Datenschutzerklärung der Alperna GmbH für die Website alperna.ch.',
    },
    vorschauHinweis: 'Hinweis zur Vorschau: Dieser Text stammt von der bisherigen Website und wird vor dem Go-live von Menschen angepasst (Kontaktformular, Hosting, Schriften).',
  },
  og: {
    titel: 'Alperna: Partner für den digitalen Auftritt',
    beschreibung: 'Website, Google-Profil und Social Media aus einer Hand, für KMU in der Ostschweiz.',
  },
}

/** Nachricht, mit der der WhatsApp-Link vorbefüllt ist (aus Sicht der Besucherin oder des Besuchers). */
export const whatsappText = 'Hallo, ich habe eure Website gesehen und möchte mehr erfahren.'

export const checkPage = {
  meta: {
    title: 'Gratis Marketing-Check für Ostschweizer KMU | Alperna',
    description: 'Prüfe in 30 Sekunden, wie sichtbar dein Betrieb online ist: Website, Google-Profil, Social Media, Shop und Buchung. Gratis und ohne Anmeldung.',
  },
  label: 'Gratis Marketing-Check',
  h1: [{ t: 'Wie sichtbar ist dein Betrieb ' }, { t: 'online?', em: true }] as Teil[],
  sub: 'Website, Google-Profil, Social Media, Shop, Online-Buchung und Newsletter im Check. Du siehst in rund 30 Sekunden, wo es hakt, und bekommst einen Vorschlag für den nächsten Schritt.',
  formular: {
    betrieb: 'Dein Betrieb',
    firma: 'Firmenname',
    ort: 'Ort',
    branche: 'Branche',
    brancheWaehlen: 'Bitte wählen',
    website: 'Website',
    websiteHinweis: 'zum Beispiel www.meinbetrieb.ch',
    social: 'Social Media',
    optional: 'optional',
    socialHinweis: 'Trag deine Kanäle ein und schätze, wie oft du dort postest. Kanäle, die auf deiner Website verlinkt sind, finden wir auch selbst.',
    kanalAdresse: 'Adresse oder Name',
    haeufigkeit: 'Wie oft postest du?',
    haeufigkeitWaehlen: 'Bitte wählen',
    start: 'Check starten',
    hinweis: 'Kostenlos und unverbindlich. Wir prüfen nur öffentlich sichtbare Informationen.',
    pflicht: 'Bitte fülle die markierten Felder aus.',
  },
  branchen: [
    ['gastro', 'Gastronomie, Restaurant, Café'],
    ['hotel', 'Hotel, Ferienwohnung, B&B'],
    ['beauty', 'Coiffeur, Kosmetik, Beauty'],
    ['health', 'Gesundheit, Praxis, Therapie'],
    ['fitness', 'Fitness, Sport, Kurse'],
    ['retail', 'Detailhandel, Laden'],
    ['producer', 'Produktion, Manufaktur, Hofladen'],
    ['craft', 'Handwerk, Bau, Garten'],
    ['b2b', 'Beratung, Dienstleistung (B2B)'],
    ['realestate', 'Immobilien, Treuhand'],
    ['auto', 'Garage, Auto, Mobilität'],
    ['other', 'Andere Branche'],
  ] as [string, string][],
  netze: [
    ['instagram', 'Instagram'],
    ['facebook', 'Facebook'],
    ['linkedin', 'LinkedIn'],
    ['tiktok', 'TikTok'],
    ['youtube', 'YouTube'],
  ] as [string, string][],
  haeufigkeit: [
    ['none', 'Gar nicht'],
    ['rare', 'Seltener als monatlich'],
    ['monthly', 'Etwa monatlich'],
    ['weekly', 'Etwa wöchentlich'],
    ['several', 'Mehrmals pro Woche'],
  ] as [string, string][],
  laeuft: {
    titel: 'Analyse läuft',
    schritte: ['Website laden', 'Technik und Suchmaschinen prüfen', 'Google-Profil suchen', 'Social-Media-Kanäle abgleichen', 'Tracking, Newsletter, Shop und Buchung erkennen', 'Bewertung berechnen'],
  },
  ergebnis: {
    fuer: 'Ergebnis für',
    titel: 'Deine Online-Sichtbarkeit',
    von: 'von 100',
    stark: 'Starke Basis. Mit gezielten Schritten holst du noch mehr heraus.',
    mittel: 'Solide Ansätze, aber da ist noch Luft. Wir zeigen dir, wo.',
    schwach: 'Hier liegt viel Luft nach oben. Wir zeigen dir, wo du am meisten gewinnst.',
    selbstangabe: 'Selbstangabe',
    nichtGeprueft: 'Nicht automatisch geprüft',
    ok: 'In Ordnung',
    weitereOk: 'weitere Punkte in Ordnung',
    allesOk: 'Alle Punkte in Ordnung',
    luecke: 'Verbesserungspotenzial',
    naechsterBaustein: 'Dein nächster Baustein',
    keinBaustein: 'Gemeinsam anschauen',
    keinBausteinText: 'Dein Auftritt steht auf einer soliden Basis. Wenn du magst, schauen wir im Gespräch gemeinsam, was als Nächstes am meisten bringt.',
    grund: 'Hier liegt bei dir die grösste Lücke. Mit einem Baustein nach dem anderen kommst du am schnellsten voran.',
    mehrErfahren: 'Mehr zu diesem Baustein',
    gespraech: { label: 'Erstgespräch vereinbaren', href: '/kontakt' } as Link,
    nochmal: 'Weitere Website prüfen',
    grenze: 'Der Check liest nur öffentlich sichtbare Informationen und ersetzt kein Gespräch. Einzelne Punkte, etwa dein Google-Profil, prüfen wir im Erstgespräch persönlich.',
  },
  fehler: {
    allgemein: 'Die Analyse hat nicht geklappt. Prüfe die Website-Adresse oder versuche es in ein paar Minuten nochmals.',
    zuOft: 'Du hast den Check ein paarmal gestartet. Versuch es in zehn Minuten nochmals.',
    direkt: 'Du kannst uns auch direkt schreiben. Wir prüfen deinen Auftritt dann persönlich.',
    kontakt: { label: 'Zum Kontakt', href: '/kontakt' } as Link,
  },
  mehrTools: 'Mehr Tools',
}

export type LeistungSlug = 'website' | 'google-profil' | 'social-media' | 'onlineshop' | 'online-buchung' | 'google-ads'

export const leistungenSeite = {
  label: 'Leistung',
  zurueck: 'Alle Leistungen',
  warum: 'Warum das wichtig ist',
  zahlen: 'Die Zahlen dazu',
  machen: 'Was wir für dich tun',
  projekte: 'Das haben wir umgesetzt',
  keineProjekte: 'Dazu zeigen wir dir im Erstgespräch passende Beispiele.',
  alleProjekte: { label: 'Alle Projekte', href: '/projekte' } as Link,
  quelle: 'Quelle',
  basis: 'Basis',
  tabelle: 'Werte als Tabelle',
  naechste: 'Nächste Leistung',
  cta: {
    titel: 'Passt das zu deinem Betrieb?',
    text: 'Im Erstgespräch klären wir, ob dieser Baustein dir etwas bringt. Das kostet nichts.',
    gespraech: { label: 'Erstgespräch vereinbaren', href: '/kontakt' } as Link,
    check: { label: 'Zuerst den Marketing-Check machen', href: '/check' } as Link,
  },
  seiten: {
    website: {
      name: 'Website',
      tag: `Einstieg ab ca. ${chf(preise.websiteAb)}, mit Shooting ca. ${chf(preise.websiteMitShooting)}`,
      meta: { title: 'Website für KMU in der Ostschweiz | Alperna', description: 'Eine Website, die auf dem Handy überzeugt und Anfragen bringt. Mit eigenen Fotos, für Betriebe und Vereine in der Ostschweiz.' },
      h1: [{ t: 'Eine Website, die ' }, { t: 'Anfragen bringt.', em: true }] as Teil[],
      lead: 'Deine Website ist der Ort, an dem Interessenten entscheiden, ob sie dich anfragen.',
      warum: [
        'Bevor jemand anruft oder vorbeikommt, schaut er online nach. Eine Website, die auf dem Handy schnell lädt und sofort zeigt, was du anbietest, entscheidet, ob er dich anfragt oder weiterklickt.',
        'Dein Google-Profil und deine Social-Media-Kanäle verweisen auf die Website. Sie ist der Ort, den du selbst in der Hand hast.',
      ],
      machen: [
        'Texte und Aufbau, die zu deinen Kunden passen',
        'Eigene Fotos statt Stockbilder, auf Wunsch mit Shooting vor Ort',
        'Schnell auf dem Handy und sauber für Google aufgebaut',
        'Anfrageformular, WhatsApp und Terminbuchung, damit Interessenten den nächsten Schritt sofort finden',
      ],
      projektBaustein: 'website',
    },
    'google-profil': {
      name: 'Google-Profil',
      tag: 'Google-Unternehmensprofil',
      meta: { title: 'Google-Unternehmensprofil einrichten | Alperna', description: 'Wer in der Region nach deinem Angebot sucht, findet dich bei Google und auf Maps. Wir richten dein Profil ein oder bringen es in Ordnung.' },
      h1: [{ t: 'Wer nach dir sucht, ' }, { t: 'findet dich.', em: true }] as Teil[],
      lead: 'Dein Google-Profil ist oft der erste Eindruck: Adresse, Öffnungszeiten, Bewertungen und Fotos auf einen Blick.',
      warum: [
        'Wer in der Region einen Betrieb sucht, landet bei Google und auf Google Maps. Dein Profil erscheint dort kostenlos, wenn es eingerichtet und gepflegt ist.',
        'Ein unvollständiges oder veraltetes Profil kostet Anfragen, ohne dass du es merkst.',
      ],
      machen: [
        'Profil einrichten oder übernehmen und prüfen',
        'Kategorien, Leistungen, Öffnungszeiten und Fotos pflegen',
        'Bewertungen beantworten',
        'Auf Wunsch regelmässig Beiträge im Profil veröffentlichen',
      ],
      projektBaustein: 'google-profil',
    },
    'social-media': {
      name: 'Social Media',
      tag: `Einzelner Beitrag ab ${chf(preise.einzelbeitrag)}`,
      meta: { title: 'Social Media für KMU in der Ostschweiz | Alperna', description: 'Beiträge und Videos, die zu deinen Kunden passen. Wir planen, produzieren und posten, auf Wunsch komplett für dich.' },
      h1: [{ t: 'Beiträge, die zu deinen Kunden ' }, { t: 'passen.', em: true }] as Teil[],
      lead: 'Social Media zeigt, wer hinter dem Betrieb steht. Regelmässig und echt wirkt es stärker als laut und selten.',
      warum: [
        'Viele deiner Kunden sind täglich auf Instagram, Facebook oder TikTok. Dort entscheiden sie oft, ob ein Betrieb zu ihnen passt, bevor sie ihn kennen.',
        'Wichtig ist nicht jeder Kanal, sondern der richtige, und dass du dranbleibst.',
      ],
      machen: [
        'Planen, welche Themen und Kanäle zu dir passen',
        'Fotos und Videos vor Ort produzieren',
        'Beiträge schreiben, schneiden und posten',
        'Auf Wunsch komplett für dich, du siehst vorab, was online geht',
      ],
      projektBaustein: 'social-media',
    },
    onlineshop: {
      name: 'Onlineshop',
      tag: 'Auf Anfrage',
      meta: { title: 'Onlineshop für KMU in der Ostschweiz | Alperna', description: 'Deine Produkte online verkaufen, ohne dich in die Technik einzuarbeiten. Ob ein Shop für dich Sinn ergibt, klären wir zuerst im Gespräch.' },
      h1: [{ t: 'Deine Produkte online ' }, { t: 'verkaufen.', em: true }] as Teil[],
      lead: 'Ein Onlineshop lohnt sich, wenn deine Kunden gerne online bestellen und du liefern kannst.',
      warum: [
        'Wer ein Produkt hat, das sich versenden lässt, verkauft damit auch ausserhalb der Öffnungszeiten und über die Region hinaus.',
        'Nicht jeder Betrieb braucht einen Shop. Ob er sich für dich lohnt, klären wir zuerst im Gespräch.',
      ],
      machen: [
        'Prüfen, ob ein Shop für dich Sinn ergibt',
        'Shop mit Produktfotos und Texten aufbauen',
        'Zahlung und Versand einrichten',
        'Dich einarbeiten, damit du Bestellungen selbst bearbeiten kannst',
      ],
      projektBaustein: null,
    },
    'online-buchung': {
      name: 'Online-Buchung',
      tag: 'Auf Anfrage',
      meta: { title: 'Online-Buchung für Termine und Reservationen | Alperna', description: 'Deine Kunden buchen Termine selbst, auch abends und am Wochenende. Das spart dir Telefonate und Nachrichten.' },
      h1: [{ t: 'Termine, die deine Kunden selbst ' }, { t: 'buchen.', em: true }] as Teil[],
      lead: 'Mit Online-Buchung bucht deine Kundschaft auch abends und am Wochenende, ohne dass du erreichbar sein musst.',
      warum: [
        'Jeder Anruf und jede Nachricht, die nur wegen eines Termins kommt, kostet Zeit. Gleichzeitig springen Interessenten ab, wenn sie dich nicht gleich erreichen.',
        'Eine Online-Buchung nimmt dir Rückfragen ab und füllt den Kalender auch ausserhalb deiner Arbeitszeit.',
      ],
      machen: [
        'Passendes Buchungssystem auswählen und einrichten',
        'Leistungen, Dauer und Zeiten festlegen',
        'Mit Website und Google-Profil verknüpfen',
        'Erinnerungen an Kunden einrichten, damit weniger Termine ausfallen',
      ],
      projektBaustein: null,
    },
    'google-ads': {
      name: 'Google Ads',
      tag: 'Auf Anfrage, nur wenn es der sinnvollste nächste Schritt ist',
      meta: { title: 'Google Ads für KMU in der Ostschweiz | Alperna', description: 'Bezahlt gefunden werden, wenn es Sinn ergibt: Wir starten klein, mit einem Budget, das du jederzeit kontrollierst.' },
      h1: [{ t: 'Bezahlt gefunden werden, wenn es ' }, { t: 'Sinn ergibt.', em: true }] as Teil[],
      lead: 'Google Ads bringt dich zuoberst in die Suche, sobald jemand nach deinem Angebot sucht. Du zahlst, wenn jemand klickt.',
      warum: [
        'Werbung bringt am meisten, wenn Website und Google-Profil bereits stehen. Sonst bezahlst du für Klicks, die nirgendwo hinführen.',
        'Deshalb schlagen wir Google Ads erst vor, wenn der Rest solide ist, und setzen ein Budget, das du jederzeit kontrollierst.',
      ],
      machen: [
        'Suchbegriffe und Region festlegen',
        'Anzeigen und Zielseite aufeinander abstimmen',
        'Mit kleinem Budget starten und laufend anpassen',
        'Monatlich kurz berichten, was es gebracht hat',
      ],
      projektBaustein: null,
    },
  } as Record<LeistungSlug, {
    name: string
    tag: string
    meta: { title: string; description: string }
    h1: Teil[]
    lead: string
    warum: string[]
    machen: string[]
    projektBaustein: 'website' | 'google-profil' | 'social-media' | null
  }>,
  reihenfolge: ['website', 'google-profil', 'social-media', 'onlineshop', 'online-buchung', 'google-ads'] as LeistungSlug[],
}
