"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Button from "@/components/button/button";
import { addItem } from "../actions";

interface Props {
  selectedVariantId: string;
  className?: string;
  disabled?: boolean;
}

function AddToCartButton({ className, selectedVariantId, disabled }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formAction] = useActionState(addItem, null);

  return (
    <form className={className} action={formAction}>
      <input type="hidden" name="variantId" value={selectedVariantId} />
      <SubmitButton disabled={disabled} />
    </form>
  );
}

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  const isButtonDisabled = disabled || pending;

  return (
    <Button block type="submit" disabled={isButtonDisabled} loading={pending}>
      Add to cart
    </Button>
  );
}

AddToCartButton.displayName = "AddToCartButton";
export default AddToCartButton;
