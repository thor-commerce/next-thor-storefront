import { CartFragment } from "@/lib/thorcommerce/storefront/generated/types.generated";

export type Cart = CartFragment;

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
