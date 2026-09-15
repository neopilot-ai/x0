import { z } from 'zod'

export const agentRoles = [
  { id: 'coordinator', name: 'Coordinator', description: 'Routes the request and synthesizes the final answer.' },
  { id: 'researcher', name: 'Docs researcher', description: 'Retrieves official v0 documentation and citations.' },
  { id: 'planner', name: 'Code planner', description: 'Turns requirements into a safe implementation plan.' },
  { id: 'designer', name: 'Design reviewer', description: 'Reviews UX, accessibility, and responsive behavior.' },
  { id: 'reviewer', name: 'Test reviewer', description: 'Suggests validation and release checks.' },
] as const

export type AgentRoleId = (typeof agentRoles)[number]['id']

export const agentRequestSchema = z.object({
  prompt: z.string().trim().min(1).max(4000),
  roles: z.array(z.enum(['coordinator', 'researcher', 'planner', 'designer', 'reviewer'])).min(1).max(5).default(['coordinator', 'researcher']),
  planOnly: z.boolean().default(false),
})
