---
title: Handling Integrations
description: Learn how to handle integration requests and follow-up script permissions in the v0 API
product: v0 API
type: guide
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v1/reference/chats/resolve-task
  - /docs/api/v1/reference/chats/get-by-id
  - /docs/api/v1/reference/chats/get-message
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# Handling Integrations

Learn how to handle integration requests when a v0 chat pauses and needs input from your app. The short version is:

1. Prompt the agent.
2. Inspect the latest assistant message and read the chat's `vercelProjectId`.
3. Install the integration with the Vercel API.
4. Confirm the install with `POST /v1/chats/{chatId}/tasks/resolve`.
5. Handle script permissions if the agent asks for them next.

This guide focuses on the integration flow. For the full task schema, see [Resolve Task](/docs/api/v1/reference/chats/resolve-task).

## 1. Prompt the agent

Start or continue a chat with a request that depends on an integration.

For example:

- "Build a waiting list app with Neon."
- "Create a dashboard that uses Supabase auth."

If the agent can continue without extra setup, it will. If it needs an integration, it will stop and ask your app to handle it.

## 2. Inspect the latest assistant message

When a chat is blocked on integration setup, inspect the latest assistant message first. The blocked task is exposed in `experimental_content` on:

- `GET /v1/chats/{chatId}`
- `GET /v1/chats/{chatId}/messages/{messageId}`

If you use `GET /v1/chats/{chatId}`, read the last assistant message in the `messages` array. Chat messages are returned oldest to newest.

For integration requests, you will typically see an assistant message part with:

- stop reason `user-input-required`
- type `task-get-or-request-integration-v1`

Inside that message content, you'll usually see a request telling you which integration to install, such as `Neon` or `Supabase`.

The same `GET /v1/chats/{chatId}` response also includes `vercelProjectId` at the top level. You will need that value in the next step.

Use the latest blocked assistant message only. If you try to resolve an older task after the chat has moved on, `resolve-task` returns `409 Conflict`.

## 3. Install the integration with the Vercel API

Once you know which integration the assistant is asking for, install or connect it in Vercel.

Use the chat's `vercelProjectId` for the project-scoped Vercel API calls in this step. In the beta chat response types, `vercelProjectId` is the linked Vercel project ID. Do not use `projectId` here. `projectId` is the separate v0 project ID, and it is deprecated in the chat response.

```typescript
import { v0 } from 'v0-sdk'

const chat = await v0.chats.getById({
  chatId: '123',
})

if (!chat.vercelProjectId) {
  throw new Error('This chat is not linked to a Vercel project yet.')
}

const vercelProjectId = chat.vercelProjectId
```

This step happens outside the v0 API. The exact Vercel API calls depend on your integration flow, but these docs are the relevant starting points:

- [Create Integration Store Free and Paid Plans](https://vercel.com/docs/rest-api/integrations/create-integration-store-free-and-paid-plans)
- [Connect Integration Resource to Project](https://vercel.com/docs/rest-api/integrations/connect-integration-resource-to-project)

When you call the Vercel endpoint that connects a resource to a project, pass `vercelProjectId` from the chat.

After the integration is actually connected, return to the v0 chat and confirm it with `resolve-task`.

## 4. Confirm the install with `resolve-task`

Use `task.type: "confirmed-steps"` after the integration is installed. Pass the integration names exactly as the assistant requested them, such as `Neon` or `Supabase`.

```typescript
import { v0 } from 'v0-sdk'

await v0.chats.resolveTask({
  chatId: '123',
  task: {
    type: 'confirmed-steps',
    connectedIntegrationNames: ['Neon'],
  },
})
```

If you are rejecting the integration request instead of approving it, pass an empty array:

```json
{
  "task": {
    "type": "confirmed-steps",
    "connectedIntegrationNames": []
  }
}
```

You can also confirm other setup work with the same task type, including MCP presets, scripts, and environment variables.

## 5. Handle script permissions if needed

After the integration is connected, the assistant may ask for permission to run follow-up scripts, such as database setup or migrations.

When that happens, inspect the latest assistant message again. For permission requests, you will typically see:

- stop reason `permissions`
- a `suggestedPermissions` payload in the blocked assistant message

To approve the request, call `resolve-task` with `task.type: "confirmed-permissions"` and send back the `suggestedPermissions` objects from the latest blocked assistant message.

Pass the permission objects back unchanged. The submitted permissions must match the permissions currently pending on the latest blocked assistant message.

```json
{
  "task": {
    "type": "confirmed-permissions",
    "permissions": [
      {
        "type": "ALLOW_DYNAMIC_TOOL_STRICT",
        "toolName": "SystemAction",
        "input": {
          "systemAction": "executeScript",
          "executeScript": "/scripts/setup-db.sql"
        }
      }
    ]
  }
}
```

To reject the request, ignore the permission request and send any other follow-up message.

## Example Flow

Here is the full flow in plain English:

1. Your app prompts v0 to build something that needs Neon.
2. The assistant stops with `user-input-required` and asks for the Neon integration.
3. Your backend reads `vercelProjectId` from `GET /v1/chats/{chatId}` and uses that value in the Vercel API calls that connect Neon.
4. Your backend calls `POST /v1/chats/{chatId}/tasks/resolve` with `connectedIntegrationNames: ["Neon"]`.
5. The assistant resumes. If it needs to run a migration script, it stops again with `permissions`.
6. Your backend reads `suggestedPermissions` from the latest assistant message and sends them back with `confirmed-permissions`.

That is the complete pattern for handling integrations in the v0 API.

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
