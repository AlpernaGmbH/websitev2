export type CheckItem = { ok: boolean; label: string; detail: string }
export type CheckKategorie = {
  id: string
  title: string
  weight: number
  score: number
  items: CheckItem[]
  hint?: string
  note?: string
  verified?: boolean
  relevance?: string
  selfReported?: boolean
}
export type CheckErgebnis = {
  company: string
  city?: string
  industryLabel: string
  url: string
  score: number
  categories: CheckKategorie[]
}

/** Welche Kategorie des Checks zu welchem Baustein gehört */
export const BAUSTEIN_FUER_KATEGORIE: Record<string, { slug: string; titel: string }> = {
  seo: { slug: 'website', titel: 'Website' },
  gbp: { slug: 'google-profil', titel: 'Google-Profil' },
  social: { slug: 'social-media', titel: 'Social Media' },
  shop: { slug: 'onlineshop', titel: 'Onlineshop' },
  booking: { slug: 'online-buchung', titel: 'Online-Buchung' },
  sea: { slug: 'google-ads', titel: 'Google Ads' },
}

const UNWICHTIG = ['tief', 'niedrig', 'keine', 'gering']

/**
 * Genau ein Vorschlag, wie bei der Beratung: der Baustein mit der grössten gewichteten Lücke.
 * Google Ads erst, wenn alle anderen Bausteine solide stehen. Ohne spürbare Lücke: kein Vorschlag.
 */
export function naechsterBaustein(e: CheckErgebnis): { slug: string; titel: string; kategorie: string } | null {
  const kandidaten = e.categories.filter((k) => BAUSTEIN_FUER_KATEGORIE[k.id] && k.weight > 0 && !UNWICHTIG.includes((k.relevance ?? '').toLowerCase()))
  const ohneAds = kandidaten.filter((k) => k.id !== 'sea')
  const ads = kandidaten.find((k) => k.id === 'sea')
  const pool = ads && ohneAds.every((k) => k.score >= 0.6) ? kandidaten : ohneAds
  const luecke = (k: CheckKategorie) => k.weight * (1 - k.score)
  const best = [...pool].sort((a, b) => luecke(b) - luecke(a))[0]
  if (!best || luecke(best) < 2) return null
  return { ...BAUSTEIN_FUER_KATEGORIE[best.id], kategorie: best.id }
}
