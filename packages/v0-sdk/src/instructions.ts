export interface InstructionsConfig {
  systemPrompt: string
  framework?: string
  style?: string
  conventions?: string[]
  constraints?: string[]
}

export interface InstructionRule {
  id: string
  pattern: string
  instruction: string
  priority: number
}

export interface InstructionsManager {
  config: InstructionsConfig
  rules: InstructionRule[]
  setConfig(config: Partial<InstructionsConfig>): void
  addRule(rule: InstructionRule): void
  removeRule(id: string): void
  getEffectivePrompt(basePrompt: string): string
  validateConfig(config: InstructionsConfig): string[] | null
}

export function createInstructionsManager(config: InstructionsConfig): InstructionsManager {
  const rules: InstructionRule[] = []

  return {
    config,
    rules,

    setConfig(update: Partial<InstructionsConfig>) {
      this.config = { ...this.config, ...update }
    },

    addRule(rule: InstructionRule) {
      rules.push(rule)
      rules.sort((a, b) => b.priority - a.priority)
    },

    removeRule(id: string) {
      const idx = rules.findIndex((r) => r.id === id)
      if (idx !== -1) rules.splice(idx, 1)
    },

    getEffectivePrompt(basePrompt: string) {
      let prompt = basePrompt
      for (const rule of rules) {
        if (typeof rule.pattern === "string" && basePrompt.includes(rule.pattern)) {
          prompt = `${rule.instruction}\n\n${prompt}`
        }
      }
      if (this.config.systemPrompt) {
        prompt = `${this.config.systemPrompt}\n\n${prompt}`
      }
      return prompt
    },

    validateConfig(config: InstructionsConfig) {
      const errors: string[] = []
      if (!config.systemPrompt) {
        errors.push('systemPrompt is required')
      }
      if (config.systemPrompt && config.systemPrompt.length > 10000) {
        errors.push('systemPrompt must be less than 10000 characters')
      }
      if (config.framework && !['next.js', 'react', 'vue', 'angular', 'svelte'].includes(config.framework)) {
        errors.push(`Unsupported framework: ${config.framework}`)
      }
      return errors.length > 0 ? errors : null
    },
  }
}

export interface InstructionSet {
  id: string
  name: string
  description: string
  systemPrompt: string
  framework: string
  createdAt: Date
}

export interface InstructionTemplate {
  id: string
  name: string
  description: string
  systemPrompt: string
  tags: string[]
}

export const INSTRUCTION_TEMPLATES: InstructionTemplate[] = [
  {
    id: 'nextjs-app',
    name: 'Next.js App',
    description: 'Next.js App Router with TypeScript and Tailwind',
    systemPrompt: 'Use Next.js 14 with App Router, TypeScript, and Tailwind CSS. Follow the App Router conventions.',
    tags: ['next.js', 'react', 'typescript', 'tailwind'],
  },
  {
    id: 'react-components',
    name: 'React Components',
    description: 'React components with shadcn/ui',
    systemPrompt: 'Create React components using shadcn/ui. Use TypeScript and follow React best practices.',
    tags: ['react', 'typescript', 'shadcn'],
  },
  {
    id: 'fullstack-app',
    name: 'Full-Stack App',
    description: 'Full-stack application with backend',
    systemPrompt: 'Create a full-stack application. Use Next.js for the frontend, Supabase/Neon for the database, and Vercel for deployment.',
    tags: ['next.js', 'fullstack', 'database', 'deployment'],
  },
  {
    id: 'data-dashboard',
    name: 'Data Dashboard',
    description: 'Dashboard with data visualization',
    systemPrompt: 'Create a data dashboard with charts, tables, and real-time data. Use Recharts or Chart.js for visualization.',
    tags: ['dashboard', 'data', 'charts', 'visualization'],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Store',
    description: 'E-commerce storefront with Stripe',
    systemPrompt: 'Create an e-commerce storefront with product listings, cart, and Stripe payment integration.',
    tags: ['ecommerce', 'stripe', 'payments', 'products'],
  },
]
