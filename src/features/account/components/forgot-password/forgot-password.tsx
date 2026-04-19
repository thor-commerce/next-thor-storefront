import Button from "@/components/button/button";
import TextInput from "@/components/text-input/text-input";
import {
	ForgotPasswordState,
	requestPasswordReset,
	resetPassword,
	ResetPasswordState,
} from "@/features/account/actions";
import { useActionState, useEffect, useState } from "react";
import s from "../register/register.module.css";

interface Props {
	setView: (view: "login" | "register" | "forgot") => void;
}

const RESEND_COOLDOWN_SECONDS = 30;

export default function ForgotPassword({ setView }: Props) {
	const [state, formAction, isPending] = useActionState<ForgotPasswordState, FormData>(requestPasswordReset, null);

	return (
		<div>
			<div className={s.header}>
				<h1 className={s.title}>Reset password</h1>
			</div>

			<div className={s.panel}>
				{state?.success && state.email ? (
					<ResetPasswordForm email={state.email} setView={setView} />
				) : (
					<form action={formAction} className={s.form}>
						<TextInput label="Email" type="email" name="email" block />

						{state?.error && <p className={s.error}>{state.error}</p>}

						<Button type="submit" loading={isPending}>
							Send reset code
						</Button>
					</form>
				)}

				<div className={s.signUpPrompt}>
					{"Remembered your password?"}
					<button type="button" className={s.signUpButton} onClick={() => setView("login")}>
						Sign in
					</button>
				</div>
			</div>
		</div>
	);
}

function ResetPasswordForm({ email, setView }: { email: string; setView: Props["setView"] }) {
	const [state, formAction, isPending] = useActionState<ResetPasswordState, FormData>(resetPassword, null);
	const [resendState, resendAction, isResending] = useActionState<ForgotPasswordState, FormData>(
		requestPasswordReset,
		null
	);
	const [cooldownSeconds, setCooldownSeconds] = useState(RESEND_COOLDOWN_SECONDS);

	useEffect(() => {
		if (cooldownSeconds <= 0) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			setCooldownSeconds((currentSeconds) => currentSeconds - 1);
		}, 1000);

		return () => window.clearTimeout(timeoutId);
	}, [cooldownSeconds]);

	if (state?.success) {
		return (
			<>
				<p className={s.activateIntro}>
					Your password has been reset for <strong>{email}</strong>.
				</p>

				<Button type="button" onClick={() => setView("login")}>
					Back to sign in
				</Button>
			</>
		);
	}

	return (
		<>
			<p className={s.activateIntro}>
				We’ve sent a reset code to <strong>{email}</strong>. Enter it below to choose a new password.
			</p>

			<form action={formAction} className={s.form}>
				<input type="hidden" name="email" value={email} />

				<div className={s.activationCodeRow}>
					<TextInput label="Reset Code" name="token" block />
					<button
						type="submit"
						formAction={resendAction}
						formNoValidate
						className={s.resendButton}
						disabled={isResending || cooldownSeconds > 0}
						onClick={() => setCooldownSeconds(RESEND_COOLDOWN_SECONDS)}
					>
						{isResending ? "Resending…" : cooldownSeconds > 0 ? `↻ Resend in ${cooldownSeconds}s` : "↻ Resend"}
					</button>
				</div>

				<TextInput label="New Password" type="password" name="password" block />
				<TextInput label="Confirm Password" type="password" name="confirmPassword" block />

				<ul className={s.passwordHints}>
					<li>8 characters</li>
					<li>One uppercase letter and one number</li>
					<li>One special character (eg. $ # !)</li>
				</ul>

				{state?.error && <p className={s.error}>{state.error}</p>}
				{resendState?.success && <p className={s.hint}>A new code has been sent.</p>}

				<Button type="submit" loading={isPending}>
					Reset password
				</Button>
			</form>
		</>
	);
}
