import { gql } from "@/__generated__/thor";
import {
  CheckoutSummaryCartLineItemFragment,
  TaxBehavior,
} from "@/__generated__/thor/graphql";
import ThorImage from "@/components/thor-image/thor-image";
import { mapEdgesToItems } from "@/utils/maps";
import { formatMoney } from "@/utils/money";
import { FragmentType } from "@apollo/client";
import { useFragment } from "@apollo/client/react";
import clsx from "clsx";
import s from "./checkout-summary.module.css";

const CHECKOUT_SUMMARY_CART_LINE_ITEM_FRAGMENT = gql(/* GraphQL */ `
  fragment CheckoutSummaryCartLineItem on CartLineItem {
    id
    productName
    variantName
    quantity
    variant {
      id
      image {
        src
      }
      selectedAttributes {
        value
      }
    }
    discountApplications {
      edges {
        node {
          discountedAmount {
            centAmount
            fractionDigits
            currencyCode
          }
        }
      }
    }
    unitPrice {
      value {
        centAmount
        currencyCode
        fractionDigits
      }
      discountedPrice {
        value {
          centAmount
          currencyCode
          fractionDigits
        }
      }
    }
    taxBehavior
    taxedPrice {
      net {
        centAmount
        currencyCode
        fractionDigits
      }
      gross {
        centAmount
        currencyCode
        fractionDigits
      }
    }
    total {
      centAmount
      currencyCode
      fractionDigits
    }
  }
`);

export default function CheckoutSummaryCartLineItem({
  lineFragment,
}: {
  lineFragment: FragmentType<CheckoutSummaryCartLineItemFragment>;
}) {
  const { data: line, complete } = useFragment({
    from: lineFragment,
    fragmentName: "CheckoutSummaryCartLineItem",
    fragment: CHECKOUT_SUMMARY_CART_LINE_ITEM_FRAGMENT,
  });

  if (!complete) {
    return null;
  }
  const attributesText = line.variant?.selectedAttributes
    .map((selectedAttr) => selectedAttr.value)
    .filter(Boolean)
    .join(", ");

  const originalPrice = line.unitPrice.value;

  const lineItemDiscounts =
    mapEdgesToItems(line.discountApplications).reduce((acc, app) => {
      const discountedAmount = app.discountedAmount?.centAmount;
      if (discountedAmount) {
        return acc + discountedAmount;
      }
      return acc;
    }, 0) ?? 0;

  const effectiveUnitPriceCentAmount =
    (line.unitPrice.discountedPrice
      ? line.unitPrice.discountedPrice.value.centAmount
      : line.unitPrice.value.centAmount) - (lineItemDiscounts || 0);

  const isDiscounted =
    originalPrice.centAmount !== effectiveUnitPriceCentAmount;
  return (
    <div role="row" className={s.item}>
      <div className={s.imageCell} role="cell">
        <ThorImage
          src={line.variant?.image?.src ?? ""}
          className={s.image}
          fill
          sizes="100px"
          alt={line.variantName || "Product image"}
        />
      </div>
      <div className={s.itemDetails} role="cell">
        <div>
          <p className={s.title}>{line.productName}</p>
          <div>
            <p className={s.attributes}>{attributesText}</p>
          </div>
        </div>
        <p className={s.quantity}>Quantity: {line.quantity}</p>
      </div>
      <div className={s.unitPriceCell} role="cell">
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
            money: line.taxedPrice
              ? line.taxBehavior === TaxBehavior.Exclusive
                ? line.taxedPrice.net
                : line.taxedPrice.gross
              : line.total,
          })}
        </span>
      </div>
    </div>
  );
}
