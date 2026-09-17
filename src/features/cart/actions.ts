"use server";

import { CACHE_TAGS } from "@/constants";
import { refresh, updateTag } from "next/cache";
import {
	addToCart,
	findOrCreateCart,
	getCart,
	removeFromCart,
	updateCartLineItems,
} from "@/lib/thorcommerce/storefront";
import { removeEdgesAndNodes } from "@/lib/thorcommerce/utils";

export async function addItem(prev: unknown, selectedVariantId: string) {
	try {
		const cart = await findOrCreateCart();

		if (!cart) {
			return "Error fetching cart";
		}

		if (!selectedVariantId) {
			return "Error adding item to cart";
		}

		const result = await addToCart([{ variantId: selectedVariantId, quantity: 1 }]);
		if (result.errors?.length) {
			return result.errors
				.map((error) => ("message" in error ? error.message : "Unable to add this item to your cart."))
				.join(" ");
		}
		if (!result.cart) return "Unable to add this item to your cart. Please try again.";
		updateTag(CACHE_TAGS.cart);
		refresh();
	} catch {
		return "Error adding item to cart";
	}
}
export async function updateItemQuantity(
	prevState: unknown,
	payload: {
		lineItemId: string;
		quantity: number;
	},
) {
	const { lineItemId, quantity } = payload;
	if (!Number.isSafeInteger(quantity) || quantity < 0) return "Enter a valid quantity.";
	try {
		const cart = await getCart();

		if (!cart) {
			return "Error fetching cart";
		}

		const lineItem = removeEdgesAndNodes(cart.lineItems).find((item) => item.id === lineItemId);

		if (!lineItem) return "Item not found in cart. Please refresh and try again.";
		const result =
			quantity === 0
				? await removeFromCart([lineItem.id])
				: await updateCartLineItems([{ lineItemId: lineItem.id, quantity }]);
		if (result.errors?.length || !result.cart)
			return "Unable to update this item. Please check availability and try again.";
		updateTag(CACHE_TAGS.cart);
		refresh();
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

		const lineItem = removeEdgesAndNodes(cart.lineItems).find((line) => line.id === lineItemId);

		if (lineItem && lineItem.id) {
			const result = await removeFromCart([lineItem.id]);
			if (result.errors?.length || !result.cart) return "Unable to remove this item. Please try again.";
			refresh();
			updateTag(CACHE_TAGS.cart);
		} else {
			return "Item not found in cart";
		}
	} catch {
		return "Error removing item from cart";
	}
}
