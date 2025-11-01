import s from "./cart.module.css";
import clsx from "clsx";
import Button from "@/components/button/button";
import Navigation from "@/components/navigation/navigation";
import { PreloadQuery } from "@/lib/thor/apollo-client";
import { CART_DETAILS_QUERY } from "./queries";
import { Suspense } from "react";
import { getCartIdFromCookies } from "./utils";
import CartLineItems, {
  CartLineItemsSkeleton,
} from "./cart-line-items/cart-line-items";
import { CACHE_TAGS } from "@/constants";
import CartSummary, { CartSummarySkeleton } from "./cart-summary/cart-summary";
import DiscountCodeForm from "./cart-discount-code-form/discount-code-form";

export default async function Cart() {
  const cartId = await getCartIdFromCookies();

  return (
    <PreloadQuery
      query={CART_DETAILS_QUERY}
      variables={{ id: cartId }}
      context={{
        fetchOptions: {
          tags: [CACHE_TAGS.cart],
        },
      }}
    >
      {(queryRef) => (
        <div className={s.cartView}>
          <div className={s.container}>
            <div className={s.cartItemsContainer}>
              <h1 className={s.cartHeading}>Cart</h1>

              <Suspense fallback={<CartLineItemsSkeleton />}>
                <CartLineItems queryRef={queryRef} />
              </Suspense>
            </div>
            <div className={s.cartSummaryContainer}>
              <h2 className={clsx(s.cartHeading, s.cartSummaryHeading)}>
                Summary
              </h2>
              <Suspense>
                <DiscountCodeForm queryRef={queryRef} />
              </Suspense>
              <Suspense fallback={<CartSummarySkeleton />}>
                <CartSummary queryRef={queryRef} />
              </Suspense>
              <Button
                as={Navigation}
                href="/checkout"
                className={s.checkoutButton}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </PreloadQuery>
  );
}
