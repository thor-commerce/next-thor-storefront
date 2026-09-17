"use client";

import { useId } from "react";
import { Availability, getAvailabilityStatus, removeEdgesAndNodes } from "@/lib/thorcommerce/utils";
import ThorImage from "@/components/thor-image/thor-image";
import type { ProductDetail, ProductDetailVariant } from "@/lib/thorcommerce/types";
import { findVariantForOption, getAttributeValues } from "./variant-selection";
import s from "./product-attribute-selector.module.css";

type Props = {
	variants: ProductDetailVariant[];
	assignments: ProductDetail["attributeAssignments"];
	selectedVariant: ProductDetailVariant;
	onSelect: (variant: ProductDetailVariant) => void;
};

export default function ProductAttributeSelector({
	variants,
	assignments,
	selectedVariant,
	onSelect,
}: Props) {
	const prefix = useId();
	return (
		<div className={s.selector}>
			{assignments.map((group) => {
				const isColor = group.attribute.name.toLowerCase() === "color";
				const selected = selectedVariant.selectedAttributes.find(
					(item) => item.attribute.id === group.attribute.id,
				)?.attributeValue;
				return (
					<fieldset key={group.attribute.id} className={s.group}>
						<legend>
							{group.attribute.name}
							<span className={s.selectedValue}>{selected?.value}</span>
						</legend>
						<div className={s.options} data-packshots={isColor || undefined}>
							{getAttributeValues(group.attribute.id, removeEdgesAndNodes(group.values), variants).map(
								(value) => {
									const swatch = value.__typename === "SwatchAttributeValue" ? value : null;
									const id = `${prefix}-${group.attribute.id}-${value.id}`;
									const target = findVariantForOption(
										variants,
										selectedVariant,
										group.attribute.id,
										value.id,
									);
									const packshot = isColor
										? (target?.media.edges?.[0]?.node.src ??
											variants.find(
												(variant) =>
													variant.media.edges?.length &&
													variant.selectedAttributes.some(
														(selection) =>
															selection.attribute.id === group.attribute.id &&
															selection.attributeValue.id === value.id,
													),
											)?.media.edges?.[0]?.node.src)
										: undefined;
									const unavailable =
										!target?.price ||
										getAvailabilityStatus({ availability: target?.availability }) !== Availability.InStock;
									return (
										<label
											key={value.id}
											htmlFor={id}
											className={s.option}
											data-packshot={isColor || undefined}
											data-unavailable={unavailable || undefined}
											title={unavailable ? `${value.value} — unavailable` : value.value}
										>
											<input
												id={id}
												type="radio"
												name={`${prefix}-${group.attribute.id}`}
												value={value.id}
												disabled={!target}
												aria-label={unavailable ? `${value.value} — unavailable` : value.value}
												checked={selected?.id === value.id}
												onChange={() => {
													if (target) onSelect(target);
												}}
											/>
											<span className={s.label}>
												{isColor ? (
													packshot ? (
														<ThorImage src={packshot} alt="" fill sizes="64px" />
													) : (
														value.value
													)
												) : swatch?.media ? (
													<span className={s.swatch}>
														<ThorImage src={swatch.media.src} alt="" fill sizes="28px" />
													</span>
												) : swatch?.color ? (
													<span className={s.swatch} style={{ backgroundColor: swatch.color }} />
												) : null}
												{!isColor && value.value}
											</span>
										</label>
									);
								},
							)}
						</div>
					</fieldset>
				);
			})}
		</div>
	);
}
