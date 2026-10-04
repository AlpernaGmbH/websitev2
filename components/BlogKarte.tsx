import Link from 'next/link'

export type BlogKarte = {
  slug: string
  title: string
  datum: string
  kategorie: string
  teaser: string
}

export function BlogKarteView({ p }: { p: BlogKarte }) {
  return (
    <Link className="bcard" href={`/blog/${p.slug}`}>
      <div className="bcard__meta mono">
        <span>{p.kategorie}</span>
        <span>{p.datum}</span>
      </div>
      <h3>{p.title}</h3>
      <p>{p.teaser}</p>
    </Link>
  )
}
