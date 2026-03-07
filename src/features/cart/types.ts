import { CartDetailsQuery } from "@/__generated__/thor/graphql";

export type Cart = NonNullable<CartDetailsQuery["cart"]>;

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
