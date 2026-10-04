'use client'

import { useEffect, useRef } from 'react'

/** Animierte Höhenlinien (Marching Squares), Port von main.js des Prototyps. Der Ring um den Gipfel ist gelb. */
export function HeroTopo() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const CELL = 9
    const LEVELS = 22
    let w = 0
    let h = 0
    let running = false
    let t = Math.random() * 100
    let last = 0
    let frame = 0

    const field = (x: number, y: number, time: number) => {
      const nx = x / w
      const ny = y / h
      const g1 = 1.0 * Math.exp(-((nx - 0.7) ** 2 / 0.03 + (ny - 0.38) ** 2 / 0.06))
      const g2 = 0.78 * Math.exp(-((nx - 0.3) ** 2 / 0.06 + (ny - 0.62) ** 2 / 0.09))
      const g3 = 0.45 * Math.exp(-((nx - 0.5) ** 2 / 0.15 + (ny - 0.95) ** 2 / 0.06))
      const n =
        0.05 * Math.sin(nx * 9.0 + time * 0.3) * Math.cos(ny * 7.0 - time * 0.22) +
        0.03 * Math.sin((nx + ny) * 16.0 - time * 0.18) +
        0.02 * Math.cos(nx * 23.0 - ny * 11.0 + time * 0.12)
      return g1 + g2 + g3 + n
    }

    const draw = () => {
      const cols = Math.ceil(w / CELL) + 1
      const rows = Math.ceil(h / CELL) + 1
      const v = new Float32Array(cols * rows)
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) v[j * cols + i] = field(i * CELL, j * CELL, t)
      ctx.clearRect(0, 0, w, h)
      for (let l = 1; l <= LEVELS; l++) {
        const iso = l * (1.25 / LEVELS)
        const major = l % 5 === 0
        ctx.beginPath()
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = v[j * cols + i]
            const b = v[j * cols + i + 1]
            const c = v[(j + 1) * cols + i + 1]
            const d = v[(j + 1) * cols + i]
            const idx = (a > iso ? 1 : 0) | (b > iso ? 2 : 0) | (c > iso ? 4 : 0) | (d > iso ? 8 : 0)
            if (idx === 0 || idx === 15) continue
            const x = i * CELL
            const y = j * CELL
            const top: [number, number] = [x + (CELL * (iso - a)) / (b - a), y]
            const right: [number, number] = [x + CELL, y + (CELL * (iso - b)) / (c - b)]
            const bottom: [number, number] = [x + (CELL * (iso - d)) / (c - d), y + CELL]
            const left: [number, number] = [x, y + (CELL * (iso - a)) / (d - a)]
            const seg = (p: [number, number], q: [number, number]) => {
              ctx.moveTo(p[0], p[1])
              ctx.lineTo(q[0], q[1])
            }
            switch (idx) {
              case 1: case 14: seg(left, top); break
              case 2: case 13: seg(top, right); break
              case 3: case 12: seg(left, right); break
              case 4: case 11: seg(right, bottom); break
              case 6: case 9: seg(top, bottom); break
              case 7: case 8: seg(left, bottom); break
              case 5: seg(left, top); seg(right, bottom); break
              case 10: seg(top, right); seg(left, bottom); break
            }
          }
        }
        if (l === LEVELS - 6) {
          ctx.strokeStyle = 'rgba(255, 215, 0, 0.95)'
          ctx.lineWidth = 1.4
        } else {
          ctx.strokeStyle = major ? 'rgba(243, 241, 236, 0.42)' : 'rgba(243, 241, 236, 0.16)'
          ctx.lineWidth = major ? 1.1 : 0.8
        }
        ctx.stroke()
      }
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const loop = (now: number) => {
      if (!running) return
      if (now - last > 50) {
        t += 0.035
        draw()
        last = now
      }
      frame = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    let io: IntersectionObserver | null = null
    const onVisibility = () => {
      running = !document.hidden && canvas.getBoundingClientRect().bottom > 0
      if (running) frame = requestAnimationFrame(loop)
    }
    if (!reduced) {
      io = new IntersectionObserver(([e]) => {
        running = e.isIntersecting
        if (running) frame = requestAnimationFrame(loop)
      })
      io.observe(canvas)
      document.addEventListener('visibilitychange', onVisibility)
    }
    return () => {
      running = false
      cancelAnimationFrame(frame)
      ro.disconnect()
      io?.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" />
}
