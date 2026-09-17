/** Facet query fields are returned by the API; they are not FacetField enum names. */
const AVAILABILITY_QUERY_FIELD = "available_for_sale";
const FACET_QUERY_FIELDS = new Set(["tag", "vendor", AVAILABILITY_QUERY_FIELD]);
const ATTRIBUTE_QUERY_FIELD = /^attributes\.[a-z0-9_-]+$/;

/** Price is handled as a numeric range, not as multi-select checkboxes. */
export const PRICE_MIN_PARAM = "price_min";
export const PRICE_MAX_PARAM = "price_max";
const PRICE_PARAM_KEY = "price";

/**
 * Escape a raw value so it can be safely embedded in a quoted Lucene-style query.
 * Escapes backslashes and double quotes.
 */
function escapeQueryValue(value: string): string {
	return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

/**
 * Convert a single facet field + values into a query fragment.
 * Multiple values for the same field are OR'd together: `tag:("a" OR "b")`.
 */
function encodeFacetClause(field: string, values: string[]): string | null {
	if (values.length === 0) return null;
	// Availability is a boolean query clause, not a quoted keyword facet.
	if (field === AVAILABILITY_QUERY_FIELD) {
		const booleans = [...new Set(values.filter((value) => value === "true" || value === "false"))];
		// Selecting both values includes every product, so no availability filter is needed.
		return booleans.length === 1 ? `${field}:${booleans[0]}` : null;
	}
	const encoded = values.map((v) => `"${escapeQueryValue(v)}"`);
	if (encoded.length === 1) return `${field}:${encoded[0]}`;
	return `${field}:(${encoded.join(" OR ")})`;
}

function readNumberParam(raw: string | string[] | undefined): number | undefined {
	if (raw === undefined) return undefined;
	const value = Array.isArray(raw) ? raw[0] : raw;
	if (!value?.trim()) return undefined;
	const n = Number(value);
	return Number.isSafeInteger(n) && n >= 0 ? n : undefined;
}

export type FilterSearchParams = Record<string, string | string[] | undefined>;

/**
 * Build a storefront `query` string from Next.js `searchParams`.
 * Only recognized facet param keys are consumed; unknown params are ignored.
 *
 * Returns `undefined` when there are no active filters, so it can be passed
 * directly as a GraphQL variable without forcing an empty string.
 */
export function buildFacetQuery(searchParams: FilterSearchParams): string | undefined {
	const clauses: string[] = [];

	for (const key of Object.keys(searchParams)) {
		if (!FACET_QUERY_FIELDS.has(key) && !ATTRIBUTE_QUERY_FIELD.test(key)) continue;
		const raw = searchParams[key];
		if (raw === undefined) continue;
		const values = Array.isArray(raw) ? raw : [raw];
		const cleaned = values.map((v) => v.trim()).filter(Boolean);
		const clause = encodeFacetClause(key, cleaned);
		if (clause) clauses.push(clause);
	}

	const priceMin = readNumberParam(searchParams[PRICE_MIN_PARAM]);
	const priceMax = readNumberParam(searchParams[PRICE_MAX_PARAM]);
	if (priceMin !== undefined) clauses.push(`${PRICE_PARAM_KEY}:>=${priceMin}`);
	if (priceMax !== undefined) clauses.push(`${PRICE_PARAM_KEY}:<=${priceMax}`);

	if (clauses.length === 0) return undefined;
	return clauses.join(" AND ");
}
