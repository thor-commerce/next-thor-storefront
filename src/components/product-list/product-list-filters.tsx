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
};

const getParamKey = (field: string) => field.toLowerCase();

function parsePriceBounds(facet: FacetFragment): { min: number; max: number } {
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

	return { min: 0, max: 10000 };
}

export default function ProductListFilters({ facets, currency, fractionDigits }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [, startTransition] = useTransition();

	const pushParams = (params: URLSearchParams) => {
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
				if (facet.field === FacetField.Price) {
					const bounds = parsePriceBounds(facet);

					const rawMin = searchParams.get(PRICE_MIN_PARAM);
					const rawMax = searchParams.get(PRICE_MAX_PARAM);
					const currentMin = rawMin !== null && Number.isFinite(Number(rawMin)) ? Number(rawMin) : undefined;
					const currentMax = rawMax !== null && Number.isFinite(Number(rawMax)) ? Number(rawMax) : undefined;
					return (
						<PriceRangeFilter
							key={facet.field}
							id={facet.field}
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

				const key = getParamKey(facet.field);
				const currentValues = searchParams.getAll(key);

				return (
					<FilterControl
						key={facet.field}
						id={facet.field}
						label={facet.name}
						currentValues={currentValues}
						filterOptions={facet.values.map((v) => ({
							value: v.name,
							label: v.name,
							count: v.count,
						}))}
						onFilterChange={(values) => updateFilter(facet.field, values)}
					/>
				);
			})}
		</>
	);
}
