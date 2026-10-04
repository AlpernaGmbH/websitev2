'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ProjektKachel, type KachelDaten } from '@/components/ProjektKachel'

export type ListeProjekt = KachelDaten & {
  slug: string
  art: string
  bausteine: string[]
  bereich: 'regional' | 'international'
}

type Props = {
  projekte: ListeProjekt[]
  filter: { key: string; label: string }[]
  alleLabel: string
  internationalH2: string
  internationalText: string
}

function Raster({ projekte, start }: { projekte: ListeProjekt[]; start: number }) {
  return (
    <ol className="pgrid">
      {projekte.map((p, i) => (
        <li key={p.slug}>
          <Link className="ptile" href={`/projekte/${p.slug}`}>
            <ProjektKachel name={p.name} tag={p.tag} cover={p.cover} kpi={p.kpi} index={start + i} sizes="(max-width: 640px) 92vw, (max-width: 1000px) 46vw, 31vw" />
            <div className="ptile__meta">
              <span className="ptile__num mono">{String(start + i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="ptile__name">{p.name}</h3>
                <p className="ptile__tags mono">{p.art}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  )
}

export function ProjektListe({ projekte, filter, alleLabel, internationalH2, internationalText }: Props) {
  const [aktiv, setAktiv] = useState('alle')
  const sichtbar = useMemo(() => projekte.filter((p) => aktiv === 'alle' || p.bausteine.includes(aktiv)), [projekte, aktiv])
  const regional = sichtbar.filter((p) => p.bereich === 'regional')
  const international = sichtbar.filter((p) => p.bereich === 'international')
  return (
    <>
      <div className="filters" role="group" aria-label="Filter nach Baustein">
        {[{ key: 'alle', label: alleLabel }, ...filter].map((f) => (
          <button key={f.key} type="button" className="chip" aria-pressed={aktiv === f.key} onClick={() => setAktiv(f.key)}>
            {f.label}
          </button>
        ))}
      </div>
      <Raster projekte={regional} start={0} />
      {international.length > 0 && (
        <>
          <div className="list-sub">
            <h2>{internationalH2}</h2>
            <p>{internationalText}</p>
          </div>
          <Raster projekte={international} start={regional.length} />
        </>
      )}
      {sichtbar.length === 0 && <p>Dazu gibt es noch kein Projekt.</p>}
    </>
  )
}
