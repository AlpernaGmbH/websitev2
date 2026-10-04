'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { track } from '@/lib/track'

/** GA4 wird nur in der Produktion geladen (NEXT_PUBLIC_INDEXABLE=1). Klicks auf Elemente mit data-track werden als Ereignis gesendet. */
export function Analytics({ gaId, aktiv }: { gaId: string; aktiv: boolean }) {
  useEffect(() => {
    if (!aktiv) return
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]')
      if (el?.dataset.track) track(el.dataset.track)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [aktiv])

  if (!aktiv || !gaId) return null
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}');`}</Script>
    </>
  )
}
