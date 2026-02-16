"use server";

import { gql } from "@/__generated__/thor";
import { CACHE_TAGS } from "@/constants";
import { revalidateTag } from "next/cache";
import invariant from "tiny-invariant";
import {
  findOrCreateCart,
  getCartIdFromCookies,
  saveCartIdToCookie,
} from "../cart/utils";
import { getServerContext } from "@/utils/server";
import { getClient } from "@/lib/thor/apollo-client";
import {
  CartLineItemsAddMutation,
  CartLineItemsAddMutationVariables,
} from "@/__generated__/thor/graphql";

const CART_ADD_ITEMS_MUTATION = gql(/* GraphQL */ `
  mutation CartLineItemsAdd($input: CartLineItemsAddInput!) {
    cartLineItemsAdd(input: $input) {
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

export async function addItem(prevState: unknown, data: FormData) {
  invariant(data, "Submitted form without data");

  const selectedVariantID = data.get("variantId")?.toString();

  //can i acccess the url from inside here?

  const cartId = await getCartIdFromCookies();
  const { storeId, country } = await getServerContext();

  const cart = await findOrCreateCart({
    cartId,
    storeId,
    country: country.code.toUpperCase(),
  });

  invariant(cart, "Cart not found or created");

  saveCartIdToCookie(cart.id);

  if (!selectedVariantID) {
    return {
      success: false,
      message: "No variant selected",
    };
  }
  const cartLineItemsAddResponse = await getClient().mutate<
    CartLineItemsAddMutation,
    CartLineItemsAddMutationVariables
  >({
    mutation: CART_ADD_ITEMS_MUTATION,
    variables: {
      input: {
        cartId: cart.id,
        lineItems: [
          {
            variantId: selectedVariantID,
            quantity: 1, // Default to adding one item
          },
        ],
      },
    },
  });

  if (!cartLineItemsAddResponse.data?.cartLineItemsAdd) {
    return {
      success: false,
    };
  }

  const addErrors = cartLineItemsAddResponse.data.cartLineItemsAdd.errors;
  if (addErrors && addErrors.length > 0) {
    const errorMessage = addErrors
      .map((error) =>
        "message" in error && error.message
          ? `${error.__typename}: ${error.message}`
          : error.__typename
      )
      .join(", ");
    throw new Error(errorMessage);
  }

  revalidateTag(CACHE_TAGS.cart);

  return {
    success: true,
    quantity: 1,
  };
}
