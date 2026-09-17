"use server";

import { removeCartCookie } from "@/features/cart/utils";
import { auth } from "@/lib/auth";
import { getRequestContext } from "@/lib/request-context";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
	const { country } = await getRequestContext();
	await auth.api.signOut({ headers: await headers() });
	await removeCartCookie();
	redirect(`/${country.toLowerCase()}/account`);
}
