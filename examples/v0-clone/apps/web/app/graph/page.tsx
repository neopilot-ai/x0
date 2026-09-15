import { GraphView, type GraphNode, type GraphEdge } from '@/components/graph/graph-view'
import { allDocs, uniqueSlugPairs } from '@/lib/docs-store'

const SECTION_COLORS: Record<string, string> = {
  'API Reference': '#b45309',
  Guides: '#2563eb',
  Integrations: '#059669',
  Compare: '#7c3aed',
  Reference: '#64748b',
  FAQs: '#dc2626',
  Overview: '#0891b2',
  'Getting Started': '#c026d3',
  Tutorials: '#4f46e5',
  Troubleshooting: '#e11d48',
}

export default function GraphPage() {
  const docs = allDocs()
  const radius = Math.max(320, (docs.length / Math.PI) * 34)
  const nodes: GraphNode[] = docs.map((doc, index) => {
    const angle = (index / Math.max(docs.length, 1)) * Math.PI * 2
    return {
      id: doc.id,
      type: 'doc',
      position: {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
      },
      data: {
        label: doc.title,
        section: doc.section,
        category: doc.category,
        slug: doc.slug,
        topics: doc.topics.slice(0, 3),
        color: SECTION_COLORS[doc.section] ?? '#667085',
      },
    }
  })

  const edges: GraphEdge[] = uniqueSlugPairs().map((pair, index) => ({
    id: `edge-${index}`,
    source: `docs-${pair.from}`,
    target: `docs-${pair.to}`,
    animated: false,
  }))

  const legend = Object.entries(SECTION_COLORS).filter(([section]) =>
    docs.some((doc) => doc.section === section),
  )

  return <GraphView initialNodes={nodes} initialEdges={edges} legend={legend} />
}