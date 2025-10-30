import { gql } from "@/__generated__/thor";

export const CATEGORY_GRID_QUERY = gql(/* GraphQL */ `
  query CategoryGrid(
    $slug: String!
    $curreny: String!
    $channelId: ID!
    $after: String
    $sortDirection: SortDirection!
  ) {
    category(slug: $slug, currency: $curreny, channelId: $channelId) {
      products(first: 15, after: $after, sortDirection: $sortDirection) {
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
