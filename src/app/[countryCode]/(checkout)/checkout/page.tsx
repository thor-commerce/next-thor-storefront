import { SkeletonBox } from "@/components/skeleton-box/skeleton-box";
import { CACHE_TAGS } from "@/constants";
import Stripe from "stripe";

import { getCartIdFromCookies } from "@/features/cart/utils";
import CheckoutContainer from "@/features/checkout/checkout-container/checkout-container";
import CheckoutMain, {
  CheckoutMainSkeleton,
} from "@/features/checkout/checkout-main/checkout-main";
import PaymentWrapper from "@/features/checkout/checkout-main/checkout-payment/payment-wrapper";
import CheckoutSummary, {
  CheckoutSummarySkeleton,
} from "@/features/checkout/checkout-summary/checkout-summary";
import PaymentProcessingScreen, { PaymentProcessingScreenSkeleton } from "@/features/checkout/payment-processing-screen/payment-processing-screen";
import { CHECKOUT_CART_DETAILS_QUERY } from "@/features/checkout/queries";
import { getClient, PreloadQuery } from "@/lib/thor/apollo-client";
import { loadStripe } from "@stripe/stripe-js";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function CheckoutPage({
  params,
  searchParams,
}: PageProps<"/[countryCode]/checkout">) {
  const { countryCode: country } = await params;
  const {
    processing_payment,
    redirect_status,
    checkout_id,
    payment_intent_client_secret,
  }: {
    processing_payment?: string;
    payment_intent?: string;
    payment_intent_client_secret?: string;
    redirect_status?: "failed" | "success" | string[];
    checkout_id?: string;
  } = await searchParams;

  if (!checkout_id) {
    redirect(`/${country}/cart`);
  }

  //if redirect_status is failed, redirect back to checkout page, at payment step:
  if (redirect_status === "failed" || Array.isArray(redirect_status)) {
    redirect(`/${country}/checkout?checkout_id=${checkout_id}`);
  }

  if (processing_payment === "true") {
    const tt = await getClient().query({
      query: CHECKOUT_CART_DETAILS_QUERY,
      variables: { id: checkout_id },
      context: {
        fetchOptions: {
          tags: [CACHE_TAGS.cart],
        },
      },
    });
    const publishableKey =
      tt.data?.cart?.paymentSession?.paymentGateway.publishableKey;
    if (!publishableKey || !payment_intent_client_secret) {
      return <div> no publishableKey or payment_intent_client_secret </div>;
    }

    return (
      <PreloadQuery
        query={CHECKOUT_CART_DETAILS_QUERY}
        variables={{ id: checkout_id }}
        context={{
          fetchOptions: {
            tags: [CACHE_TAGS.cart],
          },
        }}
      >
        {(queryRef) => (
          <Suspense fallback={<PaymentProcessingScreenSkeleton />}>
            <PaymentProcessingScreen queryRef={queryRef} />
          </Suspense>
        )}
      </PreloadQuery>
    );
  }

  return (
    <Suspense
      fallback={
        <CheckoutContainer
          mainArea={<CheckoutMainSkeleton />}
          summaryArea={<CheckoutSummarySkeleton />}
        />
      }
    >
      <PaymentWrapper>
        <PreloadQuery
          query={CHECKOUT_CART_DETAILS_QUERY}
          variables={{ id: checkout_id }}
          context={{
            fetchOptions: {
              tags: [CACHE_TAGS.cart],
            },
          }}
        >
          {(queryRef) => (
            <CheckoutContainer
              mainArea={<CheckoutMain queryRef={queryRef} />}
              summaryArea={<CheckoutSummary queryRef={queryRef} />}
            />
          )}
        </PreloadQuery>
      </PaymentWrapper>
    </Suspense>
  );
}
