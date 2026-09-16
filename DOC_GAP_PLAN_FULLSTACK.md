# Gap Analysis + Implementation Plan: full-stack-apps, prototyping, prd-design

Source: live `https://v0.app/docs/{full-stack-apps,prototyping,prd-design}.md` fetched 2026-09-15.
Target: `docs-export/{full-stack-apps,prototyping,prd-design}.md`.

## Gap analysis

Body content is at parity (all three were expanded from these same pages earlier).
Remaining gaps are frontmatter metadata and two dropped elements in
full-stack-apps:

| #   | File               | Gap                                                                                                     | Severity                                                   |
| --- | ------------------ | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| 1   | all three          | Frontmatter missing `prerequisites: [/docs/quickstart]` and `related: [...]` that live pages carry      | medium — frontmatter drives related-links Waves/navigation |
| 2   | full-stack-apps.md | Missing `## Solutions` section (3 links: AI Website Builder, AI Code Generator, AI UI Design Generator) | medium — dead-end page without next steps                  |
| 3   | full-stack-apps.md | Missing `<PromptLink text="Create a modern task management dashboard..." />` under "Start with UI"      | low — interactive prompt chip                              |
| 4   | full-stack-apps.md | Extra line not in live ("Deploy full-stack apps to Vercel with one click")                              | keep — accurate, links Deployments                         |

Live `related` values:

- full-stack-apps: `/docs/databases`, `/docs/external-apis`, `/docs/deployments`
- prototyping: `/docs/design-mode`, `/docs/figma`, `/docs/text-prompting`
- prd-design: `/docs/prototyping`, `/docs/text-prompting`

No code implementation is warranted: all three pages describe product
workflows (prompting patterns, process guidance); no SDK/API surface is
referenced that lacks an implementation. (`mermaid` ER diagrams, `NEXT_PUBLIC_`
env vars, and solution links are all already documented accurately.)

## Implementation plan

- [ ] Phase 1 — frontmatter parity: add `prerequisites` + `related` to all three files (exact values above)
- [ ] Phase 2 — full-stack-apps content: append `## Solutions` section with the 3 live links; restore the `<PromptLink>` line under "Start with UI"
- [ ] Phase 3 — verify: re-run internal-link audit (new links are external `https://v0.app/solutions/*`, so audit must stay at 0 dead); confirm `related` targets exist
- [ ] Phase 4 — commit as `fix: frontmatter + solutions parity for full-stack-apps, prototyping, prd-design`
