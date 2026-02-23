"use client";
import { CheckoutCartDetailsQuery } from "@/__generated__/thor/graphql";
import Spinner from "@/components/spinner/spinner";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import useCheckout from "../hooks/use-checkout";
import s from "./checkout-payment-processing.module.css";
import { placeOrder } from "../actions";

interface Props {
  cart?: CheckoutCartDetailsQuery["cart"];
  paymentIntentClientSecret: string;
}

export default function CheckoutPaymentProcessing({
  paymentIntentClientSecret,
  cart,
}: Props) {
  const { setErrorMessage, removePaymentProcessing } = useCheckout();

  if (!cart) {
    throw new Error("No cart found");
  }

  const paymentSession = cart?.paymentSession;

  if (!paymentSession) {
    throw new Error("No payment session found");
  }

  const publishableKey =
    paymentSession.paymentGateway.__typename === "StripePaymentGateway"
      ? paymentSession.paymentGateway.publishableKey
      : null;

  if (!publishableKey) {
    throw new Error("No publishable key found");
  }

  const onPaymentComplete = async () => {
    const stripe = await loadStripe(publishableKey);
    if (!stripe) {
      throw new Error("Stripe failed to load");
    }

    // Retry retrievePaymentIntent with exponential backoff
    const maxRetries = 4;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const { paymentIntent, error } = await stripe.retrievePaymentIntent(
          paymentIntentClientSecret,
        );

        if (error) {
          throw new Error(`PaymentIntent retrieval failed: ${error.message}`);
        }

        if (
          paymentIntent.status === "succeeded" ||
          paymentIntent.status === "requires_capture"
        ) {
          await placeOrder({ cartId: cart.id });
          return;
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        if (attempt < maxRetries - 1) {
          const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    setErrorMessage("Error processing payment");
    removePaymentProcessing();
  };

  useEffect(() => {
    void onPaymentComplete();
  }, []);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <Spinner size="medium" />
        <p>Processing payment...</p>
      </div>
    </div>
  );
}
