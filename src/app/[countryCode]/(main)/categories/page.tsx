import { CategoriesQueryVariables } from "@/__generated__/thor/graphql";
import ProductGridHeader from "@/components/product-grid/product-grid-header";
import { TaxonomyGridSkeleton } from "@/components/taxonomy-grid/taxonomy-grid";
import CategoriesList from "@/features/categories/categories-list/categories-list";
import { CATEGORIES_QUERY } from "@/features/categories/queries";
import { PreloadQuery } from "@/lib/thor/apollo-client";
import { getCountryByCountryCode } from "@/utils/countries";
import { Suspense } from "react";

export default async function CategoriesPage({ params }: PageProps<"/[countryCode]/categories">) {
	const { countryCode } = await params;

	const country = getCountryByCountryCode(countryCode);
	const variables: CategoriesQueryVariables = {
		currency: country.currencies[0],
		storeId: country.store,
	};

	return (
		<PreloadQuery query={CATEGORIES_QUERY} variables={variables}>
			<ProductGridHeader heading="Categories" />
			<Suspense fallback={<TaxonomyGridSkeleton />}>
				<CategoriesList variables={variables} />
			</Suspense>
		</PreloadQuery>
	);
}
