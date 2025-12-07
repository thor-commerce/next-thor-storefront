"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

export type LoginState = { error?: string; success?: boolean } | null;

export async function login(_currentState: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    await auth.api.customerSignIn({
      body: { email, password },
    });

    return { success: true }
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message ?? "Invalid email or password" };
    }

    console.error(err);
    return { error: "Something went wrong, please try again." };
  }
}
