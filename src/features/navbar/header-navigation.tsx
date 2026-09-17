"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button, Dialog, DialogTrigger, Heading, Modal, ModalOverlay } from "react-aria-components";
import { Menu, User, X } from "lucide-react";
import Navigation from "@/components/navigation/navigation";
import headerIcon from "@/components/icon-button/header-icon.module.css";
import s from "./navbar.module.css";

type NavigationLink = { id: string; label: string; href: string };
type Props = { categories: NavigationLink[]; collections: NavigationLink[]; cart: ReactNode };
type Section = { id: string; label: string; links: NavigationLink[] };

const shopAll = { id: "all", label: "Shop all products", href: "/products" };

export default function HeaderNavigation({ categories, collections, cart }: Props) {
	const [active, setActive] = useState<string | null>(null);
	const [mobileOpen, setMobileOpen] = useState(false);
	const triggers = useRef(new Map<string, HTMLButtonElement>());
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const sections: Section[] = [
		{ id: "shop", label: "Shop", links: [shopAll, ...categories] },
		...(collections.length ? [{ id: "collections", label: "Collections", links: collections }] : []),
	];
	const cancelClose = () => {
		if (closeTimer.current) clearTimeout(closeTimer.current);
	};
	const close = () => {
		cancelClose();
		setActive(null);
	};
	useEffect(
		() => () => {
			if (closeTimer.current) clearTimeout(closeTimer.current);
		},
		[],
	);

	return (
		<nav
			className={s.nav}
			aria-label="Main navigation"
			onMouseEnter={cancelClose}
			onMouseLeave={() => {
				closeTimer.current = setTimeout(() => setActive(null), 180);
			}}
			onBlur={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget)) close();
			}}
			onKeyDown={(event) => {
				if (event.key === "Escape" && active) {
					event.preventDefault();
					triggers.current.get(active)?.focus();
					close();
				}
			}}
		>
			<div className={`${s.container} ${s.content}`}>
				<Navigation href="/" className={s.logoLink} aria-label="Nordform home" onClick={close}>
					NORDFORM
				</Navigation>
				<div className={s.links}>
					{sections.map((section) => (
						<div key={section.id} className={s.navItem}>
							<button
								type="button"
								id={`nav-${section.id}`}
								aria-expanded={active === section.id}
								aria-controls={`flyout-${section.id}`}
								className={s.menuTrigger}
								ref={(element) => {
									if (element) triggers.current.set(section.id, element);
									else triggers.current.delete(section.id);
								}}
								onPointerEnter={(event) => {
									if (event.pointerType === "mouse") {
										cancelClose();
										setActive(section.id);
									}
								}}
								onClick={(event) => {
									cancelClose();
									setActive(event.detail === 0 && active === section.id ? null : section.id);
								}}
								onKeyDown={(event) => {
									if (event.key === "ArrowDown") {
										event.preventDefault();
										setActive(section.id);
										requestAnimationFrame(() =>
											document
												.getElementById(`flyout-${section.id}`)
												?.querySelector<HTMLAnchorElement>("a")
												?.focus(),
										);
									}
								}}
							>
								{section.label}
							</button>
							<div
								id={`flyout-${section.id}`}
								aria-labelledby={`nav-${section.id}`}
								className={s.flyout}
								hidden={active !== section.id}
							>
								<div className={s.flyoutColumns}>
									<section>
										<h2>Explore Nordform</h2>
										<Navigation href="/products" onClick={close}>
											Shop all products
										</Navigation>
										<Navigation href="/" onClick={close}>
											Discover Nordform
										</Navigation>
									</section>
									{[section, ...sections.filter((item) => item.id !== section.id)].map((column) => (
										<section key={column.id}>
											<h2>{column.id === "shop" ? "Shop by category" : column.label}</h2>
											{column.links
												.filter((link) => link.id !== "all")
												.map((link) => (
													<Navigation key={link.id} href={link.href} onClick={close}>
														{link.label}
													</Navigation>
												))}
										</section>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
				<div className={s.actions}>
					<Navigation href="/account" aria-label="Your account" className={headerIcon.button} onClick={close}>
						<User size={22} strokeWidth={1.75} aria-hidden="true" />
					</Navigation>
					{cart}
					<DialogTrigger isOpen={mobileOpen} onOpenChange={setMobileOpen}>
						<Button className={`${s.iconButton} ${s.mobileTrigger}`} aria-label="Open navigation">
							<Menu size={24} />
						</Button>
						<ModalOverlay isDismissable className={s.mobileOverlay}>
							<Modal className={s.mobileModal}>
								<Dialog className={s.mobileDialog}>
									<div className={s.mobileHeading}>
										<Heading>NORDFORM</Heading>
										<Button
											className={s.iconButton}
											aria-label="Close navigation"
											onPress={() => setMobileOpen(false)}
										>
											<X />
										</Button>
									</div>
									<nav aria-label="Mobile navigation" className={s.mobileLinks}>
										<Navigation href="/products" onClick={() => setMobileOpen(false)}>
											Shop all
										</Navigation>
										{sections.map((section) => (
											<details key={section.id}>
												<summary>{section.id === "shop" ? "Shop by category" : section.label}</summary>
												<div>
													{section.links
														.filter((link) => link.id !== "all")
														.map((link) => (
															<Navigation key={link.id} href={link.href} onClick={() => setMobileOpen(false)}>
																{link.label}
															</Navigation>
														))}
												</div>
											</details>
										))}
										<Navigation
											href="/account"
											className={s.mobileAccount}
											onClick={() => setMobileOpen(false)}
										>
											Your account
										</Navigation>
									</nav>
								</Dialog>
							</Modal>
						</ModalOverlay>
					</DialogTrigger>
				</div>
			</div>
			{active && <div className={s.backdrop} aria-hidden="true" onPointerDown={close} onMouseEnter={close} />}
		</nav>
	);
}
