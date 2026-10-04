import raw from '@/data/projekte.json'
import testimonials from '@/data/testimonials.json'

export type Kennzahl = { wert: string; label: string }
export type Baustein = 'website' | 'google-profil' | 'social-media' | 'video' | 'event'

export type Projekt = {
  slug: string
  name: string
  art: string
  bereich: 'regional' | 'international'
  bausteine: Baustein[]
  zeitraum?: string
  anlass?: string
  kanaele: string[]
  kennzahlen: Kennzahl[]
  leistungen: string[]
  fall: string
  umsetzung: string
  kundenLinks: { label: string; url: string }[]
  logo: string | null
  fotos: string[]
  zitat?: string
}

export const projekte = raw.projekte as unknown as Projekt[]

export const BAUSTEIN_LABEL: Record<Baustein, string> = {
  website: 'Website',
  'google-profil': 'Google-Profil',
  'social-media': 'Social Media',
  video: 'Video',
  event: 'Event',
}

export function getProjekt(slug: string): Projekt | undefined {
  return projekte.find((p) => p.slug === slug)
}

export type Zitat = { projekt: string; firma: string; branche: string; text: string; fuerStartseite: boolean }
export const zitate = testimonials.zitate as Zitat[]
export const videoPartner = testimonials.videos as { projekt: string; datei: string | null }[]

export function zitatFuer(slug: string): Zitat | undefined {
  return zitate.find((z) => z.projekt === slug)
}
