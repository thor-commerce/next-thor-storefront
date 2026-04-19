import ProductsGrid from "@/features/products/products-grid/products-grid";
import { getProductSort } from "@/features/product-listing/sort";

import { getProductList } from "@/lib/thorcommerce/storefront";

export default async function AllProductsPage({ searchParams }: PageProps<"/[countryCode]/products">) {
	const { sort } = await searchParams;
	const selectedSort = getProductSort(sort);

	const { products, totalCount } = await getProductList({
		sortDirection: selectedSort.sortDirection,
		sortKey: selectedSort.sortKey,
	});

	return <ProductsGrid sortValue={selectedSort.selected} products={products} totalCount={totalCount} />;
}
