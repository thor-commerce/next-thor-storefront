"use client";

import Button from "@/components/button/button";
import TextInput from "@/components/text-input/text-input";
import { useActionState, useEffect } from "react";
import { login, LoginState } from "../actions";
import { useRouter } from "next/navigation"; // 👈 App Router import
import s from "./login.module.css";

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
    <div className={s.page}>
      <div className={s.header}>
        <h1 className={s.title}>Sign in</h1>
        <p className={s.subtitle}>Access your account, order history, and saved addresses.</p>
      </div>

      <div className={s.panel}>
        <form action={formAction} className={s.form}>
          <TextInput label="Email" type="email" name="email" block />
          <TextInput label="Password" type="password" name="password" block />

          {state?.error && <p className={s.error}>{state.error}</p>}

          <Button type="submit" loading={isPending}>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
