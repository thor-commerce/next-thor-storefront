"use client";
import { CartDetailsQuery } from "@/__generated__/thor/graphql";
import { mapEdgesToItems } from "@/utils/maps";
import { QueryRef, useReadQuery } from "@apollo/client/react";
import s from "./cart-summary.module.css";
import { formatMoney } from "@/utils/money";
import { SkeletonBox } from "@/components/skeleton-box/skeleton-box";
export default function CartSummary({
  queryRef,
}: {
  queryRef: QueryRef<CartDetailsQuery>;
}) {
  const {
    data: { cart },
  } = useReadQuery(queryRef);

  if (!cart) {
    return null;
  }

  const totalDiscount = mapEdgesToItems(cart?.lineItems).reduce((acc, item) => {
    const discount =
      mapEdgesToItems(item.discountApplications)?.reduce((sum, app) => {
        return sum + (app.discountedAmount?.centAmount || 0);
      }, 0) || 0;
    return acc + discount;
  }, 0);

  return (
    <>
      <div className={s.summaryDetails}>
        <div className={s.summaryRow}>
          Subtotal<div>{formatMoney({ money: cart.subtotal })}</div>
        </div>
        {totalDiscount > 0 && (
          <div className={s.summaryRow}>
            Discount
            <div>
              -{" "}
              {formatMoney({
                money: {
                  centAmount: totalDiscount,
                  currencyCode: cart.total.currencyCode,
                  fractionDigits: cart.total.fractionDigits,
                },
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        )}
      </div>
      <div className={s.summaryTotal}>
        Total<div>{formatMoney({ money: cart.total })}</div>
      </div>
    </>
  );
}

export function CartSummarySkeleton() {
  return (
    <>
      <div className={s.summaryDetails}>
        <div className={s.summaryRow}>
          Subtotal
          <div>
            <SkeletonBox width={70} />
          </div>
        </div>
      </div>
      <div className={s.summaryTotal}>
        Total
        <div>
          <SkeletonBox width={70} />
        </div>
      </div>
    </>
  );
}
