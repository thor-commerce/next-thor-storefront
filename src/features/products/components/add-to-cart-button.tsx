"use client";

import Button from "@/components/button/button";
import { useSafePendingState } from "@/hooks/use-safe-pending-state";
import { useRouter } from "next/navigation";
import { addItem } from "../actions";

interface Props {
  selectedVariantId: string;
  className?: string;
  disabled?: boolean;
}

function AddToCartButton({ className, selectedVariantId, disabled }: Props) {
  const router = useRouter();
  const { pending, startPending, stopPending } = useSafePendingState();
  const isButtonDisabled = disabled || pending;

  const handleAddToCart = async () => {
    if (isButtonDisabled) {
      return;
    }

    startPending();

    try {
      const formData = new FormData();
      formData.set("variantId", selectedVariantId);
      await addItem(null, formData);
      router.refresh();
    } finally {
      stopPending();
    }
  };

  return (
    <Button
      block
      type="button"
      className={className}
      disabled={isButtonDisabled}
      loading={pending}
      onClick={() => void handleAddToCart()}
    >
      Add to cart
    </Button>
  );
}

AddToCartButton.displayName = "AddToCartButton";
export default AddToCartButton;
