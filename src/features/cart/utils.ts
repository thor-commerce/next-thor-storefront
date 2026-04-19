"use server";

import {
	CartReplicateMutation,
	CartReplicateMutationVariables,
	CartState,
	ReplicationStrategy,
} from "@/__generated__/thor/graphql";
import { CACHE_TAGS } from "@/constants";
import { getCartCacheTag } from "@/constants";
import { getClient } from "@/lib/thorcommerce/apollo-client";
import { THOR_CART_COOKIE_NAME } from "@/lib/thorcommerce/config";

import { getServerContext } from "@/utils/server";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { CART_REPLICATE_MUTATION } from "./mutations";

export async function removeCartCookie() {
	try {
		const cookieStore = await cookies();
		cookieStore.set(THOR_CART_COOKIE_NAME, "", { maxAge: -1 });
	} catch (e) {
		console.error("Error removing checkout cookie", e);
	}
}

export async function getCartIdFromCookies() {
	const cookieStore = await cookies();
	const cartId = cookieStore.get(THOR_CART_COOKIE_NAME)?.value || "";
	return cartId;
}

export async function saveCartIdToCookie(cartId: string) {
	const shouldUseHttps = process.env.NODE_ENV === "production";
	const cookieStore = await cookies();
	cookieStore.set(THOR_CART_COOKIE_NAME, cartId, {
		sameSite: "lax",
		secure: shouldUseHttps,
	});
}

// export async function cleanupCartCookieIfNeeded(cartId: string) {
// 	const { data } = await getClient().query({
// 		query: NAVBAR_CART_QUERY,
// 		variables: {
// 			id: cartId,
// 		},
// 		context: {
// 			fetchOptions: {
// 				cache: "force-cache",
// 				next: {
// 					tags: [CACHE_TAGS.cart, getCartCacheTag(cartId)],
// 				},
// 			},
// 		},
// 	});

// 	const cart = data?.cart;

// 	if (!cart || cart.state === CartState.Ordered) {
// 		await removeCartCookie();
// 		return;
// 	}

// 	const { country } = await getServerContext();
// 	let changesCount = 0;
// 	if (cart.store?.id != country.store || country.currencies[0] != cart.currency) {
// 		const { data } = await getClient().mutate<CartReplicateMutation, CartReplicateMutationVariables>({
// 			mutation: CART_REPLICATE_MUTATION,
// 			variables: {
// 				input: {
// 					cartId: cart.id,
// 					storeId: country.store,
// 					currency: country.currencies[0],
// 					strategy: ReplicationStrategy.SkipUnavailable,
// 				},
// 			},
// 		});

// 		if (data?.cartReplicate.cart?.id) {
// 			await saveCartIdToCookie(data.cartReplicate.cart.id);
// 			changesCount++;
// 		}
// 	}

// 	if (changesCount > 0) {
// 		updateTag(CACHE_TAGS.cart);
// 		updateTag(getCartCacheTag(cart.id));
// 	}
// }

