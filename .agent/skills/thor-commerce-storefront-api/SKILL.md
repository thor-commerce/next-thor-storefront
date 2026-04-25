---
name: thor-commerce-storefront-api
description: Use for Thor Commerce Storefront GraphQL API questions, schema discovery, query building, and semantic introspection search against https://api.thorcommerce.io/storefront/graphql/ or project-specific storefront endpoints. Trigger when a user asks about Thor Commerce storefront queries, products, carts, checkout, customers, content, commerce data, or any Storefront API field/type/argument/schema search task.
---

# Thor Commerce Storefront API

## Overview

Use this skill to answer questions and build queries for the Thor Commerce Storefront GraphQL API using semantic introspection. The API supports schema search through `__search` and detailed schema lookup through `__definitions`.

## Endpoint

Default endpoint:

```text
https://api.thorcommerce.io/storefront/graphql/
```

Project-specific endpoint:

```text
https://api.thorcommerce.io/{project}/storefront/graphql/
```

Use the default endpoint only for schema introspection and search with `__search` and `__definitions`. Do not use the default endpoint to query actual storefront data.

Use the project-specific endpoint for any real storefront data query. If the user asks for actual data and no project is known, ask for the project slug before running the data query.

## Workflow

1. Search broadly with one `__search` call that covers all aspects of the user's intent.
2. Resolve schema details with one `__definitions` call containing all useful coordinates: root query or mutation fields, return types, nested object types, input types, and enum types.
3. Build and execute the GraphQL operation against the project-specific Storefront endpoint.
4. Answer from the API response. Mention uncertainty only when the response is missing required data.

## Schema Search

Use `__search`; do not use normal GraphQL introspection through `__schema` or `__type`.

```bash
curl -s -X POST 'https://api.thorcommerce.io/storefront/graphql/' \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "{ __search(query: \"YOUR_INTENT\", first: 10) { coordinate score pathsToRoot definition { __typename ... on __Field { fieldName: name type { name kind ofType { name kind } } args { name type { name kind ofType { name kind } } } } ... on __Type { name kind } } } }"
  }' | jq '.data.__search'
```

For project-specific schema search, replace the URL with:

```text
https://api.thorcommerce.io/{project}/storefront/graphql/
```

## Definition Lookup

After search, request all needed definitions in a single call:

```bash
curl -s -X POST 'https://api.thorcommerce.io/storefront/graphql/' \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "query($c:[String!]!){ __definitions(coordinates:$c){ __typename ... on __Type { name kind fields { name type { name kind ofType { name kind } } args { name type { name kind ofType { name kind } } defaultValue } } inputFields { name type { name kind ofType { name kind } } defaultValue } enumValues { name } } ... on __Field { fieldName: name type { name kind ofType { name kind } } args { name type { name kind ofType { name kind } } defaultValue } } } }",
    "variables": {"c": ["Query.products", "Product"]}
  }' | jq '.data.__definitions'
```

## Wrapped Types

When an argument or field has `type: { "name": null, "kind": "NON_NULL" }` or `LIST`, follow `ofType` until the concrete type appears. If the concrete type is an enum, include that enum type name in the `__definitions` coordinates and use enum values directly in GraphQL operations:

```graphql
query {
	products(sort: NEWEST) {
		nodes {
			id
			name
		}
	}
}
```

Do not quote enum values as strings.

## Guidance

- Batch schema work: one broad `__search`, one broad `__definitions`, then the data query.
- Read `pathsToRoot` to determine how a searched field is reached from `Query` or `Mutation`.
- Treat non-null arguments as required.
- Use the default endpoint only for `__search` and `__definitions`; use `https://api.thorcommerce.io/{project}/storefront/graphql/` for actual data.
- Preserve headers and auth context across search, definition lookup, and data query when applicable.
- If authentication or project context is required and not available, ask for only the missing token, header, or project slug.
