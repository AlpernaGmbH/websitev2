'use client'

import { useMemo, useState } from 'react'
import { ProjektKarte, type KarteProps } from '@/components/ProjektKarte'

export type ExplorerProjekt = KarteProps & { bausteine: string[]; bereich: 'regional' | 'international' }

type Props = {
  projekte: ExplorerProjekt[]
  filter: { key: string; label: string }[]
  alleLabel: string
  internationalH2: string
  internationalText: string
}

export function ProjekteExplorer({ projekte, filter, alleLabel, internationalH2, internationalText }: Props) {
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
      <div className="grid3">
        {regional.map((p) => (
          <ProjektKarte key={p.href} {...p} />
        ))}
      </div>
      {international.length > 0 && (
        <>
          <div className="section-sub">
            <h2 className="h2" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)' }}>{internationalH2}</h2>
            <p>{internationalText}</p>
          </div>
          <div className="grid3">
            {international.map((p) => (
              <ProjektKarte key={p.href} {...p} />
            ))}
          </div>
        </>
      )}
      {sichtbar.length === 0 && <p>Dazu gibt es noch kein Projekt.</p>}
    </>
  )
}
