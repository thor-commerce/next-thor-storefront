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
  const { control } = useFormContext<CheckoutMainFormValues>();
  const { data } = useSuspenseFragment({
    fragment: AVAILABLE_SHIPPING_METHODS_FRAGMENT,
    from: cartFragment,
    fragmentName: "AvailableShippingMethods",
  });

  const handleShippingMethodChange = async (shippingMethodId: string) => {
    await cartSetShippingMethodAction(shippingMethodId);
  };

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
