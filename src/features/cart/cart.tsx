import Button from "@/components/button/button";
import Navigation from "@/components/navigation/navigation";
import { CACHE_TAGS } from "@/constants";
import { PreloadQuery } from "@/lib/thor/apollo-client";
import clsx from "clsx";
import { Suspense } from "react";
import { CheckoutStepEnum } from "../checkout/types";
import DiscountCodeForm from "./cart-discount-code-form/discount-code-form";
import CartLineItems, {
  CartLineItemsSkeleton,
} from "./cart-line-items/cart-line-items";
import CartSummary, { CartSummarySkeleton } from "./cart-summary/cart-summary";
import s from "./cart.module.css";
import { CART_DETAILS_QUERY } from "./queries";
import { getCartIdFromCookies } from "./utils";

export default async function Cart() {
  const cartId = await getCartIdFromCookies();

  return (
    <PreloadQuery
      query={CART_DETAILS_QUERY}
      variables={{ id: cartId }}
      context={{
        fetchOptions: {
          next: {
            tags: [CACHE_TAGS.cart],
          }
        },
      }}
    >
      {(queryRef) => (
        <Suspense fallback={<CartSkeleton />}>
          <div className={s.cartView}>
            <div className={s.container}>
              <div className={s.cartItemsContainer}>
                <h1 className={s.cartHeading}>Cart</h1>
                <CartLineItems queryRef={queryRef} />
              </div>
              <div className={s.cartSummaryContainer}>
                <h2 className={clsx(s.cartHeading, s.cartSummaryHeading)}>
                  Summary
                </h2>
                <DiscountCodeForm queryRef={queryRef} />
                <CartSummary queryRef={queryRef} />
                <Button
                  as={Navigation}
                  href={`/checkout?checkout_id=${cartId}&step=${CheckoutStepEnum.Customer}`}
                  className={s.checkoutButton}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </Suspense>
      )}
    </PreloadQuery>
  );
}

export function CartSkeleton() {
  return (
    <div className={s.cartView}>
      <div className={s.container}>
        <div className={s.cartItemsContainer}>
          <h1 className={s.cartHeading}>Cart</h1>
          <CartLineItemsSkeleton />
        </div>
        <div className={s.cartSummaryContainer}>
          <h2 className={clsx(s.cartHeading, s.cartSummaryHeading)}>Summary</h2>
          <CartSummarySkeleton />
        </div>
      </div>
    </div>
  );
}
