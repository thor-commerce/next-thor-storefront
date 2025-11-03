import { gql } from "@/__generated__/thor";
import { CartLineItemFragment } from "@/__generated__/thor/graphql";
import ThorImage from "@/components/thor-image/thor-image";
import { mapEdgesToItems } from "@/utils/maps";
import { FragmentType } from "@apollo/client";
import { useSuspenseFragment } from "@apollo/client/react";
import s from "./cart-line-items.module.css";
import Navigation from "@/components/navigation/navigation";
import DiscountLabelIcon from "@/components/icons/discount-label";
import EditItemQuantityButton from "./edit-quantity-button";
import { RemoveItemButton } from "./remove-line-item-button";
import clsx from "clsx";
import { formatMoney } from "@/utils/money";

const CART_LINE_ITEM_FRAGMENT = gql(/* GraphQL */ `
  fragment CartLineItem on CartLineItem {
    id
    ...EditItemQuantityButton
    taxBehavior
    variantName
    productName
    quantity
    productSlug
    variant {
      id
      image {
        src
      }
      selectedAttributes {
        value
      }
      availability {
        availableForPurchase
        availableQuantity
        stockPolicy
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
    discountApplications {
      edges {
        node {
          label
          discountedAmount {
            centAmount
            currencyCode
            fractionDigits
          }
        }
      }
    }
    total {
      centAmount
      currencyCode
      fractionDigits
    }
  }
`);

export default function CartLineItem({
  lineItemFragment,
}: {
  lineItemFragment: FragmentType<CartLineItemFragment>;
}) {
  const { data: line } = useSuspenseFragment({
    from: lineItemFragment,
    fragment: CART_LINE_ITEM_FRAGMENT,
    fragmentName: "CartLineItem",
  });
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
            <div className={s.productDetails}>
              <div>
                <Navigation href={`/products/${line.productSlug}`}>
                  {line.productName}
                </Navigation>
                <div className={s.attributesText}>{attributesText}</div>
                {discountApplications.length > 0 && (
                  <div className={s.discountLabelContainer}>
                    {discountApplications.map((app) => (
                      <div key={app.label} className={s.discountLabel}>
                        <DiscountLabelIcon />
                        {app.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={s.lineItemControls}>
                <div className={s.quantityControls}>
                  <EditItemQuantityButton itemFragment={line} type="decrease" />
                  <span className={s.quantity}>{line.quantity}</span>
                  <EditItemQuantityButton itemFragment={line} type="increase" />
                </div>
                <RemoveItemButton lineItemId={line.id} />
              </div>
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
