import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { CSSProperties } from 'react'
import { ArrowRight, ArrowUpRight, RowArrow } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { ProjektKachel } from '@/components/ProjektKachel'
import { VideoPlayer } from '@/components/VideoPlayer'
import { projektePage } from '@/content/texte'
import { bild } from '@/lib/images'
import { BAUSTEIN_LABEL, getProjekt, kachelKennzahl, naechstes, projekte, zitatFuer } from '@/lib/projects'
import { breadcrumbLd, seite } from '@/lib/seo'
import { videosFuer } from '@/lib/videos'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return projekte.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = getProjekt(slug)
  if (!p) return {}
  const zahl = p.kennzahlen[0] ? `${p.kennzahlen[0].wert} ${p.kennzahlen[0].label}` : ''
  const titel = `${p.name}: ${zahl} | Alperna`
  const beschr = `${p.art}. ${p.fall}`
  return seite(`/projekte/${slug}`, titel.length > 70 ? `${p.name} | Alperna` : titel, beschr.length > 155 ? `${p.art}. ${p.fall.split('. ')[0]}.` : beschr)
}

export default async function ProjektDetail({ params }: Props) {
  const { slug } = await params
  const p = getProjekt(slug)
  if (!p) notFound()
  const d = projektePage.detail
  const zitat = zitatFuer(p.slug)
  const weiter = naechstes(p.slug)
  const stimme = videosFuer(p.slug, 'stimme')[0]
  const projektVideos = videosFuer(p.slug, 'projekt')
  const quer = projektVideos[0] ? projektVideos[0].breite > projektVideos[0].hoehe : false
  const meta = [p.art, p.anlass, p.zeitraum, p.kanaele.length ? p.kanaele.join(', ') : null].filter(Boolean).join(' · ')
  const spalten = p.fotos.length <= 3 ? 3 : p.fotos.length <= 5 ? p.fotos.length : 3
  const nr = (s: string) => String(projekte.findIndex((x) => x.slug === s) + 1).padStart(2, '0')

  return (
    <>
      <section className="container page-head">
        <Link className="crumb mono" href="/projekte">
          <span aria-hidden="true">←</span> {d.zurueck}
        </Link>
        <h1 className="page-title">{p.name}</h1>
        <p className="page-sub mono" style={{ color: 'var(--muted)' }}>{meta}</p>
      </section>

      <section className="container pd" aria-label={d.ergebnis}>
        <div className="pd__media">
          <ProjektKachel
            name={p.name}
            tag={p.bausteine.map((b) => BAUSTEIN_LABEL[b]).join(' · ')}
            cover={p.cover ? bild(p.cover) : null}
            kpi={kachelKennzahl(p)}
            index={projekte.findIndex((x) => x.slug === p.slug)}
            gross
            priority
            sizes="(max-width: 860px) 92vw, 34vw"
          />
        </div>

        <div className="pd__main">
          <div className="kpis">
            {p.kennzahlen.map((k) => (
              <div key={k.label}>
                <div className="kpi__value">{k.wert}</div>
                <p className="kpi__label">{k.label}</p>
              </div>
            ))}
          </div>

          <div className="pd__sec">
            <h2 className="pd__label mono">{d.ausgangslage}</h2>
            <p>{p.fall}</p>
          </div>

          <div className="pd__sec">
            <h2 className="pd__label mono">{d.gemacht}</h2>
            <p>{p.umsetzung}</p>
          </div>

          <div className="pd__sec">
            <h2 className="pd__label mono">{d.leistungen}</h2>
            <ul className="pd__list">
              {p.leistungen.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>

          {(zitat || stimme) && (
            <div className="pd__sec">
              <h2 className="pd__label mono">{d.stimme}</h2>
              <div className={stimme && zitat ? 'pd__stimme' : undefined}>
                {zitat && (
                  <figure className="quote">
                    <blockquote>«{zitat.text}»</blockquote>
                    <figcaption className="mono">
                      {zitat.firma}, {zitat.branche}
                    </figcaption>
                  </figure>
                )}
                {stimme && <VideoPlayer video={stimme} titel={`${p.name}: Stimme des Kunden`} />}
              </div>
            </div>
          )}

          {p.kundenLinks.length > 0 && (
            <div className="pd__sec">
              <h2 className="pd__label mono">{d.kunde}</h2>
              <div className="pd__links">
                {p.kundenLinks.map((l) => (
                  <a className="link-arrow" key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
                    {l.label}
                    <ArrowUpRight />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="pd__sec">
            <h2 className="pd__label mono">{d.ctaTitel}</h2>
            <p>{d.ctaText}</p>
            <div className="detail__cta">
              <Link className="btn" href={d.cta.href} data-track="cta_projekt">
                {d.cta.label}
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {p.fotos.length > 0 && (
        <section className="container pd__wide" aria-label={d.einblicke}>
          <h2 className="pd__label mono">{d.einblicke}</h2>
          <div className="shots" style={{ '--n': spalten } as CSSProperties}>
            {p.fotos.map((id) => {
              const b = bild(id)
              return (
                <figure className="reveal" key={id}>
                  <Image src={b.src} alt={b.alt} width={b.width} height={b.height} sizes="(max-width: 700px) 46vw, 31vw" />
                </figure>
              )
            })}
          </div>
        </section>
      )}

      {projektVideos.length > 0 && (
        <section className="container pd__wide" aria-label={d.videos}>
          <h2 className="pd__label mono">{d.videos}</h2>
          <div className={quer ? 'vgrid vgrid--quer' : 'vgrid'}>
            {projektVideos.map((v, i) => (
              <VideoPlayer key={v.id} video={v} titel={`${p.name}, Video ${i + 1}`} />
            ))}
          </div>
        </section>
      )}

      {p.belege.length > 0 && (
        <section className="container pd__wide" aria-label={d.belege}>
          <h2 className="pd__label mono">{d.belege}</h2>
          <div className="shots shots--belege" style={{ '--n': Math.min(p.belege.length, 3), maxWidth: p.belege.length === 1 ? 760 : undefined } as CSSProperties}>
            {p.belege.map((id) => {
              const b = bild(id)
              return (
                <figure className="reveal" key={id}>
                  <Image src={b.src} alt={b.alt} width={b.width} height={b.height} sizes="(max-width: 700px) 46vw, 31vw" />
                </figure>
              )
            })}
          </div>
        </section>
      )}

      <section className="container pnext" aria-label={d.naechstes}>
        <h2 className="pd__label mono">{d.naechstes}</h2>
        <Link className="service" href={`/projekte/${weiter.slug}`}>
          <span className="service__num mono">{nr(weiter.slug)}</span>
          <div className="service__head">
            <p className="service__title">{weiter.name}</p>
            <span className="service__tag mono">{weiter.art}</span>
          </div>
          <p className="service__fig">
            {kachelKennzahl(weiter).wert}
            <small>{kachelKennzahl(weiter).label}</small>
          </p>
          <RowArrow />
        </Link>
      </section>

      <JsonLd data={breadcrumbLd([{ name: 'Startseite', pfad: '/' }, { name: 'Projekte', pfad: '/projekte' }, { name: p.name, pfad: `/projekte/${p.slug}` }])} />
    </>
  )
}
