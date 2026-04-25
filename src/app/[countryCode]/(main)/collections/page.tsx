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
			<TaxonomyGrid items={collections} />
		</>
	);
}
