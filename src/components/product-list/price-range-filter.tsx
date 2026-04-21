"use client";

import { useEffect, useState } from "react";
import {
	Button as AriaButton,
	Disclosure,
	DisclosurePanel,
	Heading,
	Slider as AriaSlider,
	SliderOutput,
	SliderThumb,
	SliderTrack,
} from "react-aria-components";
import { formatMoney } from "@/utils/money";
import s from "./product-list.module.css";

export type PriceRangeFilterProps = {
	id: string;
	label: string;
	min: number;
	max: number;
	step?: number;
	currentMin?: number;
	currentMax?: number;
	currency: string;
	fractionDigits?: number;
	onChange: (next: { min?: number; max?: number }) => void;
};

export default function PriceRangeFilter({
	id,
	label,
	min,
	max,
	step = 1,
	currentMin,
	currentMax,
	currency,
	fractionDigits = 2,
	onChange,
}: PriceRangeFilterProps) {
	const effectiveMin = currentMin ?? min;
	const effectiveMax = currentMax ?? max;

	const [optimistic, setOptimistic] = useState<[number, number] | undefined>();
	const displayValue: [number, number] = optimistic ?? [effectiveMin, effectiveMax];

	useEffect(() => {
		if (optimistic && optimistic[0] === effectiveMin && optimistic[1] === effectiveMax) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setOptimistic(undefined);
		}
	}, [effectiveMin, effectiveMax, optimistic]);

	const handleChangeEnd = (value: number | number[]) => {
		if (!Array.isArray(value) || value.length !== 2) return;
		const [nextMin, nextMax] = value;
		onChange({
			min: nextMin === min ? undefined : nextMin,
			max: nextMax === max ? undefined : nextMax,
		});
	};

	const format = (centAmount: number) =>
		formatMoney({
			money: { centAmount, currencyCode: currency, fractionDigits },
		}) ?? String(centAmount);

	const isActive = displayValue[0] !== min || displayValue[1] !== max;

	return (
		<Disclosure id={id} className={s.filterAccordion} defaultExpanded>
			<Heading>
				<AriaButton slot="trigger" className={s.accordionTrigger}>
					<span className={s.accordionLabel}>
						{label}
						{isActive && <span className={s.selectedCount}>(1)</span>}
					</span>
					<span className={s.accordionIcon} aria-hidden>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</span>
				</AriaButton>
			</Heading>
			<DisclosurePanel className={s.accordionPanel}>
				<AriaSlider
					className={s.priceSlider}
					minValue={min}
					maxValue={max}
					step={step}
					value={displayValue}
					onChange={(v) => {
						if (Array.isArray(v) && v.length === 2) {
							setOptimistic([v[0], v[1]]);
						}
					}}
					onChangeEnd={handleChangeEnd}
					aria-label={label}
				>
					<SliderOutput className={s.priceSliderOutput}>
						{({ state }) => `${format(state.values[0])} – ${format(state.values[1])}`}
					</SliderOutput>
					<SliderTrack className={s.priceSliderTrack}>
						{({ state, isDisabled }) => (
							<>
								<div className={s.priceSliderRail} data-disabled={isDisabled || undefined} />
								<div
									className={s.priceSliderFill}
									data-disabled={isDisabled || undefined}
									style={{
										left: `${state.getThumbPercent(0) * 100}%`,
										width: `${(state.getThumbPercent(1) - state.getThumbPercent(0)) * 100}%`,
									}}
								/>
								{state.values.map((_, i) => (
									<SliderThumb
										key={i}
										index={i}
										className={s.priceSliderThumb}
										aria-label={i === 0 ? "Minimum price" : "Maximum price"}
									/>
								))}
							</>
						)}
					</SliderTrack>
				</AriaSlider>
				<div className={s.priceSliderBounds} aria-hidden>
					<span>{format(min)}</span>
					<span>{format(max)}</span>
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
}
