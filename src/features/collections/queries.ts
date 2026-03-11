import { gql } from "@/__generated__/thor";

export const COLLECTIONS_QUERY = gql(/* GraphQL */ `
  query Collections($storeId: ID!, $currency: String!) {
    collections(first: 48) {
      edges {
        node {
          id
          name
          slug
          products(first: 0, storeId: $storeId, priceCurrency: $currency) {
            totalCount
          }
        }
      }
    }
  }
`);

export const COLLECTION_GRID_QUERY = gql(/* GraphQL */ `
  query CollectionGrid(
    $slug: String!
    $currency: String!
    $storeId: ID!
    $after: String
    $sortDirection: SortDirection!
    $sortKey: ProductCollectionSortKeys!
  ) {
    collection(slug: $slug, storeId: $storeId, priceCurrency: $currency) {
      id
      name
      products(
        first: 15
        after: $after
        sortDirection: $sortDirection
        sortKey: $sortKey
        priceCurrency: $currency
        storeId: $storeId
      ) {
        edges {
          node {
            id
            ...ProductGridTile
          }
        }
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`);
