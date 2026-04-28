import type { DocumentTypeDecoration } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> =
	| T
	| { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	/** The `DateTime` scalar type represents a date and time with time zone offset information. */
	DateTime: { input: any; output: any };
	/** The `Decimal` scalar type represents a decimal floating-point number with high precision. */
	Decimal: { input: any; output: any };
	/** The `Long` scalar type represents a signed 64-bit integer. */
	Long: { input: number; output: number };
};

export type AbsoluteShippingMethodRate = CartAvailableShippingMethodRate & {
	/** The unique identifier for the shipping method rate. */
	id: Scalars["ID"]["output"];
	price: Money;
};

export type AddressAlreadyExistsError = UserError & {
	message: Scalars["String"]["output"];
};

export type AddressNotFoundError = UserError & {
	message: Scalars["String"]["output"];
};

export type Attribute = Node & {
	/** The unique identifier of the attribute. */
	id: Scalars["ID"]["output"];
	metadata: Array<MetadataItem>;
	/** The name of the attribute. */
	name: Scalars["String"]["output"];
	/** The type of the attribute. */
	type: ProductAttributeType;
};

export type AttributeMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/**
 * Represents an attribute assignment for a product, encapsulating the details of the attribute assigned to the product.
 *
 * Each attribute assignment includes the unique identifier of the attribute, its name, and the values assigned to the product. This allows for flexible and dynamic product attributes that can be used across different products and variants.
 */
export type AttributeAssignment = {
	attribute: Attribute;
	/** Gets the unique identifier of the attribute. */
	id: Scalars["ID"]["output"];
	/** Gets the name of the attribute. */
	name: Scalars["String"]["output"];
	values: AttributeValueConnection;
};

/**
 * Represents an attribute assignment for a product, encapsulating the details of the attribute assigned to the product.
 *
 * Each attribute assignment includes the unique identifier of the attribute, its name, and the values assigned to the product. This allows for flexible and dynamic product attributes that can be used across different products and variants.
 */
export type AttributeAssignmentValuesArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type AttributeValue = {
	/** The unique identifier of the attribute value. */
	id: Scalars["ID"]["output"];
	metadata: Array<MetadataItem>;
	/** The value of the attribute. */
	value: Scalars["String"]["output"];
};

export type AttributeValueMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/** A connection to a list of items. */
export type AttributeValueConnection = {
	/** A list of edges. */
	edges?: Maybe<Array<AttributeValueEdge>>;
	/** A flattened list of the nodes */
	nodes?: Maybe<Array<AttributeValue>>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
	/** Identifies the total count of items in the connection. */
	totalCount: Scalars["Int"]["output"];
};

export type AttributeValueEdge = {
	/** A cursor for use in pagination. */
	cursor: Scalars["String"]["output"];
	/** The item at the end of the edge. */
	node: AttributeValue;
};

export type BaseAddress = {
	/** The first line of the address. Typically the street address or PO Box number. */
	address1?: Maybe<Scalars["String"]["output"]>;
	/** The second line of the address. Typically the number of the apartment, suite, or unit. */
	address2?: Maybe<Scalars["String"]["output"]>;
	/** Name of the city. */
	city?: Maybe<Scalars["String"]["output"]>;
	/** Name of the company. */
	company?: Maybe<Scalars["String"]["output"]>;
	/** Two-digit country code as per  ISO 3166-1 alpha-2 */
	countryCode?: Maybe<Scalars["String"]["output"]>;
	/** Email address of the contact. */
	email?: Maybe<Scalars["String"]["output"]>;
	/** Given name (first name) of the contact. */
	firstName?: Maybe<Scalars["String"]["output"]>;
	/** Formatted address. */
	formatted?: Maybe<Scalars["String"]["output"]>;
	/** The unique identifier of the address. */
	id: Scalars["ID"]["output"];
	/** Family name (last name) of the contact. */
	lastName?: Maybe<Scalars["String"]["output"]>;
	metadata: Array<MetadataItem>;
	/** Phone number of the contact. */
	phone?: Maybe<Scalars["String"]["output"]>;
	/** Postal code. */
	postalCode?: Maybe<Scalars["String"]["output"]>;
	/** Name of the state, for example, Colorado. */
	state?: Maybe<Scalars["String"]["output"]>;
};

export type BaseAddressMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/**
 * Represents a cart in Thor, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each cart includes details such as the total price, line items, shipping address, and available shipping methods. Carts can be used to track items before purchase, allowing customers to review and modify their selections.
 */
export type Cart = Node & {
	availableShippingMethods: Array<CartAvailableShippingMethod>;
	/** Gets the billing address associated with the cart. This may be the same as the shipping address. */
	billingAddress?: Maybe<CartAddress>;
	/** Gets the currency of the cart. */
	currency: Scalars["String"]["output"];
	/** Gets the customer email associated with the cart, if any. */
	customerEmail?: Maybe<Scalars["String"]["output"]>;
	/** Gets the customer ID associated with the cart, if any. */
	customerId?: Maybe<Scalars["ID"]["output"]>;
	discountApplications: DiscountApplicationConnection;
	discountCodes: Array<DiscountCode>;
	/** The unique identifier of the cart */
	id: Scalars["ID"]["output"];
	lineItems: CartLineItemConnection;
	lineItemsQuantity: Scalars["Long"]["output"];
	metadata: Array<MetadataItem>;
	paymentSession?: Maybe<PaymentSession>;
	/** Gets the shipping address associated with the cart. */
	shippingAddress?: Maybe<CartAddress>;
	shippingLines: Array<CartShippingLine>;
	/** Gets the current state of the cart. */
	state: CartState;
	store?: Maybe<Store>;
	/** Gets the total price of the cart before discounts and taxes. */
	subtotal: Money;
	/** Gets the taxed price of the cart. This may be null if the cart does not yet have a taxed price. */
	taxedPrice?: Maybe<TaxedPrice>;
	/** Gets the total price of the cart after discounts and taxes. */
	total: Money;
};

/**
 * Represents a cart in Thor, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each cart includes details such as the total price, line items, shipping address, and available shipping methods. Carts can be used to track items before purchase, allowing customers to review and modify their selections.
 */
export type CartDiscountApplicationsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
};

/**
 * Represents a cart in Thor, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each cart includes details such as the total price, line items, shipping address, and available shipping methods. Carts can be used to track items before purchase, allowing customers to review and modify their selections.
 */
export type CartLineItemsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
};

/**
 * Represents a cart in Thor, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each cart includes details such as the total price, line items, shipping address, and available shipping methods. Carts can be used to track items before purchase, allowing customers to review and modify their selections.
 */
export type CartMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type CartAddDiscountCodeNotFoundError = UserError & {
	message: Scalars["String"]["output"];
};

export type CartAddress = BaseAddress & {
	/** The first line of the address. Typically the street address or PO Box number. */
	address1?: Maybe<Scalars["String"]["output"]>;
	/** The second line of the address. Typically the number of the apartment, suite, or unit. */
	address2?: Maybe<Scalars["String"]["output"]>;
	/** Name of the city. */
	city?: Maybe<Scalars["String"]["output"]>;
	/** Name of the company. */
	company?: Maybe<Scalars["String"]["output"]>;
	/** Two-digit country code as per  ISO 3166-1 alpha-2 */
	countryCode?: Maybe<Scalars["String"]["output"]>;
	/** Email address of the contact. */
	email?: Maybe<Scalars["String"]["output"]>;
	/** Given name (first name) of the contact. */
	firstName?: Maybe<Scalars["String"]["output"]>;
	/** Formatted address. */
	formatted?: Maybe<Scalars["String"]["output"]>;
	/** The unique identifier of the address. */
	id: Scalars["ID"]["output"];
	/** Family name (last name) of the contact. */
	lastName?: Maybe<Scalars["String"]["output"]>;
	metadata: Array<MetadataItem>;
	/** Phone number of the contact. */
	phone?: Maybe<Scalars["String"]["output"]>;
	/** Postal code. */
	postalCode?: Maybe<Scalars["String"]["output"]>;
	/** Name of the state, for example, Colorado. */
	state?: Maybe<Scalars["String"]["output"]>;
};

export type CartAddressMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type CartAddressInput = {
	address1?: InputMaybe<Scalars["String"]["input"]>;
	address2?: InputMaybe<Scalars["String"]["input"]>;
	city?: InputMaybe<Scalars["String"]["input"]>;
	company?: InputMaybe<Scalars["String"]["input"]>;
	countryCode?: InputMaybe<Scalars["String"]["input"]>;
	email?: InputMaybe<Scalars["String"]["input"]>;
	firstName?: InputMaybe<Scalars["String"]["input"]>;
	lastName?: InputMaybe<Scalars["String"]["input"]>;
	phone?: InputMaybe<Scalars["String"]["input"]>;
	postalCode?: InputMaybe<Scalars["String"]["input"]>;
	state?: InputMaybe<Scalars["String"]["input"]>;
};

export type CartAuthenticationFailedError = UserError & {
	message: Scalars["String"]["output"];
};

export type CartAuthorizationFailedError = UserError & {
	message: Scalars["String"]["output"];
};

export type CartAvailableShippingMethod = {
	/** The description of the shipping method. */
	description?: Maybe<Scalars["String"]["output"]>;
	/** The unique identifier of the shipping method. */
	id: Scalars["ID"]["output"];
	metadata: Array<MetadataItem>;
	/** The name of the shipping method. */
	name: Scalars["String"]["output"];
	/** Gets the rate associated with the shipping method. */
	rate: CartAvailableShippingMethodRate;
	/** Gets the SKU (Stock Keeping Unit) associated with the shipping method. */
	sku?: Maybe<Scalars["String"]["output"]>;
};

export type CartAvailableShippingMethodMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type CartAvailableShippingMethodRate = {
	/** The unique identifier for the shipping method rate. */
	id: Scalars["ID"]["output"];
};

export type CartCompleteError =
	| CartCompletionDiscountCodeAlreadyUsedError
	| CartCompletionDiscrepancyError
	| CartNotFoundError;

export type CartCompleteInput = {
	cartId: Scalars["ID"]["input"];
};

export type CartCompletePayload = {
	errors?: Maybe<Array<CartCompleteError>>;
	order?: Maybe<Order>;
};

export type CartCompletionDiscountCodeAlreadyUsedError = UserError & {
	message: Scalars["String"]["output"];
};

export type CartCompletionDiscrepancyError = UserError & {
	message: Scalars["String"]["output"];
};

export type CartCreateError =
	| CreateCartAddressDoesNotHaveCountryCodeError
	| CreateCartAuthenticationFailedError
	| CreateCartAuthorizationFailedError
	| CreateCartChannelDoesNotSupportCountryError
	| CreateCartChannelDoesNotSupportCurrencyError
	| CreateCartChannelHasNoCountriesError
	| CreateCartChannelNotFoundError
	| CreateCartFailedNotAllLineItemsCouldBeAddedError
	| CreateCartPriceChannelNotFoundError
	| CreateCartShippingAddressDoesNotHaveShippingZonesError
	| CreateCartStoreNotFoundError;

export type CartCreateInput = {
	billingAddress?: InputMaybe<CartAddressInput>;
	countryCode?: InputMaybe<Scalars["String"]["input"]>;
	currency: Scalars["String"]["input"];
	customerEmail?: InputMaybe<Scalars["String"]["input"]>;
	customerId?: InputMaybe<Scalars["ID"]["input"]>;
	lineItems?: InputMaybe<Array<CartLineItemInput>>;
	priceChannelId?: InputMaybe<Scalars["ID"]["input"]>;
	shippingAddress?: InputMaybe<CartAddressInput>;
	storeId: Scalars["ID"]["input"];
};

export type CartCreatePayload = {
	cart?: Maybe<Cart>;
	errors?: Maybe<Array<CartCreateError>>;
};

export type CartDiscountCodeAddError =
	| CartAddDiscountCodeNotFoundError
	| CartDiscountCodeMaxApplicationsReachedError
	| CartNotFoundError;

export type CartDiscountCodeAddInput = {
	cartId: Scalars["ID"]["input"];
	discountCode: Scalars["String"]["input"];
};

export type CartDiscountCodeAddPayload = {
	cart?: Maybe<Cart>;
	errors?: Maybe<Array<CartDiscountCodeAddError>>;
};

export type CartDiscountCodeMaxApplicationsReachedError = UserError & {
	message: Scalars["String"]["output"];
};

export type CartDiscountCodeRemoveError = CartNotFoundError;

export type CartDiscountCodeRemoveInput = {
	cartId: Scalars["ID"]["input"];
	discountCodes: Array<Scalars["String"]["input"]>;
};

export type CartDiscountCodeRemovePayload = {
	cart?: Maybe<Cart>;
	errors?: Maybe<Array<CartDiscountCodeRemoveError>>;
};

/**
 * Represents a line item in a cart, which includes details about the product, variant, and any associated discounts.
 *
 * Each line item contains information such as the product name, variant details, total price, and any applicable discounts. This allows for detailed tracking of items within a cart, including their pricing and discount applications.
 */
export type CartLineItem = Node & {
	discountApplications: DiscountApplicationConnection;
	/** The unique identifier of the line item */
	id: Scalars["ID"]["output"];
	metadata: Array<MetadataItem>;
	product?: Maybe<Product>;
	/** The unique identifier of the product associated with the cart line item. */
	productId: Scalars["ID"]["output"];
	/** The name of the product */
	productName: Scalars["String"]["output"];
	/** Retrieves the slug of the product associated with a cart line item. This is useful for generating URLs or displaying product information. */
	productSlug: Scalars["String"]["output"];
	/** Retrieves the quantity of the cart line item. */
	quantity: Scalars["Int"]["output"];
	/** Retrieves the SKU (Stock Keeping Unit) of the variant associated with a cart line item. The SKU is a unique identifier for the variant, often used for inventory management. */
	sku: Scalars["String"]["output"];
	/** The line items total excluding discounts and taxes. */
	subtotal: Money;
	/** Gets the tax behavior of the cart line item, which indicates how taxes are applied to the item. */
	taxBehavior: TaxBehavior;
	/** Retrieves the tax rate applied to the cart line item. This may be null if the line item does not have a tax rate defined. */
	taxRate?: Maybe<TaxRate>;
	/** Gets the taxed price of the cart line item. This may be null if the cart does not yet have a taxed price. */
	taxedPrice?: Maybe<TaxedPrice>;
	/** Gets the total price of the cart line item after discounts and taxes. */
	total: Money;
	/** Retrieves the unit price of the cart line item. */
	unitPrice: UnitPrice;
	variant?: Maybe<ProductVariant>;
	/** The unique identifier of the variant associated with the cart line item. */
	variantId: Scalars["ID"]["output"];
	/** Retrieves the name of the variant associated with a cart line item. This is useful for displaying the specific variant details to the user. */
	variantName: Scalars["String"]["output"];
};

/**
 * Represents a line item in a cart, which includes details about the product, variant, and any associated discounts.
 *
 * Each line item contains information such as the product name, variant details, total price, and any applicable discounts. This allows for detailed tracking of items within a cart, including their pricing and discount applications.
 */
export type CartLineItemDiscountApplicationsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
};

/**
 * Represents a line item in a cart, which includes details about the product, variant, and any associated discounts.
 *
 * Each line item contains information such as the product name, variant details, total price, and any applicable discounts. This allows for detailed tracking of items within a cart, including their pricing and discount applications.
 */
export type CartLineItemMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/** A connection to a list of items. */
export type CartLineItemConnection = {
	/** A list of edges. */
	edges?: Maybe<Array<CartLineItemEdge>>;
	/** A flattened list of the nodes */
	nodes?: Maybe<Array<CartLineItem>>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
	/** Identifies the total count of items in the connection. */
	totalCount: Scalars["Int"]["output"];
};

export type CartLineItemEdge = {
	/** A cursor for use in pagination. */
	cursor: Scalars["String"]["output"];
	/** The item at the end of the edge. */
	node: CartLineItem;
};

export type CartLineItemInput = {
	metadata?: InputMaybe<Array<KeyValuePairOfStringAndStringInput>>;
	quantity: Scalars["Int"]["input"];
	variantId: Scalars["ID"]["input"];
};

export type CartLineItemPriceNotFoundError = UserError & {
	message: Scalars["String"]["output"];
};

export type CartLineItemUpdateInput = {
	lineItemId: Scalars["ID"]["input"];
	metadata?: InputMaybe<Array<KeyValuePairOfStringAndStringInput>>;
	quantity: Scalars["Int"]["input"];
};

export type CartLineItemsAddError =
	| CartLineItemPriceNotFoundError
	| CartLineItemsInsufficientStockError
	| CartNotFoundError
	| ProductVariantNotFoundError;

export type CartLineItemsAddInput = {
	cartId: Scalars["ID"]["input"];
	lineItems: Array<CartLineItemInput>;
};

export type CartLineItemsAddPayload = {
	cart?: Maybe<Cart>;
	errors?: Maybe<Array<CartLineItemsAddError>>;
};

export type CartLineItemsInsufficientStockError = UserError & {
	message: Scalars["String"]["output"];
};

export type CartLineItemsNotFoundError = UserError & {
	message: Scalars["String"]["output"];
};

export type CartLineItemsRemoveError = CartNotFoundError;

export type CartLineItemsRemoveInput = {
	cartId: Scalars["ID"]["input"];
	lineItemIds: Array<Scalars["ID"]["input"]>;
};

export type CartLineItemsRemovePayload = {
	cart?: Maybe<Cart>;
	errors?: Maybe<Array<CartLineItemsRemoveError>>;
};

export type CartLineItemsUpdateError =
	| CartLineItemsNotFoundError
	| CartNotFoundError
	| UpdateCartLineItemsInsufficientStockError;

export type CartLineItemsUpdateInput = {
	cartId: Scalars["ID"]["input"];
	lineItems: Array<CartLineItemUpdateInput>;
};

export type CartLineItemsUpdatePayload = {
	cart?: Maybe<Cart>;
	errors?: Maybe<Array<CartLineItemsUpdateError>>;
};

export type CartNotFoundError = UserError & {
	message: Scalars["String"]["output"];
};

export type CartPaymentSessionInitializeError =
	| CartNotFoundError
	| PaymentGatewayChannelMismatchError
	| PaymentGatewayNotFoundError
	| PaymentGatewaySessionInitializeFailedError;

export type CartPaymentSessionInitializeInput = {
	cartId: Scalars["ID"]["input"];
	gatewayId: Scalars["ID"]["input"];
};

export type CartPaymentSessionInitializePayload = {
	cart?: Maybe<Cart>;
	errors?: Maybe<Array<CartPaymentSessionInitializeError>>;
};

export type CartReplicateError = CartNotFoundError | CartReplicateStrictValidationFailedError;

export type CartReplicateInput = {
	cartId: Scalars["ID"]["input"];
	currency: Scalars["String"]["input"];
	priceChannelId?: InputMaybe<Scalars["ID"]["input"]>;
	storeId: Scalars["ID"]["input"];
	strategy: ReplicationStrategy;
};

export type CartReplicatePayload = {
	cart?: Maybe<Cart>;
	errors?: Maybe<Array<CartReplicateError>>;
};

export type CartReplicateStockChangeError = {
	lineItemId: Scalars["ID"]["output"];
	newStock: Scalars["Int"]["output"];
	variantId: Scalars["ID"]["output"];
	wantedStock: Scalars["Int"]["output"];
};

export type CartReplicateStrictValidationFailedError = UserError & {
	message: Scalars["String"]["output"];
	stockChanges: Array<CartReplicateStockChangeError>;
	variantsNotFound: Array<CartReplicateVariantNotFoundError>;
};

export type CartReplicateVariantNotFoundError = {
	lineItemId: Scalars["ID"]["output"];
	variantId: Scalars["ID"]["output"];
};

/** Represents a shipping line on a cart, including method and totals. */
export type CartShippingLine = Node & {
	/** The unique identifier of the cart shipping line. */
	id: Scalars["ID"]["output"];
	/** The shipping method selected for this shipping line. */
	shippingMethod: LineShippingMethod;
	/** The total amount for the shipping line before discounts and taxes. */
	subtotal: Money;
	/** The tax behavior used to calculate this shipping line. */
	taxBehavior: TaxBehavior;
	/** The taxed price (net, gross, tax) of this shipping line, if available. */
	taxedPrice?: Maybe<TaxedPrice>;
	/** The total amount for the shipping line after discounts and taxes */
	total: Money;
};

export type CartShippingLineAddError = CartNotFoundError | ShippingMethodNotFoundError;

export type CartShippingLineAddInput = {
	cartId: Scalars["ID"]["input"];
	shippingMethodId: Scalars["ID"]["input"];
};

export type CartShippingLineAddPayload = {
	cart?: Maybe<Cart>;
	errors?: Maybe<Array<CartShippingLineAddError>>;
};

export type CartShippingLineNotFoundError = UserError & {
	message: Scalars["String"]["output"];
};

export type CartShippingLineRemoveError = CartNotFoundError | CartShippingLineNotFoundError;

export type CartShippingLineRemoveInput = {
	cartId: Scalars["ID"]["input"];
	shippingLineId: Scalars["ID"]["input"];
};

export type CartShippingLineRemovePayload = {
	cart?: Maybe<Cart>;
	errors?: Maybe<Array<CartShippingLineRemoveError>>;
};

export type CartShippingLinesSetError = CartNotFoundError | ShippingMethodNotFoundError;

export type CartShippingLinesSetInput = {
	cartId: Scalars["ID"]["input"];
	shippingMethodIds: Array<Scalars["ID"]["input"]>;
};

export type CartShippingLinesSetPayload = {
	cart?: Maybe<Cart>;
	errors?: Maybe<Array<CartShippingLinesSetError>>;
};

export enum CartState {
	Active = "ACTIVE",
	Ordered = "ORDERED",
}

export type CartUpdateError =
	| CartAuthenticationFailedError
	| CartAuthorizationFailedError
	| CartNotFoundError
	| CartUpdatePriceChannelNotFoundError;

export type CartUpdateInput = {
	billingAddress?: InputMaybe<CartAddressInput>;
	cartId: Scalars["ID"]["input"];
	customerEmail?: InputMaybe<Scalars["String"]["input"]>;
	customerId?: InputMaybe<Scalars["ID"]["input"]>;
	metadata?: InputMaybe<Array<KeyValuePairOfStringAndStringInput>>;
	priceChannelId?: InputMaybe<Scalars["ID"]["input"]>;
	shippingAddress?: InputMaybe<CartAddressInput>;
};

export type CartUpdatePayload = {
	cart?: Maybe<Cart>;
	errors?: Maybe<Array<CartUpdateError>>;
};

export type CartUpdatePriceChannelNotFoundError = UserError & {
	message: Scalars["String"]["output"];
};

/**
 * Represents a category, encapsulating all information required to display and manage categories across storefronts and sales channels.
 *
 * Each category includes core details such as title, description, and associated products. Categories can be organized hierarchically to create a structured navigation experience for customers.
 */
export type Category = Node & {
	ancestors: Array<Category>;
	children: Array<Category>;
	childrenCount: Scalars["Long"]["output"];
	descendants: Array<Category>;
	descendantsCount: Scalars["Long"]["output"];
	/** The ID of the category. */
	id: Scalars["ID"]["output"];
	/** The level of the category. Root categories have a level of 0, their direct children have a level of 1, and so on. */
	level: Scalars["Int"]["output"];
	/** The name of the category. */
	name: Scalars["String"]["output"];
	parent?: Maybe<Category>;
	path: Scalars["String"]["output"];
	products: ProductsConnection;
	productsCount: Scalars["Long"]["output"];
	/** The slug of the category. */
	slug: Scalars["String"]["output"];
};

/**
 * Represents a category, encapsulating all information required to display and manage categories across storefronts and sales channels.
 *
 * Each category includes core details such as title, description, and associated products. Categories can be organized hierarchically to create a structured navigation experience for customers.
 */
export type CategoryProductsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
	priceChannelId?: InputMaybe<Scalars["ID"]["input"]>;
	priceCountry?: InputMaybe<Scalars["String"]["input"]>;
	priceCurrency?: InputMaybe<Scalars["String"]["input"]>;
	query?: InputMaybe<Scalars["String"]["input"]>;
	sortDirection?: SortDirection;
	sortKey?: ProductCategorySortKeys;
	storeId?: InputMaybe<Scalars["ID"]["input"]>;
};

/** A connection to a list of items. */
export type CategoryConnection = {
	/** A list of edges. */
	edges?: Maybe<Array<CategoryEdge>>;
	/** A flattened list of the nodes */
	nodes?: Maybe<Array<Category>>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
	/** Identifies the total count of items in the connection. */
	totalCount: Scalars["Int"]["output"];
};

export type CategoryEdge = {
	/** A cursor for use in pagination. */
	cursor: Scalars["String"]["output"];
	/** The item at the end of the edge. */
	node: Category;
};

export enum CategorySortKeys {
	Id = "ID",
	Level = "LEVEL",
	Name = "NAME",
}

/**
 * Represents a collection, encapsulating all information required to display and manage collections across storefronts and sales channels.
 *
 *  Each collection includes core details such as title, description, and associated products. Collections can be organized hierarchically to create a structured navigation experience for customers.
 */
export type Collection = Node & {
	/** The ID of the collection. */
	id: Scalars["ID"]["output"];
	/** The name of the collection. */
	name: Scalars["String"]["output"];
	products: ProductsConnection;
	/** The slug of the collection. */
	slug: Scalars["String"]["output"];
};

/**
 * Represents a collection, encapsulating all information required to display and manage collections across storefronts and sales channels.
 *
 *  Each collection includes core details such as title, description, and associated products. Collections can be organized hierarchically to create a structured navigation experience for customers.
 */
export type CollectionProductsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
	priceChannelId?: InputMaybe<Scalars["ID"]["input"]>;
	priceCountry?: InputMaybe<Scalars["String"]["input"]>;
	priceCurrency?: InputMaybe<Scalars["String"]["input"]>;
	query?: InputMaybe<Scalars["String"]["input"]>;
	sortDirection?: SortDirection;
	sortKey?: ProductCollectionSortKeys;
	storeId?: InputMaybe<Scalars["ID"]["input"]>;
};

/** A connection to a list of items. */
export type CollectionConnection = {
	/** A list of edges. */
	edges?: Maybe<Array<CollectionEdge>>;
	/** A flattened list of the nodes */
	nodes?: Maybe<Array<Collection>>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
	/** Identifies the total count of items in the connection. */
	totalCount: Scalars["Int"]["output"];
};

export type CollectionEdge = {
	/** A cursor for use in pagination. */
	cursor: Scalars["String"]["output"];
	/** The item at the end of the edge. */
	node: Collection;
};

export type CountryInfo = {
	code: Scalars["String"]["output"];
	name: Scalars["String"]["output"];
	postalCode?: Maybe<PostalCodeInfo>;
	zones: Array<ZoneInfo>;
};

export type CreateCartAddressDoesNotHaveCountryCodeError = UserError & {
	message: Scalars["String"]["output"];
};

export type CreateCartAuthenticationFailedError = UserError & {
	message: Scalars["String"]["output"];
};

export type CreateCartAuthorizationFailedError = UserError & {
	message: Scalars["String"]["output"];
};

export type CreateCartChannelDoesNotSupportCountryError = UserError & {
	message: Scalars["String"]["output"];
};

export type CreateCartChannelDoesNotSupportCurrencyError = UserError & {
	message: Scalars["String"]["output"];
};

export type CreateCartChannelHasNoCountriesError = UserError & {
	message: Scalars["String"]["output"];
};

export type CreateCartChannelNotFoundError = UserError & {
	message: Scalars["String"]["output"];
};

export type CreateCartFailedNotAllLineItemsCouldBeAddedError = UserError & {
	message: Scalars["String"]["output"];
};

export type CreateCartPriceChannelNotFoundError = UserError & {
	message: Scalars["String"]["output"];
};

export type CreateCartShippingAddressDoesNotHaveShippingZonesError = UserError & {
	message: Scalars["String"]["output"];
};

export type CreateCartStoreNotFoundError = UserError & {
	message: Scalars["String"]["output"];
};

export type Customer = Node & {
	addresses: CustomerAddressConnection;
	/** The date the customer was created. */
	createdAt: Scalars["DateTime"]["output"];
	customerGroups: CustomerGroupConnection;
	defaultBillingAddress?: Maybe<CustomerAddress>;
	defaultShippingAddress?: Maybe<CustomerAddress>;
	/** The email address of the customer. */
	email?: Maybe<Scalars["String"]["output"]>;
	/** The first name of the customer. */
	firstName?: Maybe<Scalars["String"]["output"]>;
	/** The unique identifier for the customer. */
	id: Scalars["ID"]["output"];
	/** The last name of the customer. */
	lastName?: Maybe<Scalars["String"]["output"]>;
	metadata: Array<MetadataItem>;
	orders: OrderConnection;
	ordersCount: Scalars["Long"]["output"];
};

export type CustomerAddressesArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CustomerCustomerGroupsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CustomerMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type CustomerOrdersArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
	sortDirection?: InputMaybe<SortDirection>;
	sortKey?: InputMaybe<OrderSortKeys>;
};

export type CustomerAccessToken = {
	/** The opaque bearer token to send as part of the Authorization request header. */
	accessToken: Scalars["String"]["output"];
	/** The number of seconds before the access token expires. */
	expiresIn: Scalars["Long"]["output"];
	/** If set, this provides the ability to get a new access_token after it expires using a refresh endpoint. */
	refreshToken: Scalars["String"]["output"];
};

export type CustomerAccessTokenCreateError = InvalidCredentialsError;

export type CustomerAccessTokenCreateInput = {
	email: Scalars["String"]["input"];
	password: Scalars["String"]["input"];
};

export type CustomerAccessTokenCreatePayload = {
	customerAccessToken?: Maybe<CustomerAccessToken>;
	errors?: Maybe<Array<CustomerAccessTokenCreateError>>;
};

export type CustomerAccessTokenRefreshError = InvalidRefreshTokenError;

export type CustomerAccessTokenRefreshInput = {
	refreshToken: Scalars["String"]["input"];
};

export type CustomerAccessTokenRefreshPayload = {
	customerAccessToken?: Maybe<CustomerAccessToken>;
	errors?: Maybe<Array<CustomerAccessTokenRefreshError>>;
};

export type CustomerActivateError =
	| CustomerEmailAlreadyConfirmedError
	| CustomerInvalidActivationTokenError
	| CustomerInvalidPasswordError;

export type CustomerActivateInput = {
	email: Scalars["String"]["input"];
	firstName?: InputMaybe<Scalars["String"]["input"]>;
	lastName?: InputMaybe<Scalars["String"]["input"]>;
	metadata?: InputMaybe<Array<KeyValuePairOfStringAndStringInput>>;
	password: Scalars["String"]["input"];
	token: Scalars["String"]["input"];
};

export type CustomerActivatePayload = {
	customer?: Maybe<Customer>;
	customerAccessToken?: Maybe<CustomerAccessToken>;
	errors?: Maybe<Array<CustomerActivateError>>;
};

export type CustomerAddress = BaseAddress & {
	/** The first line of the address. */
	address1?: Maybe<Scalars["String"]["output"]>;
	/** The second line of the address. */
	address2?: Maybe<Scalars["String"]["output"]>;
	/** The name of the city, district, village, or town. */
	city?: Maybe<Scalars["String"]["output"]>;
	/** The name of the customer's company or organization. */
	company?: Maybe<Scalars["String"]["output"]>;
	/** The two-letter code for the country of the address. */
	countryCode?: Maybe<Scalars["String"]["output"]>;
	/** The email address of the address. */
	email?: Maybe<Scalars["String"]["output"]>;
	/** The first name of the address. */
	firstName?: Maybe<Scalars["String"]["output"]>;
	/** Formatted address. */
	formatted?: Maybe<Scalars["String"]["output"]>;
	/** The unique identifier of the address. */
	id: Scalars["ID"]["output"];
	/** The last name of the address. */
	lastName?: Maybe<Scalars["String"]["output"]>;
	metadata: Array<MetadataItem>;
	/** The name of the address. */
	name?: Maybe<Scalars["String"]["output"]>;
	/** The phone number of the address. */
	phone?: Maybe<Scalars["String"]["output"]>;
	/** The zip or postal code of the address. */
	postalCode?: Maybe<Scalars["String"]["output"]>;
	/** The region of the address, such as the province, state, or district. */
	state?: Maybe<Scalars["String"]["output"]>;
};

export type CustomerAddressMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/** A connection to a list of items. */
export type CustomerAddressConnection = {
	/** A list of edges. */
	edges?: Maybe<Array<CustomerAddressEdge>>;
	/** A flattened list of the nodes */
	nodes?: Maybe<Array<CustomerAddress>>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
	/** Identifies the total count of items in the connection. */
	totalCount: Scalars["Int"]["output"];
};

export type CustomerAddressCreateError = AddressAlreadyExistsError | CustomerNotFoundError;

export type CustomerAddressCreateInput = {
	address: CustomerAddressInput;
};

export type CustomerAddressCreatePayload = {
	customerAddress?: Maybe<CustomerAddress>;
	errors?: Maybe<Array<CustomerAddressCreateError>>;
};

export type CustomerAddressDeleteError = AddressNotFoundError | CustomerNotFoundError;

export type CustomerAddressDeleteInput = {
	id: Scalars["ID"]["input"];
};

export type CustomerAddressDeletePayload = {
	customer?: Maybe<Customer>;
	errors?: Maybe<Array<CustomerAddressDeleteError>>;
};

export type CustomerAddressEdge = {
	/** A cursor for use in pagination. */
	cursor: Scalars["String"]["output"];
	/** The item at the end of the edge. */
	node: CustomerAddress;
};

export type CustomerAddressInput = {
	address1?: InputMaybe<Scalars["String"]["input"]>;
	address2?: InputMaybe<Scalars["String"]["input"]>;
	city?: InputMaybe<Scalars["String"]["input"]>;
	company?: InputMaybe<Scalars["String"]["input"]>;
	countryCode?: InputMaybe<Scalars["String"]["input"]>;
	email?: InputMaybe<Scalars["String"]["input"]>;
	firstName?: InputMaybe<Scalars["String"]["input"]>;
	isDefaultBilling?: InputMaybe<Scalars["Boolean"]["input"]>;
	isDefaultShipping?: InputMaybe<Scalars["Boolean"]["input"]>;
	lastName?: InputMaybe<Scalars["String"]["input"]>;
	metadata?: InputMaybe<Array<KeyValuePairOfStringAndStringInput>>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	phone?: InputMaybe<Scalars["String"]["input"]>;
	postalCode?: InputMaybe<Scalars["String"]["input"]>;
	state?: InputMaybe<Scalars["String"]["input"]>;
};

export type CustomerAddressUpdateError =
	| AddressAlreadyExistsError
	| AddressNotFoundError
	| CustomerNotFoundError;

export type CustomerAddressUpdateInput = {
	address: CustomerAddressInput;
	id: Scalars["ID"]["input"];
};

export type CustomerAddressUpdatePayload = {
	customerAddress?: Maybe<CustomerAddress>;
	errors?: Maybe<Array<CustomerAddressUpdateError>>;
};

export type CustomerEmailAlreadyConfirmedError = UserError & {
	message: Scalars["String"]["output"];
};

export type CustomerGroup = Node & {
	/** The unique identifier for the customer. */
	id: Scalars["ID"]["output"];
	/** The name of the customer group. */
	name: Scalars["String"]["output"];
};

/** A connection to a list of items. */
export type CustomerGroupConnection = {
	/** A list of edges. */
	edges?: Maybe<Array<CustomerGroupEdge>>;
	/** A flattened list of the nodes */
	nodes?: Maybe<Array<CustomerGroup>>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
	/** Identifies the total count of items in the connection. */
	totalCount: Scalars["Int"]["output"];
};

export type CustomerGroupEdge = {
	/** A cursor for use in pagination. */
	cursor: Scalars["String"]["output"];
	/** The item at the end of the edge. */
	node: CustomerGroup;
};

export type CustomerInvalidActivationTokenError = UserError & {
	message: Scalars["String"]["output"];
};

export type CustomerInvalidPasswordError = UserError & {
	message: Scalars["String"]["output"];
};

export type CustomerNotFoundError = UserError & {
	message: Scalars["String"]["output"];
};

export type CustomerPasswordResetError = InvalidPasswordError | InvalidTokenError;

export type CustomerPasswordResetInput = {
	email: Scalars["String"]["input"];
	password: Scalars["String"]["input"];
	resetToken: Scalars["String"]["input"];
};

export type CustomerPasswordResetPayload = {
	customer?: Maybe<Customer>;
	customerAccessToken?: Maybe<CustomerAccessToken>;
	errors?: Maybe<Array<CustomerPasswordResetError>>;
};

export type CustomerPasswordResetTokenError = InvalidCredentialsError;

export type CustomerPasswordResetTokenInput = {
	email: Scalars["String"]["input"];
};

export type CustomerPasswordResetTokenPayload = {
	errors?: Maybe<Array<CustomerPasswordResetTokenError>>;
};

export type CustomerRegisterError = CustomerRegisterFailedError;

export type CustomerRegisterFailedError = UserError & {
	message: Scalars["String"]["output"];
};

export type CustomerRegisterInput = {
	email: Scalars["String"]["input"];
};

export type CustomerRegisterPayload = {
	errors?: Maybe<Array<CustomerRegisterError>>;
};

export type CustomerUpdateInput = {
	email?: InputMaybe<Scalars["String"]["input"]>;
	firstName?: InputMaybe<Scalars["String"]["input"]>;
	lastName?: InputMaybe<Scalars["String"]["input"]>;
};

export type CustomerUpdatePayload = {
	customer?: Maybe<Customer>;
};

export type DiscountApplication = {
	/** The code of the discount that was applied. If it was an automatic discount, this field is null. */
	discountCode?: Maybe<Scalars["String"]["output"]>;
	/** The discounted amount. */
	discountedAmount: Money;
	/** The title of the discount that was applied. */
	label: Scalars["String"]["output"];
	/** The value of the discount application, either absolute or relative (Money value). */
	value: DiscountApplicationValue;
};

/** A connection to a list of items. */
export type DiscountApplicationConnection = {
	/** A list of edges. */
	edges?: Maybe<Array<DiscountApplicationEdge>>;
	/** A flattened list of the nodes */
	nodes?: Maybe<Array<DiscountApplication>>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
	/** Identifies the total count of items in the connection. */
	totalCount: Scalars["Int"]["output"];
};

export type DiscountApplicationEdge = {
	/** A cursor for use in pagination. */
	cursor: Scalars["String"]["output"];
	/** The item at the end of the edge. */
	node: DiscountApplication;
};

/** The value of the discount application, either absolute or relative. */
export type DiscountApplicationValue = Money | RelativeValue;

export type DiscountCode = {
	code: Scalars["String"]["output"];
	error?: Maybe<DiscountCodeError>;
};

export enum DiscountCodeError {
	ExcludedByDiscountPolicy = "EXCLUDED_BY_DISCOUNT_POLICY",
	MaxApplicationsPerCustomerReached = "MAX_APPLICATIONS_PER_CUSTOMER_REACHED",
	MaxApplicationsReached = "MAX_APPLICATIONS_REACHED",
	None = "NONE",
	NotFound = "NOT_FOUND",
	NoMatch = "NO_MATCH",
	Unknown = "UNKNOWN",
}

/** Represents a discounted price for a product variant. */
export type DiscountedPrice = {
	discount?: Maybe<ProductDiscount>;
	/** Money value of the discounted price. */
	value: Money;
};

export type Facet = {
	/** The field of the facet. */
	field: FacetField;
	/** The name of the facet. */
	name: Scalars["String"]["output"];
	/** The values of the facet. */
	values: Array<FacetValue>;
};

export enum FacetField {
	Price = "PRICE",
	Tag = "TAG",
	Vendor = "VENDOR",
}

export type FacetValue = {
	/** The count of the facet value, representing how many products are associated with this facet value. */
	count: Scalars["Long"]["output"];
	/** The name of the facet value. */
	name: Scalars["String"]["output"];
};

export type InvalidCredentialsError = UserError & {
	message: Scalars["String"]["output"];
};

export type InvalidPasswordError = UserError & {
	message: Scalars["String"]["output"];
};

export type InvalidRefreshTokenError = UserError & {
	message: Scalars["String"]["output"];
};

export type InvalidTokenError = UserError & {
	message: Scalars["String"]["output"];
};

export type KeyValuePairOfStringAndStringInput = {
	key: Scalars["String"]["input"];
	value: Scalars["String"]["input"];
};

/** Represents the shipping method associated with a cart shipping line. */
export type LineShippingMethod = {
	id: Scalars["ID"]["output"];
	metadata: Array<MetadataItem>;
	name: Scalars["String"]["output"];
	sku?: Maybe<Scalars["String"]["output"]>;
};

/** Represents the shipping method associated with a cart shipping line. */
export type LineShippingMethodMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type ManualPaymentGateway = PaymentGateway & {
	channelIds: Array<Scalars["ID"]["output"]>;
	id: Scalars["ID"]["output"];
	name: Scalars["String"]["output"];
};

export type Media = Node & {
	/** The content type of the media. */
	contentType: Scalars["String"]["output"];
	/** The file extension of the media. */
	fileExtension: Scalars["String"]["output"];
	/** The file name of the media. */
	fileName: Scalars["String"]["output"];
	/** The unique identifier of the media. */
	id: Scalars["ID"]["output"];
	src: Scalars["String"]["output"];
};

/** A connection to a list of items. */
export type MediaConnection = {
	/** A list of edges. */
	edges?: Maybe<Array<MediaEdge>>;
	/** A flattened list of the nodes */
	nodes?: Maybe<Array<Media>>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
	/** Identifies the total count of items in the connection. */
	totalCount: Scalars["Int"]["output"];
};

export type MediaEdge = {
	/** A cursor for use in pagination. */
	cursor: Scalars["String"]["output"];
	/** The item at the end of the edge. */
	node: Media;
};

/** Represents a key-value pair of metadata associated with an entity, providing additional information or attributes that can be used for various purposes such as filtering, categorization, or display. */
export type MetadataItem = {
	/** Gets the key of the metadata item, which serves as an identifier for the type of metadata being represented. */
	key: Scalars["String"]["output"];
	/** Gets the value of the metadata item, which contains the specific information or attribute associated with the key. */
	value: Scalars["String"]["output"];
};

/** The monetary value in the smallest unit of the currency. */
export type Money = {
	/** The amount of money in the smallest unit of the currency. For example, 100 cents in USD. */
	centAmount: Scalars["Long"]["output"];
	/** The three-letter currency code that represents a world currency used in a store. Currency codes include standard ISO 4217 codes, legacy codes, and non-standard codes. For example, USD. */
	currencyCode: Scalars["String"]["output"];
	/** The number of digits after the decimal separator in the currency. For example, 2 for USD and 0 for JPY. */
	fractionDigits: Scalars["Int"]["output"];
};

export type Mutation = {
	cartComplete: CartCompletePayload;
	cartCreate: CartCreatePayload;
	cartDiscountCodeAdd: CartDiscountCodeAddPayload;
	cartDiscountCodeRemove: CartDiscountCodeRemovePayload;
	cartLineItemsAdd: CartLineItemsAddPayload;
	cartLineItemsRemove: CartLineItemsRemovePayload;
	cartLineItemsUpdate: CartLineItemsUpdatePayload;
	cartPaymentSessionInitialize: CartPaymentSessionInitializePayload;
	cartReplicate: CartReplicatePayload;
	cartShippingLineAdd: CartShippingLineAddPayload;
	cartShippingLineRemove: CartShippingLineRemovePayload;
	cartShippingLinesSet: CartShippingLinesSetPayload;
	cartUpdate: CartUpdatePayload;
	customerAccessTokenCreate: CustomerAccessTokenCreatePayload;
	customerAccessTokenRefresh: CustomerAccessTokenRefreshPayload;
	customerActivate: CustomerActivatePayload;
	customerAddressCreate: CustomerAddressCreatePayload;
	customerAddressDelete: CustomerAddressDeletePayload;
	customerAddressUpdate: CustomerAddressUpdatePayload;
	customerPasswordReset: CustomerPasswordResetPayload;
	customerPasswordResetToken: CustomerPasswordResetTokenPayload;
	customerRegister: CustomerRegisterPayload;
	customerUpdate: CustomerUpdatePayload;
};

export type MutationCartCompleteArgs = {
	input: CartCompleteInput;
};

export type MutationCartCreateArgs = {
	input: CartCreateInput;
};

export type MutationCartDiscountCodeAddArgs = {
	input: CartDiscountCodeAddInput;
};

export type MutationCartDiscountCodeRemoveArgs = {
	input: CartDiscountCodeRemoveInput;
};

export type MutationCartLineItemsAddArgs = {
	input: CartLineItemsAddInput;
};

export type MutationCartLineItemsRemoveArgs = {
	input: CartLineItemsRemoveInput;
};

export type MutationCartLineItemsUpdateArgs = {
	input: CartLineItemsUpdateInput;
};

export type MutationCartPaymentSessionInitializeArgs = {
	input: CartPaymentSessionInitializeInput;
};

export type MutationCartReplicateArgs = {
	input: CartReplicateInput;
};

export type MutationCartShippingLineAddArgs = {
	input: CartShippingLineAddInput;
};

export type MutationCartShippingLineRemoveArgs = {
	input: CartShippingLineRemoveInput;
};

export type MutationCartShippingLinesSetArgs = {
	input: CartShippingLinesSetInput;
};

export type MutationCartUpdateArgs = {
	input: CartUpdateInput;
};

export type MutationCustomerAccessTokenCreateArgs = {
	input: CustomerAccessTokenCreateInput;
};

export type MutationCustomerAccessTokenRefreshArgs = {
	input: CustomerAccessTokenRefreshInput;
};

export type MutationCustomerActivateArgs = {
	input: CustomerActivateInput;
};

export type MutationCustomerAddressCreateArgs = {
	input: CustomerAddressCreateInput;
};

export type MutationCustomerAddressDeleteArgs = {
	input: CustomerAddressDeleteInput;
};

export type MutationCustomerAddressUpdateArgs = {
	input: CustomerAddressUpdateInput;
};

export type MutationCustomerPasswordResetArgs = {
	input: CustomerPasswordResetInput;
};

export type MutationCustomerPasswordResetTokenArgs = {
	input: CustomerPasswordResetTokenInput;
};

export type MutationCustomerRegisterArgs = {
	input: CustomerRegisterInput;
};

export type MutationCustomerUpdateArgs = {
	input: CustomerUpdateInput;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
	id: Scalars["ID"]["output"];
};

export type Order = Node & {
	/** Gets the billing address associated with the order. This may be the same as the shipping address. */
	billingAddress?: Maybe<OrderAddress>;
	/** The date and time when the order was created. */
	createdAt: Scalars["DateTime"]["output"];
	customer?: Maybe<Customer>;
	discountApplications: DiscountApplicationConnection;
	/** The external reference of the order. */
	externalReference?: Maybe<Scalars["String"]["output"]>;
	/** The unique identifier for the order. */
	id: Scalars["ID"]["output"];
	lineItems: OrderLineItemConnection;
	lineItemsQuantity: Scalars["Long"]["output"];
	metadata: Array<MetadataItem>;
	/** The order number. */
	orderNumber: Scalars["Int"]["output"];
	/** Current status of the Order. */
	orderState: OrderState;
	/** Payment status of the Order. */
	paymentState: PaymentState;
	payments: PaymentConnection;
	/** Shipment status of the Order. */
	shipmentState: ShipmentState;
	/** Gets the shipping address associated with the order. */
	shippingAddress?: Maybe<OrderAddress>;
	shippingLines: Array<OrderShippingLine>;
	/** Gets the total price of the order before discounts and taxes. */
	subtotal: Money;
	/** Gets the taxed price of the order. This may be null if the order does not yet have a taxed price. */
	taxedPrice?: Maybe<TaxedPrice>;
	/** Gets the total price of the order after discounts and taxes. */
	total: Money;
};

export type OrderDiscountApplicationsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type OrderLineItemsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type OrderMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type OrderPaymentsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type OrderAddress = BaseAddress & {
	/** The first line of the address. Typically the street address or PO Box number. */
	address1?: Maybe<Scalars["String"]["output"]>;
	/** The second line of the address. Typically the number of the apartment, suite, or unit. */
	address2?: Maybe<Scalars["String"]["output"]>;
	/** Name of the city. */
	city?: Maybe<Scalars["String"]["output"]>;
	/** Name of the company. */
	company?: Maybe<Scalars["String"]["output"]>;
	/** Two-digit country code as per  ISO 3166-1 alpha-2 */
	countryCode?: Maybe<Scalars["String"]["output"]>;
	/** Email address of the contact. */
	email?: Maybe<Scalars["String"]["output"]>;
	/** Given name (first name) of the contact. */
	firstName?: Maybe<Scalars["String"]["output"]>;
	/** Formatted address. */
	formatted?: Maybe<Scalars["String"]["output"]>;
	/** The unique identifier of the address. */
	id: Scalars["ID"]["output"];
	/** Family name (last name) of the contact. */
	lastName?: Maybe<Scalars["String"]["output"]>;
	metadata: Array<MetadataItem>;
	/** Phone number of the contact. */
	phone?: Maybe<Scalars["String"]["output"]>;
	/** Postal code. */
	postalCode?: Maybe<Scalars["String"]["output"]>;
	/** Name of the state, for example, Colorado. */
	state?: Maybe<Scalars["String"]["output"]>;
};

export type OrderAddressMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/** A connection to a list of items. */
export type OrderConnection = {
	/** A list of edges. */
	edges?: Maybe<Array<OrderEdge>>;
	/** A flattened list of the nodes */
	nodes?: Maybe<Array<Order>>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
	/** Identifies the total count of items in the connection. */
	totalCount: Scalars["Int"]["output"];
};

export type OrderEdge = {
	/** A cursor for use in pagination. */
	cursor: Scalars["String"]["output"];
	/** The item at the end of the edge. */
	node: Order;
};

/**
 * Represents a line item in a order, which includes details about the product, variant, and any associated discounts.
 *
 * Each line item contains information such as the product name, variant details, total price, and any applicable discounts. This allows for detailed tracking of items within a cart, including their pricing and discount applications.
 */
export type OrderLineItem = Node & {
	discountApplications: DiscountApplicationConnection;
	/** The unique identifier of the line item */
	id: Scalars["ID"]["output"];
	metadata: Array<MetadataItem>;
	product?: Maybe<Product>;
	/** The unique identifier of the product associated with the order line item. */
	productId: Scalars["ID"]["output"];
	/** The name of the product. */
	productName: Scalars["String"]["output"];
	/** Retrieves the slug of the product associated with a order line item. This is useful for generating URLs or displaying product information. */
	productSlug: Scalars["String"]["output"];
	/** Gets the quantity of the order line item. */
	quantity: Scalars["Int"]["output"];
	/** Retrieves the SKU (Stock Keeping Unit) of the variant associated with a order line item. The SKU is a unique identifier for the variant, often used for inventory management. */
	sku: Scalars["String"]["output"];
	/** The line items total excluding discounts and taxes. */
	subtotal: Money;
	/** Gets the tax behavior of the order line item, which indicates how taxes are applied to the item. */
	taxBehavior: TaxBehavior;
	/** Retrieves the tax rate applied to the order line item. This may be null if the line item does not have a tax rate defined. */
	taxRate?: Maybe<TaxRate>;
	/** Gets the taxed price of the `LineItem`. This may be null if the `LineItem` does not yet have a taxed price. */
	taxedPrice?: Maybe<TaxedPrice>;
	/** The total amount for the order line item. */
	total: Money;
	/** Gets the unit price of the order line item. */
	unitPrice: UnitPrice;
	variant?: Maybe<ProductVariant>;
	/** The unique identifier of the variant associated with the order line item. */
	variantId: Scalars["ID"]["output"];
	/** Retrieves the name of the variant associated with a order line item. This is useful for displaying the specific variant details to the user. */
	variantName: Scalars["String"]["output"];
};

/**
 * Represents a line item in a order, which includes details about the product, variant, and any associated discounts.
 *
 * Each line item contains information such as the product name, variant details, total price, and any applicable discounts. This allows for detailed tracking of items within a cart, including their pricing and discount applications.
 */
export type OrderLineItemDiscountApplicationsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
};

/**
 * Represents a line item in a order, which includes details about the product, variant, and any associated discounts.
 *
 * Each line item contains information such as the product name, variant details, total price, and any applicable discounts. This allows for detailed tracking of items within a cart, including their pricing and discount applications.
 */
export type OrderLineItemMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/** A connection to a list of items. */
export type OrderLineItemConnection = {
	/** A list of edges. */
	edges?: Maybe<Array<OrderLineItemEdge>>;
	/** A flattened list of the nodes */
	nodes?: Maybe<Array<OrderLineItem>>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
	/** Identifies the total count of items in the connection. */
	totalCount: Scalars["Int"]["output"];
};

export type OrderLineItemEdge = {
	/** A cursor for use in pagination. */
	cursor: Scalars["String"]["output"];
	/** The item at the end of the edge. */
	node: OrderLineItem;
};

/** Represents a shipping line applied to an order. */
export type OrderShippingLine = Node & {
	/** The unique identifier of the order shipping line. */
	id: Scalars["ID"]["output"];
	/** The shipping method associated with this shipping line. */
	shippingMethod: LineShippingMethod;
	/** The total amount for the shipping line before discounts and tax. */
	subtotal: Money;
	/** The tax behavior applied when calculating this shipping line. */
	taxBehavior: TaxBehavior;
	/** The tax rate used for this shipping line, if available. */
	taxRate?: Maybe<TaxRate>;
	/** The taxed prices (net, gross, tax) for this shipping line, if calculated. */
	taxedPrice?: Maybe<TaxedPrice>;
	/** The total amount charged for the shipping line after adjustments. */
	total: Money;
};

export enum OrderSortKeys {
	CreatedAt = "CREATED_AT",
	Id = "ID",
	OrderNumber = "ORDER_NUMBER",
}

export enum OrderState {
	Cancelled = "CANCELLED",
	Complete = "COMPLETE",
	Confirmed = "CONFIRMED",
	Open = "OPEN",
}

/** A cursor that points to a specific page. */
export type PageCursor = {
	/** The cursor. */
	cursor: Scalars["String"]["output"];
	/** The page number. */
	page: Scalars["Int"]["output"];
};

/** Information about pagination in a connection. */
export type PageInfo = {
	/** A list of cursors to continue paginating backwards. */
	backwardCursors: Array<PageCursor>;
	/** When paginating forwards, the cursor to continue. */
	endCursor?: Maybe<Scalars["String"]["output"]>;
	/** A list of cursors to continue paginating forwards. */
	forwardCursors: Array<PageCursor>;
	/** Indicates whether more edges exist following the set defined by the clients arguments. */
	hasNextPage: Scalars["Boolean"]["output"];
	/** Indicates whether more edges exist prior the set defined by the clients arguments. */
	hasPreviousPage: Scalars["Boolean"]["output"];
	/** When paginating backwards, the cursor to continue. */
	startCursor?: Maybe<Scalars["String"]["output"]>;
};

export type Payment = Node & {
	id: Scalars["ID"]["output"];
	intendedAmount: Money;
	paidAmount: Money;
	refundedAmount: Money;
};

/** A connection to a list of items. */
export type PaymentConnection = {
	/** A list of edges. */
	edges?: Maybe<Array<PaymentEdge>>;
	/** A flattened list of the nodes */
	nodes?: Maybe<Array<Payment>>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
	/** Identifies the total count of items in the connection. */
	totalCount: Scalars["Int"]["output"];
};

export type PaymentEdge = {
	/** A cursor for use in pagination. */
	cursor: Scalars["String"]["output"];
	/** The item at the end of the edge. */
	node: Payment;
};

export type PaymentGateway = {
	id: Scalars["ID"]["output"];
	name: Scalars["String"]["output"];
};

export type PaymentGatewayChannelMismatchError = UserError & {
	message: Scalars["String"]["output"];
};

/** A connection to a list of items. */
export type PaymentGatewayConnection = {
	/** A list of edges. */
	edges?: Maybe<Array<PaymentGatewayEdge>>;
	/** A flattened list of the nodes */
	nodes?: Maybe<Array<PaymentGateway>>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
	/** Identifies the total count of items in the connection. */
	totalCount: Scalars["Int"]["output"];
};

export type PaymentGatewayEdge = {
	/** A cursor for use in pagination. */
	cursor: Scalars["String"]["output"];
	/** The item at the end of the edge. */
	node: PaymentGateway;
};

export type PaymentGatewayNotFoundError = UserError & {
	message: Scalars["String"]["output"];
};

export type PaymentGatewaySessionInitializeFailedError = UserError & {
	message: Scalars["String"]["output"];
};

export type PaymentSession = {
	/** The unique identifier of the payment session. */
	id: Scalars["ID"]["output"];
	paymentGateway: PaymentGateway;
};

export enum PaymentState {
	Authorized = "AUTHORIZED",
	BalanceDue = "BALANCE_DUE",
	Failed = "FAILED",
	Overpaid = "OVERPAID",
	Paid = "PAID",
	PartiallyAuthorized = "PARTIALLY_AUTHORIZED",
	PartiallyRefunded = "PARTIALLY_REFUNDED",
	Pending = "PENDING",
	Refunded = "REFUNDED",
}

export type PostalCodeInfo = {
	exampleList: Array<Scalars["String"]["output"]>;
	examples: Scalars["String"]["output"];
	fieldName: Scalars["String"]["output"];
	isRequired: Scalars["Boolean"]["output"];
	regex: Scalars["String"]["output"];
};

export type Price = Node & {
	/** The discounted price, if applicable. This is the price after any discounts have been applied. */
	discountedPrice?: Maybe<DiscountedPrice>;
	/** The unique identifier of the price. */
	id: Scalars["ID"]["output"];
	/** The tax behavior of the product variant price. */
	taxBehavior: TaxBehavior;
	/** The Date and Time when the price becomes valid. */
	validFrom?: Maybe<Scalars["DateTime"]["output"]>;
	/** The Date and Time when the price becomes invalid. */
	validUntil?: Maybe<Scalars["DateTime"]["output"]>;
	/** The value of the original price. This does not contains discounts. */
	value: Money;
};

/**
 * Represents a product in Thor Commerce, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each product includes core details such as title, rich description, pricing, media assets, and customizable options (e.g., size, color). Variants enable multiple versions of a product with distinct attributes and prices. You can add or update images, videos, and other media to enrich the customer experience. Products can be organized into categories for intuitive browsing and discovery.
 */
export type Product = Node & {
	attributeAssignments: Array<AttributeAssignment>;
	categories: CategoryConnection;
	collections: CollectionConnection;
	/** The description of the product. */
	description?: Maybe<Scalars["String"]["output"]>;
	heroVariant?: Maybe<ProductVariant>;
	/** The unique identifier of the product. */
	id: Scalars["ID"]["output"];
	metadata: Array<MetadataItem>;
	/** The name of the product. */
	name: Scalars["String"]["output"];
	priceRange?: Maybe<ProductPriceRange>;
	/** The slug of the product, which is a URL-friendly identifier. */
	slug: Scalars["String"]["output"];
	tags: Array<Scalars["String"]["output"]>;
	variants: ProductVariantConnection;
	variantsCount: Scalars["Long"]["output"];
	/** The vendor of the product. */
	vendor?: Maybe<Scalars["String"]["output"]>;
};

/**
 * Represents a product in Thor Commerce, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each product includes core details such as title, rich description, pricing, media assets, and customizable options (e.g., size, color). Variants enable multiple versions of a product with distinct attributes and prices. You can add or update images, videos, and other media to enrich the customer experience. Products can be organized into categories for intuitive browsing and discovery.
 */
export type ProductCategoriesArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
	sortDirection?: SortDirection;
	sortKey?: CategorySortKeys;
};

/**
 * Represents a product in Thor Commerce, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each product includes core details such as title, rich description, pricing, media assets, and customizable options (e.g., size, color). Variants enable multiple versions of a product with distinct attributes and prices. You can add or update images, videos, and other media to enrich the customer experience. Products can be organized into categories for intuitive browsing and discovery.
 */
export type ProductCollectionsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
};

/**
 * Represents a product in Thor Commerce, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each product includes core details such as title, rich description, pricing, media assets, and customizable options (e.g., size, color). Variants enable multiple versions of a product with distinct attributes and prices. You can add or update images, videos, and other media to enrich the customer experience. Products can be organized into categories for intuitive browsing and discovery.
 */
export type ProductMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/**
 * Represents a product in Thor Commerce, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each product includes core details such as title, rich description, pricing, media assets, and customizable options (e.g., size, color). Variants enable multiple versions of a product with distinct attributes and prices. You can add or update images, videos, and other media to enrich the customer experience. Products can be organized into categories for intuitive browsing and discovery.
 */
export type ProductVariantsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
};

export enum ProductAttributeType {
	Swatch = "SWATCH",
	Text = "TEXT",
}

export enum ProductCategorySortKeys {
	Id = "ID",
	Manual = "MANUAL",
	Name = "NAME",
	Price = "PRICE",
	Vendor = "VENDOR",
}

export enum ProductCollectionSortKeys {
	Id = "ID",
	Manual = "MANUAL",
	Name = "NAME",
	Price = "PRICE",
	Vendor = "VENDOR",
}

/** Represents a discounted price for a product variant. */
export type ProductDiscount = Node & {
	/** Gets the ID of the product discount. */
	id: Scalars["ID"]["output"];
	/** The name of the product discount. */
	name: Scalars["String"]["output"];
	/** Gets the date and time when the product discount becomes valid. */
	validFrom?: Maybe<Scalars["DateTime"]["output"]>;
	/** Gets the date and time when the product discount is no longer valid. */
	validUntil?: Maybe<Scalars["DateTime"]["output"]>;
	value: ProductDiscountValue;
};

/** Represents an absolute discount value for a product variant. */
export type ProductDiscountAbsoluteValue = {
	value?: Maybe<Money>;
};

/** Represents a relative discount value for a product variant. */
export type ProductDiscountRelativeValue = {
	/** Gets the factor of the relative discount value. */
	factor: Scalars["Decimal"]["output"];
};

export type ProductDiscountValue = ProductDiscountAbsoluteValue | ProductDiscountRelativeValue;

export type ProductPriceRange = {
	/** Gets the maximum price of the product in the specified currency. */
	maxPrice: Price;
	/** Gets the minimum price of the product in the specified currency. */
	minPrice: Price;
};

export enum ProductSortKeys {
	Id = "ID",
	Name = "NAME",
	Price = "PRICE",
	Vendor = "VENDOR",
}

export type ProductVariant = Node & {
	availability?: Maybe<ProductVariantAvailability>;
	/** The barcode (for example, ISBN, UPC, or GTIN) associated with the variant. */
	barcode?: Maybe<Scalars["String"]["output"]>;
	/** Gets the unique identifier of the variant. */
	id: Scalars["ID"]["output"];
	image?: Maybe<Media>;
	media: MediaConnection;
	metadata: Array<MetadataItem>;
	/** The name of the variant. */
	name: Scalars["String"]["output"];
	price?: Maybe<Price>;
	product: Product;
	selectedAttributes: Array<SelectedAttribute>;
	/** Gets the SKU (Stock Keeping Unit) of the variant. */
	sku?: Maybe<Scalars["String"]["output"]>;
};

export type ProductVariantMediaArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ProductVariantMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type ProductVariantAvailability = {
	/** Indicates whether the variant is available for purchase in the current channel. If `Channel`, isn't specified, it will throw an exception. */
	availableForPurchase: Scalars["Boolean"]["output"];
	/** Number of items of the Product Variant that are in stock. */
	availableQuantity: Scalars["Int"]["output"];
	/** The stock policy for the inventory, which determines how stock is managed. */
	stockPolicy: StockPolicy;
};

/** A connection to a list of items. */
export type ProductVariantConnection = {
	/** A list of edges. */
	edges?: Maybe<Array<ProductVariantEdge>>;
	/** A flattened list of the nodes */
	nodes?: Maybe<Array<ProductVariant>>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
	/** Identifies the total count of items in the connection. */
	totalCount: Scalars["Int"]["output"];
};

export type ProductVariantEdge = {
	/** A cursor for use in pagination. */
	cursor: Scalars["String"]["output"];
	/** The item at the end of the edge. */
	node: ProductVariant;
};

export type ProductVariantNotFoundError = UserError & {
	message: Scalars["String"]["output"];
};

export enum ProductVariantSortKeys {
	Id = "ID",
	Name = "NAME",
	Sku = "SKU",
}

export type ProductsConnection = {
	aggregates: Array<Facet>;
	/** A list of edges. */
	edges?: Maybe<Array<ProductsEdge>>;
	facets: Array<Facet>;
	/** A flattened list of the nodes */
	nodes?: Maybe<Array<Product>>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
	/** Identifies the total count of items in the connection. */
	totalCount: Scalars["Int"]["output"];
};

export type ProductsEdge = {
	/** A cursor for use in pagination. */
	cursor: Scalars["String"]["output"];
	/** The item at the end of the edge. */
	node: Product;
};

export type Query = {
	cart?: Maybe<Cart>;
	categories: CategoryConnection;
	category?: Maybe<Category>;
	collection?: Maybe<Collection>;
	collections: CollectionConnection;
	countries: Array<CountryInfo>;
	customer?: Maybe<Customer>;
	node?: Maybe<Node>;
	order?: Maybe<Order>;
	paymentGateways: PaymentGatewayConnection;
	product?: Maybe<Product>;
	productVariants: ProductVariantConnection;
	products: ProductsConnection;
};

export type QueryCartArgs = {
	id: Scalars["ID"]["input"];
};

export type QueryCategoriesArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
	priceChannelId?: InputMaybe<Scalars["ID"]["input"]>;
	priceCountry?: InputMaybe<Scalars["String"]["input"]>;
	priceCurrency?: InputMaybe<Scalars["String"]["input"]>;
	sortDirection?: SortDirection;
	sortKey?: CategorySortKeys;
	storeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryCategoryArgs = {
	id?: InputMaybe<Scalars["ID"]["input"]>;
	path?: InputMaybe<Scalars["String"]["input"]>;
	priceChannelId?: InputMaybe<Scalars["ID"]["input"]>;
	priceCountry?: InputMaybe<Scalars["String"]["input"]>;
	priceCurrency?: InputMaybe<Scalars["String"]["input"]>;
	slug?: InputMaybe<Scalars["String"]["input"]>;
	storeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryCollectionArgs = {
	id?: InputMaybe<Scalars["ID"]["input"]>;
	priceChannelId?: InputMaybe<Scalars["ID"]["input"]>;
	priceCountry?: InputMaybe<Scalars["String"]["input"]>;
	priceCurrency?: InputMaybe<Scalars["String"]["input"]>;
	slug?: InputMaybe<Scalars["String"]["input"]>;
	storeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryCollectionsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryNodeArgs = {
	id: Scalars["ID"]["input"];
};

export type QueryOrderArgs = {
	id: Scalars["ID"]["input"];
};

export type QueryPaymentGatewaysArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	cartId: Scalars["ID"]["input"];
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryProductArgs = {
	id?: InputMaybe<Scalars["ID"]["input"]>;
	priceChannelId?: InputMaybe<Scalars["ID"]["input"]>;
	priceCountry?: InputMaybe<Scalars["String"]["input"]>;
	priceCurrency?: InputMaybe<Scalars["String"]["input"]>;
	slug?: InputMaybe<Scalars["String"]["input"]>;
	storeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryProductVariantsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
	priceChannelId?: InputMaybe<Scalars["ID"]["input"]>;
	priceCountry?: InputMaybe<Scalars["String"]["input"]>;
	priceCurrency?: InputMaybe<Scalars["String"]["input"]>;
	query?: InputMaybe<Scalars["String"]["input"]>;
	sortDirection?: SortDirection;
	sortKey?: ProductVariantSortKeys;
	storeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryProductsArgs = {
	after?: InputMaybe<Scalars["String"]["input"]>;
	before?: InputMaybe<Scalars["String"]["input"]>;
	first?: InputMaybe<Scalars["Int"]["input"]>;
	last?: InputMaybe<Scalars["Int"]["input"]>;
	priceChannelId?: InputMaybe<Scalars["ID"]["input"]>;
	priceCountry?: InputMaybe<Scalars["String"]["input"]>;
	priceCurrency?: InputMaybe<Scalars["String"]["input"]>;
	query?: InputMaybe<Scalars["String"]["input"]>;
	sortDirection?: SortDirection;
	sortKey?: ProductSortKeys;
	storeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type RelativeShippingMethodRate = CartAvailableShippingMethodRate & {
	/** The unique identifier for the shipping method rate. */
	id: Scalars["ID"]["output"];
	rate: Scalars["Float"]["output"];
};

export type RelativeValue = {
	/** The percentage value of the relative value. */
	percentage: Scalars["Decimal"]["output"];
};

export enum ReplicationStrategy {
	PartialReplication = "PARTIAL_REPLICATION",
	SkipUnavailable = "SKIP_UNAVAILABLE",
	Strict = "STRICT",
}

export type SelectedAttribute = {
	attribute: Attribute;
	attributeValue: AttributeValue;
	name: Scalars["String"]["output"];
	value: Scalars["String"]["output"];
};

export enum ShipmentState {
	Cancelled = "CANCELLED",
	Delivered = "DELIVERED",
	Pending = "PENDING",
	Ready = "READY",
	Shipped = "SHIPPED",
}

export type ShippingMethod = Node & {
	/** The description of the shipping method. */
	description?: Maybe<Scalars["String"]["output"]>;
	/** The unique identifier of the shipping method. */
	id: Scalars["ID"]["output"];
	metadata: Array<MetadataItem>;
	/** The name of the shipping method. */
	name: Scalars["String"]["output"];
	/** The sku of the shipping method. */
	sku?: Maybe<Scalars["String"]["output"]>;
};

export type ShippingMethodMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type ShippingMethodNotFoundError = UserError & {
	message: Scalars["String"]["output"];
};

export enum SortDirection {
	Asc = "ASC",
	Desc = "DESC",
}

export enum StockPolicy {
	NotTracked = "NOT_TRACKED",
	Tracked = "TRACKED",
}

export type Store = {
	id: Scalars["ID"]["output"];
};

export type StripeConnectPaymentGateway = PaymentGateway & {
	connectedAccountId?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	liveMode: Scalars["Boolean"]["output"];
	name: Scalars["String"]["output"];
	publishableKey: Scalars["String"]["output"];
};

export type StripePaymentGateway = PaymentGateway & {
	id: Scalars["ID"]["output"];
	isTest: Scalars["Boolean"]["output"];
	name: Scalars["String"]["output"];
	publishableKey: Scalars["String"]["output"];
};

export type StripePaymentSession = PaymentSession & {
	clientSecret: Scalars["String"]["output"];
	/** The unique identifier of the payment session. */
	id: Scalars["ID"]["output"];
	paymentGateway: PaymentGateway;
	paymentIntentId: Scalars["String"]["output"];
};

export type SwatchAttributeValue = AttributeValue & {
	color?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	media?: Maybe<Media>;
	metadata: Array<MetadataItem>;
	/** The value of the attribute. */
	value: Scalars["String"]["output"];
};

export type SwatchAttributeValueMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export enum TaxBehavior {
	Exclusive = "EXCLUSIVE",
	Inclusive = "INCLUSIVE",
}

/** Represents a portion of a tax rate applied to a cart or line item, detailing the specific tax amount and its type. */
export type TaxPortion = {
	/** Gets the name of the tax portion, which describes the type of tax applied (e.g., VAT, sales tax). */
	name: Scalars["String"]["output"];
	/** Gets the amount of the tax portion, which is the specific tax amount applied to the cart or line item. */
	rate: Scalars["Decimal"]["output"];
};

/** Represents the tax rate applied to a cart or line item, including the rate and any applicable tax portions. */
export type TaxRate = {
	/** Gets the tax composition of the tax rate, which includes details about how the tax is structured. */
	composition: TaxRateComposition;
	/** The tax portions of the tax rate, which detail how the tax is divided among different components. */
	portions: Array<TaxPortion>;
	/** Gets the tax rate as a decimal value. */
	rate: Scalars["Decimal"]["output"];
	taxPortions: Array<TaxPortion>;
};

export enum TaxRateComposition {
	Additive = "ADDITIVE",
	Compound = "COMPOUND",
}

/** This type represents the taxed price of an item. If it is set to null, it means that the item has not had its taxed price calculated yet. */
export type TaxedPrice = {
	/** The total price including tax. */
	gross: Money;
	/** The total price excluding tax. */
	net: Money;
	/** The tax amount. */
	tax: Money;
};

export type TextAttributeValue = AttributeValue & {
	id: Scalars["ID"]["output"];
	metadata: Array<MetadataItem>;
	/** The value of the attribute. */
	value: Scalars["String"]["output"];
};

export type TextAttributeValueMetadataArgs = {
	keys?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

/**
 * Represents the unit price of a product or variant in a cart or order, including the monetary value and currency and potentially discounted price.
 *
 * The unit price is expressed in the smallest unit of the currency, allowing for precise calculations and display of product pricing.
 */
export type UnitPrice = {
	discountedPrice?: Maybe<DiscountedPrice>;
	/** Gets the tax behavior of the unit price. */
	taxBehavior: TaxBehavior;
	/** The monetary value in the smallest unit of the currency. */
	value: Money;
};

export type UpdateCartLineItemsInsufficientStockError = UserError & {
	message: Scalars["String"]["output"];
};

export type UserError = {
	message: Scalars["String"]["output"];
};

export type ZoneInfo = {
	code: Scalars["String"]["output"];
	name: Scalars["String"]["output"];
	postalCodeRegex?: Maybe<Scalars["String"]["output"]>;
};

export type CartFragment = {
	id: string;
	customerId?: string | null;
	lineItemsQuantity: number;
	shippingAddress?: { countryCode?: string | null } | null;
	lineItems: {
		edges?: Array<{
			node: {
				id: string;
				taxBehavior: TaxBehavior;
				variantName: string;
				variantId: string;
				productName: string;
				quantity: number;
				productSlug: string;
				variant?: {
					id: string;
					image?: { src: string } | null;
					selectedAttributes: Array<{ value: string }>;
					availability?: {
						availableForPurchase: boolean;
						availableQuantity: number;
						stockPolicy: StockPolicy;
					} | null;
				} | null;
				unitPrice: {
					value: { centAmount: number; currencyCode: string; fractionDigits: number };
					discountedPrice?: {
						value: { centAmount: number; currencyCode: string; fractionDigits: number };
					} | null;
				};
				discountApplications: {
					edges?: Array<{
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
	discountCodes: Array<{ code: string; error?: DiscountCodeError | null }>;
	subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
	taxedPrice?: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
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
	values: Array<{ name: string; count: number }>;
};

export type MoneyFragment = { centAmount: number; currencyCode: string; fractionDigits: number };

export type PriceFragment = {
	validFrom?: any | null;
	validUntil?: any | null;
	discountedPrice?: {
		discount?: {
			validFrom?: any | null;
			validUntil?: any | null;
			value:
				| {
						__typename: "ProductDiscountAbsoluteValue";
						value?: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
				  }
				| { __typename: "ProductDiscountRelativeValue"; factor: any };
		} | null;
		value: { centAmount: number; currencyCode: string; fractionDigits: number };
	} | null;
	value: { centAmount: number; currencyCode: string; fractionDigits: number };
};

export type ProductListTileFragment = {
	id: string;
	name: string;
	slug: string;
	heroVariant?: { image?: { src: string } | null } | null;
	priceRange?: {
		minPrice: {
			validFrom?: any | null;
			validUntil?: any | null;
			discountedPrice?: {
				discount?: {
					validFrom?: any | null;
					validUntil?: any | null;
					value:
						| {
								__typename: "ProductDiscountAbsoluteValue";
								value?: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
						  }
						| { __typename: "ProductDiscountRelativeValue"; factor: any };
				} | null;
				value: { centAmount: number; currencyCode: string; fractionDigits: number };
			} | null;
			value: { centAmount: number; currencyCode: string; fractionDigits: number };
		};
		maxPrice: {
			validFrom?: any | null;
			validUntil?: any | null;
			discountedPrice?: {
				discount?: {
					validFrom?: any | null;
					validUntil?: any | null;
					value:
						| {
								__typename: "ProductDiscountAbsoluteValue";
								value?: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
						  }
						| { __typename: "ProductDiscountRelativeValue"; factor: any };
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
		cart?: {
			id: string;
			customerId?: string | null;
			lineItemsQuantity: number;
			shippingAddress?: { countryCode?: string | null } | null;
			lineItems: {
				edges?: Array<{
					node: {
						id: string;
						taxBehavior: TaxBehavior;
						variantName: string;
						variantId: string;
						productName: string;
						quantity: number;
						productSlug: string;
						variant?: {
							id: string;
							image?: { src: string } | null;
							selectedAttributes: Array<{ value: string }>;
							availability?: {
								availableForPurchase: boolean;
								availableQuantity: number;
								stockPolicy: StockPolicy;
							} | null;
						} | null;
						unitPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
							discountedPrice?: {
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
						};
						discountApplications: {
							edges?: Array<{
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
			discountCodes: Array<{ code: string; error?: DiscountCodeError | null }>;
			subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
			taxedPrice?: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
	};
};

export type CartUpdateMutationVariables = Exact<{
	input: CartUpdateInput;
}>;

export type CartUpdateMutation = {
	cartUpdate: {
		cart?: {
			id: string;
			customerId?: string | null;
			lineItemsQuantity: number;
			shippingAddress?: { countryCode?: string | null } | null;
			lineItems: {
				edges?: Array<{
					node: {
						id: string;
						taxBehavior: TaxBehavior;
						variantName: string;
						variantId: string;
						productName: string;
						quantity: number;
						productSlug: string;
						variant?: {
							id: string;
							image?: { src: string } | null;
							selectedAttributes: Array<{ value: string }>;
							availability?: {
								availableForPurchase: boolean;
								availableQuantity: number;
								stockPolicy: StockPolicy;
							} | null;
						} | null;
						unitPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
							discountedPrice?: {
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
						};
						discountApplications: {
							edges?: Array<{
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
			discountCodes: Array<{ code: string; error?: DiscountCodeError | null }>;
			subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
			taxedPrice?: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
		errors?: Array<
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
		cart?: {
			id: string;
			customerId?: string | null;
			lineItemsQuantity: number;
			shippingAddress?: { countryCode?: string | null } | null;
			lineItems: {
				edges?: Array<{
					node: {
						id: string;
						taxBehavior: TaxBehavior;
						variantName: string;
						variantId: string;
						productName: string;
						quantity: number;
						productSlug: string;
						variant?: {
							id: string;
							image?: { src: string } | null;
							selectedAttributes: Array<{ value: string }>;
							availability?: {
								availableForPurchase: boolean;
								availableQuantity: number;
								stockPolicy: StockPolicy;
							} | null;
						} | null;
						unitPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
							discountedPrice?: {
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
						};
						discountApplications: {
							edges?: Array<{
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
			discountCodes: Array<{ code: string; error?: DiscountCodeError | null }>;
			subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
			taxedPrice?: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
	};
};

export type CartDiscountCodeAddMutationVariables = Exact<{
	input: CartDiscountCodeAddInput;
}>;

export type CartDiscountCodeAddMutation = {
	cartDiscountCodeAdd: {
		cart?: {
			id: string;
			customerId?: string | null;
			lineItemsQuantity: number;
			shippingAddress?: { countryCode?: string | null } | null;
			lineItems: {
				edges?: Array<{
					node: {
						id: string;
						taxBehavior: TaxBehavior;
						variantName: string;
						variantId: string;
						productName: string;
						quantity: number;
						productSlug: string;
						variant?: {
							id: string;
							image?: { src: string } | null;
							selectedAttributes: Array<{ value: string }>;
							availability?: {
								availableForPurchase: boolean;
								availableQuantity: number;
								stockPolicy: StockPolicy;
							} | null;
						} | null;
						unitPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
							discountedPrice?: {
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
						};
						discountApplications: {
							edges?: Array<{
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
			discountCodes: Array<{ code: string; error?: DiscountCodeError | null }>;
			subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
			taxedPrice?: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
		errors?: Array<
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
		cart?: {
			id: string;
			customerId?: string | null;
			lineItemsQuantity: number;
			shippingAddress?: { countryCode?: string | null } | null;
			lineItems: {
				edges?: Array<{
					node: {
						id: string;
						taxBehavior: TaxBehavior;
						variantName: string;
						variantId: string;
						productName: string;
						quantity: number;
						productSlug: string;
						variant?: {
							id: string;
							image?: { src: string } | null;
							selectedAttributes: Array<{ value: string }>;
							availability?: {
								availableForPurchase: boolean;
								availableQuantity: number;
								stockPolicy: StockPolicy;
							} | null;
						} | null;
						unitPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
							discountedPrice?: {
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
						};
						discountApplications: {
							edges?: Array<{
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
			discountCodes: Array<{ code: string; error?: DiscountCodeError | null }>;
			subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
			taxedPrice?: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
	};
};

export type CartLineItemsAddMutationVariables = Exact<{
	input: CartLineItemsAddInput;
}>;

export type CartLineItemsAddMutation = {
	cartLineItemsAdd: {
		cart?: {
			id: string;
			customerId?: string | null;
			lineItemsQuantity: number;
			shippingAddress?: { countryCode?: string | null } | null;
			lineItems: {
				edges?: Array<{
					node: {
						id: string;
						taxBehavior: TaxBehavior;
						variantName: string;
						variantId: string;
						productName: string;
						quantity: number;
						productSlug: string;
						variant?: {
							id: string;
							image?: { src: string } | null;
							selectedAttributes: Array<{ value: string }>;
							availability?: {
								availableForPurchase: boolean;
								availableQuantity: number;
								stockPolicy: StockPolicy;
							} | null;
						} | null;
						unitPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
							discountedPrice?: {
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
						};
						discountApplications: {
							edges?: Array<{
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
			discountCodes: Array<{ code: string; error?: DiscountCodeError | null }>;
			subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
			taxedPrice?: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
		errors?: Array<
			| { __typename: "CartLineItemPriceNotFoundError" }
			| { __typename: "CartLineItemsInsufficientStockError" }
			| { __typename: "CartNotFoundError" }
			| { __typename: "ProductVariantNotFoundError" }
		> | null;
	};
};

export type CartLineItemsUpdateMutationVariables = Exact<{
	input: CartLineItemsUpdateInput;
}>;

export type CartLineItemsUpdateMutation = {
	cartLineItemsUpdate: {
		cart?: {
			id: string;
			customerId?: string | null;
			lineItemsQuantity: number;
			shippingAddress?: { countryCode?: string | null } | null;
			lineItems: {
				edges?: Array<{
					node: {
						id: string;
						taxBehavior: TaxBehavior;
						variantName: string;
						variantId: string;
						productName: string;
						quantity: number;
						productSlug: string;
						variant?: {
							id: string;
							image?: { src: string } | null;
							selectedAttributes: Array<{ value: string }>;
							availability?: {
								availableForPurchase: boolean;
								availableQuantity: number;
								stockPolicy: StockPolicy;
							} | null;
						} | null;
						unitPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
							discountedPrice?: {
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
						};
						discountApplications: {
							edges?: Array<{
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
			discountCodes: Array<{ code: string; error?: DiscountCodeError | null }>;
			subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
			taxedPrice?: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
	};
};

export type CartLineItemsRemoveMutationVariables = Exact<{
	input: CartLineItemsRemoveInput;
}>;

export type CartLineItemsRemoveMutation = {
	cartLineItemsRemove: {
		cart?: {
			id: string;
			customerId?: string | null;
			lineItemsQuantity: number;
			shippingAddress?: { countryCode?: string | null } | null;
			lineItems: {
				edges?: Array<{
					node: {
						id: string;
						taxBehavior: TaxBehavior;
						variantName: string;
						variantId: string;
						productName: string;
						quantity: number;
						productSlug: string;
						variant?: {
							id: string;
							image?: { src: string } | null;
							selectedAttributes: Array<{ value: string }>;
							availability?: {
								availableForPurchase: boolean;
								availableQuantity: number;
								stockPolicy: StockPolicy;
							} | null;
						} | null;
						unitPrice: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
							discountedPrice?: {
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
						};
						discountApplications: {
							edges?: Array<{
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
			discountCodes: Array<{ code: string; error?: DiscountCodeError | null }>;
			subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
			taxedPrice?: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
	};
};

export type CartShippingLinesSetMutationVariables = Exact<{
	input: CartShippingLinesSetInput;
}>;

export type CartShippingLinesSetMutation = {
	cartShippingLinesSet: {
		cart?: {
			id: string;
			shippingLines: Array<{ id: string; shippingMethod: { id: string; name: string } }>;
		} | null;
		errors?: Array<
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
		cart?: {
			id: string;
			paymentSession?: {
				__typename: "StripePaymentSession";
				clientSecret: string;
				id: string;
				paymentGateway:
					| { id: string; name: string; type: "ManualPaymentGateway" }
					| {
							connectedAccountId?: string | null;
							publishableKey: string;
							id: string;
							name: string;
							type: "StripeConnectPaymentGateway";
					  }
					| { publishableKey: string; id: string; name: string; type: "StripePaymentGateway" };
			} | null;
		} | null;
		errors?: Array<
			| { message: string; code: "CartNotFoundError" }
			| { message: string; code: "PaymentGatewayChannelMismatchError" }
			| { message: string; code: "PaymentGatewayNotFoundError" }
			| { message: string; code: "PaymentGatewaySessionInitializeFailedError" }
		> | null;
	};
};

export type CartCompleteMutationVariables = Exact<{
	input: CartCompleteInput;
}>;

export type CartCompleteMutation = {
	cartComplete: {
		order?: { id: string } | null;
		errors?: Array<
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
		customer?: { id: string } | null;
		errors?: Array<
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
	customerRegister: { errors?: Array<{ code: "CustomerRegisterFailedError" }> | null };
};

export type CustomerResetPasswordTokenMutationVariables = Exact<{
	input: CustomerPasswordResetTokenInput;
}>;

export type CustomerResetPasswordTokenMutation = {
	customerPasswordResetToken: { errors?: Array<{ code: "InvalidCredentialsError" }> | null };
};

export type CustomerResetPasswordMutationVariables = Exact<{
	input: CustomerPasswordResetInput;
}>;

export type CustomerResetPasswordMutation = {
	customerPasswordReset: {
		errors?: Array<{ code: "InvalidPasswordError" } | { code: "InvalidTokenError" }> | null;
	};
};

export type CartQueryVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type CartQuery = {
	cart?: {
		id: string;
		customerId?: string | null;
		lineItemsQuantity: number;
		shippingAddress?: { countryCode?: string | null } | null;
		lineItems: {
			edges?: Array<{
				node: {
					id: string;
					taxBehavior: TaxBehavior;
					variantName: string;
					variantId: string;
					productName: string;
					quantity: number;
					productSlug: string;
					variant?: {
						id: string;
						image?: { src: string } | null;
						selectedAttributes: Array<{ value: string }>;
						availability?: {
							availableForPurchase: boolean;
							availableQuantity: number;
							stockPolicy: StockPolicy;
						} | null;
					} | null;
					unitPrice: {
						value: { centAmount: number; currencyCode: string; fractionDigits: number };
						discountedPrice?: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						} | null;
					};
					discountApplications: {
						edges?: Array<{
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
		discountCodes: Array<{ code: string; error?: DiscountCodeError | null }>;
		subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
		taxedPrice?: { tax: { centAmount: number; currencyCode: string; fractionDigits: number } } | null;
		total: { centAmount: number; currencyCode: string; fractionDigits: number };
	} | null;
};

export type CategoriesQueryVariables = Exact<{
	storeId: Scalars["ID"]["input"];
	currency: Scalars["String"]["input"];
}>;

export type CategoriesQuery = {
	categories: {
		edges?: Array<{
			node: {
				id: string;
				name: string;
				slug: string;
				childrenCount: number;
				products: { totalCount: number };
			};
		}> | null;
	};
};

export type CategoryListQueryVariables = Exact<{
	slug: Scalars["String"]["input"];
	currency: Scalars["String"]["input"];
	storeId: Scalars["ID"]["input"];
	after?: InputMaybe<Scalars["String"]["input"]>;
	sortDirection: SortDirection;
	sortKey: ProductCategorySortKeys;
	query?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type CategoryListQuery = {
	category?: {
		id: string;
		name: string;
		slug: string;
		ancestors: Array<{ slug: string; name: string }>;
		products: {
			totalCount: number;
			facets: Array<{ field: FacetField; name: string; values: Array<{ name: string; count: number }> }>;
			edges?: Array<{
				node: {
					id: string;
					name: string;
					slug: string;
					heroVariant?: { image?: { src: string } | null } | null;
					priceRange?: {
						minPrice: {
							validFrom?: any | null;
							validUntil?: any | null;
							discountedPrice?: {
								discount?: {
									validFrom?: any | null;
									validUntil?: any | null;
									value:
										| {
												__typename: "ProductDiscountAbsoluteValue";
												value?: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
										  }
										| { __typename: "ProductDiscountRelativeValue"; factor: any };
								} | null;
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						};
						maxPrice: {
							validFrom?: any | null;
							validUntil?: any | null;
							discountedPrice?: {
								discount?: {
									validFrom?: any | null;
									validUntil?: any | null;
									value:
										| {
												__typename: "ProductDiscountAbsoluteValue";
												value?: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
										  }
										| { __typename: "ProductDiscountRelativeValue"; factor: any };
								} | null;
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						};
					} | null;
				};
			}> | null;
			pageInfo: { endCursor?: string | null; hasNextPage: boolean };
		};
	} | null;
};

export type CheckoutCartQueryVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type CheckoutCartQuery = {
	cart?: {
		id: string;
		customerId?: string | null;
		customerEmail?: string | null;
		lineItemsQuantity: number;
		metadata: Array<{ key: string; value: string }>;
		shippingAddress?: {
			firstName?: string | null;
			lastName?: string | null;
			company?: string | null;
			address1?: string | null;
			address2?: string | null;
			city?: string | null;
			postalCode?: string | null;
			state?: string | null;
			countryCode?: string | null;
			phone?: string | null;
			formatted?: string | null;
		} | null;
		billingAddress?: {
			firstName?: string | null;
			lastName?: string | null;
			company?: string | null;
			address1?: string | null;
			address2?: string | null;
			city?: string | null;
			postalCode?: string | null;
			state?: string | null;
			countryCode?: string | null;
			phone?: string | null;
			formatted?: string | null;
		} | null;
		availableShippingMethods: Array<{
			id: string;
			name: string;
			description?: string | null;
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
			taxedPrice?: {
				gross: { centAmount: number; currencyCode: string; fractionDigits: number };
				net: { centAmount: number; currencyCode: string; fractionDigits: number };
				tax: { centAmount: number; currencyCode: string; fractionDigits: number };
			} | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		}>;
		paymentSession?: {
			__typename: "StripePaymentSession";
			clientSecret: string;
			id: string;
			paymentGateway:
				| { id: string; name: string; type: "ManualPaymentGateway" }
				| {
						connectedAccountId?: string | null;
						publishableKey: string;
						id: string;
						name: string;
						type: "StripeConnectPaymentGateway";
				  }
				| { publishableKey: string; id: string; name: string; type: "StripePaymentGateway" };
		} | null;
		lineItems: {
			edges?: Array<{
				node: {
					id: string;
					taxBehavior: TaxBehavior;
					variantName: string;
					variantId: string;
					productName: string;
					quantity: number;
					productSlug: string;
					variant?: {
						id: string;
						image?: { src: string } | null;
						selectedAttributes: Array<{ value: string }>;
						availability?: {
							availableForPurchase: boolean;
							availableQuantity: number;
							stockPolicy: StockPolicy;
						} | null;
					} | null;
					unitPrice: {
						value: { centAmount: number; currencyCode: string; fractionDigits: number };
						discountedPrice?: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						} | null;
					};
					discountApplications: {
						edges?: Array<{
							node: {
								label: string;
								discountedAmount: { centAmount: number; currencyCode: string; fractionDigits: number };
							};
						}> | null;
					};
					taxedPrice?: {
						gross: { centAmount: number; currencyCode: string; fractionDigits: number };
						net: { centAmount: number; currencyCode: string; fractionDigits: number };
						tax: { centAmount: number; currencyCode: string; fractionDigits: number };
					} | null;
					total: { centAmount: number; currencyCode: string; fractionDigits: number };
				};
			}> | null;
		};
		discountCodes: Array<{ code: string; error?: DiscountCodeError | null }>;
		subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
		taxedPrice?: {
			tax: { centAmount: number; currencyCode: string; fractionDigits: number };
			net: { centAmount: number; currencyCode: string; fractionDigits: number };
			gross: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
		total: { centAmount: number; currencyCode: string; fractionDigits: number };
	} | null;
};

export type PaymentGatewaysQueryVariables = Exact<{
	cartId: Scalars["ID"]["input"];
}>;

export type PaymentGatewaysQuery = {
	paymentGateways: {
		edges?: Array<{
			node:
				| { id: string; name: string; type: "ManualPaymentGateway" }
				| { id: string; name: string; type: "StripeConnectPaymentGateway" }
				| { id: string; name: string; type: "StripePaymentGateway" };
		}> | null;
	};
};

export type CollectionsQueryVariables = Exact<{
	storeId: Scalars["ID"]["input"];
	currency: Scalars["String"]["input"];
}>;

export type CollectionsQuery = {
	collections: {
		edges?: Array<{
			node: { id: string; name: string; slug: string; products: { totalCount: number } };
		}> | null;
	};
};

export type CollectionListQueryVariables = Exact<{
	slug: Scalars["String"]["input"];
	currency: Scalars["String"]["input"];
	storeId: Scalars["ID"]["input"];
	after?: InputMaybe<Scalars["String"]["input"]>;
	sortDirection: SortDirection;
	sortKey: ProductCollectionSortKeys;
}>;

export type CollectionListQuery = {
	collection?: {
		id: string;
		name: string;
		products: {
			totalCount: number;
			edges?: Array<{
				node: {
					id: string;
					name: string;
					slug: string;
					heroVariant?: { image?: { src: string } | null } | null;
					priceRange?: {
						minPrice: {
							validFrom?: any | null;
							validUntil?: any | null;
							discountedPrice?: {
								discount?: {
									validFrom?: any | null;
									validUntil?: any | null;
									value:
										| {
												__typename: "ProductDiscountAbsoluteValue";
												value?: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
										  }
										| { __typename: "ProductDiscountRelativeValue"; factor: any };
								} | null;
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						};
						maxPrice: {
							validFrom?: any | null;
							validUntil?: any | null;
							discountedPrice?: {
								discount?: {
									validFrom?: any | null;
									validUntil?: any | null;
									value:
										| {
												__typename: "ProductDiscountAbsoluteValue";
												value?: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
										  }
										| { __typename: "ProductDiscountRelativeValue"; factor: any };
								} | null;
								value: { centAmount: number; currencyCode: string; fractionDigits: number };
							} | null;
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						};
					} | null;
				};
			}> | null;
			pageInfo: { endCursor?: string | null; hasNextPage: boolean };
		};
	} | null;
};

export type CurrentCustomerQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentCustomerQuery = {
	customer?: {
		id: string;
		email?: string | null;
		firstName?: string | null;
		lastName?: string | null;
		defaultShippingAddress?: {
			id: string;
			firstName?: string | null;
			lastName?: string | null;
			company?: string | null;
			address1?: string | null;
			address2?: string | null;
			city?: string | null;
			postalCode?: string | null;
			state?: string | null;
			countryCode?: string | null;
			phone?: string | null;
		} | null;
		defaultBillingAddress?: {
			id: string;
			firstName?: string | null;
			lastName?: string | null;
			company?: string | null;
			address1?: string | null;
			address2?: string | null;
			city?: string | null;
			postalCode?: string | null;
			state?: string | null;
			countryCode?: string | null;
			phone?: string | null;
		} | null;
		addresses: {
			edges?: Array<{
				node: {
					id: string;
					firstName?: string | null;
					lastName?: string | null;
					company?: string | null;
					address1?: string | null;
					address2?: string | null;
					city?: string | null;
					postalCode?: string | null;
					state?: string | null;
					countryCode?: string | null;
					phone?: string | null;
				};
			}> | null;
		};
	} | null;
};

export type HomePageQueryVariables = Exact<{
	storeId: Scalars["ID"]["input"];
	currency: Scalars["String"]["input"];
}>;

export type HomePageQuery = {
	categories: {
		edges?: Array<{ node: { id: string; name: string; slug: string; productsCount: number } }> | null;
	};
	collections: {
		edges?: Array<{
			node: { id: string; name: string; slug: string; products: { totalCount: number } };
		}> | null;
	};
	products: {
		edges?: Array<{
			node: {
				id: string;
				name: string;
				slug: string;
				heroVariant?: { image?: { src: string } | null } | null;
				priceRange?: {
					minPrice: {
						value: { centAmount: number; currencyCode: string; fractionDigits: number };
						discountedPrice?: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						} | null;
					};
				} | null;
			};
		}> | null;
	};
};

export type OrderQueryVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type OrderQuery = {
	order?: {
		id: string;
		orderNumber: number;
		lineItems: {
			edges?: Array<{
				node: {
					id: string;
					taxBehavior: TaxBehavior;
					variantName: string;
					variantId: string;
					productName: string;
					quantity: number;
					productSlug: string;
					variant?: {
						id: string;
						image?: { src: string } | null;
						selectedAttributes: Array<{ value: string }>;
					} | null;
					unitPrice: {
						value: { centAmount: number; currencyCode: string; fractionDigits: number };
						discountedPrice?: {
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						} | null;
					};
					discountApplications: {
						edges?: Array<{
							node: {
								label: string;
								discountedAmount: { centAmount: number; currencyCode: string; fractionDigits: number };
							};
						}> | null;
					};
					taxedPrice?: {
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
			taxedPrice?: {
				gross: { centAmount: number; currencyCode: string; fractionDigits: number };
				net: { centAmount: number; currencyCode: string; fractionDigits: number };
				tax: { centAmount: number; currencyCode: string; fractionDigits: number };
			} | null;
			total: { centAmount: number; currencyCode: string; fractionDigits: number };
		}>;
		subtotal: { centAmount: number; currencyCode: string; fractionDigits: number };
		taxedPrice?: {
			tax: { centAmount: number; currencyCode: string; fractionDigits: number };
			net: { centAmount: number; currencyCode: string; fractionDigits: number };
			gross: { centAmount: number; currencyCode: string; fractionDigits: number };
		} | null;
		total: { centAmount: number; currencyCode: string; fractionDigits: number };
	} | null;
};

export type ProductListQueryVariables = Exact<{
	storeId: Scalars["ID"]["input"];
	currency: Scalars["String"]["input"];
	sortDirection: SortDirection;
	sortKey: ProductSortKeys;
	priceChannel?: InputMaybe<Scalars["ID"]["input"]>;
	query?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type ProductListQuery = {
	products: {
		totalCount: number;
		facets: Array<{ field: FacetField; name: string; values: Array<{ name: string; count: number }> }>;
		edges?: Array<{
			node: {
				id: string;
				name: string;
				slug: string;
				heroVariant?: { image?: { src: string } | null } | null;
				priceRange?: {
					minPrice: {
						validFrom?: any | null;
						validUntil?: any | null;
						discountedPrice?: {
							discount?: {
								validFrom?: any | null;
								validUntil?: any | null;
								value:
									| {
											__typename: "ProductDiscountAbsoluteValue";
											value?: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
									  }
									| { __typename: "ProductDiscountRelativeValue"; factor: any };
							} | null;
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						} | null;
						value: { centAmount: number; currencyCode: string; fractionDigits: number };
					};
					maxPrice: {
						validFrom?: any | null;
						validUntil?: any | null;
						discountedPrice?: {
							discount?: {
								validFrom?: any | null;
								validUntil?: any | null;
								value:
									| {
											__typename: "ProductDiscountAbsoluteValue";
											value?: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
									  }
									| { __typename: "ProductDiscountRelativeValue"; factor: any };
							} | null;
							value: { centAmount: number; currencyCode: string; fractionDigits: number };
						} | null;
						value: { centAmount: number; currencyCode: string; fractionDigits: number };
					};
				} | null;
			};
		}> | null;
		pageInfo: { endCursor?: string | null; hasNextPage: boolean };
	};
};

export type ProductDetailQueryVariables = Exact<{
	slug: Scalars["String"]["input"];
	currency?: InputMaybe<Scalars["String"]["input"]>;
	store: Scalars["ID"]["input"];
	priceChannel?: InputMaybe<Scalars["ID"]["input"]>;
}>;

export type ProductDetailQuery = {
	product?: {
		id: string;
		name: string;
		description?: string | null;
		categories: {
			edges?: Array<{
				node: {
					id: string;
					name: string;
					slug: string;
					ancestors: Array<{ id: string; name: string; slug: string }>;
				};
			}> | null;
		};
		variants: {
			edges?: Array<{
				node: {
					id: string;
					name: string;
					sku?: string | null;
					media: { edges?: Array<{ node: { id: string; src: string } }> | null };
					price?: {
						validFrom?: any | null;
						validUntil?: any | null;
						discountedPrice?: {
							discount?: {
								validFrom?: any | null;
								validUntil?: any | null;
								value:
									| {
											__typename: "ProductDiscountAbsoluteValue";
											value?: { centAmount: number; currencyCode: string; fractionDigits: number } | null;
									  }
									| { __typename: "ProductDiscountRelativeValue"; factor: any };
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
export const CartFragmentDoc = new TypedDocumentString(
	`
    fragment Cart on Cart {
  id
  customerId
  shippingAddress {
    countryCode
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
    image {
      src
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
    fragment Cart on Cart {
  id
  customerId
  shippingAddress {
    countryCode
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
    fragment Cart on Cart {
  id
  customerId
  shippingAddress {
    countryCode
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
    fragment Cart on Cart {
  id
  customerId
  shippingAddress {
    countryCode
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
    fragment Cart on Cart {
  id
  customerId
  shippingAddress {
    countryCode
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
    fragment Cart on Cart {
  id
  customerId
  shippingAddress {
    countryCode
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
    }
  }
}
    fragment Cart on Cart {
  id
  customerId
  shippingAddress {
    countryCode
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
  }
}
    fragment Cart on Cart {
  id
  customerId
  shippingAddress {
    countryCode
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
  }
}
    fragment Cart on Cart {
  id
  customerId
  shippingAddress {
    countryCode
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
export const CartDocument = new TypedDocumentString(`
    query Cart($id: ID!) {
  cart(id: $id) {
    ...Cart
  }
}
    fragment Cart on Cart {
  id
  customerId
  shippingAddress {
    countryCode
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
export const CategoriesDocument = new TypedDocumentString(`
    query Categories($storeId: ID!, $currency: String!) {
  categories(first: 100) {
    edges {
      node {
        id
        name
        slug
        childrenCount
        products(storeId: $storeId, priceCurrency: $currency) {
          totalCount
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CategoriesQuery, CategoriesQueryVariables>;
export const CategoryListDocument = new TypedDocumentString(`
    query CategoryList($slug: String!, $currency: String!, $storeId: ID!, $after: String, $sortDirection: SortDirection!, $sortKey: ProductCategorySortKeys!, $query: String) {
  category(slug: $slug, storeId: $storeId, priceCurrency: $currency) {
    id
    name
    slug
    ancestors {
      slug
      name
    }
    products(
      first: 15
      after: $after
      sortDirection: $sortDirection
      sortKey: $sortKey
      priceCurrency: $currency
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
    image {
      src
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
export const CollectionsDocument = new TypedDocumentString(`
    query Collections($storeId: ID!, $currency: String!) {
  collections(first: 48) {
    edges {
      node {
        id
        name
        slug
        products(first: 0, storeId: $storeId, priceCurrency: $currency) {
          totalCount
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CollectionsQuery, CollectionsQueryVariables>;
export const CollectionListDocument = new TypedDocumentString(`
    query CollectionList($slug: String!, $currency: String!, $storeId: ID!, $after: String, $sortDirection: SortDirection!, $sortKey: ProductCollectionSortKeys!) {
  collection(slug: $slug, storeId: $storeId, priceCurrency: $currency) {
    id
    name
    products(
      first: 15
      after: $after
      sortDirection: $sortDirection
      sortKey: $sortKey
      priceCurrency: $currency
      storeId: $storeId
    ) {
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
    image {
      src
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
    query HomePage($storeId: ID!, $currency: String!) {
  categories(first: 6, storeId: $storeId, priceCurrency: $currency) {
    edges {
      node {
        id
        name
        slug
        productsCount
      }
    }
  }
  collections(first: 4) {
    edges {
      node {
        id
        name
        slug
        products(first: 0, storeId: $storeId, priceCurrency: $currency) {
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
    query ProductList($storeId: ID!, $currency: String!, $sortDirection: SortDirection!, $sortKey: ProductSortKeys!, $priceChannel: ID, $query: String) {
  products(
    first: 100
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
    image {
      src
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
    query ProductDetail($slug: String!, $currency: String, $store: ID!, $priceChannel: ID) {
  product(
    slug: $slug
    priceCurrency: $currency
    storeId: $store
    priceChannelId: $priceChannel
  ) {
    id
    name
    description
    categories(first: 1, sortDirection: DESC, sortKey: LEVEL) {
      edges {
        node {
          ...CategoryBreadcrumb
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          name
          sku
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
