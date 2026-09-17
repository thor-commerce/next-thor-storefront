"use client";

import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from "react-aria-components";
import { Check, ChevronDown } from "lucide-react";
import s from "./product-list.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
	value: string;
	defaultValue: string;
	options: { value: string; label: string }[];
};

export default function ProductListingSort({ value, defaultValue, options }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleChange = (nextValue: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (nextValue === defaultValue) {
			params.delete("sort");
		} else {
			params.set("sort", nextValue);
		}

		params.delete("after");
		const query = params.toString();
		router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
	};

	return (
		<Select
			className={s.sort}
			selectedKey={value}
			onSelectionChange={(key) => {
				if (key !== null) handleChange(String(key));
			}}
		>
			<Label>Sort by</Label>
			<Button className={s.sortTrigger}>
				<SelectValue />
				<ChevronDown size={16} aria-hidden />
			</Button>
			<Popover className={s.sortPopover} placement="bottom end" offset={8}>
				<ListBox className={s.sortMenu} items={options}>
					{(option) => (
						<ListBoxItem id={option.value} textValue={option.label} className={s.sortOption}>
							{({ isSelected }) => (
								<>
									<span>{option.label}</span>
									{isSelected && <Check size={16} aria-hidden />}
								</>
							)}
						</ListBoxItem>
					)}
				</ListBox>
			</Popover>
		</Select>
	);
}
