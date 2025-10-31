import { CartDetailsQuery } from "@/__generated__/thor/graphql";
import { mapEdgesToItems } from "@/utils/maps";
import { getServerContext } from "@/utils/server";
import s from "./cart.module.css";
import CartLineItem from "./cart-line-item/cart-line-item";
type Props = {
  cart: CartDetailsQuery["cart"];
};

export default async function Cart({ cart }: Props) {
  const context = await getServerContext();
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
          <h1 className={s.cartHeading}>Summary</h1>
        </div>
      </div>
    </div>
  );
}
