import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import type { ProductDetail, ProductDetailVariant } from "@/lib/thorcommerce/types";
import s from "./product-specifications.module.css";

type Props = { product: ProductDetail; variant: ProductDetailVariant };

function SpecificationSection({ title, children }: { title: string; children: ReactNode }) {
	return (
		<details className={s.section}>
			<summary className={s.summary}>
				<h2>{title}</h2>
				<ChevronDown size={20} strokeWidth={1.5} aria-hidden="true" />
			</summary>
			<div className={s.content}>{children}</div>
		</details>
	);
}

export default function ProductSpecifications({ product, variant }: Props) {
	const attributes = product.attributeAssignments.flatMap(({ attribute }) => {
		const selection = variant.selectedAttributes.find((item) => item.attribute.id === attribute.id);
		return selection
			? [{ id: attribute.id, name: attribute.name, value: selection.attributeValue.value }]
			: [];
	});
	const textFields = product.metafields.filter(
		(field) => field.__typename === "TextMetafield" && field.value.trim(),
	);
	if (!attributes.length && !variant.sku && !textFields.length) return null;

	return (
		<section className={s.sections} aria-label="Product specifications">
			{(attributes.length > 0 || variant.sku) && (
				<SpecificationSection title="Specifications">
					<dl className={s.specifications}>
						{attributes.map((attribute) => (
							<div key={attribute.id}>
								<dt>{attribute.name}</dt>
								<dd>{attribute.value}</dd>
							</div>
						))}
						{variant.sku && (
							<div>
								<dt>SKU</dt>
								<dd>{variant.sku}</dd>
							</div>
						)}
					</dl>
				</SpecificationSection>
			)}
			{textFields.map(
				(field) =>
					field.__typename === "TextMetafield" && (
						<SpecificationSection key={field.id} title={field.name}>
							<p>{field.value}</p>
						</SpecificationSection>
					),
			)}
		</section>
	);
}
