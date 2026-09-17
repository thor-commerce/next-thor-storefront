import { useResendCode } from "../use-resend-code";
import Button from "@/components/button/button";
import AuthField from "../auth-field";
import {
	ForgotPasswordState,
	requestPasswordReset,
	resetPassword,
	ResetPasswordState,
} from "@/features/account/actions";
import { useActionState } from "react";
import s from "../auth-form.module.css";

interface Props {
	setView: (view: "login" | "register" | "forgot") => void;
}

export default function ForgotPassword({ setView }: Props) {
	const [state, formAction, isPending] = useActionState<ForgotPasswordState, FormData>(
		requestPasswordReset,
		null,
	);

	return (
		<div>
			<div className={s.header}>
				<h1 className={s.title}>Reset password</h1>
				{!state?.success && (
					<p className={s.subtitle}>
						Enter your email address and we’ll send you a code to reset your password.
					</p>
				)}
			</div>

			<div className={s.panel}>
				{state?.success && state.email ? (
					<ResetPasswordForm email={state.email} setView={setView} />
				) : (
					<form action={formAction} className={s.form} aria-busy={isPending}>
						<AuthField label="Email" type="email" name="email" autoComplete="email" required />

						{state?.error && (
							<p role="alert" className={s.error}>
								{state.error}
							</p>
						)}

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
	const {
		state: resendState,
		action: resendAction,
		isPending: isResending,
		cooldownSeconds,
	} = useResendCode(requestPasswordReset);

	if (state?.success) {
		return (
			<>
				<p className={s.activateIntro}>
					Your password has been reset for <strong>{email}</strong>.
				</p>

				<Button type="button" className={s.successButton} onClick={() => setView("login")}>
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

			<form action={formAction} className={s.form} aria-busy={isPending}>
				<input type="hidden" name="email" value={email} />

				<div className={s.activationCodeRow}>
					<AuthField label="Reset Code" name="token" autoComplete="one-time-code" required />
					<button
						type="submit"
						formAction={resendAction}
						formNoValidate
						className={s.resendButton}
						disabled={isResending || cooldownSeconds > 0}
					>
						{isResending ? "Resending…" : cooldownSeconds > 0 ? `Resend in ${cooldownSeconds}s` : "Resend"}
					</button>
				</div>

				<AuthField
					label="New Password"
					type="password"
					name="password"
					autoComplete="new-password"
					required
				/>
				<AuthField
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					autoComplete="new-password"
					required
				/>

				<ul className={s.passwordHints}>
					<li>At least 8 characters</li>
					<li>One uppercase letter and one number</li>
					<li>One special character (eg. $ # !)</li>
				</ul>

				{state?.error && (
					<p role="alert" className={s.error}>
						{state.error}
					</p>
				)}
				{resendState?.error && (
					<p role="alert" className={s.error}>
						{resendState.error}
					</p>
				)}
				{resendState?.success && (
					<p role="status" className={s.hint}>
						A new code has been sent.
					</p>
				)}

				<Button type="submit" loading={isPending}>
					Reset password
				</Button>
			</form>
		</>
	);
}
