import test from "node:test";
import assert from "node:assert/strict";
import { buildFacetQuery } from "./filters.ts";

test("attribute and availability facet selections reach the product query", () => {
	assert.equal(
		buildFacetQuery({
			"attributes.color": "Navy",
			"attributes.size": ["S", "M"],
			available_for_sale: "true",
			sort: "newest",
		}),
		'attributes.color:"Navy" AND attributes.size:("S" OR "M") AND available_for_sale:true',
	);
});
test("unknown fields and query syntax in field names are ignored", () => {
	assert.equal(
		buildFacetQuery({ "attributes.color OR *": "value", page: "2", attribute: "Color" }),
		undefined,
	);
});
test("facet values remain quoted and escaped", () => {
	assert.equal(buildFacetQuery({ "attributes.color": 'Blue" OR *:*' }), 'attributes.color:"Blue\\" OR *:*"');
});
test("existing vendor, tag and price filtering remains available", () => {
	assert.equal(
		buildFacetQuery({ vendor: "Nordform", tag: "cotton", price_min: "100", price_max: "500" }),
		'vendor:"Nordform" AND tag:"cotton" AND price:>=100 AND price:<=500',
	);
});

test("minimum price includes the selected amount in minor currency units", () => {
	assert.equal(buildFacetQuery({ price_min: "19322" }), "price:>=19322");
});

test("availability emits unquoted boolean clauses", () => {
	assert.equal(buildFacetQuery({ available_for_sale: "false" }), "available_for_sale:false");
	assert.equal(buildFacetQuery({ available_for_sale: ["true", "true"] }), "available_for_sale:true");
});

test("selecting both availability values leaves other filters intact", () => {
	assert.equal(
		buildFacetQuery({ available_for_sale: ["true", "false"], vendor: "Nordform" }),
		'vendor:"Nordform"',
	);
});

test("invalid availability values cannot inject query syntax", () => {
	assert.equal(buildFacetQuery({ available_for_sale: "true OR *:*" }), undefined);
});

test("price bounds ignore empty, negative, fractional, and unsafe amounts", () => {
	for (const value of ["", " ", "-1", "1.5", "Infinity", "9007199254740992"]) {
		assert.equal(buildFacetQuery({ price_min: value, price_max: value }), undefined);
	}
	assert.equal(buildFacetQuery({ price_min: "0" }), "price:>=0");
});
