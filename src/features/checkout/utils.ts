import { CHECKOUT_SELECTED_PAYMENT_GATEWAY_METADATA_KEY } from "@/features/checkout/constants";
import type { CheckoutCart } from "@/features/checkout/types";

export function getSelectedPaymentGatewayId(cart: CheckoutCart) {
	return cart.metadata.find((item) => item.key === CHECKOUT_SELECTED_PAYMENT_GATEWAY_METADATA_KEY)?.value;
}
