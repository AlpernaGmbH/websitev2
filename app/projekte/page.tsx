import { Headline } from '@/components/Headline'
import { JsonLd } from '@/components/JsonLd'
import { ProjektListe, type ListeProjekt } from '@/components/ProjektListe'
import { projektePage } from '@/content/texte'
import { bild } from '@/lib/images'
import { BAUSTEIN_LABEL, kachelKennzahl, projekte, type Baustein } from '@/lib/projects'
import { breadcrumbLd, seite } from '@/lib/seo'

export const metadata = seite('/projekte', projektePage.meta.title, projektePage.meta.description)

const REIHENFOLGE: Baustein[] = ['website', 'google-profil', 'social-media', 'video', 'event']

export default function Projekte() {
  const p = projektePage
  const liste: ListeProjekt[] = projekte.map((x) => ({
    slug: x.slug,
    name: x.name,
    art: x.art,
    tag: x.bausteine.map((b) => BAUSTEIN_LABEL[b]).join(' · '),
    bausteine: x.bausteine,
    bereich: x.bereich,
    cover: x.cover ? bild(x.cover) : null,
    kpi: kachelKennzahl(x),
  }))
  const filter = REIHENFOLGE.filter((b) => projekte.some((x) => x.bausteine.includes(b))).map((b) => ({ key: b, label: BAUSTEIN_LABEL[b] }))
  return (
    <>
      <section className="container page-head">
        <p className="mono label">{p.label}</p>
        <h1 className="page-title">
          <Headline parts={p.h1} />
        </h1>
        <p className="lead page-sub">{p.sub}</p>
      </section>
      <section className="container services">
        <ProjektListe projekte={liste} filter={filter} alleLabel={p.filterAlle} internationalH2={p.international.h2} internationalText={p.international.einordnung} />
      </section>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', pfad: '/' }, { name: 'Projekte', pfad: '/projekte' }])} />
    </>
  )
}
