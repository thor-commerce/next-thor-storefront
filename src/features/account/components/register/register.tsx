import { useResendCode } from "../use-resend-code";
import AuthField from "../auth-field";
import s from "../auth-form.module.css";
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
				<p className={s.subtitle}>Keep track of your orders and find your account details in one place.</p>
			</div>

			<div className={s.panel}>
				{state?.success && state.email ? (
					<Activate email={state.email} />
				) : (
					<form action={formAction} className={s.form} aria-busy={isPending}>
						<AuthField label="Email" type="email" name="email" autoComplete="email" required />

						{state?.error && (
							<p role="alert" className={s.error}>
								{state.error}
							</p>
						)}

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
	const {
		state: resendState,
		action: resendAction,
		isPending: isResending,
		cooldownSeconds,
	} = useResendCode(register);

	if (state?.success)
		return (
			<p role="status" className={s.hint}>
				Your account has been created. Sign in below to continue.
			</p>
		);

	return (
		<>
			<p className={s.activateIntro}>
				We’ve sent an activation code to <strong>{email}</strong>. Please check your inbox and complete your
				registration.
			</p>

			<form action={formAction} className={s.form} aria-busy={isPending}>
				<input type="hidden" name="email" value={email} />

				<div className={s.activationCodeRow}>
					<AuthField label="Activation Code" name="token" autoComplete="one-time-code" required />
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

				<AuthField label="First Name" name="firstName" autoComplete="given-name" required />
				<AuthField label="Last Name" name="lastName" autoComplete="family-name" required />
				<AuthField label="Password" type="password" name="password" autoComplete="new-password" required />
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
					Create account
				</Button>
			</form>
		</>
	);
}
