import { buildProductSearchQuery, normalizeSearchTerm } from "@/features/search/query";
import type { SearchSuggestion } from "@/features/search/types";
import { getRequestContext } from "@/lib/request-context";
import { storefrontFetch } from "@/lib/thorcommerce/storefront";
import { SearchSuggestionsDocument } from "@/lib/thorcommerce/storefront/generated/types.generated";
import { formatMoney } from "@/utils/money";
import { getPriceDetails } from "@/utils/price";

export async function GET(request: Request) {
	const term = normalizeSearchTerm(new URL(request.url).searchParams.get("q") ?? undefined);
	const headers = { "Cache-Control": "private, no-store" };
	if (term.length < 2) return Response.json({ products: [] }, { headers });
	try {
		const context = await getRequestContext();
		const data = await storefrontFetch({
			query: SearchSuggestionsDocument,
			variables: {
				storeId: context.store,
				currency: context.currency,
				priceChannel: context.priceChannel,
				query: buildProductSearchQuery(term)!,
			},
		});
		const products: SearchSuggestion[] = (data.products.nodes ?? [])
			.filter((product) => product.variants.totalCount > 0)
			.map((product) => ({
				id: product.id,
				name: product.name,
				href: `/${context.country}/products/${product.slug}`,
				image: product.heroVariant?.image?.src ?? null,
				price: product.priceRange?.minPrice
					? (formatMoney({ money: getPriceDetails(product.priceRange.minPrice).currentPrice }) ?? null)
					: null,
			}));
		return Response.json({ products }, { headers });
	} catch {
		return Response.json({ error: "Suggestions are temporarily unavailable." }, { status: 502, headers });
	}
}
