import { gql } from "@/__generated__/thor";

export const HOME_PAGE_QUERY = gql(/* GraphQL */ `
  query HomePage($storeId: ID!, $currency: String!) {
    categories(first: 6, storeId: $storeId, priceCurrency: $currency) {
      edges {
        node {
          id
          name
          slug
          productsCount
        }
      }
    }
    collections(first: 4) {
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
    products(
      first: 8
      sortKey: ID
      sortDirection: DESC
      storeId: $storeId
      priceCurrency: $currency
    ) {
      edges {
        node {
          id
          name
          slug
          heroVariant {
            image {
              src
            }
          }
          priceRange {
            minPrice {
              value {
                centAmount
                currencyCode
                fractionDigits
              }
              discountedPrice {
                value {
                  centAmount
                  currencyCode
                  fractionDigits
                }
              }
            }
          }
        }
      }
    }
  }
`);
