"use server";

import { CACHE_TAGS } from "@/constants";
import { CHECKOUT_SELECTED_PAYMENT_GATEWAY_METADATA_KEY } from "@/features/checkout/constants";
import { getCheckoutCart, updateCart } from "@/lib/thorcommerce/storefront";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function selectPaymentGatewayAction(
	_prevState: string | undefined,
	payload: {
		cartId: string;
		countryCode: string;
		gatewayId: string;
		nextStep?: string;
	},
) {
	const cart = await getCheckoutCart(payload.cartId);

	if (!cart) {
		return "Cart not found";
	}

	const metadata = [
		...cart.metadata.filter((item) => item.key !== CHECKOUT_SELECTED_PAYMENT_GATEWAY_METADATA_KEY),
		{
			key: CHECKOUT_SELECTED_PAYMENT_GATEWAY_METADATA_KEY,
			value: payload.gatewayId,
		},
	];

	const result = await updateCart({
		input: {
			cartId: payload.cartId,
			metadata,
		},
	});

	const error = result.errors?.find(Boolean);

	if (error) {
		return error.message;
	}

	updateTag(CACHE_TAGS.cart);
	redirect(`/${payload.countryCode}/checkout/${payload.cartId}?step=${payload.nextStep ?? "customer"}`);
}
