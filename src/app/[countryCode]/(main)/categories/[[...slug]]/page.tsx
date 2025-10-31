import {
  CategoryGridQueryVariables,
  ProductCategorySortKeys,
  SortDirection,
} from "@/__generated__/thor/graphql";
import CategoryGrid from "@/features/categories/category-grid/category-grid";
import { CATEGORY_GRID_QUERY } from "@/features/categories/queries";

import { PreloadQuery } from "@/lib/thor/apollo-client";
import { getCountryByCountryCode } from "@/utils/countries";

export default async function CategoryPage({
  params,
}: PageProps<"/[countryCode]/categories/[[...slug]]">) {
  const { slug, countryCode } = await params;

  const categorySlug = slug?.[slug.length - 1];

  if (!categorySlug) {
    throw new Error("Category slug is required");
  }

  const country = getCountryByCountryCode(countryCode);
  const variables: CategoryGridQueryVariables = {
    slug: categorySlug.toLowerCase(),
    currency: country.currencies[0],
    channelId: country.channel,
    sortKey: ProductCategorySortKeys.Manual,
    sortDirection: SortDirection.Asc,
  };

  return (
    <PreloadQuery query={CATEGORY_GRID_QUERY} variables={variables}>
      <CategoryGrid variables={variables} />
    </PreloadQuery>
  );
}
