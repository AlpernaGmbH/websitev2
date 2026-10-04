import Image from 'next/image'
import Link from 'next/link'
import { Headline } from '@/components/Headline'
import { ArrowRight, ArrowUpRight } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { ueberUns } from '@/content/texte'
import { bild, GALERIE } from '@/lib/images'
import { breadcrumbLd, seite } from '@/lib/seo'
import { site } from '@/site.config'

export const metadata = seite('/ueber-uns', ueberUns.meta.title, ueberUns.meta.description)

export default function UeberUns() {
  const u = ueberUns
  const andrej = bild('iwaqIdZLeZXZJMqidnD3bSMSHY')
  const leander = bild('hWvlDZcWO7blpdESrjYFvjl9mIM')
  const karten = [
    { id: 'andrej' as const, foto: andrej, rolle: 'Mitgründer', text: 'Ich schreibe die Texte, baue die Websites und filme vor Ort. Auch die Technik hinter dem Auftritt liegt bei mir. Was ich dir zusage, halte ich. Wenn ein Schritt nichts bringt, sage ich es dir.' },
    { id: 'leander' as const, foto: leander, rolle: 'Mitgründer', text: 'Ich plane die Inhalte und schneide die Videos. Mir ist wichtig, dass das Material nach deinem Betrieb aussieht und nicht nach Vorlage.' },
  ]
  return (
    <>
      <section className="container page-head">
        <p className="mono label" style={{ marginBottom: 24 }}>Über uns</p>
        <h1 className="page-title">
          <Headline parts={u.h1} />
        </h1>
        <p className="lead" style={{ marginTop: 28 }}>{u.sub}</p>
      </section>

      <section className="container" aria-label="Kennzahlen">
        <div className="stats" style={{ borderBottom: '1px solid var(--line-strong)', paddingBottom: 'clamp(32px, 4vw, 56px)' }}>
          {u.kennzahlen.map((k) => (
            <div className="stat" key={k.label}>
              <div className="stat__value">{k.wert}</div>
              <p className="stat__label">{k.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="detail" style={{ borderTop: 0, paddingTop: 0 }}>
          <h2 className="detail__label mono">{u.story.h2}</h2>
          <div className="detail__body" style={{ fontSize: 19 }}>
            {u.story.absaetze.map((a) => (
              <p key={a}>{a}</p>
            ))}
          </div>
        </div>
        <div className="detail">
          <h2 className="detail__label mono">{u.jung.h2}</h2>
          <div className="detail__body" style={{ fontSize: 19 }}>
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

      <section className="container section section--tight-top" aria-labelledby="team-h">
        <div className="section-head">
          <p className="section-head__label mono label">Team</p>
          <h2 id="team-h" className="section-head__title h2">{u.team.h2}</h2>
        </div>
        <div className="team">
          {karten.map((k) => {
            const person = site.team[k.id]
            return (
              <article className="member" key={k.id}>
                <div className="member__photo">
                  <Image src={k.foto.src} alt={k.foto.alt} width={k.foto.width} height={k.foto.height} sizes="(max-width: 700px) 90vw, 440px" />
                </div>
                <div className="member__body">
                  <h3>{person.name}</h3>
                  <span className="member__role mono">{k.rolle}</span>
                  <p>{k.text}</p>
                  <div className="member__links">
                    <a className="link-arrow" href={person.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn<span className="sr-only-x"> von {person.name}</span>
                      <ArrowUpRight />
                    </a>
                    <a className="link-arrow" href={person.instagram} target="_blank" rel="noopener noreferrer">
                      Instagram<span className="sr-only-x"> von {person.name}</span>
                      <ArrowUpRight />
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="container section section--tight-top" aria-labelledby="kulissen-h">
        <div className="section-head">
          <p className="section-head__label mono label">Hinter den Kulissen</p>
          <h2 id="kulissen-h" className="section-head__title h2">{u.kulissen.h2}</h2>
          <p className="section-head__aside">{u.kulissen.sub}</p>
        </div>
        <div className="gallery gallery--photos">
          {GALERIE.map((id) => {
            const b = bild(id)
            return (
              <figure key={id}>
                <Image src={b.src} alt={b.alt} width={b.width} height={b.height} sizes="(max-width: 700px) 90vw, 300px" />
              </figure>
            )
          })}
        </div>
      </section>

      <section className="container section section--tight-top">
        <h2 className="h2">{u.abschluss.h2}</h2>
        <p className="lead" style={{ marginTop: 16 }}>{u.abschluss.sub}</p>
        <p className="section-cta">
          <Link className="btn" href={u.abschluss.cta.href} data-track="cta_ueber_uns">
            {u.abschluss.cta.label}
            <ArrowRight />
          </Link>
        </p>
      </section>

      <JsonLd data={breadcrumbLd([{ name: 'Startseite', pfad: '/' }, { name: 'Über uns', pfad: '/ueber-uns' }])} />
    </>
  )
}
