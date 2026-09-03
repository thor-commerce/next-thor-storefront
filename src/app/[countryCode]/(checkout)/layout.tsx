import { type ReactNode } from "react";
import s from "./layout.module.css";
import Navigation from "@/components/navigation/navigation";

// Checkout and order routes depend on request-scoped cart, customer, and payment data.
export const instant = false;

export const metadata = {
	title: "Checkout",
	robots: {
		index: false,
		follow: false,
		googleBot: {
			index: false,
			follow: false,
		},
	},
};

export default function RootLayout(props: { children: ReactNode }) {
	return (
		<div className={s.checkoutWrapper}>
			<nav className={s.navbar}>
				<Navigation href="/" className={s.link}>
					<strong style={{ fontWeight: 600 }}>Thor</strong>
					Mart
				</Navigation>
				<Navigation href="/" className={s.link}>
					Continue shopping
				</Navigation>
			</nav>
			{props.children}
		</div>
	);
}
