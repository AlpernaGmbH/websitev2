import type { Metadata } from 'next'
import { site } from '@/site.config'

/** Vorschau ist nicht indexierbar. Freigabe erst mit NEXT_PUBLIC_INDEXABLE=1. */
export const indexable = process.env.NEXT_PUBLIC_INDEXABLE === '1'

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url

export function absUrl(pfad: string): string {
  return `${baseUrl}${pfad === '/' ? '' : pfad}`
}

/** Canonical zeigt auf die Produktions-Domain, solange Vorschau und Live-Site getrennt laufen. */
export function seite(pfad: string, title: string, description: string, extra: Partial<Metadata> = {}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${site.url}${pfad === '/' ? '' : pfad}` },
    openGraph: { title, description, url: `${site.url}${pfad === '/' ? '' : pfad}`, siteName: site.name, locale: 'de_CH', type: 'website' },
    ...extra,
  }
}

export function organisationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#org`,
    name: site.legalName,
    url: site.url,
    logo: `${site.url}/icon.png`,
    email: site.email,
    slogan: site.claim,
    vatID: site.uid,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressRegion: site.address.canton,
      addressCountry: 'CH',
    },
    areaServed: [...site.region, 'Ostschweiz'],
    founder: [{ '@type': 'Person', name: site.team.andrej.name }, { '@type': 'Person', name: site.team.leander.name }],
    sameAs: [site.social.instagram, site.social.linkedin, site.social.tiktok],
  }
}

export function breadcrumbLd(punkte: { name: string; pfad: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: punkte.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, item: `${site.url}${p.pfad === '/' ? '' : p.pfad}` })),
  }
}

export function faqLd(fragen: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: fragen.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}
