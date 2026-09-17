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

function textField(formData: FormData, name: string): string {
	const value = formData.get(name);
	return typeof value === "string" ? value : "";
}

export type LoginState = { error?: string; success?: boolean } | null;

export async function login(_currentState: unknown, formData: FormData): Promise<LoginState> {
	const email = textField(formData, "email").trim();
	const password = textField(formData, "password");
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
	const email = textField(formData, "email").trim();

	if (!email) return { error: "Email is required." };
	try {
		const response = await customerRegister(email);
		if (response.errors?.length) return { error: "Registration failed. Please try again.", email };
		return { success: true, email };
	} catch {
		return { error: "Registration is unavailable. Please try again.", email };
	}
}

export type ActivateState = { error?: string; success?: boolean } | null;

export async function activate(_currentState: unknown, formData: FormData): Promise<ActivateState> {
	const email = textField(formData, "email").trim();
	const token = textField(formData, "token").trim();
	const firstName = textField(formData, "firstName").trim();
	const lastName = textField(formData, "lastName").trim();
	const password = textField(formData, "password");
	const confirmPassword = textField(formData, "confirmPassword");

	if (!token) {
		return { error: "Activation code is required." };
	}

	if (!password || password !== confirmPassword) {
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
		const result = await auth.api.customerSignIn({ body: { email, password } });
		if ("error" in result) return { success: true };
	} catch {
		return { success: true };
	}

	const { country } = await getRequestContext();
	redirect(`/${country}/account`);
}

export type ForgotPasswordState = { error?: string; success?: boolean; email?: string } | null;

export async function requestPasswordReset(
	_currentState: unknown,
	formData: FormData,
): Promise<ForgotPasswordState> {
	const email = textField(formData, "email").trim();

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

export async function resetPassword(_currentState: unknown, formData: FormData): Promise<ResetPasswordState> {
	const email = textField(formData, "email").trim();
	const token = textField(formData, "token").trim();
	const password = textField(formData, "password");
	const confirmPassword = textField(formData, "confirmPassword");

	if (!email) {
		return { error: "Email is required." };
	}

	if (!token) {
		return { error: "Reset code is required." };
	}

	if (!password || password !== confirmPassword) {
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
