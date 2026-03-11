import { CACHE_TAGS, getCartCacheTag } from "@/constants";
import { getClient } from "@/lib/thor/apollo-client";
import CartDrawer from "./cart-drawer";
import { CART_DETAILS_QUERY } from "./queries";
import { getCartIdFromCookies } from "./utils";

export default async function CartDrawerWrapper() {
	const cartId = await getCartIdFromCookies();

	const { data } = cartId
		? await getClient().query({
				query: CART_DETAILS_QUERY,
				variables: { id: cartId },
				context: {
					fetchOptions: {
						cache: "force-cache",
						next: {
							tags: [CACHE_TAGS.cart, getCartCacheTag(cartId)],
						},
					},
				},
			})
		: { data: null };

	return <CartDrawer cart={data?.cart ?? null} />;
}
