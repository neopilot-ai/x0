---
title: Agentic Features
description: Autonomous agent capabilities
product: v0
type: guide
---

# Agentic Features

v0 includes autonomous agent capabilities for web search, site inspection, error fixing, and external tool integration. These features are powered by the agentic engine that extends the base code generation model with specialized capabilities.

## Web Search

The agent can search the web to gather information for your projects. When prompted with a topic that benefits from current information, v0 can perform web searches to find relevant data, documentation, and examples.

**Enabling web search:**

```typescript
import { v0 } from 'v0'

const result = await v0.chats.create({
  message: 'Find the latest React patterns and build a component',
  tools: ['web-search'],
})
```

**Web search capabilities:**

- Search the web for current information
- Find documentation and examples
- Gather data for data-driven applications
- Stay up to date with the latest technologies

## Site Inspection

The agent can inspect running applications to understand their structure. This capability allows v0 to analyze existing websites and applications to understand their architecture, components, and patterns.

**Enabling site inspection:**

```typescript
const result = await v0.chats.create({
  message: 'Inspect this website and recreate the layout',
  tools: ['site-inspection'],
})
```

**Site inspection capabilities:**

- Analyze running applications
- Understand website architecture
- Extract component patterns
- Recreate layouts and designs

## Error Fixing

v0 automatically diagnoses and fixes errors in generated code with intelligent diagnostics. When code contains errors, the agent can identify the issue and apply fixes.

**Enabling error fixing:**

```typescript
const result = await v0.chats.create({
  message: 'Build a todo app',
  tools: ['error-fixing'],
})
```

**Error fixing capabilities:**

- Diagnose code errors automatically
- Apply intelligent fixes
- Identify common patterns
- Provide detailed error explanations

## External Tool Integration

Connect external tools and MCP servers to extend the agent's capabilities beyond code generation. Use MCP servers to add specialized tools for databases, APIs, and services.

**Enabling external tools:**

```typescript
import { v0 } from 'v0'

const result = await v0.mcpServers.create({
  name: 'Database MCP',
  url: 'https://mcp.database.example.com',
  auth: { type: 'none' },
  scope: 'team',
})

const chat = await v0.chats.create({
  message: 'Query the database and show results',
  mcpServerIds: ['mcp_abc123'],
})
```

**External tool capabilities:**

- MCP server integration
- Database queries
- API calls
- Custom tool integration

## Combining Features

You can combine multiple agentic features in a single chat:

```typescript
const result = await v0.chats.create({
  message: 'Build a full-stack app with live data',
  tools: ['web-search', 'site-inspection', 'error-fixing'],
  mcpServerIds: ['mcp_abc123'],
})
```

## See Also

- [MCP Servers](/docs/api/v2/reference/mcp-servers)
- [Tools parameter](/docs/api/v2/reference/chats/create-chat)
