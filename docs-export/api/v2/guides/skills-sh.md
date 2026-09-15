---
title: Skills.sh Integration
description: Integrate skills.sh with the v0 API
product: v0 API
type: guide
related:
  - /docs/api/v2/guides/design-systems
  - /docs/api/v2/reference/messages/send-message
---

# Skills.sh Integration

Integrate skills.sh with the v0 API to use remote skills in your chat applications. Skills.sh provides a registry of reusable skills that can be attached to v0 chats and messages.

## Installation

```bash
npm install v0
```

## Using skills.sh Skills

Pass a skills.sh skill in the `skills` field when creating a chat or sending a message:

```typescript
import { v0 } from 'v0'

const result = await v0.chats.create({
  message: 'Build a dashboard with custom components',
  skills: [
    { type: 'remote', name: 'acme-dashboard', source: 'skills.sh' },
  ],
})
```

## Skill Types

The `skills` field supports three types:

### skills.sh Skills (remote)

Skills from the skills.sh registry:

```typescript
const result = await v0.messages.send({
  chatId: 'chat_abc123',
  message: 'Use the acme-dashboard skill',
  skills: [
    { type: 'remote', name: 'acme-dashboard', source: 'skills.sh' },
  ],
})
```

### Memory Skills

User or team memory skills (including design-system skills):

```typescript
const result = await v0.messages.send({
  chatId: 'chat_abc123',
  message: 'Use the acme-ui design system',
  skills: [
    { type: 'memory', name: 'acme-ui', scope: 'team' },
  ],
})
```

### Project Skills

Skills defined in the chat repo:

```typescript
const result = await v0.messages.send({
  chatId: 'chat_abc123',
  message: 'Use project-specific instructions',
  skills: [
    { type: 'project', name: 'my-project-skill' },
  ],
})
```

## Skill Limits

- Maximum 3 skills per message
- Skills are applied in the order they are passed
- Skills override prompt-based skill discovery

## Skill Configuration

Each skill has:

- **`type`** — `'remote'`, `'memory'`, or `'project'`
- **`name`** — Skill identifier
- **`source`** — For `remote` type, the source (e.g., `'skills.sh'`)
- **`scope`** — For `memory` type, `'user'` or `'team'`

## See Also

- [Skills parameter](/docs/api/v2/reference/messages/send-message)
- [Design Systems](/docs/design-systems-2)
