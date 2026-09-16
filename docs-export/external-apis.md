---
title: External APIs
description: Build full-stack applications by calling external APIs with environment variables
product: v0
type: integration
related:
  - /docs/databases
  - /docs/ai-models
  - /docs/full-stack-apps
---

# External APIs

You can call external services in your v0 prototypes by storing access keys as environment variables. This works for both third-party and your own APIs.

To add an integration by prompt, describe it: "Connect to Twilio for SMS notifications" — v0 generates the necessary API calls and error handling, and the integration wizard prompts you to add API keys after generation.

## Adding API keys

Follow **Project menu** `...` → **Settings** → **Environment Variables** to add your necessary keys or modify existing environment variables. Note that the v0 preview will only be able to access environment variables that are available to the Development environment.

## Environments

When adding a variable, you can choose which environments it applies to. This lets you use different API keys for testing vs production, or enable features only in certain environments.

| Environment     | Description                                              |
| --------------- | -------------------------------------------------------- |
| **Production**  | Applied to your live, published app                      |
| **Preview**     | Applied to preview deployments (non-production branches) |
| **Development** | Applied to the v0 preview panel or when running locally  |

Environment variables are encrypted and stored securely on Vercel. Once added, you can instruct v0 to use them in your API calls.
