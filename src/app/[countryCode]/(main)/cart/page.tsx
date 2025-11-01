import Cart from "@/features/cart/cart";
import { Suspense } from "react";

export default async function CartPage() {
  return (
    <Suspense>
      <Cart />
    </Suspense>
  );
}

// export default async function CartPage() {
//   const cartId = await getCartIdFromCookies();

//   if (!cartId) {
//     return <div>Your cart is empty</div>;
//   }

//   const { data } = await getClient().query({
//     query: CART_DETAILS_QUERY,
//     variables: {
//       id: cartId,
//     },
//     context: {
//       fetchOptions: {
//         tags: [CACHE_TAGS.cart],
//       },
//     },
//   });

//   const cart = data?.cart;
//   if (!cart || cart.lineItemsQuantity === 0) {
//     return <div>Your cart is empty</div>;
//   }

//   return <Cart cart={cart} />;
// }
