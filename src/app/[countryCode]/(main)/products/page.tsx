import {
  ProductsGridQueryVariables,
  ProductSortKeys,
  SortDirection,
} from "@/__generated__/thor/graphql";
import { ProductGridSkeleton } from "@/components/product-grid/product-grid";
import ProductGridHeader from "@/components/product-grid/product-grid-header";
import ProductsGrid from "@/features/products/products-grid/products-grid";
import { PRODUCTS_GRID_QUERY } from "@/features/products/queries";

import { PreloadQuery } from "@/lib/thor/apollo-client";
import { getCountryByCountryCode } from "@/utils/countries";
import { Suspense } from "react";

export default async function AllProductsPage({
  params,
}: PageProps<"/[countryCode]/products">) {
  const { countryCode } = await params;

  const country = getCountryByCountryCode(countryCode);
  const variables: ProductsGridQueryVariables = {
    currency: country.currencies[0],
    storeId: country.store,
    sortKey: ProductSortKeys.Id,
    sortDirection: SortDirection.Asc,
  };

  return (
    <PreloadQuery query={PRODUCTS_GRID_QUERY} variables={variables}>
      <ProductGridHeader heading="All products" />
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductsGrid variables={variables} />
      </Suspense>
    </PreloadQuery>
  );
}
