'use client'

import { useMemo, useState } from 'react'
import type { KachelDaten } from '@/components/ProjektKachel'
import { ProjektKarte } from '@/components/ProjektKarte'

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

function Raster({ projekte, start, ebene }: { projekte: ListeProjekt[]; start: number; ebene: 'h2' | 'h3' }) {
  return (
    <ol className="pgrid">
      {projekte.map((p, i) => (
        <li key={p.slug}>
          <ProjektKarte p={p} nr={start + i + 1} index={start + i} ebene={ebene} />
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
      <Raster projekte={regional} start={0} ebene="h2" />
      {international.length > 0 && (
        <>
          <div className="list-sub">
            <h2>{internationalH2}</h2>
            <p>{internationalText}</p>
          </div>
          <Raster projekte={international} start={regional.length} ebene="h3" />
        </>
      )}
      {sichtbar.length === 0 && <p>Dazu gibt es noch kein Projekt.</p>}
    </>
  )
}
