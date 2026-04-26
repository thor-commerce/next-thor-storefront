import { ProductDetailQuery } from "@/lib/thorcommerce/storefront/generated/types.generated";

export type ProductDetailProduct = NonNullable<ProductDetailQuery["product"]>;

export type ProductDetailProductVariant = NonNullable<
  ProductDetailProduct["variants"]["edges"]
>[number]["node"];
