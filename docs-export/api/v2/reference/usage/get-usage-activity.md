---
title: Get Usage Activity
description: Returns chat and project activity for the active billing scope. Team owners and billing members receive team-wide activity by default; other team members receive their own activity.
badge: 'GET'
---

# Get Usage Activity

<EndpointDisplay method="get" path="/usage/activity" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0'

const result = await v0.usage.getActivity()

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X GET "https://api.v0.dev/v2/usage/activity" \
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
}
]}
/>

### Response

<APISignature
title=""
parameters={[
{
"name": "object",
"type": "'usage_activity'",
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
"name": "summary",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "activeUsers",
"type": "integer",
"required": true,
"description": "Distinct active users.",
"deprecated": false
},
{
"name": "activeDays",
"type": "integer",
"required": true,
"description": "Distinct active days.",
"deprecated": false
},
{
"name": "chatCount",
"type": "integer",
"required": true,
"description": "Distinct active chats.",
"deprecated": false
},
{
"name": "messageCount",
"type": "integer",
"required": true,
"description": "Assistant messages.",
"deprecated": false
}
]
},
{
"name": "projects",
"type": "object[]",
"required": true,
"description": "Activity grouped by Vercel project or draft status.",
"deprecated": false,
"arrayItems": {
"name": "item",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "kind",
"type": "'project' | 'drafts' | 'unavailable'",
"required": true,
"description": "Project grouping type.",
"deprecated": false
},
{
"name": "vercelProjectId",
"type": "string | null",
"required": true,
"description": "Vercel project identifier, when available.",
"deprecated": false
},
{
"name": "name",
"type": "string",
"required": true,
"description": "Project grouping display name.",
"deprecated": false
},
{
"name": "chatCount",
"type": "integer",
"required": true,
"description": "Distinct active chats.",
"deprecated": false
},
{
"name": "messageCount",
"type": "integer",
"required": true,
"description": "Assistant messages.",
"deprecated": false
},
{
"name": "activeDays",
"type": "integer",
"required": true,
"description": "Distinct active days.",
"deprecated": false
},
{
"name": "firstActivity",
"type": "string",
"required": true,
"description": "First activity timestamp.",
"deprecated": false
},
{
"name": "lastActivity",
"type": "string",
"required": true,
"description": "Most recent activity timestamp.",
"deprecated": false
}
]
}
},
{
"name": "chats",
"type": "object[]",
"required": true,
"description": "Activity grouped by chat.",
"deprecated": false,
"arrayItems": {
"name": "item",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "kind",
"type": "'chat' | 'unavailable'",
"required": true,
"description": "Chat availability type.",
"deprecated": false
},
{
"name": "chatId",
"type": "string",
"required": true,
"description": "Chat identifier.",
"deprecated": false
},
{
"name": "title",
"type": "string",
"required": true,
"description": "Chat title or availability label.",
"deprecated": false
},
{
"name": "vercelProjectId",
"type": "string | null",
"required": true,
"description": "Associated Vercel project identifier.",
"deprecated": false
},
{
"name": "projectName",
"type": "string | null",
"required": true,
"description": "Associated project name.",
"deprecated": false
},
{
"name": "messageCount",
"type": "integer",
"required": true,
"description": "Assistant messages.",
"deprecated": false
},
{
"name": "activeDays",
"type": "integer",
"required": true,
"description": "Distinct active days.",
"deprecated": false
},
{
"name": "firstActivity",
"type": "string",
"required": true,
"description": "First activity timestamp.",
"deprecated": false
},
{
"name": "lastActivity",
"type": "string",
"required": true,
"description": "Most recent activity timestamp.",
"deprecated": false
}
]
}
}
]}
/>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
