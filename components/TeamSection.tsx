import Image from 'next/image'
import { ArrowUpRight } from '@/components/Icons'
import { Headline } from '@/components/Headline'
import type { Teil } from '@/content/texte'
import { bild } from '@/lib/images'
import { site } from '@/site.config'

type Karte = { id: 'andrej' | 'leander'; tag: string; rolle: string; text: string }

const FOTO = { andrej: 'iwaqIdZLeZXZJMqidnD3bSMSHY', leander: 'hWvlDZcWO7blpdESrjYFvjl9mIM' } as const

/** Dunkle Team-Sektion wie im Prototyp: Schwarzweissfotos, bei Hover in Farbe. */
export function TeamSection({ id, label, h2, aside, karten }: { id?: string; label: string; h2: Teil[]; aside?: string; karten: Karte[] }) {
  return (
    <section id={id} className="team on-dark" aria-labelledby={`${id ?? 'team'}-h`}>
      <div className="container">
        <div className="section-head">
          <p className="section-head__label mono label">{label}</p>
          <h2 id={`${id ?? 'team'}-h`} className="section-head__title h2">
            <Headline parts={h2} />
          </h2>
          {aside && <p className="section-head__aside">{aside}</p>}
        </div>
        <div className="team__grid">
          {karten.map((k) => {
            const person = site.team[k.id]
            const foto = bild(FOTO[k.id])
            return (
              <article className="member reveal" key={k.id}>
                <div className="member__photo">
                  <Image src={foto.src} alt={foto.alt} width={foto.width} height={foto.height} sizes="(max-width: 700px) 92vw, 640px" />
                  <span className="member__tag mono">{k.tag}</span>
                </div>
                <div className="member__body">
                  <h3>{person.name}</h3>
                  <span className="member__role mono">{k.rolle}</span>
                  <p>{k.text}</p>
                  <div className="member__links">
                    <a className="link-arrow" href={person.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn<span className="visually-hidden"> von {person.name}</span>
                      <ArrowUpRight />
                    </a>
                    <a className="link-arrow" href={person.instagram} target="_blank" rel="noopener noreferrer">
                      Instagram<span className="visually-hidden"> von {person.name}</span>
                      <ArrowUpRight />
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
