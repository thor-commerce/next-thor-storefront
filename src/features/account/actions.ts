"use server";

import { auth } from "@/lib/auth";
import { getRequestContext } from "@/lib/request-context";
import {
	customerActivate,
	customerPasswordReset,
	customerPasswordResetToken,
	customerRegister,
} from "@/lib/thorcommerce/storefront";
import { redirect } from "next/navigation";

export type LoginState = { error?: string; success?: boolean } | null;

export async function login(_currentState: unknown, formData: FormData): Promise<LoginState> {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const { country } = await getRequestContext();

	try {

		const response = await auth.api.customerSignIn({
			body: { email, password },
		});

		if ("error" in response) {
			return { error: response.error };
		}
	} catch (err) {
		console.error(err);
		return { error: "Something went wrong, please try again." };
	}

	return redirect(`/${country.toLowerCase()}/account`);
}


export type RegisterState = { error?: string; success?: boolean; email?: string } | null;

export async function register(_currentState: unknown, formData: FormData): Promise<RegisterState> {
	const email = formData.get("email") as string;

	const response = await customerRegister(email);

	if (response.errors && response.errors.length > 0) {
		return { error: "Registration failed. Please try again.", email };
	}

	return { success: true, email };
}

export type ActivateState = { error?: string; success?: boolean } | null;

export async function activate(_currentState: unknown, formData: FormData): Promise<ActivateState> {
	const email = formData.get("email") as string;
	const token = (formData.get("token") as string)?.trim();
	const firstName = (formData.get("firstName") as string)?.trim();
	const lastName = (formData.get("lastName") as string)?.trim();
	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;

	if (!token) {
		return { error: "Activation code is required." };
	}

	if (password !== confirmPassword) {
		return { error: "Passwords do not match." };
	}

	try {
		const response = await customerActivate({
			input: { email, token, firstName, lastName, password },
		});

		if (response.errors && response.errors.length > 0) {
			return { error: "Activation failed. Please check the code and try again." };
		}
	} catch (err) {
		console.error(err);
		return { error: "Something went wrong, please try again." };
	}

	try {
		await auth.api.customerSignIn({ body: { email, password } });
	} catch (err) {
		console.error(err);
	}

	redirect("/account");
}

export type ForgotPasswordState = { error?: string; success?: boolean; email?: string } | null;

export async function requestPasswordReset(
	_currentState: unknown,
	formData: FormData
): Promise<ForgotPasswordState> {
	const email = (formData.get("email") as string)?.trim();

	if (!email) {
		return { error: "Email is required." };
	}

	try {
		const response = await customerPasswordResetToken({
			input: { email },
		});

		if (response.errors && response.errors.length > 0) {
			return { error: "We couldn't send a reset code. Please check the email and try again.", email };
		}

		return { success: true, email };
	} catch (err) {
		console.error(err);
		return { error: "Something went wrong, please try again.", email };
	}
}

export type ResetPasswordState = { error?: string; success?: boolean } | null;

export async function resetPassword(
	_currentState: unknown,
	formData: FormData
): Promise<ResetPasswordState> {
	const email = (formData.get("email") as string)?.trim();
	const token = (formData.get("token") as string)?.trim();
	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;

	if (!email) {
		return { error: "Email is required." };
	}

	if (!token) {
		return { error: "Reset code is required." };
	}

	if (password !== confirmPassword) {
		return { error: "Passwords do not match." };
	}

	try {
		const response = await customerPasswordReset({
			input: { email, password, resetToken: token },
		});

		if (response.errors && response.errors.length > 0) {
			const hasInvalidPassword = response.errors.some((error) => error.code === "InvalidPasswordError");

			return {
				error: hasInvalidPassword
					? "Password does not meet the requirements."
					: "Reset failed. Please check the code and try again.",
			};
		}

		return { success: true };
	} catch (err) {
		console.error(err);
		return { error: "Something went wrong, please try again." };
	}
}
