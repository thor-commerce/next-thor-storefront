"use client";
import { gql } from "@/__generated__/thor";
import { CategoryGridQueryVariables } from "@/__generated__/thor/graphql";
import ProductGrid from "@/components/product-grid/product-grid";
import ProductGridTile from "@/components/product-grid/product-grid-tile";
import { mapEdgesToItems } from "@/utils/maps";

import { useSuspenseQuery } from "@apollo/client/react";
import { CATEGORY_GRID_QUERY } from "../queries";



type Props = {
  variables: CategoryGridQueryVariables;
};
export default function CategoryGrid({ variables }: Props) {
  const { data, fetchMore } = useSuspenseQuery(CATEGORY_GRID_QUERY, {
    variables,
  });

  if (!data.category) {
    return null;
  }

  const products = mapEdgesToItems(data.category.products);

  return (
    <ProductGrid>
      {products?.map((product) => (
        <ProductGridTile key={product.id} productFragment={product} />
      ))}
    </ProductGrid>
  );
}
