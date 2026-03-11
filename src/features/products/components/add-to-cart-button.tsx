"use client";

import Button from "@/components/button/button";
import { useFormStatus } from "react-dom";
import { addItem } from "../actions";

interface Props {
  selectedVariantId: string;
  className?: string;
  disabled?: boolean;
}

function AddToCartButton({ className, selectedVariantId, disabled }: Props) {
  return (
    <form action={addItem}>
      <input type="hidden" name="variantId" value={selectedVariantId} />
      <SubmitButton className={className} disabled={disabled} />
    </form>
  );
}

function SubmitButton({
  className,
  disabled,
}: Pick<Props, "className" | "disabled">) {
  const { pending } = useFormStatus();

  return (
    <Button
      block
      type="submit"
      className={className}
      disabled={disabled}
      loading={pending}
    >
      Add to cart
    </Button>
  );
}

AddToCartButton.displayName = "AddToCartButton";
export default AddToCartButton;
