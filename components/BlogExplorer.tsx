'use client'

import { useMemo, useState } from 'react'
import { BlogKarteView, type BlogKarte } from '@/components/BlogKarte'

export function BlogExplorer({ posts, kategorien, alleLabel }: { posts: BlogKarte[]; kategorien: string[]; alleLabel: string }) {
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
      <div className="blog-grid">
        {sichtbar.map((p) => (
          <BlogKarteView key={p.slug} p={p} />
        ))}
      </div>
    </>
  )
}
