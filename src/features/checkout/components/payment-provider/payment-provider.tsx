import { CheckoutStepEnum, type CheckoutCart } from "@/features/checkout/types";
import { getSelectedPaymentGatewayId } from "@/features/checkout/utils";
import { cartPaymentSessionInitialize, getPaymentGateways } from "@/lib/thorcommerce/storefront";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import PaymentGatewaySelector from "./payment-gateway-selector";

interface PaymentProviderProps {
	cart: CheckoutCart;
	countryCode: string;
	step: CheckoutStepEnum;
}

export default async function PaymentProvider({
	cart,
	children,
	countryCode,
	step,
}: PropsWithChildren<PaymentProviderProps>) {
	const selectedGatewayId = getSelectedPaymentGatewayId(cart);

	if (step === CheckoutStepEnum.GatewaySelection) {
		const gateways = await getPaymentGateways(cart.id);

		return (
			<PaymentGatewaySelector
				cartId={cart.id}
				countryCode={countryCode}
				gateways={gateways}
				selectedGatewayId={selectedGatewayId}
			/>
		);
	}

	if (!cart.paymentSession && step === CheckoutStepEnum.Payment) {
		if (!selectedGatewayId) {
			redirect(`/${countryCode}/checkout/${cart.id}?step=${CheckoutStepEnum.GatewaySelection}`);
		}

		const result = await cartPaymentSessionInitialize({
			cartId: cart.id,
			gatewayId: selectedGatewayId,
		});

		const error = result.errors?.find(Boolean);

		if (error) {
			throw new Error(error.message);
		}

		redirect(`/${countryCode}/checkout/${cart.id}?step=${CheckoutStepEnum.Payment}`);
	}

	return children;
}
