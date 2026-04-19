"use client";

import Navigation from "@/components/navigation/navigation";
import ThorImage from "@/components/thor-image/thor-image";
import clsx from "clsx";
import { useState } from "react";
import AddToCartButton from "../components/add-to-cart-button";
import s from "./product-block.module.css";
import { ProductDetail, ProductDetailVariant } from "@/lib/thorcommerce/types";
import { removeEdgesAndNodes } from "@/lib/thorcommerce/utils";
type Props = {
	product: ProductDetail;
	selectedVariant: ProductDetailVariant;
};

export default function ProductBlock({ product, selectedVariant }: Props) {
	const media = removeEdgesAndNodes(selectedVariant.media);
	// const categories = removeEdgesAndNodes(product.categories);
	// const collections = removeEdgesAndNodes(product.collections);
	const [activeMediaIndex, setActiveMediaIndex] = useState(0);
	// const heroMedia = media[activeMediaIndex] ??
	// 	media.find(Boolean) ?? {
	// 		src: selectedVariant.image?.src ?? "",
	// 	};
	// const price = selectedVariant.price;

	// const primaryCategory = categories.find(Boolean);
	// const primaryCollection = collections.find(Boolean);
	// const breadcrumbItems = primaryCategory
	// 	? [
	// 			{ label: "Products", href: "/products" },
	// 			...primaryCategory.ancestors.map((ancestor) => ({
	// 				label: ancestor.name,
	// 				href: `/categories/${ancestor.slug}`,
	// 			})),
	// 			{
	// 				label: primaryCategory.name,
	// 				href: `/categories/${primaryCategory.slug}`,
	// 			},
	// 		]
	// 	: primaryCollection
	// 		? [
	// 				{ label: "Products", href: "/products" },
	// 				{ label: primaryCollection.name, href: `/collections/${primaryCollection.slug}` },
	// 			]
	// 		: [{ label: "Products", href: "/products" }];

	// const discountedPrice = price?.discountedPrice;
	// const discountValue = discountedPrice?.discount?.value;
	// let discountLabel: string | null = null;

	// if (discountedPrice && price?.value) {
	// 	switch (discountValue?.__typename) {
	// 		case "ProductDiscountAbsoluteValue": {
	// 			const formattedDiscount = formatMoney({
	// 				money: {
	// 					centAmount: price.value.centAmount - discountedPrice.value.centAmount,
	// 					currencyCode: price.value.currencyCode,
	// 					fractionDigits: price.value.fractionDigits,
	// 				},
	// 			});
	// 			if (formattedDiscount) {
	// 				discountLabel = `${formattedDiscount} off`;
	// 			}
	// 			break;
	// 		}
	// 		case "ProductDiscountRelativeValue": {
	// 			const factor = Number(discountValue.factor);
	// 			if (Number.isFinite(factor) && factor > 0) {
	// 				const percentOff = Math.round(factor * 100);
	// 				if (percentOff > 0) {
	// 					discountLabel = `${percentOff}% off`;
	// 				}
	// 			}
	// 			break;
	// 		}
	// 	}
	// }

	return (
		<div className={s.productBlockContainer}>
			<div className={s.productBlockMediaContainer}>
				<div className={s.productBlockMediaCarousel}>
					<div className={s.productMediaThumbRail}>
						{media.map((item, index) => (
							<button
								key={`${item.src}-${index}`}
								type="button"
								className={clsx(s.productMediaThumbButton, {
									[s.isActiveThumb]: index === activeMediaIndex,
								})}
								onClick={() => setActiveMediaIndex(index)}
								aria-label={`Show product image ${index + 1}`}
							>
								<span className={s.productMediaThumb}>
									<ThorImage
										src={item.src ?? ""}
										alt={product.name}
										fill
										sizes="80px"
										className={s.productMediaThumbImage}
									/>
								</span>
							</button>
						))}
					</div>
					<div className={s.productMediaWrapper}>
						{/* <ThorImage src={heroMedia?.src ?? ""} alt={product.name} fill className={s.productBlockImage} /> */}
					</div>
				</div>
			</div>
			<div className={s.productBlockProductDetailContainer}>
				<div className={s.productInfo}>
					<nav className={s.breadcrumbs} aria-label="Breadcrumb">
						<ol className={s.breadcrumbList}>
							<li className={s.breadcrumbItem}>
								<Navigation href="/">Home</Navigation>
							</li>
							{/* {breadcrumbItems.map((item) => (
								<li key={item.href} className={s.breadcrumbItem}>
									<Navigation href={item.href}>{item.label}</Navigation>
								</li>
							))} */}
							<li className={s.breadcrumbItem} aria-current="page">
								<span>{product.name}</span>
							</li>
						</ol>
					</nav>
					<h1 className={s.productHeading}>{product.name}</h1>
					<p className={s.productDescription}>{product.description}</p>
				</div>
			</div>
			<div className={s.productBlockVariantSelectorContainer}>
				{/* <ProductAttributesSelector product={product} selectedVariant={selectedVariant} /> */}
				{/* {price && (
					<div className={s.productPriceInfo}>
						<div className={s.productPriceWrapper}>
							<div aria-hidden="true" className={clsx(s.productPrice, s.isCurrentPrice)}>
								{formatMoney({
									money: discountedPrice ? discountedPrice.value : price.value,
								})}
							</div>
							{discountedPrice && (
								<div className={clsx(s.productPrice, s.isStrikedOut)} aria-hidden="true">
									{formatMoney({
										money: price.value,
									})}
								</div>
							)}
						</div>
						{discountLabel && <div className={s.discountLabel}>{discountLabel}</div>}
					</div>
				)} */}

				{/* {price && (
					<div className={s.taxLabel}>
						{getTaxType({ currencyCode: price.value.currencyCode })}{" "}
						{price.taxBehavior == TaxBehavior.Inclusive ? "included in price" : "excluded from price"}
					</div>
				)} */}

				<AddToCartButton selectedVariantId={selectedVariant.id} className={s.addToCartButton} />
			</div>
		</div>
	);
}
