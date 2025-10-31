"use client";

import ThorImage from "@/components/thor-image/thor-image";
import { ProductDetailProduct, ProductDetailProductVariant } from "../types";
import s from "./product-block.module.css";
import { mapEdgesToItems } from "@/utils/maps";
import ProductAttributesSelector from "./product-attribute-selector";
import Button from "@/components/button/button";
import AddToCartForm from "../components/add-to-cart-button";
import AddToCartButton from "../components/add-to-cart-button";
import clsx from "clsx";
import { formatMoney } from "@/utils/money";
type Props = {
  product: ProductDetailProduct;
  selectedVariant: ProductDetailProductVariant;
};

export default function ProductBlock({ product, selectedVariant }: Props) {
  const media = mapEdgesToItems(selectedVariant.media);

  const heroMedia = media.find(Boolean);

  const price = selectedVariant.price;

  const discountedPrice = price?.discountedPrice;
  const discountValue = discountedPrice?.discount?.value;
  let discountLabel: string | null = null;

  if (discountedPrice && price?.value) {
    switch (discountValue?.__typename) {
      case "ProductDiscountAbsoluteValue": {
        const formattedDiscount = formatMoney({
          money: {
            centAmount:
              price.value.centAmount - discountedPrice.value.centAmount,
            currencyCode: price.value.currencyCode,
            fractionDigits: price.value.fractionDigits,
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
    <div className={s.productBlockContainer}>
      <div className={s.productBlockMediaContainer}>
        <div className={s.productBlockMediaCarousel}>
          <div className={s.productMediaWrapper}>
            <ThorImage
              src={heroMedia?.src ?? ""}
              alt={product.name}
              fill
              className={s.productBlockImage}
            />
          </div>
        </div>
      </div>
      <div className={s.productBlockProductDetailContainer}>
        <div className={s.productInfo}>
          <h1 className={s.productHeading}>{product.name}</h1>
          <p className={s.productDescription}>{product.description}</p>
        </div>
      </div>
      <div className={s.productBlockVariantSelectorContainer}>
        <ProductAttributesSelector
          product={product}
          selectedVariant={selectedVariant}
        />
        {price && (
          <div className={s.productPriceInfo}>
            <div className={s.productPriceWrapper}>
              <div
                aria-hidden="true"
                className={clsx(s.productPrice, s.isCurrentPrice)}
              >
                {formatMoney({
                  money: discountedPrice ? discountedPrice.value : price.value,
                })}
              </div>
              {discountedPrice && (
                <div
                  className={clsx(s.productPrice, s.isStrikedOut)}
                  aria-hidden="true"
                >
                  {formatMoney({
                    money: price.value,
                  })}
                </div>
              )}
            </div>
            {discountLabel && (
              <div className={s.discountLabel}>{discountLabel}</div>
            )}
          </div>
        )}


        <AddToCartButton selectedVariantId={selectedVariant.id} />
      </div>
    </div>
  );
}
