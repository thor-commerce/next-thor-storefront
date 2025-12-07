"use client";

import Button from "@/components/button/button";
import TextInput from "@/components/text-input/text-input";
import { useActionState, useEffect } from "react";
import { login, LoginState } from "../actions";
import { useRouter } from "next/navigation"; // 👈 App Router import

export default function Login() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    login,
    null
  );

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state?.success, router]);

  return (
    <form
      action={formAction}
      style={{
        maxWidth: 500,
        margin: "100px auto",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <TextInput label="Email" type="email" name="email" block />
      <TextInput label="Password" type="password" name="password" block />

      {state?.error && (
        <p style={{ color: "red", fontSize: 14 }}>{state.error}</p>
      )}

      <Button type="submit" loading={isPending}>
        Sign in
      </Button>
    </form>
  );
}
