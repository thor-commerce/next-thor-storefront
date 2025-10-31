import { gql } from "@/__generated__/thor";

export const CATEGORY_GRID_QUERY = gql(/* GraphQL */ `
  query CategoryGrid(
    $slug: String!
    $currency: String!
    $channelId: ID!
    $after: String
    $sortDirection: SortDirection!
    $sortKey: ProductCategorySortKeys!
  ) {
    category(slug: $slug, currency: $currency, channelId: $channelId) {
      products(
        first: 15
        after: $after
        sortDirection: $sortDirection
        sortKey: $sortKey
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
