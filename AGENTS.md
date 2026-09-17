# Agent Instructions

Shared agent skills live in `.agent/skills`.

Use `.agent/skills/thor-commerce-admin-api/SKILL.md` for Thor Commerce Admin GraphQL API questions, schema discovery, query or mutation building, and semantic introspection.

Use `.agent/skills/thor-commerce-storefront-api/SKILL.md` for Thor Commerce Storefront GraphQL API questions, schema discovery, query building, and semantic introspection.

The skills are written in the portable `SKILL.md` format and should avoid instructions specific to one AI tool.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
