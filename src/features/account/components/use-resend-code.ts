"use client";

import { useActionState, useEffect, useState } from "react";

type EmailCodeState = { success?: boolean; error?: string; email?: string } | null;
type SendCodeAction = (state: EmailCodeState, data: FormData) => Promise<EmailCodeState>;
const COOLDOWN_SECONDS = 30;

// Mounted only after the initial email has been sent successfully.
export function useResendCode(sendCode: SendCodeAction) {
	const [cooldownSeconds, setCooldownSeconds] = useState(COOLDOWN_SECONDS);
	const [state, action, isPending] = useActionState<EmailCodeState, FormData>(async (previous, data) => {
		const result = await sendCode(previous, data);
		if (result?.success) setCooldownSeconds(COOLDOWN_SECONDS);
		return result;
	}, null);

	useEffect(() => {
		if (cooldownSeconds <= 0) return;
		const timeout = window.setTimeout(() => setCooldownSeconds((seconds) => Math.max(0, seconds - 1)), 1000);
		return () => window.clearTimeout(timeout);
	}, [cooldownSeconds]);

	return { state, action, isPending, cooldownSeconds };
}
