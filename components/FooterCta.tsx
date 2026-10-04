'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from '@/components/Icons'
import { global } from '@/content/texte'

/** Abschluss-Band im dunklen Footer. Entfällt auf Startseite und Kontakt, dort steht das Formular direkt darüber. */
export function FooterCta() {
  const pathname = usePathname()
  if (pathname === '/' || pathname === '/kontakt') return null
  const f = global.footer
  return (
    <div className="footer__cta container">
      <p>
        {f.abschlussH2}
        <span>{f.abschlussText}</span>
      </p>
      <Link className="btn btn--light" href={f.abschlussCta.href} data-track="cta_footer">
        {f.abschlussCta.label}
        <ArrowRight />
      </Link>
    </div>
  )
}
