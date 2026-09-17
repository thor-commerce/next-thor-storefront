import ProductPagination from "./product-pagination";
import { PropsWithChildren } from "react";
import s from "./product-list.module.css";
import {
	FacetFragment,
	ProductListTileFragment,
} from "@/lib/thorcommerce/storefront/generated/types.generated";
import ProductListTile from "@/components/product-list/product-list-tile";
import Text from "@/components/text/text";
import { ChevronRight } from "lucide-react";
import Navigation from "@/components/navigation/navigation";
import ProductListingSort from "@/components/product-list/product-listing-sort";
import ProductListFilters from "@/components/product-list/product-list-filters";
import MobileFilterDrawer from "@/components/product-list/mobile-filter-drawer";

type Props = {
	title: string;
	products: ProductListTileFragment[];
	breadcrumbs?: { label: string; href: string }[];
	sorting: {
		value: string;
		defaultValue: string;
		options: { value: string; label: string }[];
	};
	facets?: FacetFragment[];
	totalCount?: number;
	currency: string;
	fractionDigits?: number;
	pageInfo?: { hasNextPage: boolean; endCursor?: string | null };
} & PropsWithChildren;

export default function ProductList({
	title,
	products,
	breadcrumbs = [],
	sorting,
	facets = [],
	totalCount,
	currency,
	fractionDigits,
	pageInfo,
}: Props) {
	const useMaxPrice = sorting.value === "price-desc";

	return (
		<div className={s.page}>
			<div className={s.wrapper}>
				<nav className={s.breadcrumbs} aria-label="Breadcrumb">
					<ol className={s.breadcrumbList}>
						{breadcrumbs.map((item, i) => {
							const isActive = i === breadcrumbs.length - 1;
							return (
								<li key={item.href} className={s.breadcrumbItem} aria-current={isActive ? "page" : undefined}>
									{isActive ? (
										<Text size="body-3" weight={"medium"} className={s.breadcrumbLink}>
											{item.label}
										</Text>
									) : (
										<Navigation href={item.href} className={s.breadcrumbLink}>
											<Text size="body-3" weight={"medium"}>
												{item.label}
											</Text>
										</Navigation>
									)}
									{!isActive && <ChevronRight size={16} />}
								</li>
							);
						})}
					</ol>
				</nav>
				<header className={s.header}>
					<div className={s.hero}>
						<h1 className={s.heading}>{title}</h1>
						{totalCount !== undefined && <span className={s.meta}>({totalCount})</span>}
					</div>
					<div className={s.toolbar}>
						<MobileFilterDrawer facets={facets} currency={currency} fractionDigits={fractionDigits} />
						<ProductListingSort {...sorting} />
					</div>
				</header>
				<div className={s.container} data-has-filters={facets.length > 0}>
					{facets.length > 0 && (
						<aside className={s.filters} aria-label="Product filters">
							<ProductListFilters facets={facets} currency={currency} fractionDigits={fractionDigits} />
						</aside>
					)}
					<div className={s.content}>
						{products.length === 0 && (
							<div className={s.emptyState}>
								<h2>No products found</h2>
								<p>Try adjusting your filters to find something you love.</p>
							</div>
						)}
						<ul className={s.grid}>
							{products.map((product, index) => (
								<ProductListTile key={product.id} item={product} useMaxPrice={useMaxPrice} lcp={index < 3} />
							))}
						</ul>
						{pageInfo && <ProductPagination pageInfo={pageInfo} />}
					</div>
				</div>
			</div>
		</div>
	);
}
