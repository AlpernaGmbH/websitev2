import Image from 'next/image'
import Link from 'next/link'
import { Headline } from '@/components/Headline'
import { ArrowUpRight } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { TeamSection } from '@/components/TeamSection'
import { home, ueberUns } from '@/content/texte'
import { bild, GALERIE } from '@/lib/images'
import { breadcrumbLd, seite } from '@/lib/seo'

export const metadata = seite('/ueber-uns', ueberUns.meta.title, ueberUns.meta.description)

export default function UeberUns() {
  const u = ueberUns
  return (
    <>
      <section className="container page-head">
        <p className="mono label">{u.label}</p>
        <h1 className="page-title">
          <Headline parts={u.h1} />
        </h1>
        <p className="lead page-sub">{u.sub}</p>
      </section>

      <section className="container" aria-label="Kennzahlen">
        <div className="kpis">
          {u.kennzahlen.map((k) => (
            <div key={k.label}>
              <div className="kpi__value">{k.wert}</div>
              <p className="kpi__label">{k.label}</p>
            </div>
          ))}
        </div>
        <div className="detail" style={{ marginTop: 'clamp(40px, 5vw, 72px)' }}>
          <h2 className="detail__label mono">{u.story.h2}</h2>
          <div className="detail__body">
            {u.story.absaetze.map((a) => (
              <p key={a}>{a}</p>
            ))}
          </div>
        </div>
        <div className="detail">
          <h2 className="detail__label mono">{u.jung.h2}</h2>
          <div className="detail__body">
            {u.jung.absaetze.map((a) => (
              <p key={a}>{a}</p>
            ))}
            <p>
              <Link className="link-arrow" href={u.jung.link.href}>
                {u.jung.link.label}
                <ArrowUpRight />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="container services" aria-labelledby="kulissen-h" style={{ paddingTop: 'clamp(40px, 5vw, 72px)' }}>
        <div className="section-head">
          <p className="section-head__label mono label">{u.kulissen.label}</p>
          <h2 id="kulissen-h" className="section-head__title h2">
            <Headline parts={u.kulissen.h2} />
          </h2>
          <p className="section-head__aside">{u.kulissen.aside}</p>
        </div>
        <div className="gallery gallery--kulissen">
          {GALERIE.map((id) => {
            const b = bild(id)
            return (
              <figure className="reveal" key={id}>
                <Image src={b.src} alt={b.alt} width={b.width} height={b.height} sizes="(max-width: 700px) 92vw, 420px" />
              </figure>
            )
          })}
        </div>
      </section>

      <div style={{ background: 'var(--night)', borderRadius: 'clamp(16px, 2vw, 28px) clamp(16px, 2vw, 28px) 0 0' }}>
        <div style={{ paddingTop: 'var(--section)' }}>
          <TeamSection label={u.team.label} h2={u.team.h2} karten={home.team.karten} />
        </div>
      </div>

      <JsonLd data={breadcrumbLd([{ name: 'Startseite', pfad: '/' }, { name: 'Über uns', pfad: '/ueber-uns' }])} />
    </>
  )
}
