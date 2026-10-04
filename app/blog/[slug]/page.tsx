import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { blogPage } from '@/content/texte'
import { getPost, getPosts } from '@/lib/blog'
import { datumLang } from '@/lib/format'
import { renderBlogMarkdown } from '@/lib/markdown'
import { breadcrumbLd, seite } from '@/lib/seo'
import { site } from '@/site.config'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = getPost(slug)
  if (!p) return {}
  return seite(`/blog/${slug}`, `${p.metaTitle} | Alperna`, p.metaDescription, {
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url: `${site.url}/blog/${slug}`,
      type: 'article',
      publishedTime: p.date,
      locale: 'de_CH',
      siteName: site.name,
    },
  })
}

export default async function BlogBeitrag({ params }: Props) {
  const { slug } = await params
  const p = getPost(slug)
  if (!p) notFound()
  const a = blogPage.artikel
  const html = await renderBlogMarkdown(p.body)

  const artikelLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.metaDescription,
    datePublished: p.date,
    inLanguage: 'de-CH',
    mainEntityOfPage: `${site.url}/blog/${p.slug}`,
    author: { '@type': 'Organization', name: site.legalName, url: site.url },
    publisher: { '@type': 'Organization', name: site.legalName, logo: { '@type': 'ImageObject', url: `${site.url}/icon.png` } },
  }

  return (
    <article>
      <header className="post-head">
        <Link className="crumb mono" href="/blog">
          <span aria-hidden="true">←</span> {a.zurueck}
        </Link>
        <h1 className="post-title">{p.title}</h1>
        <div className="post-meta mono">
          <span>{p.category}</span>
          <time dateTime={p.date}>{datumLang(p.date)}</time>
        </div>
        <p className="post-teaser">{p.teaser}</p>
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      <aside className="author" aria-labelledby="box-h">
        <div className="author__box">
          <h2 id="box-h">{a.boxTitel}</h2>
          <p>{a.boxText}</p>
          <Link className="btn" href={a.boxCta.href} data-track="cta_blog">
            {a.boxCta.label}
            <ArrowRight />
          </Link>
        </div>
      </aside>
      <div style={{ height: 'var(--section)' }} />
      <JsonLd data={[artikelLd, breadcrumbLd([{ name: 'Startseite', pfad: '/' }, { name: 'Blog', pfad: '/blog' }, { name: p.title, pfad: `/blog/${p.slug}` }])]} />
    </article>
  )
}
