"use client";
import { use, useEffect } from "react";
import s from "./payment-processing-screen.module.css";

import { CheckoutCartDetailsQuery } from "@/__generated__/thor/graphql";
import Spinner from "@/components/spinner/spinner";
import { QueryRef, useReadQuery } from "@apollo/client/react";
import { loadStripe } from "@stripe/stripe-js";
import { placeOrder } from "../actions";

interface Props {
  queryRef: QueryRef<CheckoutCartDetailsQuery>;
}

export default function PaymentProcessingScreen({ queryRef }: Props) {
  const { data } = useReadQuery(queryRef);

  if (!data.cart) {
    throw new Error("No cart found");
  }

  const paymentSession = data?.cart?.paymentSession;

  if (!paymentSession) {
    throw new Error("No payment session found");
  }

  const publishableKey = paymentSession.paymentGateway.publishableKey;
  const clientSecret = paymentSession.clientSecret;

  if (!publishableKey) {
    throw new Error("No publishable key found");
  }

  const onPaymentComplete = async () => {
    const stripe = await loadStripe(publishableKey);
    if (!stripe) {
      throw new Error("Stripe failed to load");
    }
    const { paymentIntent, error } = await stripe.retrievePaymentIntent(
      clientSecret
    );

    if (error) {
      throw new Error(`PaymentIntent retrieval failed: ${error.message}`);
    }

    //in the purpose of this demo, we will not handle payment statuses like processing, requires_action, etc.
    if (
      paymentIntent.status === "succeeded" ||
      paymentIntent.status === "requires_capture" 
    ) {
      await placeOrder({ cartId: data.cart!.id });
    }
  };

  useEffect(() => {
    void onPaymentComplete();
  }, []);

  return (
    <PaymentProcessingScreenSkeleton />
  );
}

export const PaymentProcessingScreenSkeleton = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Spinner size="medium" />
        <p>Processing payment...</p>
      </div>
    </div>
  );
}
