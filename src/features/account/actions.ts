"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export type LoginState = { error?: string; success?: boolean } | null;

export async function login(_currentState: unknown, formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	try {
		const response = await auth.api.customerSignIn({
			body: { email, password },
		});

		if ("error" in response) {
			return { error: response.error };
		}

		redirect("/account");
	} catch (err) {
		console.error(err);
		return { error: "Something went wrong, please try again." };
	}
}
