---
title: Displaying Chat Messages
description: Learn how to render and format chat messages from the v0 API using @v0-sdk/react
product: v0 API
type: guide
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v1/packages/react
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.
# Displaying Chat Messages



Learn how to properly render chat messages from the v0 API using the **@v0-sdk/react** headless React library. This guide covers handling different message types, implementing streaming updates, and customizing message rendering.

## Overview

The **@v0-sdk/react** library provides headless React components and hooks for rendering rich chat messages from the v0 API. It handles complex message formats including:

* **Text content** - Plain text and markdown with custom styling
* **Code blocks** - Syntax-highlighted code snippets with copy functionality
* **Code projects** - Multi-file code projects with collapsible sections
* **Math expressions** - LaTeX math rendering (inline and block)
* **Thinking sections** - AI reasoning process with animated indicators
* **Task sections** - Task execution steps with status tracking
* **Streaming content** - Real-time message updates with loading states

## Installation

First, install the required packages:

```bash
npm install @v0-sdk/react v0-sdk
# For math rendering support
npm install katex
```

Import the required CSS in your app:

```tsx
// In your layout or main CSS file
import 'katex/dist/katex.min.css'
```

## Quick Start

### Basic Message Component

The simplest way to render a message is using the `Message` component:

```tsx
import { Message } from '@v0-sdk/react'

function ChatMessage({ message }) {
  return (
    <Message
      content={message.content} // Parsed MessageBinaryFormat from API
      messageId={message.id}
      role={message.role}
      className="space-y-4"
    />
  )
}
```

### Fetching and Parsing Messages

First, retrieve messages from a chat and parse the content:

```typescript
import { v0 } from 'v0-sdk'

// Get all messages from a chat using the default client
const messages = await v0.chats.findMessages({
  chatId: 'your-chat-id',
})

// Parse the content for rendering
const parsedMessages = messages.data.map((msg) => ({
  ...msg,
  content: JSON.parse(msg.content), // Convert to MessageBinaryFormat
}))
```

If you need custom configuration (API key, base URL, etc.), use `createClient`:

```typescript
import { createClient } from 'v0-sdk'

const client = createClient({
  apiKey: process.env.V0_API_KEY,
  baseUrl: process.env.V0_API_URL, // optional custom base URL
})

const messages = await client.chats.findMessages({
  chatId: 'your-chat-id',
})
```

### Message Binary Format

The v0 API returns messages in a special binary format that encodes rich content:

```typescript
type MessageBinaryFormat = [number, ...any[]][]

// Example structure:
[
  [0, [  // Type 0 = markdown/content data
    ['p', {}, 'Hello world'],
    ['h1', {}, 'Title'],
    ['Codeblock', { lang: 'tsx' }, 'const x = 1']
  ]],
  [1, { context: [...] }],  // Type 1 = metadata
  [2, 'x = \\frac{-b}{2a}'], // Type 2 = inline math
  [3, 'e^{i\\pi} + 1 = 0']   // Type 3 = block math
]
```

## Customizing Message Rendering

### Using Custom Components

The `Message` component accepts a `components` prop to customize how different elements are rendered:

```tsx
import { Message, CodeBlock, MathPart } from '@v0-sdk/react'

function CustomChatMessage({ message }) {
  return (
    <Message
      content={message.content}
      messageId={message.id}
      role={message.role}
      className="space-y-4"
      components={{
        // Custom component renderers
        CodeBlock: MyCustomCodeBlock,
        MathPart: MyCustomMathRenderer,
        ThinkingSection: MyCustomThinkingSection,
        TaskSection: MyCustomTaskSection,

        // HTML element styling with className objects
        p: { className: 'mb-4 text-gray-800 leading-relaxed' },
        h1: { className: 'text-2xl font-bold text-gray-900 mb-4' },
        h2: { className: 'text-xl font-semibold text-gray-900 mb-3' },
        ul: { className: 'list-disc list-inside space-y-1 mb-4' },
        code: { className: 'bg-gray-100 px-2 py-1 rounded text-sm' },
        a: { className: 'text-blue-600 hover:text-blue-800 underline' },
      }}
    />
  )
}
```

### Custom Code Block Component

Create a custom code block with additional features:

```tsx
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

function MyCustomCodeBlock({
  language,
  code,
  className,
}: {
  language: string
  code: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-sm text-gray-300">
        <span className="font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="hover:text-white transition-colors px-2 py-1 rounded"
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0 }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
```

### Custom Math Component

Customize math rendering with additional styling:

```tsx
import 'katex/dist/katex.min.css'

function MyCustomMathRenderer({
  content,
  inline = false,
  className,
}: {
  content: string
  inline?: boolean
  className?: string
}) {
  // Use KaTeX or your preferred math renderer
  const katex = require('katex')

  const html = katex.renderToString(content, {
    displayMode: !inline,
    throwOnError: false,
  })

  return (
    <span
      className={`${inline ? 'inline-math' : 'block-math'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
```

## Complete Chat Interface

Here's a complete chat interface using @v0-sdk/react:

```tsx
import { Message } from '@v0-sdk/react'
import { formatTime } from '@/lib/utils'

function ChatInterface({ messages }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  )
}

function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`
        w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0
        ${isUser ? 'bg-blue-600' : 'bg-purple-600'}
      `}
      >
        {isUser ? 'U' : 'AI'}
      </div>

      {/* Message bubble */}
      <div
        className={`
        flex-1 max-w-[80%] rounded-2xl px-4 py-3
        ${
          isUser
            ? 'bg-blue-600 text-white ml-12'
            : 'bg-gray-100 text-gray-900 mr-12'
        }
      `}
      >
        {/* Timestamp */}
        <div
          className={`text-xs mb-2 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}
        >
          {formatTime(message.createdAt)}
        </div>

        {/* Message content */}
        <Message
          content={message.content}
          messageId={message.id}
          role={message.role}
          components={{
            // Customize styling based on message role
            p: {
              className: isUser
                ? 'mb-2 text-white last:mb-0'
                : 'mb-2 text-gray-900 last:mb-0',
            },
            code: {
              className: isUser
                ? 'bg-blue-700 text-blue-100 px-1 py-0.5 rounded text-sm'
                : 'bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-sm',
            },
            a: {
              className: isUser
                ? 'text-blue-200 hover:text-blue-100 underline'
                : 'text-blue-600 hover:text-blue-800 underline',
            },
          }}
        />
      </div>
    </div>
  )
}
```

## Streaming Messages

The `StreamingMessage` component handles real-time message updates from the v0 API:

```tsx
import { useState } from 'react'
import { v0 } from 'v0-sdk'
import { StreamingMessage } from '@v0-sdk/react'

function StreamingChatDemo() {
  const [stream, setStream] = useState<ReadableStream<Uint8Array> | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (message: string) => {
    setIsLoading(true)

    try {
      // Create streaming response
      const response = await v0.chats.create({
        message,
        responseMode: 'experimental_stream', // Enable streaming
      })

      setStream(response)
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Chat messages */}
      <div className="space-y-6 mb-6">
        {/* Previous messages would go here */}

        {/* Streaming message */}
        {stream && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
              AI
            </div>
            <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-3">
              <StreamingMessage
                stream={stream}
                messageId={`streaming-${Date.now()}`}
                role="assistant"
                showLoadingIndicator={true}
                loadingComponent={<TypingIndicator />}
                errorComponent={(error) => (
                  <div className="text-red-600 p-2 bg-red-50 rounded">
                    Error: {error}
                  </div>
                )}
                onComplete={(content) => {
                  console.log('Streaming complete:', content)
                  setStream(null) // Clear stream when done
                }}
                onChatData={(chatData) => {
                  console.log('Chat metadata:', chatData)
                }}
                components={{
                  p: { className: 'mb-2 text-gray-900 last:mb-0' },
                  code: {
                    className:
                      'bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-sm',
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Message input */}
      <MessageInput onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-gray-500">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
      </div>
      <span className="text-sm">AI is thinking...</span>
    </div>
  )
}

function MessageInput({ onSend, isLoading }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSend(input.trim())
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  )
}
```

### Headless Streaming Hook

For more control, use the headless `useStreamingMessageData` hook:

```tsx
import { useStreamingMessageData } from '@v0-sdk/react'

function CustomStreamingMessage({ stream }) {
  const { content, isStreaming, error, chatData, messageData } =
    useStreamingMessageData({
      stream,
      messageId: 'custom-stream',
      onChunk: (chunk) => console.log('New chunk:', chunk),
      onComplete: (finalContent) => console.log('Complete:', finalContent),
      onError: (error) => console.error('Stream error:', error),
    })

  if (error) {
    return <div className="text-red-600">Error: {error}</div>
  }

  if (isStreaming && content.length === 0) {
    return <div className="text-gray-500">Loading...</div>
  }

  // Render your custom UI with messageData
  return (
    <div className="custom-message">
      {messageData?.elements.map((element) => (
        // Custom rendering logic based on element.type
        <div key={element.key}>{/* Custom element renderer */}</div>
      ))}
      {isStreaming && <div className="animate-pulse">▊</div>}
    </div>
  )
}
```

## Best Practices

### 1. Performance Optimization

Use React.memo and proper key props for message lists:

```tsx
import React from 'react'
import { Message } from '@v0-sdk/react'

const ChatMessage = React.memo(({ message }) => {
  return (
    <div className="message-container">
      <Message
        content={message.content}
        messageId={message.id}
        role={message.role}
        // Use stable component references
        components={messageComponents}
      />
    </div>
  )
})

// Define components outside render to prevent re-creation
const messageComponents = {
  p: { className: 'mb-2 text-gray-900' },
  code: { className: 'bg-gray-100 px-1 py-0.5 rounded text-sm' },
  // ... other components
}

function ChatList({ messages }) {
  return (
    <div>
      {messages.map((message) => (
        <ChatMessage
          key={message.id} // Stable key
          message={message}
        />
      ))}
    </div>
  )
}
```

### 2. Error Handling

Wrap message rendering in error boundaries:

```tsx
import React from 'react'

class MessageErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Message render error:', error, errorInfo)
    // Log to your error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-600 p-3 bg-red-50 rounded border border-red-200">
          <p className="font-semibold">Failed to render message</p>
          <p className="text-sm mt-1">
            The message content could not be displayed properly.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

// Usage
function SafeChatMessage({ message }) {
  return (
    <MessageErrorBoundary>
      <Message
        content={message.content}
        messageId={message.id}
        role={message.role}
      />
    </MessageErrorBoundary>
  )
}
```

### 3. Accessibility

Ensure proper ARIA labels and keyboard navigation:

```tsx
function AccessibleChatMessage({ message, index, totalMessages }) {
  return (
    <div
      role="article"
      aria-label={`Message ${index + 1} of ${totalMessages} from ${message.role}`}
      aria-describedby={`message-time-${message.id}`}
      tabIndex={0}
      className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-white text-sm font-semibold">
            {message.role === 'user' ? 'U' : 'AI'}
          </span>
        </div>

        <div className="flex-1">
          <div
            id={`message-time-${message.id}`}
            className="text-xs text-gray-500 mb-1"
            aria-label={`Sent at ${formatTime(message.createdAt)}`}
          >
            {formatTime(message.createdAt)}
          </div>

          <Message
            content={message.content}
            messageId={message.id}
            role={message.role}
            components={{
              // Add proper heading hierarchy
              h1: { className: 'text-xl font-bold mb-2' },
              h2: { className: 'text-lg font-semibold mb-2' },
              // Ensure links are accessible
              a: {
                className: 'text-blue-600 underline hover:text-blue-800',
                // Will automatically get target="_blank" rel="noopener noreferrer"
              },
              // Make code blocks focusable for screen readers
              pre: {
                className:
                  'bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto',
                tabIndex: 0,
                role: 'region',
                'aria-label': 'Code block',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
```

### 4. Theme Support

Create reusable theme configurations:

```tsx
// themes.ts
export const themes = {
  light: {
    p: { className: 'mb-2 text-gray-900' },
    h1: { className: 'text-2xl font-bold text-gray-900 mb-4' },
    code: {
      className: 'bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm',
    },
    a: { className: 'text-blue-600 hover:text-blue-800 underline' },
    blockquote: {
      className: 'border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4',
    },
  },
  dark: {
    p: { className: 'mb-2 text-gray-100' },
    h1: { className: 'text-2xl font-bold text-gray-100 mb-4' },
    code: {
      className: 'bg-gray-800 text-gray-200 px-1 py-0.5 rounded text-sm',
    },
    a: { className: 'text-blue-400 hover:text-blue-300 underline' },
    blockquote: {
      className: 'border-l-4 border-gray-600 pl-4 italic text-gray-300 my-4',
    },
  },
}

// Usage
function ThemedMessage({ message, theme = 'light' }) {
  return (
    <Message
      content={message.content}
      messageId={message.id}
      role={message.role}
      components={themes[theme]}
    />
  )
}
```

## Utilities

### Time Formatting

```typescript
function formatTime(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`

  return date.toLocaleDateString()
}
```

### Message Processing

```typescript
import type { MessageBinaryFormat } from '@v0-sdk/react'

// Helper to check if message content is empty
function isMessageEmpty(content: MessageBinaryFormat): boolean {
  if (!Array.isArray(content) || content.length === 0) return true

  // Check if any content rows have actual data
  return !content.some(([type, data]) => {
    if (type === 0 && Array.isArray(data)) {
      return data.some((element) => {
        if (typeof element === 'string') return element.trim().length > 0
        if (Array.isArray(element) && element.length > 2) {
          return element
            .slice(2)
            .some((child) =>
              typeof child === 'string' ? child.trim().length > 0 : true,
            )
        }
        return false
      })
    }
    return type === 2 || type === 3 // Math content
  })
}

// Helper to extract text content from message
function extractTextContent(content: MessageBinaryFormat): string {
  if (!Array.isArray(content)) return ''

  const textParts: string[] = []

  content.forEach(([type, data]) => {
    if (type === 0 && Array.isArray(data)) {
      data.forEach((element) => {
        if (typeof element === 'string') {
          textParts.push(element)
        } else if (Array.isArray(element) && element.length > 2) {
          element.slice(2).forEach((child) => {
            if (typeof child === 'string') {
              textParts.push(child)
            }
          })
        }
      })
    } else if (type === 2 || type === 3) {
      textParts.push(data) // Math content
    }
  })

  return textParts.join(' ').trim()
}

// Helper to get message preview for notifications
function getMessagePreview(
  content: MessageBinaryFormat,
  maxLength = 100,
): string {
  const text = extractTextContent(content)
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}
```

### Custom Hook for Message Management

```typescript
import { useState, useCallback } from 'react'
import type { MessageBinaryFormat } from '@v0-sdk/react'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: MessageBinaryFormat
  createdAt: string
}

export function useMessages() {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message])
  }, [])

  const updateMessage = useCallback(
    (id: string, updates: Partial<ChatMessage>) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg)),
      )
    },
    [],
  )

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id))
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    addMessage,
    updateMessage,
    removeMessage,
    clearMessages,
  }
}
```

## Headless Architecture

The @v0-sdk/react library follows a headless architecture pattern, giving you complete control over styling and behavior:

### Using Headless Hooks

```tsx
import { useMessage, useStreamingMessageData } from '@v0-sdk/react'

function MyCustomRenderer({ message, stream }) {
  // For static messages
  const messageData = useMessage({
    content: message.content,
    messageId: message.id,
    role: message.role,
  })

  // For streaming messages
  const streamingData = useStreamingMessageData({
    stream,
    messageId: 'streaming-msg',
  })

  // Build your own UI using the processed data
  return (
    <div className="my-custom-chat">
      {/* Your custom rendering logic */}
      {messageData.elements.map((element) => (
        <MyCustomElement key={element.key} element={element} />
      ))}
    </div>
  )
}
```

### Available Hooks

* **`useMessage`** - Process static message content into renderable data
* **`useStreamingMessageData`** - Handle streaming messages with real-time updates
* **`useCodeBlock`** - Process code block data for custom rendering
* **`useMath`** - Process LaTeX math for custom rendering
* **`useThinkingSection`** - Handle AI thinking sections
* **`useTaskSection`** - Process task execution data

## Next Steps

* Explore the [v0-sdk GitHub repository](https://github.com/vercel/v0-sdk) for more examples
* Check out the [React Components Example](/docs/api/v1/examples/react-components) for a complete implementation
* Learn about [Lock Files from AI Changes](/docs/api/v1/guides/lock-files-from-ai-changes) to handle concurrent editing
* Try different themes in the [v0-sdk-react-example](https://github.com/vercel/v0-sdk/tree/main/examples/v0-sdk-react-example) directory


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)