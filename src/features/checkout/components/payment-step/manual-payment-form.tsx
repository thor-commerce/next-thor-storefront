"use client";

import Button from "@/components/button/button";
import { completeCartAction } from "@/features/checkout/actions";
import type { CheckoutCart, PaymentGateway } from "@/features/checkout/types";
import { Landmark } from "lucide-react";
import { useState, useTransition } from "react";
import s from "./checkout-payment-step.module.css";

interface ManualPaymentFormProps {
	cart: CheckoutCart;
	countryCode: string;
	paymentGateway: Extract<PaymentGateway, { type: "ManualPaymentGateway" }>;
}

export default function ManualPaymentForm({ cart, countryCode, paymentGateway }: ManualPaymentFormProps) {
	const [error, setError] = useState<string>();
	const [isPending, startTransition] = useTransition();

	const handleSubmit = () => {
		setError(undefined);
		startTransition(async () => {
			const result = await completeCartAction(undefined, {
				cartId: cart.id,
				countryCode,
			});

			if (result?.error) {
				setError(result.error);
			}
		});
	};

	return (
		<div className={s.form}>
			<div className={s.manualPayment}>
				<Landmark aria-hidden size={22} />
				<p>
					{paymentGateway.name} is selected. After the order has been created, an invoice will be
					generated and sent to you.
				</p>
			</div>

			{error && <p className={s.error}>{error}</p>}

			<Button disabled={isPending} loading={isPending} onClick={handleSubmit} type="button">
				Complete order
			</Button>
		</div>
	);
}
