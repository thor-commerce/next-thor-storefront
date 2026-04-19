import CategoryPage from "@/features/categories/category-page/category-page";
import { getCategorySort } from "@/features/product-listing/sort";
import { getCategoryList } from "@/lib/thorcommerce/storefront";

export default async function Category({
	params,
	searchParams,
}: PageProps<"/[countryCode]/categories/[...slug]">) {
	const { slug } = await params;
	const { sort } = await searchParams;
	const selectedSort = getCategorySort(sort);

	const categorySlug = slug?.[slug.length - 1];

	if (!categorySlug) {
		throw new Error("Category slug is required");
	}

	const { name, products, totalCount } = await getCategoryList({
		slug: categorySlug.toLowerCase(),
		sortDirection: selectedSort.sortDirection,
		sortKey: selectedSort.sortKey,
	});

	return (
		<CategoryPage name={name} products={products} totalCount={totalCount} sortValue={selectedSort.selected} />
	);
}
