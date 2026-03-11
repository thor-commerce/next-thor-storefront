"use client";

import { CollectionsQueryVariables } from "@/__generated__/thor/graphql";
import TaxonomyGrid from "@/components/taxonomy-grid/taxonomy-grid";
import { mapEdgesToItems } from "@/utils/maps";
import { useSuspenseQuery } from "@apollo/client/react";
import { COLLECTIONS_QUERY } from "../queries";

type Props = {
  variables: CollectionsQueryVariables;
};

export default function CollectionsList({ variables }: Props) {
  const { data } = useSuspenseQuery(COLLECTIONS_QUERY, {
    variables,
  });

  const collections = mapEdgesToItems(data.collections).map((collection) => ({
    id: collection.id,
    href: `/collections/${collection.slug}`,
    title: collection.name,
    meta: `${collection.products.totalCount} ${
      collection.products.totalCount === 1 ? "product" : "products"
    }`,
  }));

  return <TaxonomyGrid items={collections} />;
}
