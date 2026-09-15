---
title: Get Billing
description: Fetches billing usage and quota information for the authenticated user. Can be scoped to a specific context (e.g. project or namespace).
badge: "GET"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.
# Get Billing



<EndpointDisplay method="get" path="/user/billing" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.user.getBilling()

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET https://api.v0.dev/v1/user/billing \
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
    "description": "Filters billing data by a specific scope, such as a project ID or slug."
  }
]}
/>

### Response

<APISignature
  title=""
  parameters={[
  {
    "name": "billingType",
    "type": "'legacy'",
    "required": false,
    "description": "",
    "deprecated": false
  },
  {
    "name": "data",
    "type": "object",
    "required": false,
    "description": "",
    "deprecated": false,
    "properties": [
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
      }
    ]
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)