'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { global } from '@/content/texte'
import { bild, LOGO_MARK } from '@/lib/images'

export function Header() {
  const pathname = usePathname()
  const [offen, setOffen] = useState(false)
  const [gescrollt, setGescrollt] = useState(false)
  const logo = bild(LOGO_MARK)

  useEffect(() => {
    const onScroll = () => setGescrollt(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOffen(false), [pathname])

  useEffect(() => {
    if (!offen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOffen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [offen])

  const aktiv = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className={`site-header${gescrollt ? ' is-scrolled' : ''}${offen ? ' is-open' : ''}`}>
      <nav className="nav container" aria-label="Hauptnavigation">
        <Link className="brand" href="/" aria-label="Alperna, zur Startseite">
          <Image src={logo.src} alt="" width={32} height={32} priority />
          <span className="brand__name">alperna</span>
        </Link>
        <button
          className="nav__toggle"
          type="button"
          aria-expanded={offen}
          aria-controls="nav-links"
          onClick={() => setOffen((o) => !o)}
        >
          <span className="nav__toggle-lines" aria-hidden="true" />
          <span>{global.menue}</span>
        </button>
        <div className={`nav__links${offen ? ' is-open' : ''}`} id="nav-links">
          {global.nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={aktiv(n.href) ? 'page' : undefined}
              className={'nurMobil' in n && n.nurMobil ? 'only-mobile' : undefined}
            >
              {n.label}
            </Link>
          ))}
          <Link className="btn" href={global.ctaHeader.href}>
            {global.ctaHeader.label}
          </Link>
        </div>
      </nav>
    </header>
  )
}
