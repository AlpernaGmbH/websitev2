import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import { bild } from '@/lib/images'

/** Markdown zu HTML. Der Inhalt stammt aus dem eigenen Repo, nicht von Besuchern. */
export async function renderMarkdown(md: string): Promise<string> {
  const file = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(md)
  return String(file)
}

/** Blogbilder: img:ID.ext -> lokale Datei, mit Abmessungen und Lazy Loading */
export async function renderBlogMarkdown(md: string): Promise<string> {
  const mitPfad = md.replace(/\]\(img:([A-Za-z0-9]+)\.\w+\)/g, '](/images/blog/$1.webp)')
  const html = await renderMarkdown(mitPfad)
  return html.replace(/<img src="\/images\/blog\/([A-Za-z0-9]+)\.webp" alt="([^"]*)">/g, (_m, id: string, alt: string) => {
    const b = bild(id)
    return `<img src="${b.src}" alt="${alt}" width="${b.width}" height="${b.height}" loading="lazy" decoding="async">`
  })
}
