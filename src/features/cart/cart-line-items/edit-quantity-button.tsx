"use client";
import PlusIcon from "@/components/icons/plus";
import SubtractIcon from "@/components/icons/subtract";
import Spinner from "@/components/spinner/spinner";
import { useSafePendingState } from "@/hooks/use-safe-pending-state";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useMemo } from "react";
import { updateItemQuantity } from "../actions";
import { CartLineItemType } from "../types";
import s from "./cart-line-items.module.css";



export default function EditItemQuantityButton({
  item,
  type,
}: {
  item: CartLineItemType;
  type: "increase" | "decrease";
}) {
  const router = useRouter();
  const { pending, startPending, stopPending } = useSafePendingState();
  const payload = {
    lineId: item.id,
    quantity: type === "increase" ? item.quantity + 1 : item.quantity - 1,
  };

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

  const handleUpdate = async () => {
    if (pending || disabled) {
      return;
    }

    startPending();

    try {
      await updateItemQuantity(null, payload);
      router.refresh();
    } finally {
      stopPending();
    }
  };

  return (
    <SubmitButton
      type={type}
      disabled={disabled}
      pending={pending}
      onPress={handleUpdate}
    />
  );
}

function SubmitButton({
  type,
  disabled = false,
  pending,
  onPress,
}: {
  type: "increase" | "decrease";
  disabled?: boolean;
  pending: boolean;
  onPress: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending || disabled) {
          e.preventDefault();
          return;
        }

        void onPress();
      }}
      aria-label={
        type === "increase" ? "Increase item quantity" : "Reduce item quantity"
      }
      aria-disabled={pending || disabled}
      disabled={pending || disabled}
      className={clsx(s.quantityButton)}
    >
      {!pending ? (type === "increase" ? <PlusIcon /> : <SubtractIcon />) : <Spinner size="small" />}
    </button>
  );
}
