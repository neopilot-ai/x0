

export type AgentType = 'code-generator' | 'designer' | 'data-analyst' | 'test-runner' | 'deployer' | 'custom'

export interface Agent {
  id: string
  name: string
  type: AgentType
  description: string
  enabled: boolean
  createdAt: Date
  config?: AgentConfig
}

export interface AgentConfig {
  systemPrompt?: string
  tools?: string[]
  modelId?: string
  skills?: string[]
  mcpServerIds?: string[]
}

export interface AgentAction {
  agentId: string
  type: string
  data: Record<string, unknown>
  timestamp: Date
  status: 'pending' | 'running' | 'completed' | 'failed'
}

export interface AgentEvent {
  agentId: string
  eventType: string
  data: Record<string, unknown>
  timestamp: Date
}

export interface PreInstalledAgent {
  id: string
  name: string
  description: string
  category: string
  systemPrompt: string
  tools: string[]
  enabled: boolean
}

export interface AgentManager {
  agents: Map<string, Agent>
  register(agent: Agent): void
  get(id: string): Agent | undefined
  getAll(): Agent[]
  remove(id: string): boolean
  enable(id: string): void
  disable(id: string): void
}

export function createAgentManager(): AgentManager {
  const agents = new Map<string, Agent>()

  return {
    agents,

    register(agent: Agent) {
      agents.set(agent.id, agent)
    },

    get(id: string) {
      return agents.get(id)
    },

    getAll() {
      return Array.from(agents.values())
    },

    remove(id: string) {
      return agents.delete(id)
    },

    enable(id: string) {
      const agent = agents.get(id)
      if (agent) agent.enabled = true
    },

    disable(id: string) {
      const agent = agents.get(id)
      if (agent) agent.enabled = false
    },
  }
}

export const PRE_INSTALLED_AGENTS: PreInstalledAgent[] = [
  {
    id: 'code-generator',
    name: 'Code Generator',
    description: 'Generates high-quality code from natural language descriptions',
    category: 'development',
    systemPrompt: 'You are a code generation expert. Write clean, efficient, and well-documented code.',
    tools: ['code-gen', 'code-review', 'debug'],
    enabled: true,
  },
  {
    id: 'designer',
    name: 'Designer',
    description: 'Creates UI designs and visual layouts',
    category: 'design',
    systemPrompt: 'You are a design expert. Create beautiful, accessible, and responsive designs.',
    tools: ['design-gen', 'style-guide', 'color-palette'],
    enabled: true,
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    description: 'Analyzes data and generates visualizations',
    category: 'data',
    systemPrompt: 'You are a data analyst. Analyze datasets and create meaningful visualizations.',
    tools: ['data-query', 'visualization', 'report'],
    enabled: true,
  },
  {
    id: 'test-runner',
    name: 'Test Runner',
    description: 'Creates and runs tests for generated code',
    category: 'testing',
    systemPrompt: 'You are a testing expert. Write comprehensive tests for all generated code.',
    tools: ['test-gen', 'test-run', 'test-coverage'],
    enabled: true,
  },
  {
    id: 'deployer',
    name: 'Deployer',
    description: 'Deploys applications to Vercel',
    category: 'deployment',
    systemPrompt: 'You are a deployment expert. Deploy applications following best practices.',
    tools: ['deploy', 'rollback', 'monitor'],
    enabled: true,
  },
]

export interface AgentActionResult {
  agentId: string
  actionType: string
  success: boolean
  data?: Record<string, unknown>
  error?: Error
}

export interface AgentExecutor {
  execute(agentId: string, action: string, data: Record<string, unknown>): Promise<AgentActionResult>
  cancel(agentId: string): void
}
