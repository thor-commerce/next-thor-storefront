"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, Dialog, DialogTrigger, Heading, Modal, ModalOverlay } from "react-aria-components";
import { SlidersHorizontal, X } from "lucide-react";
import { FacetFragment } from "@/lib/thorcommerce/storefront/generated/types.generated";
import ProductListFilters from "./product-list-filters";
import { PRICE_MAX_PARAM, PRICE_MIN_PARAM } from "./filters";
import s from "./product-list.module.css";

type Props = {
	facets: FacetFragment[];
	currency: string;
	fractionDigits?: number;
};

export default function MobileFilterDrawer({ facets, currency, fractionDigits }: Props) {
	const [open, setOpen] = useState(false);
	const [isClearing, startTransition] = useTransition();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const filterKeys = [
		...new Set([...facets.map((facet) => facet.queryField.toLowerCase()), PRICE_MIN_PARAM, PRICE_MAX_PARAM]),
	];
	const activeCount =
		filterKeys
			.filter((key) => key !== "price" && key !== PRICE_MIN_PARAM && key !== PRICE_MAX_PARAM)
			.reduce((count, key) => count + searchParams.getAll(key).length, 0) +
		(searchParams.has(PRICE_MIN_PARAM) || searchParams.has(PRICE_MAX_PARAM) ? 1 : 0);

	if (facets.length === 0) return null;

	const clearFilters = () => {
		const params = new URLSearchParams(searchParams.toString());
		filterKeys.forEach((key) => params.delete(key));
		params.delete("after");
		const query = params.toString();
		startTransition(() => router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false }));
	};

	return (
		<div className={s.mobileFilters}>
			<DialogTrigger
				isOpen={open}
				onOpenChange={(value) => {
					if (value) {
						const root = document.documentElement;
						root.style.setProperty("--filter-scrollbar-width", `${window.innerWidth - root.clientWidth}px`);
					}
					setOpen(value);
				}}
			>
				<Button className={s.mobileFilterButton} aria-label="Open filters">
					<span>Filters{activeCount > 0 ? ` (${activeCount})` : ""}</span>
					<SlidersHorizontal size={18} strokeWidth={1.75} aria-hidden />
				</Button>
				<ModalOverlay isDismissable className={s.filterOverlay}>
					<Modal className={s.filterDrawerModal}>
						<Dialog className={s.filterDialog}>
							<header className={s.filterDrawerHeader}>
								<Heading slot="title">Filters</Heading>
								<Button className={s.filterClose} aria-label="Close filters" onPress={() => setOpen(false)}>
									<X size={22} strokeWidth={1.75} aria-hidden />
								</Button>
							</header>
							<div className={s.filterDrawerBody}>
								<ProductListFilters
									facets={facets}
									currency={currency}
									fractionDigits={fractionDigits}
									idPrefix="mobile"
								/>
							</div>
							<footer className={s.filterDrawerFooter}>
								<Button
									className={s.filterClear}
									onPress={clearFilters}
									isDisabled={activeCount === 0 || isClearing}
								>
									{isClearing ? "Clearing…" : "Clear filters"}
								</Button>
								<Button className={s.filterDone} onPress={() => setOpen(false)}>
									View results
								</Button>
							</footer>
						</Dialog>
					</Modal>
				</ModalOverlay>
			</DialogTrigger>
		</div>
	);
}
