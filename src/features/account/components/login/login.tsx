import TextInput from "@/components/text-input/text-input";
import s from "./login.module.css";
import Button from "@/components/button/button";
import { useActionState } from "react";
import { login, LoginState } from "@/features/account/actions";

interface Props {
	setView: (view: "login" | "register" | "forgot") => void;
}

export default function Login({ setView }: Props) {
	const [state, formAction, isPending] = useActionState<LoginState, FormData>(login, null);

	return (
		<div>
			<div className={s.header}>
				<h1 className={s.title}>Sign in</h1>
				<p className={s.subtitle}>Access your account, order history, and saved addresses.</p>
			</div>

			<div className={s.panel}>
				<form action={formAction} className={s.form}>
					<TextInput label="Email" type="email" name="email" block />
					<TextInput label="Password" type="password" name="password" block />
					<button type="button" className={s.forgotButton} onClick={() => setView("forgot")}>
						Forgot password?
					</button>

					{state?.error && <p className={s.error}>{state.error}</p>}

					<Button type="submit" loading={isPending}>
						Sign in
					</Button>
				</form>
				<div className={s.signUpPrompt}>
					{"Don't have an account?"}
					<button type="button" className={s.signUpButton} onClick={() => setView("register")}>
						Sign up
					</button>
				</div>
			</div>
		</div>
	);
}
