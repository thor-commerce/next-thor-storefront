import ProductList from "@/components/product-list/product-list";
import { PRODUCT_SORT_OPTIONS, getProductSort } from "@/components/product-list/sort";
import { buildFacetQuery } from "@/components/product-list/filters";
import { getRequestContext } from "@/lib/request-context";
import { getProductList } from "@/lib/thorcommerce/storefront";

export default async function AllProductsPage({ searchParams }: PageProps<"/[countryCode]/products">) {
	const resolvedSearchParams = await searchParams;
	const { sort } = resolvedSearchParams;
	const selectedSort = getProductSort(sort);
	const { currency } = await getRequestContext();
	const { products, facets, totalCount } = await getProductList({
		sortDirection: selectedSort.sortDirection,
		sortKey: selectedSort.sortKey,
		query: buildFacetQuery(resolvedSearchParams),
	});

	console.log(buildFacetQuery(resolvedSearchParams));

	return (
		<ProductList
			title="All products"
			products={products}
			facets={facets}
			currency={currency}
			breadcrumbs={[
				{ label: "Home", href: "/" },
				{ label: "All products", href: "/products" },
			]}
			sorting={{
				value: selectedSort.selected,
				defaultValue: "newest",
				options: PRODUCT_SORT_OPTIONS.map((option) => ({
					value: option.value,
					label: option.label,
				})),
			}}
			totalCount={totalCount}
		/>
	);
}
