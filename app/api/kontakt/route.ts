import { NextResponse } from 'next/server'
import { z } from 'zod'
import { site } from '@/site.config'

export const runtime = 'nodejs'

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  firma: z.string().trim().max(160).optional().default(''),
  email: z.string().trim().max(200).regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
  themen: z.array(z.string().max(40)).max(8).optional().default([]),
  nachricht: z.string().trim().min(1).max(1900), // Notion nimmt höchstens 2000 Zeichen pro Textblock
  website: z.string().max(200).optional().default(''), // Honigtopf: echte Besucher lassen das Feld leer
  einwilligung: z.literal(true),
})

// Einfache Begrenzung pro Instanz. Reicht gegen Skripte, ersetzt kein Captcha.
const treffer = new Map<string, number[]>()
function zuOft(ip: string): boolean {
  const jetzt = Date.now()
  const liste = (treffer.get(ip) ?? []).filter((t) => jetzt - t < 10 * 60_000)
  liste.push(jetzt)
  treffer.set(ip, liste)
  return liste.length > 5
}

async function perMail(d: z.infer<typeof schema>): Promise<boolean | null> {
  const key = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM
  if (!key || !from) return null
  const text = [
    `Name: ${d.name}`,
    `Firma: ${d.firma || '-'}`,
    `E-Mail: ${d.email}`,
    `Themen: ${d.themen.join(', ') || '-'}`,
    '',
    d.nachricht,
  ].join('\n')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [process.env.CONTACT_TO || site.email],
      reply_to: d.email,
      subject: `Neue Anfrage über alperna.ch: ${d.name}`,
      text,
    }),
  })
  console.log('kontakt mail', res.status)
  return res.ok
}

async function anN8n(d: z.infer<typeof schema>): Promise<boolean | null> {
  const url = process.env.N8N_WEBHOOK_URL
  if (!url) return null
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: d.name, firma: d.firma, email: d.email, themen: d.themen, nachricht: d.nachricht, quelle: 'alperna.ch', zeit: new Date().toISOString() }),
  })
  console.log('kontakt n8n', res.status)
  return res.ok
}

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unbekannt'
  if (zuOft(ip)) return NextResponse.json({ ok: false }, { status: 429 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
  // Honigtopf gefüllt: so tun, als wäre alles gut, und nichts senden.
  if (typeof body === 'object' && body && typeof (body as Record<string, unknown>).website === 'string' && (body as Record<string, string>).website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 })

  // Inhalte werden nie geloggt, nur Statuscodes.
  const [mail, n8n] = await Promise.all([perMail(parsed.data).catch(() => false), anN8n(parsed.data).catch(() => false)])
  if (mail === null && n8n === null) return NextResponse.json({ ok: false, grund: 'nicht_konfiguriert' }, { status: 503 })
  if (mail === true || n8n === true) return NextResponse.json({ ok: true })
  return NextResponse.json({ ok: false }, { status: 502 })
}
