import type { ProductDetailVariant } from "@/lib/thorcommerce/types";

type Variant = Pick<ProductDetailVariant, "id" | "selectedAttributes">;
/** Keep every other choice when possible; otherwise preserve the most matching attributes.
 * Matching uses IDs, so translated labels and repeated value names remain unambiguous.
 */
export function findVariantForOption<T extends Variant>(
	variants: readonly T[],
	selected: Variant,
	attributeId: string,
	valueId: string,
): T | undefined {
	const selectedValues = new Map(
		selected.selectedAttributes.map((item) => [item.attribute.id, item.attributeValue.id]),
	);
	let best: T | undefined;
	let bestScore = -1;
	for (const variant of variants) {
		if (
			!variant.selectedAttributes.some(
				(item) => item.attribute.id === attributeId && item.attributeValue.id === valueId,
			)
		)
			continue;
		const score = variant.selectedAttributes.filter(
			(item) =>
				item.attribute.id !== attributeId && selectedValues.get(item.attribute.id) === item.attributeValue.id,
		).length;
		if (score > bestScore) {
			best = variant;
			bestScore = score;
		}
	}
	return best;
}

/** Some API versions return empty assignment values. Preserve the variant response order
 * as a fallback; populated assignment values always remain authoritative.
 */
export function getAttributeValues(
	attributeId: string,
	values: Variant["selectedAttributes"][number]["attributeValue"][],
	variants: readonly Variant[],
) {
	if (values.length) return values;
	const fallback = new Map<string, Variant["selectedAttributes"][number]["attributeValue"]>();
	for (const variant of variants) {
		for (const selection of variant.selectedAttributes) {
			if (selection.attribute.id === attributeId && !fallback.has(selection.attributeValue.id)) {
				fallback.set(selection.attributeValue.id, selection.attributeValue);
			}
		}
	}
	return [...fallback.values()];
}
