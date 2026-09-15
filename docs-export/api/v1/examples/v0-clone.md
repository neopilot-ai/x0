---
title: v0 Clone
description: A full-featured v0 clone with authentication and multi-tenant support
product: v0 API
type: guide
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v1/packages/v0-sdk
  - /docs/api/v1/packages/react
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.
# v0 Clone



This example demonstrates how to build a complete v0.dev replica using the v0 SDK, featuring user authentication, multi-tenant architecture, and real-time streaming capabilities.

## Deploy Your Own

You can deploy your own version of the v0 clone to Vercel with one click:

[**Deploy with Vercel →**](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fv0-sdk\&env=V0_API_KEY,AUTH_SECRET,POSTGRES_URL\&envDescription=Learn+more+about+how+to+get+the+required+environment+variables\&envLink=https%3A%2F%2Fgithub.com%2Fvercel%2Fv0-sdk%2Fblob%2Fmain%2Fexamples%2Fv0-clone%2FREADME.md%23environment-variables\&project-name=v0-clone\&repository-name=v0-clone\&demo-title=v0+Clone\&demo-description=A+full-featured+v0+clone+built+with+Next.js%2C+shadcn%2Fui%2C+and+the+v0+SDK\&demo-url=https%3A%2F%2Fv0.dev\&root-directory=examples%2Fv0-clone)

## Features

### Core Features

* **shadcn/ui Integration**: Uses shadcn/ui components for a polished UI
* **v0 SDK Integration**: Connects to the v0 API for generating apps
* **Real-time Preview**: Split-screen interface with chat and preview panels
* **Conversation History**: Maintains chat history throughout the session
* **Suggestion System**: Provides helpful prompts to get users started
* **Streaming Support**: Toggle between streaming and non-streaming AI responses for real-time updates

### Authentication & Multi-Tenant Features

* **Anonymous Access**: Unauthenticated users can create chats directly (with rate limits)
* **Guest Access**: Users can register as guests for persistent sessions
* **User Registration/Login**: Email/password authentication with secure password hashing
* **Session Management**: Secure session handling with NextAuth.js
* **Multi-Tenant Architecture**: Multiple users share the same v0 API organization
* **Ownership Mapping**: Authenticated users only see their own chats and projects
* **Rate Limiting**: Different limits for anonymous, guest, and registered users
* **User Navigation**: Header dropdown with user info and sign-out options

## Setup

### Environment Variables

Create a `.env` file with all required variables:

```bash
# Auth Secret - Generate a random string for production
# Generate with: openssl rand -base64 32
# Or visit: https://generate-secret.vercel.app/32
AUTH_SECRET=your-auth-secret-here

# Database URL - PostgreSQL connection string
POSTGRES_URL=postgresql://user:password@localhost:5432/v0_clone
# For a Marketplace Postgres integration, use the connection string from your dashboard

# Get your API key from https://v0.app/settings/keys
V0_API_KEY=your_v0_api_key_here

# Optional: Use a custom API URL
# V0_API_URL=http://localhost:3001/v1
```

### Database Setup

This project uses PostgreSQL with Drizzle ORM. Set up your database:

1. **Generate Database Schema**:

   ```bash
   pnpm db:generate
   ```

2. **Run Database Migrations**:

   ```bash
   pnpm db:migrate
   ```

3. **Optional - Open Database Studio**:
   ```bash
   pnpm db:studio
   ```

## Getting Started

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

### Multi-Tenant Design

* **v0 API as Source of Truth**: All actual chat/project data stays in v0 API
* **Ownership Layer**: Database only tracks "who owns what"
* **Access Control**: API routes filter v0 data based on ownership
* **No Data Duplication**: Avoids storing redundant data

### Database Schema

* **Users**: Store user accounts with email and hashed passwords
* **ProjectOwnership**: Maps v0 API project IDs → user IDs (ownership only)
* **ChatOwnership**: Maps v0 API chat IDs → user IDs with optional project association
* **AnonymousChatLog**: Tracks anonymous chat creation by IP address for rate limiting

### User Types & Rate Limits

* **Anonymous Users**: No account needed, 3 chats per day, no data persistence
* **Guest Users**: Auto-created accounts, 5 chats per day, data persists during session
* **Registered Users**: Permanent accounts, 50 chats per day, data persists across sessions and devices

Rate limits are enforced per 24-hour period and reset daily.

## Source Code

View the complete source code on GitHub: [v0-sdk/examples/v0-clone](https://github.com/vercel/v0-sdk/tree/main/examples/v0-clone)


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)