import fs from 'node:fs'
import path from 'node:path'
import { global } from '@/content/texte'
import { indexable, seite } from '@/lib/seo'
import { renderMarkdown } from '@/lib/markdown'

export const metadata = seite('/datenschutz', global.rechtliches.datenschutz.title, global.rechtliches.datenschutz.description)

export default async function Datenschutz() {
  const md = fs.readFileSync(path.join(process.cwd(), 'content', 'legal', 'datenschutz.md'), 'utf8')
  const html = await renderMarkdown(md)
  return (
    <div className="legal">
      <h1>Datenschutzerklärung</h1>
      {!indexable && <p className="note">{global.rechtliches.vorschauHinweis}</p>}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
