# Thor Commerce Next.js Storefront

**A modern, type-safe headless ecommerce starter built with Thor Commerce, Next.js 16, React 19, TypeScript, and GraphQL.**

[![GitHub stars](https://img.shields.io/github/stars/thor-commerce/next-thor-storefront?style=social)](https://github.com/thor-commerce/next-thor-storefront/stargazers)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GraphQL](https://img.shields.io/badge/GraphQL-typed-E10098?logo=graphql&logoColor=white)](https://graphql.org/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-ready-F38020?logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)

[Use this template](https://github.com/new?template_name=next-thor-storefront&template_owner=thor-commerce) · [Thor Commerce](https://thorcommerce.io/) · [Developer documentation](https://docs.thorcommerce.io/) · [Storefront API](https://docs.thorcommerce.io/api/storefront-graphql)

This repository is a reference storefront for [Thor Commerce](https://thorcommerce.io/), the unified commerce platform for B2B, DTC, and hybrid business models. It demonstrates real customer-facing commerce flows—from product discovery and market-aware pricing to cart, checkout, payments, orders, and customer accounts—using the Next.js App Router.

Use it as a starting point for a custom storefront, as an integration reference for the Thor Storefront GraphQL API, or as a working example of server-first commerce architecture in Next.js.

## Why this storefront

- **Commerce primitives included.** Catalog, variants, collections, categories, availability, pricing, discounts, cart, shipping, checkout, payments, orders, and accounts are already connected.
- **Server-first and type-safe.** React Server Components and Server Actions call typed GraphQL documents without exposing storefront credentials to the browser.
- **Built for customization.** Features are grouped by domain, styling uses local CSS Modules, and generated API types remain separate from handwritten application code.
- **Market-aware by design.** Country-prefixed routes resolve store and currency context before catalog or cart operations run.
- **Deployable to the edge.** OpenNext and Wrangler configuration is included for Cloudflare Workers with R2-backed incremental caching.

## Features

| Area              | Included                                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Catalog           | Product listings, product details, variants, categories, collections, sorting, faceted filters, and availability  |
| Pricing           | Store- and currency-aware prices, product discounts, cart discounts, and formatted money values                   |
| Cart              | Cookie-backed persistence, quantity updates, line removal, availability checks, discount display, and cart totals |
| Checkout          | Payment gateway selection, customer details, shipping methods, order summary, and order completion                |
| Payments          | Stripe Payment Element, wallets supported by Stripe, and manual payment gateways                                  |
| Customer accounts | Registration, login, logout, password reset, customer sessions, and customer-aware pricing                        |
| Markets           | Country-prefixed routing with store and currency context injected at the request boundary                         |
| Media             | Responsive product images backed by Thor Commerce media URLs and image transformations                            |
| UI                | React Aria components, responsive layouts, loading states, skeletons, drawers, and accessible controls            |
| Deployment        | Next.js production builds plus OpenNext configuration for Cloudflare Workers and R2                               |

## Architecture

```text
Browser
  ↓
Next.js routes, React Server Components, and Server Actions
  ↓
Country, store, currency, cart, and customer context
  ↓
Typed GraphQL operations through storefrontFetch
  ↓
https://api.thorcommerce.io/{THOR_PROJECT}/storefront/graphql
  ↓
Thor Commerce catalog, pricing, cart, checkout, and customer services
```

The browser receives rendered UI and invokes Server Actions. Storefront credentials and authenticated API calls stay on the server. GraphQL operations are authored in `.graphql` files and compiled into typed TypeScript documents with GraphQL Code Generator.

## Quick start

### Prerequisites

- Node.js 20.9 or newer
- [pnpm](https://pnpm.io/)
- A Thor Commerce project with Storefront API access

### 1. Create your storefront

Start with the GitHub template or clone the repository:

```bash
git clone https://github.com/thor-commerce/next-thor-storefront.git
cd next-thor-storefront
pnpm install
```

### 2. Configure the environment

```bash
cp .env.example .env
```

Add your Thor project and application secrets to `.env`:

```bash
THOR_PROJECT="your-project-id"
THOR_STOREFRONT_API_KEY="your-storefront-api-key"
BETTER_AUTH_SECRET="generate-with-openssl-rand-base64-32"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="generate-with-openssl-rand-base64-32"
```

Keep secrets in local environment files or your deployment platform's secret store. Never commit real credentials.

### 3. Generate the GraphQL client

```bash
pnpm codegen
```

### 4. Run the storefront

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The middleware redirects the request to a country-prefixed market route such as `/dk`.

## Configuration

### Environment variables

| Variable                             | Required   | Purpose                                                     |
| ------------------------------------ | ---------- | ----------------------------------------------------------- |
| `THOR_PROJECT`                       | Yes        | Project ID used in the Thor Storefront GraphQL endpoint     |
| `THOR_STOREFRONT_API_KEY`            | Yes        | Server-side credential sent with Storefront API requests    |
| `BETTER_AUTH_SECRET`                 | Yes        | Secret used to sign Better Auth state and sessions          |
| `BETTER_AUTH_URL`                    | Yes        | Base URL for authentication callbacks and cookies           |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | Production | Stable encryption key for Server Actions across deployments |

### Markets, stores, and currencies

Edit `src/lib/thorcommerce/config.ts` to configure:

- supported country codes;
- the default country;
- Thor store IDs;
- supported currencies; and
- the mapping between markets, stores, and currencies.

`src/middleware.ts` resolves the country from the URL or the Cloudflare `CF-IPCountry` header, redirects invalid or missing market prefixes, and injects `X-Thor-Store` and `X-Thor-Currency` into the request.

## Working with the Thor Storefront API

Application requests are centralized in `src/lib/thorcommerce/storefront/index.ts` and sent to the project-specific endpoint:

```text
https://api.thorcommerce.io/${THOR_PROJECT}/storefront/graphql
```

GraphQL source files live under `src/lib/thorcommerce/storefront`:

```text
fragments/     Shared product, price, availability, cart, and money selections
queries/       Catalog, cart, checkout, order, and customer reads
mutations/     Cart, checkout, and customer writes
generated/     Generated TypeScript types and typed document strings
```

After changing a query, mutation, or fragment, regenerate the client:

```bash
pnpm codegen
```

Do not edit `generated/types.generated.ts` manually. Update the GraphQL document and run code generation instead.

## Repository guide

This map is intended for contributors, maintainers, and AI coding agents working in the repository.

| If you want to change…               | Start here                                                                              |
| ------------------------------------ | --------------------------------------------------------------------------------------- |
| Product queries and product pages    | `src/lib/thorcommerce/storefront/queries/products.graphql` and `src/features/products`  |
| Categories and collections           | `src/features/categories`, `src/features/collections`, and their GraphQL queries        |
| Cart behavior                        | `src/features/cart` and `src/lib/thorcommerce/storefront/mutations/cart.graphql`        |
| Checkout steps and validation        | `src/features/checkout` and `src/lib/thorcommerce/storefront/queries/checkout.graphql`  |
| Customer authentication              | `src/lib/auth.ts`, `src/features/account`, and `src/app/api/auth/[...all]`              |
| Country, store, or currency behavior | `src/lib/thorcommerce/config.ts`, `src/lib/request-context.ts`, and `src/middleware.ts` |
| Storefront API transport             | `src/lib/thorcommerce/storefront/index.ts` and `endpoint.ts`                            |
| Shared visual components             | `src/components`                                                                        |
| Cloudflare deployment                | `open-next.config.ts`, `wrangler.jsonc`, and `public/_headers`                          |

Important repository conventions:

- Treat `.graphql` documents as the source of truth for Storefront API selections.
- Keep API keys and customer session tokens on the server.
- Reuse the request's store and currency context through the complete cart lifecycle.
- Re-read the returned cart after mutations because prices, discounts, stock, shipping eligibility, and totals can change together.
- Keep cart IDs in cookies and resource IDs and cursors opaque.
- Read `AGENTS.md` before using an AI coding agent; it points to the repository's Thor Commerce API skills.

## Project structure

```text
src/
  app/
    [countryCode]/
      (main)/                 Storefront and customer account routes
      (checkout)/             Checkout and order routes
    api/auth/[...all]/        Better Auth route handler
  components/                 Shared UI primitives and commerce components
  features/
    account/                  Login, registration, and account actions
    cart/                     Cart drawer, context, actions, and line items
    checkout/                 Customer, delivery, payment, and order flows
    categories/               Category page UI
    collections/              Collection page UI
    home/                     Home page UI
    navbar/                   Navigation and customer controls
    products/                 Product listing and product detail UI
  lib/
    auth.ts                   Better Auth configuration
    request-context.ts        Store and currency request context
    thorcommerce/
      config.ts               Country, currency, and store configuration
      storefront/             GraphQL documents, generated types, and API client
  utils/                      Money, price, map, and responsive utilities
  middleware.ts               Market routing and request header injection
```

## Commands

| Command           | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `pnpm dev`        | Start the Next.js development server                  |
| `pnpm build`      | Create a production build                             |
| `pnpm start`      | Serve the production build                            |
| `pnpm lint`       | Run ESLint                                            |
| `pnpm lint:fix`   | Apply safe ESLint fixes                               |
| `pnpm codegen`    | Generate TypeScript types and typed GraphQL documents |
| `pnpm cf-typegen` | Generate Cloudflare environment types                 |
| `pnpm preview`    | Build and preview the Cloudflare deployment locally   |
| `pnpm deploy`     | Build and deploy to Cloudflare                        |
| `pnpm upload`     | Build and upload a Cloudflare deployment version      |

## Deploying to Cloudflare

The repository includes OpenNext and Wrangler configuration for Cloudflare Workers. Before deploying:

1. Add the required environment variables and secrets to Cloudflare.
2. Create or update the R2 bucket referenced by `wrangler.jsonc`.
3. Generate GraphQL types and run a production build.
4. Preview the Worker locally with `pnpm preview`.
5. Deploy with `pnpm deploy`.

If you deploy elsewhere, adapt the country-detection header in `src/middleware.ts`; `CF-IPCountry` is specific to Cloudflare.

## Frequently asked questions

### What is Thor Commerce?

[Thor Commerce](https://thorcommerce.io/) is a unified commerce platform for B2B, DTC, and hybrid businesses. Its GraphQL APIs connect catalog, pricing, inventory, customers, carts, checkout, and orders while leaving the storefront experience under your control.

### Is this a headless ecommerce starter?

Yes. The repository provides a decoupled Next.js frontend backed by the Thor Commerce Storefront GraphQL API. You can replace the design system, add routes, and extend GraphQL selections without coupling the UI to a monolithic commerce frontend.

### Does it support custom checkout?

Yes. The included checkout covers customer details, delivery, gateway selection, Stripe payments, manual payments, and order completion. Thor can also return a hosted checkout URL when that is a better fit for your implementation.

### Can it run outside Cloudflare?

Yes. The application uses standard Next.js patterns. Cloudflare deployment files are included, but you can deploy to another Next.js-compatible platform after adapting platform-specific country detection and runtime configuration.

### Is it ready for production?

This is a working reference implementation and a strong starting point. Before launch, review your market configuration, authentication settings, payment methods, tax behavior, shipping rules, observability, accessibility, and deployment security for your business requirements.

## Contributing

Issues, ideas, and pull requests are welcome. If you find a bug or want to propose a storefront feature, [open an issue](https://github.com/thor-commerce/next-thor-storefront/issues/new) with a clear reproduction or use case.

If this storefront saves you time, [star the repository](https://github.com/thor-commerce/next-thor-storefront) to help other Next.js and headless commerce developers discover Thor Commerce.

## Learn more

- [Thor Commerce](https://thorcommerce.io/)
- [Thor Commerce developer documentation](https://docs.thorcommerce.io/)
- [Storefront API overview](https://docs.thorcommerce.io/api/storefront-graphql)
- [Cart and checkout guide](https://docs.thorcommerce.io/api/storefront-graphql/cart-and-checkout)
- [Thor Commerce on GitHub](https://github.com/thor-commerce)
- [Next.js documentation](https://nextjs.org/docs)
- [Better Auth documentation](https://www.better-auth.com/docs)
- [GraphQL Code Generator documentation](https://the-guild.dev/graphql/codegen)
