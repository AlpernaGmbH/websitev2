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
        <p className="mono label" style={{ marginBottom: 24 }}>Kontakt</p>
        <h1 className="page-title">
          <Headline parts={kontakt.h1} />
        </h1>
        <p className="lead" style={{ marginTop: 28 }}>{kontakt.sub}</p>
      </section>
      <section className="container section section--tight-top">
        <div className="contact__grid">
          <dl className="contact__copy contact__ways" style={{ borderTop: 0, paddingTop: 0 }}>
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
                {site.legalName}
                <br />
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}
              </dd>
            </div>
          </dl>
          <ContactForm idPrefix="kontakt" />
        </div>
      </section>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', pfad: '/' }, { name: 'Kontakt', pfad: '/kontakt' }])} />
    </>
  )
}
