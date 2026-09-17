"use client";

import { Check, ChevronDown, Globe, X } from "lucide-react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useState, useTransition } from "react";
import {
	Button,
	Dialog,
	DialogTrigger,
	Heading,
	Modal,
	ModalOverlay,
	Radio,
	RadioGroup,
} from "react-aria-components";
import { COUNTRIES } from "@/lib/thorcommerce/config";
import { switchMarket } from "./switch-market";
import s from "./market-selector.module.css";

export default function MarketSelector() {
	const { countryCode } = useParams<{ countryCode: string }>();
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const descriptionId = useId();
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(countryCode);
	const [pending, startTransition] = useTransition();
	const [error, setError] = useState<string>();
	const current = COUNTRIES.find((country) => country.code === countryCode);

	function applyMarket() {
		setError(undefined);
		startTransition(async () => {
			try {
				const result = await switchMarket(selected);
				if (!result.success) {
					setError(result.error);
					return;
				}
				const query = new URLSearchParams(searchParams.toString());
				// Amounts and pagination cursors belong to the previous market.
				for (const key of ["price_min", "price_max", "after", "before"]) query.delete(key);
				const suffix = query.size ? `?${query}` : "";
				router.push(
					`/${selected}${pathname.replace(/^\/[a-z]{2}(?=\/|$)/i, "")}${suffix}${window.location.hash}`,
				);
				setOpen(false);
			} catch {
				setError("We couldn't change your market. Please try again.");
			}
		});
	}

	return (
		<DialogTrigger
			isOpen={open}
			onOpenChange={(nextOpen) => {
				if (pending) return;
				setSelected(countryCode);
				setError(undefined);
				setOpen(nextOpen);
			}}
		>
			<Button
				className={s.trigger}
				aria-label={`Change market, currently ${current?.name}, ${current?.currencies[0]}`}
			>
				<Globe size={18} aria-hidden="true" />
				<span>{current?.name}</span>
				<span className={s.triggerCurrency}>{current?.currencies[0]}</span>
				<ChevronDown size={16} aria-hidden="true" />
			</Button>
			<ModalOverlay isDismissable={!pending} isKeyboardDismissDisabled={pending} className={s.overlay}>
				<Modal className={s.modal}>
					<Dialog className={s.dialog} aria-describedby={descriptionId}>
						<div className={s.header}>
							<Globe size={24} aria-hidden="true" />
							<Button
								className={s.close}
								aria-label="Close market selector"
								isDisabled={pending}
								onPress={() => setOpen(false)}
							>
								<X size={20} />
							</Button>
						</div>
						<Heading slot="title" className={s.title}>
							Where are you shopping?
						</Heading>
						<p id={descriptionId} className={s.description}>
							Choose your market to see local prices.
						</p>
						<RadioGroup
							aria-label="Market and currency"
							value={selected}
							onChange={setSelected}
							isDisabled={pending}
							className={s.options}
						>
							{COUNTRIES.map((country) => (
								<Radio value={country.code} key={country.code} className={s.option}>
									{({ isSelected }) => (
										<>
											<span className={s.flag} aria-hidden="true">
												{Array.from(country.code.toUpperCase(), (letter) =>
													String.fromCodePoint(127397 + letter.charCodeAt(0)),
												).join("")}
											</span>
											<span className={s.country}>
												<span>{country.name}</span>
												<span className={s.currency}>
													{country.currencies[0]}
													{country.code === countryCode ? " · Current market" : ""}
												</span>
											</span>
											<span className={s.check} aria-hidden="true">
												{isSelected && <Check size={15} strokeWidth={2.5} />}
											</span>
										</>
									)}
								</Radio>
							))}
						</RadioGroup>
						{error && (
							<p role="alert" className={s.error}>
								{error}
							</p>
						)}
						<Button
							className={s.apply}
							onPress={applyMarket}
							isDisabled={pending || selected === countryCode}
						>
							{pending ? "Updating your market…" : "Save market"}
						</Button>
						<p className={s.note} role={pending ? "status" : undefined}>
							{pending
								? "Updating prices and your bag."
								: "Your bag stays with you. Prices update for your market."}
						</p>
					</Dialog>
				</Modal>
			</ModalOverlay>
		</DialogTrigger>
	);
}
