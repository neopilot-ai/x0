---
title: Find Rate Limit
description: Retrieves rate limit information for a given scope. Useful for monitoring usage limits and avoiding throttling.
badge: "GET"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.
# Find Rate Limit



<EndpointDisplay method="get" path="/rate-limits" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.rateLimits.find()

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET https://api.v0.dev/v1/rate-limits \
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
    "name": "scope",
    "type": "string",
    "required": false,
    "description": "The context or namespace to check rate limits for (e.g., a project slug or feature area)."
  }
]}
/>

### Response

<APISignature
  title=""
  parameters={[
  {
    "name": "remaining",
    "type": "number",
    "required": false,
    "description": "",
    "deprecated": false
  },
  {
    "name": "reset",
    "type": "number",
    "required": false,
    "description": "",
    "deprecated": false
  },
  {
    "name": "limit",
    "type": "number",
    "required": true,
    "description": "",
    "deprecated": false
  },
  {
    "name": "dailyLimit",
    "type": "object",
    "required": false,
    "description": "Daily message limit information for free users.",
    "deprecated": false,
    "properties": [
      {
        "name": "limit",
        "type": "number",
        "required": true,
        "description": "The maximum number of daily messages allowed for free users.",
        "deprecated": false
      },
      {
        "name": "remaining",
        "type": "number",
        "required": true,
        "description": "The number of messages the user has remaining for the day.",
        "deprecated": false
      },
      {
        "name": "reset",
        "type": "number",
        "required": true,
        "description": "Unix timestamp (in milliseconds) when the daily limit resets.",
        "deprecated": false
      },
      {
        "name": "isWithinGracePeriod",
        "type": "boolean",
        "required": true,
        "description": "Whether the user is within the 48-hour grace period for new users, during which usage tracking is disabled.",
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