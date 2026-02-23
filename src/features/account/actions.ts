"use server";

import { auth } from "@/lib/auth";

export type LoginState = { error?: string; success?: boolean } | null;

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  await auth.api.signInEmail({ body: { email, password } });
  try {
    // await sdk.auth
    //   .login("customer", "emailpass", { email, password })
    //   .then(async (token) => {
    //     await setAuthToken(token as string)
    //     const customerCacheTag = await getCacheTag("customers")
    //     revalidateTag(customerCacheTag)
    //   })
  } catch (error: any) {
    return error.toString();
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
