"use client";

import Spinner from "@/components/spinner/spinner";
import { completeCartAction } from "@/features/checkout/actions";
import type { CheckoutCart } from "@/features/checkout/types";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import s from "./checkout-payment-step.module.css";

interface CheckoutPaymentProcessingProps {
	cart: CheckoutCart;
	countryCode: string;
	paymentIntentClientSecret: string;
}

export default function CheckoutPaymentProcessing({
	cart,
	countryCode,
	paymentIntentClientSecret,
}: CheckoutPaymentProcessingProps) {
	const [error, setError] = useState<string>();

	useEffect(() => {
		let isMounted = true;

		async function processPayment() {
			const paymentGateway = cart.paymentSession?.paymentGateway;

			if (
				!paymentGateway ||
				(paymentGateway.type !== "StripePaymentGateway" &&
					paymentGateway.type !== "StripeConnectPaymentGateway")
			) {
				setError("Payment gateway is not supported for Stripe processing");
				return;
			}

			const stripe = await loadStripe(
				paymentGateway.publishableKey,
				paymentGateway.type === "StripeConnectPaymentGateway" && paymentGateway.connectedAccountId
					? {
							stripeAccount: paymentGateway.connectedAccountId,
						}
					: undefined,
			);

			if (!stripe) {
				setError("Stripe could not be loaded");
				return;
			}

			const { error: retrieveError, paymentIntent } =
				await stripe.retrievePaymentIntent(paymentIntentClientSecret);

			if (!isMounted) {
				return;
			}

			if (retrieveError) {
				setError(retrieveError.message ?? "Payment status could not be checked");
				return;
			}

			if (paymentIntent?.status !== "succeeded" && paymentIntent?.status !== "requires_capture") {
				setError("Payment was not completed");
				return;
			}

			const result = await completeCartAction(undefined, {
				cartId: cart.id,
				countryCode,
			});

			if (!isMounted) {
				return;
			}

			setError(result?.error ?? "Order could not be completed");
		}

		void processPayment();

		return () => {
			isMounted = false;
		};
	}, [cart, countryCode, paymentIntentClientSecret]);

	return (
		<section className={s.root}>
			<div className={s.processing}>
				{error ? null : <Spinner size="medium" />}
				<h1 className={s.title}>{error ? "Payment issue" : "Payment"}</h1>
				<p className={error ? s.error : s.copy}>{error ?? "Processing payment..."}</p>
			</div>
		</section>
	);
}
