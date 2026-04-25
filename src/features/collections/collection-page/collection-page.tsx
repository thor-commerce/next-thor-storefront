"use client";

import { TAXONOMY_SORT_OPTIONS } from "@/components/product-list/sort";
import { ProductListTileFragment } from "@/lib/thorcommerce/storefront/generated/types.generated";
import ProductList from "@/components/product-list/product-list";

type Props = {
	sortValue: string;
	name: string;
	products: ProductListTileFragment[];
	totalCount: number;
	currency: string;
};

export default function CollectionPage({ name, products, totalCount, sortValue, currency }: Props) {
	return (
		<>
			<ProductList
				products={products}
				title={name}
				breadcrumbs={[]}
				sorting={{
					value: sortValue,
					defaultValue: "featured",
					options: TAXONOMY_SORT_OPTIONS.map((option) => ({
						value: option.value,
						label: option.label,
					})),
				}}
				facets={[]}
				totalCount={totalCount}
				currency={currency}
			/>
		</>
	);
}
