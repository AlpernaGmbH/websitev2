import { ContactForm } from '@/components/ContactForm'
import { Headline } from '@/components/Headline'
import { JsonLd } from '@/components/JsonLd'
import { kontakt, whatsappText } from '@/content/texte'
import { breadcrumbLd, seite } from '@/lib/seo'
import { site } from '@/site.config'

export const metadata = seite('/kontakt', kontakt.meta.title, kontakt.meta.description)

export default function Kontakt() {
  const wa = site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(whatsappText)}` : null
  return (
    <>
      <section className="container page-head">
        <p className="mono label">{kontakt.label}</p>
        <h1 className="page-title">
          <Headline parts={kontakt.h1} />
        </h1>
        <p className="lead page-sub">{kontakt.sub}</p>
      </section>
      <section className="contact container">
        <div className="contact__grid">
          <div className="contact__copy">
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
                  <a href={site.calendlyUrl} target="_blank" rel="noopener noreferrer" data-track="calendly_klick">{kontakt.wege.termin}</a>
                </dd>
              </div>
              <div>
                <dt className="mono">{kontakt.wege.standort}</dt>
                <dd>
                  {site.legalName}
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city}
                </dd>
              </div>
            </dl>
          </div>
          <ContactForm idPrefix="kontakt" />
        </div>
      </section>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', pfad: '/' }, { name: 'Kontakt', pfad: '/kontakt' }])} />
    </>
  )
}
