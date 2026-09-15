---
title: Set Trusted Preview Hosts
description: Sets the host patterns trusted to embed previews for a standalone team or parent organization. Organization child teams cannot override this setting.
badge: "PUT"
---

# Set Trusted Preview Hosts



<EndpointDisplay method="put" path="/settings/preview-hosts" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0'

const result = await v0.settings.setPreviewHosts({
  hosts: ['*.example.com'],
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X PUT "https://api.v0.dev/v2/settings/preview-hosts" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"hosts":["*.example.com"]}'`}
  />
</CustomCodeBlock>

## API Signature

### Request

#### Request Body

<APISignature
  title=""
  parameters={[
  {
    "name": "hosts",
    "type": "string[]",
    "required": true,
    "description": "The complete list of exact or wildcard hostname patterns trusted to embed previews. Provide hostnames only, without a scheme, port, path, userinfo, query string, or fragment. Use *.example.com for exactly one subdomain label and **.example.com for one or more. Wildcards do not include example.com itself; add the apex as a separate entry when needed.",
    "deprecated": false
  }
]}
/>

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