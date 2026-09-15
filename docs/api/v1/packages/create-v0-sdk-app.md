---
title: create-v0-sdk-app
description: Create v0 SDK-powered apps with one command
product: v0 API
type: reference
related:
  - /docs/api/v1/packages/v0-sdk
---

# create-v0-sdk-app



A command-line tool for quickly scaffolding new applications powered by the v0 SDK. Get started with pre-built templates and examples.

## Installation

No installation required! Use with `npx`:

```bash
npx create-v0-sdk-app@latest my-app
```

Or install globally:

```bash
npm install -g create-v0-sdk-app
create-v0-sdk-app my-app
```

## Usage

### Interactive Mode

```bash
npx create-v0-sdk-app@latest
```

The CLI will prompt you for:

* **Project name**: Your app's directory name
* **Template**: Choose from available templates
* **Package manager**: npm, pnpm, or yarn

### Direct Usage

```bash
npx create-v0-sdk-app@latest my-app --template v0-clone
```

## Available Templates

### v0 Clone

A full-featured replica of v0.dev with authentication and multi-tenant support.

```bash
npx create-v0-sdk-app@latest my-app --template v0-clone
```

**Features:**

* User authentication (NextAuth.js)
* Multi-tenant architecture
* PostgreSQL database with Drizzle ORM
* Real-time streaming
* Rate limiting

### Classic v0

The iconic v0.dev interface with three-generation workflow.

```bash
npx create-v0-sdk-app@latest my-app --template classic-v0
```

**Features:**

* Classic v0 UI/UX
* Multiple generations (A, B, C)
* shadcn/ui components
* Next.js 15 with App Router

### AI Tools Example

Demonstrates AI SDK integration with v0 tools.

```bash
npx create-v0-sdk-app@latest my-app --template ai-tools-example
```

**Features:**

* AI SDK integration
* v0 tools for autonomous agents
* Multiple agent patterns
* TypeScript examples

## Command Options

```bash
create-v0-sdk-app [project-name] [options]
```

### Options

* `--template <name>` - Specify template (v0-clone, classic-v0, ai-tools-example)
* `--package-manager <pm>` - Choose package manager (npm, pnpm, yarn)
* `--help` - Show help information
* `--version` - Show version number

## Examples

### Create a v0 clone

```bash
npx create-v0-sdk-app@latest my-v0-clone --template v0-clone
cd my-v0-clone
```

Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your API keys
```

Install dependencies and start:

```bash
pnpm install
pnpm db:migrate  # For v0-clone template
pnpm dev
```

### Create a classic v0 interface

```bash
npx create-v0-sdk-app@latest my-classic-app --template classic-v0
cd my-classic-app
pnpm install
pnpm dev
```

## Post-Creation Steps

After creating your app:

1. **Set up environment variables**:

   ```bash
   cp .env.example .env
   # Add your V0_API_KEY
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Database setup** (for v0-clone template):

   ```bash
   pnpm db:migrate
   ```

4. **Start development server**:
   ```bash
   pnpm dev
   ```

## Template Structure

Each template includes:

* **Complete source code** - Ready-to-run application
* **Documentation** - Setup and usage instructions
* **Environment examples** - `.env.example` files
* **Package configuration** - Optimized `package.json`
* **TypeScript config** - Proper TypeScript setup

## Customization

After creation, you can:

* **Modify components** - All source code is yours to customize
* **Add features** - Extend with additional v0 SDK capabilities
* **Change styling** - Update themes and design systems
* **Deploy** - Ready for deployment to Vercel, Netlify, etc.

## Requirements

* Node.js 22+
* pnpm 9+ (recommended)
* v0 API key from [v0 settings](https://v0.app/settings/keys)

## Links

* [GitHub Repository](https://github.com/vercel/v0-sdk/tree/main/packages/create-v0-sdk-app)
* [npm Package](https://www.npmjs.com/package/create-v0-sdk-app)
* [Template Examples](/docs/api/v1/examples/v0-clone)


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)