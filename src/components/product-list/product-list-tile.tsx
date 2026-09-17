"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { getColorPackshots, filterColorPackshots } from "./color-variants";
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
	lcp?: boolean;
};

export default function ProductListTile({ item, useMaxPrice = false, lcp }: Props) {
	const searchParams = useSearchParams();
	const selectedColors = searchParams.getAll("attributes.color");
	const filterKey = JSON.stringify(selectedColors);
	const [preview, setPreview] = useState<{ filterKey: string; id: string } | null>(null);
	const colors = getColorPackshots(
		item.colorVariants.edges?.map(({ node }) => node) ?? [],
		item.heroVariant?.id,
	);
	const visibleColors = filterColorPackshots(colors, selectedColors);
	const activeColor =
		(preview?.filterKey === filterKey && visibleColors.find((color) => color.id === preview.id)) ||
		visibleColors.find((color) => color.variant.id === item.heroVariant?.id) ||
		visibleColors[0];
	const variant = activeColor?.variant;
	const href = `/products/${item.slug}${variant ? `?${new URLSearchParams({ variant: variant.id })}` : ""}`;
	const minPrice = item.priceRange?.minPrice;
	const maxPrice = item.priceRange?.maxPrice;
	const selectedPrice = variant?.price ?? (useMaxPrice ? (maxPrice ?? minPrice) : (minPrice ?? maxPrice));

	const priceDetails = selectedPrice ? getPriceDetails(selectedPrice) : null;

	return (
		<li className={s.tile}>
			<Navigation href={href} className={s.linkWrapper}>
				<div className={s.imageWrapper}>
					<ThorImage
						src={variant ? (variant.image?.src ?? "") : (item.heroVariant?.image?.src ?? "")}
						alt={activeColor ? `${item.name} — ${activeColor.label}` : item.name}
						sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1856px) 27vw, 510px"
						fill
						className={s.productImage}
						priority={lcp}
					/>
				</div>
			</Navigation>
			{colors.length > 1 && visibleColors.length > 0 && (
				<div className={s.colorPackshots} role="group" aria-label={`${item.name} colors`}>
					{visibleColors.map((color) => (
						<Navigation
							key={color.id}
							href={`/products/${item.slug}?${new URLSearchParams({ variant: color.variant.id })}`}
							className={s.colorPackshot}
							aria-label={`${item.name} — ${color.label}`}
							title={color.label}
							onMouseEnter={() => setPreview({ filterKey, id: color.id })}
							onFocus={() => setPreview({ filterKey, id: color.id })}
						>
							{color.variant.image ? (
								<ThorImage src={color.variant.image.src} alt="" fill sizes="48px" />
							) : (
								<span>{color.label}</span>
							)}
						</Navigation>
					))}
				</div>
			)}
			<Navigation href={href} className={s.productDetailsLink}>
				<Text size={"body-2"} weight={"medium"} as="div" className={s.productInfo}>
					{item.name}
				</Text>

				{priceDetails && (
					<div className={s.productPriceInfo}>
						<div className={s.productPriceWrapper}>
							<div className={clsx(s.productPrice, s.isCurrentPrice)}>
								{formatMoney({
									money: priceDetails.currentPrice,
								})}
							</div>
							{priceDetails.isDiscounted && (
								<div className={clsx(s.productPrice, s.isStrikedOut)}>
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
