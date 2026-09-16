# Implementation Plan: Code-Server, Sandbox & Terminal Commands

## Objective

Expand thin docs and implement code-server integration for v0.app's code editing, sandbox, and terminal command features.

---

## Phase 1: Expand Documentation to Match v0.app/docs

### 1.1 Code Editing (`docs-export/code-editing.md`)

**Current state**: Thin (40 lines) — only mentions switching views and inline editing
**Target state**: Full-featured code editor guide matching `https://v0.app/docs/code-editing`

**Actions**:

- [ ] Rewrite `docs-export/code-editing.md` with full content:
  - Basic editing (Code tab, Cmd+S/Ctrl+S)
  - Editor features (syntax highlighting, line numbers, find/replace, global search, file explorer)
  - Diff view (Toggle Diff View button)
  - Split view (Split Layout button)
  - File management (create, rename, delete files)
  - Toolbar actions (Copy File, Toggle Diff View, Split Layout)
- [ ] Add media file references:
  - `/docs/videos/code%20editor.mp4`
  - `/docs/light/switchlight.gif`, `/docs/dark/switchdark.gif`
  - `/docs/light/diffviewlight.png`, `/docs/dark/diffviewdark.png`
  - `/docs/light/splitviewlight.png`, `/docs/dark/splitviewdark.png`

### 1.2 Sandbox (`docs-export/sandbox.md`)

**Current state**: Thin (~80 lines) — basic sandbox description
**Target state**: Full VM-backed sandbox guide matching `https://v0.app/docs/sandbox`

**Actions**:

- [ ] Rewrite `docs-export/sandbox.md` with full content:
  - What the sandbox is (Vercel Sandbox, Firecracker microVM)
  - Where you see the sandbox (Preview tab, Console panel, Code editor)
  - What runs inside (Node.js, pnpm/npm/yarn/bun, framework-aware dev server, env vars)
  - Isolation boundaries (per chat, per user/team, from production)
  - Sandbox Network Policy
  - Lifecycle (30-minute lifetime, auto-extension by 10 min, 24-hour cap)
  - Filesystem persistence between sessions
- [ ] Add media references:
  - `/docs/videos/sandbox-startup.mp4`
  - `/docs/videos/console.mp4`

### 1.3 Terminal Commands (`docs-export/terminal-commands.md`)

**Current state**: Thin (~60 lines) — basic CLI description
**Target state**: Full terminal commands guide matching `https://v0.app/docs/terminal-commands`

**Actions**:

- [ ] Rewrite `docs-export/terminal-commands.md` with full content:
  - Bash tool description
  - Common use cases (browser testing, git history, unit tests, platform CLIs)
  - Permission modes (Ask, Auto, Full) with detailed descriptions
  - Auto Permissions built-in allow list
  - Ask Permissions confirmation flow
  - Full Permissions bypass
  - Set permission mode (composer toolbar)
  - Customize rules (User/Team scopes, `allow`/`deny`/`ask` patterns)
  - Rule format (`Bash(<command pattern>)`)
  - Rule precedence (specificity-based)
  - Current deletion guard (`rm -rf` deny)
- [ ] Add media references:
  - `/docs/videos/commands.mp4`
  - `/docs/videos/permissions.mp4`

### 1.4 Create Platform API docs

**Actions**:

- [ ] Create `docs-export/api/platform/overview.md` — Platform API overview
- [ ] Create `docs-export/api/platform/packages/v0-sdk.md` — v0 SDK package
- [ ] Create `docs-export/api/platform/packages/create-v0-sdk-app.md` — CLI tool
- [ ] Create `docs-export/api/platform/packages/v0-sdk-react.md` — React package
- [ ] Create `docs-export/api/platform/packages/v0-sdk-ai-tools.md` — AI tools package
- [ ] Create `docs-export/api/platform/adapters/mcp-server.md` — MCP server adapter
- [ ] Create `docs-export/api/platform/adapters/ai-tools.md` — AI tools adapter

---

## Phase 2: Implement Code-Server in v0 SDK

### 2.1 Code-Server Package

**Goal**: Create a `@v0-sdk/code-server` package that wraps code-server for browser-based code editing inside Vercel Sandbox

**Actions**:

- [ ] Create `packages/v0-sdk/src/code-server/` directory
- [ ] Create `packages/v0-sdk/src/code-server/index.ts` — Main exports
- [ ] Create `packages/v0-sdk/src/code-server/types.ts` — Type definitions
  - `CodeServerConfig` — Configuration for code-server
  - `CodeServerSession` — Session management
  - `CodeServerFile` — File operations
  - `CodeServerDiff` — Diff operations
- [ ] Create `packages/v0-sdk/src/code-server/editor.ts` — Editor implementation
  - `createCodeServer()` — Create a code-server instance
  - `openFile()` — Open a file in the editor
  - `closeFile()` — Close a file
  - `getFiles()` — List files
  - `applyDiff()` — Apply diff changes
  - `createDiff()` — Create a diff view
- [ ] Create `packages/v0-sdk/src/code-server/split.ts` — Split view
  - `createSplitView()` — Create a split editor view
  - `toggleDiffView()` — Toggle diff view
- [ ] Create `packages/v0-sdk/src/code-server/fileManager.ts` — File management
  - `createFile()` — Create a file
  - `renameFile()` — Rename a file
  - `deleteFile()` — Delete a file
  - `createFolder()` — Create a folder
- [ ] Create `packages/v0-sdk/src/code-server/commands.ts` — Terminal commands
  - `executeCommand()` — Execute a bash command
  - `getCommandHistory()` — Get command history
  - `setPermissionMode()` — Set permission mode (Ask/Auto/Full)
  - `addRule()` — Add permission rule
  - `removeRule()` — Remove permission rule
- [ ] Update `packages/v0-sdk/src/index.ts` to export code-server module

### 2.2 Code-Server Integration with Sandbox

**Goal**: Integrate code-server with Vercel Sandbox for browser-based code editing

**Actions**:

- [ ] Create `packages/v0-sdk/src/sandbox/code-server.ts` — Sandbox code-server integration
  - `connectToSandbox()` — Connect to Vercel Sandbox
  - `startCodeServer()` — Start code-server in sandbox
  - `stopCodeServer()` — Stop code-server
  - `getCodeServerUrl()` — Get the code-server URL
- [ ] Update `packages/v0-sdk/src/sandbox.ts` to include code-server integration
- [ ] Create `packages/v0-sdk/src/code-server/sandbox-adapter.ts` — Adapter between code-server and sandbox
  - `handleFileChange()` — Handle file changes from code-editor
  - `handleCommand()` — Handle terminal commands
  - `handleDiff()` — Handle diff operations

### 2.3 React Code Editor Components

**Goal**: Create React components for the code editor, diff view, and split view

**Actions**:

- [ ] Create `packages/react/src/chat/code-editor.tsx` — Main code editor component
  - `V0CodeEditor` — Full code editor with syntax highlighting
  - `V0DiffView` — Diff view component
  - `V0SplitView` — Split view component
  - `V0FileExplorer` — File explorer panel
- [ ] Create `packages/react/src/chat/terminal.tsx` — Terminal component
  - `V0Terminal` — Terminal panel with bash command execution
  - `V0PermissionGuard` — Permission mode guard
  - `V0CommandHistory` — Command history component
- [ ] Create `packages/react/src/chat/sandbox-ui.tsx` — Sandbox UI components
  - `V0SandboxPreview` — Preview with code editor tab
  - `V0ConsolePanel` — Console panel with Logs and Terminal tabs
  - `V0CodeEditorTab` — Code editor tab in preview toolbar
- [ ] Update `packages/react/src/chat/index.ts` to export new components
- [ ] Update `packages/react/src/index.ts` to export new components

### 2.4 Terminal Commands Implementation

**Goal**: Implement the Bash tool with permission modes and rule system

**Actions**:

- [ ] Create `packages/v0-sdk/src/terminal/commands.ts` — Command execution
  - `executeBash()` — Execute a bash command
  - `getBashHistory()` — Get command history
  - `cancelCommand()` — Cancel a running command
- [ ] Create `packages/v0-sdk/src/terminal/permissions.ts` — Permission system
  - `PermissionMode` enum (`Ask`, `Auto`, `Full`)
  - `PermissionRule` type (`allow`, `deny`, `ask`)
  - `setPermissionMode()` — Set the permission mode
  - `addRule()` — Add a permission rule
  - `removeRule()` — Remove a permission rule
  - `evaluateCommand()` — Evaluate a command against rules
  - `RulePrecedence` system (specificity-based)
- [ ] Create `packages/v0-sdk/src/terminal/built-in-rules.ts` — Built-in rules
  - `BUILTIN_ALLOW` — Built-in allow list
  - `BUILTIN_DENY` — Built-in deny list (e.g., `rm -rf`)
  - `DEFAULT_RULES` — Default rules
- [ ] Create `packages/v0-sdk/src/terminal/settings.ts` — Settings management
  - `getAgentPermissions()` — Get agent permissions
  - `setAgentPermissions()` — Set agent permissions
  - `resetToDefault()` — Reset to default rules
- [ ] Update `packages/v0-sdk/src/index.ts` to export terminal module

---

## Phase 3: Sandbox SDK Integration

### 3.1 Vercel Sandbox SDK Integration

**Goal**: Integrate `@vercel/sandbox` SDK with the v0 SDK

**Actions**:

- [ ] Create `packages/v0-sdk/src/sandbox/sdk.ts` — Vercel Sandbox SDK wrapper
  - `createSandbox()` — Create a Vercel Sandbox
  - `connectToSandbox()` — Connect to an existing sandbox
  - `executeCommand()` — Execute a command in the sandbox
  - `copyFiles()` — Copy files to the sandbox
  - `stopSandbox()` — Stop the sandbox
  - `getSandboxDomain()` — Get the sandbox domain
- [ ] Create `packages/v0-sdk/src/sandbox/lifecycle.ts` — Sandbox lifecycle management
  - `getSandboxStatus()` — Get sandbox status
  - `extendSandbox()` — Extend sandbox lifetime
  - `createSnapshot()` — Create a sandbox snapshot
  - `restoreSnapshot()` — Restore from a snapshot
- [ ] Create `packages/v0-sdk/src/sandbox/isolation.ts` — Isolation boundaries
  - `getIsolationInfo()` — Get isolation boundaries
  - `getNetworkPolicy()` — Get network policy
  - `setNetworkPolicy()` — Set network policy

---

## Phase 4: Platform API Documentation

### 4.1 Platform API Overview

**Actions**:

- [ ] Create `docs-export/api/platform/overview.md` — Platform API overview
  - v0 Platform API description
  - Projects, Chats, Deployments, Integrations, Hooks, Rate limits, User
  - MCP Servers, Reports
  - Code generation, project management, deployment
- [ ] Create `docs-export/api/platform/packages/v0-sdk.md` — v0 SDK package
- [ ] Create `docs-export/api/platform/packages/create-v0-sdk-app.md` — CLI tool
- [ ] Create `docs-export/api/platform/packages/v0-sdk-react.md` — React package
- [ ] Create `docs-export/api/platform/packages/v0-sdk-ai-tools.md` — AI tools package
- [ ] Create `docs-export/api/platform/adapters/mcp-server.md` — MCP server adapter
- [ ] Create `docs-export/api/platform/adapters/ai-tools.md` — AI tools adapter

---

## Phase 5: Update Index Files

### 5.1 Update llms.txt, sitemap.md, agents.md

**Actions**:

- [ ] Add code-editing, sandbox, terminal-commands to llms.txt
- [ ] Add platform API docs to sitemap.md
- [ ] Update agents.md with code-server, terminal commands info

### 5.2 Update ANALYSIS_PLAN.md and TODO.md

**Actions**:

- [ ] Update with code-server implementation plan
- [ ] Update TODO.md with remaining tasks

---

## Phase 6: Verification

### 6.1 TypeScript Compilation

**Actions**:

- [ ] Run `bun run typecheck` for all packages
- [ ] Fix any compilation errors
- [ ] Verify all new exports are properly typed

### 6.2 Documentation Verification

**Actions**:

- [ ] Verify all docs have proper frontmatter
- [ ] Verify no empty docs remain
- [ ] Verify all media file references are documented
- [ ] Count total docs and verify structure

---

## Summary

### Documentation Changes

| File                               | Action  | Lines                |
| ---------------------------------- | ------- | -------------------- |
| `docs-export/code-editing.md`      | Rewrite | 40 → 100+            |
| `docs-export/sandbox.md`           | Rewrite | 80 → 150+            |
| `docs-export/terminal-commands.md` | Rewrite | 60 → 200+            |
| `docs-export/api/platform/*.md`    | Create  | 8 new files          |
| `docs-export/llms.txt`             | Update  | Add new sections     |
| `docs-export/sitemap.md`           | Update  | Add new sections     |
| `docs-export/agents.md`            | Update  | Add code-server info |

### Code Changes

| File                                             | Action         |
| ------------------------------------------------ | -------------- |
| `packages/v0-sdk/src/code-server/index.ts`       | Create         |
| `packages/v0-sdk/src/code-server/types.ts`       | Create         |
| `packages/v0-sdk/src/code-server/editor.ts`      | Create         |
| `packages/v0-sdk/src/code-server/split.ts`       | Create         |
| `packages/v0-sdk/src/code-server/fileManager.ts` | Create         |
| `packages/v0-sdk/src/code-server/commands.ts`    | Create         |
| `packages/v0-sdk/src/sandbox/code-server.ts`     | Create         |
| `packages/v0-sdk/src/sandbox/sdk.ts`             | Create         |
| `packages/v0-sdk/src/sandbox/lifecycle.ts`       | Create         |
| `packages/v0-sdk/src/sandbox/isolation.ts`       | Create         |
| `packages/v0-sdk/src/terminal/commands.ts`       | Create         |
| `packages/v0-sdk/src/terminal/permissions.ts`    | Create         |
| `packages/v0-sdk/src/terminal/built-in-rules.ts` | Create         |
| `packages/v0-sdk/src/terminal/settings.ts`       | Create         |
| `packages/react/src/chat/code-editor.tsx`        | Create         |
| `packages/react/src/chat/terminal.tsx`           | Create         |
| `packages/react/src/chat/sandbox-ui.tsx`         | Create         |
| `packages/v0-sdk/src/index.ts`                   | Update exports |
| `packages/react/src/chat/index.ts`               | Update exports |
| `packages/react/src/index.ts`                    | Update exports |
