import { gql } from "@/__generated__/thor";
import { ProductGridTileFragment } from "@/__generated__/thor/graphql";
import { FragmentType } from "@apollo/client";
import { useSuspenseFragment } from "@apollo/client/react";
import s from "./product-grid.module.css";
import Link from "next/link";
import ThorImage from "../thor-image/thor-image";
import { formatMoney } from "@/utils/money";
import Navigation from "../navigation/navigation";
import clsx from "clsx";

const PRODUCT_GRID_TILE_FRAGMENT = gql(/* GraphQL */ `
  fragment ProductGridTile on Product {
    id
    name
    heroVariant {
      image {
        src
      }
    }
    priceRange {
      minPrice {
        value {
          centAmount
          currencyCode
          fractionDigits
        }
        discountedPrice {
          value {
            centAmount
            fractionDigits
            currencyCode
          }
          discount {
            value {
              ... on ProductDiscountRelativeValue {
                factor
              }
              ... on ProductDiscountAbsoluteValue {
                value {
                  centAmount
                  currencyCode
                  fractionDigits
                }
              }
            }
          }
        }
      }
    }
  }
`);

type Props = {
  productFragment: FragmentType<ProductGridTileFragment>;
};

export default function ProductGridTile({ productFragment }: Props) {
  const { data } = useSuspenseFragment({
    fragment: PRODUCT_GRID_TILE_FRAGMENT,
    from: productFragment,
    fragmentName: "ProductGridTile",
  });

  const minPrice = data.priceRange?.minPrice;
  const discountedPrice = minPrice?.discountedPrice;
  const discountValue = discountedPrice?.discount?.value;

  let discountLabel: string | null = null;

  if (discountedPrice && minPrice?.value) {
    switch (discountValue?.__typename) {
      case "ProductDiscountAbsoluteValue": {
        const formattedDiscount = formatMoney({
          money: {
            centAmount:
              minPrice.value.centAmount - discountedPrice.value.centAmount,
            currencyCode: minPrice.value.currencyCode,
            fractionDigits: minPrice.value.fractionDigits,
          },
        });
        if (formattedDiscount) {
          discountLabel = `${formattedDiscount} off`;
        }
        break;
      }
      case "ProductDiscountRelativeValue": {
        const factor = Number(discountValue.factor);
        if (Number.isFinite(factor) && factor > 0) {
          const percentOff = Math.round(factor * 100);
          if (percentOff > 0) {
            discountLabel = `${percentOff}% off`;
          }
        }
        break;
      }
    }
  }

  return (
    <li className={s.tile}>
      <Navigation href={`/products/${data.id}`} className={s.linkWrapper}>
        <div className={s.imageWrapper}>
          <ThorImage
            src={data.heroVariant?.image?.src ?? ""}
            alt={data.name}
            sizes="33vw"
            fill
            className={s.productImage}
          />
        </div>
        <div className={s.productInfo}>{data.name}</div>

        {minPrice && (
          <div className={s.productPriceInfo}>
            <div className={s.productPriceWrapper}>
              <div
                aria-hidden="true"
                className={clsx(s.productPrice, s.isCurrentPrice)}
              >
                {formatMoney({
                  money: discountedPrice
                    ? discountedPrice.value
                    : minPrice.value,
                })}
              </div>
              {discountedPrice && (
                <div
                  className={clsx(s.productPrice, s.isStrikedOut)}
                  aria-hidden="true"
                >
                  {formatMoney({
                    money: minPrice.value,
                  })}
                </div>
              )}
            </div>
            {discountLabel && (
              <div className={s.discountLabel}>{discountLabel}</div>
            )}
          </div>
        )}
      </Navigation>
    </li>
  );
}
