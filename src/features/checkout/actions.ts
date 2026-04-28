"use server";

import { CACHE_TAGS } from "@/constants";
import { CHECKOUT_SELECTED_PAYMENT_GATEWAY_METADATA_KEY } from "@/features/checkout/constants";
import {
	checkoutCustomerStepSchema,
	checkoutDeliveryStepSchema,
	type CheckoutAddressValues,
	type CheckoutCustomerStepValues,
	type CheckoutDeliveryStepValues,
} from "@/features/checkout/schema";
import { CheckoutStepEnum } from "@/features/checkout/types";
import type { CartAddressInput } from "@/lib/thorcommerce/storefront/generated/types.generated";
import { completeCart, getCheckoutCart, setCartShippingLines, updateCart } from "@/lib/thorcommerce/storefront";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { removeCartCookie } from "@/features/cart/utils";

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

export async function updateCustomerStepAction(
	_prevState: string | undefined,
	payload: {
		cartId: string;
		countryCode: string;
	} & CheckoutCustomerStepValues,
) {
	const parseResult = checkoutCustomerStepSchema.safeParse(payload);

	if (!parseResult.success) {
		return parseResult.error.issues[0]?.message ?? "Invalid customer details";
	}

	const values = parseResult.data;
	const shippingAddress = normalizeAddress(values.shippingAddress);
	const billingAddress = values.billingSameAsShipping
		? shippingAddress
		: normalizeAddress(values.billingAddress);

	const result = await updateCart({
		input: {
			cartId: payload.cartId,
			customerEmail: values.email,
			shippingAddress,
			billingAddress,
		},
	});

	const error = result.errors?.find(Boolean);

	if (error) {
		return error.message;
	}

	updateTag(CACHE_TAGS.cart);
	redirect(`/${payload.countryCode}/checkout/${payload.cartId}?step=${CheckoutStepEnum.Delivery}`);
}

export async function updateDeliveryStepAction(
	_prevState: string | undefined,
	payload: {
		cartId: string;
		countryCode: string;
		redirectToPayment?: boolean;
	} & CheckoutDeliveryStepValues,
) {
	const parseResult = checkoutDeliveryStepSchema.safeParse(payload);

	if (!parseResult.success) {
		return parseResult.error.issues[0]?.message ?? "Invalid delivery details";
	}

	const result = await setCartShippingLines({
		input: {
			cartId: payload.cartId,
			shippingMethodIds: [parseResult.data.shippingMethodId],
		},
	});

	const error = result.errors?.find(Boolean);

	if (error) {
		return error.message;
	}

	updateTag(CACHE_TAGS.cart);
	if (payload.redirectToPayment)
		redirect(`/${payload.countryCode}/checkout/${payload.cartId}?step=${CheckoutStepEnum.Payment}`);
}

export async function completeCartAction(
	_prevState: string | undefined,
	payload: { cartId: string; countryCode: string },
) {
	const result = await completeCart({
		input: {
			cartId: payload.cartId,
		},
	});

	const error = result.errors?.find(Boolean);

	if (error) {
		return { error: error.message };
	}

	if (!result.order?.id) {
		return { error: "Order could not be completed" };
	}

	removeCartCookie();
	updateTag(CACHE_TAGS.cart);
	redirect(`/${payload.countryCode}/orders/${result.order.id}`);
}

function normalizeAddress(address: CheckoutAddressValues): CartAddressInput {
	return {
		address1: clean(address.address1),
		address2: clean(address.address2),
		city: clean(address.city),
		company: clean(address.company),
		countryCode: clean(address.countryCode)?.toUpperCase(),
		firstName: clean(address.firstName),
		lastName: clean(address.lastName),
		phone: clean(address.phone),
		postalCode: clean(address.postalCode),
		state: clean(address.state),
	};
}

function clean(value: string | null | undefined) {
	const normalized = value?.trim();
	return normalized ? normalized : undefined;
}
