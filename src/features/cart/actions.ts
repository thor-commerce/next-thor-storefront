"use server";

import { CACHE_TAGS } from "@/constants";
import { updateTag } from "next/cache";
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
