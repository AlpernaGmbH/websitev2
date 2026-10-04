import fs from 'node:fs'
import path from 'node:path'
import { global } from '@/content/texte'
import { renderMarkdown } from '@/lib/markdown'
import { seite } from '@/lib/seo'

export const metadata = seite('/impressum', global.rechtliches.impressum.title, global.rechtliches.impressum.description)

export default async function Impressum() {
  const md = fs.readFileSync(path.join(process.cwd(), 'content', 'legal', 'impressum.md'), 'utf8')
  const html = await renderMarkdown(md)
  return (
    <div className="legal">
      <h1>Impressum</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
