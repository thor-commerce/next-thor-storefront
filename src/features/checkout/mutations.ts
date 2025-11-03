import { gql } from "@/__generated__/thor";

export const CHECKOUT_CART_UPDATE_MUTATION = gql(/* GraphQL */ `
  mutation CheckoutCartUpdate($input: CartUpdateInput!) {
    cartUpdate(input: $input) {
      cart {
        id
      }
      errors {
        code: __typename
        ... on UserError {
          message
        }
      }
    }
  }
`);

export const CHECKOUT_CART_SHIPPING_LINE_SET_MUTATION = gql(/* GraphQL */ `
  mutation CheckoutCartShippingLinesSet($input: CartShippingLinesSetInput!) {
    cartShippingLinesSet(input: $input) {
      cart {
        id
        shippingLines {
          id
          shippingMethod {
            id
            name
          }
        }
      }
    }
  }
`);


export const CART_PAYMENT_SESSION_INTIALIZE_MUTATION = gql(/* GraphQL */ `
  mutation CartPaymentSessionInitialize(
    $input: CartPaymentSessionInitializeInput!
  ) {
    cartPaymentSessionInitialize(input: $input) {
      cart {
        id
        paymentSession {
          paymentGateway {
            ... on StripePaymentGateway {
              publishableKey
            }
          }
          ... on StripePaymentSession {
            clientSecret
          }
        }
      }
      errors {
        code: __typename
      }
    }
  }
`);

export const CART_COMPLETE_MUTATION = gql(/* GraphQL */ `
  mutation CartComplete($input: CartCompleteInput!) {
    cartComplete(input: $input) {
      order {
        id
      }
      errors {
        code: __typename
      }
    }
  }
`);
