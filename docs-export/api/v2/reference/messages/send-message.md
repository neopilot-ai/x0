---
title: Send Message
description: Sends a new message to an existing chat. Blocks until the model response is complete and returns the message response.
badge: 'POST'
---

# Send Message

<EndpointDisplay method="post" path="/chats/{chatId}/messages" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0'

const result = await v0.messages.send({
chatId: 'chat_abc123',
message: 'Hello, world!',
})

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X POST "https://api.v0.dev/v2/chats/chat_abc123/messages" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, world!"}'`}
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
"name": "message",
"type": "string",
"required": true,
"description": "The prompt or instruction to send to the model.",
"deprecated": false
},
{
"name": "systemPrompt",
"type": "string",
"required": false,
"description": "System-level context for the chat, such as frameworks or development environment details.",
"deprecated": false
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
"required": true,
"description": "Model to use for the generation.",
"deprecated": false
},
{
"name": "imageGenerations",
"type": "boolean",
"required": true,
"description": "Enables image generations to generate up to 5 images per version.",
"deprecated": false
}
]
},
{
"name": "mcpServerIds",
"type": "string[]",
"required": false,
"description": "MCP server IDs to enable. When omitted, uses default enabled servers.",
"deprecated": false
},
{
"name": "attachments",
"type": "(object | object)[]",
"required": false,
"description": "Files or assets to include with the message. Provide either a URL or data URI, or inline UTF-8 text content.",
"deprecated": false
},
{
"name": "skills",
"type": "('remote' | 'memory' | 'project')[]",
"required": false,
"description": "Skills to force-attach to the message. Supports skills.sh (`remote`), user/team memory (`memory`), and project (`project`) skills. Maximum 3.",
"deprecated": false,
"variants": [
{
"name": "remote",
"description": "",
"properties": [
{
"name": "type",
"type": "'remote'",
"required": true,
"description": "Discriminator: a skills.sh skill.",
"deprecated": false
},
{
"name": "id",
"type": "string",
"required": true,
"description": "Skill ID from skills.sh.",
"deprecated": false
}
]
},
{
"name": "memory",
"description": "",
"properties": [
{
"name": "type",
"type": "'memory'",
"required": true,
"description": "Discriminator: a user- or team-scoped memory skill.",
"deprecated": false
},
{
"name": "scope",
"type": "'user' | 'team'",
"required": true,
"description": "Whether the skill lives in user or team memory.",
"deprecated": false
},
{
"name": "skillName",
"type": "string",
"required": true,
"description": "Name of the memory skill to attach.",
"deprecated": false
}
]
},
{
"name": "project",
"description": "",
"properties": [
{
"name": "type",
"type": "'project'",
"required": true,
"description": "Discriminator: a skill defined in the project repo.",
"deprecated": false
},
{
"name": "skillName",
"type": "string",
"required": true,
"description": "Name of the project skill to attach.",
"deprecated": false
}
]
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
"name": "id",
"type": "string",
"required": true,
"description": "Unique message identifier.",
"deprecated": false
},
{
"name": "chatId",
"type": "string",
"required": true,
"description": "ID of the chat this message belongs to.",
"deprecated": false
},
{
"name": "role",
"type": "'user' | 'assistant'",
"required": true,
"description": "Who produced this message.",
"deprecated": false
},
{
"name": "createdAt",
"type": "string",
"required": true,
"description": "ISO timestamp when the message was created.",
"deprecated": false
},
{
"name": "updatedAt",
"type": "string",
"required": true,
"description": "ISO timestamp when the message was last updated.",
"deprecated": false
},
{
"name": "content",
"type": "string",
"required": true,
"description": "The trailing prose of the message — the agent’s closing summary, or the user’s message text. Empty string when there is no closing prose.",
"deprecated": false
},
{
"name": "parts",
"type": "('text' | 'thinking' | 'file-read' | 'file-edit' | 'search' | 'bash' | 'tool-call' | 'agent-action')[]",
"required": true,
"description": "Ordered list of parts that make up the message. Iterate to render the full narrative including thinking, file operations, tool calls, and prose.",
"deprecated": false,
"variants": [
{
"name": "text",
"description": "A block of text output by the agent.",
"properties": [
{
"name": "type",
"type": "'text'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "text",
"type": "string",
"required": true,
"description": "Markdown prose written by the agent or user.",
"deprecated": false
},
{
"name": "startedAt",
"type": "string",
"required": false,
"description": "ISO timestamp when this part began.",
"deprecated": false
},
{
"name": "finishedAt",
"type": "string",
"required": false,
"description": "ISO timestamp when this part completed.",
"deprecated": false
}
]
},
{
"name": "thinking",
"description": "Extended thinking output by the agent.",
"properties": [
{
"name": "type",
"type": "'thinking'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "text",
"type": "string",
"required": true,
"description": "The agent's reasoning trace.",
"deprecated": false
},
{
"name": "startedAt",
"type": "string",
"required": false,
"description": "ISO timestamp when this part began.",
"deprecated": false
},
{
"name": "finishedAt",
"type": "string",
"required": false,
"description": "ISO timestamp when this part completed.",
"deprecated": false
}
]
},
{
"name": "file-read",
"description": "Files read by the agent.",
"properties": [
{
"name": "type",
"type": "'file-read'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "paths",
"type": "string[]",
"required": true,
"description": "The file paths the agent read in this step.",
"deprecated": false
},
{
"name": "startedAt",
"type": "string",
"required": false,
"description": "ISO timestamp when this part began.",
"deprecated": false
},
{
"name": "finishedAt",
"type": "string",
"required": false,
"description": "ISO timestamp when this part completed.",
"deprecated": false
}
]
},
{
"name": "file-edit",
"description": "The agent created, modified, deleted, renamed, or patched a file.",
"properties": [
{
"name": "type",
"type": "'file-edit'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "operation",
"type": "'create' | 'update' | 'delete' | 'rename' | 'patch'",
"required": true,
"description": "The type of file edit performed.",
"deprecated": false
},
{
"name": "path",
"type": "string",
"required": true,
"description": "The target file path.",
"deprecated": false
},
{
"name": "toPath",
"type": "string",
"required": false,
"description": "The new path when operation is \"rename\".",
"deprecated": false
},
{
"name": "startedAt",
"type": "string",
"required": false,
"description": "ISO timestamp when this part began.",
"deprecated": false
},
{
"name": "finishedAt",
"type": "string",
"required": false,
"description": "ISO timestamp when this part completed.",
"deprecated": false
}
]
},
{
"name": "search",
"description": "The agent searched for something.",
"properties": [
{
"name": "type",
"type": "'search'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "scope",
"type": "'repo' | 'web'",
"required": true,
"description": "Whether the agent searched the repository or the web.",
"deprecated": false
},
{
"name": "query",
"type": "string",
"required": true,
"description": "The search query.",
"deprecated": false
},
{
"name": "startedAt",
"type": "string",
"required": false,
"description": "ISO timestamp when this part began.",
"deprecated": false
},
{
"name": "finishedAt",
"type": "string",
"required": false,
"description": "ISO timestamp when this part completed.",
"deprecated": false
}
]
},
{
"name": "bash",
"description": "The agent ran a shell command.",
"properties": [
{
"name": "type",
"type": "'bash'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "command",
"type": "string",
"required": true,
"description": "The shell command that was executed.",
"deprecated": false
},
{
"name": "output",
"type": "string",
"required": false,
"description": "Combined stdout/stderr captured from the terminal. May be empty if the command produced no output.",
"deprecated": false
},
{
"name": "exitCode",
"type": "integer | null",
"required": false,
"description": "Process exit code, when available. Reserved for future use; currently always omitted.",
"deprecated": false
},
{
"name": "isDangerous",
"type": "boolean",
"required": false,
"description": "True if the command was flagged as potentially dangerous and required explicit user approval.",
"deprecated": false
},
{
"name": "timeoutMs",
"type": "integer",
"required": false,
"description": "Command timeout in milliseconds, when configured.",
"deprecated": false
},
{
"name": "startedAt",
"type": "string",
"required": false,
"description": "ISO timestamp when this part began.",
"deprecated": false
},
{
"name": "finishedAt",
"type": "string",
"required": false,
"description": "ISO timestamp when this part completed.",
"deprecated": false
}
]
},
{
"name": "tool-call",
"description": "The agent invoked a tool (MCP, integration, or other dynamic tool). For shell commands, use the \"bash\" part instead.",
"properties": [
{
"name": "type",
"type": "'tool-call'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "name",
"type": "string",
"required": true,
"description": "The identifier the tool was invoked under. For MCP/integration tools this is a normalized identifier derived from the tool name — prefer `toolDisplayName` for display when present.",
"deprecated": false
},
{
"name": "toolDisplayName",
"type": "string | null",
"required": false,
"description": "The tool's original human-readable name (an MCP/integration tool's server-side name), when `name` is a normalized identifier. Display-only.",
"deprecated": false
},
{
"name": "input",
"type": "unknown",
"required": false,
"description": "The arguments passed to the tool. Schema depends on the specific tool.",
"deprecated": false
},
{
"name": "output",
"type": "unknown",
"required": false,
"description": "The result returned by the tool. Schema depends on the specific tool.",
"deprecated": false
},
{
"name": "status",
"type": "'ok' | 'error'",
"required": true,
"description": "Whether the tool call succeeded or returned an error.",
"deprecated": false
},
{
"name": "suggestedPermissions",
"type": "object[]",
"required": false,
"description": "Present when the agent is blocked waiting for you to approve this tool call (for example, running a setup or migration script). Pass these objects back unchanged as the `permissions` of a `confirmed-permissions` task to approve. Omitted once the tool has run.",
"deprecated": false,
"arrayItems": {
"name": "item",
"type": "object",
"required": true,
"description": "A permission the agent is waiting for you to grant. Pass these objects back unchanged as the `permissions` of a `confirmed-permissions` task.",
"deprecated": false,
"properties": [
{
"name": "type",
"type": "'ALLOW_DYNAMIC_TOOL_STRICT'",
"required": true,
"description": "Permission grant type.",
"deprecated": false
},
{
"name": "toolName",
"type": "string",
"required": true,
"description": "The tool this permission authorizes.",
"deprecated": false
},
{
"name": "input",
"type": "unknown",
"required": false,
"description": "The tool input this permission authorizes. Pass back unchanged when resolving.",
"deprecated": false
},
{
"name": "toolDisplayName",
"type": "string | null",
"required": false,
"description": "The tool's original human-readable name (an MCP/integration tool's server name), when `toolName` is a normalized identifier. Display-only; pass back unchanged.",
"deprecated": false
},
{
"name": "taskNameActive",
"type": "string | null",
"required": false,
"description": "Internal label for the in-progress task. Pass back unchanged.",
"deprecated": false
},
{
"name": "taskNameComplete",
"type": "string | null",
"required": false,
"description": "Internal label for the completed task. Pass back unchanged.",
"deprecated": false
},
{
"name": "userMessage",
"type": "string",
"required": false,
"description": "Optional message associated with the permission.",
"deprecated": false
}
]
}
},
{
"name": "startedAt",
"type": "string",
"required": false,
"description": "ISO timestamp when this part began.",
"deprecated": false
},
{
"name": "finishedAt",
"type": "string",
"required": false,
"description": "ISO timestamp when this part completed.",
"deprecated": false
}
]
},
{
"name": "agent-action",
"description": "A typed escape hatch for agent actions that don’t fit the other part types. Forward-compatible: new action types may appear without API version changes.",
"properties": [
{
"name": "type",
"type": "'agent-action'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "name",
"type": "string",
"required": true,
"description": "Stable identifier for the action (e.g. \"generate_image\", \"manage_todos\", \"diagnostics\"). See documentation for the registry of known names.",
"deprecated": false
},
{
"name": "summary",
"type": "string",
"required": true,
"description": "A short human-readable summary of what happened. Always populated so clients can render something even without knowing the action name.",
"deprecated": false
},
{
"name": "data",
"type": "object | object | object | object | object | object",
"required": false,
"description": "Structured payload for input-requesting actions. Present on `ask_user_questions`, `exit_plan_mode`, `get_or_request_integration`, and `configure_vercel_connect` parts when the agent is waiting on you; narrow by the part `name`. Omitted for actions that do not carry structured data.",
"deprecated": false,
"properties": [
{
"name": "questions",
"type": "object[]",
"required": true,
"description": "The questions the agent is waiting for answers to. Resolve with an `answered-questions` task.",
"deprecated": false,
"arrayItems": {
"name": "item",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "id",
"type": "string",
"required": true,
"description": "Question identifier. Pass back as `questionId` when resolving with an `answered-questions` task.",
"deprecated": false
},
{
"name": "question",
"type": "string",
"required": true,
"description": "The full question text.",
"deprecated": false
},
{
"name": "header",
"type": "string",
"required": true,
"description": "Short label for the question.",
"deprecated": false
},
{
"name": "multiSelect",
"type": "boolean",
"required": true,
"description": "Whether more than one option may be selected.",
"deprecated": false
},
{
"name": "options",
"type": "object[]",
"required": true,
"description": "The available answer options.",
"deprecated": false,
"arrayItems": {
"name": "item",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "id",
"type": "string",
"required": true,
"description": "Option identifier.",
"deprecated": false
},
{
"name": "label",
"type": "string",
"required": true,
"description": "Display label. Pass matching labels back in `selectedLabels` when resolving.",
"deprecated": false
},
{
"name": "description",
"type": "string",
"required": false,
"description": "Optional longer explanation of the option.",
"deprecated": false
}
]
}
}
]
}
}
]
},
{
"name": "startedAt",
"type": "string",
"required": false,
"description": "ISO timestamp when this part began.",
"deprecated": false
},
{
"name": "finishedAt",
"type": "string",
"required": false,
"description": "ISO timestamp when this part completed.",
"deprecated": false
}
]
}
]
},
{
"name": "finishReason",
"type": "'stop' | 'length' | 'content-filter' | 'tool-calls' | 'error' | 'other' | null",
"required": true,
"description": "Why generation ended. Null while the agent is still generating; once non-null, the message is final and safe to consume.",
"deprecated": false
},
{
"name": "restorable",
"type": "boolean",
"required": true,
"description": "True when this is an assistant message that produced restorable code and is not the currently active code.",
"deprecated": false
},
{
"name": "attachments",
"type": "object[]",
"required": false,
"description": "Files attached to this message.",
"deprecated": false,
"arrayItems": {
"name": "item",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "url",
"type": "string",
"required": true,
"description": "URL to the attachment.",
"deprecated": false
},
{
"name": "name",
"type": "string",
"required": false,
"description": "Original filename, when available.",
"deprecated": false
},
{
"name": "contentType",
"type": "string",
"required": false,
"description": "MIME type.",
"deprecated": false
},
{
"name": "size",
"type": "integer",
"required": false,
"description": "Size in bytes.",
"deprecated": false
}
]
}
},
{
"name": "authorId",
"type": "string | null",
"required": true,
"description": "ID of the user who authored a user message; null for assistant messages.",
"deprecated": false
},
{
"name": "usage",
"type": "object",
"required": true,
"description": "Model identifier, token usage, and credit cost. Token and credit values are zero on user messages and on assistant messages that have not yet generated tokens.",
"deprecated": false,
"properties": [
{
"name": "model",
"type": "string | null",
"required": true,
"description": "Model identifier used for the assistant message, or null when not applicable or unavailable.",
"deprecated": false
},
{
"name": "tokens",
"type": "object",
"required": true,
"description": "Token counts for this message.",
"deprecated": false,
"properties": [
{
"name": "input",
"type": "number",
"required": true,
"description": "Prompt input value (non-cached).",
"deprecated": false
},
{
"name": "output",
"type": "number",
"required": true,
"description": "Completion output value.",
"deprecated": false
},
{
"name": "cacheRead",
"type": "number",
"required": true,
"description": "Cache-read input value.",
"deprecated": false
},
{
"name": "cacheWrite",
"type": "number",
"required": true,
"description": "Cache-write input value.",
"deprecated": false
},
{
"name": "total",
"type": "number",
"required": true,
"description": "Sum of input, output, cacheRead, and cacheWrite.",
"deprecated": false
}
]
},
{
"name": "creditsCost",
"type": "object",
"required": true,
"description": "Credit cost for this message.",
"deprecated": false,
"properties": [
{
"name": "input",
"type": "number",
"required": true,
"description": "Prompt input value (non-cached).",
"deprecated": false
},
{
"name": "output",
"type": "number",
"required": true,
"description": "Completion output value.",
"deprecated": false
},
{
"name": "cacheRead",
"type": "number",
"required": true,
"description": "Cache-read input value.",
"deprecated": false
},
{
"name": "cacheWrite",
"type": "number",
"required": true,
"description": "Cache-write input value.",
"deprecated": false
},
{
"name": "total",
"type": "number",
"required": true,
"description": "Sum of input, output, cacheRead, and cacheWrite.",
"deprecated": false
}
]
}
]
}
]}
/>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
