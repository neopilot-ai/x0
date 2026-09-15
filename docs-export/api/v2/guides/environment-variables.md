---
title: Environment Variables
description: Add environment variables to a v0 chat
product: v0 API
type: guide
related:
  - /docs/api/v2/guides/handling-integrations
  - /docs/api/v2/reference/chats/create-vercel-project
  - /docs/api/v2/reference/chats/get-chat
---

# Environment Variables



v0 uses your Vercel project's environment variables when generating code. The setup is:

1. Ensure the chat has a Vercel project attached.
2. Add environment variables using the Vercel API.
3. v0 automatically uses those variables when generating code.

## 1. Ensure the chat has a Vercel project

Environment variables are stored on Vercel projects. Before adding them, make sure the chat has a `vercelProjectId`.

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0'

const chatResult = await v0.chats.get({
  chatId: 'chat_123',
})

if (chatResult.error) throw new Error(chatResult.error.message)

let vercelProjectId = chatResult.data.vercelProjectId

if (!vercelProjectId) {
  const projectResult = await v0.chats.createVercelProject({
    chatId: 'chat_123',
  })

  if (projectResult.error) throw new Error(projectResult.error.message)
  vercelProjectId = projectResult.data.vercelProjectId
}`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`# Check if the chat has a Vercel project
curl -X GET "https://api.v0.dev/v2/chats/chat_123" \\
  -H "Authorization: Bearer $V0_API_KEY"

# If vercelProjectId is missing, create one
curl -X POST "https://api.v0.dev/v2/chats/chat_123/vercel-project" \\
  -H "Authorization: Bearer $V0_API_KEY" \\
  -H "Content-Type: application/json"`}
  />
</CustomCodeBlock>

For more details, see [Create Vercel Project](/docs/api/v2/reference/chats/create-vercel-project).

## 2. Add environment variables with the Vercel API

Use the Vercel API to add environment variables to the project. This step happens outside the v0 API.

```typescript
// Add environment variables to the Vercel project
await fetch(
  `https://api.vercel.com/v10/projects/${vercelProjectId}/env`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: "DATABASE_URL",
      value: "postgresql://user:pass@host:5432/db",
      type: "encrypted",
      target: ["production", "preview", "development"],
    }),
  }
)
```

For the full Vercel API reference, see [Environment Variables](https://vercel.com/docs/rest-api/projects/create-one-or-more-environment-variables).

<Callout type="warn">
  **Sensitive variables**: v0 runs in the development environment. Vercel does not expose sensitive environment variables to the development environment, so avoid using the sensitive type for variables that v0 needs to access.
</Callout>

## 3. v0 uses the variables automatically

Once environment variables are added to the Vercel project, v0 can access them when generating code in that chat. The assistant sees which variables are available and generates code that references them.

For example, if you add `DATABASE_URL` and then prompt v0 to build a database-connected app, the generated code will use `process.env.DATABASE_URL` automatically.

<Callout type="info">
  **When changes take effect**: v0 reads environment variables from the Vercel project when it generates code. After adding, updating, or removing variables, sending a message will make the changes take effect in the chat and its preview.
</Callout>

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0'

// After adding DATABASE_URL to the Vercel project...
const result = await v0.messages.send({
  chatId: 'chat_123',
  message: 'Add a Postgres database connection using the DATABASE_URL',
})

if (result.error) throw new Error(result.error.message)

// v0 generates code that uses process.env.DATABASE_URL`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`# After adding DATABASE_URL to the Vercel project...
curl -X POST "https://api.v0.dev/v2/chats/chat_123/messages" \\
  -H "Authorization: Bearer $V0_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Add a Postgres database connection using the DATABASE_URL"
  }'`}
  />
</CustomCodeBlock>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)