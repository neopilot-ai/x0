import { docs } from '@/lib/docs-data'
import { SectionDocPage } from '@/components/docs/section-doc-page'

export function generateStaticParams() {
  return docs
    .filter(
      (doc) =>
        doc.section === 'FAQs' ||
        [...doc.headings, doc.description].some((value) =>
          /troubleshoot|common issues|debug|error|fix|\bfaq\b/i.test(value),
        ),
    )
    .filter((doc) => doc.slug)
    .map((doc) => ({ slug: doc.slug.split('/') }))
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  return <SectionDocPage section="troubleshooting" slug={slug.join('/')} />
}
