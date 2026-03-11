import { CartDetailsQueryVariables } from "@/__generated__/thor/graphql";
import { CACHE_TAGS } from "@/constants";
import CartProvider from "@/features/cart/cart-context";
import { CART_DETAILS_QUERY } from "@/features/cart/queries";
import { getCartIdFromCookies } from "@/features/cart/utils";
import Navbar from "@/features/navbar/navbar";
import { getClient } from "@/lib/thor/apollo-client";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cartId = await getCartIdFromCookies();

	const variables: CartDetailsQueryVariables | undefined = cartId ? { id: cartId } : undefined;

	const { data } = variables
		? await getClient().query({
				query: CART_DETAILS_QUERY,
				variables: { id: cartId },
				context: {
					fetchOptions: {
						tags: [CACHE_TAGS.cart],
					},
				},
			})
		: { data: null };

	const cart = data?.cart;

	return (
		<CartProvider cart={cart}>
			<Navbar />
			{children}
		</CartProvider>
	);
}
