import { ProductDetailQuery } from "@/lib/thorcommerce/storefront/generated/types.generated";

export interface Edge<T> {
    node?: T | null;
}
export interface Connection<T> {
    edges?: Array<Edge<T> | null> | undefined | null;
}


export type ProductDetail = NonNullable<ProductDetailQuery["product"]>;

export type ProductDetailVariant = NonNullable<ProductDetail["variants"]["edges"]>[number]["node"];