// Ereignisse an GA4, nur wenn die Property geladen ist (Produktion). In der Vorschau passiert nichts.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function track(event: string, params: Record<string, string> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', event, params)
}
