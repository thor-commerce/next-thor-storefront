"use client";
import ProductGridHeader from "@/components/product-grid/product-grid-header";
import ProductGrid from "@/components/product-grid/product-grid";
import ProductListingSort from "@/features/product-listing/product-listing-sort";
import { TAXONOMY_SORT_OPTIONS, formatProductCount } from "@/features/product-listing/sort";
import { ProductListTileFragment } from "@/lib/thorcommerce/storefront/generated/types.generated";
import ProductListTile from "@/components/product-list/product-list-tile";

type Props = {
	sortValue: string;
	name: string;
	products: ProductListTileFragment[];
	totalCount: number;
};

export default function CategoryPage({ name, products, totalCount, sortValue }: Props) {
	return (
		<>
			<ProductGridHeader
				heading={name}
				meta={formatProductCount(totalCount)}
				actions={
					<ProductListingSort
						value={sortValue}
						defaultValue="featured"
						options={TAXONOMY_SORT_OPTIONS.map((option) => ({
							value: option.value,
							label: option.label,
						}))}
					/>
				}
			/>
			<ProductGrid>
				{products.map((product) => (
					<ProductListTile key={product.id} item={product} />
				))}
			</ProductGrid>
		</>
	);
}
