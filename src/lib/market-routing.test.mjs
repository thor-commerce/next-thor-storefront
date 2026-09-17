import test from "node:test";
import assert from "node:assert/strict";
import { resolveMarketRoute } from "./market-routing.ts";
const markets = ["dk", "se", "de"];
test("unprefixed paths retain the resource, including dotted slugs", () => {
	assert.deepEqual(resolveMarketRoute("/products/t-shirt.v2", markets, []), {
		country: "dk",
		pathname: "/dk/products/t-shirt.v2",
		needsRedirect: true,
	});
});
test("URL market wins over a stale remembered market", () => {
	assert.deepEqual(resolveMarketRoute("/se/account", markets, ["dk"]), {
		country: "se",
		pathname: "/se/account",
		needsRedirect: false,
	});
});
test("unsupported and uppercase prefixes are canonicalized", () => {
	assert.equal(resolveMarketRoute("/us/products", markets, ["se"]).pathname, "/se/products");
	assert.equal(resolveMarketRoute("/DK/products", markets, []).needsRedirect, true);
});
test("default need not be an enabled market", () => {
	assert.equal(resolveMarketRoute("/", ["de"], ["dk"]).country, "de");
	assert.throws(() => resolveMarketRoute("/", [], []), /at least one/);
});
