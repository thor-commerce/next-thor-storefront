"use client";
import useCheckout from "@/features/checkout/hooks/use-checkout";
import { CheckoutCart } from "@/features/checkout/types";
import { Elements } from "@stripe/react-stripe-js";
import { PropsWithChildren } from "react";

interface Props {
  cart: CheckoutCart;
}
export default function StripeWrapper({
  cart,
  children,
}: PropsWithChildren<Props>) {
  const { stripePromise } = useCheckout();

  if (!stripePromise) {
    throw new Error("No Stripe instance available");
  }

  return (
    <Elements
      options={{
        clientSecret: cart.paymentSession?.clientSecret,
        loader: "always",
        appearance: { theme: "stripe" },
      }}
      stripe={stripePromise}
    >
      {children}
    </Elements>
  );
}
