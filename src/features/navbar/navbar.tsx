import Navigation from "@/components/navigation/navigation";

import s from "./navbar.module.css";
import CartDrawer from "@/features/cart/cart-drawer";
import { TopBar } from "@/features/navbar/components/top-bar/top-bar";
import clsx from "clsx";
import IconButton from "@/components/icon-button/icon-button";
import { UserIcon } from "lucide-react";

export default async function Navbar() {
	return (
		<div className={s.globalNavbarWrapper}>
			<div className={s.globalNavbar} data-navbar>
				<TopBar />
				<nav className={s.nav}>
					<div className={s.content}>
						<ul className={s.list}>
							<li className={clsx(s.listItem, s.logoItem)}>
								<Navigation href="/" className={s.logoLink}>
									<strong style={{ fontWeight: 600 }}>Thor</strong>
									Mart
								</Navigation>
							</li>
							<li className={clsx(s.listItem, s.iconWrapper)}>
								{/* <Navigation className={s.pinIconLink} href={"/retailers"}>
								<PinIcon />
							</Navigation>

							<span className={s.searchIconLink}>
								<SearchDrawer />
							</span> */}
								<span className={clsx(s.icon, s.profileIcon)}>
									<IconButton as={Navigation} href={"/account"} icon={<UserIcon />} />
								</span>
								<span className={s.icon}>
									<CartDrawer />
								</span>
								{/* <ConditionalRender if={isAvailableOnMarket(country)}>
								<span className={s.cartIconLink}>
									<CartDrawer />
								</span>
							</ConditionalRender> */}
							</li>
						</ul>
						{/* <div className={s.left}>
						<div className={s.logo}>
							<Navigation href="/"></Navigation>
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
					</div> */}
					</div>
				</nav>
			</div>
		</div>
	);
}
