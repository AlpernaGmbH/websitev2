'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { RowArrow } from '@/components/Icons'

export type ListeProjekt = {
  slug: string
  name: string
  art: string
  bausteine: string[]
  bereich: 'regional' | 'international'
  fig: { wert: string; label: string }
}

type Props = {
  projekte: ListeProjekt[]
  filter: { key: string; label: string }[]
  alleLabel: string
  internationalH2: string
  internationalText: string
}

function Zeilen({ projekte, start }: { projekte: ListeProjekt[]; start: number }) {
  return (
    <ol className="service-list">
      {projekte.map((p, i) => (
        <li key={p.slug}>
          <Link className="service" href={`/projekte/${p.slug}`}>
            <span className="service__num mono">{String(start + i + 1).padStart(2, '0')}</span>
            <div className="service__head">
              <h3 className="service__title">{p.name}</h3>
              <span className="service__tag mono">{p.art}</span>
            </div>
            <p className="service__fig">
              {p.fig.wert}
              <small>{p.fig.label}</small>
            </p>
            <RowArrow />
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
      <Zeilen projekte={regional} start={0} />
      {international.length > 0 && (
        <>
          <div className="list-sub">
            <h2>{internationalH2}</h2>
            <p>{internationalText}</p>
          </div>
          <Zeilen projekte={international} start={regional.length} />
        </>
      )}
      {sichtbar.length === 0 && <p>Dazu gibt es noch kein Projekt.</p>}
    </>
  )
}
