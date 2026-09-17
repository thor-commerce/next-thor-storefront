"use client";

import Button from "@/components/button/button";
import headerIcon from "@/components/icon-button/header-icon.module.css";
import Navigation from "@/components/navigation/navigation";
import { mapEdgesToItems } from "@/utils/maps";
import { formatMoney } from "@/utils/money";
import clsx from "clsx";
import { ShoppingBag, XIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	Dialog,
	DialogTrigger,
	Heading,
	Modal,
	ModalOverlay,
	Button as AriaButton,
} from "react-aria-components";
import CartLineItem from "./components/cart-line-item/cart-line-item";
import s from "./cart.module.css";
import { useCart } from "@/features/cart/cart-context";

export default function CartDrawer() {
	const { cart } = useCart();
	const quantityRef = useRef(cart?.lineItemsQuantity ?? 0);
	const [isOpen, setIsOpen] = useState(false);
	const setOpen = useCallback((open: boolean) => {
		if (open) {
			const root = document.documentElement;
			const scrollbarWidth = window.innerWidth - root.clientWidth;
			root.style.setProperty("--cart-scrollbar-width", `${scrollbarWidth}px`);
		}
		setIsOpen(open);
	}, []);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const search = searchParams.toString();

	const shippingAmount = cart?.shippingLines.reduce((sum, line) => sum + line.total.centAmount, 0) ?? 0;
	const shippingLabel = cart?.shippingLines.length
		? shippingAmount === 0
			? "Free"
			: formatMoney({ money: { ...cart.total, centAmount: shippingAmount } })
		: "Calculated at checkout";

	const hasItems = Boolean(cart?.lineItemsQuantity && cart.lineItemsQuantity > 0);
	const lines = mapEdgesToItems(cart?.lineItems) ?? [];

	useEffect(() => {
		const quantity = cart?.lineItemsQuantity ?? 0;
		if (quantity > quantityRef.current && !isOpen) {
			setOpen(true);
		}
		quantityRef.current = quantity;
	}, [isOpen, cart?.lineItemsQuantity, quantityRef, setOpen]);

	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setOpen(false);
		}, 0);

		return () => {
			window.clearTimeout(timeout);
		};
	}, [pathname, search, setOpen]);

	return (
		<DialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
			<AriaButton aria-label="Open cart" className={headerIcon.button}>
				<ShoppingBag size={22} strokeWidth={1.75} aria-hidden="true" />
				{hasItems && (
					<span className={s.cartCount}>
						<span className={s.number}>{cart!.lineItemsQuantity > 9 ? "+9" : cart!.lineItemsQuantity}</span>
					</span>
				)}
			</AriaButton>

			<ModalOverlay
				isDismissable
				className={s.overlay}
				shouldCloseOnInteractOutside={(element) => {
					// Don't close when interacting with 1Password or other browser extensions
					const isExtensionElement =
						element.closest("[data-1p-ignore]") ||
						element.closest('[class*="onepassword"]') ||
						element.closest('[class*="1password"]') ||
						element.closest('[id*="onepassword"]') ||
						element.closest('[id*="1password"]') ||
						element.closest('[role="listbox"]') ||
						element.closest('[role="dialog"]') ||
						(() => {
							const style = window.getComputedStyle(element);
							const zIndex = parseInt(style.zIndex, 10);
							return zIndex > 50000;
						})();

					return !isExtensionElement;
				}}
			>
				<Modal className={s.modal}>
					<Dialog
						className={s.dialog}
						onClickCapture={(event) => {
							const target = event.target as HTMLElement | null;
							if (target?.closest("a[href]")) {
								setOpen(false);
							}
						}}
					>
						<header className={s.drawerHeader}>
							<div className={s.drawerHeading}>
								<Heading>Your Bag</Heading>
								<p className={s.drawerMeta}>
									{hasItems
										? `${cart?.lineItemsQuantity} item${cart?.lineItemsQuantity === 1 ? "" : "s"}`
										: "No items yet"}
								</p>
							</div>
							<button
								type="button"
								className={s.closeButton}
								onClick={() => setOpen(false)}
								aria-label="Close cart"
							>
								<XIcon size={18} />
							</button>
						</header>

						{hasItems && cart ? (
							<>
								<div className={s.drawerContent}>
									<ul className={s.drawerLineItems}>
										{lines.map((item) => (
											<CartLineItem key={item.id} line={item} />
										))}
									</ul>
								</div>
								<footer className={s.drawerFooter}>
									<div className={s.totals}>
										<div className={s.totalRow}>
											<span>Subtotal</span>
											<strong>{formatMoney({ money: cart.subtotal })}</strong>
										</div>
										<div className={s.totalRow}>
											<span>Shipping</span>
											<strong>{shippingLabel}</strong>
										</div>
										<div className={clsx(s.totalRow, s.totalRowStrong)}>
											<span>Total</span>
											<strong>{formatMoney({ money: cart.total })}</strong>
										</div>
									</div>
									<Button
										as="a"
										href={getHostedCheckoutUrl(cart.checkoutUrl)}
										className={s.drawerCheckoutButton}
									>
										Checkout
									</Button>
								</footer>
							</>
						) : (
							<div className={s.emptyState}>
								<p className={s.emptyStateTitle}>Your cart is empty</p>
								<p className={s.emptyStateCopy}>Add products to review them here before checkout.</p>
								<Button
									as={Navigation}
									href="/products"
									onClick={() => setOpen(false)}
									className={s.drawerCheckoutButton}
								>
									Browse products
								</Button>
							</div>
						)}
					</Dialog>
				</Modal>
			</ModalOverlay>
		</DialogTrigger>
	);
}

function getHostedCheckoutUrl(checkoutUrl: string) {
	const checkoutOrigin = process.env.NEXT_PUBLIC_THOR_CHECKOUT_ORIGIN;

	if (!checkoutOrigin) {
		return checkoutUrl;
	}

	const generatedUrl = new URL(checkoutUrl);
	return `${checkoutOrigin.replace(/\/$/, "")}${generatedUrl.pathname}${generatedUrl.search}`;
}
