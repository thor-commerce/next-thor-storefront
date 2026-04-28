"use client";

import Button from "@/components/button/button";
import { updateDeliveryStepAction } from "@/features/checkout/actions";
import { checkoutDeliveryStepSchema, type CheckoutDeliveryStepValues } from "@/features/checkout/schema";
import type { CheckoutCart } from "@/features/checkout/types";
import { formatMoney } from "@/utils/money";
import { zodResolver } from "@hookform/resolvers/zod";
import { Truck } from "lucide-react";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import s from "./checkout-delivery-step.module.css";

interface CheckoutDeliveryStepFormProps {
	cart: CheckoutCart;
	className?: string;
	countryCode: string;
}

type ShippingMethod = CheckoutCart["availableShippingMethods"][number];

export default function CheckoutDeliveryStepForm({
	cart,
	className,
	countryCode,
}: CheckoutDeliveryStepFormProps) {
	const [error, setError] = useState<string>();
	const [isPending, startTransition] = useTransition();
	const selectedShippingMethodId = cart.shippingLines.find(Boolean)?.shippingMethod.id;
	const form = useForm<CheckoutDeliveryStepValues>({
		resolver: zodResolver(checkoutDeliveryStepSchema),
		defaultValues: {
			shippingMethodId: selectedShippingMethodId ?? cart.availableShippingMethods[0]?.id ?? "",
		},
	});

	//on form shipping method change, update the cart and redirect to payment step

	const handleSubmit = form.handleSubmit((values) => {
		startTransition(async () => {
			const result = await updateDeliveryStepAction(undefined, {
				...values,
				cartId: cart.id,
				countryCode,
				redirectToPayment: true,
			});

			setError(result);
		});
	});

	if (cart.availableShippingMethods.length === 0) {
		return (
			<section className={`${s.root} ${className ?? ""}`}>
				<div className={s.header}>
					<h1 className={s.title}>Delivery</h1>
					<p className={s.copy}>No shipping methods are available for this address.</p>
				</div>
				<div className={s.empty}>
					<Truck aria-hidden size={28} />
					<p>Update the customer address to check delivery options again.</p>
				</div>
			</section>
		);
	}

	return (
		<form className={`${s.root} ${className ?? ""}`} onSubmit={handleSubmit}>
			<div className={s.header}>
				<h1 className={s.title}>Delivery</h1>
				<p className={s.copy}>Choose a shipping method for this order.</p>
			</div>

			<Controller
				control={form.control}
				name="shippingMethodId"
				render={({ field, fieldState }) => (
					<div className={s.methodList} role="radiogroup" aria-invalid={!!fieldState.error}>
						{cart.availableShippingMethods.map((shippingMethod) => (
							<label
								className={s.method}
								data-selected={field.value === shippingMethod.id}
								key={shippingMethod.id}
							>
								<input
									checked={field.value === shippingMethod.id}
									className={s.methodInput}
									name={field.name}
									onBlur={field.onBlur}
									onChange={() => {
										field.onChange(shippingMethod.id);
										startTransition(async () => {
											const result = await updateDeliveryStepAction(undefined, {
												shippingMethodId: shippingMethod.id,
												cartId: cart.id,
												countryCode,
											});

											setError(result);
										});
									}}
									ref={field.ref}
									type="radio"
									value={shippingMethod.id}
								/>
								<span className={s.methodText}>
									<span className={s.methodName}>{shippingMethod.name}</span>
									{shippingMethod.description && (
										<span className={s.methodDescription}>{shippingMethod.description}</span>
									)}
								</span>
								<span className={s.methodPrice}>{formatShippingRate(shippingMethod)}</span>
							</label>
						))}
						{fieldState.error && <p className={s.error}>{fieldState.error.message}</p>}
					</div>
				)}
			/>

			{error && <p className={s.error}>{error}</p>}

			<Button disabled={isPending} loading={isPending} type="submit">
				Continue to payment
			</Button>
		</form>
	);
}

function formatShippingRate(shippingMethod: ShippingMethod) {
	if (shippingMethod.rate.__typename === "AbsoluteShippingMethodRate") {
		return shippingMethod.rate.price.centAmount === 0
			? "Free"
			: formatMoney({
					money: shippingMethod.rate.price,
				});
	}

	if (shippingMethod.rate.__typename === "RelativeShippingMethodRate") {
		return `${shippingMethod.rate.rate}%`;
	}

	return "Calculated later";
}
