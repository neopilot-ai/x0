---
title: Capturing Preview Console Logs
description: Capture client and emulated server console output from an API v1 preview iframe
product: v0 API
type: guide
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# Capturing Preview Console Logs

API v1 previews use v0's next-lite runtime. Next-lite runs both client code and emulated Next.js server code in the browser, inside the preview iframe. You can capture that code's console output in the application embedding the iframe.

The preview forwards these console methods:

- `console.log`
- `console.info`
- `console.warn`
- `console.error`
- `console.debug`
- Uncaught errors and unhandled promise rejections

Each event includes a formatted message, an ISO timestamp, the console method, and an `isServer` flag indicating whether the log came from emulated server code.

<Callout type="info">
  `isServer` describes which next-lite execution context produced the log. It is not a security boundary: the code still runs in the browser, and its logs are visible there.
</Callout>

## Install the channel package

The preview uses [`postMessage`](https://developer.mozilla.org/docs/Web/API/Window/postMessage) to establish a [`MessageChannel`](https://developer.mozilla.org/docs/Web/API/MessageChannel). Console events then travel over that channel using `bidc`.

Install the same channel package used by the preview:

```bash
pnpm add bidc@0.0.3
```

A regular `window.addEventListener('message', ...)` listener only sees the channel handshake and other direct preview events. Use `bidc` to receive the console records sent over the transferred `MessagePort`.

## Connect to the preview

Create a channel for the iframe's `contentWindow`, listen for the `sendConsoleLog` method, and validate every event before using it:

```typescript
import { createChannel, type SerializableValue } from 'bidc'

export type PreviewConsoleLog = {
  method: 'log' | 'info' | 'warn' | 'error' | 'debug'
  message: string
  isServer?: boolean
  timestamp: string
}

const consoleMethods = new Set<PreviewConsoleLog['method']>([
  'log',
  'info',
  'warn',
  'error',
  'debug',
])

function isPreviewConsoleLog(value: unknown): value is PreviewConsoleLog {
  if (!value || typeof value !== 'object') return false

  const log = value as Partial<PreviewConsoleLog>

  return (
    typeof log.method === 'string' &&
    consoleMethods.has(log.method as PreviewConsoleLog['method']) &&
    typeof log.message === 'string' &&
    typeof log.timestamp === 'string' &&
    (log.isServer === undefined || typeof log.isServer === 'boolean')
  )
}

function isConsoleCall(value: unknown): value is { method: 'sendConsoleLog'; args: [unknown] } {
  if (!value || typeof value !== 'object') return false

  const call = value as { method?: unknown; args?: unknown }

  return call.method === 'sendConsoleLog' && Array.isArray(call.args) && call.args.length > 0
}

export function connectPreviewConsole(
  iframe: HTMLIFrameElement,
  onLog: (log: PreviewConsoleLog) => void,
) {
  if (!iframe.contentWindow) {
    throw new Error('The preview iframe is not mounted')
  }

  const channel = createChannel(iframe.contentWindow)

  void channel.receive((data: SerializableValue) => {
    if (!isConsoleCall(data)) return

    const log = data.args[0]
    if (!isPreviewConsoleLog(log)) return

    onLog(log)
  })

  return () => channel.cleanup()
}
```

Create the channel after the iframe is mounted. Call `cleanup()` when removing or replacing the iframe. The channel reconnects when the preview document reloads.

## Complete React example

The following client component embeds the API's `demoUrl`, keeps the latest 500 events, and renders the messages as text:

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { connectPreviewConsole, type PreviewConsoleLog } from './preview-console'

const MAX_LOGS = 500

export function PreviewWithConsole({ demoUrl }: { demoUrl: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [logs, setLogs] = useState<PreviewConsoleLog[]>([])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    return connectPreviewConsole(iframe, (log) => {
      setLogs((current) => [...current.slice(-(MAX_LOGS - 1)), log])
    })
  }, [demoUrl])

  const output = logs
    .map((log) => {
      const context = log.isServer ? 'server' : 'client'
      return `[${log.timestamp}] [${context}] [${log.method}] ${log.message}`
    })
    .join('\n')

  return (
    <div>
      <iframe
        key={demoUrl}
        ref={iframeRef}
        src={demoUrl}
        sandbox="allow-scripts allow-same-origin allow-forms"
        title="Generated application preview"
        width="100%"
        height="600"
      />

      <pre aria-live="polite">{output || 'No console output yet.'}</pre>
    </div>
  )
}
```

Obtain `demoUrl` from `chat.latestVersion.demoUrl` on your server, as shown in the [API v1 quickstart](/docs/api/v1/quickstart), and pass it to the client component. Keep your v0 API key on the server.

## Event format

A received console event has this shape:

```json
{
  "method": "log",
  "message": "Loaded 3 products",
  "isServer": true,
  "timestamp": "2026-04-28T12:34:56.789Z"
}
```

Console arguments are formatted into `message` before being sent. For example, `console.log('user', { id: 123 })` produces one string rather than preserving the original argument array.

Some internal framework messages are filtered to reduce noise. This channel is intended for application debugging and should not be treated as a complete audit log.

## Security considerations

Generated previews and their log events are untrusted input:

- Render `message` as text. Do not pass it to `dangerouslySetInnerHTML` or `eval`.
- Do not trigger privileged actions based on a log message.
- Limit retained events and redact sensitive values before sending logs to your own backend.
- Keep the preview on its v0-provided, cross-origin `demoUrl` and use an iframe sandbox. Add permissions such as `allow-popups` or `allow-downloads` only if the generated application needs them.
- Never put secrets in next-lite server code. Although that code uses server APIs, it executes in the browser.

<Callout type="warn">
  This guide applies to next-lite previews created with API v1. API v2 uses VM-backed previews and does not expose console output through this next-lite channel.
</Callout>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
