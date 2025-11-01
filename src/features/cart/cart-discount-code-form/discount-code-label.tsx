"use client";
import DiscountLabelIcon from "@/components/icons/discount-label";
import s from "./discount-code-label.module.css";
import { Button } from "react-aria-components";
import { startTransition, useActionState } from "react";
import { DiscountCodeActionResponse } from "../types";
import { removeDiscountCode } from "../actions";
import { CrossIcon, XIcon } from "lucide-react";

interface DiscountCodeLabelProps {
  code: string;
}

export default function DiscountCodeLabel({ code }: DiscountCodeLabelProps) {
  const intialState: DiscountCodeActionResponse = {
    success: false,
    errors: {},
  };
  const [removeState, removeFormAction, pendingRemove] = useActionState(
    removeDiscountCode,
    intialState
  );

  return (
    <li className={s.discountCodeLabel}>
      <div className={s.label}>
        <span className={s.labelIcon}>
          <DiscountLabelIcon width={18} height={18} />
        </span>
        <span className={s.code}>{code}</span>
        <Button
          className={s.removeButton}
          aria-label="Remove discount code"
          isDisabled={pendingRemove}
          onClick={() => startTransition(() => removeFormAction(code))}
        >
          <span className={s.crossIcon}>
            <XIcon size={16}/>
          </span>
        </Button>
      </div>
    </li>
  );
}
