# Thor Commerce Next.js Starter

Thor Commerce storefront starter built with Next.js 16 (App Router) and React 19. This repository is designed as a reference implementation that shows how to deliver a modern shopping experience backed by Thor Commerce GraphQL APIs, typed Apollo Client integration, and server-centric cart workflows.

## What's Included
- Multi-market routing with automatic country detection and channel selection via `src/middleware.ts`.
- Fully typed Apollo Client setup with `registerApolloClient`, `PreloadQuery`, and generated fragments for Thor Commerce.
- Product discovery flows: all products grid, category landing pages, and rich product detail views with variant selection.
- Cart experience powered by Next.js Server Actions, cookie-backed cart IDs, and Thor Commerce replication strategies.
- Modular UI with colocated CSS Modules and reusable building blocks (navigation, product tiles, buttons, icons, etc.).
- GraphQL code generation pipeline for schema syncing, typed operations, and fragment matcher configuration.

## Prerequisites
- Node.js 20+ (matches Next.js 16 requirements).
- [pnpm](https://pnpm.io/) for dependency management.
- A Thor Commerce organization with API access.

## Quick Start
1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Copy environment variables and set your organization:
   ```bash
   cp .env.example .env
   # update NEXT_PUBLIC_THOR_COMMERCE_ORGANIZATION
   ```
3. Pull the Thor Commerce schema and generate typed artifacts:
   ```bash
   pnpm codegen
   ```
4. Start the local development server:
   ```bash
   pnpm dev
   ```
5. Visit `http://localhost:3000` — the middleware will redirect you to a country-prefixed route (for example `/us`).

## Environment Variables
- `NEXT_PUBLIC_THOR_COMMERCE_ORGANIZATION` – the Thor Commerce organization ID that scopes GraphQL requests and schema generation.

Place environment variables in `.env` based on `.env.example`. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Package Scripts
- `pnpm dev` – run the Next.js development server.
- `pnpm build` – create a production build.
- `pnpm start` – serve the production build.
- `pnpm lint` – run ESLint across the project.
- `pnpm codegen` – sync the Thor Commerce schema and regenerate typed GraphQL artifacts.

## Project Tour
```text
src/
  app/                         # Next.js App Router entry points
    [countryCode]/(main)/      # Market-specific routes (products, categories, cart, etc.)
  components/                  # Shared UI primitives (buttons, icons, images, navigation)
  features/
    cart/                      # Cart UI, server actions, queries, and mutations
    products/                  # Product grid, product detail block, helpers, types
    categories/                # Category grid components and queries
    navbar/                    # Navigation shell with live cart indicator
  lib/thor/                    # Thor Commerce configuration and Apollo client registration
  utils/                       # Server context helpers, country lookup, currency and mapping utilities
  __generated__/thor/          # GraphQL schema, helpers, and typed documents (created by codegen)
```

Key routing behavior lives in `src/middleware.ts`, which enforces country-prefixed URLs, injects the `x-route` header for server context resolution, and falls back to a default market when the path lacks a valid country segment.

## Thor Commerce Integration Highlights
- **Typed GraphQL client** – `src/lib/thor/apollo-client.ts` wires Apollo Client with Thor Commerce's storefront endpoint, fragment masking, error logging, and code-generated `possibleTypes`.
- **Server-first cart management** – `src/features/cart` relies on Next.js Server Actions to mutate cart state, stores the cart ID in an HTTP-only cookie, and revalidates UI via `CACHE_TAGS`.
- **Channel-aware experiences** – Country metadata in `src/lib/thor/config.ts` maps markets to Thor Commerce channel IDs, default currencies, and supported locales.
- **Preloaded queries** – Pages wrap components with `PreloadQuery` to stream server-rendered GraphQL data and hydrate the client cache seamlessly.
- **Cart replication** – `cleanupCartCookieIfNeeded` demonstrates how to replicate carts when shoppers switch markets or currencies.

## Working With GraphQL
- Queries and mutations live alongside the features that use them inside `src/features/**/queries.ts` and `src/features/**/mutations.ts`.
- Generated types, hooks, and helpers are emitted into `src/__generated__/thor` after running `pnpm codegen`.
- `.graphqlrc.ts` points tooling (GraphQL ESLint, IDE extensions) at the generated schema and documents.
- Fragment masking is enabled via the GraphQL Codegen preset, and we strongly recommend keeping it on for production storefronts. This template leaves a few fragments unmasked for brevity—see Apollo's [fragment masking guide](https://www.apollographql.com/docs/react/data/fragment-masking/) to extend coverage across your features.

Whenever you update GraphQL operations, rerun `pnpm codegen` to keep types in sync.

## Customization Ideas
- Extend `COUNTRIES` in `src/lib/thor/config.ts` to match your go-to-market plan.
- Replace the placeholder home page (`src/app/[countryCode]/(main)/page.tsx`) with curated merchandising content.
- Hook authentication or customer profiles into the cart flow by leveraging the typed mutations already configured.
- Swap CSS Modules for your design system of choice or integrate a component library.

## Deployment Notes
- Ensure production environments provide `NEXT_PUBLIC_THOR_COMMERCE_ORGANIZATION`.
- If deploying on Vercel, country detection uses the `x-vercel-ip-country` header; adapt `middleware.ts` if you host elsewhere.
- Run `pnpm build` and `pnpm start` (or `vercel deploy`) after generating GraphQL assets.

## Further Reading
- [Next.js documentation](https://nextjs.org/docs)
- [Thor Commerce documentation](https://docs.thorcommerce.io/) and product/API guides (contact Thor Commerce for full access)
