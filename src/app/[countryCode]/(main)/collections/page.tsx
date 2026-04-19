import ProductGridHeader from "@/components/product-grid/product-grid-header";
import TaxonomyGrid from "@/components/taxonomy-grid/taxonomy-grid";
import { getCollections } from "@/lib/thorcommerce/storefront";

export default async function CollectionsPage({}: PageProps<"/[countryCode]/collections">) {
	const collections = (await getCollections()).map((collection) => ({
		id: collection.id,
		href: `/collections/${collection.slug}`,
		title: collection.name,
		meta: `${collection.products.totalCount} ${
			collection.products.totalCount === 1 ? "product" : "products"
		}`,
	}));

	return (
		<>
			<ProductGridHeader heading="Collections" />
			<TaxonomyGrid items={collections} />
		</>
	);
}
