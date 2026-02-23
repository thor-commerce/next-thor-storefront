import { gql } from "@/__generated__/thor";

export const NAVBAR_CART_QUERY = gql(/* GraphQL */ `
  query NavbarCart($id: ID!) {
    cart(id: $id) {
      id
      lineItemsQuantity
      state
      currency
      customerId
      store {
        id
      }
    
    }
  }
`);

export const CART_DETAILS_QUERY = gql(/* GraphQL */ `
  query CartDetails($id: ID!) {
    cart(id: $id) {
      id
      customerId
      shippingAddress {
        countryCode
      }
      lineItemsQuantity
      lineItems(first: 100) {
        edges {
          node {
            id
            ...CartLineItem

            discountApplications {
              edges {
                node {
                  discountedAmount {
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
      discountCodes {
        code
      }
      subtotal {
        centAmount
        currencyCode
        fractionDigits
      }
      taxedPrice {
        tax {
          centAmount
          currencyCode
          fractionDigits
        }
      }
      total {
        centAmount
        currencyCode
        fractionDigits
      }
    }
  }
`);

export const CART_CUSTOMER_DETAILS = gql(/* GraphQL */ `
  query CartCustomerDetails {
    customer {
      id
      customerGroups {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`);
