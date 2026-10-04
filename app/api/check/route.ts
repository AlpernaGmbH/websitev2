import { NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'nodejs'
export const maxDuration = 60

// Die Analyse läuft im Agentur-Tool von Alperna. Diese Route reicht nur geprüfte Angaben weiter.
const ANALYSE_URL = process.env.CHECK_API_URL || 'https://alperna-tool.vercel.app/api/website/analyze'

const BRANCHEN = ['gastro', 'hotel', 'beauty', 'health', 'fitness', 'retail', 'producer', 'craft', 'b2b', 'realestate', 'auto', 'other'] as const
const NETZE = ['instagram', 'facebook', 'linkedin', 'tiktok', 'youtube'] as const
const HAEUFIGKEIT = ['none', 'rare', 'monthly', 'weekly', 'several'] as const

const url = z
  .string()
  .trim()
  .max(200)
  .transform((v) => (/^https?:\/\//i.test(v) ? v : `https://${v}`))
  .refine((v) => {
    try {
      const u = new URL(v)
      return (u.protocol === 'https:' || u.protocol === 'http:') && u.hostname.includes('.') && !/^(localhost|\d+\.\d+\.\d+\.\d+)$/.test(u.hostname)
    } catch {
      return false
    }
  })

const schema = z.object({
  company: z.string().trim().min(1).max(120),
  city: z.string().trim().max(80).optional().default(''),
  industry: z.enum(BRANCHEN),
  website: url,
  socials: z
    .partialRecord(
      z.enum(NETZE),
      z.object({ url: z.string().trim().max(200).optional(), freq: z.enum(HAEUFIGKEIT).optional() }),
    )
    .optional()
    .default({}),
})

// Einfache Begrenzung pro Instanz. Schützt das Analyse-Tool vor Skripten.
const treffer = new Map<string, number[]>()
function zuOft(ip: string): boolean {
  const jetzt = Date.now()
  const liste = (treffer.get(ip) ?? []).filter((t) => jetzt - t < 10 * 60_000)
  liste.push(jetzt)
  treffer.set(ip, liste)
  return liste.length > 4
}

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unbekannt'
  if (zuOft(ip)) return NextResponse.json({ ok: false, grund: 'zu_oft' }, { status: 429 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, grund: 'ungueltig' }, { status: 400 })
  }
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ ok: false, grund: 'ungueltig' }, { status: 400 })

  // Inhalte werden nie geloggt, nur Statuscodes.
  try {
    const res = await fetch(ANALYSE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(parsed.data),
      signal: AbortSignal.timeout(55_000),
    })
    console.log('check analyse', res.status)
    if (!res.ok) return NextResponse.json({ ok: false, grund: 'analyse' }, { status: 502 })
    const json = await res.json()
    if (typeof json?.score !== 'number' || !Array.isArray(json?.categories)) return NextResponse.json({ ok: false, grund: 'analyse' }, { status: 502 })
    return NextResponse.json({ ok: true, ergebnis: json })
  } catch {
    console.log('check analyse fehler')
    return NextResponse.json({ ok: false, grund: 'analyse' }, { status: 502 })
  }
}
