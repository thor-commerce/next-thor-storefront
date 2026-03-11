import { ProductsGridQueryVariables } from "@/__generated__/thor/graphql";
import { ProductGridSkeleton } from "@/components/product-grid/product-grid";
import ProductsGrid from "@/features/products/products-grid/products-grid";
import { getProductSort } from "@/features/product-listing/sort";
import { PRODUCTS_GRID_QUERY } from "@/features/products/queries";

import { PreloadQuery } from "@/lib/thor/apollo-client";
import { getCountryByCountryCode } from "@/utils/countries";
import { Suspense } from "react";

export default async function AllProductsPage({
	params,
	searchParams,
}: PageProps<"/[countryCode]/products">) {
	const { countryCode } = await params;
  const { sort } = await searchParams;
  const selectedSort = getProductSort(sort);

	const country = getCountryByCountryCode(countryCode);
	const variables: ProductsGridQueryVariables = {
		currency: country.currencies[0],
		storeId: country.store,
		sortKey: selectedSort.sortKey,
		sortDirection: selectedSort.sortDirection,
	};

	return (
		<PreloadQuery query={PRODUCTS_GRID_QUERY} variables={variables}>
			<Suspense fallback={<ProductGridSkeleton />}>
				<ProductsGrid variables={variables} sortValue={selectedSort.selected} />
			</Suspense>
		</PreloadQuery>
	);
}
