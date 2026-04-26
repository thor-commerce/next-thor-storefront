import { CheckoutCartQuery } from "@/lib/thorcommerce/storefront/generated/types.generated";

export enum CheckoutStepEnum {
  GatewaySelection = "gateway-selection",
  Customer = "customer",
  Delivery = "shipping",
  Payment = "payment",
}


export type CheckoutCart = NonNullable<CheckoutCartQuery["cart"]>;

export type CheckoutCartLineItem = NonNullable<
  CheckoutCart["lineItems"]["edges"]
>[number]["node"];