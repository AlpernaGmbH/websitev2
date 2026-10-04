import type { NextConfig } from 'next'

// Vorschau: nicht indexierbar. Erst mit NEXT_PUBLIC_INDEXABLE=1 (nach Go-live) freigeben.
const indexable = process.env.NEXT_PUBLIC_INDEXABLE === '1'

const config: NextConfig = {
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return indexable
      ? []
      : [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }]
  },
}

export default config
