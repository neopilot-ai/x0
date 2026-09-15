---
title: Get Connect Setup Status
description: Polls the status of a Vercel Connect connector setup started by a `configure_vercel_connect` agent action. Open the `setupUrl` from the agent action data in a browser, then poll this endpoint every few seconds while `pending`. When it returns `ready`, resolve the chat with a `vercel-connect-setup` task to resume generation.
badge: "GET"
---

# Get Connect Setup Status



<EndpointDisplay method="get" path="/chats/{chatId}/connect/status" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0'

const result = await v0.chats.getConnectStatus({
  chatId: 'chat_abc123',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET "https://api.v0.dev/v2/chats/chat_abc123/connect/status" \
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
    "name": "chatId",
    "type": "string",
    "required": true,
    "description": "The unique identifier of the chat.",
    "deprecated": false
  }
]}
/>

#### Query Parameters

<APISignature
  title=""
  parameters={[
  {
    "name": "requestId",
    "type": "string",
    "required": true,
    "description": "The `requestId` from the `configure_vercel_connect` agent action data.",
    "deprecated": false
  }
]}
/>

### Response

<APISignature
  title=""
  parameters={[
  {
    "name": "status",
    "type": "'pending'",
    "required": true,
    "description": "Setup is still in progress.",
    "deprecated": false
  },
  {
    "name": "progress",
    "type": "string",
    "required": false,
    "description": "Current setup progress.",
    "deprecated": false
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)