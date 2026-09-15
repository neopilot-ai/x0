---
title: Delete Hook
description: Deletes a webhook based on its ID. This action is irreversible.
badge: "DEL"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

# Delete Hook



<EndpointDisplay method="delete" path="/hooks/{hookId}" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.hooks.delete({
  hookId: '123',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X DELETE https://api.v0.dev/v1/hooks/123 \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json"`}
  />
</CustomCodeBlock>

## API Signature

### Request

#### Path Parameters

<APISignature
  title=""
  parameters={[
  {
    "name": "hookId",
    "type": "string",
    "required": true,
    "description": "The ID of the webhook to delete. Provided as a path parameter."
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
    "description": "",
    "deprecated": false
  },
  {
    "name": "object",
    "type": "'hook'",
    "required": true,
    "description": "",
    "deprecated": false
  },
  {
    "name": "deleted",
    "type": "'true'",
    "required": true,
    "description": "",
    "deprecated": false
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)