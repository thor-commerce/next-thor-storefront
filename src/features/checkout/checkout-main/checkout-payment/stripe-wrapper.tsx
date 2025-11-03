import { gql } from "@/__generated__/thor";
import { StripeWrapperFragment } from "@/__generated__/thor/graphql";
import { FragmentType } from "@apollo/client";
import { useFragment } from "@apollo/client/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PropsWithChildren } from "react";

const STRIPE_WRAPPER_FRAGMENT = gql(/* GraphQL */ `
  fragment StripeWrapper on Cart {
    id
    paymentSession {
      ... on StripePaymentSession {
        clientSecret
      }
      paymentGateway {
        ... on StripePaymentGateway {
          publishableKey
        }
      }
    }
  }
`);
export default function StripeWrapper({
  cartFragment,
  children
}: PropsWithChildren<{
  cartFragment: FragmentType<StripeWrapperFragment>;
}>) {
  const { data } = useFragment({
    fragment: STRIPE_WRAPPER_FRAGMENT,
    fragmentName: "StripeWrapper",
    from: cartFragment,
  });

  const publishableKey = data.paymentSession?.paymentGateway?.publishableKey;

  if (!publishableKey) {
    throw new Error("Stripe publishable key is missing");
  }

  const stripePromise = loadStripe(publishableKey);
  return (
    <Elements
      options={{
        clientSecret: data.paymentSession?.clientSecret,
        loader: "always",
        appearance: { theme: "stripe" },
      }}
      stripe={stripePromise}
    >
      {children}
    </Elements>
  );
}
