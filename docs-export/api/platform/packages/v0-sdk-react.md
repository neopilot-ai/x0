---
title: v0 SDK React
description: React transport, message helpers, SWR hooks, sandbox, editor, and terminal components
product: v0
type: reference
---

# v0 SDK React

The `@v0-sdk/react` package provides the AI SDK transport, message helpers, generated SWR hooks, preview-host settings, and sandbox/editor/terminal components for integrating v0 into React applications.

## Installation

```bash
npm install @v0-sdk/react
```

## Chat transport and message helpers

Wire the AI SDK `useChat` hook to v0 with `V0Transport`, and convert API history with the message helpers:

```tsx
import { useChat as useAIChat } from '@ai-sdk/react'
import {
  V0Transport,
  toV0UIMessages,
  shouldResumeV0Chat,
  type V0UIMessage,
} from '@v0-sdk/react'

const transport = new V0Transport({
  chatId: initialChatId,
  messages: history,
  urls: {
    create: '/api/v0/chats/stream',
    send: (id) => `/api/v0/chats/${id}/messages/stream`,
    resume: (id) => `/api/v0/chats/${id}/resume`,
  },
  onChatCreated: setCreatedChatId,
})

const chat = useAIChat<V0UIMessage>({
  messages: toV0UIMessages(history),
  resume: shouldResumeV0Chat(history),
  transport,
})
```

Related helpers: `V0SnapshotChunkReducer`, `v0StreamToUIMessageStream`, `getResumableV0Assistant`, `prependV0UIMessageHistory`, `getV0PartId`, `serializeDates`, `toV0UIMessageMetadata`, `getPendingV0Task`. See the [React transport guide](/docs/api/v2/guides/react-transport) and [React chat example](/docs/api/v2/guides/react-chat-example).

## SWR hooks (`@v0-sdk/react/swr`)

47 generated hooks — one per API operation — plus `createV0Key`:

```tsx
import { useMessages, useStopMessage } from '@v0-sdk/react/swr'

const history = useMessages(chatId ? `/api/v0/chats/${chatId}/messages` : null, { limit: 50 })
```

Available hooks include `useCreateChat`, `useChats`, `useChat`, `useDeployChat`, `useDuplicateChat`, `usePreview`, `useMessages`, `useSendMessage`, `useResolveTask`, `useStopMessage`, `useResumeChat`, `useCreateMcpServer`, `useMcpServers`, `usePreviewHosts`, `useSetPreviewHosts`, `useUsageActivity`, `useUsageSummary`, `useCreateWebhook`, `useWebhooks`, and more.

## Sandbox preview

```tsx
import { V0SandboxProvider, V0SandboxPreview, useV0Sandbox } from '@v0-sdk/react'

function Preview({ chatId }: { chatId: string }) {
  return <V0SandboxPreview chatId="..." />
}

function CustomPreview({ chatId }: { chatId: string }) {
  const { state, refresh, iframeSrc, iframeSandbox } = useV0Sandbox(chatId)
  // render iframe yourself with refresh/retry controls
}
```

`V0SandboxProvider` accepts `chatId`, `options`, and a render-prop `children` receiving `{ state, refresh, iframeSandbox, iframeSrc }`.

## Code editor, terminal, and console components

```tsx
import {
  V0CodeEditor, V0DiffView, V0SplitView, V0FileExplorer,
  V0Terminal, V0PermissionGuard, V0CommandHistory,
  V0ConsolePanel, V0CodeEditorTab,
} from '@v0-sdk/react'
```

See [Code Editing](/docs/code-editing) and [Terminal Commands](/docs/terminal-commands).

## Preview-host settings

```tsx
import { usePreviewHosts } from '@v0-sdk/react'

const { hosts, setHosts, addHost, removeHost, isLoading, error } = usePreviewHosts()
```

## Request primitives

Low-level `requestV0Operation` machinery and types (`V0Fetch`, `V0HttpMethod`, `V0Operation`, `V0RequestOptions`, `V0ResponseKind`, `V0ResponseTransformer`, `V0ResponseError`) are also exported for custom integrations.

## Related

- [v0 SDK](/docs/api/platform/packages/v0-sdk)
- [React Transport Guide](/docs/api/v2/guides/react-transport)
- [Accessing Previews](/docs/api/v2/guides/accessing-previews)
