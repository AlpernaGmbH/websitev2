import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/blog'
import { projekte } from '@/lib/projects'
import { absUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const feste = ['/', '/ueber-uns', '/projekte', '/blog', '/kontakt', '/impressum', '/datenschutz']
  return [
    ...feste.map((p) => ({ url: absUrl(p) })),
    ...projekte.map((p) => ({ url: absUrl(`/projekte/${p.slug}`) })),
    ...getPosts().map((p) => ({ url: absUrl(`/blog/${p.slug}`), lastModified: p.date })),
  ]
}
