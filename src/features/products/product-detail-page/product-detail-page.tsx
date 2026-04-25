"use client";

import Navigation from "@/components/navigation/navigation";
import ThorImage from "@/components/thor-image/thor-image";
import { useCallback, useEffect, useState } from "react";
import AddToCartButton from "../components/add-to-cart-button";
import s from "./product-detail-page.module.css";
import { ProductDetail, ProductDetailVariant } from "@/lib/thorcommerce/types";
import { removeEdgesAndNodes } from "@/lib/thorcommerce/utils";
import { generateBreadcrumbs } from "@/features/products/utils";
import useEmblaCarousel from "embla-carousel-react";
import Text from "@/components/text/text";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPriceDetails } from "@/utils/price";
import { formatMoney } from "@/utils/money";

type Props = {
	product: ProductDetail;
	selectedVariant: ProductDetailVariant;
};

export default function ProductDetailPage({ product, selectedVariant }: Props) {
	const media = removeEdgesAndNodes(selectedVariant.media);

	const priceDetails = selectedVariant.price ? getPriceDetails(selectedVariant.price) : null;
	const [selectedIndex, setSelectedIndex] = useState(0);

	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
	});

	const onThumbClick = useCallback(
		(index: number) => {
			if (!emblaApi) return;
			emblaApi.goTo(index, true);
		},
		[emblaApi],
	);

	const onPrevClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.goToPrev();
	}, [emblaApi]);

	const onNextClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.goToNext();
	}, [emblaApi]);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedSnap());
	}, [emblaApi, setSelectedIndex]);

	useEffect(() => {
		if (!emblaApi) return;
		// eslint-disable-next-line react-hooks/set-state-in-effect
		onSelect();

		emblaApi.on("select", onSelect).on("reinit", onSelect);
	}, [emblaApi, onSelect]);

	const breadcrumbs = generateBreadcrumbs(removeEdgesAndNodes(product.categories).find(Boolean));
	return (
		<div className={s.container}>
			<div className={s.productImagery}>
				<div className={s.productImageCarousel}>
					<div className={s.thumbnailList}>
						{media.map((item, index) => (
							<div className={s.thumbnail} key={item.id}>
								<input
									type="radio"
									name="thumbnail"
									id={`thumb-${index}`}
									value={item.id}
									className={s.thumbnailInput}
									checked={index === selectedIndex}
									onChange={() => onThumbClick(index)}
								/>
								<label role="button" htmlFor={`thumb-${index}`} className={s.thumbnailLabel}>
									<ThorImage src={item.src} alt={selectedVariant.name} fill className={s.image} />
								</label>
							</div>
						))}
					</div>
					<div className={s.heroMedia} ref={emblaRef}>
						<div className={s.productMediaContainer}>
							{media.map((item, idx) => (
								<div key={item.id} className={s.productMediaItem}>
									<ThorImage
										src={item.src}
										className={s.image}
										priority={idx === 0}
										fill
										sizes="(min-width: 1024px) 50vw, 100vw"
										alt={product.name}
									/>
								</div>
							))}
						</div>
						<div className={s.productMediaNavigation}>
							<button onClick={onPrevClick}>
								<ChevronLeft size={24} strokeWidth={1.5} />
							</button>
							<button onClick={onNextClick}>
								<ChevronRight size={24} strokeWidth={1.5} />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className={s.productTitle}>
				<nav className={s.breadcrumbs} aria-label="Breadcrumb">
					<ol className={s.breadcrumbList}>
						{breadcrumbs.map((item, i) => {
							const isActive = i === breadcrumbs.length - 1;
							return (
								<li key={item.href} className={s.breadcrumbItem} aria-current={isActive ? "page" : undefined}>
									<Navigation href={item.href} className={s.breadcrumbLink}>
										<Text size="body-3" weight={"medium"}>
											{item.label}
										</Text>
									</Navigation>
									{!isActive && <ChevronRight size={16} />}
								</li>
							);
						})}
					</ol>
				</nav>
				<Text as="h1" size={"heading-4"} weight={"medium"}>
					{product.name}
				</Text>
			</div>
			<div className={s.productPrice}>
				<div className={s.productPriceWrapper}>
					{priceDetails && (
						<>
							<Text size={"body-1"} weight={"medium"} className={s.currentPrice}>
								{formatMoney({
									money: priceDetails.currentPrice,
								})}
							</Text>

							{priceDetails?.isDiscounted && (
								<Text size={"body-1"} className={s.initialPrice}>
									{formatMoney({
										money: priceDetails.initialPrice,
									})}
								</Text>
							)}
							{priceDetails.isDiscounted && (
								<Text size={"body-2"} weight={"medium"} className={s.discountLabel}>
									{priceDetails.discountLabel}
								</Text>
							)}
						</>
					)}
				</div>
				<AddToCartButton selectedVariantId={selectedVariant.id} className={s.addToCartButton} />

				<div className={s.productDescription}>
					<Text as="p">{product.description}</Text>
				</div>
			</div>
			{/* 			
			<div className={s.productBlockProductDetailContainer}>
				<div className={s.productInfo}>
					<nav className={s.breadcrumbs} aria-label="Breadcrumb">
						<ol className={s.breadcrumbList}>
							{breadcrumbs.map((item) => (
								<li key={item.href} className={s.breadcrumbItem}>
									<Navigation href={item.href}>{item.label}</Navigation>
								</li>
							))}
							<li className={s.breadcrumbItem} aria-current="page">
								<span>{product.name}</span>
							</li>
						</ol>
					</nav>
					<h1 className={s.productHeading}>{product.name}</h1>
					<p className={s.productDescription}>{product.description}</p>
				</div>
			</div> */}
			{/* <div className={s.productBlockVariantSelectorContainer}>
				<ProductAttributesSelector product={product} selectedVariant={selectedVariant} />
				{price && (
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
				)}

				{price && (
					<div className={s.taxLabel}>
						{getTaxType({ currencyCode: price.value.currencyCode })}{" "}
						{price.taxBehavior == TaxBehavior.Inclusive ? "included in price" : "excluded from price"}
					</div>
				)}

				<AddToCartButton selectedVariantId={selectedVariant.id} className={s.addToCartButton} />
			</div> */}
		</div>
	);
}
