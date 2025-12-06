"use client";

import Button from "@/components/button/button";
import TextInput from "@/components/text-input/text-input";
import { useActionState } from "react";
import { login } from "../actions";
import { useForm } from "react-hook-form";

export default function Login() {
  const [message, formAction, isPending] = useActionState(login, null);



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
      <Button type="submit" loading={isPending} >
        Sign in
      </Button>
    </form>
  );
}
