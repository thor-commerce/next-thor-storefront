# Thor Commerce Next.js Storefront

A Thor Commerce storefront built with Next.js 16, React 19, Server Components, Server Actions, and typed GraphQL operations. The project is a practical starter for product discovery, cart, checkout, customer auth, and country-aware storefront routing against the Thor Commerce Storefront API.

## What's Included

- Country-prefixed routing under `src/app/[countryCode]` with automatic redirect and market context in `src/proxy.ts`.
- Typed Storefront API operations generated from colocated `.graphql` files in `src/lib/thorcommerce/storefront`.
- Server-side GraphQL access through `storefrontFetch`, with request context for store and currency headers.
- Product, category, collection, cart, checkout, order, account, and home page flows.
- Better Auth integration with `@thor-commerce/better-auth-thor` for customer sessions.
- Reusable UI components with CSS Modules and shared commerce utilities.

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/)
- A Thor Commerce project ID with Storefront API access

## Quick Start

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your Thor Commerce project and auth secrets:

   ```bash
   THOR_PROJECT="[your-project-id]"
   BETTER_AUTH_SECRET="[openssl rand -base64 32]"
   BETTER_AUTH_URL="http://localhost:3000"
   NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="[openssl rand -base64 32]"
   ```

4. Generate typed GraphQL artifacts:

   ```bash
   pnpm codegen
   ```

5. Start the development server:

   ```bash
   pnpm dev
   ```

6. Open `http://localhost:3000`. Requests are redirected to a country-prefixed route, such as `/dk`.

## Environment Variables

- `THOR_PROJECT` - Thor Commerce project ID used to build Storefront API requests.
- `BETTER_AUTH_SECRET` - secret used by Better Auth.
- `BETTER_AUTH_URL` - base URL for Better Auth callbacks and cookies.
- `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` - encryption key for Server Actions, required for Cloudflare Workers deployments.

Keep local values in `.env`. Do not commit real project IDs or secrets.

## Scripts

- `pnpm dev` - run the Next.js development server.
- `pnpm build` - create a production build.
- `pnpm start` - serve the production build.
- `pnpm lint` - run ESLint.
- `pnpm lint:fix` - run ESLint and apply automatic fixes.
- `pnpm codegen` - generate TypeScript types and typed documents from Storefront GraphQL operations.
- `pnpm cf-typegen` - generate Cloudflare environment types with Wrangler.

## Project Structure

```text
src/
  app/
    [countryCode]/
      (main)/                 # Storefront pages: home, products, categories, collections, account
      (checkout)/             # Checkout and order pages
    api/auth/[...all]/        # Better Auth route handler
  components/                 # Shared UI primitives and commerce components
  features/
    account/                  # Customer login and account actions
    cart/                     # Cart drawer, context, actions, and helpers
    checkout/                 # Checkout form, schema, actions, and order utilities
    categories/               # Category page UI
    collections/              # Collection page UI
    home/                     # Home page UI
    navbar/                   # Navigation shell
    products/                 # Product listing and detail UI
  lib/
    auth.ts                   # Better Auth configuration
    request-context.ts        # Store and currency context from request headers
    thorcommerce/
      config.ts               # Country, currency, and store configuration
      const.ts                # Thor headers, cookies, and defaults
      storefront/             # GraphQL documents, generated types, and API helpers
  utils/                      # Shared formatting, maps, countries, and price helpers
  proxy.ts                    # Country routing and market header injection
```

## Thor Commerce Integration

Storefront requests are centralized in `src/lib/thorcommerce/storefront/index.ts`. The helper posts typed GraphQL documents to:

```text
https://api.thorcommerce.io/${THOR_PROJECT}/storefront/graphql
```

`src/proxy.ts` resolves the country from the URL or `CF-IPCountry`, redirects missing or invalid country prefixes, and injects `X-Thor-Store` and `X-Thor-Currency` headers. Server code reads those headers through `getRequestContext()`.

Country and market behavior is configured in `src/lib/thorcommerce/config.ts`. Update `COUNTRIES`, `STORE`, `CURRENCY`, and `DEFAULT_COUNTRY` when adapting the storefront to a real market setup.

## Working With GraphQL

- GraphQL operations live in `src/lib/thorcommerce/storefront/**/*.graphql`.
- Generated types are written to `src/lib/thorcommerce/storefront/generated/types.generated.ts`.
- GraphQL Code Generator is configured in `.graphqlrc.ts`.

Run `pnpm codegen` after changing GraphQL documents so TypeScript stays in sync with the Storefront API schema.

## Auth

Customer auth is configured in `src/lib/auth.ts` with Better Auth and `@thor-commerce/better-auth-thor`. The API route is mounted at `src/app/api/auth/[...all]/route.ts`.

Set `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` before using login or account flows locally.

## Deployment Notes

- Provide all required environment variables in the deployment environment.
- `src/proxy.ts` reads `CF-IPCountry` for country detection, which is available on Cloudflare. Adapt that header lookup if your host provides a different country signal.
- Run `pnpm codegen` before building when GraphQL operations or the schema have changed.
- Run `pnpm build` as the final production verification.

## Further Reading

- [Next.js documentation](https://nextjs.org/docs)
- [Better Auth documentation](https://www.better-auth.com/docs)
- [Thor Commerce documentation](https://docs.thorcommerce.io/)
