import CheckoutContainer from "@/features/checkout/components/checkout-container/checkout-container";
import CheckoutSummary from "@/features/checkout/components/checkout-summary/checkout-summary";
import { getOrder } from "@/lib/thorcommerce/storefront";
import { notFound } from "next/navigation";
import s from "./page.module.css";

export default async function OrderConfirmationPage({
	params,
}: {
	params: Promise<{ countryCode: string; id: string }>;
}) {
	const { id } = await params;
	const order = await getOrder(id);

	if (!order) {
		notFound();
	}

	return (
		<CheckoutContainer
			mainArea={
				<section className={s.confirmation}>
					<p className={s.eyebrow}>Order #{order.orderNumber}</p>
					<h1 className={s.title}>Thank you for shopping with us.</h1>
					<p className={s.copy}>Your order has been received and is being processed.</p>
				</section>
			}
			summaryArea={<CheckoutSummary cart={order} />}
		/>
	);
}
