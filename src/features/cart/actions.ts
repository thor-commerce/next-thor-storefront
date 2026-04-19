"use server";

import { CACHE_TAGS, getCartCacheTag } from "@/constants";
import { getClient } from "@/lib/thorcommerce/apollo-client";
import { updateTag } from "next/cache";
import z from "zod";
import { discountCodeSchema } from "./cart-discount-code-form/validation";
import {
	CART_DISCOUNT_CODE_ADD_MUTATION,
	CART_DISCOUNT_CODE_REMOVE_MUTATION,
} from "./mutations";
import { DiscountCodeActionResponse, DiscountCodeFormData } from "./types";
import { getCartIdFromCookies } from "./utils";
import { addToCart, getCart, removeFromCart, updateCartLineItems } from "@/lib/thorcommerce/storefront";
import { removeEdgesAndNodes } from "@/lib/thorcommerce/utils";

export async function addItem(prev: unknown, selectedVariantId: string) {
	try {
		const cart = await getCart();

		if (!cart) {
			return "Error fetching cart";
		}

		if (!selectedVariantId) {
			return "Error adding item to cart";
		}

		await addToCart([{ variantId: selectedVariantId, quantity: 1 }]);
		updateTag(CACHE_TAGS.cart);
	} catch {
		return "Error adding item to cart";
	}


}
export async function updateItemQuantity(
	prevState: unknown,
	payload: {
		lineItemId: string;
		quantity: number;
	}
) {
	const { lineItemId, quantity } = payload;
	try {
		const cart = await getCart();

		if (!cart) {
			return "Error fetching cart";
		}

		const lineItem = removeEdgesAndNodes(cart.lineItems).find(
			(item) => item.id === lineItemId
		);

		if (lineItem) {
			if (quantity === 0) {
				await removeFromCart([lineItem.id]);
			} else {
				await updateCartLineItems([{ lineItemId: lineItem.id, quantity }]);
			}
		}
		updateTag(CACHE_TAGS.cart);

	} catch {
		return "Error updating cart item";
	}
}

export async function removeLineItem(prevState: unknown, lineItemId: string) {

	try {
		const cart = await getCart();

		if (!cart) {
			return "Error fetching cart";
		}

		const lineItem = removeEdgesAndNodes(cart.lineItems).find(
			(line) => line.id === lineItemId
		);

		if (lineItem && lineItem.id) {
			await removeFromCart([lineItem.id]);
			updateTag(CACHE_TAGS.cart);
		} else {
			return "Item not found in cart";
		}
	} catch {
		return "Error removing item from cart";
	}
}

export async function addDiscountCode(
	prevState: DiscountCodeActionResponse | null,
	formData: FormData,
): Promise<DiscountCodeActionResponse> {
	try {
		const rawData: DiscountCodeFormData = {
			code: formData.get("code") as string,
		};

		const validatedData = discountCodeSchema.safeParse(rawData);

		if (!validatedData.success) {
			return {
				success: false,
				errors: z.flattenError(validatedData.error).fieldErrors,
			};
		}

		const cartId = await getCartIdFromCookies();
		const res = await getClient().mutate({
			mutation: CART_DISCOUNT_CODE_ADD_MUTATION,
			variables: {
				input: {
					cartId,
					discountCode: validatedData.data.code, // Use the validated code
				},
			},
		});

		const { data } = res;
		if (data?.cartDiscountCodeAdd.errors) {
			return {
				success: false,
				errors: {
					code: ["discount code is invalid"],
				},
			};
		}

		updateTag(CACHE_TAGS.cart);
		updateTag(getCartCacheTag(cartId));
		return {
			success: true,
		};
	} catch (e) {
		console.error("Error adding discount code:", e);
		return {
			success: false,
			messsage: "Failed to add discount code",
		};
	}
}

export async function removeDiscountCode(
	formData: FormData,
) {
	try {
		const cartId = await getCartIdFromCookies();
		const code = formData.get("code")?.toString();

		if (!code) {
			return;
		}

		await getClient().mutate({
			mutation: CART_DISCOUNT_CODE_REMOVE_MUTATION,
			variables: {
				input: {
					cartId,
					discountCodes: [code],
				},
			},
		});
		updateTag(CACHE_TAGS.cart);
		updateTag(getCartCacheTag(cartId));
	} catch {
		return;
	}
}
