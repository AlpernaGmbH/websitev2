import Image from 'next/image'
import Link from 'next/link'
import { BlogKarteView } from '@/components/BlogKarte'
import { ContactForm } from '@/components/ContactForm'
import { Headline } from '@/components/Headline'
import { ArrowRight, ArrowUpRight } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { ProjektKarte } from '@/components/ProjektKarte'
import { Stimmen } from '@/components/Stimmen'
import { home, kontakt, whatsappText } from '@/content/texte'
import { getPosts } from '@/lib/blog'
import { datumLang } from '@/lib/format'
import { bild, LOGOS } from '@/lib/images'
import { getProjekt } from '@/lib/projects'
import { faqLd, seite } from '@/lib/seo'
import { site } from '@/site.config'

export const metadata = seite('/', home.meta.title, home.meta.description)

const ROEMISCH = ['i.', 'ii.', 'iii.']

export default function Startseite() {
  const h = home
  const posts = getPosts().slice(0, 3)
  const andrej = bild('iwaqIdZLeZXZJMqidnD3bSMSHY')
  const leander = bild('hWvlDZcWO7blpdESrjYFvjl9mIM')
  const wa = site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(whatsappText)}` : null

  return (
    <>
      {/* 1 Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero__top mono">
            <span>{h.hero.badge}</span>
            <span>{h.hero.region}</span>
          </div>
          <h1 className="hero__title">
            <Headline parts={h.hero.h1} />
          </h1>
          <div className="hero__foot">
            <div className="hero__copy">
              <p className="lead">{h.hero.sub}</p>
              <div className="hero__ctas">
                <Link className="btn" href={h.hero.ctaPrimaer.href} data-track="cta_hero">
                  {h.hero.ctaPrimaer.label}
                  <ArrowRight />
                </Link>
                <Link className="btn btn--ghost" href={h.hero.ctaSekundaer.href}>
                  {h.hero.ctaSekundaer.label}
                </Link>
              </div>
              <p className="hero__coords mono">
                {h.hero.koordinaten[0]}
                <br />
                {h.hero.koordinaten[1]}
              </p>
            </div>
            <div className="hero__faces">
              <figure className="face">
                <div className="face__img">
                  <Image src={andrej.src} alt={andrej.alt} width={andrej.width} height={andrej.height} sizes="(max-width: 960px) 45vw, 280px" priority />
                </div>
                <figcaption className="mono">Andrej Good</figcaption>
              </figure>
              <figure className="face">
                <div className="face__img">
                  <Image src={leander.src} alt={leander.alt} width={leander.width} height={leander.height} sizes="(max-width: 960px) 45vw, 280px" priority />
                </div>
                <figcaption className="mono">Leander Züst</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 2 Vertrauensleiste */}
      <section className="container" aria-label="Belege">
        <div className="trust">
          <p className="trust__intro">{h.vertrauen.intro}</p>
          <div className="stats">
            {h.vertrauen.kennzahlen.map((k) => (
              <div className="stat" key={k.label}>
                <div className="stat__value">{k.wert}</div>
                <p className="stat__label">{k.label}</p>
              </div>
            ))}
          </div>
          <p className="logos__title mono">{h.vertrauen.logosTitel}</p>
          <ul className="logos">
            {LOGOS.map((id, i) => {
              const b = bild(id)
              return (
                <li key={id}>
                  <Image src={b.src} alt={b.alt || h.vertrauen.logoNamen[i]} width={136} height={136} sizes="68px" />
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* 3 Das Problem */}
      <section className="container section" aria-labelledby="problem-h">
        <div className="section-head">
          <p className="section-head__label mono label">{h.problem.label}</p>
          <h2 id="problem-h" className="section-head__title h2">
            <Headline parts={h.problem.h2} />
          </h2>
          <p className="section-head__aside">{h.problem.intro}</p>
        </div>
        <div className="cards4">
          {h.problem.karten.map((k, i) => {
            const b = bild(k.bild)
            return (
              <article className="card" key={k.titel}>
                <div className="card__img">
                  <Image src={b.src} alt={b.alt} width={b.width} height={b.height} sizes="(max-width: 700px) 90vw, 280px" />
                </div>
                <span className="card__num mono">0{i + 1}</span>
                <h3>{k.titel}</h3>
                <p>{k.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      {/* 4 Die sechs Bausteine */}
      <section className="container section section--tight-top" aria-labelledby="bausteine-h">
        <div className="section-head">
          <p className="section-head__label mono label">{h.bausteine.label}</p>
          <h2 id="bausteine-h" className="section-head__title h2">
            <Headline parts={h.bausteine.h2} />
          </h2>
          <p className="section-head__aside">{h.bausteine.intro}</p>
        </div>
        <ol className="rows">
          {h.bausteine.liste.map((b, i) => (
            <li className="row" key={b.titel}>
              <span className="row__num mono">0{i + 1}</span>
              <div className="row__title">
                <h3 style={{ font: 'inherit', letterSpacing: 'inherit' }}>{b.titel}</h3>
                {b.tag && <p className="row__tag mono">{b.tag}</p>}
              </div>
              <p className="row__desc">{b.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 5 Projekte */}
      <section className="container section section--tight-top" aria-labelledby="projekte-h">
        <div className="section-head">
          <p className="section-head__label mono label">{h.projekte.label}</p>
          <h2 id="projekte-h" className="section-head__title h2">
            <Headline parts={h.projekte.h2} />
          </h2>
          <p className="section-head__aside">{h.projekte.intro}</p>
        </div>
        <div className="grid3">
          {h.projekte.karten.map((k) => {
            const p = getProjekt(k.slug)
            if (!p) return null
            return (
              <ProjektKarte
                key={k.slug}
                href={`/projekte/${k.slug}`}
                name={p.name}
                meta={k.sub}
                fall={k.fall}
                zahl={k.zahl}
                einordnung={k.einordnung}
                cover={p.cover ? bild(p.cover) : null}
                logo={p.logo ? bild(p.logo) : null}
              />
            )
          })}
        </div>
        <p className="section-cta">
          <Link className="link-arrow" href={h.projekte.link.href}>
            {h.projekte.link.label}
            <ArrowUpRight />
          </Link>
        </p>
      </section>

      {/* 6 Stimmen */}
      <Stimmen />

      {/* 7 Ablauf */}
      <section className="container section section--tight-top" aria-labelledby="ablauf-h">
        <div className="section-head">
          <p className="section-head__label mono label">{h.ablauf.label}</p>
          <h2 id="ablauf-h" className="section-head__title h2">
            <Headline parts={h.ablauf.h2} />
          </h2>
          <p className="section-head__aside">{h.ablauf.intro}</p>
        </div>
        <ol className="steps">
          {h.ablauf.etappen.map((e, i) => (
            <li className="step" key={e.titel}>
              <span className="step__num mono">Etappe 0{i + 1}</span>
              <h3>{e.titel}</h3>
              <p>{e.text}</p>
            </li>
          ))}
        </ol>
        <p className="section-cta">
          <Link className="btn" href={h.ablauf.cta.href} data-track="cta_ablauf">
            {h.ablauf.cta.label}
            <ArrowRight />
          </Link>
        </p>
      </section>

      {/* 8 Warum Alperna */}
      <section className="container section section--tight-top" aria-labelledby="warum-h">
        <div className="section-head">
          <p className="section-head__label mono label">{h.warum.label}</p>
          <h2 id="warum-h" className="section-head__title h2">
            <Headline parts={h.warum.h2} />
          </h2>
        </div>
        <div className="why">
          {h.warum.punkte.map((p, i) => (
            <div className="why__item" key={p.titel}>
              <span className="why__num" aria-hidden="true">{ROEMISCH[i]}</span>
              <h3>{p.titel}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9 Team */}
      <section className="container section section--tight-top" aria-labelledby="team-h">
        <div className="section-head">
          <p className="section-head__label mono label">{h.team.label}</p>
          <h2 id="team-h" className="section-head__title h2">
            <Headline parts={h.team.h2} />
          </h2>
        </div>
        <div className="team">
          {h.team.karten.map((k) => {
            const person = site.team[k.id]
            const foto = k.id === 'andrej' ? andrej : leander
            return (
              <article className="member" key={k.id}>
                <div className="member__photo">
                  <Image src={foto.src} alt={foto.alt} width={foto.width} height={foto.height} sizes="(max-width: 700px) 90vw, 440px" />
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

      {/* 10 Blog-Teaser */}
      <section className="container section section--tight-top" aria-labelledby="blog-h">
        <div className="section-head">
          <p className="section-head__label mono label">{h.blog.label}</p>
          <h2 id="blog-h" className="section-head__title h2">
            <Headline parts={h.blog.h2} />
          </h2>
          <p className="section-head__aside">{h.blog.intro}</p>
        </div>
        <div className="blog-grid">
          {posts.map((p) => (
            <BlogKarteView
              key={p.slug}
              p={{ slug: p.slug, title: p.title, datum: datumLang(p.date), kategorie: p.category, teaser: p.teaser }}
            />
          ))}
        </div>
        <p className="section-cta">
          <Link className="link-arrow" href={h.blog.link.href}>
            {h.blog.link.label}
            <ArrowUpRight />
          </Link>
        </p>
      </section>

      {/* 11 Häufige Fragen */}
      <section className="container section section--tight-top faq" aria-labelledby="faq-h">
        <div className="faq__grid">
          <div className="faq__intro">
            <p className="mono label">{h.faq.label}</p>
            <h2 id="faq-h" className="h2" style={{ fontSize: 'clamp(34px, 4vw, 56px)' }}>
              <Headline parts={h.faq.h2} />
            </h2>
            <a className="link-arrow" href={h.faq.weitere.href} style={{ alignSelf: 'flex-start' }}>
              {h.faq.weitere.label}
              <ArrowUpRight />
            </a>
          </div>
          <div className="faq__list">
            {h.faq.fragen.map((f, i) => (
              <details key={f.q} name="faq" open={i === 0}>
                <summary>
                  {f.q}
                  <span className="faq__plus" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12 Kontakt */}
      <section id="kontakt" className="container section section--tight-top" aria-labelledby="kontakt-h">
        <div className="contact__grid">
          <div className="contact__copy">
            <p className="mono label">{h.kontakt.label}</p>
            <h2 id="kontakt-h" className="contact__title">
              <Headline parts={h.kontakt.h2} />
            </h2>
            <p className="lead">{h.kontakt.sub}</p>
            <dl className="contact__ways">
              <div>
                <dt className="mono">{kontakt.wege.termin.label}</dt>
                <dd>
                  <a href={site.calendlyUrl} target="_blank" rel="noopener noreferrer" data-track="calendly_klick">{kontakt.wege.termin.text}</a>
                </dd>
              </div>
              {wa && (
                <div>
                  <dt className="mono">{kontakt.wege.whatsapp.label}</dt>
                  <dd>
                    <a href={wa} target="_blank" rel="noopener noreferrer" data-track="whatsapp_klick">{kontakt.wege.whatsapp.text}</a>
                    <br />
                    <span style={{ color: 'var(--muted)', fontSize: 15 }}>{kontakt.wege.whatsapp.hinweis}</span>
                  </dd>
                </div>
              )}
              <div>
                <dt className="mono">{kontakt.wege.mail.label}</dt>
                <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
              </div>
              <div>
                <dt className="mono">{kontakt.wege.adresse.label}</dt>
                <dd>
                  {site.legalName}, {site.address.street}, {site.address.zip} {site.address.city}
                </dd>
              </div>
            </dl>
          </div>
          <ContactForm idPrefix="start" />
        </div>
      </section>

      <JsonLd data={faqLd(h.faq.fragen)} />
    </>
  )
}
