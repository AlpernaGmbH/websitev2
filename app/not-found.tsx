import Link from 'next/link'
import { global } from '@/content/texte'

export default function NotFound() {
  const f = global.fehlerseite
  return (
    <div className="notfound">
      <h1>{f.h1}</h1>
      <p className="lead">{f.text}</p>
      <div className="notfound__links">
        {f.links.map((l, i) => (
          <Link key={l.href} className={i === 0 ? 'btn' : 'btn btn--ghost'} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
