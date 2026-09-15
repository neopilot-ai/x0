---
title: Instructions
description: Custom instructions and prompting
product: v0
type: guide
---

# Instructions

Add custom instructions to guide v0's code generation. Use instructions to provide system-level context, coding standards, and framework requirements.

## Setting Instructions

Provide system-level context for your project using `systemPrompt` in `v0.chats.createStream()`:

```typescript
import { v0 } from 'v0'

const result = await v0.chats.createStream({
  message: 'Build a todo app',
  systemPrompt: 'Use Next.js 14 with App Router and TypeScript',
})
```

## InstructionsManager

Use the `InstructionsManager` to create and manage instruction configurations with rules and templates.

```typescript
import { createInstructionsManager, INSTRUCTION_TEMPLATES } from 'v0'

const manager = createInstructionsManager({
  systemPrompt: 'Use Next.js 14 with App Router and TypeScript',
  framework: 'next.js',
  style: 'shadcn/ui',
  conventions: ['use client components', 'use server actions'],
  constraints: ['no external libraries', 'use TypeScript strict mode'],
})

// Add a custom rule
manager.addRule({
  id: 'no-any',
  pattern: 'any',
  instruction: 'Avoid using the `any` type. Use proper TypeScript types instead.',
  priority: 10,
})

// Get effective prompt
const prompt = manager.getEffectivePrompt('Build a todo app')
```

## Instruction Templates

Use predefined instruction templates for common project types:

| Template | ID | Description |
|----------|-----|-------------|
| Next.js App | `nextjs-app` | Next.js App Router with TypeScript and Tailwind |
| React Components | `react-components` | React components with shadcn/ui |
| Full-Stack App | `fullstack-app` | Full-stack application with backend |
| Data Dashboard | `data-dashboard` | Dashboard with data visualization |
| E-commerce Store | `ecommerce` | E-commerce storefront with Stripe |

```typescript
import { INSTRUCTION_TEMPLATES } from 'v0'

const nextjsTemplate = INSTRUCTION_TEMPLATES.find(t => t.id === 'nextjs-app')
const manager = createInstructionsManager({
  systemPrompt: nextjsTemplate.systemPrompt,
  framework: 'next.js',
})
```

## Instruction Rules

Instruction rules are applied in priority order. Rules with higher priority are applied first.

```typescript
interface InstructionRule {
  id: string
  pattern: string
  instruction: string
  priority: number
}

manager.addRule({
  id: 'no-console',
  pattern: 'console.log',
  instruction: 'Remove console.log statements.',
  priority: 5,
})
```

## Validation

`validateConfig()` checks the instruction configuration for errors:

```typescript
const errors = manager.validateConfig({
  systemPrompt: 'Build a todo app',
  framework: 'next.js',
})
// Returns null if valid, or array of error strings
```

Validation checks:

- `systemPrompt` is required
- `systemPrompt` must be less than 10000 characters
- `framework` must be one of: `next.js`, `react`, `vue`, `angular`, `svelte`

## Best Practices

- Keep instructions concise and specific
- Include framework and version requirements
- Specify coding standards and conventions
- Use instruction templates for common project types
- Add custom rules for project-specific patterns

## See Also

- [createInstructionsManager](/docs/api/v2/guides/browser-entry)
- [INSTRUCTION_TEMPLATES](/docs/api/v2/guides/browser-entry)
- [systemPrompt parameter](/docs/api/v2/reference/chats/create-chat)
