"use client";

import { useOptimistic, startTransition } from "react";
import { Button as AriaButton, Disclosure, DisclosurePanel, Heading } from "react-aria-components";
import s from "./product-list.module.css";

export type FilterOption<TValue extends string = string> = {
	value: TValue;
	label: string;
	count?: number;
};

export type FilterControlProps<TValue extends string = string> = {
	id: string;
	label: string;
	filterOptions: FilterOption<TValue>[];
	currentValues?: TValue[];
	onFilterChange: (values: TValue[]) => void;
};

export default function FilterControl<TValue extends string = string>({
	id,
	label,
	filterOptions,
	currentValues = [],
	onFilterChange,
}: FilterControlProps<TValue>) {
	const [displayValues, setOptimisticValues] = useOptimistic(currentValues);
	const handleToggle = (value: TValue) => {
		const nextValues = displayValues.includes(value)
			? displayValues.filter((selected) => selected !== value)
			: [...displayValues, value];
		startTransition(() => {
			setOptimisticValues(nextValues);
			onFilterChange(nextValues);
		});
	};

	const selectedCount = displayValues.length;

	return (
		<Disclosure id={id} className={s.filterAccordion}>
			<Heading>
				<AriaButton slot="trigger" className={s.accordionTrigger}>
					<span className={s.accordionLabel}>
						{label}
						{selectedCount > 0 && <span className={s.selectedCount}>({selectedCount})</span>}
					</span>
					<span className={s.accordionIcon} aria-hidden>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</span>
				</AriaButton>
			</Heading>
			<DisclosurePanel className={s.accordionPanel}>
				<div className={`${s.accordionContent} ${s.filterOptions}`}>
					{filterOptions.map((option) => {
						const isSelected = displayValues.includes(option.value);
						return (
							<label key={option.value} className={s.filterOption} data-selected={isSelected}>
								<input
									type="checkbox"
									className={s.filterCheckbox}
									checked={isSelected}
									onChange={() => handleToggle(option.value)}
								/>
								<span className={s.filterOptionLabel}>{option.label}</span>
								{option.count !== undefined && <span className={s.filterOptionCount}>({option.count})</span>}
							</label>
						);
					})}
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
}
