"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Navigation from "@/components/navigation/navigation";
import AddToCartButton from "../components/add-to-cart-button";
import type { ProductDetail, ProductDetailVariant } from "@/lib/thorcommerce/types";
import { Availability, getAvailabilityStatus, removeEdgesAndNodes } from "@/lib/thorcommerce/utils";
import { generateBreadcrumbs } from "@/features/products/utils";
import { getPriceDetails } from "@/utils/price";
import { formatMoney } from "@/utils/money";
import ProductAttributeSelector from "./product-attribute-selector";
import ProductSpecifications from "./product-specifications";
import ProductGallery from "./product-gallery";
import s from "./product-detail-page.module.css";

type Props = { product: ProductDetail; selectedVariant: ProductDetailVariant };

export default function ProductDetailPage({ product, selectedVariant: initialVariant }: Props) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const variants = removeEdgesAndNodes(product.variants);
	const selectedVariant =
		variants.find((variant) => variant.id === searchParams.get("variant")) ?? variants[0] ?? initialVariant;
	const breadcrumbs = generateBreadcrumbs(removeEdgesAndNodes(product.categories)[0]);
	const price = selectedVariant.price ? getPriceDetails(selectedVariant.price) : null;
	const availability = getAvailabilityStatus({ availability: selectedVariant.availability });

	function selectVariant(variant: ProductDetailVariant) {
		if (variant.id === selectedVariant.id) return;
		const params = new URLSearchParams(searchParams.toString());
		params.set("variant", variant.id);
		// All variants are loaded; update the URL without refetching the server route.
		window.history.pushState(null, "", `${pathname}?${params}${window.location.hash}`);
	}

	return (
		<div className={s.page}>
			<div className={s.container}>
				<nav aria-label="Breadcrumb" className={s.breadcrumbRow}>
					<ol className={s.breadcrumbs}>
						{breadcrumbs.map((item) => (
							<li key={item.href}>
								<Navigation href={item.href}>{item.label}</Navigation>
							</li>
						))}
					</ol>
				</nav>
				<ProductGallery key={selectedVariant.id} variant={selectedVariant} productName={product.name} />
				<div className={s.details}>
					<h1 className={s.title}>{product.name}</h1>
					<div className={s.price} aria-live="polite">
						{price ? (
							<>
								<span>{formatMoney({ money: price.currentPrice })}</span>
								{price.isDiscounted && (
									<>
										<s>{formatMoney({ money: price.initialPrice })}</s>
										<span className={s.discount}>{price.discountLabel}</span>
									</>
								)}
							</>
						) : (
							<span>Price unavailable</span>
						)}
					</div>
					<ProductAttributeSelector
						variants={variants}
						assignments={product.attributeAssignments}
						selectedVariant={selectedVariant}
						onSelect={selectVariant}
					/>
					<p className={s.status} role="status">
						{availability === Availability.OutOfStock
							? "This option is out of stock."
							: availability === Availability.Unavailable
								? "This option is currently unavailable."
								: selectedVariant.name}
					</p>
					<AddToCartButton
						key={selectedVariant.id}
						selectedVariantId={selectedVariant.id}
						className={s.addToCart}
						disabled={!price || availability !== Availability.InStock}
						outOfStock={availability === Availability.OutOfStock}
						unavailable={!price || availability === Availability.Unavailable}
					/>
					{product.description && <p className={s.description}>{product.description}</p>}
					<ProductSpecifications product={product} variant={selectedVariant} />
				</div>
			</div>
		</div>
	);
}
