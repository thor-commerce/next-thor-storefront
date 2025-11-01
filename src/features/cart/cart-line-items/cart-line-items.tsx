"use client";
import { CartDetailsQuery } from "@/__generated__/thor/graphql";
import { mapEdgesToItems } from "@/utils/maps";
import { QueryRef, useReadQuery } from "@apollo/client/react";
import CartLineItem from "./cart-line-item";
import s from "./cart-line-items.module.css";
import { SkeletonBox } from "@/components/skeleton-box/skeleton-box";

export default function CartLineItems({
  queryRef,
}: {
  queryRef: QueryRef<CartDetailsQuery>;
}) {
  const { data } = useReadQuery(queryRef);

  const lines = mapEdgesToItems(data.cart?.lineItems);
  return (
    <ul className={s.cartItemList}>
      {lines?.map((line) => (
        <CartLineItem key={line.id} lineItemFragment={line} />
      ))}
    </ul>
  );
}

export function CartLineItemsSkeleton() {
  return (
    <ul className={s.cartItemList}>
      {Array.from({ length: 3 }).map((_, index) => (
        <li className={s.cartLineItem} key={index}>
          <div className={s.lineRow}>
            <div className={s.productThumbnail}>
              <div className={s.thumbnailWrapper}>
                <SkeletonBox width={164} height={164} />
              </div>
            </div>
            <div className={s.productInfo}>
              <div className={s.productInfoWrapper}>
                <div className={s.productDetails}>
                  <div>
                    <span>
                      <SkeletonBox width={200} height={24} />
                    </span>
                  </div>
                </div>
                <div className={s.linePrice}>
                  <span className={s.total}>
                    <SkeletonBox width={80} height={24} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
