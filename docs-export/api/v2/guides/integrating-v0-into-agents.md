---
title: Integrate v0 with AI Agents
description: Give your agents v0's app-building capabilities
product: v0 API
type: guide
related:
  - /docs/api/v2/guides/mcp-server
  - /docs/api/v2/reference/chats/create-chat
  - /docs/api/v2/reference/messages/send-message
---

# Integrate v0 with AI Agents



v0 can act as a specialized app-building agent inside a larger agentic workflow. Your agent can delegate a build to v0, continue iterating in the same chat, resolve questions or approvals, and retrieve a preview or deployment when the app is ready.

You can add v0 to an agent in three ways:

| Integration                                         | Best for                                                     | Authentication |
| --------------------------------------------------- | ------------------------------------------------------------ | -------------- |
| [MCP](#use-the-v0-mcp-server)                       | MCP-compatible agent platforms, IDEs, and desktop assistants | OAuth          |
| [AI SDK tools](#use-v0-tools-with-ai-sdk)           | TypeScript agents built with AI SDK                          | v0 API key     |
| [Eve OpenAPI connection](#use-v0-from-an-eve-agent) | Durable agents built with [Eve](https://eve.dev)             | v0 API key     |

<Callout type="info">
  This guide covers using v0 as a tool from your agent. To give v0 access to another service's tools instead, [create an MCP server](/docs/api/v2/reference/mcp-servers/create-mcp-server) for the chat.
</Callout>

## Use the v0 MCP server

MCP is the fastest option when your agent platform supports remote MCP servers. The platform discovers v0's tools, handles their input schemas, and lets the model decide when to call them.

Add the v0 remote MCP server to your client:

```json
{
  "mcpServers": {
    "v0": {
      "url": "https://v0.app/api/mcp"
    }
  }
}
```

The first connection starts an OAuth flow. Sign in to v0, choose the account or team the agent should use, and approve the connection. Do not add a v0 API key to the MCP configuration.

You can then give the agent a task such as:

```txt
Use v0 to build a responsive customer analytics dashboard. Return the v0 chat URL and a preview URL when it is ready.
```

The MCP server exposes tools for creating and finding chats, reading and sending messages, resolving pending tasks, and getting preview URLs. See the [v0 MCP Server guide](/docs/api/v2/guides/mcp-server) for stdio configuration, available tools, and troubleshooting.

## Use v0 tools with AI SDK

Use `@v0-sdk/ai-tools` when you are building a TypeScript agent with the [AI SDK](https://ai-sdk.dev). The package generates AI SDK tools from the same OpenAPI specification as the `v0` SDK, so tool inputs and operations stay aligned with the v0 API.

Install the tools package, AI SDK, and your model provider:

```bash
pnpm add @v0-sdk/ai-tools ai @ai-sdk/openai
```

Set your v0 API key in the server environment:

```bash
V0_API_KEY=your_v0_api_key
```

Create only the tool categories the agent needs:

```typescript
import { openai } from '@ai-sdk/openai'
import { generateText, stepCountIs } from 'ai'
import { v0ToolsByCategory } from '@v0-sdk/ai-tools'

const { chats, messages } = v0ToolsByCategory()

const result = await generateText({
  model: openai('gpt-5.5'),
  system: `You are an app-building orchestrator.
Use v0 for creating and modifying web apps.
Continue an existing v0 chat when a chat ID is available.`,
  prompt: 'Build a responsive customer analytics dashboard with charts.',
  tools: {
    ...chats,
    ...messages,
  },
  stopWhen: stepCountIs(10),
})

console.log(result.text)
```

`v0ToolsByCategory()` reads `V0_API_KEY` by default. You can also pass client configuration directly:

```typescript
const tools = v0ToolsByCategory({
  auth: process.env.V0_API_KEY,
})
```

The available categories are `chats`, `messages`, `mcpServers`, and `webhooks`. Tool keys use canonical operation names, such as `chatsCreate`, `messagesSend`, and `chatsGetPreview`.

Use `v0Tools()` if the agent needs every operation. For most agents, selecting categories reduces model context and limits the actions the agent can take.

## Use v0 from an Eve agent

[Eve](https://eve.dev) can turn the v0 OpenAPI specification into tools for a durable agent. Define one connection file and Eve will fetch the specification, derive a typed tool for each allowed operation, attach the v0 API key at execution time, and keep the credential out of model context.

If you do not have an Eve project yet, create one:

```bash
npx eve@latest init my-agent
```

Add a v0 API key from [v0 settings](https://v0.app/settings/keys) to the agent's server environment:

```bash
V0_API_KEY=your_v0_api_key
```

Create `agent/connections/v0.ts`:

```typescript
import { defineOpenAPIConnection } from 'eve/connections'

export default defineOpenAPIConnection({
  spec: 'https://api.v0.dev/v2/openapi/json',
  baseUrl: 'https://api.v0.dev/v2',
  description:
    'Build and iterate on web apps with v0. Reuse one v0 chat per app-building task.',
  auth: {
    getToken: async () => ({ token: process.env.V0_API_KEY! }),
  },
  operations: {
    allow: [
      'chats_create',
      'messages_send',
      'messages_resolve',
      'chats_getPreview',
    ],
  },
})
```

The filename registers the connection as `v0`. Eve replaces unsupported characters in OpenAPI operation IDs, so `chats.create` becomes `chats_create`. After discovery, the model can call qualified tools such as `v0__chats_create`, `v0__messages_send`, and `v0__chats_getPreview`.

Give the agent standing instructions in `agent/instructions.md`:

```md
# v0 app building

Use the v0 connection when the user asks you to build or modify a web app.

- Create one v0 chat for a new app-building task.
- Reuse the returned chat ID for every follow-up message.
- Resolve pending v0 tasks only from the user's answer or an explicit policy.
- Return the v0 chat and preview URLs when the result is ready.
```

Start the Eve development server and ask the agent to build an app:

```bash
npm run dev
```

```txt
Use v0 to build a responsive customer analytics dashboard. Return the v0 chat URL and a preview URL when it is ready.
```

Open **Agent Runs** in the Vercel dashboard to confirm that Eve discovered the `v0` connection and inspect its v0 tool calls. See [Eve's OpenAPI connections guide](https://eve.dev/docs/connections/openapi) for per-user credentials, custom headers, and operation filters.


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)