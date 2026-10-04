import type { Metadata, Viewport } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import localFont from 'next/font/local'
import { Analytics } from '@/components/Analytics'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { RevealInit } from '@/components/RevealInit'
import { global, home } from '@/content/texte'
import { baseUrl, indexable, organisationLd } from '@/lib/seo'
import './globals.css'

// Kursive Akzentwörter. Selbst gehostet (OFL), keine Verbindung zu Google Fonts.
const serif = localFont({
  src: './fonts/instrument-serif-latin-400-italic.woff2',
  weight: '400',
  style: 'italic',
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: home.meta.title,
  description: home.meta.description,
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
  openGraph: { title: global.og.titel, description: global.og.beschreibung, siteName: 'Alperna', locale: 'de_CH', type: 'website' },
}

export const viewport: Viewport = { themeColor: '#F3F1EC' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#main">{global.skip}</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealInit />
        <JsonLd data={organisationLd()} />
        <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} aktiv={indexable} />
      </body>
    </html>
  )
}
