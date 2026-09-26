import test from "node:test";
import assert from "node:assert/strict";
import { buildProductSearchQuery, normalizeSearchTerm, MAX_SEARCH_LENGTH } from "./query.ts";

test("normalizes blank, repeated and long search parameters", () => {
	assert.equal(normalizeSearchTerm(undefined), "");
	assert.equal(normalizeSearchTerm(" \n  "), "");
	assert.equal(normalizeSearchTerm(["  cotton\n shirt  ", "ignored"]), "cotton shirt");
	assert.equal(normalizeSearchTerm("x".repeat(500)).length, MAX_SEARCH_LENGTH);
});

test("blank searches do not become browse-all or filter-only queries", () => {
	assert.equal(buildProductSearchQuery("  ", 'vendor:"Nordform"'), undefined);
});

test("every search word must match alongside selected filters", () => {
	assert.equal(
		buildProductSearchQuery("cotton shirt", 'attributes.color:"Blue" AND price:>=100'),
		'"cotton" AND "shirt" AND attributes.color:"Blue" AND price:>=100',
	);
});

test("query operators, quotes and backslashes are treated as shopper text", () => {
	assert.equal(buildProductSearchQuery("shirt OR vendor:*"), '"shirt" AND "OR" AND "vendor:*"');
	assert.equal(buildProductSearchQuery('a"b\\c'), '"a\\"b\\\\c"');
	assert.equal(buildProductSearchQuery("(shirt) -cotton"), '"(shirt)" AND "-cotton"');
});

test("unicode and punctuation are preserved", () => {
	assert.equal(buildProductSearchQuery("blå t-shirt"), '"blå" AND "t-shirt"');
});
