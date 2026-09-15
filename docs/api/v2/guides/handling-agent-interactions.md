---
title: Handling Agent Interactions
description: Learn how to handle plan reviews, questions, and permission requests from the v0 agent
product: Platform API
type: guide
related:
  - /docs/api/v2/reference/messages/resolve-task
  - /docs/api/v2/reference/messages/get-message
  - /docs/api/v2/guides/handling-integrations
---

# Handling Agent Interactions



The v0 agent may pause when it needs a decision from the user. Your app should show that request, collect the user's response, and resolve the task so the agent can continue.

This guide covers:

* Reviewing a proposed plan
* Answering agent questions
* Granting tool permissions

For integration setup, see [Handling Integrations](/docs/api/v2/guides/handling-integrations).

## 1. Inspect the latest assistant message

Pending interactions appear in the latest assistant message's `parts` array:

| Interaction        | Message part                                     | Resolve task            |
| ------------------ | ------------------------------------------------ | ----------------------- |
| Plan review        | `agent-action` with `name: "exit_plan_mode"`     | `plan-exit-response`    |
| Questions          | `agent-action` with `name: "ask_user_questions"` | `answered-questions`    |
| Permission request | `tool-call` with `suggestedPermissions`          | `confirmed-permissions` |

How you get the message depends on the response mode:

* **Synchronous:** The request returns the completed assistant message.
* **Asynchronous:** The request returns a `messageId`. Poll `GET /v2/chats/{chatId}/messages/{messageId}` until `finishReason` is no longer `null`.
* **Streaming:** Consume `result.stream`, then inspect `(await result.final).parts`.

Use the latest blocked assistant message only. If the chat has moved on or the submitted task type does not match the pending interaction, `resolve` returns `409 Conflict`.

## 2. Review a plan

When the agent finishes planning, the message includes an `agent-action` part with `name: "exit_plan_mode"`. Its `data` contains the proposed plan.

```typescript
const planRequest = message.parts.find(
  (part) =>
    part.type === 'agent-action' && part.name === 'exit_plan_mode',
)

console.log(planRequest?.data)
```

Resolve the task with the user's decision:

```typescript
import { v0 } from 'v0'

await v0.messages.resolve({
  chatId: 'chat_abc123',
  task: {
    type: 'plan-exit-response',
    status: 'approved',
    content: 'Proceed with the implementation.',
  },
})
```

Use `status: "request-changes"` to send feedback before implementation, or `status: "rejected"` when the user does not want to continue with the plan. `content` is required for every status.

## 3. Answer agent questions

Questions appear in an `agent-action` part with `name: "ask_user_questions"`. The part's `data.questions` includes each question's ID, text, options, and whether it accepts multiple selections.

```typescript
const questionRequest = message.parts.find(
  (part) =>
    part.type === 'agent-action' && part.name === 'ask_user_questions',
)

console.log(questionRequest?.data)
```

Send one answer for each question the user answered:

```typescript
import { v0 } from 'v0'

await v0.messages.resolve({
  chatId: 'chat_abc123',
  task: {
    type: 'answered-questions',
    answers: [
      {
        questionId: 'database',
        questionText: 'Which database should I use?',
        selectedLabels: ['PostgreSQL'],
      },
    ],
  },
})
```

Pass option labels in `selectedLabels`, not option IDs. For a multi-select question, include every selected label. Use `customText` when the user selects another option or wants to add context.

## 4. Handle permission requests

The agent may ask for permission before running a tool, script, or MCP call. The request appears as a `tool-call` part with a non-empty `suggestedPermissions` array.

Pass those permission objects back unchanged to approve the request:

```typescript
const permissionRequest = message.parts.find(
  (part) => part.type === 'tool-call' && part.suggestedPermissions?.length,
)

if (
  permissionRequest?.type === 'tool-call' &&
  permissionRequest.suggestedPermissions
) {
  await v0.messages.resolve({
    chatId: 'chat_abc123',
    task: {
      type: 'confirmed-permissions',
      permissions: permissionRequest.suggestedPermissions,
    },
  })
}
```

The submitted permissions must match the ones on the latest blocked assistant message, or `resolve` returns `409 Conflict`.

To reject a permission request, send a regular follow-up message instead. You can use that message to tell the agent why the action was not approved or ask it to take another approach.

## 5. Continue the conversation

`v0.messages.resolve()` waits for the agent and returns the next assistant message. Inspect that message too: resolving one interaction may lead to another.

Use `v0.messages.resolveAsync()` when you want the agent to continue in the background, or `v0.messages.resolveStream()` when you want to stream its response.


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)