---
title: Resolve Task
description: Resolves a chat that's blocked waiting for user input and continues the conversation.
badge: 'POST'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v1/guides/handling-integrations
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# Resolve Task

<EndpointDisplay method="post" path="/chats/{chatId}/tasks/resolve" />

## Usage

Use this endpoint when a chat is blocked on user input. This includes interacting with plan mode, answering agent questions, confirming integration installations, and responding to permission requests.

The submitted `task.type` must match the blocked task from the most recent assistant message. If the latest message is not the task you are resolving, the endpoint returns `409 Conflict`.

If a task payload is structurally valid but empty in a way that would not carry meaningful user intent, the endpoint returns `422 Unprocessable Entity`. For example, blank `plan-exit-response.content`, empty `answered-questions.answers`, and empty `confirmed-permissions.permissions` are rejected.

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.chats.resolveTask({
chatId: '123',
task: {
type: 'plan-exit-response',
status: 'approved',
content: 'Proceed with the implementation.',
},
})

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X POST https://api.v0.dev/v1/chats/123/tasks/resolve \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "task": {
      "type": "plan-exit-response",
      "status": "approved",
      "content": "Proceed with the implementation."
    }
  }'`}
/>
</CustomCodeBlock>

## Before You Call It

Inspect the latest assistant message first. The blocked task is exposed in `experimental_content` on:

- `GET /v1/chats/{chatId}`
- `GET /v1/chats/{chatId}/messages/{messageId}`

Submit the matching resolution payload for the latest blocked task only.

## Task Types

### `confirmed-steps`

Use when the assistant is blocked on integration, MCP preset, script, or environment setup. To reject the agent's request, pass an empty array for the relevant field.

```json
{
  "task": {
    "type": "confirmed-steps",
    "connectedIntegrationNames": ["Supabase"],
    "connectedMcpPresetNames": ["Linear"],
    "appliedScripts": ["scripts/bootstrap.sh"],
    "addedEnvVars": ["SUPABASE_URL"]
  }
}
```

### `plan-exit-response`

Use when the assistant proposed a plan and is waiting for approval, rejection, or requested changes.

```json
{
  "task": {
    "type": "plan-exit-response",
    "status": "request-changes",
    "content": "Keep the API shape but split validation into a helper."
  }
}
```

### `answered-questions`

Use when the assistant asked one or more multiple-choice questions.

```json
{
  "task": {
    "type": "answered-questions",
    "answers": [
      {
        "questionId": "db-choice",
        "questionText": "Which database should I use?",
        "selectedLabels": ["PostgreSQL"]
      }
    ]
  }
}
```

### `confirmed-permissions`

Use when the assistant is blocked on tool or environment variable approval. The submitted permissions must match the permissions currently pending on the latest blocked assistant message.

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
          "executeScript": "/app/scripts/migrate.sql"
        }
      }
    ]
  }
}
```

## API Signature

### Request

#### Path Parameters

<APISignature
title=""
parameters={[
{
"name": "chatId",
"type": "string",
"required": true,
"description": "The unique identifier of the chat containing the pending task. Provided as a path parameter."
}
]}
/>

#### Body

<APISignature
title=""
parameters={[
{
"name": "task",
"type": "object",
"required": true,
"description": "The task resolution payload. The latest message in the active chat fork must be an assistant message blocked on the matching task type.",
"deprecated": false,
"properties": [
{
"name": "type",
"type": "'confirmed-steps' | 'plan-exit-response' | 'answered-questions' | 'confirmed-permissions'",
"required": true,
"description": "The blocked task type being resolved.",
"deprecated": false
}
]
},
{
"name": "responseMode",
"type": "'sync' | 'async' | 'experimental_stream'",
"required": false,
"description": "Controls how the response is delivered.",
"deprecated": false
},
{
"name": "modelConfiguration",
"type": "object",
"required": false,
"description": "Overrides for the model behavior.",
"deprecated": false
}
]}
/>

### Response

Returns the updated chat object, using the same response shape as `GET /v1/chats/{chatId}`.

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
