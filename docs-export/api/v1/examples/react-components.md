---
title: React Components Example
description: Using v0-sdk React components for streaming UI responses
product: v0 API
type: guide
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v1/packages/react
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# React Components Example

Explore different design themes and interactive components for rendering real-time AI responses. This showcase demonstrates the full capabilities of `@v0-sdk/react` components.

## Features

- **Multiple Design Themes**: Elegant, Minimal, Neobrutalism, Terminal styles
- **Streaming Responses**: Real-time rendering of AI-generated content
- **Interactive Components**: Code blocks, thinking sections, task management
- **Modern UI**: Built with Next.js 15, React 19, and Tailwind CSS
- **Responsive Design**: Works across different screen sizes and devices

## Design Themes

### Elegant Theme

A sophisticated design with smooth animations and elegant typography.

### Minimal Theme

Clean, distraction-free interface focusing on content clarity.

### Neobrutalism Theme

Bold, high-contrast design with sharp edges and vibrant colors.

### Terminal Theme

Developer-focused interface mimicking terminal aesthetics.

### Streaming Theme

Optimized for real-time streaming content with live updates.

## Key Components

### StreamingMessage Component

```tsx
import { StreamingMessage } from '@v0-sdk/react'

function ChatInterface() {
  return (
    <StreamingMessage
      message={streamingData}
      theme="elegant"
      onComplete={(result) => {
        console.log('Streaming complete:', result)
      }}
    />
  )
}
```

### Code Block Component

```tsx
import { CodeBlock } from '@v0-sdk/react'

function CodeDisplay() {
  return <CodeBlock code={generatedCode} language="typescript" showLineNumbers copyable />
}
```

### Thinking Section Component

```tsx
import { ThinkingSection } from '@v0-sdk/react'

function AIThinking() {
  return <ThinkingSection thoughts={aiThoughts} isVisible={showThinking} animated />
}
```

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm (recommended) or npm
- v0 API key from [v0 settings](https://v0.app/settings/keys)

### Installation

1. Navigate to the react example directory:

   ```bash
   cd examples/v0-sdk-react-example
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   export V0_API_KEY=your_api_key_here
   ```

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Patterns

### Basic Streaming

```tsx
import { useStreamingChat } from '@v0-sdk/react'

function ChatApp() {
  const { messages, sendMessage, isLoading } = useStreamingChat({
    apiKey: process.env.V0_API_KEY,
  })

  return (
    <div>
      {messages.map((message, index) => (
        <StreamingMessage key={index} message={message} />
      ))}
    </div>
  )
}
```

### Theme Customization

```tsx
import { ThemeProvider } from '@v0-sdk/react'

function App() {
  return (
    <ThemeProvider theme="neobrutalism">
      <ChatInterface />
    </ThemeProvider>
  )
}
```

### Custom Styling

```tsx
import { StreamingMessage } from '@v0-sdk/react'

function CustomChat() {
  return (
    <StreamingMessage
      message={data}
      className="custom-message"
      theme={{
        primary: '#3b82f6',
        background: '#f8fafc',
        text: '#1e293b',
        accent: '#06b6d4',
      }}
    />
  )
}
```

## Technologies Used

- **Frontend Framework**: Next.js 15 with App Router
- **React Version**: React 19
- **Styling**: Tailwind CSS with custom design systems
- **UI Components**: Custom components optimized for AI content
- **Animations**: Framer Motion for smooth interactions
- **Code Highlighting**: Syntax highlighting for code blocks

## Environment Variables

| Variable     | Description                        | Required |
| ------------ | ---------------------------------- | -------- |
| `V0_API_KEY` | Your v0 API key for authentication | Yes      |

## Source Code

View the complete source code on GitHub: [v0-sdk/examples/v0-sdk-react-example](https://github.com/vercel/v0-sdk/tree/main/examples/v0-sdk-react-example)

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
