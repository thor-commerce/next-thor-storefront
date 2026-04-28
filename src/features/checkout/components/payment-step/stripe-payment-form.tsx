"use client";

import Button from "@/components/button/button";
import type { CheckoutCart } from "@/features/checkout/types";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import s from "./checkout-payment-step.module.css";

interface StripePaymentFormProps {
	cart: CheckoutCart;
}

export default function StripePaymentForm({ cart }: StripePaymentFormProps) {
	const elements = useElements();
	const stripe = useStripe();
	const [error, setError] = useState<string>();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setError(undefined);
		setIsSubmitting(true);

		const { error: submitError } = await elements.submit();

		if (submitError) {
			setError(submitError.message ?? "Payment details could not be submitted");
			setIsSubmitting(false);
			return;
		}

		if (!cart.paymentSession?.clientSecret) {
			setError("Payment session is missing");
			setIsSubmitting(false);
			return;
		}

		const returnUrl = buildReturnUrl();
		const billingAddress = cart.billingAddress ?? cart.shippingAddress;
		const billingName = [billingAddress?.firstName, billingAddress?.lastName].filter(Boolean).join(" ");
		const result = await stripe.confirmPayment({
			clientSecret: cart.paymentSession.clientSecret,
			elements,
			confirmParams: {
				payment_method_data: {
					billing_details: {
						address: {
							city: billingAddress?.city ?? "",
							country: billingAddress?.countryCode ?? "",
							line1: billingAddress?.address1 ?? "",
							line2: billingAddress?.address2 ?? "",
							postal_code: billingAddress?.postalCode ?? "",
							state: billingAddress?.state ?? "",
						},
						email: cart.customerEmail ?? "",
						name: billingName,
						phone: billingAddress?.phone ?? "",
					},
				},
				return_url: returnUrl,
			},
		});

		if (result.error) {
			setError(result.error.message ?? "Payment could not be confirmed");
			setIsSubmitting(false);
		}
	};

	return (
		<form className={s.form} onSubmit={handleSubmit}>
			<PaymentElement
				options={{
					fields: {
						billingDetails: "never",
					},
					layout: {
						defaultCollapsed: false,
						// radios: true,
						spacedAccordionItems: false,
						type: "accordion",
					},
					wallets: {
						applePay: "auto",
						googlePay: "auto",
						link: "auto",
					},
				}}
			/>

			{error && <p className={s.error}>{error}</p>}

			<Button disabled={!stripe || !elements || isSubmitting} loading={isSubmitting} type="submit">
				Pay now
			</Button>
		</form>
	);
}

function buildReturnUrl() {
	const url = new URL(window.location.href);
	url.searchParams.set("processing_payment", "true");
	return url.toString();
}
