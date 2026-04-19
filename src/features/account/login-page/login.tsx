"use client";

import { useState } from "react";
import s from "./login.module.css";
import Login from "@/features/account/components/login/login";
import Register from "@/features/account/components/register/register";

export default function LoginPage() {
	const [view, setView] = useState<"login" | "register">("login");

	return (
		<div className={s.page}>
			{view === "login" && <Login setView={setView} />}
			{view === "register" && <Register setView={setView} />}
		</div>
	);
}
