"use client";

import {
  CheckoutCartDetailsQuery,
  TaxBehavior,
} from "@/__generated__/thor/graphql";
import { SkeletonBox } from "@/components/skeleton-box/skeleton-box";
import { mapEdgesToItems } from "@/utils/maps";
import { formatMoney } from "@/utils/money";
import { QueryRef, useReadQuery } from "@apollo/client/react";
import clsx from "clsx";
import CheckoutSummaryCartLineItem from "./checkout-summary-cart-line-item";
import s from "./checkout-summary.module.css";

export default function CheckoutSummary({
  queryRef,
}: {
  queryRef: QueryRef<CheckoutCartDetailsQuery>;
}) {
  const {
    data: { cart },
  } = useReadQuery(queryRef);

  if (!cart) {
    return null;
  }
  const lineItems = mapEdgesToItems(cart?.lineItems);

  //here we assume all line items have the same tax behavior, which is usually the case, but not a limitation in thor commerce.
  const taxBehavior = lineItems.find(Boolean)?.taxBehavior;

  const totalDiscount = lineItems.reduce((acc, item) => {
    const discount =
      mapEdgesToItems(item.discountApplications).reduce((sum, app) => {
        return sum + (app.discountedAmount?.centAmount || 0);
      }, 0) || 0;
    return acc + discount;
  }, 0);


  const shippingLine = cart.shippingLines.find(Boolean);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.details}>
          {lineItems.map((item) => (
            <CheckoutSummaryCartLineItem key={item.id} lineFragment={item} />
          ))}
          <div className={s.pricingContainer}>
            <div className={s.pricingDetails}>
              <div className={s.priceRow}>
                <div>Subtotal</div>
                <div className={s.price}>
                  <span>
                    {formatMoney({
                      money: cart?.subtotal,
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
              {shippingLine && (
              <div className={s.priceRow}>
                <div>Shipping</div>
                <div className={s.price}>
                  <span>
                    {shippingLine.total
                      ? shippingLine.total.centAmount > 0 ? formatMoney({
                          money: shippingLine.taxedPrice ? (taxBehavior === TaxBehavior.Exclusive ? shippingLine.taxedPrice.net : shippingLine.taxedPrice.gross) : shippingLine.total,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }) : "Free"
                      : "calculated later"}
                  </span>
                </div>
              </div>
            )}

              {totalDiscount > 0 && (
                <div className={s.priceRow}>
                  <div>Discount</div>
                  <div className={s.price}>
                    <span>
                      -{" "}
                      {formatMoney({
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        money: {
                          centAmount: totalDiscount,
                          currencyCode: cart.total.currencyCode,
                          fractionDigits: cart.total.fractionDigits,
                        },
                      })}
                    </span>
                  </div>
                </div>
              )}
              {cart.taxedPrice && taxBehavior === TaxBehavior.Exclusive && (
                <div className={s.priceRow}>
                  <div>Tax</div>
                  <div className={s.price}>
                    <span>
                      {formatMoney({
                        money: cart.taxedPrice.tax,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          className={s.accordionButton}
          //    onClick={toggleClick}
          type="button"
        >
          <div className={clsx(s.priceRow, s.total)}>
            <div className={s.totalLabel}>
              {/* <ChevronDown className={s.chevron} ref={chevron} /> */}
              <span>Show order summary</span>
            </div>
            <div className={s.totalPrice}>
              <span>
                {formatMoney({
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  money: cart.total,
                })}
              </span>
              {cart.taxedPrice && taxBehavior === TaxBehavior.Inclusive && (
                <span className={s.taxPrice}>
                  {`Includes Tax of ${formatMoney({
                    money: cart.taxedPrice.tax,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                </span>
              )}
            </div>
          </div>
        </button>
        <div className={clsx(s.pricingTotal, s["mobile-hidden"])}>
          <div className={clsx(s.priceRow, s.total)}>
            <div className={s.totalLabel}>Total</div>
            <div className={s.totalPrice}>
              <span>
                {formatMoney({
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  money: cart.total,
                })}
              </span>
              {cart.taxedPrice && taxBehavior === TaxBehavior.Inclusive && (
                <span className={s.taxPrice}>
                  {`Includes Tax of ${formatMoney({
                    money: cart.taxedPrice.tax,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CheckoutSummarySkeleton() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.details}>
          <div role="row" className={s.item}>
            <SkeletonBox width={100} height={100} />
            <div className={s.itemDetails}>
              <div>
                <SkeletonBox width={120} height={16} />
              </div>
              <SkeletonBox
                width={60}
                height={14}
                style={{ marginTop: "8px" }}
              />
            </div>
            <div className={s.unitPriceCell}>
              <SkeletonBox width={80} height={16} />
              <span className={s.total}></span>
            </div>
          </div>
          <div className={s.pricingContainer}>
            <div className={s.pricingDetails}>
              <div className={s.priceRow}>
                <div>Subtotal</div>
                <div className={s.price}>
                  <span>
                    <SkeletonBox width={80} height={16} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className={s.accordionButton} type="button">
          <div className={clsx(s.priceRow, s.total)}>
            <div className={s.totalLabel}>
              <span>Show order summary</span>
            </div>
            <div className={s.totalPrice}>
              <span>
                <SkeletonBox width={80} height={16} />
              </span>
            </div>
          </div>
        </button>
        <div className={clsx(s.pricingTotal, s["mobile-hidden"])}>
          <div className={clsx(s.priceRow, s.total)}>
            <div className={s.totalLabel}>Total</div>
            <div className={s.totalPrice}>
              <span>
                <SkeletonBox width={80} height={16} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
