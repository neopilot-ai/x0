---
title: Environment Variables
description: Learn how to manage environment variables and configuration in v0 projects
product: v0 API
type: guide
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v1/reference/projects/create-env-vars
  - /docs/api/v1/reference/projects/find-env-vars
---

# Environment Variables



Learn how to securely manage environment variables and configuration settings in your v0 projects. Environment variables are tied to projects, making them available across all chats in that project.

## Overview

Environment variables in v0 provide a secure way to manage:

* **API keys and secrets** - Database connections, third-party services
* **Configuration settings** - Feature flags, deployment settings
* **Build-time variables** - Framework configurations, asset paths

Environment variables are **project-scoped**, meaning all chats in a project have access to the same environment variables.

## Managing Environment Variables

### Creating Variables

```typescript
import { v0 } from 'v0-sdk'

// Create new environment variables
await v0.projects.createEnvVars({
  projectId: 'your-project-id',
  environmentVariables: [
    {
      key: 'DATABASE_URL',
      value: 'postgresql://localhost:5432/myapp',
    },
    {
      key: 'API_KEY',
      value: 'your-api-key-here',
    },
  ],
})

// Create or update variables (upsert)
await v0.projects.createEnvVars({
  projectId: 'your-project-id',
  upsert: true,
  environmentVariables: [
    {
      key: 'DATABASE_URL',
      value: 'postgresql://newhost:5432/myapp',
    },
  ],
})
```

### Reading Variables

```typescript
// Get all environment variables for a project
const envVars = await v0.projects.findEnvVars({
  projectId: 'your-project-id',
  decrypted: 'false', // 'true' to get decrypted values
})

console.log('Environment variables:', envVars.data)
```

### Updating Variables

```typescript
// Update existing variables by ID
await v0.projects.updateEnvVars({
  projectId: 'your-project-id',
  environmentVariables: [
    {
      id: 'env-var-id-1',
      value: 'updated-value',
    },
  ],
})
```

### Deleting Variables

```typescript
// Delete variables by ID
await v0.projects.deleteEnvVars({
  projectId: 'your-project-id',
  environmentVariableIds: ['env-var-id-1', 'env-var-id-2'],
})
```

### Getting Individual Variables

```typescript
// Get a specific environment variable by ID
const envVar = await v0.projects.getEnvVar({
  projectId: 'your-project-id',
  environmentVariableId: 'env-var-id-1',
})

console.log('Environment variable:', envVar.data)
```

## Usage in Development

### Chat Context

Environment variables are automatically available in chat sessions when you link your chat to a project:

```typescript
// Start a chat with project context
const chat = await v0.chats.init({
  projectId: 'your-project-id',
  files: existingFiles,
  initialContext: `
    Configure the database connection using the DATABASE_URL environment variable.
    Use the API_KEY for third-party service authentication.
  `,
})

// AI can reference and use environment variables in generated code
```

## Best Practices

### 1. Secure Secrets Management

```typescript
// ✅ Good: Keep sensitive data in environment variables
await v0.projects.createEnvVars({
  projectId,
  environmentVariables: [
    { key: 'DATABASE_PASSWORD', value: 'secret-password' },
    { key: 'API_SECRET_KEY', value: 'sk_live_...' },
    { key: 'APP_NAME', value: 'My App' }, // Not sensitive
  ],
})
```

### 2. Consistent Naming

```typescript
// ✅ Good: Consistent naming convention
const variables = [
  // Database
  { key: 'DATABASE_URL', value: 'postgresql://...' },
  { key: 'DATABASE_POOL_SIZE', value: '10' },

  // API Configuration
  { key: 'API_BASE_URL', value: 'https://api.example.com' },
  { key: 'API_TIMEOUT', value: '30000' },

  // Feature Flags
  { key: 'FEATURE_NEW_UI', value: 'true' },
  { key: 'FEATURE_BETA_FEATURES', value: 'false' },
]
```

### 3. Documentation

Document your environment variables for team members:

```typescript
// Document your environment variables
const environmentVariables = {
  // Database Configuration
  DATABASE_URL: {
    description: 'PostgreSQL connection string',
    example: 'postgresql://user:pass@localhost:5432/dbname',
    required: true,
  },

  // API Configuration
  API_KEY: {
    description: 'Third-party service API key',
    example: 'sk_live_...',
    required: true,
  },

  // Optional Configuration
  LOG_LEVEL: {
    description: 'Logging level',
    example: 'info',
    default: 'info',
    options: ['debug', 'info', 'warn', 'error'],
  },
}
```


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)