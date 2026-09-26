"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Dialog, DialogTrigger, Heading, Modal, ModalOverlay } from "react-aria-components";
import { ChevronLeft, ChevronRight, Menu, User, X } from "lucide-react";
import Navigation from "@/components/navigation/navigation";
import s from "./navbar.module.css";

type NavigationLink = { id: string; label: string; href: string };
type Props = { categories: NavigationLink[]; collections: NavigationLink[]; onOpen: () => void };

export default function MobileNavigation({ categories, collections, onOpen }: Props) {
	const [open, setOpen] = useState(false);
	return (
		<DialogTrigger
			isOpen={open}
			onOpenChange={(value) => {
				if (value) {
					// Measure before scroll locking removes the scrollbar.
					const root = document.documentElement;
					root.style.setProperty("--navigation-scrollbar-width", `${window.innerWidth - root.clientWidth}px`);
					onOpen();
				}
				setOpen(value);
			}}
		>
			<Button className={`${s.iconButton} ${s.mobileTrigger}`} aria-label="Open navigation">
				<Menu size={20} strokeWidth={1.75} aria-hidden="true" />
			</Button>
			<ModalOverlay isDismissable className={s.mobileOverlay}>
				<Modal className={s.mobileModal}>
					<Dialog className={s.mobileDialog} aria-label="Navigation">
						<MobileMenu categories={categories} collections={collections} close={() => setOpen(false)} />
					</Dialog>
				</Modal>
			</ModalOverlay>
		</DialogTrigger>
	);
}

function MobileMenu({ categories, collections, close }: Omit<Props, "onOpen"> & { close: () => void }) {
	const [showCollections, setShowCollections] = useState(false);
	const title = useRef<HTMLHeadingElement>(null);
	const collectionTrigger = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		if (showCollections) title.current?.focus({ preventScroll: true });
	}, [showCollections]);

	return (
		<>
			<div className={s.mobileHeading}>
				{showCollections && (
					<button
						type="button"
						className={s.mobileBack}
						onClick={() => {
							setShowCollections(false);
							requestAnimationFrame(() => collectionTrigger.current?.focus({ preventScroll: true }));
						}}
					>
						<ChevronLeft size={18} aria-hidden="true" /> All
					</button>
				)}
				<Button className={s.iconButton} aria-label="Close navigation" onPress={close}>
					<X size={22} strokeWidth={1.75} aria-hidden="true" />
				</Button>
			</div>
			<nav aria-label="Mobile navigation" className={s.mobileLinks}>
				{showCollections ? (
					<>
						<Heading ref={title} tabIndex={-1} className={s.mobileSectionTitle}>
							Collections
						</Heading>
						{collections.map((link) => (
							<Navigation key={link.id} href={link.href} className={s.mobileRow} onClick={close}>
								{link.label}
							</Navigation>
						))}
					</>
				) : (
					<>
						<Navigation href="/products" className={s.mobileRow} onClick={close}>
							Shop all
						</Navigation>
						{categories.map((link) => (
							<Navigation key={link.id} href={link.href} className={s.mobileRow} onClick={close}>
								{link.label}
								<ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
							</Navigation>
						))}
						{collections.length > 0 && (
							<button
								ref={collectionTrigger}
								type="button"
								className={s.mobileRow}
								onClick={() => setShowCollections(true)}
							>
								Collections
								<ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
							</button>
						)}
					</>
				)}
			</nav>
			<div className={s.mobileUtilities}>
				<Navigation href="/account" className={s.mobileAccount} onClick={close}>
					<User size={20} strokeWidth={1.75} aria-hidden="true" /> Your account
				</Navigation>
			</div>
		</>
	);
}
