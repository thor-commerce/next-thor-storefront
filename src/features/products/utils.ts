import { CategoryBreadcrumbFragment } from "@/lib/thorcommerce/storefront/generated/types.generated";

export const generateBreadcrumbs = (productCategory?: CategoryBreadcrumbFragment | null) => {

    if (!productCategory) {
        return [{ label: "Products", href: "/products" }];
    }

    const breadcrumbs = [
        { label: "Products", href: "/products" },
        ...productCategory.ancestors.map((ancestor) => ({
            label: ancestor.name,
            href: `/categories/${ancestor.slug}`,
        })),
        {
            label: productCategory.name,
            href: `/categories/${productCategory.slug}`,
        },
    ];

    return breadcrumbs;
}