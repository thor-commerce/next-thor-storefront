"use server";

import { auth } from "@/lib/auth";

export type LoginState = { error?: string; success?: boolean } | null;

export async function login(_currentState: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const response = await auth.api.customerSignIn({
      body: { email, password },
    });

    if ("error" in response) {
      return { error: response.error }
    }

    return { success: true }
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong, please try again." };
  }
}
