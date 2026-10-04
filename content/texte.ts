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
const gipfel = `${site.hero.gipfel} · ${fmt(site.hero.gipfelHoeheM)} m`

export const home = {
  meta: {
    title: 'Digitaler Auftritt für Ostschweizer KMU | Alperna GmbH',
    description: 'Website, Google-Profil und Social Media aus einer Hand. Wir sorgen dafür, dass Ostschweizer KMU online gefunden werden und Anfragen bekommen.',
  },
  hero: {
    badge: 'Partner für den digitalen Auftritt',
    region: 'St. Gallen · Appenzell · Rheintal',
    zeilen: [[{ t: 'Dein digitaler' }], [{ t: 'Aufstieg', em: true }, { t: ' startet hier.' }]] as Teil[][],
    lead: 'Website, Google-Profil, Social Media: aus einer Hand, für KMU in der Ostschweiz.',
    ctaPrimaer: { label: 'Erstgespräch vereinbaren', href: '#kontakt' } as Link,
    ctaSekundaer: { label: 'Projekte ansehen', href: '/projekte' } as Link,
    koordinaten: [`${site.hero.lat}° N · ${site.hero.lng}° E`, 'Ostschweiz, CH'],
    gipfel,
    overlayLinks: ['Aus der Ostschweiz,', 'für die Ostschweiz'],
    scroll: 'Scroll ↓',
    gruender: { namen: 'Andrej Good & Leander Züst', rolle: 'Gründer von Alperna' },
  },
  ticker: ['Website', 'Google-Profil', 'Social Media', 'Onlineshop', 'Online-Buchung', 'Google Ads'],
  statement: {
    label: 'Wer wir sind',
    parts: [
      { t: 'Wir sind Andrej und Leander, Alperna GmbH in Speicher AR. Frisch gegründet, BWL an der OST, und ' },
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
      { titel: 'Website', tag: `Einstieg, ab ca. ${chf(preise.websiteAb)}`, text: `Eine Website, die auf dem Handy überzeugt und Anfragen bringt. Mit eigenem Shooting ca. ${chf(preise.websiteMitShooting)}.` },
      { titel: 'Google-Profil', tag: 'Google Unternehmensprofil', text: 'Wer nach deiner Branche in der Region sucht, findet dich bei Google und auf Google Maps. Wir richten dein Profil ein oder bringen es in Ordnung.' },
      { titel: 'Social Media', tag: `Einzelner Beitrag ab ${chf(preise.einzelbeitrag)}`, text: 'Beiträge und Videos, die zu deinen Kunden passen. Wir planen, produzieren und posten, auf Wunsch komplett für dich.' },
      { titel: 'Onlineshop', tag: 'Auf Anfrage', text: 'Deine Produkte online verkaufen, ohne dich in die Technik einzuarbeiten. Umfang und Preis besprechen wir im Gespräch.' },
      { titel: 'Online-Buchung', tag: 'Auf Anfrage', text: 'Deine Kunden buchen Termine selbst, auch abends und am Wochenende. Das spart dir Telefonate und Nachrichten.' },
      { titel: 'Google Ads', tag: 'Auf Anfrage', text: 'Wenn es für deinen Betrieb der sinnvollste nächste Schritt ist. Zuerst sorgen wir dafür, dass du auch ohne bezahlte Werbung gefunden wirst.' },
    ],
  },
  warum: {
    label: 'Warum Alperna',
    h2: [{ t: 'Jung, aber ' }, { t: 'bewiesen', em: true }, { t: '. Und aus der Region.' }] as Teil[],
    punkte: [
      { titel: 'Aus der Region', text: 'Wir kennen die Ostschweiz, ihre Betriebe und ihre Kundschaft. Treffen vor Ort statt endloser Calls.' },
      { titel: 'Jung, aber bewiesen', text: 'Wir sind frisch gegründet und studieren beide BWL an der OST. Deshalb ist der Preis jetzt fair. Was wir schon gebaut haben, siehst du unter Projekte.', link: { label: 'Projekte ansehen', href: '/projekte' } as Link },
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
      { id: 'andrej' as const, tag: 'Mitgründer', rolle: 'BWL an der OST', text: 'Ich schreibe die Texte, baue die Websites und filme vor Ort. Was ich dir zusage, halte ich. Wenn ein Schritt nichts bringt, sage ich es dir.' },
      { id: 'leander' as const, tag: 'Mitgründer', rolle: 'BWL an der OST', text: 'Ich plane die Inhalte und schneide die Videos. Mir ist wichtig, dass das Material nach deinem Betrieb aussieht und nicht nach Vorlage.' },
    ],
  },
  faq: {
    label: 'Häufige Fragen',
    h2: [{ t: 'Gut zu ' }, { t: 'wissen.', em: true }] as Teil[],
    weitere: { label: 'Andere Frage? Schreib uns', href: '#kontakt' } as Link,
    fragen: [
      { q: 'Seid ihr nicht zu jung?', a: 'Ja, wir sind jung und frisch gegründet. Wir studieren beide BWL an der OST und suchen aktiv Aufträge. Deshalb ist der Preis jetzt fair. Trotzdem kommen wir nicht bei null an: Unter Projekte siehst du, was wir schon umgesetzt haben, mit Zahlen.' },
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
    description: `Andrej Good und Leander Züst führen Alperna in Speicher AR: frisch gegründet, mit drei Jahren Arbeit und ${partner} Partnern.`,
  },
  label: 'Über uns',
  h1: [{ t: 'Zwei Gründer. Ein Ziel: dass du ' }, { t: 'gefunden wirst.', em: true }] as Teil[],
  sub: 'Alperna ist frisch gegründet. Die Arbeit dahinter ist es nicht.',
  kennzahlen: [
    { wert: String(partner), label: 'Partner, mit denen wir gearbeitet haben' },
    { wert: beitraege, label: 'Beiträge erstellt' },
    { wert: '3 Jahre', label: 'gemeinsame Arbeit an Social-Media-Projekten' },
  ],
  story: {
    h2: 'Wie es dazu kam',
    absaetze: [
      'Andrej und Leander haben sich im Gym kennengelernt. Aus dem gemeinsamen Training wurde der Entschluss, etwas gemeinsam aufzubauen.',
      `Ihren ersten Kunden in den USA haben sie gratis übernommen, um zu zeigen, was sie können. In ${site.ersterKunde.zeitraum} kamen ${site.ersterKunde.aufrufe} Aufrufe, ${fmt(site.ersterKunde.follower)} neue Follower und ${fmt(site.ersterKunde.umsatzUsd)} USD Umsatz für den Kunden zusammen. Das ist ein Handwerksbeleg, kein Versprechen für deinen Betrieb.`,
      'Daraus sind drei Jahre Arbeit geworden: zuerst mit internationalem Fokus, heute als Alperna GmbH in Speicher AR, für Betriebe in der Ostschweiz.',
    ],
  },
  jung: {
    h2: 'Jung, aber bewiesen',
    absaetze: [
      'Wir sind frisch gegründet und studieren beide BWL an der OST. Wir suchen aktiv Aufträge. Deshalb ist der Preis jetzt fair.',
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
