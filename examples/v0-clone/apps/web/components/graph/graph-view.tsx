'use client'

import '@xyflow/react/dist/style.css'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'

export type GraphNode = Node<
  {
    label: string
    section: string
    category: string
    slug: string
    topics: string[]
    color: string
  },
  'doc'
>

export type GraphEdge = Edge

function DocNode({ data, selected }: NodeProps<GraphNode>) {
  return (
    <Link
      href={`/docs/${data.slug}`}
      draggable={false}
      onClick={(event) => event.stopPropagation()}
      className={`block w-44 rounded-xl border bg-card p-3 shadow-lg shadow-black/5 transition ${
        selected ? 'border-foreground/50' : 'border-border hover:border-foreground/30'
      }`}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <div
        className="mb-1.5 inline-flex max-w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white"
        style={{ backgroundColor: data.color }}
      >
        {data.section}
      </div>
      <p className="line-clamp-2 text-[13px] font-medium leading-5">{data.label}</p>
      {data.topics.length > 0 && (
        <p className="mt-1 line-clamp-1 text-[11px] text-muted-foreground">
          {data.topics.join(' · ')}
        </p>
      )}
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </Link>
  )
}

const nodeTypes = { doc: DocNode }

export function GraphView({
  initialNodes,
  initialEdges,
  legend,
}: {
  initialNodes: GraphNode[]
  initialEdges: GraphEdge[]
  legend: [string, string][]
}) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)
  const [filter, setFilter] = useState<string | null>(null)

  const filteredNodes = useMemo(() => {
    if (!filter) return nodes
    return nodes.filter((node) => node.data.section === filter)
  }, [nodes, filter])

  const visibleEdges = useMemo(() => {
    if (!filter) return edges
    const allowed = new Set(filteredNodes.map((node) => node.id))
    return edges.filter((edge) => allowed.has(edge.source) && allowed.has(edge.target))
  }, [edges, filteredNodes, filter])

  return (
    <main className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-7xl px-6 pt-8">
        <p className="text-xs text-muted-foreground">
          Graph generated from the indexed corpus
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Knowledge graph</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Nodes are indexed documentation pages; edges represent related and prerequisite links
          recorded in the official frontmatter.
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-wrap gap-2 px-6 py-4">
        {legend.map(([section, color]) => (
          <button
            key={section}
            type="button"
            onClick={() => setFilter(filter === section ? null : section)}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${
              filter === section
                ? 'border-foreground/40 bg-card'
                : 'border-border text-muted-foreground hover:bg-card'
            }`}
          >
            <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
            {section}
          </button>
        ))}
      </div>
      <div className="h-[68vh] w-full overflow-hidden">
        <ReactFlow
          nodes={filteredNodes}
          edges={visibleEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.15}
          defaultEdgeOptions={{ style: { stroke: '#8b93a7', strokeWidth: 1 } }}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} />
          <Controls />
          <MiniMap pannable zoomable className="!bg-card" />
        </ReactFlow>
      </div>
    </main>
  )
}