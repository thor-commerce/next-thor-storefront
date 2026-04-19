import { formatMoney } from "@/utils/money";
import clsx from "clsx";
import Navigation from "../navigation/navigation";
import ThorImage from "../thor-image/thor-image";
import s from "./product-list.module.css";
import { ProductListTileFragment } from "@/lib/thorcommerce/storefront/generated/types.generated";

type Props = {
	item: ProductListTileFragment;
};

export default function ProductListTile({ item }: Props) {
	const minPrice = item.priceRange?.minPrice;
	const discountedPrice = minPrice?.discountedPrice;
	const discountValue = discountedPrice?.discount?.value;

	let discountLabel: string | null = null;

	if (discountedPrice && minPrice?.value) {
		switch (discountValue?.__typename) {
			case "ProductDiscountAbsoluteValue": {
				const formattedDiscount = formatMoney({
					money: {
						centAmount: minPrice.value.centAmount - discountedPrice.value.centAmount,
						currencyCode: minPrice.value.currencyCode,
						fractionDigits: minPrice.value.fractionDigits,
					},
				});
				if (formattedDiscount) {
					discountLabel = `${formattedDiscount} off`;
				}
				break;
			}
			case "ProductDiscountRelativeValue": {
				const factor = Number(discountValue.factor);
				if (Number.isFinite(factor) && factor > 0) {
					const percentOff = Math.round(factor * 100);
					if (percentOff > 0) {
						discountLabel = `${percentOff}% off`;
					}
				}
				break;
			}
		}
	}

	return (
		<li className={s.tile}>
			<Navigation href={`/products/${item.slug}`} className={s.linkWrapper}>
				<div className={s.imageWrapper}>
					<ThorImage
						src={item.heroVariant?.image?.src ?? ""}
						alt={item.name}
						sizes="33vw"
						fill
						className={s.productImage}
					/>
				</div>
				<div className={s.productInfo}>{item.name}</div>

				{minPrice && (
					<div className={s.productPriceInfo}>
						<div className={s.productPriceWrapper}>
							<div aria-hidden="true" className={clsx(s.productPrice, s.isCurrentPrice)}>
								{formatMoney({
									money: discountedPrice ? discountedPrice.value : minPrice.value,
								})}
							</div>
							{discountedPrice && (
								<div className={clsx(s.productPrice, s.isStrikedOut)} aria-hidden="true">
									{formatMoney({
										money: minPrice.value,
									})}
								</div>
							)}
						</div>
						{discountLabel && <div className={s.discountLabel}>{discountLabel}</div>}
					</div>
				)}
			</Navigation>
		</li>
	);
}
