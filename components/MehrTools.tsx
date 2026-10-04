import { checkPage } from '@/content/texte'
import { site } from '@/site.config'

/** Knopf zu den weiteren Tools. Ohne toolsUrl in site.config.ts hat er bewusst kein Ziel. */
export function MehrTools({ className = 'btn btn--ghost' }: { className?: string }) {
  if (!site.toolsUrl) {
    return (
      <a className={className} role="link" aria-disabled="true">
        {checkPage.mehrTools}
      </a>
    )
  }
  return (
    <a className={className} href={site.toolsUrl} data-track="mehr_tools">
      {checkPage.mehrTools}
    </a>
  )
}
