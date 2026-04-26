import { CheckoutStepEnum } from "@/features/checkout/types";
import { getSelectedPaymentGatewayId } from "@/features/checkout/utils";
import CheckoutContainer from "@/features/checkout/components/checkout-container/checkout-container";
import PaymentProvider from "@/features/checkout/components/payment-provider/payment-provider";
import { getCheckoutCart } from "@/lib/thorcommerce/storefront";
import { redirect } from "next/navigation";
import CheckoutSummary from "@/features/checkout/components/checkout-summary/checkout-summary";

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

	if (!checkoutCart) {
		redirect(`/${countryCode}`);
	}

	if (!step) {
		redirect(`/${countryCode}/checkout/${id}?step=${getBestCheckoutStep(checkoutCart)}`);
	}

	const selectedGatewayId = getSelectedPaymentGatewayId(checkoutCart);

	if (!checkoutCart.paymentSession && !selectedGatewayId && step !== CheckoutStepEnum.GatewaySelection) {
		redirect(`/${countryCode}/checkout/${id}?step=${CheckoutStepEnum.GatewaySelection}`);
	}

	return (
		<CheckoutContainer
			mainArea={
				<PaymentProvider cart={checkoutCart} countryCode={countryCode} step={step}>
					{/* <CheckoutStep cartId={id} countryCode={countryCode} step={step} /> */}
				</PaymentProvider>
			}
			summaryArea={<CheckoutSummary cart={checkoutCart} />}
		/>
	);
}

function getBestCheckoutStep(cart: NonNullable<Awaited<ReturnType<typeof getCheckoutCart>>>) {
	if (!getSelectedPaymentGatewayId(cart)) {
		return CheckoutStepEnum.GatewaySelection;
	}

	//add some more intelligence here in the future to determine the best step to start on based on the cart details, e.g. if the shipping address is missing, start on the shipping step, etc.
	//we should check for required fields like address1 etc...
	if (!cart.shippingAddress?.countryCode) {
		return CheckoutStepEnum.Customer;
	}

	if (!cart.paymentSession) {
		return CheckoutStepEnum.Payment;
	}

	return CheckoutStepEnum.Payment;
}
