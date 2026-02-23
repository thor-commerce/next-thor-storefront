import { SkeletonBox } from "@/components/skeleton-box/skeleton-box";
import { CACHE_TAGS } from "@/constants";
import Stripe from "stripe";

import { getCartIdFromCookies } from "@/features/cart/utils";
import CheckoutContainer from "@/features/checkout/checkout-container/checkout-container";
import CheckoutMain, {
  CheckoutMainSkeleton,
} from "@/features/checkout/checkout-main/checkout-main";
import CheckoutSummary, {
  CheckoutSummarySkeleton,
} from "@/features/checkout/checkout-summary/checkout-summary";

import {
  CHECKOUT_CART_DETAILS_QUERY,
  CHECKOUT_PAYMENTGATEWAYS_QUERY,
} from "@/features/checkout/queries";
import { getClient, PreloadQuery } from "@/lib/thor/apollo-client";
import { loadStripe } from "@stripe/stripe-js";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CheckoutContextProvider from "@/features/checkout/context";
import { CartState } from "@/__generated__/thor/graphql";
import { mapEdgesToItems } from "@/utils/maps";
import { CheckoutStepEnum } from "@/features/checkout/types";
import { CART_PAYMENT_SESSION_INTIALIZE_MUTATION } from "@/features/checkout/mutations";
import CheckoutPaymentProcessing from "@/features/checkout/checkout-payment-processing/checkout-payment-processing";

export default async function CheckoutPage({
  params,
  searchParams,
}: PageProps<"/[countryCode]/checkout">) {
  const { countryCode: country } = await params;
  const {
    processing_payment,
    redirect_status,
    checkout_id,
    step,
    payment_intent_client_secret,
  }: {
    processing_payment?: string;
    payment_intent?: string;
    payment_intent_client_secret?: string;
    redirect_status?: "failed" | "success" | string[];
    step?: CheckoutStepEnum;
    checkout_id?: string;
  } = await searchParams;

  if (!checkout_id) {
    redirect(`/${country}/cart`);
  }

  //if redirect_status is failed, redirect back to checkout page, at payment step:
  if (redirect_status === "failed" || Array.isArray(redirect_status)) {
    redirect(`/${country}/checkout?checkout_id=${checkout_id}`);
  }

  const client = getClient();

  const { data } = await client.query({
    query: CHECKOUT_CART_DETAILS_QUERY,
    variables: { id: checkout_id },
    context: {
      fetchOptions: {
        tags: [CACHE_TAGS.cart],
      },
    },
  });

  const cart = data?.cart;

  if (!cart) {
    redirect(`/${country}/cart`);
  }
  let stripePublishableKey: string | null = null;

  if (!processing_payment) {
    if (cart.state === CartState.Ordered) redirect(`/${country}`);

    //if the cart does not have a payment session we create one
    if (!cart.paymentSession) {
      const paymentGatewayResult = await client.query({
        query: CHECKOUT_PAYMENTGATEWAYS_QUERY,
        variables: {
          cartId: checkout_id,
        },
      });

      const gateways = mapEdgesToItems(
        paymentGatewayResult.data?.paymentGateways,
      );

      //for the purpose of this demo, we will assume that there is only one payment gateway and that it is Stripe
      const stripeGateway = gateways?.find(
        (gateway) => gateway.__typename === "StripePaymentGateway",
      );

      if (!stripeGateway) {
        throw new Error("No Stripe payment gateway found");
      }

      stripePublishableKey = stripeGateway.publishableKey;

      if (step == CheckoutStepEnum.Payment) {
        //if we're on the payment step, we will initialize a payment session on the gateway.
        await client.mutate({
          mutation: CART_PAYMENT_SESSION_INTIALIZE_MUTATION,
          variables: {
            input: {
              cartId: checkout_id,
              gatewayId: stripeGateway.id,
            },
          },
        });
      }
    }
    //if the cart has a payment session, we will use the publishable key from the gateway to initialize the checkout context
    else if (
      cart.paymentSession.paymentGateway.__typename === "StripePaymentGateway"
    ) {
      stripePublishableKey = cart.paymentSession.paymentGateway.publishableKey;
    } else {
      throw new Error("Cart has a payment session, but it's not Stripe");
    }
  }

  //validate that the cart is correct according to the step,
  //ect... the shipping address should be filled out before going to shipping step
  switch (step) {
    case CheckoutStepEnum.Customer:
      break;
    case CheckoutStepEnum.Delivery:
      if (!cart.shippingAddress) {
        redirect(
          `/${country}/checkout?step=${CheckoutStepEnum.Customer}&checkout_id=${checkout_id}`,
        );
      }
      break;
    case CheckoutStepEnum.Payment:
      if (!cart.shippingAddress) {
        redirect(
          `/${country}/checkout?step=${CheckoutStepEnum.Customer}&checkout_id=${checkout_id}`,
        );
      }
      if (cart.shippingLines.length === 0) {
        redirect(
          `/${country}/checkout?step=${CheckoutStepEnum.Delivery}&checkout_id=${checkout_id}`,
        );
      }
      break;
    default:
      redirect(
        `/${country}/checkout?step=${CheckoutStepEnum.Customer}&checkout_id=${checkout_id}`,
      );
  }

  if (processing_payment && payment_intent_client_secret) {
    return (
      <CheckoutPaymentProcessing
        cart={cart}
        paymentIntentClientSecret={payment_intent_client_secret}
      />
    );
  }

  //if there is not a publishable key at this point, it means that there is a problem with the cart or the payment session, so we throw an error
  if (!stripePublishableKey) {
    throw new Error("No publishable key found for cart");
  }

  return (
    <CheckoutContextProvider publishableKey={stripePublishableKey}>
      <Suspense
        fallback={
          <CheckoutContainer
            mainArea={<CheckoutMainSkeleton />}
            summaryArea={<CheckoutSummarySkeleton />}
          />
        }
      >
        {/* <CheckoutContainer
          mainArea={
            <CheckoutMain
              cartId={checkout_id}
              step={step ?? CheckoutStepEnum.Customer}
            />
          }
          summaryArea={
            <Suspense>
              <CheckoutSummary cart={cart} />
            </Suspense>
          }
        /> */}
      </Suspense>
    </CheckoutContextProvider>
  );
}
