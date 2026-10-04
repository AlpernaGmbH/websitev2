import Image from 'next/image'
import Link from 'next/link'
import type { Bild } from '@/lib/images'

export type KarteProps = {
  href: string
  name: string
  meta: string
  fall: string
  zahl: string
  einordnung?: string
  cover: Bild | null
  logo: Bild | null
  sizes?: string
}

export function ProjektKarte({ href, name, meta, fall, zahl, einordnung, cover, logo, sizes }: KarteProps) {
  return (
    <Link className="pcard" href={href}>
      <div className="pcard__media">
        {cover ? (
          <Image className="cover" src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes={sizes ?? '(max-width: 700px) 100vw, 400px'} />
        ) : logo ? (
          <Image className="logo" src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} sizes="200px" />
        ) : null}
      </div>
      <div className="pcard__body">
        <p className="pcard__meta mono">{meta}</p>
        <h3>{name}</h3>
        <p className="pcard__fall">{fall}</p>
        <p className="pcard__zahl">{zahl}</p>
        {einordnung && <p className="pcard__einordnung">{einordnung}</p>}
      </div>
    </Link>
  )
}
