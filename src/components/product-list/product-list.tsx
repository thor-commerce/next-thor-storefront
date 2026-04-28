import { PropsWithChildren } from "react";
import s from "./product-list.module.css";
import {
	FacetFragment,
	ProductListTileFragment,
} from "@/lib/thorcommerce/storefront/generated/types.generated";
import ProductListTile from "@/components/product-list/product-list-tile";
import Text from "@/components/text/text";
import { ChevronRight, SlidersHorizontalIcon } from "lucide-react";
import Navigation from "@/components/navigation/navigation";
import ProductListingSort from "@/components/product-list/product-listing-sort";
import ProductListFilters from "@/components/product-list/product-list-filters";

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
}: Props) {
	const useMaxPrice = sorting.value === "price-desc";

	return (
		<div className={s.wrapper}>
			<div className={s.container}>
				<div className={s.filters}>
					<div className={s.filterHeader}>
						<SlidersHorizontalIcon />
						<Text size={"body-1"}>Filters</Text>
					</div>
					<div className={s.facetsContainer}>
						<ProductListFilters facets={facets} currency={currency} fractionDigits={fractionDigits} />
					</div>
				</div>
				<div className={s.content}>
					<div className={s.breadcrumbs}>
						<ul className={s.breadcrumbList}>
							{breadcrumbs.map((item, i) => {
								const isActive = i === breadcrumbs.length - 1;
								return (
									<li
										key={item.href}
										className={s.breadcrumbItem}
										aria-current={isActive ? "page" : undefined}
									>
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
						</ul>
					</div>
					<div className={s.hero}>
						<h1 className={s.heading}>{title}</h1>
						{totalCount !== undefined && <Text size={"body-3"}>{totalCount} items</Text>}
					</div>
					<div className={s.header}>
						<ProductListingSort {...sorting} />
					</div>
					<ul className={s.grid}>
						{products.map((product, index) => (
							<ProductListTile key={product.id} item={product} useMaxPrice={useMaxPrice} lcp={index <= 8} />
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
