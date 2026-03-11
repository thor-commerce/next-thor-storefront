import {
  CollectionGridQueryVariables,
} from "@/__generated__/thor/graphql";
import { ProductGridSkeleton } from "@/components/product-grid/product-grid";
import CollectionGrid from "@/features/collections/collection-grid/collection-grid";
import { getCollectionSort } from "@/features/product-listing/sort";
import { COLLECTION_GRID_QUERY } from "@/features/collections/queries";
import { PreloadQuery } from "@/lib/thor/apollo-client";
import { getCountryByCountryCode } from "@/utils/countries";
import { Suspense } from "react";

export default async function CollectionPage({
  params,
  searchParams,
}: PageProps<"/[countryCode]/collections/[slug]">) {
  const { slug, countryCode } = await params;
  const { sort } = await searchParams;
  const selectedSort = getCollectionSort(sort);

  const country = getCountryByCountryCode(countryCode);
  const variables: CollectionGridQueryVariables = {
    slug: slug.toLowerCase(),
    currency: country.currencies[0],
    storeId: country.store,
    sortKey: selectedSort.sortKey,
    sortDirection: selectedSort.sortDirection,
  };

  return (
    <PreloadQuery query={COLLECTION_GRID_QUERY} variables={variables}>
      <Suspense fallback={<ProductGridSkeleton />}>
        <CollectionGrid variables={variables} sortValue={selectedSort.selected} />
      </Suspense>
    </PreloadQuery>
  );
}
