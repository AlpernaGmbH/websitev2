import raw from '@/data/videos.json'

export type Video = {
  id: string
  projekt: string | null
  art: 'stimme' | 'projekt' | 'intro'
  datei: string
  poster: string
  breite: number
  hoehe: number
  dauer: number
  /** leer, bis das Video im Blob-Speicher liegt */
  url: string | null
}

export const videos = raw.videos as Video[]

/** Nur Videos, die schon hochgeladen sind. Ohne url zeigt die Seite nichts an. */
export function videosFuer(slug: string, art: Video['art']): Video[] {
  return videos.filter((v) => v.projekt === slug && v.art === art && v.url)
}
