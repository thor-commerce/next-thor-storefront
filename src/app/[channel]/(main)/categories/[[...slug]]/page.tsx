import { gql } from "@/__generated__/thor";
import {
  CategoryGridQueryVariables,
  SortDirection,
} from "@/__generated__/thor/graphql";
import CategoryGrid from "@/features/categories/category-grid/category-grid";
import { CATEGORY_GRID_QUERY } from "@/features/categories/queries";

import { PreloadQuery } from "@/lib/thor/apollo-client";

export default async function CategoryPage({
  params,
}: PageProps<"/[channel]/categories/[[...slug]]">) {
  const { slug } = await params;

  const categorySlug = slug?.[slug.length - 1];

  if (!categorySlug) {
    throw new Error("Category slug is required");
  }

  const variables: CategoryGridQueryVariables = {
    slug: categorySlug,
    sortDirection: SortDirection.Asc,
    curreny: "USD",
    channelId: "ch_01k8tn63mgf9baxksv6exmq2gm",
    // sortKey: sortKey,
    // sortDirection: sortDirection,
    // currency: country.currencies[0],
  };

  return (
    <PreloadQuery query={CATEGORY_GRID_QUERY} variables={variables}>
      <CategoryGrid variables={variables} />
    </PreloadQuery>
  );
}
