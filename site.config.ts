// Eine Quelle für alle Konstanten der Website. Texte und Komponenten lesen von hier,
// nichts davon wird in Seitentexten von Hand wiederholt.

export const site = {
  name: 'Alperna',
  legalName: 'Alperna GmbH',
  claim: 'Partner für den digitalen Auftritt',
  url: 'https://www.alperna.ch',
  email: 'kontakt@alperna.ch',

  address: {
    street: 'Röhrenbrugg 7',
    zip: '9042',
    city: 'Speicher',
    canton: 'AR',
    country: 'Schweiz',
  },
  uid: 'CHE-132.724.195',
  region: ['St. Gallen', 'Appenzell', 'Rheintal'],

  // Stand 04.10.2026, vom Team bestätigt: Unternehmen, mit denen wir zusammengearbeitet haben.
  partnerAnzahl: 28,
  // Anzeige als «25’000+». Quelle: COMPANY-MASTER 8.2.
  beitraegeErstellt: 25000,
  // OFFEN: Anzahl erstellter Websites. Solange null, zeigt keine Seite diese Zahl.
  websitesErstellt: null as number | null,

  // Richtpreise für die Orientierung auf der Website. Quelle: COMPANY-MASTER 3.1, 3.5, 3.6.
  // Retainer-Preise stehen bewusst nicht auf der Website.
  preise: {
    websiteAb: 1000,
    websiteMitShooting: 2000,
    einzelbeitrag: 180,
  },
  // Quelle: Live-Site «365 Tage im Jahr erreichbar», COMPANY-MASTER 3.7 (Support via WhatsApp Business und E-Mail).
  erreichbarkeitTageProJahr: 365,
  // Erster Kunde in den USA, gratis übernommen. Quelle: COMPANY-MASTER 1.4. Nur als Handwerksbeleg mit Einordnung verwenden.
  ersterKunde: {
    aufrufe: 'über 2 Millionen',
    follower: 30000,
    umsatzUsd: 6000,
    zeitraum: 'zwei Wochen',
  },

  calendlyUrl: 'https://calendly.com/alperna/erstkontakt',
  // OFFEN: WhatsApp-Nummer im internationalen Format, z. B. '41791234567'.
  whatsapp: null as string | null,
  // Bewusst leer: Anrufe werden nicht beantwortet. Kein tel:-Link auf der Website.
  telefon: null,

  ga4Id: 'G-DH7RZM087',

  social: {
    instagram: 'https://www.instagram.com/alperna_gmbh',
    linkedin: 'https://www.linkedin.com/company/alperna/',
    tiktok: 'https://www.tiktok.com/@alperna_gmbh',
  },

  team: {
    andrej: {
      name: 'Andrej Good',
      linkedin: 'https://www.linkedin.com/in/andrej-good',
      instagram: 'https://www.instagram.com/andrej.alperna',
    },
    leander: {
      name: 'Leander Züst',
      linkedin: 'https://www.linkedin.com/in/leander-züst-3a077b271',
      instagram: 'https://www.instagram.com/leanderzuest',
    },
  },
} as const

export type Site = typeof site
