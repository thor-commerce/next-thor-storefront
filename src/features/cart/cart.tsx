import { CartDetailsQuery } from "@/__generated__/thor/graphql";
import { mapEdgesToItems } from "@/utils/maps";
import { getServerContext } from "@/utils/server";
import s from "./cart.module.css";
import CartLineItem from "./cart-line-item/cart-line-item";
import clsx from "clsx";
import { formatMoney } from "@/utils/money";
import Button from "@/components/button/button";
import Navigation from "@/components/navigation/navigation";
type Props = {
  cart: CartDetailsQuery["cart"];
};

export default async function Cart({ cart }: Props) {
  const context = await getServerContext();
  if (!cart) {
    return null;
  }
  const lines = mapEdgesToItems(cart?.lineItems);

  const totalDiscount = lines.reduce((acc, item) => {
    const discount =
      mapEdgesToItems(item.discountApplications)?.reduce((sum, app) => {
        return sum + (app.discountedAmount?.centAmount || 0);
      }, 0) || 0;
    return acc + discount;
  }, 0);

  return (
    <div className={s.cartView}>
      <div className={s.container}>
        <div className={s.cartItemsContainer}>
          <h1 className={s.cartHeading}>Cart</h1>
          <ul className={s.cartItemsList}>
            {lines.map((line) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </ul>
        </div>
        <div className={s.cartSummaryContainer}>
          <h2 className={clsx(s.cartHeading, s.cartSummaryHeading)}>Summary</h2>
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
          <Button as={Navigation} href="/checkout" className={s.checkoutButton}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
