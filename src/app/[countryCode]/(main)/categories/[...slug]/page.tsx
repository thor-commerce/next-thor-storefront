import {
  CategoryGridQueryVariables,
} from "@/__generated__/thor/graphql";
import { ProductGridSkeleton } from "@/components/product-grid/product-grid";
import CategoryGrid from "@/features/categories/category-grid/category-grid";
import { getCategorySort } from "@/features/product-listing/sort";
import { CATEGORY_GRID_QUERY } from "@/features/categories/queries";

import { PreloadQuery } from "@/lib/thor/apollo-client";
import { getCountryByCountryCode } from "@/utils/countries";
import { Suspense } from "react";

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<"/[countryCode]/categories/[...slug]">) {
  const { slug, countryCode } = await params;
  const { sort } = await searchParams;
  const selectedSort = getCategorySort(sort);

  const categorySlug = slug?.[slug.length - 1];

  if (!categorySlug) {
    throw new Error("Category slug is required");
  }

  const country = getCountryByCountryCode(countryCode);
  const variables: CategoryGridQueryVariables = {
    slug: categorySlug.toLowerCase(),
    currency: country.currencies[0],
    storeId: country.store,
    sortKey: selectedSort.sortKey,
    sortDirection: selectedSort.sortDirection,
  };

  return (
    <PreloadQuery query={CATEGORY_GRID_QUERY} variables={variables}>
      <Suspense fallback={<ProductGridSkeleton />}>
        <CategoryGrid variables={variables} sortValue={selectedSort.selected} />
      </Suspense>
    </PreloadQuery>
  );
}
