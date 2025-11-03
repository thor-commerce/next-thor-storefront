"use client";
import { CheckoutCartDetailsQuery } from "@/__generated__/thor/graphql";
import {
  QueryRef,
  useQueryRefHandlers,
  useReadQuery,
} from "@apollo/client/react";
import { PropsWithChildren, useEffect, useRef } from "react";
import StripeWrapper from "./stripe-wrapper";
import { intializePaymentSession } from "../../actions";

export default function PaymentWrapper({
  children,
  queryRef,
}: PropsWithChildren<{ queryRef: QueryRef<CheckoutCartDetailsQuery> }>) {
  const { data } = useReadQuery(queryRef);
  const { refetch } = useQueryRefHandlers(queryRef);
  const initStartedRef = useRef(false);

  useEffect(() => {
    if (data.cart?.paymentSession == null && !initStartedRef.current) {
      initStartedRef.current = true;
      // Initialize payment session, then refetch to get updated data
      intializePaymentSession();
    }
  }, [data.cart?.paymentSession, refetch]);

  // Show loading state while payment session doesn't exist
  if (data.cart?.paymentSession == null) {
    return null;
  }

  // Payment session should exist at this point
  if (data.cart.paymentSession.__typename === "StripePaymentSession") {
    return <StripeWrapper cartFragment={data.cart}>{children}</StripeWrapper>;
  }

  // This shouldn't happen, but fallback just in case
  throw new Error("Payment session not available");
}
