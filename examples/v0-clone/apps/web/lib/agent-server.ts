import 'server-only'

import { ToolLoopAgent, isStepCount, tool } from 'ai'
import { z } from 'zod'
import { buildContext, retrieve, sourcesFrom } from '@/lib/assistant'
import { getDocBySlug } from '@/lib/docs-store'

export const agentRequestSchema = z.object({
  prompt: z.string().trim().min(1).max(4000),
  roles: z.array(z.enum(['coordinator', 'researcher', 'planner', 'designer', 'reviewer'])).min(1).max(5).default(['coordinator', 'researcher']),
  planOnly: z.boolean().default(false),
})

const searchDocsTool = tool({
  description: 'Search the indexed official v0 documentation. Use this before answering documentation questions.',
  inputSchema: z.object({ query: z.string().min(1).max(240) }),
  execute: async ({ query }) => {
    const hits = retrieve(query, 6)
    return { query, hits: sourcesFrom(hits), context: buildContext(hits).slice(0, 12000) }
  },
})

const readDocTool = tool({
  description: 'Read one indexed official v0 document by slug.',
  inputSchema: z.object({ slug: z.string().min(1).max(180) }),
  execute: async ({ slug }) => {
    const doc = getDocBySlug(slug)
    if (!doc) return { slug, found: false, content: '' }
    return { slug, found: true, title: doc.title, sourceUrl: doc.sourceUrl, content: doc.content.slice(0, 8000) }
  },
})

const inspectWorkspaceTool = tool({
  description: 'Inspect public demo workspace metadata. This is read-only and never returns secrets or file contents.',
  inputSchema: z.object({ area: z.enum(['project', 'files', 'checks']).default('project') }),
  execute: async ({ area }) => ({ area, project: 'x0 public demo', capabilities: ['docs retrieval', 'plan generation', 'design review', 'read-only checks'], safety: 'No file writes, shell execution, credentials, or deployment actions are exposed.' }),
})

const planChangeTool = tool({
  description: 'Create a safe implementation plan without changing files.',
  inputSchema: z.object({ request: z.string().min(1).max(1200), constraints: z.array(z.string()).max(8).default([]) }),
  execute: async ({ request, constraints }) => ({ title: `Plan: ${request.slice(0, 72)}`, steps: ['Clarify the user-facing outcome and acceptance criteria.', 'Inspect the smallest relevant surface area and existing patterns.', 'Implement the UI and server boundary with safe, typed inputs.', 'Run typecheck, formatting, and primary interaction checks.'], constraints, readOnly: true }),
})

function modelId() {
  return process.env.AI_GATEWAY_MODEL || 'openai/gpt-oss-120b'
}

export function createCoordinatorAgent() {
  return new ToolLoopAgent({
    model: modelId(),
    instructions: 'You are the coordinator for a public multi-agent builder. Use only the provided read-only tools. Explain which specialist roles contributed, cite official docs when using them, and never claim files were changed. Keep answers concise and actionable.',
    tools: { searchDocs: searchDocsTool, readDoc: readDocTool, inspectWorkspace: inspectWorkspaceTool, planChange: planChangeTool },
    stopWhen: isStepCount(6),
  })
}
