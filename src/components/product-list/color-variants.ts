import type { ProductListTileFragment } from "@/lib/thorcommerce/storefront/generated/types.generated";

type Variant = NonNullable<ProductListTileFragment["colorVariants"]["edges"]>[number]["node"];
export type ColorPackshot = {
	id: string;
	label: string;
	variant: Variant;
};

/** Keep backend order, with one representative variant per color across sizes. */
export function getColorPackshots(variants: Variant[], heroVariantId?: string): ColorPackshot[] {
	const colors = new Map<string, ColorPackshot>();
	for (const variant of variants) {
		const color = variant.selectedAttributes.find(
			({ attribute }) => attribute.name.toLowerCase() === "color",
		);
		if (!color) continue;
		const { id, value: label } = color.attributeValue;
		const existing = colors.get(id);
		if (!existing || (variant.image && (!existing.variant.image || variant.id === heroVariantId))) {
			colors.set(id, { id, label, variant });
		}
	}
	return [...colors.values()];
}

export function filterColorPackshots(colors: ColorPackshot[], selectedColors: string[]): ColorPackshot[] {
	if (selectedColors.length === 0) return colors;
	const selected = new Set(selectedColors.map((color) => color.toLowerCase()));
	return colors.filter((color) => selected.has(color.label.toLowerCase()));
}
