"use client";

import Button from "@/components/button/button";
import ShoppingCart from "@/components/icons/shopping-cart";
import Navigation from "@/components/navigation/navigation";
import { mapEdgesToItems } from "@/utils/maps";
import { formatMoney } from "@/utils/money";
import clsx from "clsx";
import { XIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogTrigger, Heading, Modal, ModalOverlay, Pressable } from "react-aria-components";
import CartLineItem from "./components/cart-line-item/cart-line-item";
import s from "./cart.module.css";
import { useCart } from "@/features/cart/cart-context";
import IconButton from "@/components/icon-button/icon-button";

export default function CartDrawer() {
	const { cart } = useCart();
	const quantityRef = useRef(cart?.lineItemsQuantity ?? 0);
	const [isOpen, setOpen] = useState(false);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const search = searchParams.toString();

	const hasItems = Boolean(cart?.lineItemsQuantity && cart.lineItemsQuantity > 0);
	const lines = mapEdgesToItems(cart?.lineItems) ?? [];

	useEffect(() => {
		if (
			cart?.lineItemsQuantity &&
			cart?.lineItemsQuantity !== quantityRef.current &&
			cart?.lineItemsQuantity > 0
		) {
			if (!isOpen) {
				// eslint-disable-next-line react-hooks/set-state-in-effect
				setOpen(true);
			}
			quantityRef.current = cart?.lineItemsQuantity;
		}
	}, [isOpen, cart?.lineItemsQuantity, quantityRef]);

	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setOpen(false);
		}, 0);

		return () => {
			window.clearTimeout(timeout);
		};
	}, [pathname, search]);

	return (
		<DialogTrigger>
			<Pressable>
				<IconButton
					onClick={() => setOpen(true)}
					icon={
						<>
							<ShoppingCart />
							{hasItems ? (
								<span className={clsx(s.cartCount)}>
									<span className={s.number}>
										{cart!.lineItemsQuantity > 9 ? "+9" : cart!.lineItemsQuantity}
									</span>
								</span>
							) : null}
						</>
					}
				/>
			</Pressable>
			{/* <ShoppingCart /> */}

			{/* </AriaButton> */}
			<ModalOverlay
				isDismissable
				className={s.overlay}
				isOpen={isOpen}
				onOpenChange={setOpen}
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
										<div className={clsx(s.totalRow, s.totalRowStrong)}>
											<span>Total</span>
											<strong>{formatMoney({ money: cart.total })}</strong>
										</div>
									</div>
									<Button
										// as={Navigation}
										// href={`/checkout?checkout_id=${cart.id}&step=${CheckoutStepEnum.Customer}`}
										// onClick={() => setOpen(false)}
										className={s.drawerCheckoutButton}
										disabled
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
