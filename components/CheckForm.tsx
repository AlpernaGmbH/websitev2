'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowRight } from '@/components/Icons'
import { MehrTools } from '@/components/MehrTools'
import { checkPage } from '@/content/texte'
import { naechsterBaustein, type CheckErgebnis } from '@/lib/check'
import { track } from '@/lib/track'

const t = checkPage
type Phase = 'form' | 'laeuft' | 'ergebnis'

function protokoll(w: string) {
  return /^https?:\/\//i.test(w) ? w : `https://${w}`
}
function gueltigeAdresse(w: string) {
  try {
    const u = new URL(protokoll(w.trim()))
    return u.hostname.includes('.')
  } catch {
    return false
  }
}
const prozent = (x: number) => `${Math.round(x * 100)} %`

function Ergebnis({ e, onNochmal }: { e: CheckErgebnis; onNochmal: () => void }) {
  const r = t.ergebnis
  const rec = naechsterBaustein(e)
  const satz = e.score >= 70 ? r.stark : e.score >= 40 ? r.mittel : r.schwach
  const kopf = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    kopf.current?.focus()
    kopf.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])
  return (
    <section className="ck-result" aria-labelledby="ck-titel">
      <div className="ck-result__head">
        <div>
          <p className="mono label">
            {r.fuer} {e.company}
            {e.city ? ` · ${e.city}` : ''} · {e.industryLabel}
          </p>
          <h2 id="ck-titel" ref={kopf} tabIndex={-1} className="ck-result__title">
            {r.titel}
          </h2>
          <p className="lead">{satz}</p>
        </div>
        <p className="ck-score" aria-label={`${e.score} ${r.von}`}>
          {e.score}
          <small>{r.von}</small>
        </p>
      </div>

      <div className="ck-cats">
        {e.categories.map((k) => {
          const p = Math.round(k.score * 100)
          const offen = k.items.filter((it) => !it.ok)
          const erledigt = k.items.filter((it) => it.ok)
          return (
            <article className="ck-cat" key={k.id} data-irrelevant={k.weight <= 0}>
              <div className="ck-cat__head">
                <h3 className="ck-cat__title">{k.title}</h3>
                <span className="ck-cat__pct">{prozent(k.score)}</span>
              </div>
              <div className="ck-bar" role="presentation">
                <span style={{ width: `${p}%` }} />
              </div>
              {(k.selfReported || k.verified === false) && (
                <p className="ck-badges mono">
                  {k.selfReported && <span>{r.selbstangabe}</span>}
                  {k.verified === false && <span>{r.nichtGeprueft}</span>}
                </p>
              )}
              {offen.length > 0 && (
                <ul className="ck-items">
                  {offen.map((it) => (
                    <li key={it.label}>
                      <span className="ck-glyph" data-ok="false" role="img" aria-label={r.luecke}>
                        ✕
                      </span>
                      <span>
                        {it.label}
                        <small>{it.detail}</small>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {erledigt.length > 0 && (
                <details className="ck-done">
                  <summary>{offen.length ? `${erledigt.length} ${r.weitereOk}` : `${r.allesOk} (${erledigt.length})`}</summary>
                  <ul className="ck-items">
                    {erledigt.map((it) => (
                      <li key={it.label}>
                        <span className="ck-glyph" data-ok="true" role="img" aria-label={r.ok}>
                          ✓
                        </span>
                        <span>
                          {it.label}
                          <small>{it.detail}</small>
                        </span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
              {(k.hint || k.note) && <p className="ck-cat__hint">{k.hint ?? k.note}</p>}
            </article>
          )
        })}
      </div>

      <aside className="ck-next">
        <p className="mono label">{r.naechsterBaustein}</p>
        <h3 className="ck-next__title">{rec ? rec.titel : r.keinBaustein}</h3>
        <p className="ck-next__text">{rec ? r.grund : r.keinBausteinText}</p>
        {rec && (
          <Link className="link-arrow" href={`/leistungen/${rec.slug}`} data-track="check_baustein">
            {r.mehrErfahren}
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M3 11L11 3M5 3h6v6" />
            </svg>
          </Link>
        )}
      </aside>

      <p className="ck-grenze">{r.grenze}</p>
      <div className="ck-actions">
        <Link className="btn" href={r.gespraech.href} data-track="check_gespraech">
          {r.gespraech.label}
          <ArrowRight />
        </Link>
        <button className="btn btn--ghost" type="button" onClick={onNochmal}>
          {r.nochmal}
        </button>
        <MehrTools />
      </div>
    </section>
  )
}

export function CheckForm() {
  const f = t.formular
  const [phase, setPhase] = useState<Phase>('form')
  const [ungueltig, setUngueltig] = useState<string[]>([])
  const [meldung, setMeldung] = useState('')
  const [schritt, setSchritt] = useState(0)
  const [ergebnis, setErgebnis] = useState<CheckErgebnis | null>(null)
  const [host, setHost] = useState('')

  useEffect(() => {
    if (phase !== 'laeuft') return
    setSchritt(0)
    const id = setInterval(() => setSchritt((s) => Math.min(s + 1, t.laeuft.schritte.length - 1)), 2200)
    return () => clearInterval(id)
  }, [phase])

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const form = ev.currentTarget
    const d = new FormData(form)
    const val = (k: string) => String(d.get(k) ?? '').trim()
    const neu: string[] = []
    if (!val('company')) neu.push('company')
    if (!val('industry')) neu.push('industry')
    if (!val('website') || !gueltigeAdresse(val('website'))) neu.push('website')
    setUngueltig(neu)
    if (neu.length) {
      setMeldung(f.pflicht)
      form.querySelector<HTMLElement>(`[name="${neu[0]}"]`)?.focus()
      return
    }
    setMeldung('')
    const socials: Record<string, { url?: string; freq?: string }> = {}
    for (const [n] of t.netze) {
      const url = val(n)
      const freq = val(`${n}_freq`)
      if (url || freq) socials[n] = { url: url || undefined, freq: freq || undefined }
    }
    setHost(protokoll(val('website')).replace(/^https?:\/\/(www\.)?/i, '').replace(/\/.*$/, ''))
    setPhase('laeuft')
    track('check_gestartet')
    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: val('company'), city: val('city'), industry: val('industry'), website: val('website'), socials }),
      })
      if (res.status === 429) throw new Error('zu_oft')
      const json = await res.json().catch(() => null)
      if (!res.ok || !json?.ok) throw new Error('analyse')
      setErgebnis(json.ergebnis as CheckErgebnis)
      setPhase('ergebnis')
      track('check_ergebnis')
    } catch (err) {
      setMeldung(err instanceof Error && err.message === 'zu_oft' ? t.fehler.zuOft : t.fehler.allgemein)
      setPhase('form')
    }
  }

  if (phase === 'laeuft') {
    return (
      <section className="ck-run" aria-live="polite" aria-busy="true">
        <p className="mono label">{t.laeuft.titel}</p>
        <h2 className="ck-run__host">{host}</h2>
        <ol className="ck-run__list">
          {t.laeuft.schritte.map((s, i) => (
            <li key={s} data-state={i < schritt ? 'done' : i === schritt ? 'now' : 'todo'}>
              {s}
            </li>
          ))}
        </ol>
      </section>
    )
  }

  if (phase === 'ergebnis' && ergebnis) {
    return (
      <Ergebnis
        e={ergebnis}
        onNochmal={() => {
          setErgebnis(null)
          setPhase('form')
          setMeldung('')
        }}
      />
    )
  }

  const invalid = (n: string) => ungueltig.includes(n)
  return (
    <form className="ck-form" onSubmit={onSubmit} noValidate aria-describedby="ck-status">
      <fieldset className="ck-form__block">
        <legend className="mono label">{f.betrieb}</legend>
        <div className="form__row">
          <div className="field" data-invalid={invalid('company')}>
            <label className="field__label mono" htmlFor="ck-company">{f.firma} *</label>
            <input id="ck-company" type="text" name="company" autoComplete="organization" required aria-invalid={invalid('company')} />
          </div>
          <div className="field">
            <label className="field__label mono" htmlFor="ck-city">{f.ort}</label>
            <input id="ck-city" type="text" name="city" autoComplete="address-level2" />
          </div>
        </div>
        <div className="form__row">
          <div className="field" data-invalid={invalid('industry')}>
            <label className="field__label mono" htmlFor="ck-industry">{f.branche} *</label>
            <select id="ck-industry" name="industry" defaultValue="" required aria-invalid={invalid('industry')}>
              <option value="" disabled>{f.brancheWaehlen}</option>
              {t.branchen.map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>
          <div className="field" data-invalid={invalid('website')}>
            <label className="field__label mono" htmlFor="ck-website">{f.website} *</label>
            <input id="ck-website" type="text" inputMode="url" name="website" placeholder={f.websiteHinweis} autoComplete="url" required aria-invalid={invalid('website')} />
          </div>
        </div>
      </fieldset>

      <details className="ck-social">
        <summary>
          <span className="mono label">{f.social}</span> <span className="ck-opt mono">{f.optional}</span>
        </summary>
        <p className="ck-form__hint">{f.socialHinweis}</p>
        <div className="ck-netze">
          {t.netze.map(([n, l]) => (
            <div className="ck-netz" key={n}>
              <div className="field">
                <label className="field__label mono" htmlFor={`ck-${n}`}>{l}</label>
                <input id={`ck-${n}`} type="text" name={n} placeholder={f.kanalAdresse} autoComplete="off" />
              </div>
              <div className="field">
                <label className="field__label mono" htmlFor={`ck-${n}-freq`}>{f.haeufigkeit}</label>
                <select id={`ck-${n}-freq`} name={`${n}_freq`} defaultValue="">
                  <option value="">{f.haeufigkeitWaehlen}</option>
                  {t.haeufigkeit.map(([v, hl]) => (
                    <option key={v} value={v}>{hl}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </details>

      <div className="form__submit">
        <button className="btn" type="submit">
          {f.start}
          <ArrowRight />
        </button>
        <p className="form__status" id="ck-status" role="status" aria-live="polite" data-state={meldung ? 'error' : 'idle'}>
          {meldung || f.hinweis}
        </p>
      </div>
      {meldung && meldung !== f.pflicht && (
        <p className="ck-form__hint">
          {t.fehler.direkt} <Link className="link-arrow" href={t.fehler.kontakt.href}>{t.fehler.kontakt.label}</Link>
        </p>
      )}
    </form>
  )
}
