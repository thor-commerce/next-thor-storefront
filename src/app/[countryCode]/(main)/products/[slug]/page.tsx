import ProductDetailPage from "@/features/products/product-detail-page/product-detail-page";
import { getProductDetail } from "@/lib/thorcommerce/storefront";
import { removeEdgesAndNodes } from "@/lib/thorcommerce/utils";
import { notFound } from "next/navigation";

export default async function ProductPage({
	params,
	searchParams,
}: PageProps<"/[countryCode]/products/[slug]">) {
	const { slug } = await params;
	const { variant } = await searchParams;

	const product = await getProductDetail({ slug });

	if (!product) return notFound();

	const productVariants = removeEdgesAndNodes(product.variants);

	let selectedVariant = productVariants.find(Boolean);

	if (variant) {
		selectedVariant = productVariants.find((v) => v.id === variant) || selectedVariant;
	}

	//no variants found.
	if (!selectedVariant) return notFound();

	return <ProductDetailPage product={product} selectedVariant={selectedVariant} />;
}
