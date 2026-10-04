import type { Teil } from '@/content/texte'

/** Überschrift mit höchstens einem Akzentwort (kursiv, Signal Blue). */
export function Headline({ parts }: { parts: Teil[] }) {
  return (
    <>
      {parts.map((p, i) =>
        p.em ? (
          <em key={i} className={p.mark ? 'mark' : undefined}>{p.t}</em>
        ) : p.mark ? (
          <span key={i} className="mark">{p.t}</span>
        ) : (
          <span key={i}>{p.t}</span>
        ),
      )}
    </>
  )
}

export function plain(parts: Teil[]): string {
  return parts.map((p) => p.t).join('')
}
