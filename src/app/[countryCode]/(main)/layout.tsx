import { CartProvider } from "@/features/cart/cart-context";
import Navbar from "@/features/navbar/navbar";
import { getCart } from "@/lib/thorcommerce/storefront";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Don't await the fetch; pass the promise to the client provider.
	const cart = getCart();
	return (
		<CartProvider cartPromise={cart}>
			<Navbar />
			{children}
		</CartProvider>
	);
}
