---
title: Get Usage Report
description: Retrieves detailed usage events for the authenticated user or team, including costs, event types, models used, and metadata. Shows the same data as displayed in the usage dashboard. Can be filtered by chatId to show usage for a specific chat, or by userId to show usage for a specific user.
badge: 'GET'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# Get Usage Report

<EndpointDisplay method="get" path="/reports/usage" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.reports.getUsage()

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X GET https://api.v0.dev/v1/reports/usage \
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
"name": "startDate",
"type": "string",
"required": false,
"description": "Query parameter \"startDate\""
},
{
"name": "endDate",
"type": "string",
"required": false,
"description": "Query parameter \"endDate\""
},
{
"name": "chatId",
"type": "string",
"required": false,
"description": "Query parameter \"chatId\""
},
{
"name": "messageId",
"type": "string",
"required": false,
"description": "Query parameter \"messageId\""
},
{
"name": "userId",
"type": "string",
"required": false,
"description": "Query parameter \"userId\""
},
{
"name": "limit",
"type": "number",
"required": false,
"description": "Query parameter \"limit\""
},
{
"name": "cursor",
"type": "string",
"required": false,
"description": "Base64 encoded cursor containing pagination data"
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
"description": "",
"deprecated": false
},
{
"name": "data",
"type": "object[]",
"required": true,
"description": "",
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
"description": "",
"deprecated": false
},
{
"name": "object",
"type": "'usage_event'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "type",
"type": "'image_generation' | 'message' | 'manual_debit' | 'api_request' | 'inline-edit' | 'buy-template' | 'reverse_template_sale' | 'refund_template_purchase'",
"required": false,
"description": "",
"deprecated": false
},
{
"name": "promptCost",
"type": "string",
"required": false,
"description": "",
"deprecated": false
},
{
"name": "completionCost",
"type": "string",
"required": false,
"description": "",
"deprecated": false
},
{
"name": "totalCost",
"type": "string",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "chatId",
"type": "string",
"required": false,
"description": "",
"deprecated": false
},
{
"name": "messageId",
"type": "string",
"required": false,
"description": "",
"deprecated": false
},
{
"name": "userId",
"type": "string",
"required": false,
"description": "Deprecated - use user object instead",
"deprecated": false
},
{
"name": "user",
"type": "object",
"required": false,
"description": "",
"deprecated": false
},
{
"name": "createdAt",
"type": "string",
"required": true,
"description": "The ISO timestamp representing when the usage event was created.",
"deprecated": false
}
]
}
},
{
"name": "pagination",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "hasMore",
"type": "boolean",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "nextCursor",
"type": "string",
"required": false,
"description": "",
"deprecated": false
},
{
"name": "nextUrl",
"type": "string",
"required": false,
"description": "",
"deprecated": false
}
]
},
{
"name": "meta",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "totalCount",
"type": "number",
"required": true,
"description": "",
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
