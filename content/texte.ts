// Alle Seitentexte der Website. Entwurf 1 (04.10.2026), geprüft gegen BRAND-VOICE und GLOSSARY.
// Zahlen kommen aus site.config.ts und data/*.json. Wo eine Zahl im Text steht, muss sie dort vorkommen (scripts/check-content.mjs).
import { site } from '@/site.config'
import { chf, fmt } from '@/lib/format'

/** Überschrift mit höchstens einem Akzentwort */
export type Teil = { t: string; em?: boolean; mark?: boolean }
export type Link = { label: string; href: string }

const partner = site.partnerAnzahl
const beitraege = `${fmt(site.beitraegeErstellt)}+`
const preise = site.preise

export const home = {
  meta: {
    title: 'Digitaler Auftritt für Ostschweizer KMU | Alperna GmbH',
    description: 'Website, Google-Profil und Social Media aus einer Hand. Wir sorgen dafür, dass Ostschweizer KMU online gefunden werden und Anfragen bekommen.',
  },
  hero: {
    badge: 'Partner für den digitalen Auftritt',
    region: 'St. Gallen · Appenzell · Rheintal',
    h1: [{ t: 'Dein digitaler ' }, { t: 'Aufstieg', em: true, mark: true }, { t: ' startet hier.' }] as Teil[],
    sub: 'Website, Google-Profil, Social Media: aus einer Hand, für KMU in der Ostschweiz.',
    ctaPrimaer: { label: 'Erstgespräch vereinbaren', href: '#kontakt' } as Link,
    ctaSekundaer: { label: 'Projekte ansehen', href: '/projekte' } as Link,
    koordinaten: ['47.42° N · 9.38° E', 'Ostschweiz, CH'],
    bildunterschrift: 'Andrej Good und Leander Züst, Gründer von Alperna',
  },
  vertrauen: {
    intro: `Wir sind Andrej und Leander, Alperna GmbH in Speicher AR. Frisch gegründet, beide im BWL-Studium an der OST, und ${partner} Unternehmen, mit denen wir bereits gearbeitet haben.`,
    kennzahlen: [
      { wert: String(partner), label: 'Partner, mit denen wir gearbeitet haben' },
      { wert: '+690 %', label: 'Instagram-Aufrufe beim BC Trogen Speicher, in 3 Monaten' },
      { wert: beitraege, label: 'Beiträge erstellt' },
    ],
    logosTitel: 'Zusammengearbeitet haben wir unter anderem mit',
    logoNamen: ['Gewerbeverband AR', 'BC Trogen Speicher', 'Appenzellerland Sport', 'Gustav Kahn', 'Alex Breitenmoser', 'Klartext von 2 Kanten', 'Regina Massagen', 'LifeBoost', 'Nordlicht Wealth Management'],
  },
  problem: {
    label: 'Das Problem',
    h2: [{ t: 'Warum der Auftritt oft nicht bringt, was er ' }, { t: 'sollte', em: true }] as Teil[],
    intro: 'Viele Schweizer KMU stehen vor denselben vier Hürden.',
    karten: [
      { titel: 'Fehlende Strategie', text: 'Website, Google-Profil und Social Media laufen nebeneinander her. Zusammen führen sie niemanden zu einer Anfrage.', bild: 'VWayyyI0JBgIr8dWcrhggdW9v0' },
      { titel: 'Keine Zeit', text: 'Das Tagesgeschäft hat Vorrang. Die Website ist seit Jahren gleich, das Google-Profil unvollständig, und für Beiträge bleibt keine Zeit.', bild: 'FfK5CrGjxv3bOybGic2kWub54o' },
      { titel: 'Know-how fehlt', text: 'Was online funktioniert, ändert sich laufend. Im Team fehlt oft das Wissen, wie eine Website aufgebaut sein muss, damit man gefunden wird.', bild: 'nWVLpPcuSduOMRMJzC3nJm9PaY' },
      { titel: 'Kein Beleg', text: 'Du siehst Likes und Klicks, aber nicht, ob daraus Kunden werden. Es fehlt der einfache Beleg, was der Auftritt am Schluss bringt.', bild: 'htHkYPlkWbM5ZTSrgQnLxMks' },
    ],
  },
  bausteine: {
    label: 'Die sechs Bausteine',
    h2: [{ t: 'Sechs Bausteine für deinen digitalen ' }, { t: 'Auftritt', em: true }, { t: '.' }] as Teil[],
    intro: 'Wir starten meist mit der Website. Danach schlagen wir dir immer nur den nächsten Baustein vor.',
    liste: [
      { titel: 'Website', tag: `Einstieg, ab ca. ${chf(preise.websiteAb)}`, text: `Eine Website, die auf dem Handy überzeugt und Anfragen bringt. Mit eigenem Shooting ca. ${chf(preise.websiteMitShooting)}.` },
      { titel: 'Google-Unternehmensprofil', tag: '', text: 'Wer nach deiner Branche in der Region sucht, findet dich bei Google und auf Google Maps. Wir richten dein Profil ein oder bringen es in Ordnung. Umgesetzt haben wir das unter anderem für Regina Massagen.' },
      { titel: 'Social Media', tag: `Einzelner Beitrag ab ${chf(preise.einzelbeitrag)}`, text: 'Beiträge und Videos, die zu deinen Kunden passen. Wir planen, produzieren und posten, auf Wunsch komplett für dich.' },
      { titel: 'Onlineshop', tag: 'Auf Anfrage', text: 'Deine Produkte online verkaufen, ohne dich in die Technik einzuarbeiten. Umfang und Preis besprechen wir im Gespräch.' },
      { titel: 'Online-Buchung', tag: 'Auf Anfrage', text: 'Deine Kunden buchen Termine selbst, auch abends und am Wochenende. Das spart dir Telefonate und Nachrichten.' },
      { titel: 'Google Ads', tag: 'Auf Anfrage', text: 'Auf Anfrage, wenn es für deinen Betrieb der sinnvollste nächste Schritt ist. Zuerst sorgen wir dafür, dass du auch ohne bezahlte Werbung gefunden wirst.' },
    ],
  },
  projekte: {
    label: 'Projekte',
    h2: [{ t: 'Das haben wir bereits ' }, { t: 'umgesetzt', em: true }, { t: '.' }] as Teil[],
    intro: 'Sechs Beispiele, jeweils mit Ausgangslage und Zahl.',
    link: { label: 'Alle Projekte', href: '/projekte' } as Link,
    karten: [
      { slug: 'bc-trogen-speicher', sub: 'Sportverein, Badminton · Social Media und Video', fall: 'Turniere und Trainings blieben intern. Ausserhalb der Halle sah niemand das Vereinsleben.', zahl: '+690 % Instagram-Aufrufe in 3 Monaten', einordnung: 'Wir haben an Turnieren gedreht, 21 Beiträge produziert und das Posting komplett übernommen.' },
      { slug: 'regina-massagen', sub: 'Massagepraxis · Website, Shooting und Google-Profil', fall: 'Neue Kundinnen kamen vor allem über Empfehlung. Online war die Praxis kaum greifbar.', zahl: 'Rund 12 Kontakt-Klicks in den ersten sechs Wochen', einordnung: 'Dazu über 500 Bilder und 20 Video-Assets, die Regina selbst einsetzt.' },
      { slug: 'gustav-kahn', sub: 'Restaurant in Romanshorn · Video', fall: 'Die Lage am See ist das Argument des Restaurants. Auf Social Media war davon nichts zu sehen.', zahl: '3 Reels an 1 Drehtag', einordnung: 'Für den Betrieb blieb es bei einem Termin.' },
      { slug: 'gewerbeverband-ar', sub: 'Wirtschaftsverband · Eventdokumentation', fall: 'Von der Sommerkonferenz gab es weder Video noch Bilder.', zahl: '1 Recap-Video und 40 Fotos', einordnung: 'Das Video war wenige Tage nach dem Anlass fertig.' },
      { slug: 'lifeboost', sub: 'Life-Coaching · Website und Fotoshooting', fall: 'Die Website war lange im Einsatz und passte nicht mehr zum Anspruch von LifeBoost.', zahl: 'Relaunch in 2 Wochen, ohne Ausfall', einordnung: 'Dazu 150 Fotos und über 30 Video-Assets für Instagram.' },
      { slug: 'alex-breitenmoser', sub: 'Vertriebs-Coaching · Strategie, Website, Social Media', fall: 'Gutes Coaching, aber ein Auftritt ohne roten Faden und ohne Website.', zahl: '519’000 Aufrufe, ein Video allein mit 303’000', einordnung: 'Die Reels füllen seine Nachrichten mit Anfragen.' },
    ],
  },
  stimmen: {
    label: 'Stimmen',
    h2: [{ t: 'Das sagen unsere ' }, { t: 'Partner', em: true }, { t: '.' }] as Teil[],
    intro: 'Partner in ihren eigenen Worten.',
    introMitVideo: 'Partner im Video und in ihren eigenen Worten.',
  },
  ablauf: {
    label: 'Ablauf',
    h2: [{ t: 'In vier Etappen zum ' }, { t: 'Gipfel', em: true }, { t: '.' }] as Teil[],
    intro: 'Vom ersten Gespräch bis zu einem Auftritt, der läuft. Du weisst in jedem Schritt, was als Nächstes kommt.',
    cta: { label: 'Erstgespräch vereinbaren', href: '#kontakt' } as Link,
    etappen: [
      { titel: 'Kennenlernen', text: 'Ein kostenloses Erstgespräch, 30 Minuten, bei dir im Betrieb oder per Video. Wir hören zu und prüfen, ob wir zusammenpassen.' },
      { titel: 'Vorschlag', text: 'Wir schauen uns deinen heutigen Auftritt an und schlagen dir den nächsten sinnvollen Baustein vor, mit klarem Preis.' },
      { titel: 'Umsetzung', text: 'Wir setzen den Baustein um und halten dich mit kurzen Updates auf dem Laufenden. Du siehst, woran wir arbeiten und warum.' },
      { titel: 'Betreuung', text: `Auf Wunsch betreuen wir deinen Auftritt weiter: Hosting, Anpassungen, Beiträge. Du erreichst uns per WhatsApp oder E-Mail, ${site.erreichbarkeitTageProJahr} Tage im Jahr.` },
    ],
  },
  warum: {
    label: 'Warum Alperna',
    h2: [{ t: 'Jung, aber ' }, { t: 'bewiesen', em: true }, { t: '. Und aus der Region.' }] as Teil[],
    punkte: [
      { titel: 'Aus der Region', text: 'Wir sitzen in Speicher AR und kommen bei dir vorbei. Treffen vor Ort statt endloser Calls.' },
      { titel: 'Jung, aber bewiesen', text: 'Wir sind frisch gegründet und studieren beide BWL an der OST. Deshalb ist der Preis jetzt fair. Was wir schon gebaut haben, siehst du unter Projekte.' },
      { titel: 'Fair und flexibel', text: 'Keine langen Laufzeiten. Wir fangen klein an, meist mit der Website. Der nächste Baustein kommt erst, wenn er dir etwas bringt.' },
    ],
  },
  team: {
    label: 'Team',
    h2: [{ t: 'Wer bei dir am ' }, { t: 'Tisch', em: true }, { t: ' sitzt.' }] as Teil[],
    karten: [
      { id: 'andrej' as const, rolle: 'Mitgründer', text: 'Ich schreibe die Texte, baue die Websites und filme vor Ort. Was ich dir zusage, halte ich. Wenn ein Schritt nichts bringt, sage ich es dir.' },
      { id: 'leander' as const, rolle: 'Mitgründer', text: 'Ich plane die Inhalte und schneide die Videos. Mir ist wichtig, dass das Material nach deinem Betrieb aussieht und nicht nach Vorlage.' },
    ],
  },
  blog: {
    label: 'Blog',
    h2: [{ t: 'Praxiswissen für den digitalen ' }, { t: 'Auftritt', em: true }] as Teil[],
    intro: 'Konkrete Anleitungen zu Website, Google-Profil und Social Media, aus der täglichen Arbeit.',
    link: { label: 'Alle Beiträge', href: '/blog' } as Link,
  },
  faq: {
    label: 'Häufige Fragen',
    h2: [{ t: 'Gut zu ' }, { t: 'wissen', em: true }, { t: '.' }] as Teil[],
    weitere: { label: 'Andere Frage? Schreib uns', href: '#kontakt' } as Link,
    fragen: [
      { q: 'Seid ihr nicht zu jung?', a: 'Ja, wir sind jung und frisch gegründet. Wir studieren beide BWL an der OST und suchen aktiv Aufträge. Deshalb ist der Preis jetzt fair. Trotzdem kommen wir nicht bei null an: Unter Projekte siehst du, was wir schon umgesetzt haben, mit Zahlen.' },
      { q: 'Wie lange bin ich gebunden?', a: 'Wir arbeiten ohne lange Vertragslaufzeiten. Eine Website ist ein einmaliger Auftrag. Für Hosting und laufende Betreuung besprechen wir die Konditionen transparent im Erstgespräch.' },
      { q: 'Was kostet der Einstieg?', a: `Eine Website kostet ab ca. ${chf(preise.websiteAb)}, mit eigenem Shooting ca. ${chf(preise.websiteMitShooting)}. Ein einzelner Social-Media-Beitrag kostet ${chf(preise.einzelbeitrag)}. Alles Weitere besprechen wir nach dem Erstgespräch, damit du nur bezahlst, was dein Betrieb braucht.` },
      { q: 'Bringt das in unserer Region etwas?', a: 'Wir haben es in der Region schon umgesetzt. Der BC Trogen Speicher hat in 3 Monaten 690 % mehr Instagram-Aufrufe erzielt, die Website der Massagepraxis Regina brachte rund 12 Kontakt-Klicks in den ersten sechs Wochen. Ob es bei dir etwas bringt, klären wir im Erstgespräch. Das kostet nichts.' },
      { q: 'Versteht ihr unser Geschäft?', a: 'Wir fragen zuerst, bevor wir etwas vorschlagen. Im Erstgespräch erzählst du uns von deinem Betrieb, wir schauen uns deinen Auftritt an und sagen dir offen, was wir sehen. Erfahrung haben wir unter anderem mit einem Restaurant, einer Massagepraxis, einem Sportverein, Coaching und einem Gewerbeverband.' },
      { q: 'Behalte ich die Kontrolle?', a: 'Du weisst bei uns immer, was wir tun und warum. Du bekommst kurze Updates, und das Material, das wir für dich produzieren, kannst du selbst weiterverwenden.' },
    ],
  },
  kontakt: {
    label: 'Kontakt',
    h2: [{ t: 'Erzähl uns kurz von deinem ' }, { t: 'Betrieb', em: true }, { t: '.' }] as Teil[],
    sub: 'Wir melden uns innert zwei Arbeitstagen für ein kostenloses Erstgespräch. 30 Minuten, unverbindlich.',
  },
}

export const ueberUns = {
  meta: {
    title: 'Über Alperna | Andrej Good und Leander Züst, Speicher AR',
    description: `Andrej Good und Leander Züst führen Alperna in Speicher AR: frisch gegründet, mit drei Jahren Arbeit und ${partner} Partnern.`,
  },
  h1: [{ t: 'Zwei Gründer. Ein Ziel: dass du ' }, { t: 'gefunden', em: true }, { t: ' wirst.' }] as Teil[],
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
  team: { h2: 'Die Gründer' },
  kulissen: { h2: 'So entsteht dein Auftritt.', sub: 'Einblicke in unsere Arbeit vor Ort bei Partnern.' },
  abschluss: { h2: 'Lernen wir uns kennen.', sub: 'Ein Gespräch, 30 Minuten, unverbindlich. Danach weisst du, woran du bist.', cta: { label: 'Erstgespräch vereinbaren', href: '/kontakt' } as Link },
}

export const kontakt = {
  meta: {
    title: 'Kontakt | Alperna GmbH, Speicher AR',
    description: 'Schreib uns kurz von deinem Betrieb. Wir melden uns innert zwei Arbeitstagen für ein kostenloses Erstgespräch.',
  },
  h1: [{ t: 'Erzähl uns kurz von deinem ' }, { t: 'Betrieb', em: true }, { t: '.' }] as Teil[],
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
    termin: { label: 'Termin direkt buchen', text: 'Lieber direkt einen Termin? Erstgespräch buchen' },
    whatsapp: { label: 'WhatsApp', text: 'WhatsApp-Nachricht senden', hinweis: 'Anrufe nehmen wir leider nicht entgegen. Auf WhatsApp und per E-Mail antworten wir.' },
    adresse: { label: 'Adresse' },
    mail: { label: 'E-Mail' },
  },
}

export const projektePage = {
  meta: {
    title: 'Projekte und Referenzen | Alperna GmbH, Ostschweiz',
    description: 'Websites, Videos und Social Media für Betriebe, Vereine und Verbände aus der Ostschweiz. Mit Ausgangslage und Zahlen.',
  },
  h1: 'Projekte',
  sub: 'Jeder Betrieb ist anders. Hier siehst du, was wir umgesetzt haben, mit Ausgangslage und Zahlen.',
  filterAlle: 'Alle',
  international: {
    h2: 'Handwerksbeleg international',
    einordnung: 'Diese Fälle stammen aus der Zeit vor unserem Fokus auf die Ostschweiz und zeigen, was wir handwerklich können, nicht was dich erwartet.',
  },
  detail: {
    zurueck: 'Alle Projekte',
    ausgangslage: 'Ausgangslage',
    gemacht: 'Was wir gemacht haben',
    ergebnis: 'Ergebnis',
    leistungen: 'Leistungen',
    einblicke: 'Einblicke',
    kunde: 'Mehr über den Kunden',
    cta: { label: 'Ähnliches Projekt besprechen', href: '/kontakt' } as Link,
    ctaTitel: 'Ähnliches Projekt?',
    ctaText: 'Erzähl uns kurz von deinem Betrieb. Wir melden uns innert zwei Arbeitstagen.',
  },
}

export const blogPage = {
  meta: {
    title: 'Praxiswissen für den digitalen Auftritt | Alperna Blog',
    description: 'Konkrete Anleitungen zu Website, Google-Profil und Social Media für KMU in der Ostschweiz, aus der täglichen Arbeit von Alperna.',
  },
  h1: [{ t: 'Praxiswissen für den digitalen ' }, { t: 'Auftritt', em: true }] as Teil[],
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
    { label: 'Über uns', href: '/ueber-uns' },
    { label: 'Projekte', href: '/projekte' },
    { label: 'Blog', href: '/blog' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  ctaHeader: { label: 'Erstgespräch', href: '/kontakt' } as Link,
  skip: 'Zum Inhalt springen',
  menue: 'Menü',
  footer: {
    abschlussH2: 'Der nächste Schritt beginnt mit einem Gespräch.',
    abschlussText: '30 Minuten, unverbindlich. Danach weisst du, woran du bist.',
    abschlussCta: { label: 'Erstgespräch vereinbaren', href: '/kontakt' } as Link,
    seiten: 'Seiten',
    kontakt: 'Kontakt',
    social: 'Social',
    rechtliches: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
    ],
  },
  fehlerseite: {
    h1: 'Diese Seite gibt es nicht.',
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
