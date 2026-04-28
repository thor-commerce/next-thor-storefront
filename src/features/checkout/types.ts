import { CheckoutCartQuery, CurrentCustomerQuery, OrderQuery, PaymentGatewaysQuery } from "@/lib/thorcommerce/storefront/generated/types.generated";

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

export type CheckoutOrder = NonNullable<OrderQuery["order"]>;

export type CheckoutSummaryData = Pick<
  CheckoutCart | CheckoutOrder,
  "lineItems" | "shippingLines" | "subtotal" | "taxedPrice" | "total"
>;

export type CheckoutSummaryLineItem = NonNullable<
  CheckoutSummaryData["lineItems"]["edges"]
>[number]["node"];

export type PaymentGateway = NonNullable<
  PaymentGatewaysQuery["paymentGateways"]["edges"]
>[number]["node"];

export type CheckoutCustomer = NonNullable<CurrentCustomerQuery["customer"]>;

export type CheckoutCustomerAddress = NonNullable<
  NonNullable<CheckoutCustomer["addresses"]["edges"]>
>[number]["node"];
