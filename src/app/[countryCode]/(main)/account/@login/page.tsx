import Login from "@/features/account/login/login"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Thor Store account.",
}

export default function LoginPage() {
  return <Login />
}