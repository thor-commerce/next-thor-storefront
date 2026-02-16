import { gql } from "@/__generated__/thor";

export const PRODUCTS_GRID_QUERY = gql(/* GraphQL */ `
  query ProductsGrid(
    $storeId: ID!
    $priceChannelId: ID!
    $priceCurrency: String!
    $after: String
    $sortDirection: SortDirection!
    $sortKey: ProductSortKeys!
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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const PRODUCT_QUERY = gql(/* GraphQL */ `
  query ProductDetail(
    $slug: String
    $storeId: ID!
    $priceChannelId: ID!
    $priceCurrency: String!
  ) {
    product(
      slug: $slug
      storeId: $storeId
      priceChannelId: $priceChannelId
      priceCurrency: $priceCurrency
    ) {
      id
      name
      description
      attributeAssignments {
        name
        attribute {
          type
        }
        values {
          edges {
            node {
              value
              ... on SwatchAttributeValue {
                media {
                  src
                }
                color
              }
            }
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            sku
            selectedAttributes {
              name
              value
            }
            availability {
              availableForPurchase
              availableQuantity
              stockPolicy
            }
            price {
              value {
                centAmount
                currencyCode
                fractionDigits
              }
              discountedPrice {
                value {
                  centAmount
                  fractionDigits
                  currencyCode
                }
                discount {
                  value {
                    __typename
                    ... on ProductDiscountRelativeValue {
                      factor
                    }
                    ... on ProductDiscountAbsoluteValue {
                      value {
                        centAmount
                        currencyCode
                        fractionDigits
                      }
                    }
                  }
                }
              }
              taxBehavior
            }
            media {
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`);
