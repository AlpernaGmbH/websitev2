import type { ListeProjekt } from '@/components/ProjektListe'
import { bild } from '@/lib/images'
import { BAUSTEIN_LABEL, kachelKennzahl, type Projekt } from '@/lib/projects'

/** Daten für Kachel und Liste aus einem Projekt */
export function listeProjekt(p: Projekt): ListeProjekt {
  return {
    slug: p.slug,
    name: p.name,
    art: p.art,
    tag: p.bausteine.map((b) => BAUSTEIN_LABEL[b]).join(' · '),
    bausteine: p.bausteine,
    bereich: p.bereich,
    cover: p.cover ? bild(p.cover) : null,
    kpi: kachelKennzahl(p),
  }
}
