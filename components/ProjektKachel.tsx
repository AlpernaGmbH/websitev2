import Image from 'next/image'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from '@/components/Icons'
import type { Bild } from '@/lib/images'

export type KachelDaten = {
  name: string
  /** Bausteine, z. B. «Social Media · Video» */
  tag: string
  /** nur ein echtes Foto, sonst null */
  cover: Bild | null
  kpi: { wert: string; label: string }
}

type Props = KachelDaten & {
  index?: number
  /** Detailseite: grosse Fläche ohne Pfeil und ohne Kennzahl-Pille */
  gross?: boolean
  priority?: boolean
  sizes: string
}

function laenge(wert: string) {
  return wert.length <= 3 ? 'kurz' : wert.length <= 5 ? 'mittel' : 'lang'
}

/** Bildfläche eines Projekts. Mit Foto: das Foto. Ohne Foto: dunkle Fläche mit der Kennzahl. */
export function ProjektKachel({ name, tag, cover, kpi, index = 0, gross = false, priority = false, sizes }: Props) {
  const stil = { '--i': index % 6 } as CSSProperties
  return (
    <div className={`ptile__media${cover ? '' : ' ptile__media--zahl'}`} style={stil}>
      {cover ? (
        <>
          <Image src={cover.src} alt={cover.alt || name} fill sizes={sizes} priority={priority} />
          {!gross && (
            <p className="ptile__pill">
              <strong>{kpi.wert}</strong> {kpi.label}
            </p>
          )}
        </>
      ) : (
        <>
          <span className="ptile__art mono">{tag}</span>
          <p className="ptile__zahl" data-len={laenge(kpi.wert)}>
            {kpi.wert}
            <small>{kpi.label}</small>
          </p>
        </>
      )}
      {!gross && (
        <span className="ptile__go" aria-hidden="true">
          <ArrowUpRight />
        </span>
      )}
    </div>
  )
}
