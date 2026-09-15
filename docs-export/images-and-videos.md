---
title: Images and Videos
description: Generate images and videos
product: v0
type: guide
---

# Images and Videos

Generate images and videos as part of your v0 applications.

## Image Generation

Enable image generations in your model configuration:

```typescript
const result = await v0.chats.createStream({
  message: 'Create a landing page with hero images',
  modelConfiguration: { imageGenerations: true },
})
```

This generates up to 5 images per version.
