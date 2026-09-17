import CartDrawer from "@/features/cart/cart-drawer";
import { TopBar } from "./components/top-bar/top-bar";
import { getNavigation } from "@/lib/thorcommerce/storefront";
import HeaderNavigation from "./header-navigation";
import s from "./navbar.module.css";

export default async function Navbar() {
	const { categories, collections } = await getNavigation();
	const categoryLinks = categories.map(({ id, name, slug }) => ({
		id,
		label: name,
		href: `/categories/${slug}`,
	}));
	const collectionLinks = collections.map(({ id, name, slug }) => ({
		id,
		label: name,
		href: `/collections/${slug}`,
	}));
	return (
		<header className={s.globalNavbarWrapper}>
			<div className={s.globalNavbar} data-navbar>
				<TopBar />
				<HeaderNavigation categories={categoryLinks} collections={collectionLinks} cart={<CartDrawer />} />
			</div>
		</header>
	);
}
