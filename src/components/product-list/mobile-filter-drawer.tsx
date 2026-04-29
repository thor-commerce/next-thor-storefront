"use client";

import Drawer from "@/components/drawer/drawer";
import { SlidersHorizontal, X } from "lucide-react";
import { FacetFragment } from "@/lib/thorcommerce/storefront/generated/types.generated";
import ProductListFilters from "./product-list-filters";
import s from "./product-list.module.css";

type Props = {
	facets: FacetFragment[];
	currency: string;
	fractionDigits?: number;
};

export default function MobileFilterDrawer({ facets, currency, fractionDigits }: Props) {
	if (facets.length === 0) return null;

	return (
		<div className={s.mobileFilters}>
			<Drawer
				heading="Filters"
				closeButton={<X size={20} aria-hidden />}
				triggerElement={
					<button type="button" className={s.mobileFilterButton} aria-label="Open filters">
						<SlidersHorizontal size={18} aria-hidden />
						<span>Filters</span>
					</button>
				}
				modalClassName={s.filterDrawerModal}
			>
				<div className={s.filterDrawerBody}>
					<ProductListFilters
						facets={facets}
						currency={currency}
						fractionDigits={fractionDigits}
						idPrefix="mobile"
					/>
				</div>
			</Drawer>
		</div>
	);
}
