"use client";

import { CollectionGridQueryVariables } from "@/__generated__/thor/graphql";
import { ProductGridLoadMore } from "@/components/product-grid/product-grid-load-more";
import ProductGridHeader from "@/components/product-grid/product-grid-header";
import ProductGrid from "@/components/product-grid/product-grid";
import ProductGridTile from "@/components/product-grid/product-grid-tile";
import ProductListingSort from "@/features/product-listing/product-listing-sort";
import {
  TAXONOMY_SORT_OPTIONS,
  formatProductCount,
} from "@/features/product-listing/sort";
import { mapEdgesToItems } from "@/utils/maps";
import { useSuspenseQuery } from "@apollo/client/react";
import { startTransition, useCallback } from "react";
import { COLLECTION_GRID_QUERY } from "../queries";

type Props = {
  variables: CollectionGridQueryVariables;
  sortValue: string;
};

export default function CollectionGrid({ variables, sortValue }: Props) {
  const { data, fetchMore } = useSuspenseQuery(COLLECTION_GRID_QUERY, {
    variables,
  });
  const collection = data.collection;
  const products = mapEdgesToItems(collection?.products);
  const hasNextPage = collection?.products.pageInfo.hasNextPage ?? false;

  const handleLoadMore = useCallback(() => {
    if (!collection || !hasNextPage) {
      return;
    }

    startTransition(() => {
      fetchMore({
        variables: {
          after: collection.products.pageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult?.collection?.products) {
            return prev;
          }

          return {
            ...prev,
            collection: prev.collection
              ? {
                  ...prev.collection,
                  ...fetchMoreResult.collection,
                  products: {
                    ...fetchMoreResult.collection.products,
                    edges: [
                      ...(prev.collection.products.edges || []),
                      ...(fetchMoreResult.collection.products.edges || []),
                    ],
                  },
                }
              : fetchMoreResult.collection,
          };
        },
      });
    });
  }, [collection, fetchMore, hasNextPage]);

  if (!collection) {
    return null;
  }

  return (
    <>
      <ProductGridHeader
        heading={collection.name}
        meta={formatProductCount(collection.products.totalCount)}
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
          <ProductGridTile key={product.id} productFragment={product} />
        ))}
        <ProductGridLoadMore loadMore={handleLoadMore} hasNextPage={hasNextPage} />
      </ProductGrid>
    </>
  );
}
