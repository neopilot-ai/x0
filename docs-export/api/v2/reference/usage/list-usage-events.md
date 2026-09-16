---
title: List Usage Events
description: Lists individual credit usage events. Each event includes the credits charged and, when available, associated token counts.
badge: 'GET'
---

# List Usage Events

<EndpointDisplay method="get" path="/usage/events" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0'

const result = await v0.usage.listEvents()

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X GET "https://api.v0.dev/v2/usage/events" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json"`}
/>
</CustomCodeBlock>

## API Signature

### Request

#### Query Parameters

<APISignature
title=""
parameters={[
{
"name": "start",
"type": "string",
"required": false,
"description": "Inclusive ISO 8601 start timestamp. Defaults to seven days ago.",
"deprecated": false
},
{
"name": "end",
"type": "string",
"required": false,
"description": "Exclusive ISO 8601 end timestamp. Defaults to the current time.",
"deprecated": false
},
{
"name": "userId",
"type": "string",
"required": false,
"description": "Filter usage by user. Team owners and billing members may select any team member; other callers may select only themselves.",
"deprecated": false
},
{
"name": "chatId",
"type": "string",
"required": false,
"description": "Filter usage by chat identifier.",
"deprecated": false
},
{
"name": "messageId",
"type": "string",
"required": false,
"description": "Filter usage by message identifier.",
"deprecated": false
},
{
"name": "limit",
"type": "integer",
"required": false,
"description": "Maximum billing records considered per credit source (1-100, default 50). Related records may be combined into one event.",
"deprecated": false
},
{
"name": "cursor",
"type": "string",
"required": false,
"description": "Opaque cursor returned by the previous page. It preserves the prior range and filters, so other query parameters may be omitted on subsequent pages.",
"deprecated": false
}
]}
/>

### Response

<APISignature
title=""
parameters={[
{
"name": "object",
"type": "'list'",
"required": true,
"description": "Object type identifier.",
"deprecated": false
},
{
"name": "range",
"type": "object",
"required": true,
"description": "Time range covered by the response.",
"deprecated": false,
"properties": [
{
"name": "start",
"type": "string",
"required": true,
"description": "Inclusive ISO 8601 start timestamp.",
"deprecated": false
},
{
"name": "end",
"type": "string",
"required": true,
"description": "Exclusive ISO 8601 end timestamp.",
"deprecated": false
}
]
},
{
"name": "scope",
"type": "object",
"required": true,
"description": "Authorized billing scope used for this response.",
"deprecated": false,
"properties": [
{
"name": "id",
"type": "string",
"required": true,
"description": "Billing scope identifier.",
"deprecated": false
},
{
"name": "type",
"type": "'team' | 'personal'",
"required": true,
"description": "Billing scope type.",
"deprecated": false
},
{
"name": "isTeamWide",
"type": "boolean",
"required": true,
"description": "Whether the response includes usage for the entire team.",
"deprecated": false
},
{
"name": "userId",
"type": "string",
"required": false,
"description": "User attribution applied to the response, when filtered.",
"deprecated": false
}
]
},
{
"name": "data",
"type": "object[]",
"required": true,
"description": "Usage events in this page.",
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
"description": "Billing event identifier.",
"deprecated": false
},
{
"name": "object",
"type": "'usage_event'",
"required": true,
"description": "Object type identifier.",
"deprecated": false
},
{
"name": "type",
"type": "string",
"required": true,
"description": "Kind of product usage represented by the event.",
"deprecated": false
},
{
"name": "createdAt",
"type": "string",
"required": true,
"description": "Timestamp of the usage event.",
"deprecated": false
},
{
"name": "userId",
"type": "string",
"required": false,
"description": "Attributed user identifier.",
"deprecated": false
},
{
"name": "chatId",
"type": "string",
"required": false,
"description": "Related chat identifier.",
"deprecated": false
},
{
"name": "messageId",
"type": "string",
"required": false,
"description": "Related message identifier.",
"deprecated": false
},
{
"name": "model",
"type": "string",
"required": false,
"description": "Model associated with the event.",
"deprecated": false
},
{
"name": "sources",
"type": "('plan' | 'on-demand')[]",
"required": true,
"description": "Credit sources used by the event.",
"deprecated": false
},
{
"name": "waived",
"type": "boolean",
"required": true,
"description": "Whether credits fully waived this event.",
"deprecated": false
},
{
"name": "costBreakdownStatus",
"type": "'estimated' | 'unavailable'",
"required": false,
"description": "Whether the cost components are estimated or unavailable. When unavailable, creditsCost components are zero placeholders for compatibility and must be ignored; total and charged remain authoritative.",
"deprecated": false
},
{
"name": "tokens",
"type": "object | null",
"required": true,
"description": "Persisted token counts, or null for image generation and when the source message is unavailable.",
"deprecated": false,
"properties": [
{
"name": "input",
"type": "number",
"required": true,
"description": "Input amount excluding cached input.",
"deprecated": false
},
{
"name": "output",
"type": "number",
"required": true,
"description": "Output amount.",
"deprecated": false
},
{
"name": "cacheRead",
"type": "number",
"required": true,
"description": "Cache-read input amount.",
"deprecated": false
},
{
"name": "cacheWrite",
"type": "number",
"required": true,
"description": "Cache-write input amount.",
"deprecated": false
},
{
"name": "total",
"type": "number",
"required": true,
"description": "Total amount across all categories.",
"deprecated": false
}
]
},
{
"name": "creditsCost",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "input",
"type": "number",
"required": true,
"description": "Input amount excluding cached input.",
"deprecated": false
},
{
"name": "output",
"type": "number",
"required": true,
"description": "Output amount.",
"deprecated": false
},
{
"name": "cacheRead",
"type": "number",
"required": true,
"description": "Cache-read input amount.",
"deprecated": false
},
{
"name": "cacheWrite",
"type": "number",
"required": true,
"description": "Cache-write input amount.",
"deprecated": false
},
{
"name": "total",
"type": "number",
"required": true,
"description": "Total recorded cost, including costs without an available breakdown.",
"deprecated": false
},
{
"name": "charged",
"type": "number",
"required": true,
"description": "Credits charged after a full waiver.",
"deprecated": false
}
]
}
]
}
},
{
"name": "pagination",
"type": "object",
"required": true,
"description": "Pagination state for this response.",
"deprecated": false,
"properties": [
{
"name": "hasMore",
"type": "boolean",
"required": true,
"description": "Whether another page is available.",
"deprecated": false
},
{
"name": "cursor",
"type": "string | null",
"required": true,
"description": "Cursor for the next page, or null at the end.",
"deprecated": false
}
]
}
]}
/>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
