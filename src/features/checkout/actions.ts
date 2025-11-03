"use server";

import {
  CartCompleteMutation,
  CartCompleteMutationVariables,
  CartUpdateInput,
  CartUpdateMutation,
  CartUpdateMutationVariables,
  CheckoutCartShippingLinesSetMutation,
  CheckoutCartShippingLinesSetMutationVariables,
} from "@/__generated__/thor/graphql";
import { CACHE_TAGS } from "@/constants";
import { getClient } from "@/lib/thor/apollo-client";
import { mapEdgesToItems } from "@/utils/maps";
import { updateTag } from "next/cache";
import { CART_UPDATE_MUTATION } from "../cart/mutations";
import { getCartIdFromCookies, removeCartCookie } from "../cart/utils";
import {
  CART_COMPLETE_MUTATION,
  CART_PAYMENT_SESSION_INTIALIZE_MUTATION,
  CHECKOUT_CART_SHIPPING_LINE_SET_MUTATION,
} from "./mutations";
import { CHECKOUT_PAYMENTGATEWAYS_QUERY } from "./queries";
import { getServerContext } from "@/utils/server";
import { redirect, RedirectType } from "next/navigation";

export async function cartUpdateAction(input: Omit<CartUpdateInput, "cartId">) {
  const cartId = await getCartIdFromCookies();
  const resp = await getClient().mutate<
    CartUpdateMutation,
    CartUpdateMutationVariables
  >({
    mutation: CART_UPDATE_MUTATION,
    variables: {
      input: {
        cartId,
        ...input,
      },
    },
  });

  updateTag(CACHE_TAGS.cart);

  return resp.data?.cartUpdate;
}

export async function cartSetShippingMethodAction(shippingMethodId: string) {
  const cartId = await getCartIdFromCookies();
  const res = await getClient().mutate<
    CheckoutCartShippingLinesSetMutation,
    CheckoutCartShippingLinesSetMutationVariables
  >({
    mutation: CHECKOUT_CART_SHIPPING_LINE_SET_MUTATION,
    variables: {
      input: {
        cartId,
        shippingMethodIds: [shippingMethodId],
      },
    },
  });

  updateTag(CACHE_TAGS.cart);
  return res.data?.cartShippingLinesSet;
}

export async function intializePaymentSession() {
  const cartId = await getCartIdFromCookies();

  const paymentGatewaysRes = await getClient().query({
    query: CHECKOUT_PAYMENTGATEWAYS_QUERY,
    variables: {
      cartId,
    },
  });

  const stripePaymentGateways = mapEdgesToItems(
    paymentGatewaysRes.data?.paymentGateways
  ).find((gateway) => gateway.__typename === "StripePaymentGateway");

  /**
   * for the purpose of this example, we assume stripe is always available and just pick the first one
   * in a real world app, you would want to handle test gateways or possible multiple types of gateways depending on channels.
   */

  const gatewayId = stripePaymentGateways?.id;

  if (!gatewayId) {
    throw new Error("No Stripe payment gateway available for this cart");
  }

  const res = await getClient().mutate({
    mutation: CART_PAYMENT_SESSION_INTIALIZE_MUTATION,
    variables: {
      input: {
        cartId,
        gatewayId: gatewayId,
      },
    },
  });
  updateTag(CACHE_TAGS.cart);

  return res.data?.cartPaymentSessionInitialize;
}

export async function placeOrder({ cartId }: { cartId: string }) {
  if (!cartId) throw new Error("No cartId provided");
  const context = await getServerContext();

  const res = await getClient().mutate<
    CartCompleteMutation,
    CartCompleteMutationVariables
  >({
    mutation: CART_COMPLETE_MUTATION,
    variables: { input: { cartId } },
  });

  let attempts = 0;
  const maxAttempts = 5;
  let orderId: string | null = null;
  while (attempts < maxAttempts) {
    try {
      if (res?.error) throw new Error("Failed to complete checkout");
      if (res.data?.cartComplete.order) {
        orderId = res.data.cartComplete.order.id;
        break;
      }
    } catch (error) {
      attempts++;
      if (attempts >= maxAttempts) throw error;
      await delay(1000 * attempts);
    }
  }

  if (orderId) {
    await removeCartCookie();
    console.log("Redirecting to order confirmation page");

    redirect(`/${context.country.code}/orders/${orderId}`);
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
