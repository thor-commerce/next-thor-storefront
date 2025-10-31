import { CartDetailsQuery } from "@/__generated__/thor/graphql";

export type CartLineItemType = NonNullable<
  NonNullable<CartDetailsQuery["cart"]>["lineItems"]["edges"]
>[number]["node"];
