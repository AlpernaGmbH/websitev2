import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const dir = path.join(process.cwd(), 'content', 'blog')

export const KATEGORIEN = ['Content erstellen', 'Planung & Messung', 'Plattformen', 'Lokal & Region'] as const

export type Post = {
  slug: string
  title: string
  date: string
  category: string
  teaser: string
  cover: string
  metaTitle: string
  metaDescription: string
  body: string
}

let cache: Post[] | null = null

export function getPosts(): Post[] {
  if (cache) return cache
  const posts = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), 'utf8'))
      return { ...(data as Omit<Post, 'body'>), body: content } as Post
    })
    .sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title, 'de') : a.date < b.date ? 1 : -1))
  cache = posts
  return posts
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug)
}
