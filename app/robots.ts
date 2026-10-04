import type { MetadataRoute } from 'next'
import { absUrl, indexable } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  if (!indexable) return { rules: { userAgent: '*', disallow: '/' } }
  return { rules: { userAgent: '*', allow: '/' }, sitemap: absUrl('/sitemap.xml') }
}
