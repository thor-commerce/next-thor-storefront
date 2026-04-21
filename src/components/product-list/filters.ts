import { FacetField } from "@/lib/thorcommerce/storefront/generated/types.generated";

/**
 * URL param keys are the lowercased FacetField names.
 * E.g. ?tag=summer&tag=sale&vendor=Nike
 */
export const FACET_PARAM_KEYS = Object.values(FacetField).map((f) => f.toLowerCase());

/** Price is handled as a numeric range, not as multi-select checkboxes. */
export const PRICE_MIN_PARAM = "price_min";
export const PRICE_MAX_PARAM = "price_max";
const PRICE_PARAM_KEY = FacetField.Price.toLowerCase();

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
    const encoded = values.map((v) => `"${escapeQueryValue(v)}"`);
    if (encoded.length === 1) return `${field}:${encoded[0]}`;
    return `${field}:(${encoded.join(" OR ")})`;
}

function readNumberParam(raw: string | string[] | undefined): number | undefined {
    if (raw === undefined) return undefined;
    const value = Array.isArray(raw) ? raw[0] : raw;
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
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

    for (const key of FACET_PARAM_KEYS) {
        if (key === PRICE_PARAM_KEY) continue;
        const raw = searchParams[key];
        if (raw === undefined) continue;
        const values = Array.isArray(raw) ? raw : [raw];
        const cleaned = values.map((v) => v.trim()).filter(Boolean);
        const clause = encodeFacetClause(key, cleaned);
        if (clause) clauses.push(clause);
    }

    const priceMin = readNumberParam(searchParams[PRICE_MIN_PARAM]);
    const priceMax = readNumberParam(searchParams[PRICE_MAX_PARAM]);
    if (priceMin !== undefined) clauses.push(`${PRICE_PARAM_KEY}:>${priceMin}`);
    if (priceMax !== undefined) clauses.push(`${PRICE_PARAM_KEY}:<=${priceMax}`);

    if (clauses.length === 0) return undefined;
    return clauses.join(" AND ");
}
