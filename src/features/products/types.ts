import { ProductDetailQuery } from "@/__generated__/thor/graphql";

export type ProductDetailProduct = NonNullable<ProductDetailQuery["product"]>;

export type ProductDetailProductVariant = NonNullable<
  ProductDetailProduct["variants"]["edges"]
>[number]["node"];
