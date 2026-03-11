"use server";

import { CACHE_TAGS, getCartCacheTag } from "@/constants";
import { getClient } from "@/lib/thor/apollo-client";
import { updateTag } from "next/cache";
import z from "zod";
import { discountCodeSchema } from "./cart-discount-code-form/validation";
import {
	CART_DISCOUNT_CODE_ADD_MUTATION,
	CART_DISCOUNT_CODE_REMOVE_MUTATION,
	CART_LINE_ITEMS_REMOVE_MUTATION,
	CART_LINE_ITEMS_UPDATE_MUTATION,
} from "./mutations";
import { DiscountCodeActionResponse, DiscountCodeFormData } from "./types";
import { getCartIdFromCookies } from "./utils";

export async function updateItemQuantity(
	formData: FormData,
) {
	const cartId = await getCartIdFromCookies();
	const lineId = formData.get("lineId")?.toString();
	const quantityValue = Number(formData.get("quantity"));

	if (!lineId || !Number.isFinite(quantityValue)) {
		return;
	}

	await getClient().mutate({
		mutation: CART_LINE_ITEMS_UPDATE_MUTATION,
		variables: {
			input: {
				cartId,
				lineItems: [
					{
						lineItemId: lineId,
						quantity: quantityValue,
					},
				],
			},
		},
	});

	updateTag(CACHE_TAGS.cart);
	updateTag(getCartCacheTag(cartId));
}

export async function removeLineItem(formData: FormData) {
	const cartId = await getCartIdFromCookies();
	const lineId = formData.get("lineId")?.toString();

	if (!lineId) {
		return;
	}

	try {
		await getClient().mutate({
			mutation: CART_LINE_ITEMS_REMOVE_MUTATION,
			variables: {
				input: {
					cartId,
					lineItemIds: [lineId],
				},
			},
		});
		updateTag(CACHE_TAGS.cart);
		updateTag(getCartCacheTag(cartId));
	} catch (e) {
		console.error(e);
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
