import { SkeletonBox } from "@/components/skeleton-box/skeleton-box";
import { CACHE_TAGS } from "@/constants";
import { getCartIdFromCookies } from "@/features/cart/utils";
import CheckoutContainer from "@/features/checkout/checkout-container/checkout-container";
import CheckoutMain from "@/features/checkout/checkout-main/checkout-main";
import PaymentWrapper from "@/features/checkout/checkout-main/checkout-payment/payment-wrapper";
import CheckoutSummary, {
  CheckoutSummarySkeleton,
} from "@/features/checkout/checkout-summary/checkout-summary";
import PaymentProcessingScreen from "@/features/checkout/payment-processing-screen/payment-processing-screen";
import { CHECKOUT_CART_DETAILS_QUERY } from "@/features/checkout/queries";
import { PreloadQuery } from "@/lib/thor/apollo-client";
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
  }: {
    processing_payment?: string;
    redirect_status?: "failed" | "success" | string[];
  } = await searchParams;

  const cartId = await getCartIdFromCookies();

  //if redirect_status is failed, redirect back to checkout page, at payment step:
  if (redirect_status === "failed" || Array.isArray(redirect_status)) {
    redirect(`/${country}/checkout`);
  }
  if (processing_payment === "true") {
    return <PaymentProcessingScreen cartId={cartId} />;
  }

  return (
    <PreloadQuery
      query={CHECKOUT_CART_DETAILS_QUERY}
      variables={{ id: cartId }}
      context={{
        fetchOptions: {
          tags: [CACHE_TAGS.cart],
        },
      }}
    >
      {(queryRef) => (
        <CheckoutContainer
          mainArea={
            <Suspense fallback={<SkeletonBox width={200} height={200} />}>
              <PaymentWrapper queryRef={queryRef}>
                <CheckoutMain queryRef={queryRef} />
              </PaymentWrapper>
            </Suspense>
          }
          summaryArea={
            <Suspense fallback={<CheckoutSummarySkeleton />}>
              <CheckoutSummary queryRef={queryRef} />
            </Suspense>
          }
        />
      )}
    </PreloadQuery>
  );
}
