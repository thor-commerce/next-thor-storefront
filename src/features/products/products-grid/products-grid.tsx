"use client";
import { ProductsGridQueryVariables } from "@/__generated__/thor/graphql";
import ProductGrid from "@/components/product-grid/product-grid";
import ProductGridTile from "@/components/product-grid/product-grid-tile";
import { mapEdgesToItems } from "@/utils/maps";

import { useSuspenseQuery } from "@apollo/client/react";
import { PRODUCTS_GRID_QUERY } from "../queries";
import { ProductGridLoadMore } from "@/components/product-grid/product-grid-load-more";
import { startTransition, useCallback } from "react";

type Props = {
  variables: ProductsGridQueryVariables;
};
export default function ProductsGrid({ variables }: Props) {
  const { data, fetchMore } = useSuspenseQuery(PRODUCTS_GRID_QUERY, {
    variables,
  });

  const products = mapEdgesToItems(data.products);
  const hasNextPage = data.products.pageInfo.hasNextPage;

  const handleLoadMore = useCallback(() => {
    if (!hasNextPage) {
      return;
    }
    startTransition(() => {
      fetchMore({
        variables: {
          after: data.products.pageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          //merge the products from the previous result with the new ones
          if (!fetchMoreResult?.products) {
            return prev;
          }

          return {
            ...prev,
            products: {
              ...fetchMoreResult.products,
              edges: [
                ...(prev?.products.edges || []),
                ...(fetchMoreResult.products.edges || []),
              ],
            },
          };
        },
      });
    });
  }, [data, fetchMore, hasNextPage]);

  return (
    <>
      <ProductGrid>
        {products?.map((product) => (
          <ProductGridTile key={product.id} productFragment={product} />
        ))}
        <ProductGridLoadMore
          loadMore={handleLoadMore}
          hasNextPage={hasNextPage}
        />
      </ProductGrid>
    </>
  );
}
