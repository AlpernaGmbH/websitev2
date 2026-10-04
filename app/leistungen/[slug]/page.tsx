import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Headline } from '@/components/Headline'
import { ArrowRight, RowArrow } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { ProjektKarte } from '@/components/ProjektKarte'
import { StatBalken, StatKachel, type Diagramm, type Statistik } from '@/components/Statistik'
import { leistungenSeite, type LeistungSlug } from '@/content/texte'
import statistiken from '@/data/statistiken.json'
import { listeProjekt } from '@/lib/projekt-liste'
import { projekte } from '@/lib/projects'
import { breadcrumbLd, seite } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return leistungenSeite.reihenfolge.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const L = leistungenSeite.seiten[slug as LeistungSlug]
  if (!L) return {}
  return seite(`/leistungen/${slug}`, L.meta.title, L.meta.description)
}

export default async function Leistung({ params }: Props) {
  const { slug } = await params
  const t = leistungenSeite
  const L = t.seiten[slug as LeistungSlug]
  if (!L) notFound()
  const nr = t.reihenfolge.indexOf(slug as LeistungSlug)
  const weiter = t.reihenfolge[(nr + 1) % t.reihenfolge.length]
  const W = t.seiten[weiter]
  const zahlen = (statistiken.statistiken as Statistik[]).filter((s) => s.leistung === slug)
  const diagramme = (statistiken.diagramme as Diagramm[]).filter((s) => s.leistung === slug)
  const beispiele = L.projektBaustein ? projekte.filter((p) => p.bausteine.includes(L.projektBaustein!)).slice(0, 3).map(listeProjekt) : []

  return (
    <>
      <section className="container page-head">
        <Link className="crumb mono" href="/#leistungen">
          <span aria-hidden="true">←</span> {t.zurueck}
        </Link>
        <p className="mono label">
          {t.label} 0{nr + 1}
        </p>
        <h1 className="page-title">
          <Headline parts={L.h1} />
        </h1>
        <p className="lead page-sub">{L.lead}</p>
        <p className="ls__tag mono">{L.tag}</p>
      </section>

      <section className="container ls" aria-labelledby="ls-warum">
        <h2 id="ls-warum" className="pd__label mono">
          {t.warum}
        </h2>
        <div className="ls__grid">
          <div className="ls__copy">
            {L.warum.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {(zahlen.length > 0 || diagramme.length > 0) && (
            <div className="ls__stats" role="group" aria-label={t.zahlen}>
              {diagramme.map((d) => (
                <StatBalken key={d.id} d={d} />
              ))}
              {zahlen.map((s) => (
                <StatKachel key={s.id} s={s} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container ls" aria-labelledby="ls-machen">
        <h2 id="ls-machen" className="pd__label mono">
          {t.machen}
        </h2>
        <ul className="pd__list ls__list">
          {L.machen.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </section>

      <section className="container ls" aria-labelledby="ls-projekte">
        <h2 id="ls-projekte" className="pd__label mono">
          {t.projekte}
        </h2>
        {beispiele.length > 0 ? (
          <>
            <ul className="pgrid ls__projekte">
              {beispiele.map((p, i) => (
                <li key={p.slug}>
                  <ProjektKarte p={p} nr={projekte.findIndex((x) => x.slug === p.slug) + 1} index={i} />
                </li>
              ))}
            </ul>
            <Link className="link-arrow ls__alle" href={t.alleProjekte.href}>
              {t.alleProjekte.label}
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M3 11L11 3M5 3h6v6" />
              </svg>
            </Link>
          </>
        ) : (
          <p className="ls__leer">{t.keineProjekte}</p>
        )}
      </section>

      <section className="container ls ls__cta" aria-labelledby="ls-cta">
        <h2 id="ls-cta" className="pd__label mono">
          {t.cta.titel}
        </h2>
        <p className="ls__cta-text">{t.cta.text}</p>
        <div className="detail__cta">
          <Link className="btn" href={t.cta.gespraech.href} data-track="cta_leistung">
            {t.cta.gespraech.label}
            <ArrowRight />
          </Link>
          <Link className="btn btn--ghost" href={t.cta.check.href}>
            {t.cta.check.label}
          </Link>
        </div>
      </section>

      <section className="container pnext" aria-label={t.naechste}>
        <h2 className="pd__label mono">{t.naechste}</h2>
        <Link className="service" href={`/leistungen/${weiter}`}>
          <span className="service__num mono">0{(nr + 1) % t.reihenfolge.length + 1}</span>
          <div className="service__head">
            <p className="service__title">{W.name}</p>
            <span className="service__tag mono">{W.tag}</span>
          </div>
          <RowArrow />
        </Link>
      </section>

      <JsonLd data={breadcrumbLd([{ name: 'Startseite', pfad: '/' }, { name: 'Leistungen', pfad: '/#leistungen' }, { name: L.name, pfad: `/leistungen/${slug}` }])} />
    </>
  )
}
