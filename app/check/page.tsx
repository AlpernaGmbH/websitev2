import { CheckForm } from '@/components/CheckForm'
import { Headline } from '@/components/Headline'
import { JsonLd } from '@/components/JsonLd'
import { MehrTools } from '@/components/MehrTools'
import { checkPage } from '@/content/texte'
import { breadcrumbLd, seite } from '@/lib/seo'

export const metadata = seite('/check', checkPage.meta.title, checkPage.meta.description)

export default function Check() {
  const c = checkPage
  return (
    <>
      <section className="container page-head">
        <p className="mono label">{c.label}</p>
        <h1 className="page-title">
          <Headline parts={c.h1} />
        </h1>
        <p className="lead page-sub">{c.sub}</p>
        <div className="check__tools">
          <MehrTools />
        </div>
      </section>
      <section className="container check">
        <CheckForm />
      </section>
      <JsonLd data={breadcrumbLd([{ name: 'Startseite', pfad: '/' }, { name: 'Marketing-Check', pfad: '/check' }])} />
    </>
  )
}
