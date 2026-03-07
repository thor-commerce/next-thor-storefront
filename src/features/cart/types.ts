import { CartDetailsQuery } from "@/__generated__/thor/graphql";

export type Cart = NonNullable<CartDetailsQuery["cart"]>;

export type CartLineItemType = NonNullable<Cart["lineItems"]["edges"]>[number]["node"];

export interface DiscountCodeFormData {
	code: string;
}

export interface DiscountCodeActionResponse {
	success: boolean;
	messsage?: string;
	errors?: {
		[K in keyof DiscountCodeFormData]?: string[];
	};
}
