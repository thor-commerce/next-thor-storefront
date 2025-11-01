"use client";
import { useActionState, useMemo } from "react";
import { updateItemQuantity } from "../actions";
import PlusIcon from "@/components/icons/plus";
import SubtractIcon from "@/components/icons/subtract";
import clsx from "clsx";
import s from "./cart-line-items.module.css";
import { useFormStatus } from "react-dom";
import { CartLineItemType } from "../types";
import { gql } from "@/__generated__/thor";
import { FragmentType } from "@apollo/client";
import { EditItemQuantityButtonFragment } from "@/__generated__/thor/graphql";
import { useSuspenseFragment } from "@apollo/client/react";

const EDIT_ITEM_QUANTITY_BUTTON_FRAGMENT = gql(/* GraphQL */ `
  fragment EditItemQuantityButton on CartLineItem {
    id
    quantity
    variant {
      availability {
        availableForPurchase
        availableQuantity
        stockPolicy
      }
    }
  }
`);

export default function EditItemQuantityButton({
  itemFragment,
  type,
}: {
  itemFragment: FragmentType<EditItemQuantityButtonFragment>;
  type: "increase" | "decrease";
}) {
  const { data: item } = useSuspenseFragment({
    from: itemFragment,
    fragment: EDIT_ITEM_QUANTITY_BUTTON_FRAGMENT,
    fragmentName: "EditItemQuantityButton",
  });
  const [_, formAction] = useActionState(updateItemQuantity, null);
  const payload = {
    lineId: item.id,
    quantity: type === "increase" ? item.quantity + 1 : item.quantity - 1,
  };
  const actionWithVariant = formAction.bind(null, payload);

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
    <form action={actionWithVariant}>
      <SubmitButton type={type} disabled={disabled} />
    </form>
  );
}

function SubmitButton({
  type,
  disabled = false,
}: {
  type: "increase" | "decrease";
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending || disabled) e.preventDefault();
      }}
      aria-label={
        type === "increase" ? "Increase item quantity" : "Reduce item quantity"
      }
      aria-disabled={pending || disabled}
      disabled={pending || disabled}
      className={clsx(s.quantityButton)}
    >
      {type === "increase" ? <PlusIcon /> : <SubtractIcon />}
    </button>
  );
}
