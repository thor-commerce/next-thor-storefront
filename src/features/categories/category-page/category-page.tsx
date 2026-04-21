"use client";
import { TAXONOMY_SORT_OPTIONS } from "@/components/product-list/sort";
import {
	FacetFragment,
	ProductListTileFragment,
} from "@/lib/thorcommerce/storefront/generated/types.generated";
import ProductList from "@/components/product-list/product-list";

type Props = {
	sortValue: string;
	name: string;
	products: ProductListTileFragment[];
	totalCount: number;
	breadcrumbs?: { label: string; href: string }[];
	facets: FacetFragment[];
	currency: string;
};

export default function CategoryPage({ name, products, breadcrumbs, facets, totalCount, sortValue, currency }: Props) {
	return (
		<>
			<ProductList
				products={products}
				title={name}
				breadcrumbs={breadcrumbs}
				sorting={{
					value: sortValue,
					defaultValue: "featured",
					options: TAXONOMY_SORT_OPTIONS.map((option) => ({
						value: option.value,
						label: option.label,
					})),
				}}
				facets={facets}
				totalCount={totalCount}
				currency={currency}
			/>
		</>
	);
}
