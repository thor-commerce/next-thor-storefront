export const MAX_SEARCH_LENGTH = 200;

export function normalizeSearchTerm(value: string | string[] | undefined): string {
	const term = Array.isArray(value) ? value[0] : value;
	return (term ?? "").trim().replace(/\s+/g, " ").slice(0, MAX_SEARCH_LENGTH).trim();
}

/** Treat shopper input as literal terms, never as API filter syntax. */
export function buildProductSearchQuery(term: string, facetQuery?: string): string | undefined {
	const normalized = normalizeSearchTerm(term);
	if (!normalized) return undefined;
	const terms = normalized.split(" ").map((word) => `"${word.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`);
	return [...terms, ...(facetQuery ? [facetQuery] : [])].join(" AND ");
}
