import CollectionPage from "@/features/collections/collection-page/collection-page";
import { getCollectionSort } from "@/features/product-listing/sort";
import { getCollectionList } from "@/lib/thorcommerce/storefront";

export default async function Collection({
	params,
	searchParams,
}: PageProps<"/[countryCode]/collections/[slug]">) {
	const { slug } = await params;
	const { sort } = await searchParams;
	const selectedSort = getCollectionSort(sort);

	const { name, products, totalCount } = await getCollectionList({
		slug: slug.toLowerCase(),
		sortDirection: selectedSort.sortDirection,
		sortKey: selectedSort.sortKey,
	});

	return (
		<CollectionPage
			name={name}
			products={products}
			totalCount={totalCount}
			sortValue={selectedSort.selected}
		/>
	);
}
