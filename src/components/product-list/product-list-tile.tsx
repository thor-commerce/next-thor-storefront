import { formatMoney } from "@/utils/money";
import clsx from "clsx";
import Navigation from "../navigation/navigation";
import ThorImage from "../thor-image/thor-image";
import s from "./product-list.module.css";
import { ProductListTileFragment } from "@/lib/thorcommerce/storefront/generated/types.generated";
import Text from "@/components/text/text";
import { getPriceDetails } from "@/utils/price";

type Props = {
	item: ProductListTileFragment;
	useMaxPrice?: boolean;
};

export default function ProductListTile({ item, useMaxPrice = false }: Props) {
	const minPrice = item.priceRange?.minPrice;
	const maxPrice = item.priceRange?.maxPrice;
	const selectedPrice = useMaxPrice ? (maxPrice ?? minPrice) : (minPrice ?? maxPrice);

	const priceDetails = selectedPrice ? getPriceDetails(selectedPrice) : null;

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
				<Text size={"body-2"} weight={"medium"} as="div" className={s.productInfo}>
					{item.name}
				</Text>

				{priceDetails && (
					<div className={s.productPriceInfo}>
						<div className={s.productPriceWrapper}>
							<div aria-hidden="true" className={clsx(s.productPrice, s.isCurrentPrice)}>
								{formatMoney({
									money: priceDetails.currentPrice,
								})}
							</div>
							{priceDetails.isDiscounted && (
								<div className={clsx(s.productPrice, s.isStrikedOut)} aria-hidden="true">
									{formatMoney({
										money: priceDetails.initialPrice,
									})}
								</div>
							)}
						</div>
						{priceDetails.isDiscounted && <div className={s.discountLabel}>{priceDetails.discountLabel}</div>}
					</div>
				)}
			</Navigation>
		</li>
	);
}
