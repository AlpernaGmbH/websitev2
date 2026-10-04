import { Headline } from '@/components/Headline'
import { JsonLd } from '@/components/JsonLd'
import { ProjekteExplorer, type ExplorerProjekt } from '@/components/ProjekteExplorer'
import { projektePage } from '@/content/texte'
import { bild } from '@/lib/images'
import { BAUSTEIN_LABEL, projekte, type Baustein } from '@/lib/projects'
import { breadcrumbLd, seite } from '@/lib/seo'

export const metadata = seite('/projekte', projektePage.meta.title, projektePage.meta.description)

const REIHENFOLGE: Baustein[] = ['website', 'google-profil', 'social-media', 'video', 'event']

function ersterSatz(t: string): string {
  const i = t.indexOf('. ')
  return i === -1 ? t : t.slice(0, i + 1)
}

export default function Projekte() {
  const p = projektePage
  const liste: ExplorerProjekt[] = projekte.map((x) => ({
    href: `/projekte/${x.slug}`,
    name: x.name,
    meta: x.art,
    fall: ersterSatz(x.ausgangslage),
    zahl: x.kennzahlen
      .slice(0, 2)
      .map((k) => `${k.wert} ${k.label}`)
      .join(' · '),
    cover: x.cover ? bild(x.cover) : null,
    logo: x.logo ? bild(x.logo) : null,
    bausteine: x.bausteine,
    bereich: x.bereich,
  }))
  const filter = REIHENFOLGE.filter((b) => projekte.some((x) => x.bausteine.includes(b))).map((b) => ({ key: b, label: BAUSTEIN_LABEL[b] }))
  return (
    <>
      <section className="container page-head">
        <p className="mono label" style={{ marginBottom: 24 }}>Referenzen</p>
        <h1 className="page-title">
          <Headline parts={[{ t: p.h1 }]} />
        </h1>
        <p className="lead" style={{ marginTop: 28 }}>{p.sub}</p>
      </section>
      <section className="container section section--tight-top">
        <ProjekteExplorer projekte={liste} filter={filter} alleLabel={p.filterAlle} internationalH2={p.international.h2} internationalText={p.international.einordnung} />
      </section>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', pfad: '/' }, { name: 'Projekte', pfad: '/projekte' }])} />
    </>
  )
}
