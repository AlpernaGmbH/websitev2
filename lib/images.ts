import data from '@/data/images.json'

type Eintrag = { file: string; alt: string; w: number; h: number; group: string }
const map = data.images as Record<string, Eintrag>

export type Bild = { src: string; alt: string; width: number; height: number }

export function bild(id: string): Bild {
  const m = map[id]
  if (!m) throw new Error(`Bild fehlt in data/images.json: ${id}`)
  return { src: m.file, alt: m.alt, width: m.w, height: m.h }
}

export const LOGO_MARK: string = data.logoMark
/** Logos der Vertrauensleiste, regionale Kunden zuerst */
export const LOGOS: string[] = data.logos
/** Fotos «Hinter den Kulissen» */
export const GALERIE: string[] = data.galerie
