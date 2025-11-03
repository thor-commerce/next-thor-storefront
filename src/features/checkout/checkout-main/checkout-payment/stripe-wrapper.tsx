"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PropsWithChildren } from "react";

export default function StripeWrapper({
  publishableKey,
  clientSecret,
  children,
}: PropsWithChildren<{
  publishableKey: string;
  clientSecret: string;
}>) {
  if (!publishableKey) {
    throw new Error("Stripe publishable key is missing");
  }

  const stripePromise = loadStripe(publishableKey);

  return (
    <Elements
      options={{
        clientSecret: clientSecret,
        loader: "always",
        appearance: { theme: "stripe" },
      }}
      stripe={stripePromise}
    >
      {children}
    </Elements>
  );
}
