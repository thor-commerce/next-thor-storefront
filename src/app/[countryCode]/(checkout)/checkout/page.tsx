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
    checkout_id,
  }: {
    processing_payment?: string;
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
    return <PaymentProcessingScreen cartId={checkout_id} />;
  }

  return (
    <CheckoutContainer
      mainArea={
        <Suspense fallback={<SkeletonBox width={200} height={200} />}>
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
              {(queryRef) => <CheckoutMain queryRef={queryRef} />}
            </PreloadQuery>
          </PaymentWrapper>
        </Suspense>
      }
      summaryArea={
        <Suspense fallback={<CheckoutSummarySkeleton />}>
          <PreloadQuery
            query={CHECKOUT_CART_DETAILS_QUERY}
            variables={{ id: checkout_id }}
            context={{
              fetchOptions: {
                tags: [CACHE_TAGS.cart],
              },
            }}
          >
            {(queryRef) => <CheckoutSummary queryRef={queryRef} />}
          </PreloadQuery>
        </Suspense>
      }
    />
  );
}
