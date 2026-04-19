import TextInput from "@/components/text-input/text-input";
import s from "./register.module.css";
import Button from "@/components/button/button";
import { useActionState } from "react";
import { activate, ActivateState, register, RegisterState } from "@/features/account/actions";

interface Props {
	setView: (view: "login" | "register" | "forgot") => void;
}

export default function Register({ setView }: Props) {
	const [state, formAction, isPending] = useActionState<RegisterState, FormData>(register, null);

	return (
		<div>
			<div className={s.header}>
				<h1 className={s.title}>Create account</h1>
			</div>

			<div className={s.panel}>
				{state?.success && state.email ? (
					<Activate email={state.email} />
				) : (
					<form action={formAction} className={s.form}>
						<TextInput label="Email" type="email" name="email" block />

						{state?.error && <p className={s.error}>{state.error}</p>}

						<Button type="submit" loading={isPending}>
							Continue
						</Button>
					</form>
				)}

				<div className={s.signUpPrompt}>
					{"Already a member?"}
					<button type="button" className={s.signUpButton} onClick={() => setView("login")}>
						Sign in
					</button>
				</div>
			</div>
		</div>
	);
}

function Activate({ email }: { email: string }) {
	const [state, formAction, isPending] = useActionState<ActivateState, FormData>(activate, null);
	const [resendState, resendAction, isResending] = useActionState<RegisterState, FormData>(register, null);

	return (
		<>
			<p className={s.activateIntro}>
				We’ve sent a activation code to <strong>{email}</strong>. Please check your inbox and complete your
				registration.
			</p>

			<form action={formAction} className={s.form}>
				<input type="hidden" name="email" value={email} />

				<div className={s.activationCodeRow}>
					<TextInput label="Activation Code" name="token" block />
					<button
						type="submit"
						formAction={resendAction}
						formNoValidate
						className={s.resendButton}
						disabled={isResending}
					>
						{isResending ? "Resending…" : "↻ Resend"}
					</button>
				</div>

				<TextInput label="First Name" name="firstName" block />
				<TextInput label="Last Name" name="lastName" block />
				<TextInput label="Password" type="password" name="password" block />
				<TextInput label="Confirm Password" type="password" name="confirmPassword" block />

				<ul className={s.passwordHints}>
					<li>8 characters</li>
					<li>One uppercase letter and one number</li>
					<li>One special character (eg. $ # !)</li>
				</ul>

				{state?.error && <p className={s.error}>{state.error}</p>}
				{resendState?.success && <p className={s.hint}>A new code has been sent.</p>}

				<Button type="submit" loading={isPending}>
					Create account
				</Button>
			</form>
		</>
	);
}
