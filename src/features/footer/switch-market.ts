"use server";

import { COUNTRIES } from "@/lib/thorcommerce/config";
import { getRequestContext } from "@/lib/request-context";
import { getCart, storefrontFetch } from "@/lib/thorcommerce/storefront";
import {
	CartReplicateDocument,
	ReplicationStrategy,
} from "@/lib/thorcommerce/storefront/generated/types.generated";
import { saveCartIdToCookie } from "@/features/cart/utils";

type Result = { success: true } | { success: false; error: string };

/** Reprice the existing cart before entering a market with a different store or currency. */
export async function switchMarket(countryCode: string): Promise<Result> {
	const market = COUNTRIES.find((country) => country.code === countryCode);
	if (!market) return { success: false, error: "This market isn't available." };
	const context = await getRequestContext();
	if (context.store === market.store && context.currency === market.currencies[0]) return { success: true };
	const cart = await getCart();
	if (cart) {
		try {
			const result = await storefrontFetch({
				query: CartReplicateDocument,
				variables: {
					input: {
						cartId: cart.id,
						storeId: market.store,
						currency: market.currencies[0],
						priceChannelId: context.priceChannel,
						strategy: ReplicationStrategy.Strict,
					},
				},
			});
			if (!result.cartReplicate.cart)
				return {
					success: false,
					error: "Your bag couldn't be moved to this market. Please review its items and try again.",
				};
			await saveCartIdToCookie(result.cartReplicate.cart.id);
		} catch {
			return {
				success: false,
				error: "Your bag couldn't be repriced for this market. Your current market and bag are unchanged.",
			};
		}
	}
	return { success: true };
}
