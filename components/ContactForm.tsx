'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { ArrowRight } from '@/components/Icons'
import { kontakt } from '@/content/texte'
import { track } from '@/lib/track'

type Fehler = Partial<Record<'name' | 'email' | 'nachricht' | 'einwilligung', string>>
type Status = { state: 'idle' | 'sending' | 'ok' | 'error'; text: string }

const f = kontakt.formular

export function ContactForm({ idPrefix = 'kf' }: { idPrefix?: string }) {
  const [fehler, setFehler] = useState<Fehler>({})
  const [status, setStatus] = useState<Status>({ state: 'idle', text: '' })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const d = new FormData(form)
    const val = (k: string) => String(d.get(k) ?? '').trim()
    const neu: Fehler = {}
    if (!val('name')) neu.name = f.name.fehler
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val('email'))) neu.email = f.email.fehler
    if (!val('nachricht')) neu.nachricht = f.nachricht.fehler
    if (!d.get('einwilligung')) neu.einwilligung = f.einwilligungFehler
    setFehler(neu)
    if (Object.keys(neu).length) {
      const first = Object.keys(neu)[0]
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setStatus({ state: 'sending', text: f.senden })
    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: val('name'),
          firma: val('firma'),
          email: val('email'),
          themen: d.getAll('themen').map(String),
          nachricht: val('nachricht'),
          website: val('website'),
          einwilligung: true,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus({ state: 'ok', text: f.erfolg })
      track('formular_gesendet')
      form.reset()
    } catch {
      setStatus({ state: 'error', text: f.fehlerVersand })
    }
  }

  const id = (n: string) => `${idPrefix}-${n}`
  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-describedby={id('status')}>
      <div className="form__row">
        <div className="field" data-invalid={!!fehler.name}>
          <label className="field__label mono" htmlFor={id('name')}>{f.name.label}</label>
          <input id={id('name')} type="text" name="name" placeholder={f.name.platzhalter} autoComplete="name" required aria-invalid={!!fehler.name} aria-describedby={fehler.name ? id('name-err') : undefined} />
          {fehler.name && <span className="field__error" id={id('name-err')}>{fehler.name}</span>}
        </div>
        <div className="field">
          <label className="field__label mono" htmlFor={id('firma')}>{f.firma.label}</label>
          <input id={id('firma')} type="text" name="firma" placeholder={f.firma.platzhalter} autoComplete="organization" />
        </div>
      </div>
      <div className="field" data-invalid={!!fehler.email}>
        <label className="field__label mono" htmlFor={id('email')}>{f.email.label}</label>
        <input id={id('email')} type="email" name="email" placeholder={f.email.platzhalter} autoComplete="email" required aria-invalid={!!fehler.email} aria-describedby={fehler.email ? id('email-err') : undefined} />
        {fehler.email && <span className="field__error" id={id('email-err')}>{fehler.email}</span>}
      </div>
      <fieldset className="chips">
        <legend className="mono">{f.themen.label}</legend>
        <div className="chips__list">
          {f.themen.optionen.map((o) => (
            <label className="tick" key={o}>
              <input type="checkbox" name="themen" value={o} />
              {o}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field" data-invalid={!!fehler.nachricht}>
        <label className="field__label mono" htmlFor={id('nachricht')}>{f.nachricht.label}</label>
        <textarea id={id('nachricht')} name="nachricht" rows={4} placeholder={f.nachricht.platzhalter} required aria-invalid={!!fehler.nachricht} aria-describedby={fehler.nachricht ? id('nachricht-err') : undefined} />
        {fehler.nachricht && <span className="field__error" id={id('nachricht-err')}>{fehler.nachricht}</span>}
      </div>
      <div className="hp" aria-hidden="true">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent" data-invalid={!!fehler.einwilligung}>
        <input type="checkbox" name="einwilligung" aria-invalid={!!fehler.einwilligung} />
        <span>
          {f.einwilligung} (<Link href="/datenschutz">Datenschutz</Link>).
          {fehler.einwilligung && <strong> {fehler.einwilligung}</strong>}
        </span>
      </label>
      <div className="form__submit">
        <button className="btn" type="submit" disabled={status.state === 'sending'}>
          {f.button}
          <ArrowRight />
        </button>
        <p className="form__status" id={id('status')} role="status" aria-live="polite" data-state={status.state}>
          {status.text}
        </p>
      </div>
    </form>
  )
}
