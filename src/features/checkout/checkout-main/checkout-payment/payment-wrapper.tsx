import { PropsWithChildren } from "react";
import StripeWrapper from "./stripe-wrapper";
import { getCartIdFromCookies } from "@/features/cart/utils";
import { getClient } from "@/lib/thor/apollo-client";
import {
  CHECKOUT_CART_DETAILS_QUERY,
  CHECKOUT_PAYMENTGATEWAYS_QUERY,
} from "../../queries";
import { CART_PAYMENT_SESSION_INTIALIZE_MUTATION } from "../../mutations";
import { mapEdgesToItems } from "@/utils/maps";
import { CACHE_TAGS } from "@/constants";

export default async function PaymentWrapper({ children }: PropsWithChildren) {
  const cartId = await getCartIdFromCookies();
  const { data } = await getClient().query({
    query: CHECKOUT_CART_DETAILS_QUERY,
    variables: { id: cartId },
  });
  const cart = data?.cart;

  let publishableKey: string | null =
    cart?.paymentSession?.paymentGateway.publishableKey || null;
  let clientSecret: string | null = cart?.paymentSession?.clientSecret || null;
  // Show loading state while payment session doesn't exist
  if (cart?.paymentSession == null) {
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
      context: {
        fetchOptions: {
          tags: [CACHE_TAGS.cart],
        },
      },
    });
    publishableKey =
      res.data?.cartPaymentSessionInitialize.cart?.paymentSession
        ?.paymentGateway.publishableKey || null;
    clientSecret =
      res.data?.cartPaymentSessionInitialize?.cart?.paymentSession
        ?.clientSecret || null;
  }

  // Payment session should exist at this point
  if (publishableKey && clientSecret) {
    return (
      <StripeWrapper
        publishableKey={publishableKey}
        clientSecret={clientSecret}
      >
        {children}
      </StripeWrapper>
    );
  }

  // This shouldn't happen, but fallback just in case
  throw new Error("Payment session not available");
}
