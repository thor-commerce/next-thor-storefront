import s from "../auth-form.module.css";
import Button from "@/components/button/button";
import { useActionState, useId, useState } from "react";
import { login, LoginState } from "@/features/account/actions";

interface Props {
	setView: (view: "login" | "register" | "forgot") => void;
}

export default function Login({ setView }: Props) {
	const passwordId = useId();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [state, formAction, isPending] = useActionState<LoginState, FormData>(login, null);

	return (
		<div>
			<div className={s.header}>
				<h1 className={s.title}>Sign in</h1>
				<p className={s.subtitle}>Access your account, order history, and saved addresses.</p>
			</div>

			<div className={s.panel}>
				<form action={formAction} className={s.form} aria-busy={isPending}>
					<label className={s.field}>
						<span>Email address</span>
						<input
							type="email"
							name="email"
							autoComplete="username"
							required
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							aria-describedby={state?.error ? "login-error" : undefined}
						/>
					</label>
					<div className={s.field}>
						<label htmlFor={passwordId}>Password</label>
						<span className={s.passwordField}>
							<input
								id={passwordId}
								type={showPassword ? "text" : "password"}
								name="password"
								autoComplete="current-password"
								required
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								aria-describedby={state?.error ? "login-error" : undefined}
							/>
							<button
								type="button"
								className={s.passwordToggle}
								onClick={() => setShowPassword((shown) => !shown)}
								aria-label={showPassword ? "Hide password" : "Show password"}
							>
								{showPassword ? "Hide" : "Show"}
							</button>
						</span>
					</div>
					<button type="button" className={s.forgotButton} onClick={() => setView("forgot")}>
						Forgot password?
					</button>

					{state?.error && (
						<p id="login-error" role="alert" className={s.error}>
							{state.error}
						</p>
					)}

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
