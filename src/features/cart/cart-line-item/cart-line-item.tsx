import ThorImage from "@/components/thor-image/thor-image";
import { CartLineItemType } from "../types";
import s from "./cart-line-item.module.css";
import { mapEdgesToItems } from "@/utils/maps";
import { formatMoney } from "@/utils/money";
import clsx from "clsx";

export default async function CartLineItem({
  line,
}: {
  line: CartLineItemType;
}) {
  const attributesText = line.variant?.selectedAttributes
    .map((selectedAttr) => selectedAttr.value)
    .filter(Boolean)
    .join(", ");

  const originalPrice = line.unitPrice.value;

  const discountApplications = mapEdgesToItems(line.discountApplications);

  const lineDiscounts =
    discountApplications?.reduce((acc, app) => {
      const discountedAmount = app.discountedAmount?.centAmount;
      if (discountedAmount) {
        return acc + discountedAmount;
      }
      return acc;
    }, 0) ?? 0;

  const effectiveUnitPriceCentAmount =
    (line.unitPrice.discountedPrice
      ? line.unitPrice.discountedPrice.value.centAmount
      : line.unitPrice.value.centAmount) - (lineDiscounts || 0);

  const isDiscounted =
    originalPrice.centAmount !== effectiveUnitPriceCentAmount;
  return (
    <li className={s.cartLineItem}>
      <div className={s.lineRow}>
        <div className={s.productThumbnail}>
          <div className={s.thumbnailWrapper}>
            <ThorImage
              src={line.variant?.image?.src ?? ""}
              alt={line.variantName}
              fill
            />
          </div>
        </div>
        <div className={s.productInfo}>
          <div className={s.productInfoWrapper}>
            <div className="">
              <div>{line.productName}</div>
              <div className={s.attributesText}>{attributesText}</div>
            </div>
            <div className={s.linePrice}>
              {isDiscounted && (
                <span className={clsx(s.subtotal, s.strikeThrough)}>
                  {formatMoney({
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                    money: {
                      ...originalPrice,
                      centAmount: originalPrice.centAmount * line.quantity,
                    },
                  })}
                </span>
              )}
              <span className={s.total}>
                {formatMoney({
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                  money: line.total,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
