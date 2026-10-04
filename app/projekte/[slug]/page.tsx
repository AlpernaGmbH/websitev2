import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowUpRight } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { projektePage } from '@/content/texte'
import { bild } from '@/lib/images'
import { getProjekt, projekte, zitatFuer } from '@/lib/projects'
import { breadcrumbLd, seite } from '@/lib/seo'

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
  const meta = [p.art, p.anlass, p.zeitraum, p.kanaele.length ? p.kanaele.join(', ') : null].filter(Boolean).join(' · ')

  return (
    <>
      <section className="container page-head">
        <Link className="crumb mono" href="/projekte">
          <span aria-hidden="true">←</span> {d.zurueck}
        </Link>
        <h1 className="page-title">{p.name}</h1>
        <p className="page-sub mono" style={{ color: 'var(--muted)' }}>{meta}</p>
      </section>

      <section className="container" aria-label={d.ergebnis}>
        <div className="kpis">
          {p.kennzahlen.map((k) => (
            <div key={k.label}>
              <div className="kpi__value">{k.wert}</div>
              <p className="kpi__label">{k.label}</p>
            </div>
          ))}
        </div>

        <div className="detail" style={{ marginTop: 'clamp(40px, 5vw, 72px)' }}>
          <h2 className="detail__label mono">{d.ausgangslage}</h2>
          <div className="detail__body">
            <p>{p.fall}</p>
          </div>
        </div>

        <div className="detail">
          <h2 className="detail__label mono">{d.gemacht}</h2>
          <div className="detail__body">
            <p>{p.umsetzung}</p>
          </div>
        </div>

        <div className="detail">
          <h2 className="detail__label mono">{d.leistungen}</h2>
          <div className="detail__body">
            <ul>
              {p.leistungen.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>

        {zitat && (
          <div className="detail">
            <h2 className="detail__label mono">{d.stimme}</h2>
            <div className="detail__body">
              <figure className="quote">
                <blockquote>«{zitat.text}»</blockquote>
                <figcaption className="mono">
                  {zitat.firma}, {zitat.branche}
                </figcaption>
              </figure>
            </div>
          </div>
        )}

        {p.fotos.length > 0 && (
          <div className="detail">
            <h2 className="detail__label mono">{d.einblicke}</h2>
            <div className="detail__body" style={{ gridColumn: '4 / -1', maxWidth: 'none' }}>
              <div className="gallery">
                {p.fotos.map((id) => {
                  const b = bild(id)
                  return (
                    <figure className="reveal" key={id}>
                      <Image src={b.src} alt={b.alt} width={b.width} height={b.height} sizes="(max-width: 700px) 92vw, 380px" />
                    </figure>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {p.kundenLinks.length > 0 && (
          <div className="detail">
            <h2 className="detail__label mono">{d.kunde}</h2>
            <div className="detail__body" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 28 }}>
              {p.kundenLinks.map((l) => (
                <a className="link-arrow" key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.label}
                  <ArrowUpRight />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="detail" style={{ paddingBottom: 'var(--section)' }}>
          <h2 className="detail__label mono">{d.ctaTitel}</h2>
          <div className="detail__body">
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

      <JsonLd data={breadcrumbLd([{ name: 'Startseite', pfad: '/' }, { name: 'Projekte', pfad: '/projekte' }, { name: p.name, pfad: `/projekte/${p.slug}` }])} />
    </>
  )
}
