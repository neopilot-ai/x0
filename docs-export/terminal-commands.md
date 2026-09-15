---
title: Terminal Commands
description: Bash tool, permission modes, and rule customization for terminal commands
product: v0
type: guide
---

# Terminal Commands

Use the v0 CLI and terminal commands to manage your projects. The Bash tool provides secure command execution with configurable permission modes.

## Bash Tool

The Bash tool allows v0 to execute commands in a secure sandbox environment. Common use cases include:

- **Browser testing** — Test your application in a browser
- **Git history** — Inspect commit history
- **Unit tests** — Run test suites
- **Platform CLIs** — Use tools like `npx`, `npm`, `pnpm`, `yarn`, `bun`

## Permission Modes

The Bash tool supports three permission modes that control how commands are executed:

### Ask (Default)

v0 asks for confirmation before executing a command. This is the default permission mode.

When a command is executed, v0 displays a confirmation dialog. You can approve or deny the command before it runs.

### Auto

v0 automatically approves commands based on a built-in allow list. Commands that match the allow list run without confirmation. Commands that don't match are denied.

The built-in allow list includes common safe commands like `npm install`, `npx`, `git status`, and other development commands.

### Full

v0 executes all commands without asking for confirmation. Use this mode with caution, as all commands run without restrictions.

## Auto Permissions

The built-in allow list includes common safe commands that run automatically in Auto mode. This includes commands like package installation, file operations, and development utilities.

## Ask Permissions

When the Ask permission mode is active, v0 displays a confirmation dialog before executing a command. You can approve or deny the command before it runs.

## Full Permissions

When the Full permission mode is active, v0 executes all commands without asking for confirmation. Use this mode with caution.

## Set Permission Mode

You can set the permission mode in the composer toolbar. Select the permission mode from the dropdown to change how commands are executed.

## Customize Rules

You can customize which commands are allowed, denied, or require approval using permission rules. Rules can be scoped to User or Team level.

### Rule Format

Rules use the `Bash(<command pattern>)` format:

```
Bash(npm install *)
Bash(git *)
```

### Rule Types

- **`allow`** — Commands matching the rule are automatically approved
- **`deny`** — Commands matching the rule are blocked
- **`ask`** — Commands matching the rule require confirmation

### Rule Precedence

Rules are evaluated by specificity. More specific rules take precedence over less specific rules. For example, `Bash(npm install *)` is more specific than `Bash(npm *)`.

### Current Deletion Guard

The `rm -rf` command is currently denied by default as a safety guard. This prevents accidental deletion of files.

## Media

- [Commands Video](https://v0.app/docs/videos/commands.mp4)
- [Permissions Video](https://v0.app/docs/videos/permissions.mp4)
