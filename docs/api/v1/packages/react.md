---
title: @v0-sdk/react
description: Headless React components for rendering v0 API content
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v1/packages/v0-sdk
  - /docs/api/v1/guides/displaying-chat-messages
---

# @v0-sdk/react



Headless React components for rendering content from the v0 API. Provides components for streaming messages, code blocks, thinking sections, and more.

## Installation

```bash
npm install @v0-sdk/react
# or
pnpm add @v0-sdk/react
# or
yarn add @v0-sdk/react
```

## Quick Start

```tsx
import { StreamingMessage } from '@v0-sdk/react'

function ChatInterface({ message }) {
  return (
    <StreamingMessage
      message={message}
      onComplete={(result) => {
        console.log('Streaming complete:', result)
      }}
    />
  )
}
```

## Components

### StreamingMessage

Renders streaming chat messages with real-time updates.

```tsx
import { StreamingMessage } from '@v0-sdk/react'

function Chat() {
  return (
    <StreamingMessage
      message={streamingData}
      theme="elegant"
      className="my-message"
      onComplete={(result) => {
        // Handle completion
      }}
      onError={(error) => {
        // Handle errors
      }}
    />
  )
}
```

#### Props

* `message` - The streaming message data
* `theme?` - Visual theme (`elegant`, `minimal`, `neobrutalism`, `terminal`)
* `className?` - Additional CSS classes
* `onComplete?` - Callback when streaming completes
* `onError?` - Callback for error handling

### CodeBlock

Syntax-highlighted code blocks with copy functionality.

```tsx
import { CodeBlock } from '@v0-sdk/react'

function CodeDisplay() {
  return (
    <CodeBlock
      code={generatedCode}
      language="typescript"
      showLineNumbers
      copyable
      theme="dark"
    />
  )
}
```

#### Props

* `code` - The code string to display
* `language` - Programming language for syntax highlighting
* `showLineNumbers?` - Display line numbers
* `copyable?` - Show copy button
* `theme?` - Color theme for syntax highlighting

### ThinkingSection

Displays AI thinking process with animated indicators.

```tsx
import { ThinkingSection } from '@v0-sdk/react'

function AIThinking() {
  return (
    <ThinkingSection
      thoughts={aiThoughts}
      isVisible={showThinking}
      animated
      collapsible
    />
  )
}
```

#### Props

* `thoughts` - Array of thinking steps
* `isVisible?` - Control visibility
* `animated?` - Enable animations
* `collapsible?` - Allow collapse/expand

### TaskSection

Renders task lists and progress indicators.

```tsx
import { TaskSection } from '@v0-sdk/react'

function TaskProgress() {
  return (
    <TaskSection
      tasks={taskList}
      showProgress
      interactive
      onTaskComplete={(task) => {
        // Handle task completion
      }}
    />
  )
}
```

#### Props

* `tasks` - Array of task objects
* `showProgress?` - Display progress bar
* `interactive?` - Allow user interaction
* `onTaskComplete?` - Callback for task completion

## Themes

### Built-in Themes

```tsx
// Elegant - Sophisticated design
<StreamingMessage message={data} theme="elegant" />

// Minimal - Clean, distraction-free
<StreamingMessage message={data} theme="minimal" />

// Neobrutalism - Bold, high-contrast
<StreamingMessage message={data} theme="neobrutalism" />

// Terminal - Developer-focused
<StreamingMessage message={data} theme="terminal" />
```

### Custom Themes

```tsx
const customTheme = {
  primary: '#3b82f6',
  background: '#f8fafc',
  text: '#1e293b',
  accent: '#06b6d4',
  border: '#e2e8f0',
}

<StreamingMessage
  message={data}
  theme={customTheme}
/>
```

## Hooks

### useStreamingChat

Hook for managing streaming chat state.

```tsx
import { useStreamingChat } from '@v0-sdk/react'

function ChatApp() {
  const { messages, sendMessage, isLoading, error, clearMessages } =
    useStreamingChat({
      apiKey: process.env.V0_API_KEY,
      onMessage: (message) => {
        console.log('New message:', message)
      },
    })

  return (
    <div>
      {messages.map((message, index) => (
        <StreamingMessage key={index} message={message} />
      ))}

      <button onClick={() => sendMessage('Hello!')}>Send Message</button>
    </div>
  )
}
```

### useCodeHighlight

Hook for syntax highlighting with custom themes.

```tsx
import { useCodeHighlight } from '@v0-sdk/react'

function CustomCodeBlock({ code, language }) {
  const { highlightedCode, isLoading } = useCodeHighlight({
    code,
    language,
    theme: 'github-dark',
  })

  if (isLoading) return <div>Loading...</div>

  return <pre dangerouslySetInnerHTML={{ __html: highlightedCode }} />
}
```

## Styling

### CSS Custom Properties

```css
:root {
  --v0-primary: #3b82f6;
  --v0-background: #ffffff;
  --v0-text: #1e293b;
  --v0-border: #e2e8f0;
  --v0-accent: #06b6d4;
}

.dark {
  --v0-primary: #60a5fa;
  --v0-background: #0f172a;
  --v0-text: #f1f5f9;
  --v0-border: #334155;
  --v0-accent: #22d3ee;
}
```

### Tailwind CSS Classes

The components work seamlessly with Tailwind CSS:

```tsx
<StreamingMessage
  message={data}
  className="rounded-lg border border-gray-200 p-4 shadow-sm"
/>
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type {
  StreamingMessageProps,
  CodeBlockProps,
  ThinkingSectionProps,
  ChatMessage,
  StreamingState,
} from '@v0-sdk/react'

interface CustomChatProps {
  messages: ChatMessage[]
  onSendMessage: (message: string) => void
}

const CustomChat: React.FC<CustomChatProps> = ({ messages, onSendMessage }) => {
  // Component implementation
}
```

## Requirements

* React 18+ or React 19+
* TypeScript 5.0+ (for TypeScript projects)

## Links

* [GitHub Repository](https://github.com/vercel/v0-sdk/tree/main/packages/react)
* [npm Package](https://www.npmjs.com/package/@v0-sdk/react)
* [React Examples](/docs/api/v1/examples/react-components)


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)