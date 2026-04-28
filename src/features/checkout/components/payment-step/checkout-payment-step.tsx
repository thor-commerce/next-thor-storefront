import type { CheckoutCart, PaymentGateway } from "@/features/checkout/types";
import { CreditCard } from "lucide-react";
import s from "./checkout-payment-step.module.css";
import ManualPaymentForm from "./manual-payment-form";
import StripeElementsProvider from "./stripe-elements-provider";
import StripePaymentForm from "./stripe-payment-form";

interface CheckoutPaymentStepProps {
	cart: CheckoutCart;
	className?: string;
	countryCode: string;
	selectedGateway?: PaymentGateway;
}

export default function CheckoutPaymentStep({
	cart,
	className,
	countryCode,
	selectedGateway,
}: CheckoutPaymentStepProps) {
	const paymentGateway = cart.paymentSession?.paymentGateway ?? selectedGateway;
	const rootClassName = `${s.root} ${className ?? ""}`;

	if (!paymentGateway) {
		return (
			<section className={rootClassName}>
				<div className={s.header}>
					<h1 className={s.title}>Payment</h1>
					<p className={s.copy}>Preparing payment session.</p>
				</div>
			</section>
		);
	}

	if (paymentGateway.type === "StripePaymentGateway" || paymentGateway.type === "StripeConnectPaymentGateway") {
		if (!cart.paymentSession) {
			return (
				<section className={rootClassName}>
					<div className={s.header}>
						<h1 className={s.title}>Payment</h1>
						<p className={s.copy}>Preparing payment session.</p>
					</div>
				</section>
			);
		}

		return (
			<section className={rootClassName}>
				<div className={s.header}>
					<h1 className={s.title}>Payment</h1>
					<p className={s.copy}>Pay securely with {paymentGateway.name}.</p>
				</div>
				<StripeElementsProvider cart={cart}>
					<StripePaymentForm cart={cart} />
				</StripeElementsProvider>
			</section>
		);
	}

	if (paymentGateway.type === "ManualPaymentGateway") {
		return (
			<section className={rootClassName}>
				<div className={s.header}>
					<h1 className={s.title}>Payment</h1>
					<p className={s.copy}>Complete this order with {paymentGateway.name}.</p>
				</div>
				<ManualPaymentForm cart={cart} countryCode={countryCode} paymentGateway={paymentGateway} />
			</section>
		);
	}

	return (
		<section className={rootClassName}>
			<div className={s.header}>
				<h1 className={s.title}>Payment</h1>
				<p className={s.copy}>Unsupported payment gateway.</p>
			</div>
			<div className={s.manualPayment}>
				<CreditCard aria-hidden size={22} />
				<p>This gateway needs a checkout payment component before it can be used.</p>
			</div>
		</section>
	);
}
