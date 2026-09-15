---
title: Migrating from v1 to v2
description: Understand the major v0 API v2 changes before migrating from v1
product: v0 API
type: guide
related:
  - /docs/api/v2/quickstart
  - /docs/api/v2/guides/environment-variables
  - /docs/api/v2/guides/resuming-streams
---

# Migrating from v1 to v2



## Base URL

Use `https://api.v0.dev/v2` for v0 API v2 requests. The existing `https://v0.app/api/v2` URL remains permanently supported, so changing hosts can be done independently from the v1-to-v2 resource migration.

## New API organization

v0 API v2 is organized around the resources your application renders and stores:

| Resource                | What it represents                                                         | Common endpoints                                                                                                                                                                                       |
| ----------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Chats                   | Workspaces with metadata, privacy, Vercel project links, and current files | [Create Chat](/docs/api/v2/reference/chats/create-chat), [Get Chat](/docs/api/v2/reference/chats/get-chat), [List Chats](/docs/api/v2/reference/chats/list-chats), [Update Chat](/docs/api/v2/reference/chats/update-chat) |
| Messages                | User and assistant exchanges, including the agent trace                    | [Send Message](/docs/api/v2/reference/messages/send-message), [List Messages](/docs/api/v2/reference/messages/list-messages), [Get Message](/docs/api/v2/reference/messages/get-message)                              |
| Files                   | The current source files in the VM-backed chat                             | [Get Chat Files](/docs/api/v2/reference/chats/get-chat-files), [Update Chat Files](/docs/api/v2/reference/chats/update-chat-files), [Download Chat Files](/docs/api/v2/reference/chats/download-chat-files)           |
| Previews and deployment | Preview access and production deployment for a chat                        | [Get Preview URL](/docs/api/v2/reference/chats/get-preview-url), [Create Vercel Project](/docs/api/v2/reference/chats/create-vercel-project), [Deploy Chat](/docs/api/v2/reference/chats/deploy-chat)                 |
| Tools and integrations  | MCP servers and webhooks available to chats                                | [MCP Servers](/docs/api/v2/reference/mcp-servers/list-mcp-servers), [Webhooks](/docs/api/v2/reference/webhooks/list-webhooks)                                                                                    |

Messages contain ordered `parts` such as text, thinking, file reads, file edits, searches, bash commands, tool calls, and agent actions. This lets clients render the full agent trace without treating versions as the source of truth.

<Callout type="info">
  Usage is now returned directly on chat and message responses. This gives you real-time usage data as work completes instead of requiring a separate usage endpoint query after the fact.
</Callout>

## What changed

### Projects are no longer the organizing layer

v0 Projects are deprecated. In v2, use:

* `metadata` on chats for project-like grouping, customer IDs, app IDs, favorite state, or internal routing.
* `vercelProjectId` for the Vercel project attached to a chat.
* The Vercel API for Vercel project operations such as environment variables, deployment lookup, deployment logs, and deletion.

### v2 chats run on VMs

v0 API v2 is built around VM-backed chats. VMs are more capable than the old browser-based next-lite runtime used in v1: they can run a fuller project environment, support richer file operations, and provide a more direct path to Vercel projects, previews, and deployments.

<Callout type="warning">
  **Breaking change**: v0 API v2 does not work with older v0 API v1 chats. We rebuilt v2 from the ground up to be compatible with more powerful primitives.
</Callout>

### Sync, async, and streaming have explicit endpoints

v1 supported synchronous, asynchronous, and streaming behavior through the same core endpoints. In v2, those modes are split into explicit endpoint variants for the main agent workflows:

* **Sync** endpoints block until the result is complete.
* **Async** endpoints return immediately and let you poll the message or chat.
* **Streaming** endpoints return Server-Sent Events so your UI can render progress as the agent thinks, edits files, uses tools, and reports usage.

Use streaming when you are building an interactive chat UI. Use async when your application triggers work in the background. Use sync when the caller can wait for the full result.

### Versions are gone

v1 exposed versions as a first-class API concept. v2 removes version resources to simplify the model:

* A **chat** is the durable workspace.
* **Messages** are the history of what happened.

This means you no longer need to choose between chat IDs, project IDs, and version IDs for common workflows. Most operations now come down to operating on the chat itself, or interacting with it through messages.

## Migrating existing v1 chats

Because v2 does not operate on v1 chats, migrate the underlying app state instead of the old chat record. This can be automated as long as your integration can choose the v1 chat version to carry forward.

1. Choose the v1 chat/version state you want to preserve.
2. Download that version as a ZIP with the v1 [Download Version](/docs/api/v1/reference/chats/download-version) endpoint.
3. Create a new v2 chat from that ZIP with [Create Chat From ZIP](/docs/api/v2/reference/chats/create-chat-from-zip).
4. Store the old v1 identifiers in v2 chat metadata if you need traceability.
5. Move future messages, previews, deployments, and file updates to the new v2 chat.

<Callout type="info">
  v0 API v2 imports ZIP archives by URL. Use an HTTPS URL for larger archives, or a base64 `data:application/zip` URL for smaller archives. The `Create Chat From ZIP` endpoint does not require a manual upload step, but it also does not accept multipart file uploads.
</Callout>

For smaller archives, download the v1 version ZIP and pass it to v2 as a data URL:

```typescript
import { v0 } from 'v0'

const v1ChatId = 'chat_123'
const v1VersionId = 'version_456'

const zipResponse = await fetch(
  `https://api.v0.dev/v1/chats/${v1ChatId}/versions/${v1VersionId}/download?format=zip&includeDefaultFiles=true`,
  {
    headers: {
      Authorization: `Bearer ${process.env.V0_API_KEY}`,
    },
  },
)

if (!zipResponse.ok) {
  throw new Error('Failed to download v1 version files')
}

const zipBuffer = Buffer.from(await zipResponse.arrayBuffer())
const zipDataUrl = `data:application/zip;base64,${zipBuffer.toString('base64')}`

const result = await v0.chats.createFromZip({
  url: zipDataUrl,
  metadata: {
    migratedFrom: 'v1',
    v1ChatId,
    v1VersionId,
  },
})

if (result.error) throw new Error(result.error.message)

console.log('Created v2 chat:', result.data.chat.id)
```

For larger archives, upload the downloaded ZIP to your storage provider and pass the resulting HTTPS URL as `url` instead of a data URL.

After creating the v2 chat, use [Send Message](/docs/api/v2/reference/messages/send-message) for new work.

## Replacing v1 concepts

### Replacing versions with chat state

In v2, the chat is the current app state. Most workflows that previously targeted a version now operate on the chat directly.

| v1 version workflow                | v2 replacement                                                     |
| ---------------------------------- | ------------------------------------------------------------------ |
| Get latest generated files         | [Get Chat Files](/docs/api/v2/reference/chats/get-chat-files)           |
| Download a version                 | [Download Chat Files](/docs/api/v2/reference/chats/download-chat-files) |
| Edit generated files directly      | [Update Chat Files](/docs/api/v2/reference/chats/update-chat-files)     |
| Restore a previous generated state | [Restore Message](/docs/api/v2/reference/chats/restore-message)         |

Messages are still important for history and provenance. Use message `parts` to inspect what happened, and use `Restore Message` when you need to move the chat's files back to the state associated with a previous message.

### Replacing projects with metadata

Use chat metadata for app-level organization.

```typescript
const createResult = await v0.chats.create({
  message: 'Create a sales dashboard',
  metadata: {
    workspaceId: 'workspace_123',
    appId: 'sales-dashboard',
  },
})

if (createResult.error) throw new Error(createResult.error.message)

const updateResult = await v0.chats.update({
  chatId: createResult.data.chat.id,
  metadata: {
    favorite: 'true',
  },
})

if (updateResult.error) throw new Error(updateResult.error.message)
```

Then use [List Chats](/docs/api/v2/reference/chats/list-chats) with metadata filters to build project-like views.

```typescript
const result = await v0.chats.list({
  metadata: {
    workspaceId: 'workspace_123',
  },
})

if (result.error) throw new Error(result.error.message)

console.log(result.data.chats)
```

Use metadata for grouping and attribution. Do not use metadata as an access-control boundary.

### Replacing environment variable workflows

Environment variables are attached to the Vercel project for a chat, not to a v0 Project.

1. Use [Get Chat](/docs/api/v2/reference/chats/get-chat) to read `vercelProjectId`.
2. If there is no `vercelProjectId`, call [Create Vercel Project](/docs/api/v2/reference/chats/create-vercel-project).
3. Use the Vercel API to manage environment variables on that project.

For a complete walkthrough, see [Environment Variables](/docs/api/v2/guides/environment-variables).

### Replacing deployment workflows

Use [Deploy Chat](/docs/api/v2/reference/chats/deploy-chat) to deploy the current state of a chat.

```typescript
const result = await v0.chats.deploy({
  chatId: 'chat_abc123',
})

if (result.error) throw new Error(result.error.message)

console.log('Deployment:', result.data)
```

For deployment lookup, logs, errors, and deletion, read the chat's `vercelProjectId` with [Get Chat](/docs/api/v2/reference/chats/get-chat), then use the [Vercel Deployments API](https://vercel.com/docs/rest-api/reference/endpoints/deployments/list-deployments).

## Adding streaming to your UI

If your v1 integration already used streaming, migrate that workflow to the dedicated v2 streaming endpoint for the action. If it waited for a completed response, you can start with v2 sync endpoints and move to streaming when your UI is ready to render progress events.

On the server, forward the stream with `toResponse()`:

```typescript
// app/api/generate/route.ts
import { v0 } from 'v0'

export async function POST(request: Request) {
  const { chatId, message } = await request.json()
  const result = await v0.messages.sendStream({ chatId, message })
  return result.toResponse()
}
```

On the client, wrap the response with `readV0Stream`. It reconstructs each snapshot for you, so `update.parts` is always the full, current state — no `jsondiffpatch` deltas to merge.

```typescript
import { readV0Stream } from 'v0/browser'

const response = fetch('/api/generate', {
  method: 'POST',
  body: JSON.stringify({ chatId, message }),
})
const result = readV0Stream(response)

for await (const update of result.stream) {
  renderParts(update.parts)
}
```

## Endpoint mapping

| v1 workflow                             | v2 workflow                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create a chat                           | [Create Chat](/docs/api/v2/reference/chats/create-chat), [Create Chat From Files](/docs/api/v2/reference/chats/create-chat-from-files), [Create Chat From ZIP](/docs/api/v2/reference/chats/create-chat-from-zip), [Create Chat From Repository](/docs/api/v2/reference/chats/create-chat-from-repository), [Create Chat Streaming](/docs/api/v2/reference/chats/create-chat-streaming), or [Create Chat Async](/docs/api/v2/reference/chats/create-chat-async) |
| Send a message                          | [Send Message](/docs/api/v2/reference/messages/send-message), [Send Message Streaming](/docs/api/v2/reference/messages/send-message-streaming), or [Send Message Async](/docs/api/v2/reference/messages/send-message-async)                                                                                                                                                                                                                      |
| Resume a stream                         | [Resume Chat Stream](/docs/api/v2/reference/chats/resume-chat-stream)                                                                                                                                                                                                                                                                                                                                                                  |
| Resolve a task                          | [Resolve Task](/docs/api/v2/reference/messages/resolve-task), [Resolve Task Streaming](/docs/api/v2/reference/messages/resolve-task-streaming), or [Resolve Task Async](/docs/api/v2/reference/messages/resolve-task-async)                                                                                                                                                                                                                      |
| Get chat details                        | [Get Chat](/docs/api/v2/reference/chats/get-chat)                                                                                                                                                                                                                                                                                                                                                                                      |
| List chats                              | [List Chats](/docs/api/v2/reference/chats/list-chats)                                                                                                                                                                                                                                                                                                                                                                                  |
| Update chat title, privacy, or metadata | [Update Chat](/docs/api/v2/reference/chats/update-chat)                                                                                                                                                                                                                                                                                                                                                                                |
| Favorite a chat                         | Store favorite state in metadata with [Update Chat](/docs/api/v2/reference/chats/update-chat)                                                                                                                                                                                                                                                                                                                                          |
| Restore files from a previous state     | [Restore Message](/docs/api/v2/reference/chats/restore-message)                                                                                                                                                                                                                                                                                                                                                                        |
| Deploy a chat                           | [Deploy Chat](/docs/api/v2/reference/chats/deploy-chat)                                                                                                                                                                                                                                                                                                                                                                                |
| Create a Vercel project for a chat      | [Create Vercel Project](/docs/api/v2/reference/chats/create-vercel-project)                                                                                                                                                                                                                                                                                                                                                            |
| Read preview access details             | [Get Preview URL](/docs/api/v2/reference/chats/get-preview-url)                                                                                                                                                                                                                                                                                                                                                                        |

## Migration checklist

* Create new v2 chats; do not reuse v1 chat IDs.
* Decide how to seed v2 chats from existing v1 files or versions.
* Replace version state with chat state and chat file workflows.
* Replace v0 Project organization with chat metadata.
* Move Vercel project operations to `vercelProjectId` plus the Vercel API.
* Choose sync, async, or streaming endpoints for each workflow.
* Update client rendering to consume message `parts`, not only final text.
* Store old v1 IDs in metadata only for traceability.


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)