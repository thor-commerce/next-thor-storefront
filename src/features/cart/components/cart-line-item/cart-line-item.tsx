"use client";

import { useState } from "react";
import DiscountLabelIcon from "@/components/icons/discount-label";
import Navigation from "@/components/navigation/navigation";
import ThorImage from "@/components/thor-image/thor-image";
import { mapEdgesToItems } from "@/utils/maps";
import { formatMoney } from "@/utils/money";
import clsx from "clsx";
import { CartLineItemType } from "../../types";
import s from "./cart-line-item.module.css";
import EditItemQuantityButton from "./edit-quantity-button";
import { RemoveItemButton } from "./remove-line-item-button";

export default function CartLineItem({ line }: { line: CartLineItemType }) {
	const [error, setError] = useState<string | null>(null);
	const attributesText = line.variant?.selectedAttributes
		.map((selectedAttr) => selectedAttr.value)
		.filter(Boolean)
		.join(", ");

	const originalPrice = line.unitPrice.value;

	const discountApplications = mapEdgesToItems(line.discountApplications);

	const discountedLinePriceCentAmount = line.total.centAmount;

	const originalLinePriceCentAmount = originalPrice.centAmount * line.quantity;
	const isDiscounted = originalLinePriceCentAmount !== discountedLinePriceCentAmount;

	return (
		<li className={s.cartLineItem}>
			<div className={s.lineRow}>
				<div className={s.productThumbnail}>
					<div className={s.thumbnailWrapper}>
						<ThorImage src={line.variant?.image?.src ?? ""} alt={line.variantName} fill sizes="144px" />
					</div>
				</div>
				<div className={s.productInfo}>
					<div className={s.productInfoWrapper}>
						<div className={s.productDetails}>
							<div>
								<Navigation
									href={`/products/${line.productSlug}${line.variant?.id ? `?variant=${encodeURIComponent(line.variant.id)}` : ""}`}
								>
									{line.productName}
								</Navigation>
								<div className={s.attributesText}>{attributesText}</div>
								{discountApplications.length > 0 && (
									<div className={s.discountLabelContainer}>
										{discountApplications.map((app) => (
											<div key={app.label} className={s.discountLabel}>
												<DiscountLabelIcon />
												{app.label}
											</div>
										))}
									</div>
								)}
							</div>
							<div className={s.lineItemControls}>
								<div className={s.quantityControls}>
									<EditItemQuantityButton item={line} onError={setError} type="decrease" />
									<span className={s.quantity}>{line.quantity}</span>
									<EditItemQuantityButton item={line} onError={setError} type="increase" />
								</div>
							</div>
						</div>
						<div className={s.priceColumn}>
							<RemoveItemButton lineItemId={line.id} onError={setError} />
							<div
								className={clsx(s.linePrice, {
									[s.linePriceStacked]: isDiscounted,
								})}
							>
								{isDiscounted && (
									<span className={clsx(s.subtotal, s.strikeThrough)}>
										{formatMoney({
											minimumFractionDigits: originalPrice.fractionDigits,
											maximumFractionDigits: originalPrice.fractionDigits,
											money: {
												...originalPrice,
												centAmount: originalLinePriceCentAmount,
											},
										})}
									</span>
								)}
								<span className={s.total}>
									{formatMoney({
										minimumFractionDigits: originalPrice.fractionDigits,
										maximumFractionDigits: originalPrice.fractionDigits,
										money: {
											...line.total,
											centAmount: discountedLinePriceCentAmount,
										},
									})}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			{error && (
				<p role="alert" className={s.error}>
					{error}
				</p>
			)}
		</li>
	);
}
