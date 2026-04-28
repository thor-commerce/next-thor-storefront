import CheckoutCustomerStep from "@/features/checkout/components/customer-step/checkout-customer-step";
import CheckoutDeliveryStep from "@/features/checkout/components/delivery-step/checkout-delivery-step";
import CheckoutDetails from "@/features/checkout/components/checkout-details/checkout-details";
import CheckoutPaymentProcessing from "@/features/checkout/components/payment-step/checkout-payment-processing";
import CheckoutPaymentStep from "@/features/checkout/components/payment-step/checkout-payment-step";
import { CheckoutStepEnum } from "@/features/checkout/types";
import { getSelectedPaymentGatewayId } from "@/features/checkout/utils";
import CheckoutContainer from "@/features/checkout/components/checkout-container/checkout-container";
import PaymentProvider from "@/features/checkout/components/payment-provider/payment-provider";
import { getCheckoutCart, getPaymentGateways, getUser } from "@/lib/thorcommerce/storefront";
import { redirect } from "next/navigation";
import CheckoutSummary from "@/features/checkout/components/checkout-summary/checkout-summary";
import s from "./page.module.css";

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
		payment_intent_client_secret,
		processing_payment,
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

	if (
		(step === CheckoutStepEnum.Delivery || step === CheckoutStepEnum.Payment) &&
		!hasRequiredCustomerDetails(checkoutCart)
	) {
		redirect(`/${countryCode}/checkout/${id}?step=${CheckoutStepEnum.Customer}`);
	}

	if (step === CheckoutStepEnum.Payment && !hasSelectedShippingMethod(checkoutCart)) {
		redirect(`/${countryCode}/checkout/${id}?step=${CheckoutStepEnum.Delivery}`);
	}

	const customer = step === CheckoutStepEnum.Customer ? await getUser() : null;
	const selectedPaymentGateway =
		step !== CheckoutStepEnum.GatewaySelection
			? await getSelectedPaymentGateway(checkoutCart)
			: undefined;

	if (processing_payment && payment_intent_client_secret) {
		return (
			<CheckoutContainer
				mainArea={
					<CheckoutPaymentProcessing
						cart={checkoutCart}
						countryCode={countryCode}
						paymentIntentClientSecret={payment_intent_client_secret}
					/>
				}
				summaryArea={<CheckoutSummary cart={checkoutCart} />}
			/>
		);
	}

	return (
		<CheckoutContainer
			mainArea={
				<PaymentProvider cart={checkoutCart} countryCode={countryCode} step={step}>
					{step !== CheckoutStepEnum.GatewaySelection && (
						<div className={s.mainStack}>
							<CheckoutDetails
								cart={checkoutCart}
								countryCode={countryCode}
								currentStep={step}
								paymentGateway={selectedPaymentGateway}
							/>
							{step === CheckoutStepEnum.Customer && (
								<CheckoutCustomerStep
									cart={checkoutCart}
									className={s.stepContent}
									countryCode={countryCode}
									customer={customer}
								/>
							)}
							{step === CheckoutStepEnum.Delivery && (
								<CheckoutDeliveryStep
									cart={checkoutCart}
									className={s.stepContent}
									countryCode={countryCode}
								/>
							)}
							{step === CheckoutStepEnum.Payment && (
								<CheckoutPaymentStep
									cart={checkoutCart}
									className={s.stepContent}
									countryCode={countryCode}
									selectedGateway={selectedPaymentGateway}
								/>
							)}
						</div>
					)}
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

	if (!hasRequiredCustomerDetails(cart)) {
		return CheckoutStepEnum.Customer;
	}

	if (!hasSelectedShippingMethod(cart)) {
		return CheckoutStepEnum.Delivery;
	}

	if (!cart.paymentSession) {
		return CheckoutStepEnum.Payment;
	}

	return CheckoutStepEnum.Payment;
}

function hasRequiredCustomerDetails(cart: NonNullable<Awaited<ReturnType<typeof getCheckoutCart>>>) {
	const address = cart.shippingAddress;

	return Boolean(
		cart.customerEmail &&
			address?.firstName &&
			address.lastName &&
			address.address1 &&
			address.city &&
			address.postalCode &&
			address.countryCode &&
			address.phone,
	);
}

function hasSelectedShippingMethod(cart: NonNullable<Awaited<ReturnType<typeof getCheckoutCart>>>) {
	return Boolean(cart.shippingLines.find(Boolean)?.shippingMethod.id);
}

async function getSelectedPaymentGateway(cart: NonNullable<Awaited<ReturnType<typeof getCheckoutCart>>>) {
	if (cart.paymentSession?.paymentGateway) {
		return cart.paymentSession.paymentGateway;
	}

	const selectedGatewayId = getSelectedPaymentGatewayId(cart);

	if (!selectedGatewayId) {
		return undefined;
	}

	const gateways = await getPaymentGateways(cart.id);
	return gateways.find((gateway) => gateway.id === selectedGatewayId);
}
