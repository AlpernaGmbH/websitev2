import Link from 'next/link'
import type { ListeProjekt } from '@/components/ProjektListe'
import { ProjektKachel } from '@/components/ProjektKachel'

/** Kachel mit Name und Art, verlinkt auf die Projektseite */
export function ProjektKarte({ p, nr, index, ebene = 'h3' }: { p: ListeProjekt; nr: number; index: number; ebene?: 'h2' | 'h3' }) {
  const Titel = ebene
  return (
    <Link className="ptile" href={`/projekte/${p.slug}`}>
      <ProjektKachel name={p.name} tag={p.tag} cover={p.cover} kpi={p.kpi} index={index} sizes="(max-width: 640px) 46vw, (max-width: 1000px) 46vw, 31vw" />
      <div className="ptile__meta">
        <span className="ptile__num mono">{String(nr).padStart(2, '0')}</span>
        <div>
          <Titel className="ptile__name">{p.name}</Titel>
          <p className="ptile__tags mono">{p.art}</p>
        </div>
      </div>
    </Link>
  )
}
