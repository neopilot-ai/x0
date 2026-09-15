---
title: Versions
description: Version control for generated code blocks
product: v0
type: guide
related:
  - /docs/code-editing
  - /docs/projects
---

# Versions

Each time v0 updates a code block from a message, it creates a new version. Non-message actions (such as editing code or modifying files directly) do not generate new versions.

![Versions](https://v0.app/docs/light/versions.png)

Restoring an old version creates a new, most recent version using the restored code to maintain a linear version history.

When deploying, the latest version of the code is used. If you want to deploy a previous version, you can restore it and then deploy.

Use the version controls attached to each generated message to inspect a version, view its diff, or restore an earlier generation.
