import type { Video } from '@/lib/videos'

/** Video mit Vorschaubild. Lädt erst beim Abspielen (preload none). */
export function VideoPlayer({ video, titel }: { video: Video; titel: string }) {
  if (!video.url) return null
  return (
    <figure className="vid" style={{ aspectRatio: `${video.breite} / ${video.hoehe}` }}>
      <video controls playsInline preload="none" poster={video.poster} aria-label={titel} width={video.breite} height={video.hoehe}>
        <source src={video.url} type="video/mp4" />
      </video>
    </figure>
  )
}
