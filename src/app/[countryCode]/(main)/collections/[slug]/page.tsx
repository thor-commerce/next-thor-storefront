import CollectionPage from "@/features/collections/collection-page/collection-page";
import { buildFacetQuery } from "@/components/product-list/filters";
import { getCollectionSort } from "@/components/product-list/sort";
import { getCollectionList } from "@/lib/thorcommerce/storefront";
import { getRequestContext } from "@/lib/request-context";

export default async function Collection({
	params,
	searchParams,
}: PageProps<"/[countryCode]/collections/[slug]">) {
	const { slug } = await params;
	const resolvedSearchParams = await searchParams;
	const { sort } = resolvedSearchParams;
	const selectedSort = getCollectionSort(sort);
	const { currency } = await getRequestContext();

	const { name, products, totalCount, facets, pageInfo } = await getCollectionList({
		slug: slug.toLowerCase(),
		sortDirection: selectedSort.sortDirection,
		sortKey: selectedSort.sortKey,
		after: typeof resolvedSearchParams.after === "string" ? resolvedSearchParams.after : undefined,
		query: buildFacetQuery(resolvedSearchParams),
	});

	return (
		<CollectionPage
			name={name}
			products={products}
			facets={facets}
			totalCount={totalCount}
			sortValue={selectedSort.selected}
			currency={currency}
			pageInfo={pageInfo}
		/>
	);
}
