/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment ProductGridTile on Product {\n    id\n    name\n    heroVariant {\n      image {\n        src\n      }\n    }\n    priceRange {\n      minPrice {\n        value {\n          centAmount\n          currencyCode\n          fractionDigits\n        }\n        discountedPrice {\n          value {\n            centAmount\n            fractionDigits\n            currencyCode\n          }\n          discount {\n            value {\n              ... on ProductDiscountRelativeValue {\n                factor\n              }\n              ... on ProductDiscountAbsoluteValue {\n                value {\n                  centAmount\n                  currencyCode\n                  fractionDigits\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.ProductGridTileFragmentDoc,
    "\n  query CategoryGrid(\n    $slug: String!\n    $curreny: String!\n    $channelId: ID!\n    $after: String\n    $sortDirection: SortDirection!\n  ) {\n    category(slug: $slug, currency: $curreny, channelId: $channelId) {\n      products(first: 15, after: $after, sortDirection: $sortDirection) {\n        edges {\n          node {\n            id\n            ...ProductGridTile\n          }\n        }\n      }\n    }\n  }\n": typeof types.CategoryGridDocument,
};
const documents: Documents = {
    "\n  fragment ProductGridTile on Product {\n    id\n    name\n    heroVariant {\n      image {\n        src\n      }\n    }\n    priceRange {\n      minPrice {\n        value {\n          centAmount\n          currencyCode\n          fractionDigits\n        }\n        discountedPrice {\n          value {\n            centAmount\n            fractionDigits\n            currencyCode\n          }\n          discount {\n            value {\n              ... on ProductDiscountRelativeValue {\n                factor\n              }\n              ... on ProductDiscountAbsoluteValue {\n                value {\n                  centAmount\n                  currencyCode\n                  fractionDigits\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.ProductGridTileFragmentDoc,
    "\n  query CategoryGrid(\n    $slug: String!\n    $curreny: String!\n    $channelId: ID!\n    $after: String\n    $sortDirection: SortDirection!\n  ) {\n    category(slug: $slug, currency: $curreny, channelId: $channelId) {\n      products(first: 15, after: $after, sortDirection: $sortDirection) {\n        edges {\n          node {\n            id\n            ...ProductGridTile\n          }\n        }\n      }\n    }\n  }\n": types.CategoryGridDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ProductGridTile on Product {\n    id\n    name\n    heroVariant {\n      image {\n        src\n      }\n    }\n    priceRange {\n      minPrice {\n        value {\n          centAmount\n          currencyCode\n          fractionDigits\n        }\n        discountedPrice {\n          value {\n            centAmount\n            fractionDigits\n            currencyCode\n          }\n          discount {\n            value {\n              ... on ProductDiscountRelativeValue {\n                factor\n              }\n              ... on ProductDiscountAbsoluteValue {\n                value {\n                  centAmount\n                  currencyCode\n                  fractionDigits\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ProductGridTile on Product {\n    id\n    name\n    heroVariant {\n      image {\n        src\n      }\n    }\n    priceRange {\n      minPrice {\n        value {\n          centAmount\n          currencyCode\n          fractionDigits\n        }\n        discountedPrice {\n          value {\n            centAmount\n            fractionDigits\n            currencyCode\n          }\n          discount {\n            value {\n              ... on ProductDiscountRelativeValue {\n                factor\n              }\n              ... on ProductDiscountAbsoluteValue {\n                value {\n                  centAmount\n                  currencyCode\n                  fractionDigits\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CategoryGrid(\n    $slug: String!\n    $curreny: String!\n    $channelId: ID!\n    $after: String\n    $sortDirection: SortDirection!\n  ) {\n    category(slug: $slug, currency: $curreny, channelId: $channelId) {\n      products(first: 15, after: $after, sortDirection: $sortDirection) {\n        edges {\n          node {\n            id\n            ...ProductGridTile\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CategoryGrid(\n    $slug: String!\n    $curreny: String!\n    $channelId: ID!\n    $after: String\n    $sortDirection: SortDirection!\n  ) {\n    category(slug: $slug, currency: $curreny, channelId: $channelId) {\n      products(first: 15, after: $after, sortDirection: $sortDirection) {\n        edges {\n          node {\n            id\n            ...ProductGridTile\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;