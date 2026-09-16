---
title: Resolve Task (Async)
description: Resolves a pending task and processes it in the background. Returns immediately with the assistant message ID. Poll GET /chats/:chatId/messages/:messageId and check `finishReason` to detect completion.
badge: 'POST'
---

# Resolve Task (Async)

<EndpointDisplay method="post" path="/chats/{chatId}/messages/resolve/async" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0'

const result = await v0.messages.resolveAsync({
chatId: 'chat_abc123',
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
code={`curl -X POST "https://api.v0.dev/v2/chats/chat_abc123/messages/resolve/async" \
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
"description": "The unique identifier of the chat.",
"deprecated": false
}
]}
/>

#### Request Body

<APISignature
title=""
parameters={[
{
"name": "task",
"type": "'confirmed-steps' | 'plan-exit-response' | 'answered-questions' | 'confirmed-permissions' | 'vercel-connect-setup' | 'vercel-connect-authorization'",
"required": true,
"description": "The task resolution data. Use this when the chat is waiting for user input on the matching task type.",
"deprecated": false,
"variants": [
{
"name": "confirmed-steps",
"description": "Resolves an integration installation task. The agent asked the user to install integrations, MCP presets, or set environment variables. Send this after provisioning the integration on Vercel.",
"properties": [
{
"name": "type",
"type": "'confirmed-steps'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "connectedIntegrationNames",
"type": "string[]",
"required": false,
"description": "Names of integrations that were successfully connected (e.g. \"Neon\"). Pass an empty array to skip.",
"deprecated": false
},
{
"name": "connectedNpmRegistryIds",
"type": "string[]",
"required": false,
"description": "Qualified npm registry IDs that were successfully connected (e.g. \"npm:https://registry.example.com/\"). Pass an empty array to skip.",
"deprecated": false
},
{
"name": "connectedMcpPresetNames",
"type": "('Linear' | 'Notion' | 'Context7' | 'Sentry' | 'Zapier' | 'Glean' | 'Hex' | 'Sanity' | 'Granola' | 'PostHog' | 'Contentful' | 'Slack')[]",
"required": false,
"description": "Names of MCP presets that were connected (e.g. \"Linear\", \"Sentry\"). Pass an empty array to skip.",
"deprecated": false
},
{
"name": "appliedScripts",
"type": "string[]",
"required": false,
"description": "Names of scripts that were applied.",
"deprecated": false
},
{
"name": "addedEnvVars",
"type": "string[]",
"required": false,
"description": "Names of environment variables that were added.",
"deprecated": false
}
]
},
{
"name": "plan-exit-response",
"description": "Resolves a plan review task. The agent proposed an implementation plan and is waiting for approval.",
"properties": [
{
"name": "type",
"type": "'plan-exit-response'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "status",
"type": "'approved' | 'rejected' | 'request-changes'",
"required": true,
"description": "Whether the plan is approved, rejected, or needs changes.",
"deprecated": false
},
{
"name": "content",
"type": "string",
"required": true,
"description": "Feedback or instructions for the agent.",
"deprecated": false
}
]
},
{
"name": "answered-questions",
"description": "Resolves a question task. The agent asked the user one or more multiple-choice questions.",
"properties": [
{
"name": "type",
"type": "'answered-questions'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "answers",
"type": "object[]",
"required": true,
"description": "Answers to the questions the agent asked.",
"deprecated": false,
"arrayItems": {
"name": "item",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "questionId",
"type": "string",
"required": true,
"description": "The ID of the question being answered.",
"deprecated": false
},
{
"name": "questionText",
"type": "string",
"required": true,
"description": "The text of the question being answered.",
"deprecated": false
},
{
"name": "selectedLabels",
"type": "string[]",
"required": true,
"description": "The labels of the selected options. For single-select questions, pass one item.",
"deprecated": false
},
{
"name": "customText",
"type": "string",
"required": false,
"description": "Free-form text input, used when the user selects \"Other\" or wants to add context.",
"deprecated": false
}
]
}
}
]
},
{
"name": "confirmed-permissions",
"description": "Resolves a permission request task. The agent wants to execute a tool (shell command, script, MCP call) and needs approval. Also used to resolve environment variable prompts.",
"properties": [
{
"name": "type",
"type": "'confirmed-permissions'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "permissions",
"type": "object[]",
"required": true,
"description": "The permissions to grant. Pass the suggestedPermissions from the stopped task.",
"deprecated": false,
"arrayItems": {
"name": "item",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "type",
"type": "'ALLOW_DYNAMIC_TOOL_STRICT'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "toolName",
"type": "string",
"required": true,
"description": "The name of the tool being permitted.",
"deprecated": false
},
{
"name": "input",
"type": "unknown",
"required": true,
"description": "The tool call input arguments. Pass the exact input from the stopped task.",
"deprecated": false
},
{
"name": "toolDisplayName",
"type": "string | null",
"required": false,
"description": "The tool's original human-readable name from the stopped task. Display-only; pass back unchanged. Capped at 100 characters, matching the cap applied when the name is ingested from the server.",
"deprecated": false
},
{
"name": "taskNameActive",
"type": "string | null",
"required": false,
"description": "Label shown while the tool is running (e.g. \"Running migration\").",
"deprecated": false
},
{
"name": "taskNameComplete",
"type": "string | null",
"required": false,
"description": "Label shown after the tool completes (e.g. \"Migration complete\").",
"deprecated": false
},
{
"name": "userMessage",
"type": "string",
"required": false,
"description": "Optional message from the user about this permission.",
"deprecated": false
}
]
}
},
{
"name": "userMessage",
"type": "string",
"required": false,
"description": "Optional message from the user about the permission grant.",
"deprecated": false
}
]
},
{
"name": "vercel-connect-setup",
"description": "Resolves a Vercel Connect setup task. The agent asked the user to complete connector setup in a browser (a `configure_vercel_connect` agent action with `status: \"setup-required\"`). Complete setup at the action’s `setupUrl`, poll GET /chats/{chatId}/connect/status until it returns `ready`, then send this task. The server verifies the setup result and attaches the connector; no connector ID is needed. Returns 409 if setup is still pending or failed, or 404 if setup has not started or the request expired.",
"properties": [
{
"name": "type",
"type": "'vercel-connect-setup'",
"required": true,
"description": "",
"deprecated": false
}
]
},
{
"name": "vercel-connect-authorization",
"description": "Resolves a Vercel Connect authorization task (a `configure_vercel_connect` agent action with `status: \"authorization-required\"`). Sign in at the action's `authorizationUrl`, poll GET /chats/{chatId}/connect/status until `ready`, then send this task. Returns 409 while authorization is pending or after it failed, 404 if it has not started or expired.",
"properties": [
{
"name": "type",
"type": "'vercel-connect-authorization'",
"required": true,
"description": "",
"deprecated": false
}
]
}
]
},
{
"name": "modelConfiguration",
"type": "object",
"required": false,
"description": "Overrides for the model behavior.",
"deprecated": false,
"properties": [
{
"name": "modelId",
"type": "'v0-mini' | 'v0-pro' | 'v0-max' | 'v0-max-fast'",
"required": false,
"description": "Model to use for the generation.",
"deprecated": false
},
{
"name": "imageGenerations",
"type": "boolean",
"required": false,
"description": "Enables image generations to generate up to 5 images per version.",
"deprecated": false
}
]
}
]}
/>

### Response

<APISignature
title=""
parameters={[
{
"name": "messageId",
"type": "string",
"required": true,
"description": "ID of the assistant message that will receive the response. Poll GET /chats/:chatId/messages/:messageId and check `finishReason` for completion.",
"deprecated": false
}
]}
/>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
