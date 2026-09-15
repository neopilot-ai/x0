---
title: List Webhooks
description: Retrieves a list of all webhooks in your workspace.
badge: "GET"
---

# List Webhooks



<EndpointDisplay method="get" path="/hooks" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0'

const result = await v0.webhooks.list()

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET "https://api.v0.dev/v2/hooks" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json"`}
  />
</CustomCodeBlock>

## API Signature

### Request

### Response

<APISignature
  title=""
  parameters={[
  {
    "name": "items",
    "type": "object[]",
    "required": true,
    "description": "",
    "deprecated": false,
    "properties": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "The unique identifier of the webhook.",
        "deprecated": false
      },
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "The name of the webhook.",
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