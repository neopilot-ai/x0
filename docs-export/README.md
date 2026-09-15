# v0 Documentation

Official documentation for v0 - AI agent for creating real code and full-stack apps.

## Structure

All docs follow the `https://v0.app/docs/*` URL pattern:

- `/*.md` → `https://v0.app/docs/*` (product docs)
- `/api/v2/*.md` → `https://v0.app/docs/api/v2/*` (API docs)
- `/api/v2/reference/chats/*.md` → `https://v0.app/docs/api/v2/reference/chats/*`
- `/api/v2/guides/*.md` → `https://v0.app/docs/api/v2/guides/*`
- `/compare/*.md` → `https://v0.app/docs/compare/*`

## Quick Reference

- `llms.txt` - LLM index of all docs
- `sitemap.md` - Full sitemap
- `agents.md` - Agent-facing documentation
- `index.md` - Overview page
- `quickstart.md` - Getting started guide
- `api/v2.md` - v2 API overview (119 lines)
- `api/v1.md` - v1 API overview (148 lines, deprecated)

## Stats

- **196** markdown files
- **21** chat API endpoints
- **9** message API endpoints
- **5** MCP server endpoints
- **5** webhook endpoints
- **2** settings endpoints
- **3** usage endpoints
- **21** API guides (including browser-entry, streaming-result, stream-diffpatch, skills-sh, design-systems)
- **4** comparison pages
- **40+** product feature docs

## Serving

```bash
npx serve . -p 3000
```

Or use any static site generator that supports Markdown.
