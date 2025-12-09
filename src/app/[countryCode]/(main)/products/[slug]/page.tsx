
import {
  ProductDetailQuery,
  ProductDetailQueryVariables,
} from "@/__generated__/thor/graphql";
import { CACHE_TAGS } from "@/constants";
import ProductBlock from "@/features/products/product-block/product-block";
import { PRODUCT_QUERY } from "@/features/products/queries";
import { getClient } from "@/lib/thor/apollo-client";
import { getCountryByCountryCode } from "@/utils/countries";
import { mapEdgesToItems } from "@/utils/maps";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
  searchParams,
}: PageProps<"/[countryCode]/products/[slug]">) {
  const { slug, countryCode } = await params;
  const { variant } = await searchParams;

  const country = getCountryByCountryCode(countryCode);

  const { data } = await (await getClient()).query<
    ProductDetailQuery,
    ProductDetailQueryVariables
  >({
    query: PRODUCT_QUERY,
    variables: {
      slug,
      currency: country.currencies[0],
      channelId: country.channel,
    },
        context: {
        fetchOptions: {
          tags: "prod",
        },
      },
  });
  const product = data?.product;

  if (!product) return notFound();

  const productVariants = mapEdgesToItems(product.variants);

  let selectedVariant = productVariants.find(Boolean);

  if (variant) {
    selectedVariant =
      productVariants.find((v) => v.id === variant) || selectedVariant;
  }

  //no variants found.
  if (!selectedVariant) return notFound();

  return (
    <>
      <ProductBlock product={product} selectedVariant={selectedVariant} />
    </>
  );
}
