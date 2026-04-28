"use client";

import type { CheckoutCart } from "@/features/checkout/types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import type { PropsWithChildren } from "react";

type StripePromise = Promise<Stripe | null>;

const stripePromiseCache = new Map<string, StripePromise>();

interface StripeElementsProviderProps {
	cart: CheckoutCart;
}

export default function StripeElementsProvider({
	cart,
	children,
}: PropsWithChildren<StripeElementsProviderProps>) {
	const paymentSession = cart.paymentSession;
	const paymentGateway = paymentSession?.paymentGateway;

	if (!paymentSession?.clientSecret) {
		throw new Error("Stripe payment session is missing a client secret");
	}

	if (
		paymentGateway?.type !== "StripePaymentGateway" &&
		paymentGateway?.type !== "StripeConnectPaymentGateway"
	) {
		throw new Error("Stripe Elements requires a Stripe payment gateway");
	}

	const connectedAccountId =
		paymentGateway.type === "StripeConnectPaymentGateway" ? paymentGateway.connectedAccountId : undefined;
	const stripePromise = getStripePromise(paymentGateway.publishableKey, connectedAccountId);

	return (
		<Elements
			options={{
				appearance: { theme: "stripe" },
				clientSecret: paymentSession.clientSecret,
				loader: "always",
			}}
			key={paymentSession.clientSecret}
			stripe={stripePromise}
		>
			{children}
		</Elements>
	);
}

function getStripePromise(publishableKey: string, connectedAccountId?: string | null) {
	const cacheKey = `${publishableKey}:${connectedAccountId ?? ""}`;
	const cached = stripePromiseCache.get(cacheKey);

	if (cached) {
		return cached;
	}

	const stripePromise = loadStripe(
		publishableKey,
		connectedAccountId
			? {
					stripeAccount: connectedAccountId,
				}
			: undefined,
	);

	stripePromiseCache.set(cacheKey, stripePromise);
	return stripePromise;
}
