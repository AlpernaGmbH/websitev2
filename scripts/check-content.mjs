// Prüft Inhalte vor dem Build: Schreibregeln (CLAUDE.md), Meta-Längen, interne Links, Bilder, Zahlen mit Quelle.
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')
const probleme = []
const melde = (datei, text) => probleme.push(`${datei}: ${text}`)

// 1 Schreibregeln in content/texte.ts
const texte = read('content/texte.ts')
const verboten = ['Agentur', 'führend', 'massgeschneidert', 'ganzheitlich', 'holistisch', 'Synergie', 'Best Practice', 'Mehrwert', 'Stakeholder', 'Customer Journey', 'Game-Changer', 'disruptiv', 'viral', 'Reichweite', 'Hooks', 'Funnel', 'Onboarding', 'Touchpoint', 'performant', 'Lösung', 'Skalierung', 'Hörsaal', 'Student', 'Marketing', 'Next Level', 'nur noch', 'garantiert', 'Kündig', ' KI ']
const zeichen = [['—', 'Geviertstrich'], ['–', 'Halbgeviertstrich'], ['ß', 'ß statt ss'], ['…', 'Auslassungszeichen']]
texte.split('\n').forEach((zeile, i) => {
  if (zeile.trim().startsWith('//')) return
  for (const w of verboten) if (zeile.toLowerCase().includes(w.toLowerCase())) melde('content/texte.ts', `Zeile ${i + 1}: verbotenes Wort «${w.trim()}»`)
  for (const [z, n] of zeichen) if (zeile.includes(z)) melde('content/texte.ts', `Zeile ${i + 1}: ${n}`)
  if (/[A-Za-zäöü]!(?!=)/.test(zeile.replace(/`[^`]*`/g, '')) && /'[^']*[A-Za-zäöü]![^']*'/.test(zeile)) melde('content/texte.ts', `Zeile ${i + 1}: Ausrufezeichen`)
  if (/\d'\d/.test(zeile)) melde('content/texte.ts', `Zeile ${i + 1}: gerader Apostroph in Zahl`)
  if (/\d%/.test(zeile)) melde('content/texte.ts', `Zeile ${i + 1}: Prozent ohne Leerzeichen`)
})

// 2 Meta-Längen (title <= 60, description <= 155), Platzhalter ${...} werden grob ersetzt
for (const m of texte.matchAll(/\b(title|description):\s*([`'])((?:\\.|(?!\2).)*)\2/g)) {
  const wert = m[3].replace(/\$\{[^}]*\}/g, '28')
  const max = m[1] === 'title' ? 60 : 155
  if (wert.length > max) melde('content/texte.ts', `${m[1]} hat ${wert.length} Zeichen (max ${max}): ${wert.slice(0, 50)}`)
}

// 3 Zahlen im Text müssen in data/ oder site.config.ts vorkommen
const quellen = read('data/projekte.json') + read('data/testimonials.json') + read('site.config.ts')
const zahlen = new Set()
for (const m of texte.replace(/\/\/.*$/gm, '').matchAll(/'([^']*)'|`([^`]*)`/g)) {
  const s = (m[1] ?? m[2]).replace(/\$\{[^}]*\}/g, '')
  for (const z of s.matchAll(/\d[\d’,.]*\d|\d/g)) if (z[0].length >= 2 || z[0].includes('’')) zahlen.add(z[0])
}
const ausnahmen = new Set(['47.42', '9.38', '30', '12', '00', '01'])
for (const z of zahlen) {
  const roh = z.replace(/’/g, '')
  if (!quellen.includes(z) && !quellen.includes(roh) && !ausnahmen.has(z)) melde('content/texte.ts', `Zahl «${z}» steht nicht in data/ oder site.config.ts`)
}

// 4 Bilder: jede Datei aus data/images.json existiert
const imgs = JSON.parse(read('data/images.json'))
for (const [id, m] of Object.entries(imgs.images)) if (!fs.existsSync(path.join(root, 'public', m.file))) melde('data/images.json', `Datei fehlt: ${m.file} (${id})`)

// 5 Blog: Slugs, interne Links, Bilder
const blogDir = path.join(root, 'content', 'blog')
const slugs = new Set(fs.readdirSync(blogDir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')))
if (slugs.size !== 40) melde('content/blog', `${slugs.size} Beiträge statt 40`)
for (const s of slugs) {
  const t = fs.readFileSync(path.join(blogDir, `${s}.md`), 'utf8')
  for (const m of t.matchAll(/\]\(\/blog\/([a-z0-9-]+)\)/g)) if (!slugs.has(m[1])) melde(`content/blog/${s}.md`, `Link auf unbekannten Beitrag ${m[1]}`)
  for (const m of t.matchAll(/\(img:([A-Za-z0-9]+)\./g)) if (!imgs.images[m[1]]) melde(`content/blog/${s}.md`, `Bild fehlt: ${m[1]}`)
  const cover = t.match(/^cover: "([^"]+)"/m)
  if (!cover || !imgs.images[cover[1]]) melde(`content/blog/${s}.md`, 'Titelbild fehlt')
  if (!/^date: "\d{4}-\d{2}-\d{2}"/m.test(t)) melde(`content/blog/${s}.md`, 'Datum fehlt')
}

// 6 Projekte: 14, Bilder vorhanden, Texte nach Schreibregeln, keine übernommenen Originaltexte
const projekte = JSON.parse(read('data/projekte.json')).projekte
if (projekte.length !== 14) melde('data/projekte.json', `${projekte.length} Projekte statt 14`)
for (const p of projekte) {
  for (const id of [p.logo, ...p.fotos].filter(Boolean)) if (!imgs.images[id]) melde('data/projekte.json', `${p.slug}: Bild ${id} fehlt`)
  for (const alt of ['ausgangslage', 'schritte', 'zusatz']) if (alt in p) melde('data/projekte.json', `${p.slug}: Feld «${alt}» enthält Originaltext der Framer-Seite`)
  for (const t of [p.fall, p.umsetzung, ...p.leistungen]) {
    for (const w of verboten) if (t.toLowerCase().includes(w.toLowerCase())) melde('data/projekte.json', `${p.slug}: verbotenes Wort «${w.trim()}»`)
    for (const [z, n] of zeichen) if (t.includes(z)) melde('data/projekte.json', `${p.slug}: ${n}`)
  }
}

if (probleme.length) {
  console.error(`Inhaltsprüfung: ${probleme.length} Befund(e)`)
  for (const p of probleme) console.error(' - ' + p)
  process.exit(1)
}
console.log(`Inhaltsprüfung ok: ${slugs.size} Beiträge, ${projekte.length} Projekte, ${Object.keys(imgs.images).length} Bilder`)
