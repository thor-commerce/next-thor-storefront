"use client";
import ProductGridHeader from "@/components/product-grid/product-grid-header";
import ProductListingSort from "@/components/product-list/product-listing-sort";
import { PRODUCT_SORT_OPTIONS, formatProductCount } from "@/components/product-list/sort";
import { ProductListTileFragment } from "@/lib/thorcommerce/storefront/generated/types.generated";
import ProductList from "@/components/product-list/product-list";
import ProductListTile from "@/components/product-list/product-list-tile";

type Props = {
	sortValue: string;
	products: ProductListTileFragment[];
	totalCount: number;
};

export default function ProductsGrid({ products, totalCount, sortValue }: Props) {
	return (
		<>
			<ProductGridHeader
				heading="All products"
				meta={formatProductCount(totalCount)}
				actions={
					<ProductListingSort
						value={sortValue}
						defaultValue="newest"
						options={PRODUCT_SORT_OPTIONS.map((option) => ({
							value: option.value,
							label: option.label,
						}))}
					/>
				}
			/>
			<ProductList>
				{products?.map((product) => (
					<ProductListTile key={product.id} item={product} />
				))}
			</ProductList>
		</>
	);
}
