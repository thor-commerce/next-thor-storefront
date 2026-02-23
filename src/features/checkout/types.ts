import { CheckoutCartDetailsQuery } from "@/__generated__/thor/graphql";

export enum CheckoutStepEnum {
    Customer = "customer",
    Delivery = "shipping",
    Payment = "payment",
}


export type CheckoutCart = NonNullable<CheckoutCartDetailsQuery["cart"]>;

export type CheckoutCartLineItem = NonNullable<
  CheckoutCart["lineItems"]["edges"]
>[number]["node"];