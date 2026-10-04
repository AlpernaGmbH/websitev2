'use client'

import { useEffect } from 'react'

/** Fallback für Browser ohne scroll-gesteuerte Animationen: Elemente mit .reveal blenden beim Scrollen ein. */
export function RevealInit() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (CSS.supports('animation-timeline: view()') || reduced) return
    document.documentElement.classList.add('io')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      document.documentElement.classList.remove('io')
    }
  }, [])
  return null
}
