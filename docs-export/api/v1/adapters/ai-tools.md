---
title: AI Tools
description: Integrate v0 API with AI SDK to build autonomous agents and intelligent workflows
product: v0 API
type: integration
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v1/packages/ai-tools
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.
# AI Tools



The AI Tools adapter enables AI agents to interact with the v0 API through the AI SDK, allowing for autonomous workflows, intelligent code generation, and automated project management.

## Overview

The AI Tools adapter provides:

* **Autonomous Agents**: AI agents that can independently manage v0 projects
* **Intelligent Workflows**: Multi-step processes with AI decision-making
* **Tool Integration**: Seamless integration with popular AI frameworks
* **Context-Aware Operations**: AI agents understand project context and requirements

## Supported AI Frameworks

### AI SDK (Vercel)

The primary integration for building AI agents with v0 capabilities:

```typescript
import { generateText } from 'ai'
import { v0Tools } from '@v0-sdk/ai-tools'

const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Create a React dashboard with charts',
  tools: v0Tools({
    apiKey: process.env.V0_API_KEY,
  }),
})
```

### LangChain

Integration with LangChain for complex agent workflows:

```typescript
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { V0Tools } from '@v0-sdk/langchain-tools'

const model = new ChatOpenAI({
  modelName: 'gpt-4o-mini',
})

const tools = new V0Tools({
  apiKey: process.env.V0_API_KEY,
})

const agent = createReactAgent({
  llm: model,
  tools: tools.getTools(),
})
```

### OpenAI Functions

Direct integration with OpenAI's function calling:

```typescript
import OpenAI from 'openai'
import { v0FunctionDefinitions } from '@v0-sdk/openai-functions'

const openai = new OpenAI()

const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'user',
      content: 'Build a todo app with React and deploy it',
    },
  ],
  functions: v0FunctionDefinitions,
  function_call: 'auto',
})
```

## Installation

```bash
npm install @v0-sdk/ai-tools ai
# or
pnpm add @v0-sdk/ai-tools ai
```

For specific frameworks:

```bash
# LangChain integration
npm install @v0-sdk/langchain-tools langchain

# OpenAI Functions
npm install @v0-sdk/openai-functions openai
```

## Configuration

### Environment Variables

```bash
V0_API_KEY=your_v0_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
# or
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### Tool Categories

Choose specific tool categories for better performance:

```typescript
import { v0ToolsByCategory } from '@v0-sdk/ai-tools'

const tools = v0ToolsByCategory({
  apiKey: process.env.V0_API_KEY,
})

// Use specific categories
const projectAndChatTools = {
  ...tools.project,
  ...tools.chat,
}
```

## Agent Patterns

### Project Creation Agent

```typescript
const projectAgent = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: `
    Create a new project for a React e-commerce website.
    The project should include:
    - Product catalog
    - Shopping cart
    - Checkout process
    - User authentication
  `,
  tools: {
    ...tools.project,
    ...tools.chat,
  },
})
```

### Development Workflow Agent

```typescript
const developmentAgent = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: `
    I need to:
    1. Create a new project
    2. Start a development chat
    3. Build the initial components
    4. Deploy when ready

    Project: Personal portfolio website with blog
  `,
  tools: v0Tools({
    apiKey: process.env.V0_API_KEY,
  }),
  stopWhen: stepCountIs(10),
})
```

### Deployment Management Agent

```typescript
const deploymentAgent = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Deploy project xyz123 and monitor its status',
  tools: {
    ...tools.deployment,
    ...tools.project,
  },
})
```

## Advanced Workflows

### Multi-Agent Collaboration

```typescript
// Project Manager Agent
const projectManager = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Plan and create a new SaaS dashboard project',
  tools: tools.project,
})

// Development Agent
const developer = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: `Build the dashboard components for project ${projectId}`,
  tools: tools.chat,
})

// DevOps Agent
const devops = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: `Deploy and monitor project ${projectId}`,
  tools: tools.deployment,
})
```

### Conditional Logic

```typescript
const smartAgent = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: `
    Check if project "my-app" exists.
    If it exists, add a new feature.
    If it doesn't exist, create it first.
  `,
  tools: v0Tools({
    apiKey: process.env.V0_API_KEY,
  }),
})
```

### Error Recovery

```typescript
try {
  const result = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: 'Deploy the latest version of my project',
    tools: tools.deployment,
  })
} catch (error) {
  // Retry with error context
  const recovery = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: `
      Previous deployment failed with error: ${error.message}
      Please diagnose and fix the issue, then retry deployment.
    `,
    tools: {
      ...tools.deployment,
      ...tools.project,
    },
  })
}
```

## Best Practices

### 1. Use Selective Tools

Only include the tool categories you need:

```typescript
// Good: Specific tools for the task
const tools = {
  ...toolsByCategory.project,
  ...toolsByCategory.chat,
}

// Avoid: All tools (high context overhead)
const allTools = v0Tools({ apiKey })
```

### 2. Set Execution Limits

Control agent execution with step limits:

```typescript
const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Build and deploy a complete app',
  tools: v0Tools({ apiKey }),
  stopWhen: stepCountIs(15), // Prevent infinite loops
})
```

### 3. Handle Errors Gracefully

```typescript
const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Create a project',
  tools: tools.project,
  onError: (error) => {
    console.error('Agent error:', error)
    // Implement recovery logic
  },
})
```

### 4. Monitor Usage

Track API calls and costs:

```typescript
let apiCallCount = 0

const monitoredTools = v0Tools({
  apiKey: process.env.V0_API_KEY,
  onApiCall: (endpoint, cost) => {
    apiCallCount++
    console.log(`API call ${apiCallCount}: ${endpoint} (cost: ${cost})`)
  },
})
```

## Troubleshooting

### Common Issues

**"Tool not found"**

* Ensure you're using the correct tool category
* Check that the tool is included in your tools object

**"Rate limit exceeded"**

* Implement delays between API calls
* Use selective tools to reduce call frequency

**"Invalid API key"**

* Verify your v0 API key is correctly set
* Check API key permissions and scope

**"Agent stuck in loop"**

* Use `stopWhen` conditions to limit execution
* Add explicit termination criteria in prompts

## Examples

See the complete [AI Tools Example](/docs/api/v1/examples/ai-tools) for detailed implementation examples and agent patterns.

## Requirements

* Node.js 22+
* AI SDK 5.0+ or compatible AI framework
* v0 API key from [v0 settings](https://v0.app/settings/keys)

## Links

* [AI Tools Package](/docs/api/v1/packages/ai-tools)
* [AI Tools Example](/docs/api/v1/examples/ai-tools)
* [GitHub Repository](https://github.com/vercel/v0-sdk/tree/main/packages/ai-tools)


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)