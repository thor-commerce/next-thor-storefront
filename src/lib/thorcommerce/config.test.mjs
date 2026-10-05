import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { Script } from "node:vm";
import ts from "typescript";
import { resolveMarketRoute } from "../market-routing.ts";

const source = await readFile(new URL("./config.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
	compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
function countries(env = {}) {
	const exports = {};
	new Script(compiled).runInNewContext({ exports, process: { env } });
	return JSON.parse(JSON.stringify(exports.COUNTRIES));
}
const additionalMarkets = [
	["us", "United States", "America", "USD"],
	["gb", "United Kingdom", "Europe", "GBP"],
	["no", "Norway", "Europe", "NOK"],
	["ch", "Switzerland", "Europe", "CHF"],
	["ca", "Canada", "America", "CAD"],
	["au", "Australia", "International", "AUD"],
];
for (const [code, name, region, currency] of additionalMarkets) {
	test(`${code} setup retains its selected market, configured currency and resource path`, () => {
		const configured = countries({
			NEXT_PUBLIC_THOR_MARKETS: code,
			NEXT_PUBLIC_THOR_CURRENCY: currency,
			NEXT_PUBLIC_THOR_STORE_ID: "store_configured",
		});
		assert.deepEqual(configured, [{ code, name, region, languages: ["en"], currencies: [currency], store: "store_configured" }]);
		const enabled = configured.map((country) => country.code);
		assert.deepEqual(resolveMarketRoute(`/${code}/products/thor-tee`, enabled, ["dk"]), {
			country: code, pathname: `/${code}/products/thor-tee`, needsRedirect: false,
		});
		assert.equal(resolveMarketRoute("/products/thor-tee.v2", enabled, ["dk"]).pathname, `/${code}/products/thor-tee.v2`);
		assert.equal(resolveMarketRoute("/dk/account", enabled, ["dk"]).pathname, `/${code}/account`);
		assert.equal(resolveMarketRoute(`/${code.toUpperCase()}/products`, enabled, []).pathname, `/${code}/products`);
	});
}

test("new market metadata retains the existing configured currency fallback", () => {
	const configured = countries({ NEXT_PUBLIC_THOR_MARKETS: " US, GB , NO,CH,CA,AU ", NEXT_PUBLIC_THOR_CURRENCY: "EUR" });
	assert.equal(configured.length, 6);
	assert.ok(configured.every((country) => country.currencies[0] === "EUR"));
	const defaults = countries();
	assert.equal(new Set(defaults.map((country) => country.code)).size, defaults.length);
	for (const [code] of additionalMarkets) {
		assert.equal(defaults.find((country) => country.code === code).currencies[0], "USD");
	}
});

test("the existing Denmark, Sweden and Germany mappings are preserved", () => {
	const configured = countries({ NEXT_PUBLIC_THOR_MARKETS: "dk,se,de", NEXT_PUBLIC_THOR_CURRENCY: "USD" });
	assert.deepEqual(configured.map((country) => [country.code, country.currencies[0]]), [["dk", "DKK"], ["de", "EUR"], ["se", "SEK"]]);
	assert.equal(countries({ NEXT_PUBLIC_THOR_MARKET: "gb", NEXT_PUBLIC_THOR_CURRENCY: "GBP" })[0].code, "gb");
	assert.equal(countries()[0].code, "at", "the default market order stays unchanged");
});
