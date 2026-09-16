---
title: Stream Diffpatch
description: JSON diff and patch utilities for v0 streaming
product: v0 API
type: guide
related:
  - /docs/api/v2/guides/streaming-result
  - /docs/api/v2/guides/resuming-streams
---

# Stream Diffpatch

The SDK's stream module provides JSON diff and patch utilities used by the v0 streaming system. They are exported from the main `v0` package (and `v0/browser`).

## Installation

```bash
npm install v0
```

## Importing

```ts
import { diff, isV0StringAppendDelta, patch } from 'v0'
```

## diff()

Computes a JSON diff between two values and returns a `V0StreamDelta`.

```ts
import { diff } from 'v0'

const delta = diff(original, modified)
// delta is JsonDiffPatchDelta | V0StringAppendDelta
```

## patch()

Applies a JSON patch to a value and returns the updated value.

```ts
import { patch } from 'v0'

const updated = patch(original, delta)
```

## V0StreamDelta

The delta type is either:

- `JsonDiffPatchDelta` — Standard JSON diff patch
- `V0StringAppendDelta` — Array string append delta `[[...number[], string], 9, 9]`

## String Append Delta

The `isV0StringAppendDelta` function checks if a delta is a string append operation. This is used internally to handle string concatenation in streaming updates.

```ts
import { isV0StringAppendDelta } from 'v0'

if (isV0StringAppendDelta(delta)) {
  // Handle string append
}
```

## How It Works

The diffpatch module uses `jsondiffpatch` under the hood. It handles two types of patches:

1. **JSON Diff Patches**: Standard JSON patch operations for objects and arrays
2. **String Append Deltas**: Specialized patches for string concatenation, where the original string is extended with appended text

The `patch()` function tries to apply the delta using `jsondiffpatch.patch()`. If that fails, it falls back to the original value.
