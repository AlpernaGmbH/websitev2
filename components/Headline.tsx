import type { Teil } from '@/content/texte'

/** Überschrift mit höchstens einem Akzentwort (kursiv, gelber Marker). */
export function Headline({ parts }: { parts: Teil[] }) {
  return (
    <>
      {parts.map((p, i) => (p.em ? <em key={i}>{p.t}</em> : <span key={i}>{p.t}</span>))}
    </>
  )
}
