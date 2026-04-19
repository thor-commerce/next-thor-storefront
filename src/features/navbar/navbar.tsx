import Navigation from "@/components/navigation/navigation";
import { Suspense } from "react";
import NavbarProfile from "./navbar-profile/navbar-profile";
import s from "./navbar.module.css";
import CartDrawer from "@/features/cart/cart-drawer";

export default async function Navbar() {
	return (
		<header className={s.header}>
			<div className={s.wrapper}>
				<div className={s.left}>
					<div className={s.logo}>
						<Navigation href="/">
							<strong style={{ fontWeight: 600 }}>Thor</strong>
							Store
						</Navigation>
					</div>
					<nav className={s.nav}>
						<Navigation href="/products" className={s.navLink}>
							All products
						</Navigation>
						<Navigation href="/categories" className={s.navLink}>
							Categories
						</Navigation>
						<Navigation href="/collections" className={s.navLink}>
							Collections
						</Navigation>
					</nav>
				</div>
				<div className={s.right}>
					<Suspense>
						<NavbarProfile />
					</Suspense>
					<CartDrawer />
				</div>
			</div>
		</header>
	);
}
