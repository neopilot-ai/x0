---
title: Pre-Installed Agents
description: Pre-configured agents
product: v0
type: guide
---

# Pre-Installed Agents

v0 includes pre-configured agents for common tasks. Each agent has a specialized system prompt, tools, and configuration for a specific domain.

## Available Agents

Pre-installed agents provide specialized capabilities for different domains like data analysis, design, and development.

| Agent | ID | Description | Category | Tools |
|-------|-----|-------------|----------|-------|
| Code Generator | `code-generator` | Generates high-quality code from natural language descriptions | development | code-gen, code-review, debug |
| Designer | `designer` | Creates UI designs and visual layouts | design | design-gen, style-guide, color-palette |
| Data Analyst | `data-analyst` | Analyzes data and generates visualizations | data | data-query, visualization, report |
| Test Runner | `test-runner` | Creates and runs tests for generated code | testing | test-gen, test-run, test-coverage |
| Deployer | `deployer` | Deploys applications to Vercel | deployment | deploy, rollback, monitor |

## Using Pre-Installed Agents

Use the `AgentManager` to register, get, and manage agents. The `createAgentManager()` function creates a new agent manager instance.

```typescript
import { createAgentManager, PRE_INSTALLED_AGENTS } from 'v0'

const manager = createAgentManager()

// Register a pre-installed agent
const codeGenerator = PRE_INSTALLED_AGENTS.find(a => a.id === 'code-generator')
if (codeGenerator) {
  manager.register(codeGenerator)
}

// Get an agent
const agent = manager.get('code-generator')

// Get all agents
const agents = manager.getAll()

// Enable/disable agents
manager.enable('code-generator')
manager.disable('test-runner')
```

## Agent Configuration

Each agent has the following configuration:

- **`id`** — Unique identifier
- **`name`** — Display name
- **`type`** — Agent type (`code-generator`, `designer`, `data-analyst`, `test-runner`, `deployer`, `custom`)
- **`description`** — Description of the agent's capabilities
- **`enabled`** — Whether the agent is active
- **`config`** — Optional agent configuration
  - `systemPrompt` — Custom system prompt
  - `tools` — List of tools the agent can use
  - `modelId` — Model to use
  - `skills` — Skills to load
  - `mcpServerIds` — MCP server IDs

## Custom Agents

Create custom agents by defining their behavior and tools using `AgentManager.register()`.

```typescript
import { createAgentManager } from 'v0'

const manager = createAgentManager()

manager.register({
  id: 'custom-agent',
  name: 'Custom Agent',
  type: 'custom',
  description: 'A custom agent for specialized tasks',
  enabled: true,
  config: {
    systemPrompt: 'You are a specialized agent for...',
    tools: ['custom-tool'],
    skills: ['custom-skill'],
  },
})
```

## Agent Events

Agents emit events during execution:

- **`AgentAction`** — Represents an action taken by an agent
  - `agentId` — The agent that took the action
  - `type` — The action type
  - `data` — Action data
  - `timestamp` — When the action occurred
  - `status` — Action status (`pending`, `running`, `completed`, `failed`)

- **`AgentEvent`** — Represents an event in the agent lifecycle
  - `agentId` — The agent involved
  - `eventType` — The event type
  - `data` — Event data
  - `timestamp` — When the event occurred

## See Also

- [Agent types](/docs/agentic-features)
- [AgentManager](/docs/api/v2/guides/browser-entry)
