import ProductGridHeader from "@/components/product-grid/product-grid-header";
import TaxonomyGrid from "@/components/taxonomy-grid/taxonomy-grid";
import { getCategories } from "@/lib/thorcommerce/storefront";

const formatCategoryMeta = (productsCount: number, childrenCount: number) => {
	const meta = [`${productsCount} ${productsCount === 1 ? "product" : "products"}`];

	if (childrenCount > 0) {
		meta.push(`${childrenCount} ${childrenCount === 1 ? "subcategory" : "subcategories"}`);
	}

	return meta.join(" · ");
};

export default async function CategoriesPage({}: PageProps<"/[countryCode]/categories">) {
	const categories = (await getCategories()).map((category) => ({
		id: category.id,
		href: `/categories/${category.slug}`,
		title: category.name,
		meta: formatCategoryMeta(category.products.totalCount, category.childrenCount),
	}));

	return (
		<>
			<ProductGridHeader heading="Categories" />
			<TaxonomyGrid items={categories} />;
		</>
	);
}
