import { gql } from "@/__generated__/thor";

export const CATEGORY_GRID_QUERY = gql(/* GraphQL */ `
  query CategoryGrid(
    $slug: String!
    $currency: String!
    $storeId: ID!
    $after: String
    $sortDirection: SortDirection!
    $sortKey: ProductCategorySortKeys!
  ) {
    category(slug: $slug) {
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
      }
    }
  }
`);
