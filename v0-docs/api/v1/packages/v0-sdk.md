---
title: v0-sdk
description: TypeScript SDK for the v0 API
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v1/packages/react
  - /docs/api/v1/packages/ai-tools
---

# v0-sdk



The core TypeScript SDK for interacting with the v0 API. Provides type-safe methods for creating chats, managing projects, handling deployments, and more.

## Installation

```bash
npm install v0-sdk
# or
pnpm add v0-sdk
# or
yarn add v0-sdk
```

## Quick Start

```typescript
import { V0 } from 'v0-sdk'

const v0 = new V0({
  apiKey: process.env.V0_API_KEY,
})

// Create a new chat
const chat = await v0.chats.create({
  message: 'Create a todo app with React',
})

console.log(chat.id)
```

## Features

* **Type-safe API**: Full TypeScript support with comprehensive type definitions
* **Complete Coverage**: Access all v0 API endpoints
* **Modern Architecture**: Built with modern JavaScript/TypeScript patterns
* **Error Handling**: Comprehensive error handling and validation
* **Streaming Support**: Real-time streaming for chat responses

## Core APIs

### Chats

```typescript
// Create a chat
const chat = await v0.chats.create({
  message: 'Build a landing page',
})

// Send a message
const response = await v0.chats.sendMessage(chat.id, {
  message: 'Add a contact form',
})

// Get chat history
const chatData = await v0.chats.getById(chat.id)
```

### Projects

```typescript
// Create a project
const project = await v0.projects.create({
  name: 'My App',
})

// Get project details
const projectData = await v0.projects.getById(project.id)

// List all projects
const projects = await v0.projects.find()
```

### Deployments

```typescript
// Create a deployment
const deployment = await v0.deployments.create({
  chatId: chat.id,
  versionId: chat.latestVersion.id,
})

// Get deployment status
const deploymentData = await v0.deployments.getById(deployment.id)

// Get deployment logs
const logs = await v0.deployments.findLogs(deployment.id)
```

### User & Account

```typescript
// Get user information
const user = await v0.user.get()

// Get billing information
const billing = await v0.user.getBilling()

// Get current plan
const plan = await v0.user.getPlan()
```

## Configuration

### Environment Variables

```bash
V0_API_KEY=your_api_key_here
V0_API_URL=https://api.v0.dev/v1  # Optional, defaults to production
```

### Client Options

```typescript
const v0 = new V0({
  apiKey: 'your-api-key',
  baseURL: 'https://api.v0.dev/v1', // Optional
  timeout: 30000, // Optional, in milliseconds
  maxRetries: 3, // Optional
})
```

## Error Handling

```typescript
import { V0Error } from 'v0-sdk'

try {
  const chat = await v0.chats.create({
    message: 'Create an app',
  })
} catch (error) {
  if (error instanceof V0Error) {
    console.error('API Error:', error.message)
    console.error('Status:', error.status)
    console.error('Code:', error.code)
  } else {
    console.error('Unexpected error:', error)
  }
}
```

## Requirements

* Node.js 22+
* TypeScript 5.0+ (for TypeScript projects)

## Links

* [GitHub Repository](https://github.com/vercel/v0-sdk)
* [npm Package](https://www.npmjs.com/package/v0-sdk)
* [API Reference](/docs/api/v1/quickstart)


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)