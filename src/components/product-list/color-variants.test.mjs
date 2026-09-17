import test from "node:test";
import assert from "node:assert/strict";
import { getColorPackshots, filterColorPackshots } from "./color-variants.ts";

const variant = (id, color, image = `${id}.png`) => ({
	id,
	image: image ? { src: image } : null,
	selectedAttributes: color
		? [{ attribute: { name: "Color" }, attributeValue: { id: color, value: color } }]
		: [],
});
test("groups sizes by color in backend order and keeps the hero variant", () => {
	const colors = getColorPackshots(
		[variant("navy-s", "Navy"), variant("white-s", "White"), variant("navy-m", "Navy")],
		"navy-m",
	);
	assert.deepEqual(
		colors.map(({ label, variant }) => [label, variant.id]),
		[
			["Navy", "navy-m"],
			["White", "white-s"],
		],
	);
});
test("prefers a packshot over an imageless representative", () => {
	const colors = getColorPackshots([variant("navy-s", "Navy", null), variant("navy-m", "Navy")], "navy-s");
	assert.equal(colors[0].variant.id, "navy-m");
});
test("filters one or multiple colors without changing backend order", () => {
	const colors = getColorPackshots([variant("n", "Navy"), variant("w", "White"), variant("s", "Sand")]);
	assert.deepEqual(
		filterColorPackshots(colors, ["white", "NAVY"]).map(({ label }) => label),
		["Navy", "White"],
	);
	assert.equal(filterColorPackshots(colors, ["White"])[0].variant.id, "w");
	assert.deepEqual(filterColorPackshots(colors, ["Red"]), []);
	assert.equal(filterColorPackshots(colors, []), colors);
});
test("products without color attributes do not invent thumbnails", () => {
	assert.deepEqual(getColorPackshots([variant("one-size", null)]), []);
});
