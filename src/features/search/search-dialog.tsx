"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button, Dialog, DialogTrigger, Heading, Modal, ModalOverlay } from "react-aria-components";
import { ArrowRight, Search, X } from "lucide-react";
import ThorImage from "@/components/thor-image/thor-image";
import Spinner from "@/components/spinner/spinner";
import { MAX_SEARCH_LENGTH, normalizeSearchTerm } from "./query";
import type { SearchSuggestion } from "./types";
import s from "./search-dialog.module.css";

type Props = {
	onOpen: () => void;
	categories: { id: string; label: string; href: string }[];
};

export default function SearchDialog({ onOpen, categories }: Props) {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { countryCode } = useParams<{ countryCode: string }>();
	const router = useRouter();
	const submittedTerm =
		pathname === `/${countryCode}/search` ? normalizeSearchTerm(searchParams.get("q") ?? undefined) : "";
	return (
		<div className={s.triggerGroup}>
			<DialogTrigger
				isOpen={open}
				onOpenChange={(value) => {
					setOpen(value);
					if (value) onOpen();
				}}
			>
				<Button
					className={s.trigger}
					data-filled={Boolean(submittedTerm)}
					aria-label={submittedTerm ? `Search products: ${submittedTerm}` : "Search products"}
				>
					<Search size={22} strokeWidth={1.75} aria-hidden="true" />
					<span>{submittedTerm || "Search"}</span>
				</Button>
				<ModalOverlay isDismissable className={s.overlay}>
					<Modal className={s.modal}>
						<Dialog className={s.dialog} aria-label="Search products">
							<SearchDialogContent
								key={submittedTerm}
								initialTerm={submittedTerm}
								categories={categories}
								close={() => setOpen(false)}
							/>
						</Dialog>
					</Modal>
				</ModalOverlay>
			</DialogTrigger>
			{submittedTerm && (
				<button
					type="button"
					className={s.clearSubmitted}
					aria-label="Clear search"
					onClick={() => router.push(`/${countryCode}/search`)}
				>
					<X size={18} aria-hidden="true" />
				</button>
			)}
		</div>
	);
}

function SearchDialogContent({
	categories,
	close,
	initialTerm,
}: Omit<Props, "onOpen"> & { close: () => void; initialTerm: string }) {
	const { countryCode } = useParams<{ countryCode: string }>();
	const router = useRouter();
	const [value, setValue] = useState(initialTerm);
	const term = normalizeSearchTerm(value);
	const [result, setResult] = useState<{
		term: string;
		products: SearchSuggestion[];
		failed: boolean;
	} | null>(null);
	const suggestions = useRef<HTMLUListElement>(null);
	const input = useRef<HTMLInputElement>(null);
	const current = result?.term === term ? result : null;
	const loading = term.length >= 2 && !current;
	const searchHref = `/${countryCode}/search?${new URLSearchParams({ q: term })}`;

	useEffect(() => {
		if (term.length < 2) return;
		const controller = new AbortController();
		const timer = window.setTimeout(async () => {
			try {
				const response = await fetch(
					`/${countryCode}/search/suggestions?${new URLSearchParams({ q: term })}`,
					{
						signal: controller.signal,
						cache: "no-store",
					},
				);
				if (!response.ok) throw new Error("Suggestions unavailable");
				const data: { products: SearchSuggestion[] } = await response.json();
				if (!controller.signal.aborted) setResult({ term, products: data.products, failed: false });
			} catch {
				if (!controller.signal.aborted) setResult({ term, products: [], failed: true });
			}
		}, 200);
		return () => {
			window.clearTimeout(timer);
			controller.abort();
		};
	}, [term, countryCode]);

	return (
		<>
			<div className={s.topRow}>
				<span className={s.brand}>NORDFORM</span>
				<form
					role="search"
					className={s.searchField}
					onSubmit={(event) => {
						event.preventDefault();
						if (!term) return;
						router.push(searchHref);
						close();
					}}
				>
					<Search size={24} strokeWidth={1.75} aria-hidden="true" />
					<input
						ref={input}
						autoFocus
						type="search"
						aria-label="Search products"
						aria-describedby="search-suggestions-hint"
						placeholder="Search"
						value={value}
						onChange={(event) => setValue(event.target.value)}
						onKeyDown={(event) => {
							if (event.key === "ArrowDown") {
								const first = suggestions.current?.querySelector<HTMLAnchorElement>("a");
								if (first) {
									event.preventDefault();
									first.focus();
								}
							}
						}}
						maxLength={MAX_SEARCH_LENGTH}
						autoComplete="off"
						enterKeyHint="search"
					/>
					{value && (
						<button
							type="button"
							className={s.clear}
							aria-label="Clear search"
							onClick={() => {
								setValue("");
								input.current?.focus();
							}}
						>
							<X size={18} />
						</button>
					)}
				</form>
				<Button className={s.cancel} onPress={close}>
					Cancel
				</Button>
			</div>
			<div className={s.body}>
				<p className={s.hint} id="search-suggestions-hint">
					Press Enter to see all results
				</p>
				{term.length < 2 ? (
					<>
						<Heading className={s.sectionTitle}>Explore the collection</Heading>
						<div className={s.explore}>
							{categories.slice(0, 5).map((category) => (
								<Link key={category.id} href={`/${countryCode}${category.href}`} onClick={close}>
									{category.label}
									<ArrowRight size={18} aria-hidden="true" />
								</Link>
							))}
							<Link href={`/${countryCode}/products`} onClick={close}>
								Shop all products
								<ArrowRight size={18} aria-hidden="true" />
							</Link>
						</div>
					</>
				) : (
					<>
						<Heading className={s.sectionTitle}>Suggested products</Heading>
						<div role="status" className={s.feedback}>
							{loading ? (
								<>
									<Spinner size="small" /> Searching…
								</>
							) : current?.failed ? (
								"Suggestions are unavailable. Press Enter to try the full search."
							) : current?.products.length === 0 ? (
								`No suggestions for “${term}”. Try another search.`
							) : (
								`${current?.products.length ?? 0} suggestions`
							)}
						</div>
						{current && !current.failed && (
							<ul
								ref={suggestions}
								className={s.suggestions}
								onKeyDown={(event) => {
									if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
									const links = Array.from(
										suggestions.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
									);
									const index = links.indexOf(document.activeElement as HTMLAnchorElement);
									if (index < 0) return;
									event.preventDefault();
									if (event.key === "ArrowUp" && index === 0) input.current?.focus();
									else
										links[Math.min(links.length - 1, index + (event.key === "ArrowDown" ? 1 : -1))]?.focus();
								}}
							>
								{current.products.map((product) => (
									<li key={product.id}>
										<Link href={product.href} onClick={close} className={s.product}>
											<span className={s.image}>
												<ThorImage src={product.image ?? ""} alt="" fill sizes="64px" />
											</span>
											<span className={s.productCopy}>
												<span>{product.name}</span>
												{product.price && <span className={s.price}>From {product.price}</span>}
											</span>
											<ArrowRight size={18} aria-hidden="true" />
										</Link>
									</li>
								))}
							</ul>
						)}
						<Link href={searchHref} onClick={close} className={s.allResults}>
							View all results
							<ArrowRight size={18} aria-hidden="true" />
						</Link>
					</>
				)}
			</div>
		</>
	);
}
