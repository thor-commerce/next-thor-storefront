import s from "./layout.module.css";
import { CartProvider } from "@/features/cart/cart-context";
import Footer from "@/features/footer/footer";
import Navbar from "@/features/navbar/navbar";
import { getCart } from "@/lib/thorcommerce/storefront";

// Storefront routes depend on request-scoped cart and customer data.
export const instant = false;

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Don't await the fetch; pass the promise to the client provider.
	const cart = getCart();
	return (
		<CartProvider cartPromise={cart}>
			<div className={s.page}>
				<Navbar />
				<main className={s.content}>{children}</main>
				<Footer />
			</div>
		</CartProvider>
	);
}
