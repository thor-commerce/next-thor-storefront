import test from "node:test";
import assert from "node:assert/strict";
import { findVariantForOption, getAttributeValues } from "./variant-selection.ts";
const attr = (id, value) => ({
	attribute: { id, name: id },
	attributeValue: { id: value, value, __typename: "TextAttributeValue" },
});
const variant = (id, color, size) => ({
	id,
	selectedAttributes: [attr("color", color), ...(size ? [attr("size", size)] : [])],
});
const variants = [
	variant("red-s", "red", "s"),
	variant("red-m", "red", "m"),
	variant("blue-s", "blue", "s"),
	variant("blue-m", "blue", "m"),
];
test("changing color preserves size and changing size preserves color", () => {
	assert.equal(findVariantForOption(variants, variants[1], "color", "blue").id, "blue-m");
	assert.equal(findVariantForOption(variants, variants[3], "size", "s").id, "blue-s");
});
test("sparse combinations resolve to an existing variant deterministically", () => {
	assert.equal(findVariantForOption(variants.slice(0, 3), variants[1], "color", "blue").id, "blue-s");
	assert.equal(findVariantForOption(variants, variants[0], "color", "missing"), undefined);
});
test("accessories select colors without a size attribute", () => {
	const accessory = [variant("a", "red"), variant("b", "blue")];
	assert.equal(findVariantForOption(accessory, accessory[0], "color", "blue").id, "b");
});
test("empty variant lists have no matching option", () => {
	assert.equal(findVariantForOption([], variants[0], "color", "red"), undefined);
});

test("backend value order is authoritative; empty lists fall back without sorting", () => {
	const values = [attr("color", "blue").attributeValue, attr("color", "red").attributeValue];
	assert.equal(getAttributeValues("color", values, variants), values);
	assert.deepEqual(
		getAttributeValues("color", [], variants).map((value) => value.id),
		["red", "blue"],
	);
});
