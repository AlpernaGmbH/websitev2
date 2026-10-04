'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

export type ListePost = { slug: string; title: string; datum: string; kategorie: string }

export function BlogListe({ posts, kategorien, alleLabel }: { posts: ListePost[]; kategorien: string[]; alleLabel: string }) {
  const [aktiv, setAktiv] = useState('alle')
  const sichtbar = useMemo(() => posts.filter((p) => aktiv === 'alle' || p.kategorie === aktiv), [posts, aktiv])
  return (
    <>
      <div className="filters" role="group" aria-label="Filter nach Kategorie">
        {[{ key: 'alle', label: alleLabel }, ...kategorien.map((k) => ({ key: k, label: k }))].map((f) => (
          <button key={f.key} type="button" className="chip" aria-pressed={aktiv === f.key} onClick={() => setAktiv(f.key)}>
            {f.label}
          </button>
        ))}
      </div>
      <ol className="service-list">
        {sichtbar.map((p) => (
          <li key={p.slug}>
            <Link className="service service--post" href={`/blog/${p.slug}`}>
              <span className="service__num mono">{p.datum}</span>
              <div className="service__head">
                <h2 className="service__title">{p.title}</h2>
                <span className="service__tag mono">{p.kategorie}</span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </>
  )
}
