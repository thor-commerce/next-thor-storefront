import CollectionPage from "@/features/collections/collection-page/collection-page";
import { getCollectionSort } from "@/components/product-list/sort";
import { getCollectionList } from "@/lib/thorcommerce/storefront";
import { getRequestContext } from "@/lib/request-context";

export default async function Collection({
	params,
	searchParams,
}: PageProps<"/[countryCode]/collections/[slug]">) {
	const { slug } = await params;
	const { sort } = await searchParams;
	const selectedSort = getCollectionSort(sort);
	const { currency } = await getRequestContext();

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
			currency={currency}
		/>
	);
}
