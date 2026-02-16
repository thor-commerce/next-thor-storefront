import { gql } from "@/__generated__/thor";

export const CATEGORY_GRID_QUERY = gql(/* GraphQL */ `
  query CategoryGrid(
    $slug: String!
    $storeId: ID!
    $priceChannelId: ID!
    $priceCurrency: String!
    $after: String
    $sortDirection: SortDirection!
    $sortKey: ProductCategorySortKeys!
  ) {
    category(
      slug: $slug
      storeId: $storeId
      priceChannelId: $priceChannelId
      priceCurrency: $priceCurrency
    ) {
      products(
        first: 15
        after: $after
        sortDirection: $sortDirection
        sortKey: $sortKey
        storeId: $storeId
        priceChannelId: $priceChannelId
        priceCurrency: $priceCurrency
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
