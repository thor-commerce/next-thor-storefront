---
name: thor-commerce-admin-api
description: Use for Thor Commerce Admin GraphQL API questions, schema discovery, query or mutation building, and semantic introspection search against https://api.thorcommerce.io/admin/graphql/ or project-specific admin endpoints. Trigger when a user asks about Thor Commerce admin operations, orders, products, inventory, customers, fulfillment, settings, mutations, management data, or any Admin API field/type/argument/schema search task.
---

# Thor Commerce Admin API

## Overview

Use this skill to answer questions and build queries or mutations for the Thor Commerce Admin GraphQL API using semantic introspection. The API supports schema search through `__search` and detailed schema lookup through `__definitions`.

## Endpoint

Default endpoint:

```text
https://api.thorcommerce.io/admin/graphql/
```

Project-specific endpoint:

```text
https://api.thorcommerce.io/{project}/admin/graphql/
```

Use the default endpoint only for schema introspection and search with `__search` and `__definitions`. Do not use the default endpoint to query actual admin data or run mutations.

Use the project-specific endpoint for any real admin data query or mutation. If the user asks for actual data or writes and no project is known, ask for the project slug before running the operation.

## Authentication

When an Admin API key is provided, send it using the `X-Api-Key` HTTP header:

```bash
-H 'X-Api-Key: YOUR_ADMIN_API_KEY'
```

Do not send Admin API keys as `Authorization: Bearer` tokens.

## Workflow

1. Search broadly with one `__search` call that covers all aspects of the user's intent.
2. Resolve schema details with one `__definitions` call containing all useful coordinates: root query or mutation fields, return types, nested object types, input types, and enum types.
3. Build and execute the GraphQL query or mutation against the project-specific Admin endpoint.
4. Answer from the API response. For write operations, explain the operation before executing and avoid making live changes unless the user clearly requested them.

## Schema Search

Use `__search`; do not use normal GraphQL introspection through `__schema` or `__type`.

```bash
curl -s -X POST 'https://api.thorcommerce.io/admin/graphql/' \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "{ __search(query: \"YOUR_INTENT\", first: 10) { coordinate score pathsToRoot definition { __typename ... on __Field { fieldName: name type { name kind ofType { name kind } } args { name type { name kind ofType { name kind } } } } ... on __Type { name kind } } } }"
  }' | jq '.data.__search'
```

For project-specific schema search, replace the URL with:

```text
https://api.thorcommerce.io/{project}/admin/graphql/
```

## Definition Lookup

After search, request all needed definitions in a single call:

```bash
curl -s -X POST 'https://api.thorcommerce.io/admin/graphql/' \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "query($c:[String!]!){ __definitions(coordinates:$c){ __typename ... on __Type { name kind fields { name type { name kind ofType { name kind } } args { name type { name kind ofType { name kind } } defaultValue } } inputFields { name type { name kind ofType { name kind } } defaultValue } enumValues { name } } ... on __Field { fieldName: name type { name kind ofType { name kind } } args { name type { name kind ofType { name kind } } defaultValue } } } }",
    "variables": {"c": ["Query.orders", "Order"]}
  }' | jq '.data.__definitions'
```

## Wrapped Types

When an argument, input field, or field has `type: { "name": null, "kind": "NON_NULL" }` or `LIST`, follow `ofType` until the concrete type appears. If the concrete type is an enum, include that enum type name in the `__definitions` coordinates and use enum values directly in GraphQL operations:

```graphql
query {
	orders(status: OPEN) {
		nodes {
			id
			number
		}
	}
}
```

Do not quote enum values as strings.

## Guidance

- Batch schema work: one broad `__search`, one broad `__definitions`, then the data query or mutation.
- Read `pathsToRoot` to determine how a searched field is reached from `Query` or `Mutation`.
- Treat non-null arguments and input fields as required.
- Use the default endpoint only for `__search` and `__definitions`; use `https://api.thorcommerce.io/{project}/admin/graphql/` for actual data or mutations.
- Preserve headers and auth context across search, definition lookup, and data operation when applicable.
- If authentication or project context is required and not available, ask for only the missing token, header, or project slug.
