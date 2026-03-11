import { CollectionsQueryVariables } from "@/__generated__/thor/graphql";
import ProductGridHeader from "@/components/product-grid/product-grid-header";
import { TaxonomyGridSkeleton } from "@/components/taxonomy-grid/taxonomy-grid";
import CollectionsList from "@/features/collections/collections-list/collections-list";
import { COLLECTIONS_QUERY } from "@/features/collections/queries";
import { PreloadQuery } from "@/lib/thor/apollo-client";
import { getCountryByCountryCode } from "@/utils/countries";
import { Suspense } from "react";

export default async function CollectionsPage({
  params,
}: PageProps<"/[countryCode]/collections">) {
  const { countryCode } = await params;

  const country = getCountryByCountryCode(countryCode);
  const variables: CollectionsQueryVariables = {
    currency: country.currencies[0],
    storeId: country.store,
  };

  return (
    <PreloadQuery query={COLLECTIONS_QUERY} variables={variables}>
      <ProductGridHeader heading="Collections" />
      <Suspense fallback={<TaxonomyGridSkeleton />}>
        <CollectionsList variables={variables} />
      </Suspense>
    </PreloadQuery>
  );
}
