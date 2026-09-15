---
title: Get Plan
description: Returns the current subscription plan for the authenticated user, including tier details and feature limits.
badge: "GET"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.
# Get Plan



<EndpointDisplay method="get" path="/user/plan" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.user.getPlan()

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET https://api.v0.dev/v1/user/plan \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json"`}
  />
</CustomCodeBlock>

### Response

<APISignature
  title=""
  parameters={[
  {
    "name": "object",
    "type": "'plan'",
    "required": true,
    "description": "",
    "deprecated": false
  },
  {
    "name": "plan",
    "type": "string",
    "required": true,
    "description": "",
    "deprecated": false
  },
  {
    "name": "billingCycle",
    "type": "object",
    "required": true,
    "description": "",
    "deprecated": false,
    "properties": [
      {
        "name": "start",
        "type": "number",
        "required": true,
        "description": "",
        "deprecated": false
      },
      {
        "name": "end",
        "type": "number",
        "required": true,
        "description": "",
        "deprecated": false
      }
    ]
  },
  {
    "name": "balance",
    "type": "object",
    "required": true,
    "description": "",
    "deprecated": false,
    "properties": [
      {
        "name": "remaining",
        "type": "number",
        "required": true,
        "description": "",
        "deprecated": false
      },
      {
        "name": "total",
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