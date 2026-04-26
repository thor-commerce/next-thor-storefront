import { CheckoutStepEnum } from "@/features/checkout/types";
import { getCheckoutCart } from "@/lib/thorcommerce/storefront";
import { CheckCheck } from "lucide-react";
import { redirect } from "next/navigation";

/**
 *
 * @param id - the cart id, which is used to fetch the cart details and process the checkout. It is passed as a query parameter in the URL.
 * @returns
 */
export default async function CheckoutPage({
	params,
	searchParams,
}: PageProps<"/[countryCode]/checkout/[id]">) {
	const { id, countryCode } = await params;

	const {
		step,
	}: {
		step?: CheckoutStepEnum;
		processing_payment?: string;

		/**
		 * Stripe specific query params that are returned after the user is redirected back from Stripe checkout. These can be used to determine the status of the payment and display appropriate messages to the user.
		 */
		payment_intent?: string;
		payment_intent_client_secret?: string;
	} = await searchParams;

	const checkoutCart = await getCheckoutCart(id);

	if (!step) {
		//try to set the best step based on the cart details, if step is not set in the query params:
	}

	if (checkoutCart?.paymentSession == null) {
		//redirect to gateway selection step if the cart does not have a payment session
		redirect(`/${countryCode}/checkout/${id}?step=${CheckoutStepEnum.GatewaySelection}`);
	}

	return <div>Checkout</div>;
}
