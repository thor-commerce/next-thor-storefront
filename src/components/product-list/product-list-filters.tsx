"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { FacetField, FacetFragment } from "@/lib/thorcommerce/storefront/generated/types.generated";
import FilterControl from "./filter-control";
import PriceRangeFilter from "./price-range-filter";
import { PRICE_MAX_PARAM, PRICE_MIN_PARAM } from "./filters";

type Props = {
	facets: FacetFragment[];
	currency: string;
	fractionDigits?: number;
	idPrefix?: string;
};

const getParamKey = (field: string) => field.toLowerCase();

function parsePriceBounds(facet: FacetFragment): { min: number; max: number } | null {
	const minValue = facet.values.find((v) => v.name === "min")?.count;
	const maxValue = facet.values.find((v) => v.name === "max")?.count;

	if (
		typeof minValue === "number" &&
		typeof maxValue === "number" &&
		Number.isFinite(minValue) &&
		Number.isFinite(maxValue) &&
		minValue < maxValue
	) {
		return { min: Math.floor(minValue), max: Math.ceil(maxValue) };
	}

	return null;
}

export default function ProductListFilters({ facets, currency, fractionDigits, idPrefix }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [, startTransition] = useTransition();

	const pushParams = (params: URLSearchParams) => {
		params.delete("after");
		const query = params.toString();
		startTransition(() => {
			router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
		});
	};

	const updateFilter = (field: string, nextValues: string[]) => {
		const params = new URLSearchParams(searchParams.toString());
		const key = getParamKey(field);

		params.delete(key);
		for (const value of nextValues) {
			params.append(key, value);
		}

		pushParams(params);
	};

	const updatePriceRange = ({ min, max }: { min?: number; max?: number }) => {
		const params = new URLSearchParams(searchParams.toString());

		if (min === undefined) params.delete(PRICE_MIN_PARAM);
		else params.set(PRICE_MIN_PARAM, String(min));

		if (max === undefined) params.delete(PRICE_MAX_PARAM);
		else params.set(PRICE_MAX_PARAM, String(max));

		pushParams(params);
	};

	if (facets.length === 0) return null;

	return (
		<>
			{facets.map((facet) => {
				const facetKey = `${idPrefix ?? "desktop"}-${facet.queryField}`;

				if (facet.field === FacetField.Price) {
					const bounds = parsePriceBounds(facet);
					if (!bounds) return null;

					const rawMin = searchParams.get(PRICE_MIN_PARAM);
					const rawMax = searchParams.get(PRICE_MAX_PARAM);
					const currentMin = rawMin !== null && Number.isFinite(Number(rawMin)) ? Number(rawMin) : undefined;
					const currentMax = rawMax !== null && Number.isFinite(Number(rawMax)) ? Number(rawMax) : undefined;
					return (
						<PriceRangeFilter
							key={facetKey}
							id={facetKey}
							label={facet.name}
							min={bounds.min}
							max={bounds.max}
							currentMin={currentMin}
							currentMax={currentMax}
							currency={currency}
							fractionDigits={fractionDigits}
							onChange={updatePriceRange}
						/>
					);
				}

				const key = getParamKey(facet.queryField);
				const currentValues = searchParams.getAll(key);

				return (
					<FilterControl
						key={facetKey}
						id={facetKey}
						label={facet.name}
						currentValues={currentValues}
						filterOptions={facet.values.map((v) => ({
							value: v.name,
							label:
								facet.field === FacetField.Availability
									? v.name === "true"
										? "In stock"
										: v.name === "false"
											? "Out of stock"
											: v.name
									: v.name,
							count: v.count,
						}))}
						onFilterChange={(values) => updateFilter(facet.queryField, values)}
					/>
				);
			})}
		</>
	);
}
