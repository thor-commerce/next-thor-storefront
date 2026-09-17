import "server-only";

import { THOR_CART_COOKIE_NAME, THOR_CART_COOKIE_MAX_AGE } from "@/lib/thorcommerce/const";
import { cookies } from "next/headers";

export async function removeCartCookie() {
	const cookieStore = await cookies();
	cookieStore.delete(THOR_CART_COOKIE_NAME);
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
		httpOnly: true,
		path: "/",
		maxAge: THOR_CART_COOKIE_MAX_AGE,
		secure: shouldUseHttps,
	});
}
