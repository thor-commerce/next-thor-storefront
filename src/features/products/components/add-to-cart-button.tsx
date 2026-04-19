"use client";

import Button from "@/components/button/button";
import { addItem } from "@/features/cart/actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

interface Props {
	selectedVariantId: string;
	className?: string;
	disabled?: boolean;
}

function AddToCartButton({ className, selectedVariantId, disabled }: Props) {
	const [, formAction] = useActionState(addItem, null);
	const addItemAction = formAction.bind(null, selectedVariantId);

	return (
		<form action={addItemAction}>
			<SubmitButton className={className} disabled={disabled} />
		</form>
	);
}

function SubmitButton({ className, disabled }: Pick<Props, "className" | "disabled">) {
	const { pending } = useFormStatus();

	return (
		<Button block type="submit" className={className} disabled={disabled} loading={pending}>
			Add to cart
		</Button>
	);
}

AddToCartButton.displayName = "AddToCartButton";
export default AddToCartButton;
