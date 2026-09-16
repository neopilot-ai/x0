---
title: Get User Activity Report
description: Retrieves aggregated user activity data for team members, including chat counts, message counts, and activity timestamps. Shows the same data as displayed in the Usage settings for Enterprise teams. Only available for Enterprise teams with OWNER or BILLING role.
badge: 'GET'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# Get User Activity Report

<EndpointDisplay method="get" path="/reports/user-activity" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.reports.getUserActivity()

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X GET https://api.v0.dev/v1/reports/user-activity \
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
"description": "Start date for the activity period in ISO 8601 format. If not provided, defaults to the beginning of available data.",
"deprecated": false
},
{
"name": "endDate",
"type": "string",
"required": false,
"description": "End date for the activity period in ISO 8601 format. If not provided, defaults to the current date.",
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
"description": "",
"deprecated": false
},
{
"name": "data",
"type": "object[]",
"required": true,
"description": "Array of user activity records",
"deprecated": false,
"arrayItems": {
"name": "item",
"type": "object",
"required": true,
"description": "User activity record",
"deprecated": false,
"properties": [
{
"name": "id",
"type": "string",
"required": true,
"description": "User ID",
"deprecated": false
},
{
"name": "object",
"type": "'user_activity'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "user",
"type": "object",
"required": true,
"description": "User information",
"deprecated": false,
"properties": [
{
"name": "id",
"type": "string",
"required": true,
"description": "User ID",
"deprecated": false
},
{
"name": "object",
"type": "'user'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "name",
"type": "string",
"required": false,
"description": "User's display name",
"deprecated": false
},
{
"name": "email",
"type": "string",
"required": true,
"description": "User's email address",
"deprecated": false
},
{
"name": "avatar",
"type": "string",
"required": true,
"description": "URL to user's avatar image",
"deprecated": false
},
{
"name": "createdAt",
"type": "string",
"required": true,
"description": "ISO 8601 timestamp of when the user was created",
"deprecated": false
},
{
"name": "updatedAt",
"type": "string",
"required": false,
"description": "ISO 8601 timestamp of when the user was last updated",
"deprecated": false
},
{
"name": "teamV0Role",
"type": "'V0Builder' | 'V0Chatter' | 'V0Viewer' | null",
"required": true,
"description": "The user's v0 role, or null if no role is assigned",
"deprecated": false
}
]
},
{
"name": "chatCount",
"type": "number",
"required": true,
"description": "Total number of chats created by the user",
"deprecated": false
},
{
"name": "messageCount",
"type": "number",
"required": true,
"description": "Total number of messages sent by the user",
"deprecated": false
},
{
"name": "activeDays",
"type": "number",
"required": true,
"description": "Number of distinct days the user was active",
"deprecated": false
},
{
"name": "firstActivity",
"type": "string | null",
"required": true,
"description": "ISO 8601 timestamp of the user's first activity, or null if no activity",
"deprecated": false
},
{
"name": "lastActivity",
"type": "string | null",
"required": true,
"description": "ISO 8601 timestamp of the user's last activity, or null if no activity",
"deprecated": false
}
]
}
},
{
"name": "meta",
"type": "object",
"required": true,
"description": "Metadata about the response",
"deprecated": false,
"properties": [
{
"name": "totalCount",
"type": "number",
"required": true,
"description": "Total number of users in the response",
"deprecated": false
},
{
"name": "dateRange",
"type": "object",
"required": true,
"description": "The date range of the query",
"deprecated": false,
"properties": [
{
"name": "start",
"type": "string | null",
"required": true,
"description": "ISO 8601 start date, or null if not specified",
"deprecated": false
},
{
"name": "end",
"type": "string | null",
"required": true,
"description": "ISO 8601 end date, or null if not specified",
"deprecated": false
}
]
}
]
}
]}
/>

## Authorization

This endpoint is only available for:

- **Enterprise teams** (`v0-enterprise` plan)
- Users with **OWNER** or **BILLING** role on the team

## Behavior

- Returns all team members who have v0 access, including those with zero activity
- The date range cannot exceed 365 days
- Start date must not be after end date
- All timestamps are in ISO 8601 format

## Notes

This endpoint shows the same data as displayed in the Usage settings for Enterprise teams. It provides a comprehensive view of team member activity, making it useful for team administrators to monitor engagement and usage patterns.

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
