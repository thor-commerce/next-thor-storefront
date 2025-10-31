import ShoppingCart from "@/components/icons/shopping-cart";
import { getCartIdFromCookies } from "@/features/cart/utils";
import s from "./navbar-cart.module.css";
import { getClient } from "@/lib/thor/apollo-client";
import { CACHE_TAGS } from "@/constants";
import clsx from "clsx";
import { NAVBAR_CART_QUERY } from "@/features/cart/queries";

export default async function NavbarCart() {
  const cartId = await getCartIdFromCookies();

  if (!cartId) {
    return (
      <button className={s.cartButton}>
        <ShoppingCart />
      </button>
    );
  }

  const { data } = await getClient().query({
    query: NAVBAR_CART_QUERY,
    variables: {
      id: cartId,
    },
    context: {
      fetchOptions: {
        tags: [CACHE_TAGS.cart], // This will help with cache invalidation
      },
    },
  });

  return (
    <div>
      <button className={s.cartButton}>
        <ShoppingCart />
        {data?.cart?.lineItemsQuantity && data.cart.lineItemsQuantity > 0 ? (
          <span className={clsx(s.cartCount)}>
            <span className={s.number}>{data.cart.lineItemsQuantity}</span>
          </span>
        ) : null}
      </button>
    </div>
  );
}
