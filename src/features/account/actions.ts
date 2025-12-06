"use server";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

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
    // await transferCart()
  } catch (error: any) {
    return error.toString();
  }
}
