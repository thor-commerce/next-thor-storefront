"use client";

import { CategoriesQueryVariables } from "@/__generated__/thor/graphql";
import TaxonomyGrid from "@/components/taxonomy-grid/taxonomy-grid";
import { mapEdgesToItems } from "@/utils/maps";
import { useSuspenseQuery } from "@apollo/client/react";
import { CATEGORIES_QUERY } from "../queries";

type Props = {
  variables: CategoriesQueryVariables;
};

const formatCategoryMeta = (productsCount: number, childrenCount: number) => {
  const meta = [`${productsCount} ${productsCount === 1 ? "product" : "products"}`];

  if (childrenCount > 0) {
    meta.push(`${childrenCount} ${childrenCount === 1 ? "subcategory" : "subcategories"}`);
  }

  return meta.join(" · ");
};

export default function CategoriesList({ variables }: Props) {
  const { data } = useSuspenseQuery(CATEGORIES_QUERY, {
    variables,
  });

  const categories = mapEdgesToItems(data.categories).map((category) => ({
    id: category.id,
    href: `/categories/${category.slug}`,
    title: category.name,
    meta: formatCategoryMeta(category.productsCount, category.childrenCount),
  }));

  return <TaxonomyGrid items={categories} />;
}
