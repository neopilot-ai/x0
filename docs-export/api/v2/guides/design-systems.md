---
title: Design Systems
description: Design system skills guide
product: v0 API
type: guide
related:
  - /docs/design-systems-2
  - /docs/api/v2/reference/messages/send-message
---

# Design Systems

Design systems created with [Design Systems 2.0](/docs/design-systems-2) are saved as `memory` skills. Most API integrations use team-scoped skills, so `scope: 'team'` is the usual choice.

## Use a Design System Skill

Attach a saved design system when creating a chat so v0 can load its instructions and apply any starter setup before building the app.

```typescript
import { v0 } from 'v0'

const result = await v0.chats.create({
  message: 'Build a dashboard',
  skills: [
    { type: 'memory', name: 'acme-ui', scope: 'team' },
  ],
})
```

## Update a Design System Skill

Ask v0 to update a saved design system skill in any chat. Pass the skill in `skills` so the agent loads the exact design system to edit.

```typescript
const result = await v0.messages.send({
  chatId: 'chat_abc123',
  message: 'Update the Button component',
  skills: [
    { type: 'memory', name: 'acme-ui' },
  ],
})
```

## How Skills Work

Pass up to three skills when you [create a chat](/docs/api/v2/reference/chats/create-chat) or [send a message](/docs/api/v2/reference/messages/send-message). Passing a skill in `skills` loads it for that request instead of asking the agent to decide whether it is relevant.

## See Also

- [Design Systems 2.0](/docs/design-systems-2)
- [Skills parameter](/docs/api/v2/reference/messages/send-message)
