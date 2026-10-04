import { leistungenSeite } from '@/content/texte'

export type Statistik = {
  id: string
  leistung: string
  zahl: string
  /** Zahl für den Balken, nur bei Prozentwerten */
  wert?: number
  einheit?: '%'
  aussage: string
  quelle: string
  url: string
  stand: string
  basis: string
  hinweis?: string
}

/** Eine Zahl mit Satz, dünnem Balken bei Prozentwerten und Quelle */
export function StatKachel({ s }: { s: Statistik }) {
  const t = leistungenSeite
  return (
    <figure className="stat">
      <p className="stat__zahl">{s.zahl}</p>
      <figcaption>
        <span className="stat__text">{s.aussage}</span>
        {s.einheit === '%' && typeof s.wert === 'number' && (
          <span className="stat__meter" role="img" aria-label={`${s.wert} von 100`}>
            <span style={{ width: `${s.wert}%` }} />
          </span>
        )}
        <span className="stat__basis mono">
          {t.basis}: {s.basis}
          {s.hinweis ? `. ${s.hinweis}` : ''}
        </span>
        <span className="stat__quelle">
          {t.quelle}:{' '}
          <a href={s.url} target="_blank" rel="noopener noreferrer">
            {s.quelle}
          </a>
          , {s.stand}
        </span>
      </figcaption>
    </figure>
  )
}

export type Diagramm = {
  id: string
  leistung: string
  titel: string
  untertitel: string
  daten: { label: string; wert: number }[]
  hervorgehoben?: string
  quelle: string
  url: string
  stand: string
  basis: string
}

const komma = (n: number) => String(n).replace('.', ',')

/**
 * Waagrechtes Balkendiagramm, eine Reihe. Die Zeile, um die es geht, ist schwarz, die übrigen grau.
 * Werte stehen am Balkenende. Eine Tabelle mit denselben Werten liegt für Screenreader bereit.
 */
export function StatBalken({ d }: { d: Diagramm }) {
  const t = leistungenSeite
  const max = 100
  return (
    <figure className="bars">
      <figcaption className="bars__head">
        <span className="bars__titel">{d.titel}</span>
        <span className="bars__sub">{d.untertitel}</span>
      </figcaption>
      <div className="bars__rows" aria-hidden="true">
        {d.daten.map((r) => (
          <div className="bars__row" data-hot={r.label === d.hervorgehoben} key={r.label}>
            <span className="bars__label">{r.label}</span>
            <span className="bars__track">
              <span className="bars__fill" style={{ width: `${(r.wert / max) * 100}%` }} />
            </span>
            <span className="bars__wert">{komma(r.wert)} %</span>
          </div>
        ))}
      </div>
      <div className="visually-hidden">
        <table>
          <caption>
            {t.tabelle}: {d.titel}
          </caption>
          <tbody>
            {d.daten.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                <td>{komma(r.wert)} %</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="stat__basis mono">
        {t.basis}: {d.basis}
      </p>
      <p className="stat__quelle">
        {t.quelle}:{' '}
        <a href={d.url} target="_blank" rel="noopener noreferrer">
          {d.quelle}
        </a>
        , {d.stand}
      </p>
    </figure>
  )
}
