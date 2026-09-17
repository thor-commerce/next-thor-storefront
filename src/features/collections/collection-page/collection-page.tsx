"use client";

import { TAXONOMY_SORT_OPTIONS } from "@/components/product-list/sort";
import type {
	FacetFragment,
	ProductListTileFragment,
} from "@/lib/thorcommerce/storefront/generated/types.generated";
import ProductList from "@/components/product-list/product-list";

type Props = {
	sortValue: string;
	name: string;
	products: ProductListTileFragment[];
	facets: FacetFragment[];
	totalCount: number;
	currency: string;
	pageInfo: { hasNextPage: boolean; endCursor?: string | null };
};

export default function CollectionPage({
	name,
	products,
	facets,
	totalCount,
	sortValue,
	currency,
	pageInfo,
}: Props) {
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
				facets={facets}
				totalCount={totalCount}
				currency={currency}
				pageInfo={pageInfo}
			/>
		</>
	);
}
