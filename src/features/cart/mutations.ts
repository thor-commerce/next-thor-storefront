import { gql } from "@/__generated__/thor";

export const CART_CREATE_MUTATION = gql(/* GraphQL */ `
  mutation CartCreate($input: CartCreateInput!) {
    cartCreate(input: $input) {
      cart {
        id
      }
      errors {
        __typename
        ... on UserError {
          message
        }
      }
    }
  }
`);

export const CART_UPDATE_MUTATION = gql(/* GraphQL */ `
  mutation CartUpdate($input: CartUpdateInput!) {
    cartUpdate(input: $input) {
      cart {
        id
      }
    }
  }
`);

export const CART_REPLICATE_MUTATION = gql(/* GraphQL */ `
  mutation CartReplicate($input: CartReplicateInput!) {
    cartReplicate(input: $input) {
      cart {
        id
      }
      errors {
        __typename
        ... on UserError {
          message
        }
      }
    }
  }
`);

export const CART_DISCOUNT_CODE_ADD_MUTATION = gql(/* GraphQL */ `
  mutation CartDiscountCodeAdd($input: CartDiscountCodeAddInput!) {
    cartDiscountCodeAdd(input: $input) {
      cart {
        id
      }
      errors {
        code: __typename
      }
    }
  }
`);

export const CART_DISCOUNT_CODE_REMOVE_MUTATION = gql(/* GraphQL */ `
  mutation CartDiscountCodeRemove($input: CartDiscountCodeRemoveInput!) {
    cartDiscountCodeRemove(input: $input) {
      cart {
        id
      }
    }
  }
`);

export const CART_LINE_ITEMS_UPDATE_MUTATION = gql(/* GraphQL */ `
  mutation CartLineItemsUpdate($input: CartLineItemsUpdateInput!) {
    cartLineItemsUpdate(input: $input) {
      cart {
        id
      }
    }
  }
`);

export const CART_LINE_ITEMS_REMOVE_MUTATION = gql(/* GraphQL */ `
  mutation CartLineItemsRemove($input: CartLineItemsRemoveInput!) {
    cartLineItemsRemove(input: $input) {
      cart {
        id
      }
    }
  }
`);
