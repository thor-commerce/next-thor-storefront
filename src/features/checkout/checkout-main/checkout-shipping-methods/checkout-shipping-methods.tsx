"use client";
import { gql } from "@/__generated__/thor";
import { AvailableShippingMethodsFragment } from "@/__generated__/thor/graphql";
import { FragmentType } from "@apollo/client";
import { useSuspenseFragment } from "@apollo/client/react";
import { Radio, RadioGroup } from "react-aria-components";
import { Controller, useFormContext } from "react-hook-form";
import { cartSetShippingMethodAction } from "../../actions";
import { CheckoutMainFormValues } from "../checkout-main";
import s from "./checkout-shipping-methods.module.css";
import { formatMoney } from "@/utils/money";
import { useEffect } from "react";
import { SkeletonBox } from "@/components/skeleton-box/skeleton-box";
import { SkeletonText } from "@/components/skeleton-text/skeleton-text";
const AVAILABLE_SHIPPING_METHODS_FRAGMENT = gql(/* GraphQL */ `
  fragment AvailableShippingMethods on Cart {
    id
    availableShippingMethods {
      id
      name
      description
      rate {
        id
        ... on AbsoluteShippingMethodRate {
          price {
            centAmount
            currencyCode
            fractionDigits
          }
        }
        ... on RelativeShippingMethodRate {
          rate
        }
      }
    }
  }
`);
export default function CheckoutShippingMethods({
  cartFragment,
}: {
  cartFragment: FragmentType<AvailableShippingMethodsFragment>;
}) {
  const { control, setValue } = useFormContext<CheckoutMainFormValues>();
  const { data } = useSuspenseFragment({
    fragment: AVAILABLE_SHIPPING_METHODS_FRAGMENT,
    from: cartFragment,
    fragmentName: "AvailableShippingMethods",
  });

  const handleShippingMethodChange = async (shippingMethodId: string) => {
    await cartSetShippingMethodAction(shippingMethodId);
  };

  // Auto-select first shipping method if available and none is selected
  useEffect(() => {
    if (
      data.availableShippingMethods.length > 0 &&
      !control._formValues.shippingMethodId
    ) {
      const firstMethodId = data.availableShippingMethods[0].id;
      setValue("shippingMethodId", firstMethodId, { shouldDirty: false });
      // Also update the cart immediately
      handleShippingMethodChange(firstMethodId);
    }
  }, [
    data.availableShippingMethods,
    control._formValues.shippingMethodId,
    setValue,
  ]);

  // Show empty state if no shipping methods are available
  if (data.availableShippingMethods.length === 0) {
    return (
      <div className={s.emptyState}>
        <svg
          className={s.emptyStateIcon}
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 8H4V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 8L5.5 4H18.5L21 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 12H14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <p className={s.emptyStateTitle}>No shipping methods available</p>
        <p className={s.emptyStateDescription}>
          Please fill out your shipping details above to see available delivery
          options
        </p>
      </div>
    );
  }

  return (
    <Controller
      control={control}
      name="shippingMethodId"
      render={({ field }) => (
        <RadioGroup
          className={s.radioGroup}
          {...field}
          onChange={(value) => {
            field.onChange(value);
            handleShippingMethodChange(value);
          }}
        >
          {data.availableShippingMethods.map((shippingMethod) => (
            <Radio
              key={shippingMethod.id}
              value={shippingMethod.id}
              className={s.deliveryMethod}
            >
              <div className={s.methodContainer}>
                <div>
                  {shippingMethod.name}
                  <p className={s.deliveryMethodDescription}>
                    {shippingMethod.description}
                  </p>
                </div>
              </div>
              <span className={s.shippingMethodPrice}>
                {shippingMethod.rate.__typename ===
                  "AbsoluteShippingMethodRate" && (
                  <>
                    {shippingMethod.rate.price.centAmount === 0
                      ? "Free"
                      : formatMoney({
                          money: shippingMethod.rate.price,
                        })}
                  </>
                )}
              </span>
            </Radio>
          ))}
        </RadioGroup>
      )}
    />
  );
}

export function CheckoutShippingMethodsSkeleton() {
  return (
    <RadioGroup className={s.radioGroup}>
      {Array.from({ length: 3 }).map((_, index) => (
        <Radio
          key={index}
          value={`shipping-method-${index}`}
          className={s.deliveryMethod}
        >
          <div className={s.methodContainer}>
            <div>
              <SkeletonText size="bodySmall" lines={2} maxWidth="200px" />
            </div>
          </div>
          <span className={s.shippingMethodPrice}>
            <SkeletonBox height={12} width={50} />
          </span>
        </Radio>
      ))}
    </RadioGroup>
  );
}
