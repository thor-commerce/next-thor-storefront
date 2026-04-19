"use client";
import PlusIcon from "@/components/icons/plus";
import SubtractIcon from "@/components/icons/subtract";
import Spinner from "@/components/spinner/spinner";
import clsx from "clsx";
import { useActionState, useMemo } from "react";
import { useFormStatus } from "react-dom";
import { updateItemQuantity } from "../../actions";
import { CartLineItemType } from "../../types";
import s from "./cart-line-item.module.css";

export default function EditItemQuantityButton({
	item,
	type,
}: {
	item: CartLineItemType;
	type: "increase" | "decrease";
}) {
	const payload = {
		lineItemId: item.id,
		quantity: type === "increase" ? item.quantity + 1 : item.quantity - 1,
	};

	const [, formAction] = useActionState(updateItemQuantity, null);

	const updateItemQuantityAction = formAction.bind(null, payload);

	const disabled = useMemo(() => {
		if (!item.variant?.availability) return true;
		switch (type) {
			case "increase":
				return item.variant.availability.availableQuantity <= item.quantity;
			case "decrease":
				return item.quantity <= 1;
			default:
				return true;
		}
	}, [item, type]);

	return (
		<form action={updateItemQuantityAction}>
			<SubmitButton type={type} disabled={disabled} />
		</form>
	);
}

function SubmitButton({ type, disabled = false }: { type: "increase" | "decrease"; disabled?: boolean }) {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			aria-label={type === "increase" ? "Increase item quantity" : "Reduce item quantity"}
			aria-disabled={pending || disabled}
			disabled={pending || disabled}
			className={clsx(s.quantityButton)}
		>
			{!pending ? type === "increase" ? <PlusIcon /> : <SubtractIcon /> : <Spinner size="small" />}
		</button>
	);
}
