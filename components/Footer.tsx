import Image from 'next/image'
import Link from 'next/link'
import { FooterCta } from '@/components/FooterCta'
import { global } from '@/content/texte'
import { bild, LOGO_MARK } from '@/lib/images'
import { site } from '@/site.config'

export function Footer() {
  const logo = bild(LOGO_MARK)
  const f = global.footer
  const wa = site.whatsapp ? `https://wa.me/${site.whatsapp}` : null
  return (
    <footer className="site-footer">
      <FooterCta />
      <div className="container">
        <div className="footer__cols">
          <div className="footer__col footer__col--about">
            <Link className="brand" href="/">
              <Image src={logo.src} alt="" width={32} height={32} />
              <span className="brand__name">alperna</span>
            </Link>
            <p style={{ marginTop: 12 }}>{site.claim}.</p>
            <p>
              {site.legalName}, {site.address.street}, {site.address.zip} {site.address.city}
              <br />
              UID {site.uid}
            </p>
          </div>
          <nav className="footer__col" aria-label={f.seiten}>
            <h2 className="mono">{f.seiten}</h2>
            {global.nav.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="footer__col">
            <h2 className="mono">{f.kontakt}</h2>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" data-track="whatsapp_klick">
                WhatsApp
              </a>
            )}
            <a href={site.calendlyUrl} target="_blank" rel="noopener noreferrer" data-track="calendly_klick">
              Termin buchen
            </a>
            <h2 className="mono" style={{ marginTop: 14 }}>{f.social}</h2>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
          </div>
        </div>
        <div className="footer__bottom mono">
          <span>© 2026 {site.legalName}</span>
          <span className="footer__legal">
            {f.rechtliches.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  )
}

