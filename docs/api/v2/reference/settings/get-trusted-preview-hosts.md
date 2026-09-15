---
title: Get Trusted Preview Hosts
description: Returns the hostname patterns trusted to embed previews for the current team. Organization child teams inherit the parent organization’s hosts.
badge: "GET"
---

# Get Trusted Preview Hosts



<EndpointDisplay method="get" path="/settings/preview-hosts" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0'

const result = await v0.settings.getPreviewHosts()

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET "https://api.v0.dev/v2/settings/preview-hosts" \
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
    "name": "hosts",
    "type": "string[]",
    "required": true,
    "description": "Canonicalized hostname patterns trusted to embed previews. Exact hosts match only themselves; *.example.com matches exactly one subdomain label; **.example.com matches one or more subdomain labels. Wildcards do not include the apex, so list example.com separately when it should also be trusted.",
    "deprecated": false
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)