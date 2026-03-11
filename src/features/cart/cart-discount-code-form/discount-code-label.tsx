"use client";
import DiscountLabelIcon from "@/components/icons/discount-label";
import { useSafePendingState } from "@/hooks/use-safe-pending-state";
import { useRouter } from "next/navigation";
import s from "./discount-code-label.module.css";
import { Button } from "react-aria-components";
import { removeDiscountCode } from "../actions";
import { XIcon } from "lucide-react";

interface DiscountCodeLabelProps {
	code: string;
}

export default function DiscountCodeLabel({ code }: DiscountCodeLabelProps) {
	const router = useRouter();
	const { pending: pendingRemove, startPending, stopPending } = useSafePendingState();

  const handleRemove = async () => {
    if (pendingRemove) {
      return;
    }

    startPending();

    try {
      const response = await removeDiscountCode(null, code);
      if (response.success) {
        router.refresh();
      }
    } finally {
      stopPending();
    }
  };

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
					onClick={() => void handleRemove()}
				>
					<span className={s.crossIcon}>
						<XIcon size={16} />
					</span>
				</Button>
			</div>
		</li>
	);
}
