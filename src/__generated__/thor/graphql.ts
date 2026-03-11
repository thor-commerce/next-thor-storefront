/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar type represents a date and time with time zone offset information. */
  DateTime: { input: any; output: any; }
  /** The `Decimal` scalar type represents a decimal floating-point number with high precision. */
  Decimal: { input: any; output: any; }
  /** The `Long` scalar type represents a signed 64-bit integer. */
  Long: { input: any; output: any; }
};

export type AbsoluteShippingMethodRate = CartAvailableShippingMethodRate & {
  __typename?: 'AbsoluteShippingMethodRate';
  /** The unique identifier for the shipping method rate. */
  id: Scalars['ID']['output'];
  /** The price of the shipping method rate. */
  price: Money;
};

export type AddressAlreadyExistsError = UserError & {
  __typename?: 'AddressAlreadyExistsError';
  message: Scalars['String']['output'];
};

export type AddressNotFoundError = UserError & {
  __typename?: 'AddressNotFoundError';
  message: Scalars['String']['output'];
};

export type Attribute = Node & {
  __typename?: 'Attribute';
  /** The unique identifier of the attribute. */
  id: Scalars['ID']['output'];
  /** Gets the metadata associated with the attribute. */
  metadata: Array<MetadataItem>;
  /** The name of the attribute. */
  name: Scalars['String']['output'];
  /** The type of the attribute. */
  type: ProductAttributeType;
};


export type AttributeMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};

/**
 * Represents an attribute assignment for a product, encapsulating the details of the attribute assigned to the product.
 *
 * Each attribute assignment includes the unique identifier of the attribute, its name, and the values assigned to the product. This allows for flexible and dynamic product attributes that can be used across different products and variants.
 */
export type AttributeAssignment = {
  __typename?: 'AttributeAssignment';
  /** The attribute assigned to the product. */
  attribute: Attribute;
  /** Gets the unique identifier of the attribute. */
  id: Scalars['ID']['output'];
  /** Gets the name of the attribute. */
  name: Scalars['String']['output'];
  /** The values assigned to the product, based on which values the variants have. */
  values: AttributeValueConnection;
};


/**
 * Represents an attribute assignment for a product, encapsulating the details of the attribute assigned to the product.
 *
 * Each attribute assignment includes the unique identifier of the attribute, its name, and the values assigned to the product. This allows for flexible and dynamic product attributes that can be used across different products and variants.
 */
export type AttributeAssignmentValuesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type AttributeValue = {
  /** The unique identifier of the attribute value. */
  id: Scalars['ID']['output'];
  /** Custom metadata key/value pairs for the attribute value. */
  metadata: Array<MetadataItem>;
  /** The value of the attribute. */
  value: Scalars['String']['output'];
};


export type AttributeValueMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** A connection to a list of items. */
export type AttributeValueConnection = {
  __typename?: 'AttributeValueConnection';
  /** A list of edges. */
  edges?: Maybe<Array<AttributeValueEdge>>;
  /** A flattened list of the nodes */
  nodes?: Maybe<Array<AttributeValue>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

export type AttributeValueEdge = {
  __typename?: 'AttributeValueEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: AttributeValue;
};

export type BaseAddress = {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']['output']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: Maybe<Scalars['String']['output']>;
  /** Name of the city. */
  city?: Maybe<Scalars['String']['output']>;
  /** Name of the company. */
  company?: Maybe<Scalars['String']['output']>;
  /** Two-digit country code as per  ISO 3166-1 alpha-2 */
  countryCode?: Maybe<Scalars['String']['output']>;
  /** Email address of the contact. */
  email?: Maybe<Scalars['String']['output']>;
  /** Given name (first name) of the contact. */
  firstName?: Maybe<Scalars['String']['output']>;
  /** Formatted address. */
  formatted?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the address. */
  id: Scalars['ID']['output'];
  /** Family name (last name) of the contact. */
  lastName?: Maybe<Scalars['String']['output']>;
  /** Gets the metadata associated with the address. */
  metadata: Array<MetadataItem>;
  /** Phone number of the contact. */
  phone?: Maybe<Scalars['String']['output']>;
  /** Postal code. */
  postalCode?: Maybe<Scalars['String']['output']>;
  /** Name of the state, for example, Colorado. */
  state?: Maybe<Scalars['String']['output']>;
};


export type BaseAddressMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};

/**
 * Represents a cart in Thor, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each cart includes details such as the total price, line items, shipping address, and available shipping methods. Carts can be used to track items before purchase, allowing customers to review and modify their selections.
 */
export type Cart = Node & {
  __typename?: 'Cart';
  /** List of available shipping methods for this cart. */
  availableShippingMethods: Array<CartAvailableShippingMethod>;
  /** Gets the billing address associated with the cart. This may be the same as the shipping address. */
  billingAddress?: Maybe<CartAddress>;
  /** Gets the currency of the cart. */
  currency: Scalars['String']['output'];
  /** Gets the customer email associated with the cart, if any. */
  customerEmail?: Maybe<Scalars['String']['output']>;
  /** Gets the customer ID associated with the cart, if any. */
  customerId?: Maybe<Scalars['ID']['output']>;
  /** Retrieves a paginated list of discount applications for the order */
  discountApplications: DiscountApplicationConnection;
  /** Gets the discount codes applied to the cart. */
  discountCodes: Array<DiscountCode>;
  /** The unique identifier of the cart */
  id: Scalars['ID']['output'];
  /** Retrieves a paginated list of line items for a specific cart. */
  lineItems: CartLineItemConnection;
  /** Sum of all LineItem quantities. */
  lineItemsQuantity: Scalars['Long']['output'];
  /** Gets the metadata associated with the cart. Once the cart is ordered, this metadata is transferred to the order. */
  metadata: Array<MetadataItem>;
  /** Gets the payment session associated with the cart, if any. */
  paymentSession?: Maybe<PaymentSession>;
  /** Gets the shipping address associated with the cart. */
  shippingAddress?: Maybe<CartAddress>;
  /** Gets the shipping lines applied to the cart. */
  shippingLines: Array<CartShippingLine>;
  /** Gets the current state of the cart. */
  state: CartState;
  /** Gets the store associated with the cart. */
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
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Represents a cart in Thor, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each cart includes details such as the total price, line items, shipping address, and available shipping methods. Carts can be used to track items before purchase, allowing customers to review and modify their selections.
 */
export type CartLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Represents a cart in Thor, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each cart includes details such as the total price, line items, shipping address, and available shipping methods. Carts can be used to track items before purchase, allowing customers to review and modify their selections.
 */
export type CartMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CartAddDiscountCodeNotFoundError = UserError & {
  __typename?: 'CartAddDiscountCodeNotFoundError';
  message: Scalars['String']['output'];
};

export type CartAddress = BaseAddress & {
  __typename?: 'CartAddress';
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']['output']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: Maybe<Scalars['String']['output']>;
  /** Name of the city. */
  city?: Maybe<Scalars['String']['output']>;
  /** Name of the company. */
  company?: Maybe<Scalars['String']['output']>;
  /** Two-digit country code as per  ISO 3166-1 alpha-2 */
  countryCode?: Maybe<Scalars['String']['output']>;
  /** Email address of the contact. */
  email?: Maybe<Scalars['String']['output']>;
  /** Given name (first name) of the contact. */
  firstName?: Maybe<Scalars['String']['output']>;
  /** Formatted address. */
  formatted?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the address. */
  id: Scalars['ID']['output'];
  /** Family name (last name) of the contact. */
  lastName?: Maybe<Scalars['String']['output']>;
  /** Gets the metadata associated with the address. */
  metadata: Array<MetadataItem>;
  /** Phone number of the contact. */
  phone?: Maybe<Scalars['String']['output']>;
  /** Postal code. */
  postalCode?: Maybe<Scalars['String']['output']>;
  /** Name of the state, for example, Colorado. */
  state?: Maybe<Scalars['String']['output']>;
};


export type CartAddressMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CartAddressInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type CartAuthenticationFailedError = UserError & {
  __typename?: 'CartAuthenticationFailedError';
  message: Scalars['String']['output'];
};

export type CartAuthorizationFailedError = UserError & {
  __typename?: 'CartAuthorizationFailedError';
  message: Scalars['String']['output'];
};

export type CartAvailableShippingMethod = {
  __typename?: 'CartAvailableShippingMethod';
  /** The description of the shipping method. */
  description?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the shipping method. */
  id: Scalars['ID']['output'];
  /** Gets the metadata associated with the cart's available shipping method. */
  metadata: Array<MetadataItem>;
  /** The name of the shipping method. */
  name: Scalars['String']['output'];
  /** Gets the rate associated with the shipping method. */
  rate: CartAvailableShippingMethodRate;
  /** Gets the SKU (Stock Keeping Unit) associated with the shipping method. */
  sku?: Maybe<Scalars['String']['output']>;
};


export type CartAvailableShippingMethodMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CartAvailableShippingMethodRate = {
  /** The unique identifier for the shipping method rate. */
  id: Scalars['ID']['output'];
};

export type CartCompleteError = CartCompletionDiscountCodeAlreadyUsedError | CartCompletionDiscrepancyError | CartNotFoundError;

export type CartCompleteInput = {
  cartId: Scalars['ID']['input'];
};

export type CartCompletePayload = {
  __typename?: 'CartCompletePayload';
  errors?: Maybe<Array<CartCompleteError>>;
  order?: Maybe<Order>;
};

export type CartCompletionDiscountCodeAlreadyUsedError = UserError & {
  __typename?: 'CartCompletionDiscountCodeAlreadyUsedError';
  message: Scalars['String']['output'];
};

export type CartCompletionDiscrepancyError = UserError & {
  __typename?: 'CartCompletionDiscrepancyError';
  message: Scalars['String']['output'];
};

export type CartCreateError = CreateCartAddressDoesNotHaveCountryCodeError | CreateCartAuthenticationFailedError | CreateCartAuthorizationFailedError | CreateCartChannelDoesNotSupportCountryError | CreateCartChannelDoesNotSupportCurrencyError | CreateCartChannelHasNoCountriesError | CreateCartChannelNotFoundError | CreateCartFailedNotAllLineItemsCouldBeAddedError | CreateCartPriceChannelNotFoundError | CreateCartShippingAddressDoesNotHaveShippingZonesError | CreateCartStoreNotFoundError;

export type CartCreateInput = {
  billingAddress?: InputMaybe<CartAddressInput>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  currency: Scalars['String']['input'];
  customerEmail?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['ID']['input']>;
  lineItems?: InputMaybe<Array<CartLineItemInput>>;
  priceChannelId?: InputMaybe<Scalars['ID']['input']>;
  shippingAddress?: InputMaybe<CartAddressInput>;
  storeId: Scalars['ID']['input'];
};

export type CartCreatePayload = {
  __typename?: 'CartCreatePayload';
  cart?: Maybe<Cart>;
  errors?: Maybe<Array<CartCreateError>>;
};

export type CartDiscountCodeAddError = CartAddDiscountCodeNotFoundError | CartDiscountCodeMaxApplicationsReachedError | CartNotFoundError;

export type CartDiscountCodeAddInput = {
  cartId: Scalars['ID']['input'];
  discountCode: Scalars['String']['input'];
};

export type CartDiscountCodeAddPayload = {
  __typename?: 'CartDiscountCodeAddPayload';
  cart?: Maybe<Cart>;
  errors?: Maybe<Array<CartDiscountCodeAddError>>;
};

export type CartDiscountCodeMaxApplicationsReachedError = UserError & {
  __typename?: 'CartDiscountCodeMaxApplicationsReachedError';
  message: Scalars['String']['output'];
};

export type CartDiscountCodeRemoveError = CartNotFoundError;

export type CartDiscountCodeRemoveInput = {
  cartId: Scalars['ID']['input'];
  discountCodes: Array<Scalars['String']['input']>;
};

export type CartDiscountCodeRemovePayload = {
  __typename?: 'CartDiscountCodeRemovePayload';
  cart?: Maybe<Cart>;
  errors?: Maybe<Array<CartDiscountCodeRemoveError>>;
};

/**
 * Represents a line item in a cart, which includes details about the product, variant, and any associated discounts.
 *
 * Each line item contains information such as the product name, variant details, total price, and any applicable discounts. This allows for detailed tracking of items within a cart, including their pricing and discount applications.
 */
export type CartLineItem = Node & {
  __typename?: 'CartLineItem';
  /** Retrieves a paginated list of payments for a specific order. */
  discountApplications: DiscountApplicationConnection;
  /** The unique identifier of the line item */
  id: Scalars['ID']['output'];
  /** Gets the metadata associated with the cart line item. */
  metadata: Array<MetadataItem>;
  /**
   * This retrieves the product associated with a cart line item. If the product no longer exists—such as if it has been removed from the channel or deleted entirely—this will return `null`.
   * In such cases, you can still use other properties like productName and productSlug to display information about the product.
   * These fields are not directly tied to the product reference and remain available for display, even if the product itself is missing.
   * Note that these properties are eventually consistent and may not always reflect the latest product state.
   */
  product?: Maybe<Product>;
  /** The unique identifier of the product associated with the cart line item. */
  productId: Scalars['ID']['output'];
  /** The name of the product */
  productName: Scalars['String']['output'];
  /** Retrieves the slug of the product associated with a cart line item. This is useful for generating URLs or displaying product information. */
  productSlug: Scalars['String']['output'];
  /** Retrieves the quantity of the cart line item. */
  quantity: Scalars['Int']['output'];
  /** Retrieves the SKU (Stock Keeping Unit) of the variant associated with a cart line item. The SKU is a unique identifier for the variant, often used for inventory management. */
  sku: Scalars['String']['output'];
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
  /**
   * This retrieves the variant associated with a cart line item. If the variant no longer exists—such as if it has been removed from the channel or deleted entirely—this will return `null`.
   * In such cases, you can still use other properties like `variantName` and `variantSku` to display information about the variant.
   * These fields are not directly tied to the variant reference and remain available for display, even if the variant itself is missing.
   * Note that these properties are eventually consistent and may not always reflect the latest variant state.
   */
  variant?: Maybe<ProductVariant>;
  /** The unique identifier of the variant associated with the cart line item. */
  variantId: Scalars['ID']['output'];
  /** Retrieves the name of the variant associated with a cart line item. This is useful for displaying the specific variant details to the user. */
  variantName: Scalars['String']['output'];
};


/**
 * Represents a line item in a cart, which includes details about the product, variant, and any associated discounts.
 *
 * Each line item contains information such as the product name, variant details, total price, and any applicable discounts. This allows for detailed tracking of items within a cart, including their pricing and discount applications.
 */
export type CartLineItemDiscountApplicationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Represents a line item in a cart, which includes details about the product, variant, and any associated discounts.
 *
 * Each line item contains information such as the product name, variant details, total price, and any applicable discounts. This allows for detailed tracking of items within a cart, including their pricing and discount applications.
 */
export type CartLineItemMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** A connection to a list of items. */
export type CartLineItemConnection = {
  __typename?: 'CartLineItemConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CartLineItemEdge>>;
  /** A flattened list of the nodes */
  nodes?: Maybe<Array<CartLineItem>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

export type CartLineItemEdge = {
  __typename?: 'CartLineItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CartLineItem;
};

export type CartLineItemInput = {
  metadata?: InputMaybe<Array<KeyValuePairOfStringAndStringInput>>;
  quantity: Scalars['Int']['input'];
  variantId: Scalars['ID']['input'];
};

export type CartLineItemPriceNotFoundError = UserError & {
  __typename?: 'CartLineItemPriceNotFoundError';
  message: Scalars['String']['output'];
};

export type CartLineItemUpdateInput = {
  lineItemId: Scalars['ID']['input'];
  metadata?: InputMaybe<Array<KeyValuePairOfStringAndStringInput>>;
  quantity: Scalars['Int']['input'];
};

export type CartLineItemsAddError = CartLineItemPriceNotFoundError | CartLineItemsInsufficientStockError | CartNotFoundError | ProductVariantNotFoundError;

export type CartLineItemsAddInput = {
  cartId: Scalars['ID']['input'];
  lineItems: Array<CartLineItemInput>;
};

export type CartLineItemsAddPayload = {
  __typename?: 'CartLineItemsAddPayload';
  cart?: Maybe<Cart>;
  errors?: Maybe<Array<CartLineItemsAddError>>;
};

export type CartLineItemsInsufficientStockError = UserError & {
  __typename?: 'CartLineItemsInsufficientStockError';
  message: Scalars['String']['output'];
};

export type CartLineItemsNotFoundError = UserError & {
  __typename?: 'CartLineItemsNotFoundError';
  message: Scalars['String']['output'];
};

export type CartLineItemsRemoveError = CartNotFoundError;

export type CartLineItemsRemoveInput = {
  cartId: Scalars['ID']['input'];
  lineItemIds: Array<Scalars['ID']['input']>;
};

export type CartLineItemsRemovePayload = {
  __typename?: 'CartLineItemsRemovePayload';
  cart?: Maybe<Cart>;
  errors?: Maybe<Array<CartLineItemsRemoveError>>;
};

export type CartLineItemsUpdateError = CartLineItemsNotFoundError | CartNotFoundError | UpdateCartLineItemsInsufficientStockError;

export type CartLineItemsUpdateInput = {
  cartId: Scalars['ID']['input'];
  lineItems: Array<CartLineItemUpdateInput>;
};

export type CartLineItemsUpdatePayload = {
  __typename?: 'CartLineItemsUpdatePayload';
  cart?: Maybe<Cart>;
  errors?: Maybe<Array<CartLineItemsUpdateError>>;
};

export type CartNotFoundError = UserError & {
  __typename?: 'CartNotFoundError';
  message: Scalars['String']['output'];
};

export type CartPaymentSessionInitializeError = CartNotFoundError | PaymentGatewayChannelMismatchError | PaymentGatewayNotFoundError | PaymentGatewaySessionInitializeFailedError;

export type CartPaymentSessionInitializeInput = {
  cartId: Scalars['ID']['input'];
  gatewayId: Scalars['ID']['input'];
};

export type CartPaymentSessionInitializePayload = {
  __typename?: 'CartPaymentSessionInitializePayload';
  cart?: Maybe<Cart>;
  errors?: Maybe<Array<CartPaymentSessionInitializeError>>;
};

export type CartReplicateError = CartNotFoundError | CartReplicateStrictValidationFailedError;

export type CartReplicateInput = {
  cartId: Scalars['ID']['input'];
  currency: Scalars['String']['input'];
  priceChannelId?: InputMaybe<Scalars['ID']['input']>;
  storeId: Scalars['ID']['input'];
  strategy: ReplicationStrategy;
};

export type CartReplicatePayload = {
  __typename?: 'CartReplicatePayload';
  cart?: Maybe<Cart>;
  errors?: Maybe<Array<CartReplicateError>>;
};

export type CartReplicateStockChangeError = {
  __typename?: 'CartReplicateStockChangeError';
  lineItemId: Scalars['ID']['output'];
  newStock: Scalars['Int']['output'];
  variantId: Scalars['ID']['output'];
  wantedStock: Scalars['Int']['output'];
};

export type CartReplicateStrictValidationFailedError = UserError & {
  __typename?: 'CartReplicateStrictValidationFailedError';
  message: Scalars['String']['output'];
  stockChanges: Array<CartReplicateStockChangeError>;
  variantsNotFound: Array<CartReplicateVariantNotFoundError>;
};

export type CartReplicateVariantNotFoundError = {
  __typename?: 'CartReplicateVariantNotFoundError';
  lineItemId: Scalars['ID']['output'];
  variantId: Scalars['ID']['output'];
};

/** Represents a shipping line on a cart, including method and totals. */
export type CartShippingLine = Node & {
  __typename?: 'CartShippingLine';
  /** The unique identifier of the cart shipping line. */
  id: Scalars['ID']['output'];
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
  cartId: Scalars['ID']['input'];
  shippingMethodId: Scalars['ID']['input'];
};

export type CartShippingLineAddPayload = {
  __typename?: 'CartShippingLineAddPayload';
  cart?: Maybe<Cart>;
  errors?: Maybe<Array<CartShippingLineAddError>>;
};

export type CartShippingLineNotFoundError = UserError & {
  __typename?: 'CartShippingLineNotFoundError';
  message: Scalars['String']['output'];
};

export type CartShippingLineRemoveError = CartNotFoundError | CartShippingLineNotFoundError;

export type CartShippingLineRemoveInput = {
  cartId: Scalars['ID']['input'];
  shippingLineId: Scalars['ID']['input'];
};

export type CartShippingLineRemovePayload = {
  __typename?: 'CartShippingLineRemovePayload';
  cart?: Maybe<Cart>;
  errors?: Maybe<Array<CartShippingLineRemoveError>>;
};

export type CartShippingLinesSetError = CartNotFoundError | ShippingMethodNotFoundError;

export type CartShippingLinesSetInput = {
  cartId: Scalars['ID']['input'];
  shippingMethodIds: Array<Scalars['ID']['input']>;
};

export type CartShippingLinesSetPayload = {
  __typename?: 'CartShippingLinesSetPayload';
  cart?: Maybe<Cart>;
  errors?: Maybe<Array<CartShippingLinesSetError>>;
};

export enum CartState {
  Active = 'ACTIVE',
  Ordered = 'ORDERED'
}

export type CartUpdateError = CartAuthenticationFailedError | CartAuthorizationFailedError | CartNotFoundError | CartUpdatePriceChannelNotFoundError;

export type CartUpdateInput = {
  billingAddress?: InputMaybe<CartAddressInput>;
  cartId: Scalars['ID']['input'];
  customerEmail?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['ID']['input']>;
  metadata?: InputMaybe<Array<KeyValuePairOfStringAndStringInput>>;
  priceChannelId?: InputMaybe<Scalars['ID']['input']>;
  shippingAddress?: InputMaybe<CartAddressInput>;
};

export type CartUpdatePayload = {
  __typename?: 'CartUpdatePayload';
  cart?: Maybe<Cart>;
  errors?: Maybe<Array<CartUpdateError>>;
};

export type CartUpdatePriceChannelNotFoundError = UserError & {
  __typename?: 'CartUpdatePriceChannelNotFoundError';
  message: Scalars['String']['output'];
};

/**
 * Represents a category, encapsulating all information required to display and manage categories across storefronts and sales channels.
 *
 * Each category includes core details such as title, description, and associated products. Categories can be organized hierarchically to create a structured navigation experience for customers.
 */
export type Category = Node & {
  __typename?: 'Category';
  /** The ancestors of the category. */
  ancestors: Array<Category>;
  /** The direct children of the category. */
  children: Array<Category>;
  /** The number of direct children of the category. */
  childrenCount: Scalars['Long']['output'];
  /** The descendants of the category. */
  descendants: Array<Category>;
  /** The number of descendants of the category. */
  descendantsCount: Scalars['Long']['output'];
  /** The ID of the category. */
  id: Scalars['ID']['output'];
  /** The name of the category. */
  name: Scalars['String']['output'];
  /** The parent category of the category. */
  parent?: Maybe<Category>;
  /** List of products in the collection. */
  products: ProductsConnection;
  /** The number of products that are associated with the category. */
  productsCount: Scalars['Long']['output'];
  /** The slug of the category. */
  slug: Scalars['String']['output'];
};


/**
 * Represents a category, encapsulating all information required to display and manage categories across storefronts and sales channels.
 *
 * Each category includes core details such as title, description, and associated products. Categories can be organized hierarchically to create a structured navigation experience for customers.
 */
export type CategoryProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  priceChannelId?: InputMaybe<Scalars['ID']['input']>;
  priceCountry?: InputMaybe<Scalars['String']['input']>;
  priceCurrency?: InputMaybe<Scalars['String']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: SortDirection;
  sortKey?: ProductCategorySortKeys;
  storeId?: InputMaybe<Scalars['ID']['input']>;
};

/** A connection to a list of items. */
export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CategoryEdge>>;
  /** A flattened list of the nodes */
  nodes?: Maybe<Array<Category>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

export type CategoryEdge = {
  __typename?: 'CategoryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Category;
};

/**
 * Represents a collection, encapsulating all information required to display and manage collections across storefronts and sales channels.
 *
 *  Each collection includes core details such as title, description, and associated products. Collections can be organized hierarchically to create a structured navigation experience for customers.
 */
export type Collection = Node & {
  __typename?: 'Collection';
  /** The ID of the collection. */
  id: Scalars['ID']['output'];
  /** The name of the collection. */
  name: Scalars['String']['output'];
  /** List of products in the collection. */
  products: ProductsConnection;
  /** The slug of the collection. */
  slug: Scalars['String']['output'];
};


/**
 * Represents a collection, encapsulating all information required to display and manage collections across storefronts and sales channels.
 *
 *  Each collection includes core details such as title, description, and associated products. Collections can be organized hierarchically to create a structured navigation experience for customers.
 */
export type CollectionProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  priceChannelId?: InputMaybe<Scalars['ID']['input']>;
  priceCountry?: InputMaybe<Scalars['String']['input']>;
  priceCurrency?: InputMaybe<Scalars['String']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: SortDirection;
  sortKey?: ProductCollectionSortKeys;
  storeId?: InputMaybe<Scalars['ID']['input']>;
};

/** A connection to a list of items. */
export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CollectionEdge>>;
  /** A flattened list of the nodes */
  nodes?: Maybe<Array<Collection>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

export type CollectionEdge = {
  __typename?: 'CollectionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Collection;
};

export type CountryInfo = {
  __typename?: 'CountryInfo';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  postalCode?: Maybe<PostalCodeInfo>;
  zones: Array<ZoneInfo>;
};

export type CreateCartAddressDoesNotHaveCountryCodeError = UserError & {
  __typename?: 'CreateCartAddressDoesNotHaveCountryCodeError';
  message: Scalars['String']['output'];
};

export type CreateCartAuthenticationFailedError = UserError & {
  __typename?: 'CreateCartAuthenticationFailedError';
  message: Scalars['String']['output'];
};

export type CreateCartAuthorizationFailedError = UserError & {
  __typename?: 'CreateCartAuthorizationFailedError';
  message: Scalars['String']['output'];
};

export type CreateCartChannelDoesNotSupportCountryError = UserError & {
  __typename?: 'CreateCartChannelDoesNotSupportCountryError';
  message: Scalars['String']['output'];
};

export type CreateCartChannelDoesNotSupportCurrencyError = UserError & {
  __typename?: 'CreateCartChannelDoesNotSupportCurrencyError';
  message: Scalars['String']['output'];
};

export type CreateCartChannelHasNoCountriesError = UserError & {
  __typename?: 'CreateCartChannelHasNoCountriesError';
  message: Scalars['String']['output'];
};

export type CreateCartChannelNotFoundError = UserError & {
  __typename?: 'CreateCartChannelNotFoundError';
  message: Scalars['String']['output'];
};

export type CreateCartFailedNotAllLineItemsCouldBeAddedError = UserError & {
  __typename?: 'CreateCartFailedNotAllLineItemsCouldBeAddedError';
  message: Scalars['String']['output'];
};

export type CreateCartPriceChannelNotFoundError = UserError & {
  __typename?: 'CreateCartPriceChannelNotFoundError';
  message: Scalars['String']['output'];
};

export type CreateCartShippingAddressDoesNotHaveShippingZonesError = UserError & {
  __typename?: 'CreateCartShippingAddressDoesNotHaveShippingZonesError';
  message: Scalars['String']['output'];
};

export type CreateCartStoreNotFoundError = UserError & {
  __typename?: 'CreateCartStoreNotFoundError';
  message: Scalars['String']['output'];
};

export type Customer = Node & {
  __typename?: 'Customer';
  /** The addresses associated with the customer. */
  addresses: CustomerAddressConnection;
  /** Retrieves a paged list of customers associated with the customer group. */
  customerGroups: CustomerGroupConnection;
  /** The default billing address associated with the customer. */
  defaultBillingAddress?: Maybe<CustomerAddress>;
  /** The default shipping address associated with the customer. */
  defaultShippingAddress?: Maybe<CustomerAddress>;
  /** The email address of the customer. */
  email?: Maybe<Scalars['String']['output']>;
  /** The first name of the customer. */
  firstName?: Maybe<Scalars['String']['output']>;
  /** The unique identifier for the customer. */
  id: Scalars['ID']['output'];
  /** The last name of the customer. */
  lastName?: Maybe<Scalars['String']['output']>;
  /** Gets the metadata associated with the customer. */
  metadata: Array<MetadataItem>;
  /** A list of orders associated with the customer. */
  orders: OrderConnection;
  /** The number of orders that are associated with the customer. */
  ordersCount: Scalars['Long']['output'];
};


export type CustomerAddressesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type CustomerCustomerGroupsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type CustomerMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type CustomerOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  sortKey?: InputMaybe<OrderSortKeys>;
};

export type CustomerAccessToken = {
  __typename?: 'CustomerAccessToken';
  /** The opaque bearer token to send as part of the Authorization request header. */
  accessToken: Scalars['String']['output'];
  /** The number of seconds before the access token expires. */
  expiresIn: Scalars['Long']['output'];
  /** If set, this provides the ability to get a new access_token after it expires using a refresh endpoint. */
  refreshToken: Scalars['String']['output'];
};

export type CustomerAccessTokenCreateError = InvalidCredentialsError;

export type CustomerAccessTokenCreateInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CustomerAccessTokenCreatePayload = {
  __typename?: 'CustomerAccessTokenCreatePayload';
  customerAccessToken?: Maybe<CustomerAccessToken>;
  errors?: Maybe<Array<CustomerAccessTokenCreateError>>;
};

export type CustomerAccessTokenRefreshError = InvalidRefreshTokenError;

export type CustomerAccessTokenRefreshInput = {
  refreshToken: Scalars['String']['input'];
};

export type CustomerAccessTokenRefreshPayload = {
  __typename?: 'CustomerAccessTokenRefreshPayload';
  customerAccessToken?: Maybe<CustomerAccessToken>;
  errors?: Maybe<Array<CustomerAccessTokenRefreshError>>;
};

export type CustomerActivateError = CustomerEmailAlreadyConfirmedError | CustomerInvalidActivationTokenError | CustomerInvalidPasswordError;

export type CustomerActivateInput = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Array<KeyValuePairOfStringAndStringInput>>;
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type CustomerActivatePayload = {
  __typename?: 'CustomerActivatePayload';
  customer?: Maybe<Customer>;
  customerAccessToken?: Maybe<CustomerAccessToken>;
  errors?: Maybe<Array<CustomerActivateError>>;
};

export type CustomerAddress = BaseAddress & {
  __typename?: 'CustomerAddress';
  /** The first line of the address. */
  address1?: Maybe<Scalars['String']['output']>;
  /** The second line of the address. */
  address2?: Maybe<Scalars['String']['output']>;
  /** The name of the city, district, village, or town. */
  city?: Maybe<Scalars['String']['output']>;
  /** The name of the customer's company or organization. */
  company?: Maybe<Scalars['String']['output']>;
  /** The two-letter code for the country of the address. */
  countryCode?: Maybe<Scalars['String']['output']>;
  /** The email address of the address. */
  email?: Maybe<Scalars['String']['output']>;
  /** The first name of the address. */
  firstName?: Maybe<Scalars['String']['output']>;
  /** Formatted address. */
  formatted?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the address. */
  id: Scalars['ID']['output'];
  /** The last name of the address. */
  lastName?: Maybe<Scalars['String']['output']>;
  /** Gets the metadata associated with the address. */
  metadata: Array<MetadataItem>;
  /** The name of the address. */
  name?: Maybe<Scalars['String']['output']>;
  /** The phone number of the address. */
  phone?: Maybe<Scalars['String']['output']>;
  /** The zip or postal code of the address. */
  postalCode?: Maybe<Scalars['String']['output']>;
  /** The region of the address, such as the province, state, or district. */
  state?: Maybe<Scalars['String']['output']>;
};


export type CustomerAddressMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** A connection to a list of items. */
export type CustomerAddressConnection = {
  __typename?: 'CustomerAddressConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CustomerAddressEdge>>;
  /** A flattened list of the nodes */
  nodes?: Maybe<Array<CustomerAddress>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

export type CustomerAddressCreateError = AddressAlreadyExistsError | CustomerNotFoundError;

export type CustomerAddressCreateInput = {
  address: CustomerAddressInput;
};

export type CustomerAddressCreatePayload = {
  __typename?: 'CustomerAddressCreatePayload';
  customerAddress?: Maybe<CustomerAddress>;
  errors?: Maybe<Array<CustomerAddressCreateError>>;
};

export type CustomerAddressDeleteError = AddressNotFoundError | CustomerNotFoundError;

export type CustomerAddressDeleteInput = {
  id: Scalars['ID']['input'];
};

export type CustomerAddressDeletePayload = {
  __typename?: 'CustomerAddressDeletePayload';
  customer?: Maybe<Customer>;
  errors?: Maybe<Array<CustomerAddressDeleteError>>;
};

export type CustomerAddressEdge = {
  __typename?: 'CustomerAddressEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CustomerAddress;
};

export type CustomerAddressInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isDefaultBilling?: InputMaybe<Scalars['Boolean']['input']>;
  isDefaultShipping?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Array<KeyValuePairOfStringAndStringInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerAddressUpdateError = AddressAlreadyExistsError | AddressNotFoundError | CustomerNotFoundError;

export type CustomerAddressUpdateInput = {
  address: CustomerAddressInput;
  id: Scalars['ID']['input'];
};

export type CustomerAddressUpdatePayload = {
  __typename?: 'CustomerAddressUpdatePayload';
  customerAddress?: Maybe<CustomerAddress>;
  errors?: Maybe<Array<CustomerAddressUpdateError>>;
};

export type CustomerEmailAlreadyConfirmedError = UserError & {
  __typename?: 'CustomerEmailAlreadyConfirmedError';
  message: Scalars['String']['output'];
};

export type CustomerGroup = Node & {
  __typename?: 'CustomerGroup';
  /** The unique identifier for the customer. */
  id: Scalars['ID']['output'];
  /** The name of the customer group. */
  name: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type CustomerGroupConnection = {
  __typename?: 'CustomerGroupConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CustomerGroupEdge>>;
  /** A flattened list of the nodes */
  nodes?: Maybe<Array<CustomerGroup>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

export type CustomerGroupEdge = {
  __typename?: 'CustomerGroupEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CustomerGroup;
};

export type CustomerInvalidActivationTokenError = UserError & {
  __typename?: 'CustomerInvalidActivationTokenError';
  message: Scalars['String']['output'];
};

export type CustomerInvalidPasswordError = UserError & {
  __typename?: 'CustomerInvalidPasswordError';
  message: Scalars['String']['output'];
};

export type CustomerNotFoundError = UserError & {
  __typename?: 'CustomerNotFoundError';
  message: Scalars['String']['output'];
};

export type CustomerPasswordResetError = InvalidPasswordError | InvalidTokenError;

export type CustomerPasswordResetInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  resetToken: Scalars['String']['input'];
};

export type CustomerPasswordResetPayload = {
  __typename?: 'CustomerPasswordResetPayload';
  customer?: Maybe<Customer>;
  customerAccessToken?: Maybe<CustomerAccessToken>;
  errors?: Maybe<Array<CustomerPasswordResetError>>;
};

export type CustomerPasswordResetTokenError = InvalidCredentialsError;

export type CustomerPasswordResetTokenInput = {
  email: Scalars['String']['input'];
};

export type CustomerPasswordResetTokenPayload = {
  __typename?: 'CustomerPasswordResetTokenPayload';
  errors?: Maybe<Array<CustomerPasswordResetTokenError>>;
};

export type CustomerRegisterError = CustomerRegisterFailedError;

export type CustomerRegisterFailedError = UserError & {
  __typename?: 'CustomerRegisterFailedError';
  message: Scalars['String']['output'];
};

export type CustomerRegisterInput = {
  email: Scalars['String']['input'];
};

export type CustomerRegisterPayload = {
  __typename?: 'CustomerRegisterPayload';
  errors?: Maybe<Array<CustomerRegisterError>>;
};

export type CustomerUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerUpdatePayload = {
  __typename?: 'CustomerUpdatePayload';
  customer?: Maybe<Customer>;
};

export type DiscountApplication = {
  __typename?: 'DiscountApplication';
  /** The code of the discount that was applied. If it was an automatic discount, this field is null. */
  discountCode?: Maybe<Scalars['String']['output']>;
  /** The discounted amount. */
  discountedAmount: Money;
  /** The title of the discount that was applied. */
  label: Scalars['String']['output'];
  /** The value of the discount application, either absolute or relative (Money value). */
  value: DiscountApplicationValue;
};

/** A connection to a list of items. */
export type DiscountApplicationConnection = {
  __typename?: 'DiscountApplicationConnection';
  /** A list of edges. */
  edges?: Maybe<Array<DiscountApplicationEdge>>;
  /** A flattened list of the nodes */
  nodes?: Maybe<Array<DiscountApplication>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

export type DiscountApplicationEdge = {
  __typename?: 'DiscountApplicationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: DiscountApplication;
};

/** The value of the discount application, either absolute or relative. */
export type DiscountApplicationValue = Money | RelativeValue;

export type DiscountCode = {
  __typename?: 'DiscountCode';
  /** The code string for the discount code. */
  code: Scalars['String']['output'];
  /** An error state describing why the discount code could not be applied, if applicable. */
  error?: Maybe<DiscountCodeError>;
};

export enum DiscountCodeError {
  ExcludedByDiscountPolicy = 'EXCLUDED_BY_DISCOUNT_POLICY',
  MaxApplicationsPerCustomerReached = 'MAX_APPLICATIONS_PER_CUSTOMER_REACHED',
  MaxApplicationsReached = 'MAX_APPLICATIONS_REACHED',
  None = 'NONE',
  NotFound = 'NOT_FOUND',
  NoMatch = 'NO_MATCH',
  Unknown = 'UNKNOWN'
}

/** Represents a discounted price for a product variant. */
export type DiscountedPrice = {
  __typename?: 'DiscountedPrice';
  /** The product discount associated with this discounted price. */
  discount?: Maybe<ProductDiscount>;
  /** Money value of the discounted price. */
  value: Money;
};

export type Facet = {
  __typename?: 'Facet';
  /** The field of the facet. */
  field: FacetField;
  /** The name of the facet. */
  name: Scalars['String']['output'];
  /** The values of the facet. */
  values: Array<FacetValue>;
};

export enum FacetField {
  Price = 'PRICE',
  Tag = 'TAG',
  Vendor = 'VENDOR'
}

export type FacetValue = {
  __typename?: 'FacetValue';
  /** The count of the facet value, representing how many products are associated with this facet value. */
  count: Scalars['Long']['output'];
  /** The name of the facet value. */
  name: Scalars['String']['output'];
};

export type InvalidCredentialsError = UserError & {
  __typename?: 'InvalidCredentialsError';
  message: Scalars['String']['output'];
};

export type InvalidPasswordError = UserError & {
  __typename?: 'InvalidPasswordError';
  message: Scalars['String']['output'];
};

export type InvalidRefreshTokenError = UserError & {
  __typename?: 'InvalidRefreshTokenError';
  message: Scalars['String']['output'];
};

export type InvalidTokenError = UserError & {
  __typename?: 'InvalidTokenError';
  message: Scalars['String']['output'];
};

export type KeyValuePairOfStringAndStringInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

/** Represents the shipping method associated with a cart shipping line. */
export type LineShippingMethod = {
  __typename?: 'LineShippingMethod';
  /** The unique identifier of the shipping method. */
  id: Scalars['ID']['output'];
  /** Gets the metadata associated with the shipping method. */
  metadata: Array<MetadataItem>;
  /** The display name of the shipping method. */
  name: Scalars['String']['output'];
  /** The SKU of the shipping method, if any. */
  sku?: Maybe<Scalars['String']['output']>;
};


/** Represents the shipping method associated with a cart shipping line. */
export type LineShippingMethodMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ManualPaymentGateway = PaymentGateway & {
  __typename?: 'ManualPaymentGateway';
  /** The channel IDs associated with the payment gateway. */
  channelIds: Array<Scalars['ID']['output']>;
  /** The unique identifier of the payment gateway. */
  id: Scalars['ID']['output'];
  /** The name of the payment gateway. */
  name: Scalars['String']['output'];
};

export type Media = Node & {
  __typename?: 'Media';
  /** The content type of the media. */
  contentType: Scalars['String']['output'];
  /** The file extension of the media. */
  fileExtension: Scalars['String']['output'];
  /** The file name of the media. */
  fileName: Scalars['String']['output'];
  /** The unique identifier of the media. */
  id: Scalars['ID']['output'];
  /** The full source URL of the media. */
  src: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type MediaConnection = {
  __typename?: 'MediaConnection';
  /** A list of edges. */
  edges?: Maybe<Array<MediaEdge>>;
  /** A flattened list of the nodes */
  nodes?: Maybe<Array<Media>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

export type MediaEdge = {
  __typename?: 'MediaEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Media;
};

/** Represents a key-value pair of metadata associated with an entity, providing additional information or attributes that can be used for various purposes such as filtering, categorization, or display. */
export type MetadataItem = {
  __typename?: 'MetadataItem';
  /** Gets the key of the metadata item, which serves as an identifier for the type of metadata being represented. */
  key: Scalars['String']['output'];
  /** Gets the value of the metadata item, which contains the specific information or attribute associated with the key. */
  value: Scalars['String']['output'];
};

/** The monetary value in the smallest unit of the currency. */
export type Money = {
  __typename?: 'Money';
  /** The amount of money in the smallest unit of the currency. For example, 100 cents in USD. */
  centAmount: Scalars['Long']['output'];
  /** The three-letter currency code that represents a world currency used in a store. Currency codes include standard ISO 4217 codes, legacy codes, and non-standard codes. For example, USD. */
  currencyCode: Scalars['String']['output'];
  /** The number of digits after the decimal separator in the currency. For example, 2 for USD and 0 for JPY. */
  fractionDigits: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
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
  id: Scalars['ID']['output'];
};

export type Order = Node & {
  __typename?: 'Order';
  /** Gets the billing address associated with the order. This may be the same as the shipping address. */
  billingAddress?: Maybe<OrderAddress>;
  /** The date and time when the order was created. */
  createdAt: Scalars['DateTime']['output'];
  /** Retrieves the customer associated with the order. */
  customer?: Maybe<Customer>;
  /** Retrieves a paginated list of discount applications for the order */
  discountApplications: DiscountApplicationConnection;
  /** The external reference of the order. */
  externalReference?: Maybe<Scalars['String']['output']>;
  /** The unique identifier for the order. */
  id: Scalars['ID']['output'];
  /** Retrieves a paginated list of line items for a specific order. */
  lineItems: OrderLineItemConnection;
  /** Sum of all LineItem quantities. */
  lineItemsQuantity: Scalars['Long']['output'];
  /** Gets the metadata associated with the order. */
  metadata: Array<MetadataItem>;
  /** The order number. */
  orderNumber: Scalars['Int']['output'];
  /** Current status of the Order. */
  orderState: OrderState;
  /** Payment status of the Order. */
  paymentState: PaymentState;
  /** Retrieves a paginated list of payments for a specific order. */
  payments: PaymentConnection;
  /** Shipment status of the Order. */
  shipmentState: ShipmentState;
  /** Gets the shipping address associated with the order. */
  shippingAddress?: Maybe<OrderAddress>;
  /** Gets the shipping lines associated with the order. */
  shippingLines: Array<OrderShippingLine>;
  /** Gets the total price of the order before discounts and taxes. */
  subtotal: Money;
  /** Gets the taxed price of the order. This may be null if the order does not yet have a taxed price. */
  taxedPrice?: Maybe<TaxedPrice>;
  /** Gets the total price of the order after discounts and taxes. */
  total: Money;
};


export type OrderDiscountApplicationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type OrderLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type OrderMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type OrderPaymentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type OrderAddress = BaseAddress & {
  __typename?: 'OrderAddress';
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']['output']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: Maybe<Scalars['String']['output']>;
  /** Name of the city. */
  city?: Maybe<Scalars['String']['output']>;
  /** Name of the company. */
  company?: Maybe<Scalars['String']['output']>;
  /** Two-digit country code as per  ISO 3166-1 alpha-2 */
  countryCode?: Maybe<Scalars['String']['output']>;
  /** Email address of the contact. */
  email?: Maybe<Scalars['String']['output']>;
  /** Given name (first name) of the contact. */
  firstName?: Maybe<Scalars['String']['output']>;
  /** Formatted address. */
  formatted?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the address. */
  id: Scalars['ID']['output'];
  /** Family name (last name) of the contact. */
  lastName?: Maybe<Scalars['String']['output']>;
  /** Gets the metadata associated with the address. */
  metadata: Array<MetadataItem>;
  /** Phone number of the contact. */
  phone?: Maybe<Scalars['String']['output']>;
  /** Postal code. */
  postalCode?: Maybe<Scalars['String']['output']>;
  /** Name of the state, for example, Colorado. */
  state?: Maybe<Scalars['String']['output']>;
};


export type OrderAddressMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** A connection to a list of items. */
export type OrderConnection = {
  __typename?: 'OrderConnection';
  /** A list of edges. */
  edges?: Maybe<Array<OrderEdge>>;
  /** A flattened list of the nodes */
  nodes?: Maybe<Array<Order>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

export type OrderEdge = {
  __typename?: 'OrderEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Order;
};

/**
 * Represents a line item in a order, which includes details about the product, variant, and any associated discounts.
 *
 * Each line item contains information such as the product name, variant details, total price, and any applicable discounts. This allows for detailed tracking of items within a cart, including their pricing and discount applications.
 */
export type OrderLineItem = Node & {
  __typename?: 'OrderLineItem';
  /** Retrieves a paginated list of discount applications for a specific line item. */
  discountApplications: DiscountApplicationConnection;
  /** The unique identifier of the line item */
  id: Scalars['ID']['output'];
  /** Gets the metadata associated with the order line item. */
  metadata: Array<MetadataItem>;
  /**
   * This retrieves the product associated with a cart line item. If the product no longer exists—such as if it has been removed from the channel or deleted entirely—this will return `null`.
   * In such cases, you can still use other properties like `productName` and `productSlug` to display information about the product.
   * These fields are not directly tied to the product reference and remain available for display, even if the product itself is missing.
   * Note that these properties are eventually consistent and may not always reflect the latest product state.
   */
  product?: Maybe<Product>;
  /** The unique identifier of the product associated with the order line item. */
  productId: Scalars['ID']['output'];
  /** The name of the product. */
  productName: Scalars['String']['output'];
  /** Retrieves the slug of the product associated with a order line item. This is useful for generating URLs or displaying product information. */
  productSlug: Scalars['String']['output'];
  /** Gets the quantity of the order line item. */
  quantity: Scalars['Int']['output'];
  /** Retrieves the SKU (Stock Keeping Unit) of the variant associated with a order line item. The SKU is a unique identifier for the variant, often used for inventory management. */
  sku: Scalars['String']['output'];
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
  /**
   * This retrieves the variant associated with a cart line item. If the variant no longer exists—such as if it has been removed from the channel or deleted entirely—this will return `null`.
   * In such cases, you can still use other properties like `variantName` and `variantSku` to display information about the variant.
   * These fields are not directly tied to the variant reference and remain available for display, even if the variant itself is missing.
   * Note that these properties are eventually consistent and may not always reflect the latest variant state.
   */
  variant?: Maybe<ProductVariant>;
  /** The unique identifier of the variant associated with the order line item. */
  variantId: Scalars['ID']['output'];
  /** Retrieves the name of the variant associated with a order line item. This is useful for displaying the specific variant details to the user. */
  variantName: Scalars['String']['output'];
};


/**
 * Represents a line item in a order, which includes details about the product, variant, and any associated discounts.
 *
 * Each line item contains information such as the product name, variant details, total price, and any applicable discounts. This allows for detailed tracking of items within a cart, including their pricing and discount applications.
 */
export type OrderLineItemDiscountApplicationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Represents a line item in a order, which includes details about the product, variant, and any associated discounts.
 *
 * Each line item contains information such as the product name, variant details, total price, and any applicable discounts. This allows for detailed tracking of items within a cart, including their pricing and discount applications.
 */
export type OrderLineItemMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** A connection to a list of items. */
export type OrderLineItemConnection = {
  __typename?: 'OrderLineItemConnection';
  /** A list of edges. */
  edges?: Maybe<Array<OrderLineItemEdge>>;
  /** A flattened list of the nodes */
  nodes?: Maybe<Array<OrderLineItem>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

export type OrderLineItemEdge = {
  __typename?: 'OrderLineItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: OrderLineItem;
};

/** Represents a shipping line applied to an order. */
export type OrderShippingLine = Node & {
  __typename?: 'OrderShippingLine';
  /** The unique identifier of the order shipping line. */
  id: Scalars['ID']['output'];
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
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  OrderNumber = 'ORDER_NUMBER'
}

export enum OrderState {
  Cancelled = 'CANCELLED',
  Complete = 'COMPLETE',
  Confirmed = 'CONFIRMED',
  Open = 'OPEN'
}

/** A cursor that points to a specific page. */
export type PageCursor = {
  __typename?: 'PageCursor';
  /** The cursor. */
  cursor: Scalars['String']['output'];
  /** The page number. */
  page: Scalars['Int']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** A list of cursors to continue paginating backwards. */
  backwardCursors: Array<PageCursor>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** A list of cursors to continue paginating forwards. */
  forwardCursors: Array<PageCursor>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Payment = Node & {
  __typename?: 'Payment';
  /** The unique identifier for the payment. */
  id: Scalars['ID']['output'];
  /** The intended amount for the payment. */
  intendedAmount: Money;
  /** The paid amount for the payment. */
  paidAmount: Money;
  /** The refunded amount for the payment. */
  refundedAmount: Money;
};

/** A connection to a list of items. */
export type PaymentConnection = {
  __typename?: 'PaymentConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PaymentEdge>>;
  /** A flattened list of the nodes */
  nodes?: Maybe<Array<Payment>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

export type PaymentEdge = {
  __typename?: 'PaymentEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Payment;
};

export type PaymentGateway = {
  /** The unique identifier of the payment gateway. */
  id: Scalars['ID']['output'];
  /** The name of the payment gateway. */
  name: Scalars['String']['output'];
};

export type PaymentGatewayChannelMismatchError = UserError & {
  __typename?: 'PaymentGatewayChannelMismatchError';
  message: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type PaymentGatewayConnection = {
  __typename?: 'PaymentGatewayConnection';
  /** A list of edges. */
  edges?: Maybe<Array<PaymentGatewayEdge>>;
  /** A flattened list of the nodes */
  nodes?: Maybe<Array<PaymentGateway>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

export type PaymentGatewayEdge = {
  __typename?: 'PaymentGatewayEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: PaymentGateway;
};

export type PaymentGatewayNotFoundError = UserError & {
  __typename?: 'PaymentGatewayNotFoundError';
  message: Scalars['String']['output'];
};

export type PaymentGatewaySessionInitializeFailedError = UserError & {
  __typename?: 'PaymentGatewaySessionInitializeFailedError';
  message: Scalars['String']['output'];
};

export type PaymentSession = {
  /** The unique identifier of the payment session. */
  id: Scalars['ID']['output'];
  /** The payment gateway associated with the payment session. */
  paymentGateway: PaymentGateway;
};

export enum PaymentState {
  Authorized = 'AUTHORIZED',
  BalanceDue = 'BALANCE_DUE',
  Failed = 'FAILED',
  Overpaid = 'OVERPAID',
  Paid = 'PAID',
  PartiallyAuthorized = 'PARTIALLY_AUTHORIZED',
  PartiallyRefunded = 'PARTIALLY_REFUNDED',
  Pending = 'PENDING',
  Refunded = 'REFUNDED'
}

export type PostalCodeInfo = {
  __typename?: 'PostalCodeInfo';
  exampleList: Array<Scalars['String']['output']>;
  examples: Scalars['String']['output'];
  fieldName: Scalars['String']['output'];
  isRequired: Scalars['Boolean']['output'];
  regex: Scalars['String']['output'];
};

export type Price = Node & {
  __typename?: 'Price';
  /** The discounted price, if applicable. This is the price after any discounts have been applied. */
  discountedPrice?: Maybe<DiscountedPrice>;
  /** The unique identifier of the price. */
  id: Scalars['ID']['output'];
  /** The tax behavior of the product variant price. */
  taxBehavior: TaxBehavior;
  /** The Date and Time when the price becomes valid. */
  validFrom?: Maybe<Scalars['DateTime']['output']>;
  /** The Date and Time when the price becomes invalid. */
  validUntil?: Maybe<Scalars['DateTime']['output']>;
  /** The value of the original price. This does not contains discounts. */
  value: Money;
};

/**
 * Represents a product in Thor Commerce, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each product includes core details such as title, rich description, pricing, media assets, and customizable options (e.g., size, color). Variants enable multiple versions of a product with distinct attributes and prices. You can add or update images, videos, and other media to enrich the customer experience. Products can be organized into categories for intuitive browsing and discovery.
 */
export type Product = Node & {
  __typename?: 'Product';
  /** A list of attributes associated with the product. */
  attributeAssignments: Array<AttributeAssignment>;
  /** A list of categories associated with the product. */
  categories: CategoryConnection;
  /** A list of collections associated with the product. */
  collections: CollectionConnection;
  /** The description of the product. */
  description?: Maybe<Scalars['String']['output']>;
  /** Gets the hero variant for the product, the hero variant is the first variant of the product, or the specific variant chosen for the channel */
  heroVariant?: Maybe<ProductVariant>;
  /** The unique identifier of the product. */
  id: Scalars['ID']['output'];
  /** Custom metadata key/value pairs for the product. */
  metadata: Array<MetadataItem>;
  /** The name of the product. */
  name: Scalars['String']['output'];
  /** The price range of the product, which includes the minimum and maximum prices across all variants. */
  priceRange?: Maybe<ProductPriceRange>;
  /** The slug of the product, which is a URL-friendly identifier. */
  slug: Scalars['String']['output'];
  /** The tags associated with the product. */
  tags: Array<Scalars['String']['output']>;
  /** The variants of the product. */
  variants: ProductVariantConnection;
  /** The number of variants that are associated with the product and published in the current channel. */
  variantsCount: Scalars['Long']['output'];
  /** The vendor of the product. */
  vendor?: Maybe<Scalars['String']['output']>;
};


/**
 * Represents a product in Thor Commerce, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each product includes core details such as title, rich description, pricing, media assets, and customizable options (e.g., size, color). Variants enable multiple versions of a product with distinct attributes and prices. You can add or update images, videos, and other media to enrich the customer experience. Products can be organized into categories for intuitive browsing and discovery.
 */
export type ProductCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Represents a product in Thor Commerce, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each product includes core details such as title, rich description, pricing, media assets, and customizable options (e.g., size, color). Variants enable multiple versions of a product with distinct attributes and prices. You can add or update images, videos, and other media to enrich the customer experience. Products can be organized into categories for intuitive browsing and discovery.
 */
export type ProductCollectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Represents a product in Thor Commerce, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each product includes core details such as title, rich description, pricing, media assets, and customizable options (e.g., size, color). Variants enable multiple versions of a product with distinct attributes and prices. You can add or update images, videos, and other media to enrich the customer experience. Products can be organized into categories for intuitive browsing and discovery.
 */
export type ProductMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};


/**
 * Represents a product in Thor Commerce, encapsulating all information required to display and manage items across storefronts and sales channels.
 * Each product includes core details such as title, rich description, pricing, media assets, and customizable options (e.g., size, color). Variants enable multiple versions of a product with distinct attributes and prices. You can add or update images, videos, and other media to enrich the customer experience. Products can be organized into categories for intuitive browsing and discovery.
 */
export type ProductVariantsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export enum ProductAttributeType {
  Swatch = 'SWATCH',
  Text = 'TEXT'
}

export enum ProductCategorySortKeys {
  Id = 'ID',
  Manual = 'MANUAL',
  Name = 'NAME',
  Price = 'PRICE',
  Vendor = 'VENDOR'
}

export enum ProductCollectionSortKeys {
  Id = 'ID',
  Manual = 'MANUAL',
  Name = 'NAME',
  Price = 'PRICE',
  Vendor = 'VENDOR'
}

/** Represents a discounted price for a product variant. */
export type ProductDiscount = Node & {
  __typename?: 'ProductDiscount';
  /** Gets the ID of the product discount. */
  id: Scalars['ID']['output'];
  /** The name of the product discount. */
  name: Scalars['String']['output'];
  /** Gets the date and time when the product discount becomes valid. */
  validFrom?: Maybe<Scalars['DateTime']['output']>;
  /** Gets the date and time when the product discount is no longer valid. */
  validUntil?: Maybe<Scalars['DateTime']['output']>;
  /** Gets the value of the product discount. */
  value: ProductDiscountValue;
};

/** Represents an absolute discount value for a product variant. */
export type ProductDiscountAbsoluteValue = {
  __typename?: 'ProductDiscountAbsoluteValue';
  /** Gets the absolute discount values. */
  value?: Maybe<Money>;
};

/** Represents a relative discount value for a product variant. */
export type ProductDiscountRelativeValue = {
  __typename?: 'ProductDiscountRelativeValue';
  /** Gets the factor of the relative discount value. */
  factor: Scalars['Decimal']['output'];
};

export type ProductDiscountValue = ProductDiscountAbsoluteValue | ProductDiscountRelativeValue;

export type ProductPriceRange = {
  __typename?: 'ProductPriceRange';
  /** Gets the maximum price of the product in the specified currency. */
  maxPrice: Price;
  /** Gets the minimum price of the product in the specified currency. */
  minPrice: Price;
};

export enum ProductSortKeys {
  Id = 'ID',
  Name = 'NAME',
  Price = 'PRICE',
  Vendor = 'VENDOR'
}

export type ProductVariant = Node & {
  __typename?: 'ProductVariant';
  /** Returns the availability status of the variant, including sale eligibility and stock details. */
  availability?: Maybe<ProductVariantAvailability>;
  /** The barcode (for example, ISBN, UPC, or GTIN) associated with the variant. */
  barcode?: Maybe<Scalars['String']['output']>;
  /** Gets the unique identifier of the variant. */
  id: Scalars['ID']['output'];
  /** Gets the featured image for the variant, the featured image is the first media of type image */
  image?: Maybe<Media>;
  /** A list of media associated with the variant. */
  media: MediaConnection;
  /** Custom metadata key/value pairs for the product variant. */
  metadata: Array<MetadataItem>;
  /** The name of the variant. */
  name: Scalars['String']['output'];
  /** Gets the scoped price for the variant, the scoped price is the price for the current channel and currency. */
  price?: Maybe<Price>;
  /** Gets the product associated with the variant. */
  product: Product;
  /** List of attributes and values applied to the variant. */
  selectedAttributes: Array<SelectedAttribute>;
  /** Gets the SKU (Stock Keeping Unit) of the variant. */
  sku?: Maybe<Scalars['String']['output']>;
};


export type ProductVariantMediaArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type ProductVariantMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ProductVariantAvailability = {
  __typename?: 'ProductVariantAvailability';
  /** Indicates whether the variant is available for purchase in the current channel. If `Channel`, isn't specified, it will throw an exception. */
  availableForPurchase: Scalars['Boolean']['output'];
  /** Number of items of the Product Variant that are in stock. */
  availableQuantity: Scalars['Int']['output'];
  /** The stock policy for the inventory, which determines how stock is managed. */
  stockPolicy: StockPolicy;
};

/** A connection to a list of items. */
export type ProductVariantConnection = {
  __typename?: 'ProductVariantConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ProductVariantEdge>>;
  /** A flattened list of the nodes */
  nodes?: Maybe<Array<ProductVariant>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

export type ProductVariantEdge = {
  __typename?: 'ProductVariantEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ProductVariant;
};

export type ProductVariantNotFoundError = UserError & {
  __typename?: 'ProductVariantNotFoundError';
  message: Scalars['String']['output'];
};

export type ProductsConnection = {
  __typename?: 'ProductsConnection';
  /** Gets the aggregates for the products in the current connection. */
  aggregates: Array<Facet>;
  /** A list of edges. */
  edges?: Maybe<Array<ProductsEdge>>;
  /** Gets the facets for the products in the current connection. Facets provide a way to retrieve aggregated information about the products, such as counts of products by certain attributes (e.g., color, size, brand) that can be used for filtering and navigation in the storefront. */
  facets: Array<Facet>;
  /** A flattened list of the nodes */
  nodes?: Maybe<Array<Product>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

export type ProductsEdge = {
  __typename?: 'ProductsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Product;
};

export type Query = {
  __typename?: 'Query';
  /** Retrieves a cart by its ID. */
  cart?: Maybe<Cart>;
  /** Returns a list of categories. */
  categories: CategoryConnection;
  /** Gets a single `Category` by its ID or slug. */
  category?: Maybe<Category>;
  /** Gets a single `Collection` by its ID or slug. */
  collection?: Maybe<Collection>;
  /** Returns a list of collections. */
  collections: CollectionConnection;
  /** Retrieves a list of all countries. */
  countries: Array<CountryInfo>;
  customer?: Maybe<Customer>;
  node?: Maybe<Node>;
  /** Retrieves a single order by `ID`. */
  order?: Maybe<Order>;
  /** Retrieves a paginated list of payment gateways. */
  paymentGateways: PaymentGatewayConnection;
  /** Gets a single `Product` by its ID or slug. */
  product?: Maybe<Product>;
  /** Returns a list of products. */
  products: ProductsConnection;
};


export type QueryCartArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  priceChannelId?: InputMaybe<Scalars['ID']['input']>;
  priceCountry?: InputMaybe<Scalars['String']['input']>;
  priceCurrency?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  priceChannelId?: InputMaybe<Scalars['ID']['input']>;
  priceCountry?: InputMaybe<Scalars['String']['input']>;
  priceCurrency?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  priceChannelId?: InputMaybe<Scalars['ID']['input']>;
  priceCountry?: InputMaybe<Scalars['String']['input']>;
  priceCurrency?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCollectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPaymentGatewaysArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  cartId: Scalars['ID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  priceChannelId?: InputMaybe<Scalars['ID']['input']>;
  priceCountry?: InputMaybe<Scalars['String']['input']>;
  priceCurrency?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  priceChannelId?: InputMaybe<Scalars['ID']['input']>;
  priceCountry?: InputMaybe<Scalars['String']['input']>;
  priceCurrency?: InputMaybe<Scalars['String']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: SortDirection;
  sortKey?: ProductSortKeys;
  storeId?: InputMaybe<Scalars['ID']['input']>;
};

export type RelativeShippingMethodRate = CartAvailableShippingMethodRate & {
  __typename?: 'RelativeShippingMethodRate';
  /** The unique identifier for the shipping method rate. */
  id: Scalars['ID']['output'];
  /** The rate of the shipping method rate, expressed as a percentage of the total cost. */
  rate: Scalars['Float']['output'];
};

export type RelativeValue = {
  __typename?: 'RelativeValue';
  /** The percentage value of the relative value. */
  percentage: Scalars['Decimal']['output'];
};

export enum ReplicationStrategy {
  PartialReplication = 'PARTIAL_REPLICATION',
  SkipUnavailable = 'SKIP_UNAVAILABLE',
  Strict = 'STRICT'
}

export type SelectedAttribute = {
  __typename?: 'SelectedAttribute';
  /** The selected attribute */
  attribute: Attribute;
  /** The selected attribute value. */
  attributeValue: AttributeValue;
  /** The selected attribute name. */
  name: Scalars['String']['output'];
  /** The selected attribute ID. */
  value: Scalars['String']['output'];
};

export enum ShipmentState {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Ready = 'READY',
  Shipped = 'SHIPPED'
}

export type ShippingMethod = Node & {
  __typename?: 'ShippingMethod';
  /** The description of the shipping method. */
  description?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the shipping method. */
  id: Scalars['ID']['output'];
  /** Gets the metadata associated with the shipping method. */
  metadata: Array<MetadataItem>;
  /** The name of the shipping method. */
  name: Scalars['String']['output'];
  /** The sku of the shipping method. */
  sku?: Maybe<Scalars['String']['output']>;
};


export type ShippingMethodMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ShippingMethodNotFoundError = UserError & {
  __typename?: 'ShippingMethodNotFoundError';
  message: Scalars['String']['output'];
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum StockPolicy {
  NotTracked = 'NOT_TRACKED',
  Tracked = 'TRACKED'
}

export type Store = {
  __typename?: 'Store';
  id: Scalars['ID']['output'];
};

export type StripePaymentGateway = PaymentGateway & {
  __typename?: 'StripePaymentGateway';
  /** The unique identifier of the payment gateway. */
  id: Scalars['ID']['output'];
  /** Is true if the payment gateway is in test mode. */
  isTest: Scalars['Boolean']['output'];
  /** The name of the payment gateway. */
  name: Scalars['String']['output'];
  /** The publishable key for the Stripe payment gateway. */
  publishableKey: Scalars['String']['output'];
};

export type StripePaymentSession = PaymentSession & {
  __typename?: 'StripePaymentSession';
  /** The unique identifier of the payment session. */
  clientSecret: Scalars['String']['output'];
  /** The unique identifier of the payment session. */
  id: Scalars['ID']['output'];
  /** The payment gateway associated with the payment session. */
  paymentGateway: PaymentGateway;
  /** The unique identifier of the payment intent. */
  paymentIntentId: Scalars['String']['output'];
};

export type SwatchAttributeValue = AttributeValue & {
  __typename?: 'SwatchAttributeValue';
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The media associated the swatch. */
  media?: Maybe<Media>;
  /** Custom metadata key/value pairs for the attribute value. */
  metadata: Array<MetadataItem>;
  /** The value of the attribute. */
  value: Scalars['String']['output'];
};


export type SwatchAttributeValueMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum TaxBehavior {
  Exclusive = 'EXCLUSIVE',
  Inclusive = 'INCLUSIVE'
}

/** Represents a portion of a tax rate applied to a cart or line item, detailing the specific tax amount and its type. */
export type TaxPortion = {
  __typename?: 'TaxPortion';
  /** Gets the name of the tax portion, which describes the type of tax applied (e.g., VAT, sales tax). */
  name: Scalars['String']['output'];
  /** Gets the amount of the tax portion, which is the specific tax amount applied to the cart or line item. */
  rate: Scalars['Decimal']['output'];
};

/** Represents the tax rate applied to a cart or line item, including the rate and any applicable tax portions. */
export type TaxRate = {
  __typename?: 'TaxRate';
  /** Gets the tax composition of the tax rate, which includes details about how the tax is structured. */
  composition: TaxRateComposition;
  /** The tax portions of the tax rate, which detail how the tax is divided among different components. */
  portions: Array<TaxPortion>;
  /** Gets the tax rate as a decimal value. */
  rate: Scalars['Decimal']['output'];
  taxPortions: Array<TaxPortion>;
};

export enum TaxRateComposition {
  Additive = 'ADDITIVE',
  Compound = 'COMPOUND'
}

/** This type represents the taxed price of an item. If it is set to null, it means that the item has not had its taxed price calculated yet. */
export type TaxedPrice = {
  __typename?: 'TaxedPrice';
  /** The total price including tax. */
  gross: Money;
  /** The total price excluding tax. */
  net: Money;
  /** The tax amount. */
  tax: Money;
};

export type TextAttributeValue = AttributeValue & {
  __typename?: 'TextAttributeValue';
  /** The unique identifier of the attribute value. */
  id: Scalars['ID']['output'];
  /** Custom metadata key/value pairs for the attribute value. */
  metadata: Array<MetadataItem>;
  /** The value of the attribute. */
  value: Scalars['String']['output'];
};


export type TextAttributeValueMetadataArgs = {
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
};

/**
 * Represents the unit price of a product or variant in a cart or order, including the monetary value and currency and potentially discounted price.
 *
 * The unit price is expressed in the smallest unit of the currency, allowing for precise calculations and display of product pricing.
 */
export type UnitPrice = {
  __typename?: 'UnitPrice';
  /** The three-letter currency code that represents a world currency used in a store. Currency codes include standard ISO 4217 codes, legacy codes, and non-standard codes. For example, USD. */
  discountedPrice?: Maybe<DiscountedPrice>;
  /** Gets the tax behavior of the unit price. */
  taxBehavior: TaxBehavior;
  /** The monetary value in the smallest unit of the currency. */
  value: Money;
};

export type UpdateCartLineItemsInsufficientStockError = UserError & {
  __typename?: 'UpdateCartLineItemsInsufficientStockError';
  message: Scalars['String']['output'];
};

export type UserError = {
  message: Scalars['String']['output'];
};

export type ZoneInfo = {
  __typename?: 'ZoneInfo';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  postalCodeRegex?: Maybe<Scalars['String']['output']>;
};

export type ProductGridTileFragment = { __typename?: 'Product', id: string, name: string, slug: string, heroVariant?: { __typename?: 'ProductVariant', image?: { __typename?: 'Media', src: string } | null } | null, priceRange?: { __typename?: 'ProductPriceRange', minPrice: { __typename?: 'Price', value: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number }, discountedPrice?: { __typename?: 'DiscountedPrice', value: { __typename?: 'Money', centAmount: any, fractionDigits: number, currencyCode: string }, discount?: { __typename?: 'ProductDiscount', value:
            | { __typename?: 'ProductDiscountAbsoluteValue', value?: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } | null }
            | { __typename?: 'ProductDiscountRelativeValue', factor: any }
           } | null } | null } } | null } & { ' $fragmentName'?: 'ProductGridTileFragment' };

export type CustomerUpdateMutationVariables = Exact<{
  input: CustomerUpdateInput;
}>;


export type CustomerUpdateMutation = { __typename?: 'Mutation', customerUpdate: { __typename?: 'CustomerUpdatePayload', customer?: { __typename?: 'Customer', id: string, email?: string | null, firstName?: string | null, lastName?: string | null } | null } };

export type AccountDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountDashboardQuery = { __typename?: 'Query', customer?: { __typename?: 'Customer', id: string, email?: string | null, firstName?: string | null, lastName?: string | null, ordersCount: any, customerGroups: { __typename?: 'CustomerGroupConnection', edges?: Array<{ __typename?: 'CustomerGroupEdge', node: { __typename?: 'CustomerGroup', id: string, name: string } }> | null }, defaultShippingAddress?: { __typename?: 'CustomerAddress', id: string, firstName?: string | null, lastName?: string | null, address1?: string | null, address2?: string | null, postalCode?: string | null, city?: string | null, state?: string | null, countryCode?: string | null } | null, defaultBillingAddress?: { __typename?: 'CustomerAddress', id: string, firstName?: string | null, lastName?: string | null, address1?: string | null, address2?: string | null, postalCode?: string | null, city?: string | null, state?: string | null, countryCode?: string | null } | null, addresses: { __typename?: 'CustomerAddressConnection', totalCount: number, edges?: Array<{ __typename?: 'CustomerAddressEdge', node: { __typename?: 'CustomerAddress', id: string, name?: string | null, firstName?: string | null, lastName?: string | null, address1?: string | null, address2?: string | null, postalCode?: string | null, city?: string | null, state?: string | null, countryCode?: string | null } }> | null }, orders: { __typename?: 'OrderConnection', totalCount: number, edges?: Array<{ __typename?: 'OrderEdge', node: { __typename?: 'Order', id: string, orderNumber: number, createdAt: any, orderState: OrderState, paymentState: PaymentState, shipmentState: ShipmentState, lineItemsQuantity: any, total: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } } }> | null } } | null };

export type CartCreateMutationVariables = Exact<{
  input: CartCreateInput;
}>;


export type CartCreateMutation = { __typename?: 'Mutation', cartCreate: { __typename?: 'CartCreatePayload', cart?: { __typename?: 'Cart', id: string } | null } };

export type CartUpdateMutationVariables = Exact<{
  input: CartUpdateInput;
}>;


export type CartUpdateMutation = { __typename?: 'Mutation', cartUpdate: { __typename?: 'CartUpdatePayload', cart?: { __typename?: 'Cart', id: string } | null } };

export type CartReplicateMutationVariables = Exact<{
  input: CartReplicateInput;
}>;


export type CartReplicateMutation = { __typename?: 'Mutation', cartReplicate: { __typename?: 'CartReplicatePayload', cart?: { __typename?: 'Cart', id: string } | null } };

export type CartDiscountCodeAddMutationVariables = Exact<{
  input: CartDiscountCodeAddInput;
}>;


export type CartDiscountCodeAddMutation = { __typename?: 'Mutation', cartDiscountCodeAdd: { __typename?: 'CartDiscountCodeAddPayload', cart?: { __typename?: 'Cart', id: string } | null, errors?: Array<
      | { __typename?: 'CartAddDiscountCodeNotFoundError', code: 'CartAddDiscountCodeNotFoundError' }
      | { __typename?: 'CartDiscountCodeMaxApplicationsReachedError', code: 'CartDiscountCodeMaxApplicationsReachedError' }
      | { __typename?: 'CartNotFoundError', code: 'CartNotFoundError' }
    > | null } };

export type CartDiscountCodeRemoveMutationVariables = Exact<{
  input: CartDiscountCodeRemoveInput;
}>;


export type CartDiscountCodeRemoveMutation = { __typename?: 'Mutation', cartDiscountCodeRemove: { __typename?: 'CartDiscountCodeRemovePayload', cart?: { __typename?: 'Cart', id: string } | null } };

export type CartLineItemsUpdateMutationVariables = Exact<{
  input: CartLineItemsUpdateInput;
}>;


export type CartLineItemsUpdateMutation = { __typename?: 'Mutation', cartLineItemsUpdate: { __typename?: 'CartLineItemsUpdatePayload', cart?: { __typename?: 'Cart', id: string } | null } };

export type CartLineItemsRemoveMutationVariables = Exact<{
  input: CartLineItemsRemoveInput;
}>;


export type CartLineItemsRemoveMutation = { __typename?: 'Mutation', cartLineItemsRemove: { __typename?: 'CartLineItemsRemovePayload', cart?: { __typename?: 'Cart', id: string } | null } };

export type NavbarCartQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type NavbarCartQuery = { __typename?: 'Query', cart?: { __typename?: 'Cart', id: string, lineItemsQuantity: any, state: CartState, currency: string, customerId?: string | null, store?: { __typename?: 'Store', id: string } | null } | null };

export type CartDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CartDetailsQuery = { __typename?: 'Query', cart?: { __typename?: 'Cart', id: string, customerId?: string | null, lineItemsQuantity: any, shippingAddress?: { __typename?: 'CartAddress', countryCode?: string | null } | null, lineItems: { __typename?: 'CartLineItemConnection', edges?: Array<{ __typename?: 'CartLineItemEdge', node: { __typename?: 'CartLineItem', id: string, taxBehavior: TaxBehavior, variantName: string, productName: string, quantity: number, productSlug: string, variant?: { __typename?: 'ProductVariant', id: string, image?: { __typename?: 'Media', src: string } | null, selectedAttributes: Array<{ __typename?: 'SelectedAttribute', value: string }>, availability?: { __typename?: 'ProductVariantAvailability', availableForPurchase: boolean, availableQuantity: number, stockPolicy: StockPolicy } | null } | null, unitPrice: { __typename?: 'UnitPrice', value: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number }, discountedPrice?: { __typename?: 'DiscountedPrice', value: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } } | null }, discountApplications: { __typename?: 'DiscountApplicationConnection', edges?: Array<{ __typename?: 'DiscountApplicationEdge', node: { __typename?: 'DiscountApplication', label: string, discountedAmount: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } } }> | null }, total: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } } }> | null }, discountCodes: Array<{ __typename?: 'DiscountCode', code: string, error?: DiscountCodeError | null }>, subtotal: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number }, taxedPrice?: { __typename?: 'TaxedPrice', tax: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } } | null, total: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } } | null };

export type CartCustomerDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type CartCustomerDetailsQuery = { __typename?: 'Query', customer?: { __typename?: 'Customer', id: string, customerGroups: { __typename?: 'CustomerGroupConnection', edges?: Array<{ __typename?: 'CustomerGroupEdge', node: { __typename?: 'CustomerGroup', id: string, name: string } }> | null } } | null };

export type CategoriesQueryVariables = Exact<{
  storeId: Scalars['ID']['input'];
  currency: Scalars['String']['input'];
}>;


export type CategoriesQuery = { __typename?: 'Query', categories: { __typename?: 'CategoryConnection', edges?: Array<{ __typename?: 'CategoryEdge', node: { __typename?: 'Category', id: string, name: string, slug: string, childrenCount: any, productsCount: any } }> | null } };

export type CategoryGridQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  currency: Scalars['String']['input'];
  storeId: Scalars['ID']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  sortDirection: SortDirection;
  sortKey: ProductCategorySortKeys;
}>;


export type CategoryGridQuery = { __typename?: 'Query', category?: { __typename?: 'Category', id: string, name: string, products: { __typename?: 'ProductsConnection', totalCount: number, edges?: Array<{ __typename?: 'ProductsEdge', node: (
          { __typename?: 'Product', id: string }
          & { ' $fragmentRefs'?: { 'ProductGridTileFragment': ProductGridTileFragment } }
        ) }> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } } | null };

export type AvailableShippingMethodsFragment = { __typename?: 'Cart', id: string, availableShippingMethods: Array<{ __typename?: 'CartAvailableShippingMethod', id: string, name: string, description?: string | null, rate:
      | { __typename?: 'AbsoluteShippingMethodRate', id: string, price: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } }
      | { __typename?: 'RelativeShippingMethodRate', rate: number, id: string }
     }> } & { ' $fragmentName'?: 'AvailableShippingMethodsFragment' };

export type CheckoutCartUpdateMutationVariables = Exact<{
  input: CartUpdateInput;
}>;


export type CheckoutCartUpdateMutation = { __typename?: 'Mutation', cartUpdate: { __typename?: 'CartUpdatePayload', cart?: { __typename?: 'Cart', id: string } | null, errors?: Array<
      | { __typename?: 'CartAuthenticationFailedError', message: string, code: 'CartAuthenticationFailedError' }
      | { __typename?: 'CartAuthorizationFailedError', message: string, code: 'CartAuthorizationFailedError' }
      | { __typename?: 'CartNotFoundError', message: string, code: 'CartNotFoundError' }
      | { __typename?: 'CartUpdatePriceChannelNotFoundError', message: string, code: 'CartUpdatePriceChannelNotFoundError' }
    > | null } };

export type CheckoutCartShippingLinesSetMutationVariables = Exact<{
  input: CartShippingLinesSetInput;
}>;


export type CheckoutCartShippingLinesSetMutation = { __typename?: 'Mutation', cartShippingLinesSet: { __typename?: 'CartShippingLinesSetPayload', cart?: { __typename?: 'Cart', id: string, shippingLines: Array<{ __typename?: 'CartShippingLine', id: string, shippingMethod: { __typename?: 'LineShippingMethod', id: string, name: string } }> } | null } };

export type CartPaymentSessionInitializeMutationVariables = Exact<{
  input: CartPaymentSessionInitializeInput;
}>;


export type CartPaymentSessionInitializeMutation = { __typename?: 'Mutation', cartPaymentSessionInitialize: { __typename?: 'CartPaymentSessionInitializePayload', cart?: { __typename?: 'Cart', id: string, paymentSession?: { __typename?: 'StripePaymentSession', clientSecret: string, paymentGateway:
          | { __typename?: 'ManualPaymentGateway' }
          | { __typename?: 'StripePaymentGateway', publishableKey: string }
         } | null } | null, errors?: Array<
      | { __typename?: 'CartNotFoundError', code: 'CartNotFoundError' }
      | { __typename?: 'PaymentGatewayChannelMismatchError', code: 'PaymentGatewayChannelMismatchError' }
      | { __typename?: 'PaymentGatewayNotFoundError', code: 'PaymentGatewayNotFoundError' }
      | { __typename?: 'PaymentGatewaySessionInitializeFailedError', code: 'PaymentGatewaySessionInitializeFailedError' }
    > | null } };

export type CartCompleteMutationVariables = Exact<{
  input: CartCompleteInput;
}>;


export type CartCompleteMutation = { __typename?: 'Mutation', cartComplete: { __typename?: 'CartCompletePayload', order?: { __typename?: 'Order', id: string } | null, errors?: Array<
      | { __typename?: 'CartCompletionDiscountCodeAlreadyUsedError', code: 'CartCompletionDiscountCodeAlreadyUsedError' }
      | { __typename?: 'CartCompletionDiscrepancyError', code: 'CartCompletionDiscrepancyError' }
      | { __typename?: 'CartNotFoundError', code: 'CartNotFoundError' }
    > | null } };

export type CheckoutCartDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CheckoutCartDetailsQuery = { __typename?: 'Query', cart?: (
    { __typename?: 'Cart', id: string, state: CartState, customerEmail?: string | null, paymentSession?: { __typename: 'StripePaymentSession', clientSecret: string, paymentGateway:
        | { __typename?: 'ManualPaymentGateway' }
        | { __typename?: 'StripePaymentGateway', publishableKey: string }
       } | null, shippingLines: Array<{ __typename?: 'CartShippingLine', id: string, taxBehavior: TaxBehavior, shippingMethod: { __typename?: 'LineShippingMethod', id: string }, taxedPrice?: { __typename?: 'TaxedPrice', net: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number }, gross: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } } | null, total: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } }>, shippingAddress?: { __typename?: 'CartAddress', firstName?: string | null, lastName?: string | null, address1?: string | null, address2?: string | null, phone?: string | null, city?: string | null, countryCode?: string | null, postalCode?: string | null, state?: string | null } | null, lineItems: { __typename?: 'CartLineItemConnection', edges?: Array<{ __typename?: 'CartLineItemEdge', node: { __typename?: 'CartLineItem', id: string, taxBehavior: TaxBehavior, productName: string, variantName: string, quantity: number, variant?: { __typename?: 'ProductVariant', id: string, image?: { __typename?: 'Media', src: string } | null, selectedAttributes: Array<{ __typename?: 'SelectedAttribute', value: string }> } | null, discountApplications: { __typename?: 'DiscountApplicationConnection', edges?: Array<{ __typename?: 'DiscountApplicationEdge', node: { __typename?: 'DiscountApplication', discountedAmount: { __typename?: 'Money', centAmount: any, fractionDigits: number, currencyCode: string } } }> | null }, unitPrice: { __typename?: 'UnitPrice', value: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number }, discountedPrice?: { __typename?: 'DiscountedPrice', value: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } } | null }, taxedPrice?: { __typename?: 'TaxedPrice', net: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number }, gross: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } } | null, total: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } } }> | null }, subtotal: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number }, taxedPrice?: { __typename?: 'TaxedPrice', gross: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number }, net: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number }, tax: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } } | null, total: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } }
    & { ' $fragmentRefs'?: { 'AvailableShippingMethodsFragment': AvailableShippingMethodsFragment } }
  ) | null };

export type CheckoutOrderDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CheckoutOrderDetailsQuery = { __typename?: 'Query', order?: { __typename?: 'Order', id: string, subtotal: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number }, taxedPrice?: { __typename?: 'TaxedPrice', gross: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number }, net: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } } | null, total: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } } | null };

export type CheckoutPaymentGatewaysQueryVariables = Exact<{
  cartId: Scalars['ID']['input'];
}>;


export type CheckoutPaymentGatewaysQuery = { __typename?: 'Query', paymentGateways: { __typename?: 'PaymentGatewayConnection', edges?: Array<{ __typename?: 'PaymentGatewayEdge', node:
        | { __typename: 'ManualPaymentGateway', id: string, name: string }
        | { __typename: 'StripePaymentGateway', publishableKey: string, id: string, name: string }
       }> | null } };

export type CollectionsQueryVariables = Exact<{
  storeId: Scalars['ID']['input'];
  currency: Scalars['String']['input'];
}>;


export type CollectionsQuery = { __typename?: 'Query', collections: { __typename?: 'CollectionConnection', edges?: Array<{ __typename?: 'CollectionEdge', node: { __typename?: 'Collection', id: string, name: string, slug: string, products: { __typename?: 'ProductsConnection', totalCount: number } } }> | null } };

export type CollectionGridQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  currency: Scalars['String']['input'];
  storeId: Scalars['ID']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  sortDirection: SortDirection;
  sortKey: ProductCollectionSortKeys;
}>;


export type CollectionGridQuery = { __typename?: 'Query', collection?: { __typename?: 'Collection', id: string, name: string, products: { __typename?: 'ProductsConnection', totalCount: number, edges?: Array<{ __typename?: 'ProductsEdge', node: (
          { __typename?: 'Product', id: string }
          & { ' $fragmentRefs'?: { 'ProductGridTileFragment': ProductGridTileFragment } }
        ) }> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } } | null };

export type HomePageQueryVariables = Exact<{
  storeId: Scalars['ID']['input'];
  currency: Scalars['String']['input'];
}>;


export type HomePageQuery = { __typename?: 'Query', categories: { __typename?: 'CategoryConnection', edges?: Array<{ __typename?: 'CategoryEdge', node: { __typename?: 'Category', id: string, name: string, slug: string, productsCount: any } }> | null }, collections: { __typename?: 'CollectionConnection', edges?: Array<{ __typename?: 'CollectionEdge', node: { __typename?: 'Collection', id: string, name: string, slug: string, products: { __typename?: 'ProductsConnection', totalCount: number } } }> | null }, products: { __typename?: 'ProductsConnection', edges?: Array<{ __typename?: 'ProductsEdge', node: { __typename?: 'Product', id: string, name: string, slug: string, heroVariant?: { __typename?: 'ProductVariant', image?: { __typename?: 'Media', src: string } | null } | null, priceRange?: { __typename?: 'ProductPriceRange', minPrice: { __typename?: 'Price', value: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number }, discountedPrice?: { __typename?: 'DiscountedPrice', value: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } } | null } } | null } }> | null } };

export type CartLineItemsAddMutationVariables = Exact<{
  input: CartLineItemsAddInput;
}>;


export type CartLineItemsAddMutation = { __typename?: 'Mutation', cartLineItemsAdd: { __typename?: 'CartLineItemsAddPayload', cart?: { __typename?: 'Cart', id: string } | null, errors?: Array<
      | { __typename: 'CartLineItemPriceNotFoundError' }
      | { __typename: 'CartLineItemsInsufficientStockError' }
      | { __typename: 'CartNotFoundError' }
      | { __typename: 'ProductVariantNotFoundError' }
    > | null } };

export type ProductsGridQueryVariables = Exact<{
  storeId: Scalars['ID']['input'];
  currency: Scalars['String']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  sortDirection: SortDirection;
  sortKey: ProductSortKeys;
}>;


export type ProductsGridQuery = { __typename?: 'Query', products: { __typename?: 'ProductsConnection', totalCount: number, edges?: Array<{ __typename?: 'ProductsEdge', node: (
        { __typename?: 'Product', id: string }
        & { ' $fragmentRefs'?: { 'ProductGridTileFragment': ProductGridTileFragment } }
      ) }> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } };

export type ProductDetailQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
  currency: Scalars['String']['input'];
  storeId: Scalars['ID']['input'];
}>;


export type ProductDetailQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, name: string, description?: string | null, categories: { __typename?: 'CategoryConnection', edges?: Array<{ __typename?: 'CategoryEdge', node: { __typename?: 'Category', id: string, name: string, slug: string, ancestors: Array<{ __typename?: 'Category', id: string, name: string, slug: string }> } }> | null }, collections: { __typename?: 'CollectionConnection', edges?: Array<{ __typename?: 'CollectionEdge', node: { __typename?: 'Collection', id: string, name: string, slug: string } }> | null }, attributeAssignments: Array<{ __typename?: 'AttributeAssignment', name: string, attribute: { __typename?: 'Attribute', type: ProductAttributeType }, values: { __typename?: 'AttributeValueConnection', edges?: Array<{ __typename?: 'AttributeValueEdge', node:
            | { __typename?: 'SwatchAttributeValue', color?: string | null, value: string, media?: { __typename?: 'Media', src: string } | null }
            | { __typename?: 'TextAttributeValue', value: string }
           }> | null } }>, variants: { __typename?: 'ProductVariantConnection', edges?: Array<{ __typename?: 'ProductVariantEdge', node: { __typename?: 'ProductVariant', id: string, sku?: string | null, selectedAttributes: Array<{ __typename?: 'SelectedAttribute', name: string, value: string }>, image?: { __typename?: 'Media', src: string } | null, availability?: { __typename?: 'ProductVariantAvailability', availableForPurchase: boolean, availableQuantity: number, stockPolicy: StockPolicy } | null, price?: { __typename?: 'Price', taxBehavior: TaxBehavior, value: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number }, discountedPrice?: { __typename?: 'DiscountedPrice', value: { __typename?: 'Money', centAmount: any, fractionDigits: number, currencyCode: string }, discount?: { __typename?: 'ProductDiscount', value:
                  | { __typename: 'ProductDiscountAbsoluteValue', value?: { __typename?: 'Money', centAmount: any, currencyCode: string, fractionDigits: number } | null }
                  | { __typename: 'ProductDiscountRelativeValue', factor: any }
                 } | null } | null } | null, media: { __typename?: 'MediaConnection', edges?: Array<{ __typename?: 'MediaEdge', node: { __typename?: 'Media', src: string } }> | null } } }> | null } } | null };

export const ProductGridTileFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductGridTile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"heroVariant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductDiscountRelativeValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"factor"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductDiscountAbsoluteValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProductGridTileFragment, unknown>;
export const AvailableShippingMethodsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AvailableShippingMethods"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"availableShippingMethods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"rate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AbsoluteShippingMethodRate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RelativeShippingMethodRate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AvailableShippingMethodsFragment, unknown>;
export const CustomerUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CustomerUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<CustomerUpdateMutation, CustomerUpdateMutationVariables>;
export const AccountDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountDashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"ordersCount"}},{"kind":"Field","name":{"kind":"Name","value":"customerGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"defaultShippingAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"address1"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"defaultBillingAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"address1"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"6"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"address1"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"orderState"}},{"kind":"Field","name":{"kind":"Name","value":"paymentState"}},{"kind":"Field","name":{"kind":"Name","value":"shipmentState"}},{"kind":"Field","name":{"kind":"Name","value":"lineItemsQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"total"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AccountDashboardQuery, AccountDashboardQueryVariables>;
export const CartCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CartCreateMutation, CartCreateMutationVariables>;
export const CartUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CartUpdateMutation, CartUpdateMutationVariables>;
export const CartReplicateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartReplicate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartReplicateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartReplicate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CartReplicateMutation, CartReplicateMutationVariables>;
export const CartDiscountCodeAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartDiscountCodeAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartDiscountCodeAddInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartDiscountCodeAdd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<CartDiscountCodeAddMutation, CartDiscountCodeAddMutationVariables>;
export const CartDiscountCodeRemoveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartDiscountCodeRemove"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartDiscountCodeRemoveInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartDiscountCodeRemove"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CartDiscountCodeRemoveMutation, CartDiscountCodeRemoveMutationVariables>;
export const CartLineItemsUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartLineItemsUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartLineItemsUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartLineItemsUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CartLineItemsUpdateMutation, CartLineItemsUpdateMutationVariables>;
export const CartLineItemsRemoveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartLineItemsRemove"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartLineItemsRemoveInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartLineItemsRemove"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CartLineItemsRemoveMutation, CartLineItemsRemoveMutationVariables>;
export const NavbarCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NavbarCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lineItemsQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"store"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<NavbarCartQuery, NavbarCartQueryVariables>;
export const CartDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CartDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"shippingAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countryCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lineItemsQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"lineItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taxBehavior"}},{"kind":"Field","name":{"kind":"Name","value":"variantName"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"productSlug"}},{"kind":"Field","name":{"kind":"Name","value":"variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}}]}},{"kind":"Field","name":{"kind":"Name","value":"selectedAttributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"availability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"availableForPurchase"}},{"kind":"Field","name":{"kind":"Name","value":"availableQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"stockPolicy"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountApplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"discountedAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountCodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"taxedPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tax"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}}]}}]} as unknown as DocumentNode<CartDetailsQuery, CartDetailsQueryVariables>;
export const CartCustomerDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CartCustomerDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customerGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CartCustomerDetailsQuery, CartCustomerDetailsQueryVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"48"}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"priceCurrency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currency"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"childrenCount"}},{"kind":"Field","name":{"kind":"Name","value":"productsCount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const CategoryGridDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CategoryGrid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SortDirection"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategorySortKeys"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"priceCurrency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currency"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"15"}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortKey"}}},{"kind":"Argument","name":{"kind":"Name","value":"priceCurrency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currency"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductGridTile"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductGridTile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"heroVariant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductDiscountRelativeValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"factor"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductDiscountAbsoluteValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CategoryGridQuery, CategoryGridQueryVariables>;
export const CheckoutCartUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CheckoutCartUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CheckoutCartUpdateMutation, CheckoutCartUpdateMutationVariables>;
export const CheckoutCartShippingLinesSetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CheckoutCartShippingLinesSet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartShippingLinesSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartShippingLinesSet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shippingLines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shippingMethod"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CheckoutCartShippingLinesSetMutation, CheckoutCartShippingLinesSetMutationVariables>;
export const CartPaymentSessionInitializeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartPaymentSessionInitialize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartPaymentSessionInitializeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartPaymentSessionInitialize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"paymentSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentGateway"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StripePaymentGateway"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishableKey"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StripePaymentSession"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clientSecret"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<CartPaymentSessionInitializeMutation, CartPaymentSessionInitializeMutationVariables>;
export const CartCompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartComplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartCompleteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartComplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"code"},"name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<CartCompleteMutation, CartCompleteMutationVariables>;
export const CheckoutCartDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckoutCartDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AvailableShippingMethods"}},{"kind":"Field","name":{"kind":"Name","value":"paymentSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StripePaymentSession"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clientSecret"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paymentGateway"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StripePaymentGateway"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishableKey"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shippingLines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shippingMethod"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"taxBehavior"}},{"kind":"Field","name":{"kind":"Name","value":"taxedPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"net"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gross"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"customerEmail"}},{"kind":"Field","name":{"kind":"Name","value":"shippingAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"address1"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lineItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taxBehavior"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"variantName"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}}]}},{"kind":"Field","name":{"kind":"Name","value":"selectedAttributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountApplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discountedAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"taxBehavior"}},{"kind":"Field","name":{"kind":"Name","value":"taxedPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"net"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gross"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountApplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discountedAmount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"taxedPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gross"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"net"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tax"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AvailableShippingMethods"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"availableShippingMethods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"rate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AbsoluteShippingMethodRate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RelativeShippingMethodRate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CheckoutCartDetailsQuery, CheckoutCartDetailsQueryVariables>;
export const CheckoutOrderDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckoutOrderDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"taxedPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gross"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"net"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}}]}}]} as unknown as DocumentNode<CheckoutOrderDetailsQuery, CheckoutOrderDetailsQueryVariables>;
export const CheckoutPaymentGatewaysDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckoutPaymentGateways"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentGateways"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cartId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cartId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StripePaymentGateway"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishableKey"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CheckoutPaymentGatewaysQuery, CheckoutPaymentGatewaysQueryVariables>;
export const CollectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Collections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"48"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"priceCurrency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currency"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CollectionsQuery, CollectionsQueryVariables>;
export const CollectionGridDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CollectionGrid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SortDirection"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCollectionSortKeys"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"priceCurrency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currency"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"15"}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortKey"}}},{"kind":"Argument","name":{"kind":"Name","value":"priceCurrency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currency"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductGridTile"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductGridTile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"heroVariant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductDiscountRelativeValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"factor"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductDiscountAbsoluteValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CollectionGridQuery, CollectionGridQueryVariables>;
export const HomePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"6"}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"priceCurrency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currency"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"productsCount"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"collections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"4"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"priceCurrency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currency"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"8"}},{"kind":"Argument","name":{"kind":"Name","value":"sortKey"},"value":{"kind":"EnumValue","value":"ID"}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"EnumValue","value":"DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"priceCurrency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currency"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"heroVariant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<HomePageQuery, HomePageQueryVariables>;
export const CartLineItemsAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CartLineItemsAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CartLineItemsAddInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cartLineItemsAdd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<CartLineItemsAddMutation, CartLineItemsAddMutationVariables>;
export const ProductsGridDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductsGrid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SortDirection"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductSortKeys"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"15"}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortKey"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"priceCurrency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currency"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductGridTile"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductGridTile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"heroVariant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"priceRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductDiscountRelativeValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"factor"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductDiscountAbsoluteValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProductsGridQuery, ProductsGridQueryVariables>;
export const ProductDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"storeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"priceCurrency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currency"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"ancestors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"collections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"attributeAssignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"attribute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SwatchAttributeValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}}]}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"selectedAttributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}}]}},{"kind":"Field","name":{"kind":"Name","value":"availability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"availableForPurchase"}},{"kind":"Field","name":{"kind":"Name","value":"availableQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"stockPolicy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"discount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductDiscountRelativeValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"factor"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductDiscountAbsoluteValue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"centAmount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"fractionDigits"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"taxBehavior"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProductDetailQuery, ProductDetailQueryVariables>;