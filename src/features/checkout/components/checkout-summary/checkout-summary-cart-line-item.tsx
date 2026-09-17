import ThorImage from "@/components/thor-image/thor-image";
import { formatMoney } from "@/utils/money";
import clsx from "clsx";

import s from "./checkout-summary.module.css";
import { TaxBehavior } from "@/lib/thorcommerce/storefront/generated/types.generated";
import { CheckoutSummaryLineItem } from "@/features/checkout/types";

export default function CheckoutSummaryCartLineItem({ line }: { line: CheckoutSummaryLineItem }) {
	const attributesText = line.variant?.selectedAttributes
		.map((selectedAttr) => selectedAttr.value)
		.filter(Boolean)
		.join(", ");

	const originalPrice = line.unitPrice.value;

	const displayTotal = line.taxedPrice
		? line.taxBehavior === TaxBehavior.Exclusive
			? line.taxedPrice.net
			: line.taxedPrice.gross
		: line.total;
	const isDiscounted = originalPrice.centAmount * line.quantity > displayTotal.centAmount;

	return (
		<div role="row" className={s.item}>
			<div className={s.imageCell} role="cell">
				<ThorImage
					src={line.variant?.image?.src ?? ""}
					className={s.image}
					fill
					sizes="100px"
					alt={line.variantName || "Product image"}
				/>
			</div>
			<div className={s.itemDetails} role="cell">
				<div>
					<p className={s.title}>{line.productName}</p>
					<div>
						<p className={s.attributes}>{attributesText}</p>
					</div>
				</div>
				<p className={s.quantity}>Quantity: {line.quantity}</p>
			</div>
			<div className={s.unitPriceCell} role="cell">
				{isDiscounted && (
					<span className={clsx(s.subtotal, s.strikeThrough)}>
						{formatMoney({
							minimumFractionDigits: 0,
							maximumFractionDigits: 2,
							money: {
								...originalPrice,
								centAmount: originalPrice.centAmount * line.quantity,
							},
						})}
					</span>
				)}
				<span className={s.total}>
					{formatMoney({
						minimumFractionDigits: 0,
						maximumFractionDigits: 2,
						money: displayTotal,
					})}
				</span>
			</div>
		</div>
	);
}
