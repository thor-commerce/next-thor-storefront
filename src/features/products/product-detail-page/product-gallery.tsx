"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ThorImage from "@/components/thor-image/thor-image";
import type { ProductDetailVariant } from "@/lib/thorcommerce/types";
import { removeEdgesAndNodes } from "@/lib/thorcommerce/utils";
import s from "./product-detail-page.module.css";

export default function ProductGallery({
	variant,
	productName,
}: {
	variant: ProductDetailVariant;
	productName: string;
}) {
	const media = removeEdgesAndNodes(variant.media);
	const [index, setIndex] = useState(0);
	const active = media[index];
	if (!active) return <div className={s.emptyImage}>No image available</div>;
	return (
		<section className={s.gallery} aria-label="Product images">
			<div className={s.thumbnails}>
				{media.map((item, i) => (
					<button
						key={item.id}
						type="button"
						className={s.thumbnail}
						aria-label={`View image ${i + 1}`}
						aria-pressed={i === index}
						onClick={() => setIndex(i)}
					>
						<ThorImage src={item.src} alt="" fill sizes="60px" className={s.image} />
					</button>
				))}
			</div>
			<div className={s.hero}>
				<ThorImage
					src={active.src}
					alt={`${productName} — ${variant.name}, image ${index + 1}`}
					fill
					priority
					sizes="(min-width: 1440px) 535px, (min-width: 1024px) calc(50vw - 188px), 100vw"
					className={s.image}
				/>
				{media.length > 1 && (
					<div className={s.galleryControls}>
						<span aria-live="polite">
							{index + 1} / {media.length}
						</span>
						<button
							type="button"
							aria-label="Previous image"
							onClick={() => setIndex((index + media.length - 1) % media.length)}
						>
							<ChevronLeft size={20} />
						</button>
						<button
							type="button"
							aria-label="Next image"
							onClick={() => setIndex((index + 1) % media.length)}
						>
							<ChevronRight size={20} />
						</button>
					</div>
				)}
			</div>
		</section>
	);
}
