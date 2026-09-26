import type { Metadata } from "next";
import { Suspense } from "react";
import Navigation from "@/components/navigation/navigation";
import ProductList from "@/components/product-list/product-list";
import { buildFacetQuery, type FilterSearchParams } from "@/components/product-list/filters";
import { PRODUCT_SORT_OPTIONS, getProductSort } from "@/components/product-list/sort";
import SearchLoading from "@/features/search/search-loading";
import { buildProductSearchQuery, normalizeSearchTerm } from "@/features/search/query";
import s from "@/features/search/search.module.css";
import { getRequestContext } from "@/lib/request-context";
import { getProductList } from "@/lib/thorcommerce/storefront";

export const metadata: Metadata = {
	title: "Search products | Nordform",
	robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }: PageProps<"/[countryCode]/search">) {
	const resolvedSearchParams = await searchParams;
	const term = normalizeSearchTerm(resolvedSearchParams.q);
	return (
		<>
			{!term && (
				<section className={s.intro} aria-labelledby="search-heading">
					<h1 id="search-heading">Search products</h1>
					<p className={s.hint}>
						Use the search in the navigation to find your next favourite, or{" "}
						<Navigation href="/products">browse all products</Navigation>.
					</p>
				</section>
			)}
			{term && (
				<Suspense key={term} fallback={<SearchLoading />}>
					<SearchResults term={term} searchParams={resolvedSearchParams} />
				</Suspense>
			)}
		</>
	);
}

async function SearchResults({ term, searchParams }: { term: string; searchParams: FilterSearchParams }) {
	const selectedSort = getProductSort(searchParams.sort);
	const { currency } = await getRequestContext();
	const results = await getProductList({
		sortDirection: selectedSort.sortDirection,
		sortKey: selectedSort.sortKey,
		after: typeof searchParams.after === "string" ? searchParams.after : undefined,
		query: buildProductSearchQuery(term, buildFacetQuery(searchParams)),
	});
	return (
		<ProductList
			{...results}
			title={`Results for “${term}”`}
			emptyMessage="Try a different keyword, check your spelling, or adjust your filters."
			currency={currency}
			sorting={{ value: selectedSort.selected, defaultValue: "newest", options: [...PRODUCT_SORT_OPTIONS] }}
		/>
	);
}
