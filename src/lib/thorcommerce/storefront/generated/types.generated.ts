/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
	T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { DocumentTypeDecoration } from "@graphql-typed-document-node/core";
/** Input type for creating or updating an address in a cart. */
export type CartAddressInput = {
	address1?: string | null | undefined;
	address2?: string | null | undefined;
	city?: string | null | undefined;
	company?: string | null | undefined;
	countryCode?: string | null | undefined;
	email?: string | null | undefined;
	firstName?: string | null | undefined;
	lastName?: string | null | undefined;
	phone?: string | null | undefined;
	postalCode?: string | null | undefined;
	state?: string | null | undefined;
};

/** This is the input type for completing a cart. */
export type CartCompleteInput = {
	cartId: string | number;
	marketingConsent?: boolean | null | undefined;
};

/** This is the input type for creating a cart. */
export type CartCreateInput = {
	/** Optional billing address for the cart. */
	billingAddress?: CartAddressInput | null | undefined;
	/** Two-digit country code as per ISO 3166-1 alpha-2 */
	countryCode?: string | null | undefined;
	/** ISO 4217 currency code. */
	currency: string;
	/** Email address of the customer associated with the cart. */
	customerEmail?: string | null | undefined;
	/** The unique identifier of the customer associated with the cart. */
	customerId?: string | number | null | undefined;
	/** Optional list of line items to be added to the cart. */
	lineItems?: Array<CartLineItemInput> | null | undefined;
	/** Optional marketing consent preference associated with the cart. */
	marketingConsent?: boolean | null | undefined;
	/** Optional unique identifier of the price channel. */
	priceChannelId?: string | number | null | undefined;
	/** Optional shipping address for the cart. */
	shippingAddress?: CartAddressInput | null | undefined;
	/** The unique identifier of the store. */
	storeId: string | number;
};

/** This is the input type for adding a discount code to a cart. */
export type CartDiscountCodeAddInput = {
	/** The unique identifier of the cart to which the discount code will be added. */
	cartId: string | number;
	/** The discount code to be applied to the cart. This code is typically provided by the store or promotion. */
	discountCode: string;
};

/** This is the input type for removing a discount code from a cart. */
export type CartDiscountCodeRemoveInput = {
	/** The unique identifier of the cart from which the discount code will be removed. */
	cartId: string | number;
	/** The discount codes to be removed from the cart. */
	discountCodes: Array<string>;
};

/** This is the input type for adding a line item to a cart. */
export type CartLineItemInput = {
	/** Optional metadata for the line item. This can be used to store additional information about the line item. */
	metadata?: Array<KeyValuePairOfStringAndStringInput> | null | undefined;
	/** The number of line items of the given variant present in the cart. */
	quantity: number;
	/** The unique identifier of the product variant. */
	variantId: string | number;
};

/** This is the input type for updating the line item in a cart. */
export type CartLineItemUpdateInput = {
	/** The unique identifier of the line item to be updated. */
	lineItemId: string | number;
	/** Optional metadata for the line item. This can be used to store additional information about the line item. */
	metadata?: Array<KeyValuePairOfStringAndStringInput> | null | undefined;
	/** The new quantity for the line item. If set to 0, the line item will be removed from the cart. */
	quantity: number;
};

/** This is the input type for adding line items to a cart. */
export type CartLineItemsAddInput = {
	/** The unique identifier of the cart. */
	cartId: string | number;
	/** The list of line items to be added to the cart. */
	lineItems: Array<CartLineItemInput>;
};

/** This is the input type for removing line items from a cart. */
export type CartLineItemsRemoveInput = {
	/** The unique identifier of the cart. */
	cartId: string | number;
	/** The unique identifiers of the line items to be removed. */
	lineItemIds: Array<string | number>;
};

/** This is the input type for updating the quantity of a line item in a cart. */
export type CartLineItemsUpdateInput = {
	/** The unique identifier of the cart to be updated. */
	cartId: string | number;
	/** The list of line items to be updated in the cart. Each line item must have a valid LineItemId. */
	lineItems: Array<CartLineItemUpdateInput>;
};

/** This is the input type for initializing a payment gateway session for a cart. */
export type CartPaymentSessionInitializeInput = {
	/** The unique identifier of the cart for which the payment gateway session is being initialized. */
	cartId: string | number;
	/** The unique identifier of the payment gateway to be used for the session. */
	gatewayId: string | number;
	/** The external payment reference used for reconciliation. Required for manual payment gateways. */
	pspReference?: string | null | undefined;
};

/** This is the input type for replicating a cart. */
export type CartReplicateInput = {
	/** The unique identifier of the cart to be replicated. */
	cartId: string | number;
	/** The ISO 4217 currency code for the cart to be replicated. */
	currency: string;
	/** The unique identifier of the price channel to be used for the replicated cart. If not provided, it will keep the same price channel as the original cart. */
	priceChannelId?: string | number | null | undefined;
	/** The unique identifier of the store to which the cart will be replicated. */
	storeId: string | number;
	/** The replication strategy to be used when replicating the cart. */
	strategy: ReplicationStrategy;
};

/**
 * This is the input type for setting the shipping lines on a cart.
 * Providing the list will replace any existing shipping lines.
 */
export type CartShippingLinesSetInput = {
	cartId: string | number;
	shippingMethodIds: Array<string | number>;
};

/** Lifecycle states of a shopping cart. */
export enum CartState {
	/** The default state where a Cart can be updated and ordered. */
	Active = "ACTIVE",
	/** A Cart was ordered, and no further operations are allowed on the Cart. */
	Ordered = "ORDERED",
}

/** This is the input type for updating a cart. */
export type CartUpdateInput = {
	/** Optional billing address for the cart. If not provided, the existing billing address will remain unchanged. */
	billingAddress?: CartAddressInput | null | undefined;
	/** The unique identifier of the cart to be updated. */
	cartId: string | number;
	/** Email address of the customer associated with the cart. If not provided, the existing email will remain unchanged. */
	customerEmail?: string | null | undefined;
	/** The unique identifier of the customer associated with the cart. If not provided, the existing customer will remain unchanged. */
	customerId?: string | number | null | undefined;
	/** Optional marketing consent preference associated with the cart. If not provided, the existing value will remain unchanged. */
	marketingConsent?: boolean | null | undefined;
	/** Optional metadata for the cart. This can be used to store additional information about the cart. */
	metadata?: Array<KeyValuePairOfStringAndStringInput> | null | undefined;
	/** Optional unique identifier of the price channel. If provided, the cart will be updated to use the specified price channel. */
	priceChannelId?: string | number | null | undefined;
	/** Optional shipping address for the cart. If not provided, the existing shipping address will remain unchanged. */
	shippingAddress?: CartAddressInput | null | undefined;
};

/** Activates a customer account using the provided token and sets the customer's password. */
export type CustomerActivateInput = {
	/** The email address of the customer to be activated. */
	email: string;
	/** The first name of the customer. */
	firstName?: string | null | undefined;
	/** The last name of the customer. */
	lastName?: string | null | undefined;
	/** The metadata of the customer, which can be used to store additional information about the customer */
	metadata?: Array<KeyValuePairOfStringAndStringInput> | null | undefined;
	/** The password to set for the customer account. */
	password: string;
	/** The activation token that was sent to the customer's email address, through `CustomerRegister`. */
	token: string;
};

/** Represents the input for resetting a customer's password. */
export type CustomerPasswordResetInput = {
	/** The email address of the customer whose password is being reset. */
	email: string;
	/** The new password for the customer. */
	password: string;
	/** The reset token that was sent to the customer's email address. */
	resetToken: string;
};

/** Represents the input for requesting a password reset token for a customer. */
export type CustomerPasswordResetTokenInput = {
	/** The email address of the customer to recover. */
	email: string;
};

/** Generates a CustomerEmailConfirmationToken event in webhooks, you can use this to send a confirmation email to the customer. */
export type CustomerRegisterInput = {
	/** The customer's email address. */
	email: string;
};

/** Outcomes that explain whether and why a discount code could not be applied. */
export enum DiscountCodeError {
	/** The discount was eligible but excluded by the cart's discount-combination policy. */
	ExcludedByDiscountPolicy = "EXCLUDED_BY_DISCOUNT_POLICY",
	/** The current customer has reached their usage limit for the discount. */
	MaxApplicationsPerCustomerReached = "MAX_APPLICATIONS_PER_CUSTOMER_REACHED",
	/** The discount has reached its overall usage limit. */
	MaxApplicationsReached = "MAX_APPLICATIONS_REACHED",
	/** The discount code is valid and no error occurred. */
	None = "NONE",
	/** The referenced discount code is no longer available. */
	NotFound = "NOT_FOUND",
	/** No applicable discount matches the supplied code and cart. */
	NoMatch = "NO_MATCH",
	/** The discount code could not be applied for an unspecified reason. */
	Unknown = "UNKNOWN",
}

/** Product or variant fields that can be presented as storefront facets. */
export enum FacetField {
	/** Groups results by product attribute value. */
	Attribute = "ATTRIBUTE",
	/** Groups results by purchasing availability. */
	Availability = "AVAILABILITY",
	/** Groups results by a configured metafield value. */
	Metafield = "METAFIELD",
	/** Groups results into price ranges. */
	Price = "PRICE",
	/** Groups results by product tag. */
	Tag = "TAG",
	/** Groups results by product vendor. */
	Vendor = "VENDOR",
}

export type KeyValuePairOfStringAndStringInput = {
	key: string;
	value: string;
};

/** Lifecycle states of an order. */
export enum OrderState {
	/** The order was cancelled before completion. */
	Cancelled = "CANCELLED",
	/** Processing of the order has been completed. */
	Complete = "COMPLETE",
	/** The order has been accepted for processing. */
	Confirmed = "CONFIRMED",
	/** The order has been created and can still be processed. */
	Open = "OPEN",
}

/** Summary states of payment collection for an order. */
export enum PaymentState {
	/** The full payable amount has been authorized but not fully captured. */
	Authorized = "AUTHORIZED",
	/** The order still has an amount that must be paid. */
	BalanceDue = "BALANCE_DUE",
	/** The required payment processing did not succeed. */
	Failed = "FAILED",
	/** The collected amount is greater than the order's payable balance. */
	Overpaid = "OVERPAID",
	/** The order's payable balance has been collected. */
	Paid = "PAID",
	/** Only part of the payable amount has been authorized. */
	PartiallyAuthorized = "PARTIALLY_AUTHORIZED",
	/** Part of the captured amount has been refunded. */
	PartiallyRefunded = "PARTIALLY_REFUNDED",
	/** No payment attempt has reached a final or authorized state. */
	Pending = "PENDING",
	/** The captured amount has been fully refunded. */
	Refunded = "REFUNDED",
}

/** The set of valid sort keys for the products inside a category. */
export enum ProductCategorySortKeys {
	/** Sort by product identifier. */
	Id = "ID",
	/** Sorts by the manual sort order of the product in the category. */
	Manual = "MANUAL",
	/** Sort by product name. */
	Name = "NAME",
	/**
	 * Sorts by product variant prices, if ASC is specified, it will sort by the lowest price of the variants.
	 * If DESC is specified, it will sort by the highest price of the variants.
	 */
	Price = "PRICE",
	/** Sort by the vendor value. */
	Vendor = "VENDOR",
}

/** Fields available for ordering products within a collection. */
export enum ProductCollectionSortKeys {
	/** Orders products by their identifier. */
	Id = "ID",
	/** Uses the collection's explicitly configured product order. */
	Manual = "MANUAL",
	/** Orders products alphabetically by name. */
	Name = "NAME",
	/** Orders products by variant price. */
	Price = "PRICE",
	/** Orders products alphabetically by vendor. */
	Vendor = "VENDOR",
}

/** The set of valid sort keys for the Products query. */
export enum ProductSortKeys {
	/** Sort by product identifier. */
	Id = "ID",
	/** Sort by product name. */
	Name = "NAME",
	/**
	 * Sorts by product variant prices, if ASC is specified, it will sort by the lowest price of the variants.
	 * If DESC is specified, it will sort by the highest price of the variants.
	 */
	Price = "PRICE",
	/** Sort by the vendor value. */
	Vendor = "VENDOR",
}

/** Determines how unavailable quantities are handled when copying a cart. */
export enum ReplicationStrategy {
	/** Replicates the cart by approximating the requested quantities as closely as possible. For example, if a line item specifies a quantity of 5 but only 4 are available, 4 will be added to the replicated cart. */
	PartialReplication = "PARTIAL_REPLICATION",
	/** Replicates the cart while excluding any line items that cannot be fully replicated. For example, if a line item specifies a quantity of 5 but only 4 are available, the item will be removed from the replicated cart. */
	SkipUnavailable = "SKIP_UNAVAILABLE",
	/** Generates an error if the cart cannot be replicated exactly as specified. */
	Strict = "STRICT",
}

/** Summary states of shipment progress for an order. */
export enum ShipmentState {
	/** The order's shipment was cancelled. */
	Cancelled = "CANCELLED",
	/** The order's shipment has reached its destination. */
	Delivered = "DELIVERED",
	/** No shipment is ready to leave yet. */
	Pending = "PENDING",
	/** At least one shipment is prepared and waiting to be sent. */
	Ready = "READY",
	/** The order's shipment has been handed over for delivery. */
	Shipped = "SHIPPED",
}

/** Directions available when ordering a list of results. */
export enum SortDirection {
	/** Orders values from lowest to highest or alphabetically from A to Z. */
	Asc = "ASC",
	/** Orders values from highest to lowest or alphabetically from Z to A. */
	Desc = "DESC",
}

/** Determines whether availability is constrained by tracked inventory. */
export enum StockPolicy {
	/** Inventory is not tracked, so availability is not limited by a stock count. */
	NotTracked = "NOT_TRACKED",
	/** Inventory is tracked, so availability depends on the recorded stock. */
	Tracked = "TRACKED",
}

/** Determines whether a price includes tax or has tax added to it. */
export enum TaxBehavior {
	/** Exclusive tax is added on top of the price. For example, a product has the price defined as 5.00 USD. The tax charged on this product could be 10% and would result in a final price of 5.50 USD. (Tax rates might differ—this is only an explanatory example.) */
	Exclusive = "EXCLUSIVE",
	/** Inclusive tax is already included in the price. For example, a product has the price defined as 5.00 USD. The final price the customer pays is 5.00 USD. */
	Inclusive = "INCLUSIVE",
}

export type AvailabilityFragment = {
	availableForPurchase: boolean;
	availableQuantity: number;
	stockPolicy: StockPolicy;
};

export type CartFragment = {
	id: string;
	currency: string;
	customerId: string | null;
	state: CartState;
	checkoutUrl: string;
	lineItemsQuantity: number;
	store: { id: string } | null;
	priceChannel: { id: string } | null;
	shippingAddress: { countryCode: string | null } | null;
	shippingLines: Array<{
		id: string;
		total: { centAmount: number; currencyCode: string; fractionDigits: number };
	}>;
	lineItems: {
		edges: Array<{
			node: {
				id: string;
				taxBehavior: TaxBehavior;
				variantName: string;
				variantId: string;
				productName: string;
				quantity: number;
				productSlug: string;
				variant: {
					id: string;
					image: { src: string } | null;
					selectedAttributes: Array<{ value: string }>;
					availability: {
						availableForPurchase: boolean;
						availableQuantity: number;
						stockPolicy: StockPolicy;
					} | null;
				} | null;
				unitPrice: {
					value: { centAmount: number; currencyCode: string; fractionDigits: number };
					discountedPrice: {
						value: { centAmount: number; currencyCode: string; fractionDigits: number };
					} | null;
				};
				discountApplications: {
					edges: Array<{
						node: {
							label: string;
							discountedAmount: { centAmount: number; currencyCode: string; fractionDigits: number };
						};
					}> | null;
				};
				total: { centAmount: number; currencyCode: string; fractionDigits: number };
			};
		}> | null;
	};
	discountCodes: Array<{ code: string; error: DiscountCodeError | null }>;
	subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
	taxedPrice: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
	total: { centAmount: number; currencyCode: string; fractionDigits: number };
};

export type CategoryBreadcrumbFragment = {
	id: string;
	name: string;
	slug: string;
	ancestors: Array<{ id: string; name: string; slug: string }>;
};

export type FacetFragment = {
	field: FacetField;
	name: string;
	queryField: string;
	values: Array<{ name: string; count: number }>;
};

export type MoneyFragment = { centAmount: number; currencyCode: string; fractionDigits: number };

export type PriceFragment = {
	validFrom: string | null;
	validUntil: string | null;
	discountedPrice: {
		discount: {
			validFrom: string | null;
			validUntil: string | null;
			value:
				| {
						__typename: "ProductDiscountAbsoluteValue";
						value: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
				  }
				| { __typename: "ProductDiscountRelativeValue"; factor: number };
		} | null;
		value: { centAmount: number; currencyCode: string; fractionDigits: number };
	} | null;
	value: { centAmount: number; currencyCode: string; fractionDigits: number };
};

export type ProductListTileFragment = {
	id: string;
	name: string;
	slug: string;
	heroVariant: { id: string; image: { src: string } | null } | null;
	colorVariants: {
		edges: Array<{
			node: {
				id: string;
				image: { src: string } | null;
				price: {
					validFrom: string | null;
					validUntil: string | null;
					discountedPrice: {
						discount: {
							validFrom: string | null;
							validUntil: string | null;
							value:
								| {
										__typename: "ProductDiscountAbsoluteValue";
										value: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
								  }
								| { __typename: "ProductDiscountRelativeValue"; factor: number };
						} | null;
						value: { centAmount: number; currencyCode: string; fractionDigits: number };
					} | null;
					value: { centAmount: number; currencyCode: string; fractionDigits: number };
				} | null;
				selectedAttributes: Array<{
					attribute: { name: string };
					attributeValue: { id: string; value: string } | { id: string; value: string };
				}>;
			};
		}> | null;
	};
	priceRange: {
		minPrice: {
			validFrom: string | null;
			validUntil: string | null;
			discountedPrice: {
				discount: {
					validFrom: string | null;
					validUntil: string | null;
					value:
						| {
								__typename: "ProductDiscountAbsoluteValue";
								value: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
						  }
						| { __typename: "ProductDiscountRelativeValue"; factor: number };
				} | null;
				value: { centAmount: number; currencyCode: string; fractionDigits: number };
			} | null;
			value: { centAmount: number; currencyCode: string; fractionDigits: number };
		};
		maxPrice: {
			validFrom: string | null;
			validUntil: string | null;
			discountedPrice: {
				discount: {
					validFrom: string | null;
					validUntil: string | null;
					value:
						| {
								__typename: "ProductDiscountAbsoluteValue";
								value: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
						  }
						| { __typename: "ProductDiscountRelativeValue"; factor: number };
				} | null;
				value: { centAmount: number; currencyCode: string; fractionDigits: number };
			} | null;
			value: { centAmount: number; currencyCode: string; fractionDigits: number };
		};
	} | null;
};

export type CartCreateMutationVariables = Exact<{
	input: CartCreateInput;
}>;

export type CartCreateMutation = {
	cartCreate: {
		cart: {
			id: string;
			currency: string;
			customerId: string | null;
			state: CartState;
			checkoutUrl: string;
			lineItemsQuantity: number;
			store: { id: string } | null;
			priceChannel: { id: string } | null;
			shippingAddress: { countryCode: string | null } | null;
			shippingLines: Array<{
				id: string;
				total: { centAmount: number; currencyCode: string; fractionDigits: number };
			}>;
			lineItems: {
				edges: Array<{
					node: {
						id: string;
						taxBehavior: TaxBehavior;
						variantName: string;
						variantId: string;
						productName: string;
						quantity: number;
						productSlug: string;
						variant: {
							id: string;
							image: { src: string } | null;
							selectedAttributes: Array<{ value: string }>;
							availability: {
								availableForPurchase: boolean;
								availableQuantity: number;
								stockPolicy: StockPolicy;
							} | null;
						} | null;
						unitPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
							discountedPrice: {
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
						};
						discountApplications: {
							edges: Array<{
								node: {
									label: string;
									discountedAmount: { centAmount: number; currencyCode: string; fractionDigits: number };
								};
							}> | null;
						};
						total: { centAmount: number; currencyCode: string; fractionDigits: number };
					};
				}> | null;
			};
			discountCodes: Array<{ code: string; error: DiscountCodeError | null }>;
			subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
			taxedPrice: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
	};
};

export type CartUpdateMutationVariables = Exact<{
	input: CartUpdateInput;
}>;

export type CartUpdateMutation = {
	cartUpdate: {
		cart: {
			id: string;
			currency: string;
			customerId: string | null;
			state: CartState;
			checkoutUrl: string;
			lineItemsQuantity: number;
			store: { id: string } | null;
			priceChannel: { id: string } | null;
			shippingAddress: { countryCode: string | null } | null;
			shippingLines: Array<{
				id: string;
				total: { centAmount: number; currencyCode: string; fractionDigits: number };
			}>;
			lineItems: {
				edges: Array<{
					node: {
						id: string;
						taxBehavior: TaxBehavior;
						variantName: string;
						variantId: string;
						productName: string;
						quantity: number;
						productSlug: string;
						variant: {
							id: string;
							image: { src: string } | null;
							selectedAttributes: Array<{ value: string }>;
							availability: {
								availableForPurchase: boolean;
								availableQuantity: number;
								stockPolicy: StockPolicy;
							} | null;
						} | null;
						unitPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
							discountedPrice: {
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
						};
						discountApplications: {
							edges: Array<{
								node: {
									label: string;
									discountedAmount: { centAmount: number; currencyCode: string; fractionDigits: number };
								};
							}> | null;
						};
						total: { centAmount: number; currencyCode: string; fractionDigits: number };
					};
				}> | null;
			};
			discountCodes: Array<{ code: string; error: DiscountCodeError | null }>;
			subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
			taxedPrice: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
		errors: Array<
			| { message: string; code: "CartAuthenticationFailedError" }
			| { message: string; code: "CartAuthorizationFailedError" }
			| { message: string; code: "CartNotFoundError" }
			| { message: string; code: "CartUpdatePriceChannelNotFoundError" }
		> | null;
	};
};

export type CartReplicateMutationVariables = Exact<{
	input: CartReplicateInput;
}>;

export type CartReplicateMutation = {
	cartReplicate: {
		cart: {
			id: string;
			currency: string;
			customerId: string | null;
			state: CartState;
			checkoutUrl: string;
			lineItemsQuantity: number;
			store: { id: string } | null;
			priceChannel: { id: string } | null;
			shippingAddress: { countryCode: string | null } | null;
			shippingLines: Array<{
				id: string;
				total: { centAmount: number; currencyCode: string; fractionDigits: number };
			}>;
			lineItems: {
				edges: Array<{
					node: {
						id: string;
						taxBehavior: TaxBehavior;
						variantName: string;
						variantId: string;
						productName: string;
						quantity: number;
						productSlug: string;
						variant: {
							id: string;
							image: { src: string } | null;
							selectedAttributes: Array<{ value: string }>;
							availability: {
								availableForPurchase: boolean;
								availableQuantity: number;
								stockPolicy: StockPolicy;
							} | null;
						} | null;
						unitPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
							discountedPrice: {
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
						};
						discountApplications: {
							edges: Array<{
								node: {
									label: string;
									discountedAmount: { centAmount: number; currencyCode: string; fractionDigits: number };
								};
							}> | null;
						};
						total: { centAmount: number; currencyCode: string; fractionDigits: number };
					};
				}> | null;
			};
			discountCodes: Array<{ code: string; error: DiscountCodeError | null }>;
			subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
			taxedPrice: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
	};
};

export type CartDiscountCodeAddMutationVariables = Exact<{
	input: CartDiscountCodeAddInput;
}>;

export type CartDiscountCodeAddMutation = {
	cartDiscountCodeAdd: {
		cart: {
			id: string;
			currency: string;
			customerId: string | null;
			state: CartState;
			checkoutUrl: string;
			lineItemsQuantity: number;
			store: { id: string } | null;
			priceChannel: { id: string } | null;
			shippingAddress: { countryCode: string | null } | null;
			shippingLines: Array<{
				id: string;
				total: { centAmount: number; currencyCode: string; fractionDigits: number };
			}>;
			lineItems: {
				edges: Array<{
					node: {
						id: string;
						taxBehavior: TaxBehavior;
						variantName: string;
						variantId: string;
						productName: string;
						quantity: number;
						productSlug: string;
						variant: {
							id: string;
							image: { src: string } | null;
							selectedAttributes: Array<{ value: string }>;
							availability: {
								availableForPurchase: boolean;
								availableQuantity: number;
								stockPolicy: StockPolicy;
							} | null;
						} | null;
						unitPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
							discountedPrice: {
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
						};
						discountApplications: {
							edges: Array<{
								node: {
									label: string;
									discountedAmount: { centAmount: number; currencyCode: string; fractionDigits: number };
								};
							}> | null;
						};
						total: { centAmount: number; currencyCode: string; fractionDigits: number };
					};
				}> | null;
			};
			discountCodes: Array<{ code: string; error: DiscountCodeError | null }>;
			subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
			taxedPrice: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
		errors: Array<
			| { code: "CartAddDiscountCodeNotFoundError" }
			| { code: "CartDiscountCodeMaxApplicationsReachedError" }
			| { code: "CartNotFoundError" }
		> | null;
	};
};

export type CartDiscountCodeRemoveMutationVariables = Exact<{
	input: CartDiscountCodeRemoveInput;
}>;

export type CartDiscountCodeRemoveMutation = {
	cartDiscountCodeRemove: {
		cart: {
			id: string;
			currency: string;
			customerId: string | null;
			state: CartState;
			checkoutUrl: string;
			lineItemsQuantity: number;
			store: { id: string } | null;
			priceChannel: { id: string } | null;
			shippingAddress: { countryCode: string | null } | null;
			shippingLines: Array<{
				id: string;
				total: { centAmount: number; currencyCode: string; fractionDigits: number };
			}>;
			lineItems: {
				edges: Array<{
					node: {
						id: string;
						taxBehavior: TaxBehavior;
						variantName: string;
						variantId: string;
						productName: string;
						quantity: number;
						productSlug: string;
						variant: {
							id: string;
							image: { src: string } | null;
							selectedAttributes: Array<{ value: string }>;
							availability: {
								availableForPurchase: boolean;
								availableQuantity: number;
								stockPolicy: StockPolicy;
							} | null;
						} | null;
						unitPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
							discountedPrice: {
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
						};
						discountApplications: {
							edges: Array<{
								node: {
									label: string;
									discountedAmount: { centAmount: number; currencyCode: string; fractionDigits: number };
								};
							}> | null;
						};
						total: { centAmount: number; currencyCode: string; fractionDigits: number };
					};
				}> | null;
			};
			discountCodes: Array<{ code: string; error: DiscountCodeError | null }>;
			subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
			taxedPrice: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
	};
};

export type CartLineItemsAddMutationVariables = Exact<{
	input: CartLineItemsAddInput;
}>;

export type CartLineItemsAddMutation = {
	cartLineItemsAdd: {
		cart: {
			id: string;
			currency: string;
			customerId: string | null;
			state: CartState;
			checkoutUrl: string;
			lineItemsQuantity: number;
			store: { id: string } | null;
			priceChannel: { id: string } | null;
			shippingAddress: { countryCode: string | null } | null;
			shippingLines: Array<{
				id: string;
				total: { centAmount: number; currencyCode: string; fractionDigits: number };
			}>;
			lineItems: {
				edges: Array<{
					node: {
						id: string;
						taxBehavior: TaxBehavior;
						variantName: string;
						variantId: string;
						productName: string;
						quantity: number;
						productSlug: string;
						variant: {
							id: string;
							image: { src: string } | null;
							selectedAttributes: Array<{ value: string }>;
							availability: {
								availableForPurchase: boolean;
								availableQuantity: number;
								stockPolicy: StockPolicy;
							} | null;
						} | null;
						unitPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
							discountedPrice: {
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
						};
						discountApplications: {
							edges: Array<{
								node: {
									label: string;
									discountedAmount: { centAmount: number; currencyCode: string; fractionDigits: number };
								};
							}> | null;
						};
						total: { centAmount: number; currencyCode: string; fractionDigits: number };
					};
				}> | null;
			};
			discountCodes: Array<{ code: string; error: DiscountCodeError | null }>;
			subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
			taxedPrice: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
		errors: Array<
			| { __typename: "CartLineItemPriceNotFoundError"; message: string }
			| { __typename: "CartLineItemUnavailableForPurchase"; message: string }
			| { __typename: "CartLineItemsInsufficientStockError"; message: string }
			| { __typename: "CartNotFoundError"; message: string }
			| { __typename: "ProductVariantNotFoundError"; message: string }
		> | null;
	};
};

export type CartLineItemsUpdateMutationVariables = Exact<{
	input: CartLineItemsUpdateInput;
}>;

export type CartLineItemsUpdateMutation = {
	cartLineItemsUpdate: {
		cart: {
			id: string;
			currency: string;
			customerId: string | null;
			state: CartState;
			checkoutUrl: string;
			lineItemsQuantity: number;
			store: { id: string } | null;
			priceChannel: { id: string } | null;
			shippingAddress: { countryCode: string | null } | null;
			shippingLines: Array<{
				id: string;
				total: { centAmount: number; currencyCode: string; fractionDigits: number };
			}>;
			lineItems: {
				edges: Array<{
					node: {
						id: string;
						taxBehavior: TaxBehavior;
						variantName: string;
						variantId: string;
						productName: string;
						quantity: number;
						productSlug: string;
						variant: {
							id: string;
							image: { src: string } | null;
							selectedAttributes: Array<{ value: string }>;
							availability: {
								availableForPurchase: boolean;
								availableQuantity: number;
								stockPolicy: StockPolicy;
							} | null;
						} | null;
						unitPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
							discountedPrice: {
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
						};
						discountApplications: {
							edges: Array<{
								node: {
									label: string;
									discountedAmount: { centAmount: number; currencyCode: string; fractionDigits: number };
								};
							}> | null;
						};
						total: { centAmount: number; currencyCode: string; fractionDigits: number };
					};
				}> | null;
			};
			discountCodes: Array<{ code: string; error: DiscountCodeError | null }>;
			subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
			taxedPrice: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
		errors: Array<
			| { __typename: "CartLineItemsNotFoundError"; message: string }
			| { __typename: "CartNotFoundError"; message: string }
			| { __typename: "UpdateCartLineItemsInsufficientStockError"; message: string }
		> | null;
	};
};

export type CartLineItemsRemoveMutationVariables = Exact<{
	input: CartLineItemsRemoveInput;
}>;

export type CartLineItemsRemoveMutation = {
	cartLineItemsRemove: {
		cart: {
			id: string;
			currency: string;
			customerId: string | null;
			state: CartState;
			checkoutUrl: string;
			lineItemsQuantity: number;
			store: { id: string } | null;
			priceChannel: { id: string } | null;
			shippingAddress: { countryCode: string | null } | null;
			shippingLines: Array<{
				id: string;
				total: { centAmount: number; currencyCode: string; fractionDigits: number };
			}>;
			lineItems: {
				edges: Array<{
					node: {
						id: string;
						taxBehavior: TaxBehavior;
						variantName: string;
						variantId: string;
						productName: string;
						quantity: number;
						productSlug: string;
						variant: {
							id: string;
							image: { src: string } | null;
							selectedAttributes: Array<{ value: string }>;
							availability: {
								availableForPurchase: boolean;
								availableQuantity: number;
								stockPolicy: StockPolicy;
							} | null;
						} | null;
						unitPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
							discountedPrice: {
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
						};
						discountApplications: {
							edges: Array<{
								node: {
									label: string;
									discountedAmount: { centAmount: number; currencyCode: string; fractionDigits: number };
								};
							}> | null;
						};
						total: { centAmount: number; currencyCode: string; fractionDigits: number };
					};
				}> | null;
			};
			discountCodes: Array<{ code: string; error: DiscountCodeError | null }>;
			subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
			taxedPrice: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
		errors: Array<{ __typename: "CartNotFoundError"; message: string }> | null;
	};
};

export type CartShippingLinesSetMutationVariables = Exact<{
	input: CartShippingLinesSetInput;
}>;

export type CartShippingLinesSetMutation = {
	cartShippingLinesSet: {
		cart: {
			id: string;
			shippingLines: Array<{ id: string; shippingMethod: { id: string; name: string } }>;
		} | null;
		errors: Array<
			| { message: string; code: "CartNotFoundError" }
			| { message: string; code: "ShippingMethodNotFoundError" }
		> | null;
	};
};

export type CartPaymentSessionInitializeMutationVariables = Exact<{
	input: CartPaymentSessionInitializeInput;
}>;

export type CartPaymentSessionInitializeMutation = {
	cartPaymentSessionInitialize: {
		cart: {
			id: string;
			paymentSession:
				| {
						__typename: "ManualPaymentSession";
						id: string;
						paymentGateway:
							| { id: string; name: string; type: "ManualPaymentGateway" }
							| {
									connectedAccountId: string | null;
									publishableKey: string;
									id: string;
									name: string;
									type: "StripeConnectPaymentGateway";
							  }
							| { publishableKey: string; id: string; name: string; type: "StripePaymentGateway" };
				  }
				| {
						__typename: "StripePaymentSession";
						clientSecret: string;
						id: string;
						paymentGateway:
							| { id: string; name: string; type: "ManualPaymentGateway" }
							| {
									connectedAccountId: string | null;
									publishableKey: string;
									id: string;
									name: string;
									type: "StripeConnectPaymentGateway";
							  }
							| { publishableKey: string; id: string; name: string; type: "StripePaymentGateway" };
				  }
				| null;
		} | null;
		errors: Array<
			| { message: string; code: "CartNotFoundError" }
			| { message: string; code: "PaymentGatewayChannelMismatchError" }
			| { message: string; code: "PaymentGatewayNotFoundError" }
			| { message: string; code: "PaymentGatewaySessionInitializeFailedError" }
			| { message: string; code: "PaymentGatewayUnavailableError" }
		> | null;
	};
};

export type CartCompleteMutationVariables = Exact<{
	input: CartCompleteInput;
}>;

export type CartCompleteMutation = {
	cartComplete: {
		order: { id: string } | null;
		errors: Array<
			| { message: string; code: "CartCompletionDiscountCodeAlreadyUsedError" }
			| { message: string; code: "CartCompletionDiscrepancyError" }
			| { message: string; code: "CartNotFoundError" }
		> | null;
	};
};

export type CustomerActivateMutationVariables = Exact<{
	input: CustomerActivateInput;
}>;

export type CustomerActivateMutation = {
	customerActivate: {
		customer: { id: string } | null;
		errors: Array<
			| { code: "CustomerEmailAlreadyConfirmedError" }
			| { code: "CustomerInvalidActivationTokenError" }
			| { code: "CustomerInvalidPasswordError" }
		> | null;
	};
};

export type CustomerRegisterMutationVariables = Exact<{
	input: CustomerRegisterInput;
}>;

export type CustomerRegisterMutation = {
	customerRegister: { errors: Array<{ code: "CustomerRegisterFailedError" }> | null };
};

export type CustomerResetPasswordTokenMutationVariables = Exact<{
	input: CustomerPasswordResetTokenInput;
}>;

export type CustomerResetPasswordTokenMutation = {
	customerPasswordResetToken: { errors: Array<{ code: "InvalidCredentialsError" }> | null };
};

export type CustomerResetPasswordMutationVariables = Exact<{
	input: CustomerPasswordResetInput;
}>;

export type CustomerResetPasswordMutation = {
	customerPasswordReset: {
		errors: Array<{ code: "InvalidPasswordError" } | { code: "InvalidTokenError" }> | null;
	};
};

export type AccountDashboardQueryVariables = Exact<{
	after?: string | null | undefined;
}>;

export type AccountDashboardQuery = {
	customer: {
		id: string;
		firstName: string | null;
		lastName: string | null;
		email: string | null;
		ordersCount: number;
		defaultShippingAddress: {
			firstName: string | null;
			lastName: string | null;
			company: string | null;
			address1: string | null;
			address2: string | null;
			postalCode: string | null;
			city: string | null;
			state: string | null;
			countryCode: string | null;
			phone: string | null;
		} | null;
		defaultBillingAddress: {
			firstName: string | null;
			lastName: string | null;
			company: string | null;
			address1: string | null;
			address2: string | null;
			postalCode: string | null;
			city: string | null;
			state: string | null;
			countryCode: string | null;
			phone: string | null;
		} | null;
		orders: {
			nodes: Array<{
				id: string;
				orderNumber: number;
				createdAt: string;
				orderState: OrderState;
				paymentState: PaymentState;
				shipmentState: ShipmentState;
				lineItemsQuantity: number;
				lineItems: {
					nodes: Array<{
						id: string;
						productName: string;
						variantName: string;
						quantity: number;
						variant: { image: { src: string } | null } | null;
					}> | null;
					pageInfo: { hasNextPage: boolean };
				};
				total: { centAmount: number; currencyCode: string; fractionDigits: number };
			}> | null;
			pageInfo: { hasNextPage: boolean; endCursor: string | null };
		};
	} | null;
};

export type CartQueryVariables = Exact<{
	id: string | number;
}>;

export type CartQuery = {
	cart: {
		id: string;
		currency: string;
		customerId: string | null;
		state: CartState;
		checkoutUrl: string;
		lineItemsQuantity: number;
		store: { id: string } | null;
		priceChannel: { id: string } | null;
		shippingAddress: { countryCode: string | null } | null;
		shippingLines: Array<{
			id: string;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		}>;
		lineItems: {
			edges: Array<{
				node: {
					id: string;
					taxBehavior: TaxBehavior;
					variantName: string;
					variantId: string;
					productName: string;
					quantity: number;
					productSlug: string;
					variant: {
						id: string;
						image: { src: string } | null;
						selectedAttributes: Array<{ value: string }>;
						availability: {
							availableForPurchase: boolean;
							availableQuantity: number;
							stockPolicy: StockPolicy;
						} | null;
					} | null;
					unitPrice: {
						value: { centAmount: number; currencyCode: string; fractionDigits: number };
						discountedPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						} | null;
					};
					discountApplications: {
						edges: Array<{
							node: {
								label: string;
								discountedAmount: { centAmount: number; currencyCode: string; fractionDigits: number };
							};
						}> | null;
					};
					total: { centAmount: number; currencyCode: string; fractionDigits: number };
				};
			}> | null;
		};
		discountCodes: Array<{ code: string; error: DiscountCodeError | null }>;
		subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
		taxedPrice: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
		total: { centAmount: number; currencyCode: string; fractionDigits: number };
	} | null;
};

export type CartAddressStateQueryVariables = Exact<{
	id: string | number;
}>;

export type CartAddressStateQuery = { cart: { shippingAddress: { address1: string | null } | null } | null };

export type CategoryListQueryVariables = Exact<{
	slug: string;
	currency: string;
	priceChannel?: string | number | null | undefined;
	storeId: string | number;
	after?: string | null | undefined;
	sortDirection: SortDirection;
	sortKey: ProductCategorySortKeys;
	query?: string | null | undefined;
}>;

export type CategoryListQuery = {
	category: {
		id: string;
		name: string;
		slug: string;
		ancestors: Array<{ slug: string; name: string }>;
		products: {
			totalCount: number;
			facets: Array<{
				field: FacetField;
				name: string;
				queryField: string;
				values: Array<{ name: string; count: number }>;
			}>;
			edges: Array<{
				node: {
					id: string;
					name: string;
					slug: string;
					variants: { totalCount: number };
					heroVariant: { id: string; image: { src: string } | null } | null;
					colorVariants: {
						edges: Array<{
							node: {
								id: string;
								image: { src: string } | null;
								price: {
									validFrom: string | null;
									validUntil: string | null;
									discountedPrice: {
										discount: {
											validFrom: string | null;
											validUntil: string | null;
											value:
												| {
														__typename: "ProductDiscountAbsoluteValue";
														value: {
															centAmount: number;
															currencyCode: string;
															fractionDigits: number;
														} | null;
												  }
												| { __typename: "ProductDiscountRelativeValue"; factor: number };
										} | null;
										value: { centAmount: number; currencyCode: string; fractionDigits: number };
									} | null;
									value: { centAmount: number; currencyCode: string; fractionDigits: number };
								} | null;
								selectedAttributes: Array<{
									attribute: { name: string };
									attributeValue: { id: string; value: string } | { id: string; value: string };
								}>;
							};
						}> | null;
					};
					priceRange: {
						minPrice: {
							validFrom: string | null;
							validUntil: string | null;
							discountedPrice: {
								discount: {
									validFrom: string | null;
									validUntil: string | null;
									value:
										| {
												__typename: "ProductDiscountAbsoluteValue";
												value: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
										  }
										| { __typename: "ProductDiscountRelativeValue"; factor: number };
								} | null;
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						};
						maxPrice: {
							validFrom: string | null;
							validUntil: string | null;
							discountedPrice: {
								discount: {
									validFrom: string | null;
									validUntil: string | null;
									value:
										| {
												__typename: "ProductDiscountAbsoluteValue";
												value: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
										  }
										| { __typename: "ProductDiscountRelativeValue"; factor: number };
								} | null;
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						};
					} | null;
				};
			}> | null;
			pageInfo: { endCursor: string | null; hasNextPage: boolean };
		};
	} | null;
};

export type CheckoutCartQueryVariables = Exact<{
	id: string | number;
}>;

export type CheckoutCartQuery = {
	cart: {
		id: string;
		customerId: string | null;
		customerEmail: string | null;
		lineItemsQuantity: number;
		metadata: Array<{ key: string; value: string }>;
		shippingAddress: {
			firstName: string | null;
			lastName: string | null;
			company: string | null;
			address1: string | null;
			address2: string | null;
			city: string | null;
			postalCode: string | null;
			state: string | null;
			countryCode: string | null;
			phone: string | null;
			formatted: string | null;
		} | null;
		billingAddress: {
			firstName: string | null;
			lastName: string | null;
			company: string | null;
			address1: string | null;
			address2: string | null;
			city: string | null;
			postalCode: string | null;
			state: string | null;
			countryCode: string | null;
			phone: string | null;
			formatted: string | null;
		} | null;
		availableShippingMethods: Array<{
			id: string;
			name: string;
			description: string | null;
			rate:
				| {
						__typename: "AbsoluteShippingMethodRate";
						id: string;
						price: { centAmount: number; currencyCode: string; fractionDigits: number };
				  }
				| { __typename: "RelativeShippingMethodRate"; rate: number; id: string };
		}>;
		shippingLines: Array<{
			id: string;
			taxBehavior: TaxBehavior;
			shippingMethod: { id: string; name: string };
			taxedPrice: {
				gross: { centAmount: number; currencyCode: string; fractionDigits: number };
				net: { centAmount: number; currencyCode: string; fractionDigits: number };
				tax: { centAmount: number; currencyCode: string; fractionDigits: number };
			} | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		}>;
		paymentSession:
			| {
					__typename: "ManualPaymentSession";
					id: string;
					paymentGateway:
						| { id: string; name: string; type: "ManualPaymentGateway" }
						| {
								connectedAccountId: string | null;
								publishableKey: string;
								id: string;
								name: string;
								type: "StripeConnectPaymentGateway";
						  }
						| { publishableKey: string; id: string; name: string; type: "StripePaymentGateway" };
			  }
			| {
					__typename: "StripePaymentSession";
					clientSecret: string;
					id: string;
					paymentGateway:
						| { id: string; name: string; type: "ManualPaymentGateway" }
						| {
								connectedAccountId: string | null;
								publishableKey: string;
								id: string;
								name: string;
								type: "StripeConnectPaymentGateway";
						  }
						| { publishableKey: string; id: string; name: string; type: "StripePaymentGateway" };
			  }
			| null;
		lineItems: {
			edges: Array<{
				node: {
					id: string;
					taxBehavior: TaxBehavior;
					variantName: string;
					variantId: string;
					productName: string;
					quantity: number;
					productSlug: string;
					variant: {
						id: string;
						image: { src: string } | null;
						selectedAttributes: Array<{ value: string }>;
						availability: {
							availableForPurchase: boolean;
							availableQuantity: number;
							stockPolicy: StockPolicy;
						} | null;
					} | null;
					unitPrice: {
						value: { centAmount: number; currencyCode: string; fractionDigits: number };
						discountedPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						} | null;
					};
					discountApplications: {
						edges: Array<{
							node: {
								label: string;
								discountedAmount: { centAmount: number; currencyCode: string; fractionDigits: number };
							};
						}> | null;
					};
					taxedPrice: {
						gross: { centAmount: number; currencyCode: string; fractionDigits: number };
						net: { centAmount: number; currencyCode: string; fractionDigits: number };
						tax: { centAmount: number; currencyCode: string; fractionDigits: number };
					} | null;
					total: { centAmount: number; currencyCode: string; fractionDigits: number };
				};
			}> | null;
		};
		discountCodes: Array<{ code: string; error: DiscountCodeError | null }>;
		subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
		taxedPrice: {
			tax: { centAmount: number; currencyCode: string; fractionDigits: number };
			net: { centAmount: number; currencyCode: string; fractionDigits: number };
			gross: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
		total: { centAmount: number; currencyCode: string; fractionDigits: number };
	} | null;
};

export type PaymentGatewaysQueryVariables = Exact<{
	cartId: string | number;
}>;

export type PaymentGatewaysQuery = {
	paymentGateways: {
		edges: Array<{
			node:
				| { id: string; name: string; type: "ManualPaymentGateway" }
				| { id: string; name: string; type: "StripeConnectPaymentGateway" }
				| { id: string; name: string; type: "StripePaymentGateway" };
		}> | null;
	};
};

export type CollectionListQueryVariables = Exact<{
	slug: string;
	currency: string;
	priceChannel?: string | number | null | undefined;
	storeId: string | number;
	after?: string | null | undefined;
	sortDirection: SortDirection;
	sortKey: ProductCollectionSortKeys;
	query?: string | null | undefined;
}>;

export type CollectionListQuery = {
	collection: {
		id: string;
		name: string;
		products: {
			totalCount: number;
			facets: Array<{
				field: FacetField;
				name: string;
				queryField: string;
				values: Array<{ name: string; count: number }>;
			}>;
			edges: Array<{
				node: {
					id: string;
					name: string;
					slug: string;
					heroVariant: { id: string; image: { src: string } | null } | null;
					colorVariants: {
						edges: Array<{
							node: {
								id: string;
								image: { src: string } | null;
								price: {
									validFrom: string | null;
									validUntil: string | null;
									discountedPrice: {
										discount: {
											validFrom: string | null;
											validUntil: string | null;
											value:
												| {
														__typename: "ProductDiscountAbsoluteValue";
														value: {
															centAmount: number;
															currencyCode: string;
															fractionDigits: number;
														} | null;
												  }
												| { __typename: "ProductDiscountRelativeValue"; factor: number };
										} | null;
										value: { centAmount: number; currencyCode: string; fractionDigits: number };
									} | null;
									value: { centAmount: number; currencyCode: string; fractionDigits: number };
								} | null;
								selectedAttributes: Array<{
									attribute: { name: string };
									attributeValue: { id: string; value: string } | { id: string; value: string };
								}>;
							};
						}> | null;
					};
					priceRange: {
						minPrice: {
							validFrom: string | null;
							validUntil: string | null;
							discountedPrice: {
								discount: {
									validFrom: string | null;
									validUntil: string | null;
									value:
										| {
												__typename: "ProductDiscountAbsoluteValue";
												value: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
										  }
										| { __typename: "ProductDiscountRelativeValue"; factor: number };
								} | null;
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						};
						maxPrice: {
							validFrom: string | null;
							validUntil: string | null;
							discountedPrice: {
								discount: {
									validFrom: string | null;
									validUntil: string | null;
									value:
										| {
												__typename: "ProductDiscountAbsoluteValue";
												value: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
										  }
										| { __typename: "ProductDiscountRelativeValue"; factor: number };
								} | null;
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						};
					} | null;
				};
			}> | null;
			pageInfo: { endCursor: string | null; hasNextPage: boolean };
		};
	} | null;
};

export type CurrentCustomerQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentCustomerQuery = {
	customer: {
		id: string;
		email: string | null;
		firstName: string | null;
		lastName: string | null;
		defaultShippingAddress: {
			id: string;
			firstName: string | null;
			lastName: string | null;
			company: string | null;
			address1: string | null;
			address2: string | null;
			city: string | null;
			postalCode: string | null;
			state: string | null;
			countryCode: string | null;
			phone: string | null;
		} | null;
		defaultBillingAddress: {
			id: string;
			firstName: string | null;
			lastName: string | null;
			company: string | null;
			address1: string | null;
			address2: string | null;
			city: string | null;
			postalCode: string | null;
			state: string | null;
			countryCode: string | null;
			phone: string | null;
		} | null;
		addresses: {
			edges: Array<{
				node: {
					id: string;
					firstName: string | null;
					lastName: string | null;
					company: string | null;
					address1: string | null;
					address2: string | null;
					city: string | null;
					postalCode: string | null;
					state: string | null;
					countryCode: string | null;
					phone: string | null;
				};
			}> | null;
		};
	} | null;
};

export type HomePageQueryVariables = Exact<{
	storeId: string | number;
	currency: string;
	priceChannel?: string | number | null | undefined;
}>;

export type HomePageQuery = {
	categories: {
		edges: Array<{
			node: { id: string; name: string; slug: string; products: { totalCount: number } };
		}> | null;
	};
	collections: {
		edges: Array<{
			node: { id: string; name: string; slug: string; products: { totalCount: number } };
		}> | null;
	};
	products: {
		edges: Array<{
			node: {
				id: string;
				name: string;
				slug: string;
				heroVariant: { image: { src: string } | null } | null;
				priceRange: {
					minPrice: {
						value: { centAmount: number; currencyCode: string; fractionDigits: number };
						discountedPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						} | null;
					};
				} | null;
			};
		}> | null;
	};
};

export type NavigationQueryVariables = Exact<{ [key: string]: never }>;

export type NavigationQuery = {
	categories: { edges: Array<{ node: { id: string; name: string; slug: string } }> | null };
	collections: { edges: Array<{ node: { id: string; name: string; slug: string } }> | null };
};

export type OrderQueryVariables = Exact<{
	id: string | number;
}>;

export type OrderQuery = {
	order: {
		id: string;
		orderNumber: number;
		lineItems: {
			edges: Array<{
				node: {
					id: string;
					taxBehavior: TaxBehavior;
					variantName: string;
					variantId: string;
					productName: string;
					quantity: number;
					productSlug: string;
					variant: {
						id: string;
						image: { src: string } | null;
						selectedAttributes: Array<{ value: string }>;
					} | null;
					unitPrice: {
						value: { centAmount: number; currencyCode: string; fractionDigits: number };
						discountedPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						} | null;
					};
					discountApplications: {
						edges: Array<{
							node: {
								label: string;
								discountedAmount: { centAmount: number; currencyCode: string; fractionDigits: number };
							};
						}> | null;
					};
					taxedPrice: {
						gross: { centAmount: number; currencyCode: string; fractionDigits: number };
						net: { centAmount: number; currencyCode: string; fractionDigits: number };
						tax: { centAmount: number; currencyCode: string; fractionDigits: number };
					} | null;
					total: { centAmount: number; currencyCode: string; fractionDigits: number };
				};
			}> | null;
		};
		shippingLines: Array<{
			id: string;
			taxBehavior: TaxBehavior;
			shippingMethod: { id: string; name: string };
			taxedPrice: {
				gross: { centAmount: number; currencyCode: string; fractionDigits: number };
				net: { centAmount: number; currencyCode: string; fractionDigits: number };
				tax: { centAmount: number; currencyCode: string; fractionDigits: number };
			} | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		}>;
		subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
		taxedPrice: {
			tax: { centAmount: number; currencyCode: string; fractionDigits: number };
			net: { centAmount: number; currencyCode: string; fractionDigits: number };
			gross: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
		total: { centAmount: number; currencyCode: string; fractionDigits: number };
	} | null;
};

export type ProductListQueryVariables = Exact<{
	storeId: string | number;
	currency: string;
	sortDirection: SortDirection;
	sortKey: ProductSortKeys;
	priceChannel?: string | number | null | undefined;
	query?: string | null | undefined;
	after?: string | null | undefined;
}>;

export type ProductListQuery = {
	products: {
		totalCount: number;
		facets: Array<{
			field: FacetField;
			name: string;
			queryField: string;
			values: Array<{ name: string; count: number }>;
		}>;
		edges: Array<{
			node: {
				id: string;
				name: string;
				slug: string;
				variants: { totalCount: number };
				heroVariant: { id: string; image: { src: string } | null } | null;
				colorVariants: {
					edges: Array<{
						node: {
							id: string;
							image: { src: string } | null;
							price: {
								validFrom: string | null;
								validUntil: string | null;
								discountedPrice: {
									discount: {
										validFrom: string | null;
										validUntil: string | null;
										value:
											| {
													__typename: "ProductDiscountAbsoluteValue";
													value: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
											  }
											| { __typename: "ProductDiscountRelativeValue"; factor: number };
									} | null;
									value: { centAmount: number; currencyCode: string; fractionDigits: number };
								} | null;
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
							selectedAttributes: Array<{
								attribute: { name: string };
								attributeValue: { id: string; value: string } | { id: string; value: string };
							}>;
						};
					}> | null;
				};
				priceRange: {
					minPrice: {
						validFrom: string | null;
						validUntil: string | null;
						discountedPrice: {
							discount: {
								validFrom: string | null;
								validUntil: string | null;
								value:
									| {
											__typename: "ProductDiscountAbsoluteValue";
											value: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
									  }
									| { __typename: "ProductDiscountRelativeValue"; factor: number };
							} | null;
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						} | null;
						value: { centAmount: number; currencyCode: string; fractionDigits: number };
					};
					maxPrice: {
						validFrom: string | null;
						validUntil: string | null;
						discountedPrice: {
							discount: {
								validFrom: string | null;
								validUntil: string | null;
								value:
									| {
											__typename: "ProductDiscountAbsoluteValue";
											value: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
									  }
									| { __typename: "ProductDiscountRelativeValue"; factor: number };
							} | null;
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						} | null;
						value: { centAmount: number; currencyCode: string; fractionDigits: number };
					};
				} | null;
			};
		}> | null;
		pageInfo: { endCursor: string | null; hasNextPage: boolean };
	};
};

export type ProductDetailQueryVariables = Exact<{
	slug: string;
	currency?: string | null | undefined;
	store: string | number;
	priceChannel?: string | number | null | undefined;
	after?: string | null | undefined;
}>;

export type ProductDetailQuery = {
	product: {
		id: string;
		name: string;
		description: string | null;
		metafields: Array<
			| { __typename: "BooleanMetafield"; id: string; name: string }
			| { __typename: "DecimalMetafield"; id: string; name: string }
			| { __typename: "DropdownMetafield"; id: string; name: string }
			| { __typename: "IntegerMetafield"; id: string; name: string }
			| { __typename: "JsonMetafield"; id: string; name: string }
			| { __typename: "MediaMetafield"; id: string; name: string }
			| { __typename: "MoneyMetafield"; id: string; name: string }
			| { __typename: "ProductPickerMetafield"; id: string; name: string }
			| { __typename: "TagsMetafield"; id: string; name: string }
			| { __typename: "TextMetafield"; value: string; id: string; name: string }
			| { __typename: "VariantPickerMetafield"; id: string; name: string }
		>;
		attributeAssignments: Array<{
			attribute: { id: string; name: string };
			values: {
				edges: Array<{
					node:
						| {
								__typename: "SwatchAttributeValue";
								color: string | null;
								id: string;
								value: string;
								media: { src: string } | null;
						  }
						| { __typename: "TextAttributeValue"; id: string; value: string };
				}> | null;
			};
		}>;
		categories: {
			edges: Array<{
				node: {
					id: string;
					name: string;
					slug: string;
					ancestors: Array<{ id: string; name: string; slug: string }>;
				};
			}> | null;
		};
		variants: {
			pageInfo: { hasNextPage: boolean; endCursor: string | null };
			edges: Array<{
				node: {
					id: string;
					name: string;
					sku: string | null;
					selectedAttributes: Array<{
						attribute: { id: string; name: string };
						attributeValue:
							| {
									__typename: "SwatchAttributeValue";
									color: string | null;
									id: string;
									value: string;
									media: { src: string } | null;
							  }
							| { __typename: "TextAttributeValue"; id: string; value: string };
					}>;
					availability: {
						availableForPurchase: boolean;
						availableQuantity: number;
						stockPolicy: StockPolicy;
					} | null;
					media: { edges: Array<{ node: { id: string; src: string } }> | null };
					price: {
						validFrom: string | null;
						validUntil: string | null;
						discountedPrice: {
							discount: {
								validFrom: string | null;
								validUntil: string | null;
								value:
									| {
											__typename: "ProductDiscountAbsoluteValue";
											value: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
									  }
									| { __typename: "ProductDiscountRelativeValue"; factor: number };
							} | null;
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						} | null;
						value: { centAmount: number; currencyCode: string; fractionDigits: number };
					} | null;
				};
			}> | null;
		};
	} | null;
};

export class TypedDocumentString<TResult, TVariables>
	extends String
	implements DocumentTypeDecoration<TResult, TVariables>
{
	__apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>["__apiType"]>;
	private value: string;
	public __meta__?: Record<string, any> | undefined;

	constructor(value: string, __meta__?: Record<string, any> | undefined) {
		super(value);
		this.value = value;
		this.__meta__ = __meta__;
	}

	override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
		return this.value;
	}
}
export const MoneyFragmentDoc = new TypedDocumentString(
	`
    fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}
    `,
	{ fragmentName: "Money" },
) as unknown as TypedDocumentString<MoneyFragment, unknown>;
export const AvailabilityFragmentDoc = new TypedDocumentString(
	`
    fragment Availability on ProductVariantAvailability {
  availableForPurchase
  availableQuantity
  stockPolicy
}
    `,
	{ fragmentName: "Availability" },
) as unknown as TypedDocumentString<AvailabilityFragment, unknown>;
export const CartFragmentDoc = new TypedDocumentString(
	`
    fragment Cart on Cart {
  id
  currency
  store {
    id
  }
  priceChannel {
    id
  }
  customerId
  state
  shippingAddress {
    countryCode
  }
  shippingLines {
    id
    total {
      ...Money
    }
  }
  checkoutUrl
  lineItemsQuantity
  lineItems(first: 100) {
    edges {
      node {
        id
        taxBehavior
        variantName
        variantId
        productName
        quantity
        productSlug
        variant {
          id
          image {
            src
          }
          selectedAttributes {
            value
          }
          availability {
            ...Availability
          }
        }
        unitPrice {
          value {
            ...Money
          }
          discountedPrice {
            value {
              ...Money
            }
          }
        }
        discountApplications {
          edges {
            node {
              label
              discountedAmount {
                ...Money
              }
            }
          }
        }
        total {
          ...Money
        }
      }
    }
  }
  discountCodes {
    code
    error
  }
  subtotal {
    ...Money
  }
  taxedPrice {
    tax {
      ...Money
    }
  }
  total {
    ...Money
  }
}
    fragment Availability on ProductVariantAvailability {
  availableForPurchase
  availableQuantity
  stockPolicy
}
fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}`,
	{ fragmentName: "Cart" },
) as unknown as TypedDocumentString<CartFragment, unknown>;
export const CategoryBreadcrumbFragmentDoc = new TypedDocumentString(
	`
    fragment CategoryBreadcrumb on Category {
  id
  name
  slug
  ancestors {
    id
    name
    slug
  }
}
    `,
	{ fragmentName: "CategoryBreadcrumb" },
) as unknown as TypedDocumentString<CategoryBreadcrumbFragment, unknown>;
export const FacetFragmentDoc = new TypedDocumentString(
	`
    fragment Facet on Facet {
  field
  name
  queryField
  values {
    name
    count
  }
}
    `,
	{ fragmentName: "Facet" },
) as unknown as TypedDocumentString<FacetFragment, unknown>;
export const PriceFragmentDoc = new TypedDocumentString(
	`
    fragment Price on Price {
  validFrom
  validUntil
  discountedPrice {
    discount {
      validFrom
      validUntil
      value {
        __typename
        ... on ProductDiscountAbsoluteValue {
          value {
            ...Money
          }
        }
        ... on ProductDiscountRelativeValue {
          factor
        }
      }
    }
    value {
      ...Money
    }
  }
  value {
    ...Money
  }
}
    fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}`,
	{ fragmentName: "Price" },
) as unknown as TypedDocumentString<PriceFragment, unknown>;
export const ProductListTileFragmentDoc = new TypedDocumentString(
	`
    fragment ProductListTile on Product {
  id
  name
  slug
  heroVariant {
    id
    image {
      src
    }
  }
  colorVariants: variants(first: 100) {
    edges {
      node {
        id
        image {
          src
        }
        price {
          ...Price
        }
        selectedAttributes {
          attribute {
            name
          }
          attributeValue {
            id
            value
          }
        }
      }
    }
  }
  priceRange {
    minPrice {
      ...Price
    }
    maxPrice {
      ...Price
    }
  }
}
    fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}
fragment Price on Price {
  validFrom
  validUntil
  discountedPrice {
    discount {
      validFrom
      validUntil
      value {
        __typename
        ... on ProductDiscountAbsoluteValue {
          value {
            ...Money
          }
        }
        ... on ProductDiscountRelativeValue {
          factor
        }
      }
    }
    value {
      ...Money
    }
  }
  value {
    ...Money
  }
}`,
	{ fragmentName: "ProductListTile" },
) as unknown as TypedDocumentString<ProductListTileFragment, unknown>;
export const CartCreateDocument = new TypedDocumentString(`
    mutation CartCreate($input: CartCreateInput!) {
  cartCreate(input: $input) {
    cart {
      ...Cart
    }
  }
}
    fragment Availability on ProductVariantAvailability {
  availableForPurchase
  availableQuantity
  stockPolicy
}
fragment Cart on Cart {
  id
  currency
  store {
    id
  }
  priceChannel {
    id
  }
  customerId
  state
  shippingAddress {
    countryCode
  }
  shippingLines {
    id
    total {
      ...Money
    }
  }
  checkoutUrl
  lineItemsQuantity
  lineItems(first: 100) {
    edges {
      node {
        id
        taxBehavior
        variantName
        variantId
        productName
        quantity
        productSlug
        variant {
          id
          image {
            src
          }
          selectedAttributes {
            value
          }
          availability {
            ...Availability
          }
        }
        unitPrice {
          value {
            ...Money
          }
          discountedPrice {
            value {
              ...Money
            }
          }
        }
        discountApplications {
          edges {
            node {
              label
              discountedAmount {
                ...Money
              }
            }
          }
        }
        total {
          ...Money
        }
      }
    }
  }
  discountCodes {
    code
    error
  }
  subtotal {
    ...Money
  }
  taxedPrice {
    tax {
      ...Money
    }
  }
  total {
    ...Money
  }
}
fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}`) as unknown as TypedDocumentString<CartCreateMutation, CartCreateMutationVariables>;
export const CartUpdateDocument = new TypedDocumentString(`
    mutation CartUpdate($input: CartUpdateInput!) {
  cartUpdate(input: $input) {
    cart {
      ...Cart
    }
    errors {
      code: __typename
      ... on UserError {
        message
      }
    }
  }
}
    fragment Availability on ProductVariantAvailability {
  availableForPurchase
  availableQuantity
  stockPolicy
}
fragment Cart on Cart {
  id
  currency
  store {
    id
  }
  priceChannel {
    id
  }
  customerId
  state
  shippingAddress {
    countryCode
  }
  shippingLines {
    id
    total {
      ...Money
    }
  }
  checkoutUrl
  lineItemsQuantity
  lineItems(first: 100) {
    edges {
      node {
        id
        taxBehavior
        variantName
        variantId
        productName
        quantity
        productSlug
        variant {
          id
          image {
            src
          }
          selectedAttributes {
            value
          }
          availability {
            ...Availability
          }
        }
        unitPrice {
          value {
            ...Money
          }
          discountedPrice {
            value {
              ...Money
            }
          }
        }
        discountApplications {
          edges {
            node {
              label
              discountedAmount {
                ...Money
              }
            }
          }
        }
        total {
          ...Money
        }
      }
    }
  }
  discountCodes {
    code
    error
  }
  subtotal {
    ...Money
  }
  taxedPrice {
    tax {
      ...Money
    }
  }
  total {
    ...Money
  }
}
fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}`) as unknown as TypedDocumentString<CartUpdateMutation, CartUpdateMutationVariables>;
export const CartReplicateDocument = new TypedDocumentString(`
    mutation CartReplicate($input: CartReplicateInput!) {
  cartReplicate(input: $input) {
    cart {
      ...Cart
    }
  }
}
    fragment Availability on ProductVariantAvailability {
  availableForPurchase
  availableQuantity
  stockPolicy
}
fragment Cart on Cart {
  id
  currency
  store {
    id
  }
  priceChannel {
    id
  }
  customerId
  state
  shippingAddress {
    countryCode
  }
  shippingLines {
    id
    total {
      ...Money
    }
  }
  checkoutUrl
  lineItemsQuantity
  lineItems(first: 100) {
    edges {
      node {
        id
        taxBehavior
        variantName
        variantId
        productName
        quantity
        productSlug
        variant {
          id
          image {
            src
          }
          selectedAttributes {
            value
          }
          availability {
            ...Availability
          }
        }
        unitPrice {
          value {
            ...Money
          }
          discountedPrice {
            value {
              ...Money
            }
          }
        }
        discountApplications {
          edges {
            node {
              label
              discountedAmount {
                ...Money
              }
            }
          }
        }
        total {
          ...Money
        }
      }
    }
  }
  discountCodes {
    code
    error
  }
  subtotal {
    ...Money
  }
  taxedPrice {
    tax {
      ...Money
    }
  }
  total {
    ...Money
  }
}
fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}`) as unknown as TypedDocumentString<CartReplicateMutation, CartReplicateMutationVariables>;
export const CartDiscountCodeAddDocument = new TypedDocumentString(`
    mutation CartDiscountCodeAdd($input: CartDiscountCodeAddInput!) {
  cartDiscountCodeAdd(input: $input) {
    cart {
      ...Cart
    }
    errors {
      code: __typename
    }
  }
}
    fragment Availability on ProductVariantAvailability {
  availableForPurchase
  availableQuantity
  stockPolicy
}
fragment Cart on Cart {
  id
  currency
  store {
    id
  }
  priceChannel {
    id
  }
  customerId
  state
  shippingAddress {
    countryCode
  }
  shippingLines {
    id
    total {
      ...Money
    }
  }
  checkoutUrl
  lineItemsQuantity
  lineItems(first: 100) {
    edges {
      node {
        id
        taxBehavior
        variantName
        variantId
        productName
        quantity
        productSlug
        variant {
          id
          image {
            src
          }
          selectedAttributes {
            value
          }
          availability {
            ...Availability
          }
        }
        unitPrice {
          value {
            ...Money
          }
          discountedPrice {
            value {
              ...Money
            }
          }
        }
        discountApplications {
          edges {
            node {
              label
              discountedAmount {
                ...Money
              }
            }
          }
        }
        total {
          ...Money
        }
      }
    }
  }
  discountCodes {
    code
    error
  }
  subtotal {
    ...Money
  }
  taxedPrice {
    tax {
      ...Money
    }
  }
  total {
    ...Money
  }
}
fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}`) as unknown as TypedDocumentString<CartDiscountCodeAddMutation, CartDiscountCodeAddMutationVariables>;
export const CartDiscountCodeRemoveDocument = new TypedDocumentString(`
    mutation CartDiscountCodeRemove($input: CartDiscountCodeRemoveInput!) {
  cartDiscountCodeRemove(input: $input) {
    cart {
      ...Cart
    }
  }
}
    fragment Availability on ProductVariantAvailability {
  availableForPurchase
  availableQuantity
  stockPolicy
}
fragment Cart on Cart {
  id
  currency
  store {
    id
  }
  priceChannel {
    id
  }
  customerId
  state
  shippingAddress {
    countryCode
  }
  shippingLines {
    id
    total {
      ...Money
    }
  }
  checkoutUrl
  lineItemsQuantity
  lineItems(first: 100) {
    edges {
      node {
        id
        taxBehavior
        variantName
        variantId
        productName
        quantity
        productSlug
        variant {
          id
          image {
            src
          }
          selectedAttributes {
            value
          }
          availability {
            ...Availability
          }
        }
        unitPrice {
          value {
            ...Money
          }
          discountedPrice {
            value {
              ...Money
            }
          }
        }
        discountApplications {
          edges {
            node {
              label
              discountedAmount {
                ...Money
              }
            }
          }
        }
        total {
          ...Money
        }
      }
    }
  }
  discountCodes {
    code
    error
  }
  subtotal {
    ...Money
  }
  taxedPrice {
    tax {
      ...Money
    }
  }
  total {
    ...Money
  }
}
fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}`) as unknown as TypedDocumentString<
	CartDiscountCodeRemoveMutation,
	CartDiscountCodeRemoveMutationVariables
>;
export const CartLineItemsAddDocument = new TypedDocumentString(`
    mutation CartLineItemsAdd($input: CartLineItemsAddInput!) {
  cartLineItemsAdd(input: $input) {
    cart {
      ...Cart
    }
    errors {
      __typename
      ... on UserError {
        message
      }
    }
  }
}
    fragment Availability on ProductVariantAvailability {
  availableForPurchase
  availableQuantity
  stockPolicy
}
fragment Cart on Cart {
  id
  currency
  store {
    id
  }
  priceChannel {
    id
  }
  customerId
  state
  shippingAddress {
    countryCode
  }
  shippingLines {
    id
    total {
      ...Money
    }
  }
  checkoutUrl
  lineItemsQuantity
  lineItems(first: 100) {
    edges {
      node {
        id
        taxBehavior
        variantName
        variantId
        productName
        quantity
        productSlug
        variant {
          id
          image {
            src
          }
          selectedAttributes {
            value
          }
          availability {
            ...Availability
          }
        }
        unitPrice {
          value {
            ...Money
          }
          discountedPrice {
            value {
              ...Money
            }
          }
        }
        discountApplications {
          edges {
            node {
              label
              discountedAmount {
                ...Money
              }
            }
          }
        }
        total {
          ...Money
        }
      }
    }
  }
  discountCodes {
    code
    error
  }
  subtotal {
    ...Money
  }
  taxedPrice {
    tax {
      ...Money
    }
  }
  total {
    ...Money
  }
}
fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}`) as unknown as TypedDocumentString<CartLineItemsAddMutation, CartLineItemsAddMutationVariables>;
export const CartLineItemsUpdateDocument = new TypedDocumentString(`
    mutation CartLineItemsUpdate($input: CartLineItemsUpdateInput!) {
  cartLineItemsUpdate(input: $input) {
    cart {
      ...Cart
    }
    errors {
      __typename
      ... on UserError {
        message
      }
    }
  }
}
    fragment Availability on ProductVariantAvailability {
  availableForPurchase
  availableQuantity
  stockPolicy
}
fragment Cart on Cart {
  id
  currency
  store {
    id
  }
  priceChannel {
    id
  }
  customerId
  state
  shippingAddress {
    countryCode
  }
  shippingLines {
    id
    total {
      ...Money
    }
  }
  checkoutUrl
  lineItemsQuantity
  lineItems(first: 100) {
    edges {
      node {
        id
        taxBehavior
        variantName
        variantId
        productName
        quantity
        productSlug
        variant {
          id
          image {
            src
          }
          selectedAttributes {
            value
          }
          availability {
            ...Availability
          }
        }
        unitPrice {
          value {
            ...Money
          }
          discountedPrice {
            value {
              ...Money
            }
          }
        }
        discountApplications {
          edges {
            node {
              label
              discountedAmount {
                ...Money
              }
            }
          }
        }
        total {
          ...Money
        }
      }
    }
  }
  discountCodes {
    code
    error
  }
  subtotal {
    ...Money
  }
  taxedPrice {
    tax {
      ...Money
    }
  }
  total {
    ...Money
  }
}
fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}`) as unknown as TypedDocumentString<CartLineItemsUpdateMutation, CartLineItemsUpdateMutationVariables>;
export const CartLineItemsRemoveDocument = new TypedDocumentString(`
    mutation CartLineItemsRemove($input: CartLineItemsRemoveInput!) {
  cartLineItemsRemove(input: $input) {
    cart {
      ...Cart
    }
    errors {
      __typename
      ... on UserError {
        message
      }
    }
  }
}
    fragment Availability on ProductVariantAvailability {
  availableForPurchase
  availableQuantity
  stockPolicy
}
fragment Cart on Cart {
  id
  currency
  store {
    id
  }
  priceChannel {
    id
  }
  customerId
  state
  shippingAddress {
    countryCode
  }
  shippingLines {
    id
    total {
      ...Money
    }
  }
  checkoutUrl
  lineItemsQuantity
  lineItems(first: 100) {
    edges {
      node {
        id
        taxBehavior
        variantName
        variantId
        productName
        quantity
        productSlug
        variant {
          id
          image {
            src
          }
          selectedAttributes {
            value
          }
          availability {
            ...Availability
          }
        }
        unitPrice {
          value {
            ...Money
          }
          discountedPrice {
            value {
              ...Money
            }
          }
        }
        discountApplications {
          edges {
            node {
              label
              discountedAmount {
                ...Money
              }
            }
          }
        }
        total {
          ...Money
        }
      }
    }
  }
  discountCodes {
    code
    error
  }
  subtotal {
    ...Money
  }
  taxedPrice {
    tax {
      ...Money
    }
  }
  total {
    ...Money
  }
}
fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}`) as unknown as TypedDocumentString<CartLineItemsRemoveMutation, CartLineItemsRemoveMutationVariables>;
export const CartShippingLinesSetDocument = new TypedDocumentString(`
    mutation CartShippingLinesSet($input: CartShippingLinesSetInput!) {
  cartShippingLinesSet(input: $input) {
    cart {
      id
      shippingLines {
        id
        shippingMethod {
          id
          name
        }
      }
    }
    errors {
      code: __typename
      ... on UserError {
        message
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartShippingLinesSetMutation, CartShippingLinesSetMutationVariables>;
export const CartPaymentSessionInitializeDocument = new TypedDocumentString(`
    mutation CartPaymentSessionInitialize($input: CartPaymentSessionInitializeInput!) {
  cartPaymentSessionInitialize(input: $input) {
    cart {
      id
      paymentSession {
        id
        __typename
        paymentGateway {
          id
          name
          type: __typename
          ... on StripePaymentGateway {
            publishableKey
          }
          ... on StripeConnectPaymentGateway {
            connectedAccountId
            publishableKey
          }
        }
        ... on StripePaymentSession {
          clientSecret
        }
      }
    }
    errors {
      code: __typename
      ... on UserError {
        message
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	CartPaymentSessionInitializeMutation,
	CartPaymentSessionInitializeMutationVariables
>;
export const CartCompleteDocument = new TypedDocumentString(`
    mutation CartComplete($input: CartCompleteInput!) {
  cartComplete(input: $input) {
    order {
      id
    }
    errors {
      code: __typename
      ... on UserError {
        message
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartCompleteMutation, CartCompleteMutationVariables>;
export const CustomerActivateDocument = new TypedDocumentString(`
    mutation CustomerActivate($input: CustomerActivateInput!) {
  customerActivate(input: $input) {
    customer {
      id
    }
    errors {
      code: __typename
    }
  }
}
    `) as unknown as TypedDocumentString<CustomerActivateMutation, CustomerActivateMutationVariables>;
export const CustomerRegisterDocument = new TypedDocumentString(`
    mutation CustomerRegister($input: CustomerRegisterInput!) {
  customerRegister(input: $input) {
    errors {
      code: __typename
    }
  }
}
    `) as unknown as TypedDocumentString<CustomerRegisterMutation, CustomerRegisterMutationVariables>;
export const CustomerResetPasswordTokenDocument = new TypedDocumentString(`
    mutation CustomerResetPasswordToken($input: CustomerPasswordResetTokenInput!) {
  customerPasswordResetToken(input: $input) {
    errors {
      code: __typename
    }
  }
}
    `) as unknown as TypedDocumentString<
	CustomerResetPasswordTokenMutation,
	CustomerResetPasswordTokenMutationVariables
>;
export const CustomerResetPasswordDocument = new TypedDocumentString(`
    mutation CustomerResetPassword($input: CustomerPasswordResetInput!) {
  customerPasswordReset(input: $input) {
    errors {
      code: __typename
    }
  }
}
    `) as unknown as TypedDocumentString<
	CustomerResetPasswordMutation,
	CustomerResetPasswordMutationVariables
>;
export const AccountDashboardDocument = new TypedDocumentString(`
    query AccountDashboard($after: String) {
  customer {
    id
    firstName
    lastName
    email
    ordersCount
    defaultShippingAddress {
      firstName
      lastName
      company
      address1
      address2
      postalCode
      city
      state
      countryCode
      phone
    }
    defaultBillingAddress {
      firstName
      lastName
      company
      address1
      address2
      postalCode
      city
      state
      countryCode
      phone
    }
    orders(first: 6, after: $after, sortKey: CREATED_AT, sortDirection: DESC) {
      nodes {
        id
        orderNumber
        createdAt
        orderState
        paymentState
        shipmentState
        lineItems(first: 4) {
          nodes {
            id
            productName
            variantName
            quantity
            variant {
              image {
                src
              }
            }
          }
          pageInfo {
            hasNextPage
          }
        }
        lineItemsQuantity
        total {
          ...Money
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
    fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}`) as unknown as TypedDocumentString<AccountDashboardQuery, AccountDashboardQueryVariables>;
export const CartDocument = new TypedDocumentString(`
    query Cart($id: ID!) {
  cart(id: $id) {
    ...Cart
  }
}
    fragment Availability on ProductVariantAvailability {
  availableForPurchase
  availableQuantity
  stockPolicy
}
fragment Cart on Cart {
  id
  currency
  store {
    id
  }
  priceChannel {
    id
  }
  customerId
  state
  shippingAddress {
    countryCode
  }
  shippingLines {
    id
    total {
      ...Money
    }
  }
  checkoutUrl
  lineItemsQuantity
  lineItems(first: 100) {
    edges {
      node {
        id
        taxBehavior
        variantName
        variantId
        productName
        quantity
        productSlug
        variant {
          id
          image {
            src
          }
          selectedAttributes {
            value
          }
          availability {
            ...Availability
          }
        }
        unitPrice {
          value {
            ...Money
          }
          discountedPrice {
            value {
              ...Money
            }
          }
        }
        discountApplications {
          edges {
            node {
              label
              discountedAmount {
                ...Money
              }
            }
          }
        }
        total {
          ...Money
        }
      }
    }
  }
  discountCodes {
    code
    error
  }
  subtotal {
    ...Money
  }
  taxedPrice {
    tax {
      ...Money
    }
  }
  total {
    ...Money
  }
}
fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}`) as unknown as TypedDocumentString<CartQuery, CartQueryVariables>;
export const CartAddressStateDocument = new TypedDocumentString(`
    query CartAddressState($id: ID!) {
  cart(id: $id) {
    shippingAddress {
      address1
    }
  }
}
    `) as unknown as TypedDocumentString<CartAddressStateQuery, CartAddressStateQueryVariables>;
export const CategoryListDocument = new TypedDocumentString(`
    query CategoryList($slug: String!, $currency: String!, $priceChannel: ID, $storeId: ID!, $after: String, $sortDirection: SortDirection!, $sortKey: ProductCategorySortKeys!, $query: String) {
  category(slug: $slug) {
    id
    name
    slug
    ancestors {
      slug
      name
    }
    products(
      first: 24
      after: $after
      sortDirection: $sortDirection
      sortKey: $sortKey
      priceCurrency: $currency
      priceChannelId: $priceChannel
      storeId: $storeId
      query: $query
    ) {
      facets {
        ...Facet
      }
      edges {
        node {
          id
          variants {
            totalCount
          }
          ...ProductListTile
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
    fragment Facet on Facet {
  field
  name
  queryField
  values {
    name
    count
  }
}
fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}
fragment Price on Price {
  validFrom
  validUntil
  discountedPrice {
    discount {
      validFrom
      validUntil
      value {
        __typename
        ... on ProductDiscountAbsoluteValue {
          value {
            ...Money
          }
        }
        ... on ProductDiscountRelativeValue {
          factor
        }
      }
    }
    value {
      ...Money
    }
  }
  value {
    ...Money
  }
}
fragment ProductListTile on Product {
  id
  name
  slug
  heroVariant {
    id
    image {
      src
    }
  }
  colorVariants: variants(first: 100) {
    edges {
      node {
        id
        image {
          src
        }
        price {
          ...Price
        }
        selectedAttributes {
          attribute {
            name
          }
          attributeValue {
            id
            value
          }
        }
      }
    }
  }
  priceRange {
    minPrice {
      ...Price
    }
    maxPrice {
      ...Price
    }
  }
}`) as unknown as TypedDocumentString<CategoryListQuery, CategoryListQueryVariables>;
export const CheckoutCartDocument = new TypedDocumentString(`
    query CheckoutCart($id: ID!) {
  cart(id: $id) {
    id
    customerId
    metadata {
      key
      value
    }
    customerEmail
    shippingAddress {
      firstName
      lastName
      company
      address1
      address2
      city
      postalCode
      state
      countryCode
      phone
      formatted
    }
    billingAddress {
      firstName
      lastName
      company
      address1
      address2
      city
      postalCode
      state
      countryCode
      phone
      formatted
    }
    availableShippingMethods {
      id
      name
      description
      rate {
        id
        __typename
        ... on AbsoluteShippingMethodRate {
          price {
            ...Money
          }
        }
        ... on RelativeShippingMethodRate {
          rate
        }
      }
    }
    shippingLines {
      id
      shippingMethod {
        id
        name
      }
      taxBehavior
      taxedPrice {
        gross {
          ...Money
        }
        net {
          ...Money
        }
        tax {
          ...Money
        }
      }
      total {
        ...Money
      }
    }
    paymentSession {
      id
      __typename
      paymentGateway {
        id
        name
        type: __typename
        ... on StripePaymentGateway {
          publishableKey
        }
        ... on StripeConnectPaymentGateway {
          connectedAccountId
          publishableKey
        }
      }
      ... on StripePaymentSession {
        clientSecret
      }
    }
    lineItemsQuantity
    lineItems(first: 100) {
      edges {
        node {
          id
          taxBehavior
          variantName
          variantId
          productName
          quantity
          productSlug
          variant {
            id
            image {
              src
            }
            selectedAttributes {
              value
            }
            availability {
              availableForPurchase
              availableQuantity
              stockPolicy
            }
          }
          unitPrice {
            value {
              ...Money
            }
            discountedPrice {
              value {
                ...Money
              }
            }
          }
          discountApplications {
            edges {
              node {
                label
                discountedAmount {
                  ...Money
                }
              }
            }
          }
          taxedPrice {
            gross {
              ...Money
            }
            net {
              ...Money
            }
            tax {
              ...Money
            }
          }
          total {
            ...Money
          }
        }
      }
    }
    discountCodes {
      code
      error
    }
    subtotal {
      ...Money
    }
    taxedPrice {
      tax {
        ...Money
      }
      net {
        ...Money
      }
      gross {
        ...Money
      }
    }
    total {
      ...Money
    }
  }
}
    fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}`) as unknown as TypedDocumentString<CheckoutCartQuery, CheckoutCartQueryVariables>;
export const PaymentGatewaysDocument = new TypedDocumentString(`
    query PaymentGateways($cartId: ID!) {
  paymentGateways(cartId: $cartId) {
    edges {
      node {
        id
        name
        type: __typename
      }
    }
  }
}
    `) as unknown as TypedDocumentString<PaymentGatewaysQuery, PaymentGatewaysQueryVariables>;
export const CollectionListDocument = new TypedDocumentString(`
    query CollectionList($slug: String!, $currency: String!, $priceChannel: ID, $storeId: ID!, $after: String, $sortDirection: SortDirection!, $sortKey: ProductCollectionSortKeys!, $query: String) {
  collection(slug: $slug) {
    id
    name
    products(
      first: 24
      after: $after
      sortDirection: $sortDirection
      sortKey: $sortKey
      priceCurrency: $currency
      priceChannelId: $priceChannel
      storeId: $storeId
      query: $query
    ) {
      facets {
        ...Facet
      }
      edges {
        node {
          id
          ...ProductListTile
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
    fragment Facet on Facet {
  field
  name
  queryField
  values {
    name
    count
  }
}
fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}
fragment Price on Price {
  validFrom
  validUntil
  discountedPrice {
    discount {
      validFrom
      validUntil
      value {
        __typename
        ... on ProductDiscountAbsoluteValue {
          value {
            ...Money
          }
        }
        ... on ProductDiscountRelativeValue {
          factor
        }
      }
    }
    value {
      ...Money
    }
  }
  value {
    ...Money
  }
}
fragment ProductListTile on Product {
  id
  name
  slug
  heroVariant {
    id
    image {
      src
    }
  }
  colorVariants: variants(first: 100) {
    edges {
      node {
        id
        image {
          src
        }
        price {
          ...Price
        }
        selectedAttributes {
          attribute {
            name
          }
          attributeValue {
            id
            value
          }
        }
      }
    }
  }
  priceRange {
    minPrice {
      ...Price
    }
    maxPrice {
      ...Price
    }
  }
}`) as unknown as TypedDocumentString<CollectionListQuery, CollectionListQueryVariables>;
export const CurrentCustomerDocument = new TypedDocumentString(`
    query CurrentCustomer {
  customer {
    id
    email
    firstName
    lastName
    defaultShippingAddress {
      id
      firstName
      lastName
      company
      address1
      address2
      city
      postalCode
      state
      countryCode
      phone
    }
    defaultBillingAddress {
      id
      firstName
      lastName
      company
      address1
      address2
      city
      postalCode
      state
      countryCode
      phone
    }
    addresses(first: 20) {
      edges {
        node {
          id
          firstName
          lastName
          company
          address1
          address2
          city
          postalCode
          state
          countryCode
          phone
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CurrentCustomerQuery, CurrentCustomerQueryVariables>;
export const HomePageDocument = new TypedDocumentString(`
    query HomePage($storeId: ID!, $currency: String!, $priceChannel: ID) {
  categories(first: 6) {
    edges {
      node {
        id
        name
        slug
        products(
          storeId: $storeId
          priceCurrency: $currency
          priceChannelId: $priceChannel
        ) {
          totalCount
        }
      }
    }
  }
  collections(first: 4) {
    edges {
      node {
        id
        name
        slug
        products(
          first: 0
          storeId: $storeId
          priceCurrency: $currency
          priceChannelId: $priceChannel
        ) {
          totalCount
        }
      }
    }
  }
  products(
    first: 8
    sortKey: ID
    sortDirection: DESC
    storeId: $storeId
    priceCurrency: $currency
    priceChannelId: $priceChannel
  ) {
    edges {
      node {
        id
        name
        slug
        heroVariant {
          image {
            src
          }
        }
        priceRange {
          minPrice {
            value {
              centAmount
              currencyCode
              fractionDigits
            }
            discountedPrice {
              value {
                centAmount
                currencyCode
                fractionDigits
              }
            }
          }
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<HomePageQuery, HomePageQueryVariables>;
export const NavigationDocument = new TypedDocumentString(`
    query Navigation {
  categories(first: 100) {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
  collections(first: 48) {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
}
    `) as unknown as TypedDocumentString<NavigationQuery, NavigationQueryVariables>;
export const OrderDocument = new TypedDocumentString(`
    query Order($id: ID!) {
  order(id: $id) {
    id
    orderNumber
    lineItems(first: 100) {
      edges {
        node {
          id
          taxBehavior
          variantName
          variantId
          productName
          quantity
          productSlug
          variant {
            id
            image {
              src
            }
            selectedAttributes {
              value
            }
          }
          unitPrice {
            value {
              ...Money
            }
            discountedPrice {
              value {
                ...Money
              }
            }
          }
          discountApplications {
            edges {
              node {
                label
                discountedAmount {
                  ...Money
                }
              }
            }
          }
          taxedPrice {
            gross {
              ...Money
            }
            net {
              ...Money
            }
            tax {
              ...Money
            }
          }
          total {
            ...Money
          }
        }
      }
    }
    shippingLines {
      id
      shippingMethod {
        id
        name
      }
      taxBehavior
      taxedPrice {
        gross {
          ...Money
        }
        net {
          ...Money
        }
        tax {
          ...Money
        }
      }
      total {
        ...Money
      }
    }
    subtotal {
      ...Money
    }
    taxedPrice {
      tax {
        ...Money
      }
      net {
        ...Money
      }
      gross {
        ...Money
      }
    }
    total {
      ...Money
    }
  }
}
    fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}`) as unknown as TypedDocumentString<OrderQuery, OrderQueryVariables>;
export const ProductListDocument = new TypedDocumentString(`
    query ProductList($storeId: ID!, $currency: String!, $sortDirection: SortDirection!, $sortKey: ProductSortKeys!, $priceChannel: ID, $query: String, $after: String) {
  products(
    first: 24
    after: $after
    sortDirection: $sortDirection
    sortKey: $sortKey
    storeId: $storeId
    priceCurrency: $currency
    priceChannelId: $priceChannel
    query: $query
  ) {
    facets {
      ...Facet
    }
    edges {
      node {
        id
        variants {
          totalCount
        }
        ...ProductListTile
      }
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    fragment Facet on Facet {
  field
  name
  queryField
  values {
    name
    count
  }
}
fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}
fragment Price on Price {
  validFrom
  validUntil
  discountedPrice {
    discount {
      validFrom
      validUntil
      value {
        __typename
        ... on ProductDiscountAbsoluteValue {
          value {
            ...Money
          }
        }
        ... on ProductDiscountRelativeValue {
          factor
        }
      }
    }
    value {
      ...Money
    }
  }
  value {
    ...Money
  }
}
fragment ProductListTile on Product {
  id
  name
  slug
  heroVariant {
    id
    image {
      src
    }
  }
  colorVariants: variants(first: 100) {
    edges {
      node {
        id
        image {
          src
        }
        price {
          ...Price
        }
        selectedAttributes {
          attribute {
            name
          }
          attributeValue {
            id
            value
          }
        }
      }
    }
  }
  priceRange {
    minPrice {
      ...Price
    }
    maxPrice {
      ...Price
    }
  }
}`) as unknown as TypedDocumentString<ProductListQuery, ProductListQueryVariables>;
export const ProductDetailDocument = new TypedDocumentString(`
    query ProductDetail($slug: String!, $currency: String, $store: ID!, $priceChannel: ID, $after: String) {
  product(
    slug: $slug
    priceCurrency: $currency
    storeId: $store
    priceChannelId: $priceChannel
  ) {
    id
    name
    description
    metafields(namespace: "apparel", keys: ["material", "care"]) {
      __typename
      id
      name
      ... on TextMetafield {
        value
      }
    }
    attributeAssignments {
      attribute {
        id
        name
      }
      values(first: 100) {
        edges {
          node {
            __typename
            id
            value
            ... on SwatchAttributeValue {
              color
              media {
                src
              }
            }
          }
        }
      }
    }
    categories(first: 1, sortDirection: DESC, sortKey: LEVEL) {
      edges {
        node {
          ...CategoryBreadcrumb
        }
      }
    }
    variants(first: 100, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          sku
          selectedAttributes {
            attribute {
              id
              name
            }
            attributeValue {
              __typename
              id
              value
              ... on SwatchAttributeValue {
                color
                media {
                  src
                }
              }
            }
          }
          availability {
            ...Availability
          }
          media(first: 5) {
            edges {
              node {
                id
                src
              }
            }
          }
          price {
            ...Price
          }
        }
      }
    }
  }
}
    fragment Availability on ProductVariantAvailability {
  availableForPurchase
  availableQuantity
  stockPolicy
}
fragment CategoryBreadcrumb on Category {
  id
  name
  slug
  ancestors {
    id
    name
    slug
  }
}
fragment Money on Money {
  centAmount
  currencyCode
  fractionDigits
}
fragment Price on Price {
  validFrom
  validUntil
  discountedPrice {
    discount {
      validFrom
      validUntil
      value {
        __typename
        ... on ProductDiscountAbsoluteValue {
          value {
            ...Money
          }
        }
        ... on ProductDiscountRelativeValue {
          factor
        }
      }
    }
    value {
      ...Money
    }
  }
  value {
    ...Money
  }
}`) as unknown as TypedDocumentString<ProductDetailQuery, ProductDetailQueryVariables>;
