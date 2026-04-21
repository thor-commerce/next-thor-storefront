import CategoryPage from "@/features/categories/category-page/category-page";
import { getCategorySort } from "@/components/product-list/sort";
import { buildFacetQuery } from "@/components/product-list/filters";
import { getRequestContext } from "@/lib/request-context";
import { getCategoryList } from "@/lib/thorcommerce/storefront";

export default async function Category({
	params,
	searchParams,
}: PageProps<"/[countryCode]/categories/[...slug]">) {
	const { slug } = await params;
	const resolvedSearchParams = await searchParams;
	const { sort } = resolvedSearchParams;
	const selectedSort = getCategorySort(sort);
	const { currency } = await getRequestContext();

	const categorySlug = slug?.[slug.length - 1];

	if (!categorySlug) {
		throw new Error("Category slug is required");
	}

	const { name, products, totalCount, breadcrumbs, facets } = await getCategoryList({
		slug: categorySlug.toLowerCase(),
		sortDirection: selectedSort.sortDirection,
		sortKey: selectedSort.sortKey,
		query: buildFacetQuery(resolvedSearchParams),
	});
	return (
		<CategoryPage
			name={name}
			products={products}
			totalCount={totalCount}
			sortValue={selectedSort.selected}
			breadcrumbs={breadcrumbs}
			facets={facets}
			currency={currency}
		/>
	);
}
