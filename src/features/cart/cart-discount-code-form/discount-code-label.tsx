"use client";
import DiscountLabelIcon from "@/components/icons/discount-label";
import { Button } from "react-aria-components";
import { XIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { removeDiscountCode } from "../actions";
import s from "./discount-code-label.module.css";

interface DiscountCodeLabelProps {
	code: string;
}

export default function DiscountCodeLabel({ code }: DiscountCodeLabelProps) {
	return (
		<li className={s.discountCodeLabel}>
			<form action={removeDiscountCode} className={s.label}>
				<input type="hidden" name="code" value={code} />
				<span className={s.labelIcon}>
					<DiscountLabelIcon width={18} height={18} />
				</span>
				<span className={s.code}>{code}</span>
				<SubmitButton />
			</form>
		</li>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			className={s.removeButton}
			aria-label="Remove discount code"
			isDisabled={pending}
		>
			<span className={s.crossIcon}>
				<XIcon size={16} />
			</span>
		</Button>
	);
}
