# TODO: Find Gaps & Implement Code Following Docs

## Status

- ✅ Analysis complete
- ✅ All docs populated (205 docs, 0 empty)
- ✅ v1 docs deprecated (72 files)
- ✅ SDK package guides created (5 new guides + 22 total)
- ✅ Code implementation complete (17 new files: code-server package, terminal module, React components, Sandbox SDK)
- ✅ TypeScript compilation passing (only pre-existing errors: `bun:test`, `ChatsGetResponse`)
- ✅ Docs isolated and exported to `docs-export/`
- ✅ New SDK documentation pages created (browser-entry, streaming-result, stream-diffpatch)
- ✅ Thin product docs expanded (design-systems-2, agentic-features, pre-installed-agents, paper, instructions)
- ✅ skills.sh integration guide created
- ✅ api/v2.md updated, api/v1.md created
- ✅ llms.txt, sitemap.md, agents.md, README.md updated
- ✅ Code editing docs expanded (syntax highlighting, diff views, split layout, file explorer)
- ✅ Sandbox docs expanded (Vercel Sandbox, Firecracker microVMs, lifecycle, isolation boundaries)
- ✅ Terminal commands docs expanded (Bash tool, permission modes, rules customization)
- ✅ Platform API docs created (overview, packages, adapters)
- ✅ Code-server package created (editor, types, split, fileManager, commands)
- ✅ Terminal module created (commands, permissions, built-in-rules, settings)
- ✅ React components created (code-editor, terminal, sandbox-ui)
- ✅ Sandbox SDK integration created (code-server.ts, sdk.ts, index.ts)

## Code Changes Made

- `packages/v0-sdk/src/code-server/` — New code-server package (6 files)
- `packages/v0-sdk/src/terminal/` — New terminal module (5 files)
- `packages/v0-sdk/src/sandbox/code-server.ts` — Sandbox code-server integration
- `packages/v0-sdk/src/sandbox/sdk.ts` — Vercel Sandbox SDK wrapper
- `packages/v0-sdk/src/sandbox/index.ts` — Updated sandbox exports
- `packages/v0-sdk/src/index.ts` — Updated to export terminal and code-server
- `packages/react/src/chat/code-editor.tsx` — React code editor components
- `packages/react/src/chat/terminal.tsx` — React terminal components
- `packages/react/src/chat/sandbox-ui.tsx` — React sandbox UI components
- `packages/react/src/chat/index.ts` — Updated exports
- `packages/react/src/index.ts` — Updated exports
- `docs-export/code-editing.md` — Expanded code editing guide
- `docs-export/sandbox.md` — Expanded sandbox guide
- `docs-export/terminal-commands.md` — Expanded terminal commands guide
- `docs-export/api/platform/` — New platform API docs (7 files)
- `docs-export/llms.txt` — Updated with platform API and terminal commands
- `docs-export/sitemap.md` — Updated with platform API and terminal commands
- `docs-export/agents.md` — Updated with code editing, terminal commands, platform API

## Pre-existing Errors

- `src/preview-proxy.test.ts(1,38): error TS2307: Cannot find module 'bun:test'`
- `tests/surface.types.ts(4,15): error TS2305: Module has no exported member 'ChatsGetResponse'`

## Files Created

- `docs-export/code-editing.md` — Full code editing guide
- `docs-export/sandbox.md` — Full sandbox guide (Vercel Sandbox, Firecracker)
- `docs-export/terminal-commands.md` — Full terminal commands guide
- `docs-export/IMPLEMENTATION_PLAN.md` — Implementation plan (301 lines)
- `docs-export/api/platform/overview.md` — Platform API overview
- `docs-export/api/platform/packages/v0-sdk.md` — v0 SDK package docs
- `docs-export/api/platform/packages/create-v0-sdk-app.md` — CLI tool docs
- `docs-export/api/platform/packages/v0-sdk-react.md` — React package docs
- `docs-export/api/platform/packages/v0-sdk-ai-tools.md` — AI Tools package docs
- `docs-export/api/platform/adapters/mcp-server.md` — MCP Server adapter docs
- `docs-export/api/platform/adapters/ai-tools.md` — AI Tools adapter docs
- `packages/v0-sdk/src/code-server/index.ts` — Code-server entry point
- `packages/v0-sdk/src/code-server/types.ts` — Code-server type definitions
- `packages/v0-sdk/src/code-server/editor.ts` — Code-server editor implementation
- `packages/v0-sdk/src/code-server/split.ts` — Split view implementation
- `packages/v0-sdk/src/code-server/fileManager.ts` — File management implementation
- `packages/v0-sdk/src/code-server/commands.ts` — Terminal command implementation
- `packages/v0-sdk/src/terminal/commands.ts` — Terminal command execution
- `packages/v0-sdk/src/terminal/permissions.ts` — Permission system
- `packages/v0-sdk/src/terminal/built-in-rules.ts` — Built-in rules
- `packages/v0-sdk/src/terminal/settings.ts` — Settings management
- `packages/v0-sdk/src/terminal/index.ts` — Terminal module entry point
- `packages/v0-sdk/src/sandbox/code-server.ts` — Sandbox code-server integration
- `packages/v0-sdk/src/sandbox/sdk.ts` — Vercel Sandbox SDK wrapper
- `packages/v0-sdk/src/sandbox/index.ts` — Updated sandbox exports
- `packages/react/src/chat/code-editor.tsx` — React code editor components
- `packages/react/src/chat/terminal.tsx` — React terminal components
- `packages/react/src/chat/sandbox-ui.tsx` — React sandbox UI components
- `docs-export/` — Complete isolated docs export (205 markdown files)

## Architecture

```
v0.app
├── Vercel Sandbox (Firecracker microVMs)
│   ├── Node.js runtime
│   ├── Code editor (code-server/Monaco)
│   ├── Terminal/Bash tool
│   └── Preview system
├── v0 SDK
│   ├── @v0-sdk/code-server — Code-server package
│   ├── @v0-sdk/terminal — Terminal command execution
│   ├── @v0-sdk/sandbox — Vercel Sandbox integration
│   └── @v0-sdk/react — React hooks and components
└── Platform API
    ├── Projects, Chats, Deployments
    ├── Integrations, Hooks, Rate limits
    └── MCP Server, AI Tools adapters
```
