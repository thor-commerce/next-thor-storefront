"use client";

import Button from "@/components/button/button";
import { selectPaymentGatewayAction } from "@/features/checkout/actions";
import { CheckoutStepEnum, type PaymentGateway } from "@/features/checkout/types";
import { CreditCard, Landmark } from "lucide-react";
import { useState, useTransition } from "react";
import s from "./payment-provider.module.css";

interface PaymentGatewaySelectorProps {
	cartId: string;
	countryCode: string;
	gateways: PaymentGateway[];
	selectedGatewayId?: string;
}

function getGatewayLabel(gateway: PaymentGateway) {
	if (gateway.type === "StripePaymentGateway" || gateway.type === "StripeConnectPaymentGateway") {
		return "Card, wallets, and local payment methods";
	}

	if (gateway.type === "ManualPaymentGateway") {
		return "Manual payment instructions after order placement";
	}

	return "Payment gateway";
}

function GatewayIcon({ gateway }: { gateway: PaymentGateway }) {
	if (gateway.type === "ManualPaymentGateway") {
		return <Landmark aria-hidden size={20} />;
	}

	return <CreditCard aria-hidden size={20} />;
}

export default function PaymentGatewaySelector({
	cartId,
	countryCode,
	gateways,
	selectedGatewayId,
}: PaymentGatewaySelectorProps) {
	const [gatewayId, setGatewayId] = useState(selectedGatewayId ?? gateways[0]?.id ?? "");
	const [error, setError] = useState<string>();
	const [isPending, startTransition] = useTransition();

	const handleSubmit = () => {
		if (!gatewayId) {
			setError("Select a payment method");
			return;
		}

		startTransition(async () => {
			const result = await selectPaymentGatewayAction(undefined, {
				cartId,
				countryCode,
				gatewayId,
				nextStep: CheckoutStepEnum.Customer,
			});

			setError(result);
		});
	};

	if (gateways.length === 0) {
		return (
			<section className={s.root}>
				<h1 className={s.title}>Payment method</h1>
				<p className={s.empty}>No payment methods are available for this cart.</p>
			</section>
		);
	}

	return (
		<section className={s.root}>
			<div className={s.header}>
				<h1 className={s.title}>Payment method</h1>
				<p className={s.copy}>Choose how this order should be paid. The payment session is created later.</p>
			</div>

			<div className={s.gatewayList}>
				{gateways.map((gateway) => (
					<label className={s.gatewayOption} data-selected={gateway.id === gatewayId} key={gateway.id}>
						<input
							checked={gateway.id === gatewayId}
							className={s.gatewayInput}
							name="paymentGateway"
							onChange={() => setGatewayId(gateway.id)}
							type="radio"
							value={gateway.id}
						/>
						<span className={s.gatewayIcon}>
							<GatewayIcon gateway={gateway} />
						</span>
						<span className={s.gatewayText}>
							<span className={s.gatewayName}>{gateway.name}</span>
							<span className={s.gatewayDescription}>{getGatewayLabel(gateway)}</span>
						</span>
					</label>
				))}
			</div>

			{error && <p className={s.error}>{error}</p>}

			<Button disabled={isPending} loading={isPending} onClick={handleSubmit} type="button">
				Continue
			</Button>
		</section>
	);
}
