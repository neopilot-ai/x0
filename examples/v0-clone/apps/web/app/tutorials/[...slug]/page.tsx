import { docs } from '@/lib/docs-data'
import { SectionDocPage } from '@/components/docs/section-doc-page'

export function generateStaticParams() {
  return docs
    .filter(
      (doc) =>
        ['Guides', 'Getting Started', 'Overview'].includes(doc.section) &&
        !['reference', 'integration'].includes(doc.type),
    )
    .filter((doc) => doc.slug)
    .map((doc) => ({ slug: doc.slug.split('/') }))
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  return <SectionDocPage section="tutorials" slug={slug.join('/')} />
}
