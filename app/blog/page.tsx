import { BlogListe } from '@/components/BlogListe'
import { Headline } from '@/components/Headline'
import { JsonLd } from '@/components/JsonLd'
import { blogPage } from '@/content/texte'
import { getPosts, KATEGORIEN } from '@/lib/blog'
import { datumLang } from '@/lib/format'
import { breadcrumbLd, seite } from '@/lib/seo'

export const metadata = seite('/blog', blogPage.meta.title, blogPage.meta.description)

export default function Blog() {
  const b = blogPage
  const posts = getPosts().map((p) => ({ slug: p.slug, title: p.title, datum: datumLang(p.date), kategorie: p.category }))
  return (
    <>
      <section className="container page-head">
        <p className="mono label">{b.label}</p>
        <h1 className="page-title">
          <Headline parts={b.h1} />
        </h1>
        <p className="lead page-sub">{b.sub}</p>
      </section>
      <section className="container services">
        <BlogListe posts={posts} kategorien={[...KATEGORIEN]} alleLabel={b.filterAlle} />
      </section>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', pfad: '/' }, { name: 'Blog', pfad: '/blog' }])} />
    </>
  )
}
