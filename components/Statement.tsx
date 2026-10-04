'use client'

import { useEffect, useRef, useState } from 'react'
import type { Teil } from '@/content/texte'

/** Großer Aussagesatz: Wörter erscheinen beim Scrollen (wie im Prototyp). Ohne Skript und bei reduzierter Bewegung steht der Text ganz. */
export function Statement({ parts }: { parts: Teil[] }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [lit, setLit] = useState<number | null>(null) // null = alles sichtbar
  const woerter = parts.flatMap((p, pi) => p.t.split(/(\s+)/).filter(Boolean).map((t, i) => ({ t, em: !!p.em, key: `${pi}-${i}` })))
  const anzahl = woerter.filter((w) => !/^\s+$/.test(w.t)).length

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    let ticking = false
    const update = () => {
      ticking = false
      const r = el.getBoundingClientRect()
      const start = window.innerHeight * 0.85
      const end = window.innerHeight * 0.35
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height * 0.6)))
      setLit(p * anzahl)
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [anzahl])

  let n = -1
  return (
    <p className="statement__text" ref={ref}>
      {woerter.map((w) => {
        if (/^\s+$/.test(w.t)) return w.t
        n += 1
        const span = (
          <span key={w.key} className="w" style={{ opacity: lit === null || n < lit ? 1 : 0.16 }}>
            {w.t}
          </span>
        )
        return w.em ? <em key={w.key}>{span}</em> : span
      })}
    </p>
  )
}
