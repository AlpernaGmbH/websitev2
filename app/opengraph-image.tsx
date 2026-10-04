import { ImageResponse } from 'next/og'
import { global } from '@/content/texte'

export const alt = global.og.titel
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', background: '#F3F1EC', color: '#121110', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 44, fontWeight: 600, letterSpacing: -2 }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: '#FFD700' }} />
          alperna
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 92, lineHeight: 1, letterSpacing: -4, display: 'flex' }}>Partner für den digitalen Auftritt</div>
          <div style={{ fontSize: 34, color: '#2F00FF', display: 'flex' }}>Website, Google-Profil, Social Media. Für KMU in der Ostschweiz.</div>
        </div>
      </div>
    ),
    size,
  )
}
