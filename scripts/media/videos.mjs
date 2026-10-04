// Videos der bisherigen Website holen, für das Web komprimieren, Vorschaubilder erzeugen und
// (mit --upload) in den Vercel-Blob-Speicher legen. Schreibt data/videos.json.
//
//   node scripts/media/videos.mjs            laden, komprimieren, Vorschaubilder, data/videos.json
//   node scripts/media/videos.mjs --upload   zusätzlich hochladen (BLOB_READ_WRITE_TOKEN nötig)
//
// Braucht ffmpeg und ffprobe. Die Zwischendateien liegen in .media/ (nicht im Git).
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const raw = path.join(root, '.media', 'raw')
const out = path.join(root, '.media', 'out')
const posterDir = path.join(root, 'public', 'images', 'videos')
const dataFile = path.join(root, 'data', 'videos.json')
const upload = process.argv.includes('--upload')
for (const d of [raw, out, posterDir]) fs.mkdirSync(d, { recursive: true })

const quellen = JSON.parse(fs.readFileSync(path.join(root, 'scripts', 'media', 'quellen.json'), 'utf8')).videos
const bisher = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile, 'utf8')).videos : []
const urlVon = Object.fromEntries(bisher.map((v) => [v.id, v.url]))

const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { encoding: 'utf8' })
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(' ')}\n${r.stderr}`)
  return r.stdout
}
const probe = (file) => {
  const j = JSON.parse(run('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=codec_name,width,height:format=duration,size', '-of', 'json', file]))
  const s = j.streams[0]
  return { codec: s.codec_name, w: s.width, h: s.height, dauer: Number(j.format.duration), bytes: Number(j.format.size) }
}
const mb = (b) => (b / 1048576).toFixed(1)

const ergebnis = []
for (const q of quellen) {
  const asset = q.quelle.split('/').pop()
  const src = path.join(raw, asset)
  const dst = path.join(out, `${q.id}.mp4`)
  const poster = path.join(posterDir, `${q.id}.webp`)

  if (!fs.existsSync(src) || fs.statSync(src).size < 1000) {
    const res = await fetch(q.quelle)
    if (!res.ok) throw new Error(`${q.quelle}: ${res.status}`)
    fs.writeFileSync(src, Buffer.from(await res.arrayBuffer()))
  }
  const a = probe(src)
  if (!fs.existsSync(dst)) {
    // H.264 bis 1280 Pixel Kantenlänge: nur neu verpacken, damit die Wiedergabe sofort startet.
    const direkt = a.codec === 'h264' && Math.max(a.w, a.h) <= 1280
    const args = direkt
      ? ['-v', 'error', '-y', '-i', src, '-c', 'copy', '-movflags', '+faststart', dst]
      : ['-v', 'error', '-y', '-i', src, '-vf', "scale='if(gt(iw,ih),min(1280,iw),min(720,iw))':-2", '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '112k', '-movflags', '+faststart', dst]
    run('ffmpeg', args)
  }
  const b = probe(dst)
  if (!fs.existsSync(poster)) {
    const t = Math.min(3, b.dauer * 0.3).toFixed(2)
    run('ffmpeg', ['-v', 'error', '-y', '-ss', t, '-i', dst, '-frames:v', '1', '-vf', 'scale=480:-2', '-c:v', 'libwebp', '-quality', '72', poster])
  }
  ergebnis.push({
    id: q.id,
    projekt: q.projekt,
    art: q.art,
    datei: `videos/${q.id}.mp4`,
    poster: `/images/videos/${q.id}.webp`,
    breite: b.w,
    hoehe: b.h,
    dauer: Math.round(b.dauer),
    url: urlVon[q.id] ?? null,
    _bytes: b.bytes,
  })
  console.log(`${q.id.padEnd(30)} ${a.codec} ${a.w}x${a.h} ${mb(a.bytes)} MB -> ${b.w}x${b.h} ${mb(b.bytes)} MB`)
}

if (upload) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN fehlt')
  const { put } = await import('@vercel/blob')
  for (const v of ergebnis) {
    const res = await put(v.datei, fs.createReadStream(path.join(out, `${v.id}.mp4`)), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'video/mp4',
      cacheControlMaxAge: 31536000,
    })
    v.url = res.url
    console.log('hochgeladen', v.id, res.url)
  }
}

const gesamt = ergebnis.reduce((s, v) => s + v._bytes, 0)
fs.writeFileSync(
  dataFile,
  JSON.stringify(
    {
      meta: {
        hinweis: 'Erzeugt von scripts/media/videos.mjs. url bleibt leer, bis die Videos im Blob-Speicher liegen. Ohne url zeigt die Seite kein Video.',
        speicher: 'Vercel Blob, Speicher «alperna-medien»',
      },
      videos: ergebnis.map(({ _bytes, ...v }) => v),
    },
    null,
    2,
  ) + '\n',
)
console.log(`${ergebnis.length} Videos, ${mb(gesamt)} MB nach der Komprimierung`)
