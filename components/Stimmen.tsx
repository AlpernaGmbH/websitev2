import { Headline } from '@/components/Headline'
import { home } from '@/content/texte'
import { videoPartner, zitate } from '@/lib/projects'

/** Zitate als Text. Solange die Video-Testimonials fehlen, erscheinen die Zitate der Video-Partner ebenfalls als Text. */
export function Stimmen() {
  const videos = videoPartner.filter((v) => v.datei)
  const mitVideo = videos.length > 0
  const sichtbar = zitate.filter((z) => z.fuerStartseite || (!mitVideo && videoPartner.some((v) => v.projekt === z.projekt)))
  const s = home.stimmen
  return (
    <section className="container section section--tight-top" aria-labelledby="stimmen-h">
      <div className="section-head">
        <p className="section-head__label mono label">{s.label}</p>
        <h2 id="stimmen-h" className="section-head__title h2">
          <Headline parts={s.h2} />
        </h2>
        <p className="section-head__aside">{mitVideo ? s.introMitVideo : s.intro}</p>
      </div>
      {mitVideo && (
        <div className="videos">
          {videos.map((v) => (
            <video key={v.projekt} src={v.datei!} controls preload="none" playsInline />
          ))}
        </div>
      )}
      <div className="quotes">
        {sichtbar.map((z) => (
          <figure className="quote" key={z.projekt}>
            <blockquote>«{z.text}»</blockquote>
            <figcaption className="mono">
              <strong>{z.firma}</strong>
              {z.branche}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
