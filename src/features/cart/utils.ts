"use server";

import { THOR_CART_COOKIE_NAME } from "@/lib/thorcommerce/config";
import { cookies } from "next/headers";

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
