import Image from 'next/image'
import Link from 'next/link'
import { ContactForm } from '@/components/ContactForm'
import { Headline } from '@/components/Headline'
import { ArrowRight } from '@/components/Icons'
import { HeroTopo } from '@/components/HeroTopo'
import { MehrTools } from '@/components/MehrTools'
import { JsonLd } from '@/components/JsonLd'
import { Statement } from '@/components/Statement'
import { TeamSection } from '@/components/TeamSection'
import { checkPage, home, kontakt, whatsappText } from '@/content/texte'
import { bild } from '@/lib/images'
import { faqLd, seite } from '@/lib/seo'
import { site } from '@/site.config'

export const metadata = seite('/', home.meta.title, home.meta.description)

const ROEMISCH = ['i.', 'ii.', 'iii.']

export default function Startseite() {
  const h = home
  const andrej = bild('iwaqIdZLeZXZJMqidnD3bSMSHY')
  const leander = bild('hWvlDZcWO7blpdESrjYFvjl9mIM')
  const wa = site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(whatsappText)}` : null
  const ticker = h.ticker.map((t) => <li key={t}>{t}</li>)

  return (
    <>
      {/* Hero */}
      <section id="top" className="hero">
        <div className="container">
          <div className="hero__top mono">
            <span className="label">{h.hero.badge}</span>
          </div>
          <h1 className="hero__title">
            {h.hero.zeilen.map((z, i) => (
              <span className="line" key={i}>
                <span>
                  <Headline parts={z} />
                </span>
              </span>
            ))}
          </h1>
          <div className="hero__foot">
            <p className="lead hero__lead">{h.hero.lead}</p>
            <div className="hero__ctas">
              <Link className="btn" href={h.hero.ctaPrimaer.href} data-track="cta_hero">
                {h.hero.ctaPrimaer.label}
                <ArrowRight />
              </Link>
              <Link className="btn btn--ghost" href={h.hero.ctaSekundaer.href}>
                {h.hero.ctaSekundaer.label}
              </Link>
            </div>
          </div>
        </div>

        <div className="hero__visual on-dark" role="img" aria-label="Animierte Höhenlinien einer Berglandschaft">
          <HeroTopo />
          <div className="hero__overlay">
            <div className="hero__overlay-row">
              <div className="founders">
                <div className="founders__faces">
                  <Image src={andrej.src} alt="" width={96} height={96} sizes="48px" />
                  <Image src={leander.src} alt="" width={96} height={96} sizes="48px" />
                </div>
                <p className="founders__text">
                  {h.hero.gruender.namen}
                  <span>{h.hero.gruender.rolle}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="ticker" aria-label="Unsere Leistungen im Überblick">
          <div className="ticker__track">
            <ul className="ticker__group">{ticker}</ul>
            <ul className="ticker__group" aria-hidden="true">{ticker}</ul>
          </div>
        </div>
      </section>

      {/* Wer wir sind */}
      <section className="statement container" aria-label="Über Alperna">
        <div className="statement__grid">
          <p className="statement__label mono label">{h.statement.label}</p>
          <Statement parts={h.statement.parts} />
        </div>
      </section>

      {/* Leistungen */}
      <section id="leistungen" className="services container" aria-labelledby="leistungen-h">
        <div className="section-head">
          <p className="section-head__label mono label">{h.bausteine.label}</p>
          <h2 id="leistungen-h" className="section-head__title h2 reveal">
            <Headline parts={h.bausteine.h2} />
          </h2>
          <p className="section-head__aside reveal">{h.bausteine.aside}</p>
        </div>
        <ol className="service-list">
          {h.bausteine.liste.map((b, i) => (
            <li className="reveal" key={b.titel}>
              <Link className="service" href={`/leistungen/${b.slug}`}>
                <span className="service__num mono">0{i + 1}</span>
                <div className="service__head">
                  <h3 className="service__title">{b.titel}</h3>
                  <span className="service__tag mono">{b.tag}</span>
                </div>
                <p className="service__desc">{b.text}</p>
                <span className="service__arrow" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Marketing-Check */}
      <section className="check-teaser container" aria-labelledby="check-h">
        <div className="check-teaser__box on-dark">
          <div className="check-teaser__copy">
            <p className="mono label">{checkPage.teaser.label}</p>
            <h2 id="check-h" className="check-teaser__title">
              <Headline parts={checkPage.teaser.h2} />
            </h2>
            <p className="check-teaser__text">{checkPage.teaser.text}</p>
          </div>
          <div className="check-teaser__ctas">
            <Link className="btn btn--light" href={checkPage.teaser.cta.href} data-track="cta_check">
              {checkPage.teaser.cta.label}
              <ArrowRight />
            </Link>
            <MehrTools className="btn btn--outline-light" />
          </div>
        </div>
      </section>

      {/* Warum Alperna */}
      <section className="why container" aria-labelledby="warum-h">
        <div className="section-head">
          <p className="section-head__label mono label">{h.warum.label}</p>
          <h2 id="warum-h" className="section-head__title h2 reveal">
            <Headline parts={h.warum.h2} />
          </h2>
        </div>
        <div className="why__grid">
          {h.warum.punkte.map((p, i) => (
            <div className="why__item reveal" key={p.titel}>
              <span className="why__num" aria-hidden="true">{ROEMISCH[i]}</span>
              <h3>{p.titel}</h3>
              <p>{p.text}</p>
              {'link' in p && p.link && (
                <Link className="link-arrow why__link" href={p.link.href} style={{ alignSelf: 'flex-start' }}>
                  {p.link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Ablauf */}
      <section id="ablauf" className="process on-dark" aria-labelledby="ablauf-h">
        <div className="container process__grid">
          <div className="process__intro">
            <p className="mono label">{h.ablauf.label}</p>
            <h2 id="ablauf-h" className="h2">
              <Headline parts={h.ablauf.h2} />
            </h2>
            <p className="lead">{h.ablauf.lead}</p>
            <Link className="btn btn--light" href={h.ablauf.cta.href} style={{ alignSelf: 'flex-start' }} data-track="cta_ablauf">
              {h.ablauf.cta.label}
              <ArrowRight />
            </Link>
          </div>
          <ol className="process__steps">
            {h.ablauf.etappen.map((e, i) => (
              <li className="pstep reveal" key={e.titel}>
                <span className="pstep__num mono">Etappe 0{i + 1}</span>
                <div>
                  <h3>{e.titel}</h3>
                  <p>{e.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <TeamSection id="team" label={h.team.label} h2={h.team.h2} aside={h.team.aside} karten={h.team.karten} />

      {/* Häufige Fragen */}
      <section id="faq" className="faq container" aria-labelledby="faq-h">
        <div className="faq__grid">
          <div className="faq__intro">
            <p className="mono label">{h.faq.label}</p>
            <h2 id="faq-h" className="h2" style={{ fontSize: 'clamp(40px, 4.4vw, 64px)' }}>
              <Headline parts={h.faq.h2} />
            </h2>
            <a className="link-arrow" href={h.faq.weitere.href}>
              {h.faq.weitere.label}
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

      {/* Kontakt */}
      <section id="kontakt" className="contact container" aria-labelledby="kontakt-h">
        <div className="contact__grid">
          <div className="contact__copy">
            <p className="mono label">{h.kontakt.label}</p>
            <h2 id="kontakt-h" className="contact__title">
              <Headline parts={h.kontakt.h2} />
            </h2>
            <p className="lead">{h.kontakt.lead}</p>
            <a className="contact__mail" href={`mailto:${site.email}`}>{site.email}</a>
            <dl className="contact__meta">
              {wa && (
                <div>
                  <dt className="mono">WhatsApp</dt>
                  <dd>
                    <a href={wa} target="_blank" rel="noopener noreferrer" data-track="whatsapp_klick">{kontakt.wege.whatsapp}</a>
                    <p className="small">{kontakt.wege.whatsappHinweis}</p>
                  </dd>
                </div>
              )}
              <div>
                <dt className="mono">Termin</dt>
                <dd>
                  <a href={site.calendlyUrl} target="_blank" rel="noopener noreferrer" data-track="calendly_klick">{h.kontakt.termin}</a>
                </dd>
              </div>
              <div>
                <dt className="mono">{kontakt.wege.standort}</dt>
                <dd>{h.kontakt.standort}</dd>
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
