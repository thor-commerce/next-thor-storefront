import {
  ProductCategorySortKeys,
  ProductsGridQueryVariables,
  ProductSortKeys,
  SortDirection,
} from "@/__generated__/thor/graphql";
import ProductsGrid from "@/features/products/products-grid/products-grid";
import { PRODUCTS_GRID_QUERY } from "@/features/products/queries";

import { PreloadQuery } from "@/lib/thor/apollo-client";
import { getCountryByCountryCode } from "@/utils/countries";

export default async function AllProductsPage({
  params,
}: PageProps<"/[countryCode]/products">) {
  const { countryCode } = await params;

  const country = getCountryByCountryCode(countryCode);
  const variables: ProductsGridQueryVariables = {
    currency: country.currencies[0],
    channelId: country.channel,
    sortKey: ProductSortKeys.Id,
    sortDirection: SortDirection.Asc,
  };

  return (
    <PreloadQuery query={PRODUCTS_GRID_QUERY} variables={variables}>
      <ProductsGrid variables={variables} />
    </PreloadQuery>
  );
}
