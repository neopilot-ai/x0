---
title: @v0-sdk/ai-tools
description: AI SDK tools for the v0 API
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v1/adapters/ai-tools
  - /docs/api/v1/packages/v0-sdk
---

# @v0-sdk/ai-tools



AI SDK tools that enable autonomous agents to interact with the v0 API. Build intelligent workflows that can create projects, manage chats, handle deployments, and more.

## Installation

```bash
npm install @v0-sdk/ai-tools ai
# or
pnpm add @v0-sdk/ai-tools ai
# or
yarn add @v0-sdk/ai-tools ai
```

## Quick Start

```typescript
import { generateText } from 'ai'
import { v0Tools } from '@v0-sdk/ai-tools'

const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Create a new React todo app project',
  tools: v0Tools({
    apiKey: process.env.V0_API_KEY,
  }),
})

console.log(result.text)
```

## Tool Categories

### All Tools (High Context)

Use all available tools for maximum capability:

```typescript
import { v0Tools } from '@v0-sdk/ai-tools'

const tools = v0Tools({
  apiKey: process.env.V0_API_KEY,
})

const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Build a complete web app with deployment',
  tools,
})
```

⚠️ **Note**: Includes 20+ tools which adds significant context to AI calls.

### Selective Tools (Recommended)

Choose specific tool categories for better performance:

```typescript
import { v0ToolsByCategory } from '@v0-sdk/ai-tools'

const tools = v0ToolsByCategory({
  apiKey: process.env.V0_API_KEY,
})

const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Create a new project and start a chat',
  tools: {
    ...tools.project, // Project management tools
    ...tools.chat, // Chat tools
  },
})
```

## Available Tool Categories

### Chat Tools

```typescript
const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Create a chat about building a landing page',
  tools: tools.chat,
})
```

**Available tools:**

* `createChat` - Create new chats
* `sendMessage` - Send messages to chats
* `getChat` - Retrieve chat details
* `findChats` - List user chats
* `deleteChat` - Remove chats

### Project Tools

```typescript
const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Create a new project called "My Portfolio"',
  tools: tools.project,
})
```

**Available tools:**

* `createProject` - Create new projects
* `getProject` - Get project details
* `findProjects` - List projects
* `updateProject` - Modify projects
* `deleteProject` - Remove projects

### Deployment Tools

```typescript
const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Deploy the project and check its status',
  tools: tools.deployment,
})
```

**Available tools:**

* `createDeployment` - Deploy projects
* `getDeployment` - Check deployment status
* `findDeployments` - List deployments
* `getDeploymentLogs` - View deployment logs
* `getDeploymentErrors` - Check for errors

### User Tools

```typescript
const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Check my account information and billing status',
  tools: tools.user,
})
```

**Available tools:**

* `getUser` - Get user information
* `getUserBilling` - Check billing details
* `getUserPlan` - View subscription plan
* `getUserScopes` - Check permissions

### Hook Tools

```typescript
const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Set up a webhook for deployment notifications',
  tools: tools.hook,
})
```

**Available tools:**

* `createHook` - Create webhooks
* `getHook` - Get webhook details
* `findHooks` - List webhooks
* `updateHook` - Modify webhooks
* `deleteHook` - Remove webhooks

## Agent Patterns

### Multi-Step Agent

```typescript
import { generateText, stopWhen, stepCountIs } from 'ai'

const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Build and deploy a complete todo app',
  tools: {
    ...tools.project,
    ...tools.chat,
    ...tools.deployment,
  },
  stopWhen: stepCountIs(5), // Limit execution steps
})
```

### Sequential Processing

```typescript
// Step 1: Create project
const projectResult = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Create a new project for a todo app',
  tools: tools.project,
})

// Step 2: Start development chat
const chatResult = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: `Create a chat for project ${projectResult.toolResults[0].result.id}`,
  tools: tools.chat,
})

// Step 3: Deploy when ready
const deployResult = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Deploy the completed project',
  tools: tools.deployment,
})
```

### Routing Agent

```typescript
import { generateText } from 'ai'

const routingResult = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: userRequest,
  tools: {
    routeToProject: tool({
      description: 'Route to project management',
      parameters: z.object({
        action: z.string(),
      }),
    }),
    routeToChat: tool({
      description: 'Route to chat management',
      parameters: z.object({
        action: z.string(),
      }),
    }),
  },
})

// Use appropriate tools based on routing
const tools =
  routingResult.toolResults[0].toolName === 'routeToProject'
    ? tools.project
    : tools.chat
```

### Parallel Processing

```typescript
const [projectResult, userResult] = await Promise.all([
  generateText({
    model: openai('gpt-4o-mini'),
    prompt: 'Analyze my projects',
    tools: tools.project,
  }),
  generateText({
    model: openai('gpt-4o-mini'),
    prompt: 'Check my account status',
    tools: tools.user,
  }),
])
```

## Configuration

### Environment Variables

```bash
V0_API_KEY=your_v0_api_key_here
AI_GATEWAY_API_KEY=your_ai_gateway_api_key_here
```

### Custom Configuration

```typescript
const tools = v0ToolsByCategory({
  apiKey: process.env.V0_API_KEY,
  baseURL: 'https://api.v0.dev/v1', // Optional
  timeout: 30000, // Optional
})
```

## Error Handling

```typescript
try {
  const result = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: 'Create a project',
    tools: tools.project,
  })
} catch (error) {
  if (error.name === 'V0Error') {
    console.error('v0 API error:', error.message)
  } else if (error.name === 'AIError') {
    console.error('AI SDK error:', error.message)
  } else {
    console.error('Unexpected error:', error)
  }
}
```

## Best Practices

1. **Use selective tools** - Only include categories you need
2. **Set step limits** - Use `stopWhen` to control execution
3. **Handle errors** - Wrap calls in try-catch blocks
4. **Monitor usage** - Track API calls and costs
5. **Test incrementally** - Start with simple workflows

## Requirements

* Node.js 22+
* AI SDK 5.0+
* v0 API key from [v0 settings](https://v0.app/settings/keys)

## Links

* [GitHub Repository](https://github.com/vercel/v0-sdk/tree/main/packages/ai-tools)
* [npm Package](https://www.npmjs.com/package/@v0-sdk/ai-tools)
* [AI Tools Example](/docs/api/v1/examples/ai-tools)


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)