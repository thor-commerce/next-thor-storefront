import { gql } from "@/__generated__/thor";

export const CHECKOUT_CART_DETAILS_QUERY = gql(/* GraphQL */ `
  query CheckoutCartDetails($id: ID!) {
    cart(id: $id) {
      id
      ...AvailableShippingMethods
      paymentSession {
        __typename
        ... on StripePaymentSession {
          clientSecret
        }
        paymentGateway {
          ... on StripePaymentGateway {
            publishableKey
          }
        }
      }
      shippingLines {
        id
        shippingMethod {
          id
        }
        taxBehavior
        taxedPrice {
          net {
            centAmount
            currencyCode
            fractionDigits
          }
          gross {
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
      customerEmail
      shippingAddress {
        firstName
        lastName
        address1
        address2
        phone
        city
        countryCode
        postalCode
        state
      }
      lineItems(first: 100) {
        edges {
          node {
            id
            taxBehavior
            ...CheckoutSummaryCartLineItem
            discountApplications {
              edges {
                node {
                  discountedAmount {
                    centAmount
                    fractionDigits
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
      subtotal {
        centAmount
        currencyCode
        fractionDigits
      }
      taxedPrice {
        gross {
          centAmount
          currencyCode
          fractionDigits
        }
        net {
          centAmount
          currencyCode
          fractionDigits
        }
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

export const CHECKOUT_ORDER_DETAILS_QUERY = gql(/* GraphQL */ `
  query CheckoutOrderDetails($id: ID!) {
    order(id: $id) {
      id
      #   lineItems(first: 100) {
      #     edges {
      #       node {
      #         id
      #         ...CheckoutSummaryLineItem
      #       }
      #     }
      #   }
      subtotal {
        centAmount
        currencyCode
        fractionDigits
      }
      taxedPrice {
        gross {
          centAmount
          currencyCode
          fractionDigits
        }
        net {
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

export const CHECKOUT_PAYMENTGATEWAYS_QUERY = gql(/* GraphQL */ `
  query CheckoutPaymentGateways($cartId: ID!) {
    paymentGateways(cartId: $cartId) {
      edges {
        node {
          id
          name
          __typename
        }
      }
    }
  }
`);
