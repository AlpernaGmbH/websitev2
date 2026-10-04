import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '@/components/Icons'
import { Clock } from '@/components/Clock'
import { Headline } from '@/components/Headline'
import { global } from '@/content/texte'
import { bild, LOGO_MARK } from '@/lib/images'
import { site } from '@/site.config'

export function Footer() {
  const logo = bild(LOGO_MARK)
  const f = global.footer
  const wa = site.whatsapp ? `https://wa.me/${site.whatsapp}` : null
  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="footer__cta">
          <p>
            <Headline parts={f.ctaText} />
          </p>
          <Link className="btn btn--light" href={f.cta.href} data-track="cta_footer">
            {f.cta.label}
            <ArrowRight />
          </Link>
        </div>
        <div className="footer__cols">
          <div className="footer__col footer__col--about">
            <Link className="brand" href="/">
              <Image src={logo.src} alt="" width={30} height={30} />
              <span className="brand__name">alperna</span>
            </Link>
            <p style={{ marginTop: 12 }}>{f.about}</p>
            <p>
              {site.legalName}, {site.address.street}, {site.address.zip} {site.address.city}
              <br />
              UID {site.uid}
            </p>
          </div>
          <nav className="footer__col" aria-labelledby="f-nav">
            <h2 id="f-nav" className="mono">{f.seiten}</h2>
            {f.links.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </nav>
          <div className="footer__col">
            <h2 className="mono">{f.kontakt}</h2>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" data-track="whatsapp_klick">WhatsApp</a>
            )}
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
          </div>
        </div>
        <div className="footer__bottom mono">
          <span>© 2026 {site.legalName}</span>
          <span>
            {site.address.city} <Clock />
          </span>
          <span className="footer__legal">
            {f.rechtliches.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </span>
        </div>
      </div>
      <div className="footer__wordmark" aria-hidden="true">alperna</div>
    </footer>
  )
}
