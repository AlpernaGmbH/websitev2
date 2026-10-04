'use client'

import { useEffect, useState } from 'react'

/** Uhrzeit in Zürich, wie im Footer des Prototyps. */
export function Clock() {
  const [zeit, setZeit] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('de-CH', { timeZone: 'Europe/Zurich', hour: '2-digit', minute: '2-digit' })
    const tick = () => setZeit(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])
  return <span suppressHydrationWarning>{zeit}</span>
}
