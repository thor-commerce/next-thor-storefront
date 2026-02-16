import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AbsoluteShippingMethodRateKeySpecifier = ('id' | 'price' | AbsoluteShippingMethodRateKeySpecifier)[];
export type AbsoluteShippingMethodRateFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AddressAlreadyExistsErrorKeySpecifier = ('message' | AddressAlreadyExistsErrorKeySpecifier)[];
export type AddressAlreadyExistsErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AddressNotFoundErrorKeySpecifier = ('message' | AddressNotFoundErrorKeySpecifier)[];
export type AddressNotFoundErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AttributeKeySpecifier = ('id' | 'metadata' | 'name' | 'type' | AttributeKeySpecifier)[];
export type AttributeFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AttributeAssignmentKeySpecifier = ('attribute' | 'id' | 'name' | 'values' | AttributeAssignmentKeySpecifier)[];
export type AttributeAssignmentFieldPolicy = {
	attribute?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	values?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AttributeValueKeySpecifier = ('id' | 'metadata' | 'value' | AttributeValueKeySpecifier)[];
export type AttributeValueFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AttributeValueConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | AttributeValueConnectionKeySpecifier)[];
export type AttributeValueConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AttributeValueEdgeKeySpecifier = ('cursor' | 'node' | AttributeValueEdgeKeySpecifier)[];
export type AttributeValueEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BaseAddressKeySpecifier = ('address1' | 'address2' | 'city' | 'company' | 'countryCode' | 'email' | 'firstName' | 'formatted' | 'id' | 'lastName' | 'metadata' | 'phone' | 'postalCode' | 'state' | BaseAddressKeySpecifier)[];
export type BaseAddressFieldPolicy = {
	address1?: FieldPolicy<any> | FieldReadFunction<any>,
	address2?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	company?: FieldPolicy<any> | FieldReadFunction<any>,
	countryCode?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	formatted?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	postalCode?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartKeySpecifier = ('availableShippingMethods' | 'billingAddress' | 'currency' | 'customerEmail' | 'customerId' | 'discountApplications' | 'discountCodes' | 'id' | 'lineItems' | 'lineItemsQuantity' | 'metadata' | 'paymentSession' | 'shippingAddress' | 'shippingLines' | 'state' | 'store' | 'subtotal' | 'taxedPrice' | 'total' | CartKeySpecifier)[];
export type CartFieldPolicy = {
	availableShippingMethods?: FieldPolicy<any> | FieldReadFunction<any>,
	billingAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	customerEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	customerId?: FieldPolicy<any> | FieldReadFunction<any>,
	discountApplications?: FieldPolicy<any> | FieldReadFunction<any>,
	discountCodes?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lineItems?: FieldPolicy<any> | FieldReadFunction<any>,
	lineItemsQuantity?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentSession?: FieldPolicy<any> | FieldReadFunction<any>,
	shippingAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	shippingLines?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	store?: FieldPolicy<any> | FieldReadFunction<any>,
	subtotal?: FieldPolicy<any> | FieldReadFunction<any>,
	taxedPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartAddDiscountCodeNotFoundErrorKeySpecifier = ('message' | CartAddDiscountCodeNotFoundErrorKeySpecifier)[];
export type CartAddDiscountCodeNotFoundErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartAddressKeySpecifier = ('address1' | 'address2' | 'city' | 'company' | 'countryCode' | 'email' | 'firstName' | 'formatted' | 'id' | 'lastName' | 'metadata' | 'phone' | 'postalCode' | 'state' | CartAddressKeySpecifier)[];
export type CartAddressFieldPolicy = {
	address1?: FieldPolicy<any> | FieldReadFunction<any>,
	address2?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	company?: FieldPolicy<any> | FieldReadFunction<any>,
	countryCode?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	formatted?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	postalCode?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartAuthenticationFailedErrorKeySpecifier = ('message' | CartAuthenticationFailedErrorKeySpecifier)[];
export type CartAuthenticationFailedErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartAuthorizationFailedErrorKeySpecifier = ('message' | CartAuthorizationFailedErrorKeySpecifier)[];
export type CartAuthorizationFailedErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartAvailableShippingMethodKeySpecifier = ('description' | 'id' | 'metadata' | 'name' | 'rate' | 'sku' | CartAvailableShippingMethodKeySpecifier)[];
export type CartAvailableShippingMethodFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	rate?: FieldPolicy<any> | FieldReadFunction<any>,
	sku?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartAvailableShippingMethodRateKeySpecifier = ('id' | CartAvailableShippingMethodRateKeySpecifier)[];
export type CartAvailableShippingMethodRateFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartCompletePayloadKeySpecifier = ('errors' | 'order' | CartCompletePayloadKeySpecifier)[];
export type CartCompletePayloadFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	order?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartCompletionDiscountCodeAlreadyUsedErrorKeySpecifier = ('message' | CartCompletionDiscountCodeAlreadyUsedErrorKeySpecifier)[];
export type CartCompletionDiscountCodeAlreadyUsedErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartCompletionDiscrepancyErrorKeySpecifier = ('message' | CartCompletionDiscrepancyErrorKeySpecifier)[];
export type CartCompletionDiscrepancyErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartCreatePayloadKeySpecifier = ('cart' | 'errors' | CartCreatePayloadKeySpecifier)[];
export type CartCreatePayloadFieldPolicy = {
	cart?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartDiscountCodeAddPayloadKeySpecifier = ('cart' | 'errors' | CartDiscountCodeAddPayloadKeySpecifier)[];
export type CartDiscountCodeAddPayloadFieldPolicy = {
	cart?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartDiscountCodeMaxApplicationsReachedErrorKeySpecifier = ('message' | CartDiscountCodeMaxApplicationsReachedErrorKeySpecifier)[];
export type CartDiscountCodeMaxApplicationsReachedErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartDiscountCodeRemovePayloadKeySpecifier = ('cart' | 'errors' | CartDiscountCodeRemovePayloadKeySpecifier)[];
export type CartDiscountCodeRemovePayloadFieldPolicy = {
	cart?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartLineItemKeySpecifier = ('currency' | 'discountApplications' | 'id' | 'metadata' | 'priceChannelId' | 'product' | 'productId' | 'productName' | 'productSlug' | 'quantity' | 'sku' | 'storeId' | 'subtotal' | 'taxBehavior' | 'taxRate' | 'taxedPrice' | 'total' | 'unitPrice' | 'variant' | 'variantId' | 'variantName' | CartLineItemKeySpecifier)[];
export type CartLineItemFieldPolicy = {
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	discountApplications?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	priceChannelId?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	productId?: FieldPolicy<any> | FieldReadFunction<any>,
	productName?: FieldPolicy<any> | FieldReadFunction<any>,
	productSlug?: FieldPolicy<any> | FieldReadFunction<any>,
	quantity?: FieldPolicy<any> | FieldReadFunction<any>,
	sku?: FieldPolicy<any> | FieldReadFunction<any>,
	storeId?: FieldPolicy<any> | FieldReadFunction<any>,
	subtotal?: FieldPolicy<any> | FieldReadFunction<any>,
	taxBehavior?: FieldPolicy<any> | FieldReadFunction<any>,
	taxRate?: FieldPolicy<any> | FieldReadFunction<any>,
	taxedPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	unitPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	variant?: FieldPolicy<any> | FieldReadFunction<any>,
	variantId?: FieldPolicy<any> | FieldReadFunction<any>,
	variantName?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartLineItemConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | CartLineItemConnectionKeySpecifier)[];
export type CartLineItemConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartLineItemEdgeKeySpecifier = ('cursor' | 'node' | CartLineItemEdgeKeySpecifier)[];
export type CartLineItemEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartLineItemPriceNotFoundErrorKeySpecifier = ('message' | CartLineItemPriceNotFoundErrorKeySpecifier)[];
export type CartLineItemPriceNotFoundErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartLineItemsAddPayloadKeySpecifier = ('cart' | 'errors' | CartLineItemsAddPayloadKeySpecifier)[];
export type CartLineItemsAddPayloadFieldPolicy = {
	cart?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartLineItemsInsufficientStockErrorKeySpecifier = ('message' | CartLineItemsInsufficientStockErrorKeySpecifier)[];
export type CartLineItemsInsufficientStockErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartLineItemsNotFoundErrorKeySpecifier = ('message' | CartLineItemsNotFoundErrorKeySpecifier)[];
export type CartLineItemsNotFoundErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartLineItemsRemovePayloadKeySpecifier = ('cart' | 'errors' | CartLineItemsRemovePayloadKeySpecifier)[];
export type CartLineItemsRemovePayloadFieldPolicy = {
	cart?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartLineItemsUpdatePayloadKeySpecifier = ('cart' | 'errors' | CartLineItemsUpdatePayloadKeySpecifier)[];
export type CartLineItemsUpdatePayloadFieldPolicy = {
	cart?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartNotFoundErrorKeySpecifier = ('message' | CartNotFoundErrorKeySpecifier)[];
export type CartNotFoundErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartPaymentSessionInitializePayloadKeySpecifier = ('cart' | 'errors' | CartPaymentSessionInitializePayloadKeySpecifier)[];
export type CartPaymentSessionInitializePayloadFieldPolicy = {
	cart?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartReplicatePayloadKeySpecifier = ('cart' | 'errors' | CartReplicatePayloadKeySpecifier)[];
export type CartReplicatePayloadFieldPolicy = {
	cart?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartReplicateStockChangeErrorKeySpecifier = ('lineItemId' | 'newStock' | 'variantId' | 'wantedStock' | CartReplicateStockChangeErrorKeySpecifier)[];
export type CartReplicateStockChangeErrorFieldPolicy = {
	lineItemId?: FieldPolicy<any> | FieldReadFunction<any>,
	newStock?: FieldPolicy<any> | FieldReadFunction<any>,
	variantId?: FieldPolicy<any> | FieldReadFunction<any>,
	wantedStock?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartReplicateStrictValidationFailedErrorKeySpecifier = ('message' | 'stockChanges' | 'variantsNotFound' | CartReplicateStrictValidationFailedErrorKeySpecifier)[];
export type CartReplicateStrictValidationFailedErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	stockChanges?: FieldPolicy<any> | FieldReadFunction<any>,
	variantsNotFound?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartReplicateVariantNotFoundErrorKeySpecifier = ('lineItemId' | 'variantId' | CartReplicateVariantNotFoundErrorKeySpecifier)[];
export type CartReplicateVariantNotFoundErrorFieldPolicy = {
	lineItemId?: FieldPolicy<any> | FieldReadFunction<any>,
	variantId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartShippingLineKeySpecifier = ('id' | 'shippingMethod' | 'subtotal' | 'taxBehavior' | 'taxedPrice' | 'total' | CartShippingLineKeySpecifier)[];
export type CartShippingLineFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	shippingMethod?: FieldPolicy<any> | FieldReadFunction<any>,
	subtotal?: FieldPolicy<any> | FieldReadFunction<any>,
	taxBehavior?: FieldPolicy<any> | FieldReadFunction<any>,
	taxedPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartShippingLineAddPayloadKeySpecifier = ('cart' | 'errors' | CartShippingLineAddPayloadKeySpecifier)[];
export type CartShippingLineAddPayloadFieldPolicy = {
	cart?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartShippingLineNotFoundErrorKeySpecifier = ('message' | CartShippingLineNotFoundErrorKeySpecifier)[];
export type CartShippingLineNotFoundErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartShippingLineRemovePayloadKeySpecifier = ('cart' | 'errors' | CartShippingLineRemovePayloadKeySpecifier)[];
export type CartShippingLineRemovePayloadFieldPolicy = {
	cart?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartShippingLinesSetPayloadKeySpecifier = ('cart' | 'errors' | CartShippingLinesSetPayloadKeySpecifier)[];
export type CartShippingLinesSetPayloadFieldPolicy = {
	cart?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartUpdatePayloadKeySpecifier = ('cart' | 'errors' | CartUpdatePayloadKeySpecifier)[];
export type CartUpdatePayloadFieldPolicy = {
	cart?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartUpdatePriceChannelNotFoundErrorKeySpecifier = ('message' | CartUpdatePriceChannelNotFoundErrorKeySpecifier)[];
export type CartUpdatePriceChannelNotFoundErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CategoryKeySpecifier = ('ancestors' | 'children' | 'childrenCount' | 'descendants' | 'descendantsCount' | 'id' | 'name' | 'parent' | 'products' | 'productsCount' | 'slug' | CategoryKeySpecifier)[];
export type CategoryFieldPolicy = {
	ancestors?: FieldPolicy<any> | FieldReadFunction<any>,
	children?: FieldPolicy<any> | FieldReadFunction<any>,
	childrenCount?: FieldPolicy<any> | FieldReadFunction<any>,
	descendants?: FieldPolicy<any> | FieldReadFunction<any>,
	descendantsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	parent?: FieldPolicy<any> | FieldReadFunction<any>,
	products?: FieldPolicy<any> | FieldReadFunction<any>,
	productsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	slug?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CategoryConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | CategoryConnectionKeySpecifier)[];
export type CategoryConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CategoryEdgeKeySpecifier = ('cursor' | 'node' | CategoryEdgeKeySpecifier)[];
export type CategoryEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CollectionsKeySpecifier = ('id' | 'name' | 'products' | 'slug' | CollectionsKeySpecifier)[];
export type CollectionsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	products?: FieldPolicy<any> | FieldReadFunction<any>,
	slug?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CollectionsConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | CollectionsConnectionKeySpecifier)[];
export type CollectionsConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CollectionsEdgeKeySpecifier = ('cursor' | 'node' | CollectionsEdgeKeySpecifier)[];
export type CollectionsEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CountryInfoKeySpecifier = ('code' | 'name' | 'postalCode' | 'zones' | CountryInfoKeySpecifier)[];
export type CountryInfoFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	postalCode?: FieldPolicy<any> | FieldReadFunction<any>,
	zones?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateCartAddressDoesNotHaveCountryCodeErrorKeySpecifier = ('message' | CreateCartAddressDoesNotHaveCountryCodeErrorKeySpecifier)[];
export type CreateCartAddressDoesNotHaveCountryCodeErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateCartAuthenticationFailedErrorKeySpecifier = ('message' | CreateCartAuthenticationFailedErrorKeySpecifier)[];
export type CreateCartAuthenticationFailedErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateCartAuthorizationFailedErrorKeySpecifier = ('message' | CreateCartAuthorizationFailedErrorKeySpecifier)[];
export type CreateCartAuthorizationFailedErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateCartChannelDoesNotSupportCountryErrorKeySpecifier = ('message' | CreateCartChannelDoesNotSupportCountryErrorKeySpecifier)[];
export type CreateCartChannelDoesNotSupportCountryErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateCartChannelDoesNotSupportCurrencyErrorKeySpecifier = ('message' | CreateCartChannelDoesNotSupportCurrencyErrorKeySpecifier)[];
export type CreateCartChannelDoesNotSupportCurrencyErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateCartChannelHasNoCountriesErrorKeySpecifier = ('message' | CreateCartChannelHasNoCountriesErrorKeySpecifier)[];
export type CreateCartChannelHasNoCountriesErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateCartChannelNotFoundErrorKeySpecifier = ('message' | CreateCartChannelNotFoundErrorKeySpecifier)[];
export type CreateCartChannelNotFoundErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateCartFailedNotAllLineItemsCouldBeAddedErrorKeySpecifier = ('message' | CreateCartFailedNotAllLineItemsCouldBeAddedErrorKeySpecifier)[];
export type CreateCartFailedNotAllLineItemsCouldBeAddedErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateCartPriceChannelNotFoundErrorKeySpecifier = ('message' | CreateCartPriceChannelNotFoundErrorKeySpecifier)[];
export type CreateCartPriceChannelNotFoundErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateCartShippingAddressDoesNotHaveShippingZonesErrorKeySpecifier = ('message' | CreateCartShippingAddressDoesNotHaveShippingZonesErrorKeySpecifier)[];
export type CreateCartShippingAddressDoesNotHaveShippingZonesErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerKeySpecifier = ('addresses' | 'customerGroups' | 'defaultBillingAddress' | 'defaultShippingAddress' | 'email' | 'firstName' | 'id' | 'lastName' | 'metadata' | 'orders' | 'ordersCount' | CustomerKeySpecifier)[];
export type CustomerFieldPolicy = {
	addresses?: FieldPolicy<any> | FieldReadFunction<any>,
	customerGroups?: FieldPolicy<any> | FieldReadFunction<any>,
	defaultBillingAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	defaultShippingAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	orders?: FieldPolicy<any> | FieldReadFunction<any>,
	ordersCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerAccessTokenKeySpecifier = ('accessToken' | 'expiresIn' | 'refreshToken' | CustomerAccessTokenKeySpecifier)[];
export type CustomerAccessTokenFieldPolicy = {
	accessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	expiresIn?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerAccessTokenCreatePayloadKeySpecifier = ('customerAccessToken' | 'errors' | CustomerAccessTokenCreatePayloadKeySpecifier)[];
export type CustomerAccessTokenCreatePayloadFieldPolicy = {
	customerAccessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerAccessTokenRefreshPayloadKeySpecifier = ('customerAccessToken' | 'errors' | CustomerAccessTokenRefreshPayloadKeySpecifier)[];
export type CustomerAccessTokenRefreshPayloadFieldPolicy = {
	customerAccessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerActivatePayloadKeySpecifier = ('customer' | 'customerAccessToken' | 'errors' | CustomerActivatePayloadKeySpecifier)[];
export type CustomerActivatePayloadFieldPolicy = {
	customer?: FieldPolicy<any> | FieldReadFunction<any>,
	customerAccessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerAddressKeySpecifier = ('address1' | 'address2' | 'city' | 'company' | 'countryCode' | 'email' | 'firstName' | 'formatted' | 'id' | 'lastName' | 'metadata' | 'name' | 'phone' | 'postalCode' | 'state' | CustomerAddressKeySpecifier)[];
export type CustomerAddressFieldPolicy = {
	address1?: FieldPolicy<any> | FieldReadFunction<any>,
	address2?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	company?: FieldPolicy<any> | FieldReadFunction<any>,
	countryCode?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	formatted?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	postalCode?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerAddressConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | CustomerAddressConnectionKeySpecifier)[];
export type CustomerAddressConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerAddressCreatePayloadKeySpecifier = ('customerAddress' | 'errors' | CustomerAddressCreatePayloadKeySpecifier)[];
export type CustomerAddressCreatePayloadFieldPolicy = {
	customerAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerAddressDeletePayloadKeySpecifier = ('customer' | 'errors' | CustomerAddressDeletePayloadKeySpecifier)[];
export type CustomerAddressDeletePayloadFieldPolicy = {
	customer?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerAddressEdgeKeySpecifier = ('cursor' | 'node' | CustomerAddressEdgeKeySpecifier)[];
export type CustomerAddressEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerAddressUpdatePayloadKeySpecifier = ('customerAddress' | 'errors' | CustomerAddressUpdatePayloadKeySpecifier)[];
export type CustomerAddressUpdatePayloadFieldPolicy = {
	customerAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerEmailAlreadyConfirmedErrorKeySpecifier = ('message' | CustomerEmailAlreadyConfirmedErrorKeySpecifier)[];
export type CustomerEmailAlreadyConfirmedErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerGroupKeySpecifier = ('id' | 'name' | CustomerGroupKeySpecifier)[];
export type CustomerGroupFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerGroupConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | CustomerGroupConnectionKeySpecifier)[];
export type CustomerGroupConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerGroupEdgeKeySpecifier = ('cursor' | 'node' | CustomerGroupEdgeKeySpecifier)[];
export type CustomerGroupEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerInvalidActivationTokenErrorKeySpecifier = ('message' | CustomerInvalidActivationTokenErrorKeySpecifier)[];
export type CustomerInvalidActivationTokenErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerInvalidPasswordErrorKeySpecifier = ('message' | CustomerInvalidPasswordErrorKeySpecifier)[];
export type CustomerInvalidPasswordErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerNotFoundErrorKeySpecifier = ('message' | CustomerNotFoundErrorKeySpecifier)[];
export type CustomerNotFoundErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerPasswordResetPayloadKeySpecifier = ('customer' | 'customerAccessToken' | 'errors' | CustomerPasswordResetPayloadKeySpecifier)[];
export type CustomerPasswordResetPayloadFieldPolicy = {
	customer?: FieldPolicy<any> | FieldReadFunction<any>,
	customerAccessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerPasswordResetTokenPayloadKeySpecifier = ('errors' | CustomerPasswordResetTokenPayloadKeySpecifier)[];
export type CustomerPasswordResetTokenPayloadFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerRegisterFailedErrorKeySpecifier = ('message' | CustomerRegisterFailedErrorKeySpecifier)[];
export type CustomerRegisterFailedErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerRegisterPayloadKeySpecifier = ('errors' | CustomerRegisterPayloadKeySpecifier)[];
export type CustomerRegisterPayloadFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerUpdatePayloadKeySpecifier = ('customer' | CustomerUpdatePayloadKeySpecifier)[];
export type CustomerUpdatePayloadFieldPolicy = {
	customer?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DiscountApplicationKeySpecifier = ('discountCode' | 'discountedAmount' | 'label' | 'value' | DiscountApplicationKeySpecifier)[];
export type DiscountApplicationFieldPolicy = {
	discountCode?: FieldPolicy<any> | FieldReadFunction<any>,
	discountedAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DiscountApplicationConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | DiscountApplicationConnectionKeySpecifier)[];
export type DiscountApplicationConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DiscountApplicationEdgeKeySpecifier = ('cursor' | 'node' | DiscountApplicationEdgeKeySpecifier)[];
export type DiscountApplicationEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DiscountCodeDtoKeySpecifier = ('cartId' | 'code' | DiscountCodeDtoKeySpecifier)[];
export type DiscountCodeDtoFieldPolicy = {
	cartId?: FieldPolicy<any> | FieldReadFunction<any>,
	code?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DiscountedPriceKeySpecifier = ('discount' | 'value' | DiscountedPriceKeySpecifier)[];
export type DiscountedPriceFieldPolicy = {
	discount?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FacetKeySpecifier = ('field' | 'name' | 'values' | FacetKeySpecifier)[];
export type FacetFieldPolicy = {
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	values?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FacetValueKeySpecifier = ('count' | 'name' | FacetValueKeySpecifier)[];
export type FacetValueFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvalidCredentialsErrorKeySpecifier = ('message' | InvalidCredentialsErrorKeySpecifier)[];
export type InvalidCredentialsErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvalidPasswordErrorKeySpecifier = ('message' | InvalidPasswordErrorKeySpecifier)[];
export type InvalidPasswordErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvalidRefreshTokenErrorKeySpecifier = ('message' | InvalidRefreshTokenErrorKeySpecifier)[];
export type InvalidRefreshTokenErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvalidTokenErrorKeySpecifier = ('message' | InvalidTokenErrorKeySpecifier)[];
export type InvalidTokenErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type KeyValuePairOfStringAndStringKeySpecifier = ('key' | 'value' | KeyValuePairOfStringAndStringKeySpecifier)[];
export type KeyValuePairOfStringAndStringFieldPolicy = {
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LineShippingMethodKeySpecifier = ('id' | 'metadata' | 'name' | 'sku' | LineShippingMethodKeySpecifier)[];
export type LineShippingMethodFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	sku?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ManualPaymentGatewayKeySpecifier = ('channelIds' | 'id' | 'name' | ManualPaymentGatewayKeySpecifier)[];
export type ManualPaymentGatewayFieldPolicy = {
	channelIds?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MediaKeySpecifier = ('contentType' | 'fileExtension' | 'fileName' | 'id' | 'src' | MediaKeySpecifier)[];
export type MediaFieldPolicy = {
	contentType?: FieldPolicy<any> | FieldReadFunction<any>,
	fileExtension?: FieldPolicy<any> | FieldReadFunction<any>,
	fileName?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	src?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MediaConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | MediaConnectionKeySpecifier)[];
export type MediaConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MediaEdgeKeySpecifier = ('cursor' | 'node' | MediaEdgeKeySpecifier)[];
export type MediaEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MoneyKeySpecifier = ('centAmount' | 'currencyCode' | 'fractionDigits' | MoneyKeySpecifier)[];
export type MoneyFieldPolicy = {
	centAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	currencyCode?: FieldPolicy<any> | FieldReadFunction<any>,
	fractionDigits?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('cartComplete' | 'cartCreate' | 'cartDiscountCodeAdd' | 'cartDiscountCodeRemove' | 'cartLineItemsAdd' | 'cartLineItemsRemove' | 'cartLineItemsUpdate' | 'cartPaymentSessionInitialize' | 'cartReplicate' | 'cartShippingLineAdd' | 'cartShippingLineRemove' | 'cartShippingLinesSet' | 'cartUpdate' | 'customerAccessTokenCreate' | 'customerAccessTokenRefresh' | 'customerActivate' | 'customerAddressCreate' | 'customerAddressDelete' | 'customerAddressUpdate' | 'customerPasswordReset' | 'customerPasswordResetToken' | 'customerRegister' | 'customerUpdate' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	cartComplete?: FieldPolicy<any> | FieldReadFunction<any>,
	cartCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	cartDiscountCodeAdd?: FieldPolicy<any> | FieldReadFunction<any>,
	cartDiscountCodeRemove?: FieldPolicy<any> | FieldReadFunction<any>,
	cartLineItemsAdd?: FieldPolicy<any> | FieldReadFunction<any>,
	cartLineItemsRemove?: FieldPolicy<any> | FieldReadFunction<any>,
	cartLineItemsUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	cartPaymentSessionInitialize?: FieldPolicy<any> | FieldReadFunction<any>,
	cartReplicate?: FieldPolicy<any> | FieldReadFunction<any>,
	cartShippingLineAdd?: FieldPolicy<any> | FieldReadFunction<any>,
	cartShippingLineRemove?: FieldPolicy<any> | FieldReadFunction<any>,
	cartShippingLinesSet?: FieldPolicy<any> | FieldReadFunction<any>,
	cartUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	customerAccessTokenCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	customerAccessTokenRefresh?: FieldPolicy<any> | FieldReadFunction<any>,
	customerActivate?: FieldPolicy<any> | FieldReadFunction<any>,
	customerAddressCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	customerAddressDelete?: FieldPolicy<any> | FieldReadFunction<any>,
	customerAddressUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	customerPasswordReset?: FieldPolicy<any> | FieldReadFunction<any>,
	customerPasswordResetToken?: FieldPolicy<any> | FieldReadFunction<any>,
	customerRegister?: FieldPolicy<any> | FieldReadFunction<any>,
	customerUpdate?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NodeKeySpecifier = ('id' | NodeKeySpecifier)[];
export type NodeFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderKeySpecifier = ('billingAddress' | 'createdAt' | 'customer' | 'discountApplications' | 'externalReference' | 'id' | 'lineItems' | 'lineItemsQuantity' | 'metadata' | 'orderNumber' | 'orderState' | 'paymentState' | 'payments' | 'shipmentState' | 'shippingAddress' | 'shippingLines' | 'subtotal' | 'taxedPrice' | 'total' | OrderKeySpecifier)[];
export type OrderFieldPolicy = {
	billingAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	customer?: FieldPolicy<any> | FieldReadFunction<any>,
	discountApplications?: FieldPolicy<any> | FieldReadFunction<any>,
	externalReference?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lineItems?: FieldPolicy<any> | FieldReadFunction<any>,
	lineItemsQuantity?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	orderNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	orderState?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentState?: FieldPolicy<any> | FieldReadFunction<any>,
	payments?: FieldPolicy<any> | FieldReadFunction<any>,
	shipmentState?: FieldPolicy<any> | FieldReadFunction<any>,
	shippingAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	shippingLines?: FieldPolicy<any> | FieldReadFunction<any>,
	subtotal?: FieldPolicy<any> | FieldReadFunction<any>,
	taxedPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | OrderConnectionKeySpecifier)[];
export type OrderConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderEdgeKeySpecifier = ('cursor' | 'node' | OrderEdgeKeySpecifier)[];
export type OrderEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderLineItemKeySpecifier = ('currency' | 'discountApplications' | 'id' | 'metadata' | 'priceChannelId' | 'product' | 'productId' | 'productName' | 'productSlug' | 'quantity' | 'sku' | 'storeId' | 'subtotal' | 'taxBehavior' | 'taxRate' | 'taxedPrice' | 'total' | 'unitPrice' | 'variant' | 'variantId' | 'variantName' | OrderLineItemKeySpecifier)[];
export type OrderLineItemFieldPolicy = {
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	discountApplications?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	priceChannelId?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	productId?: FieldPolicy<any> | FieldReadFunction<any>,
	productName?: FieldPolicy<any> | FieldReadFunction<any>,
	productSlug?: FieldPolicy<any> | FieldReadFunction<any>,
	quantity?: FieldPolicy<any> | FieldReadFunction<any>,
	sku?: FieldPolicy<any> | FieldReadFunction<any>,
	storeId?: FieldPolicy<any> | FieldReadFunction<any>,
	subtotal?: FieldPolicy<any> | FieldReadFunction<any>,
	taxBehavior?: FieldPolicy<any> | FieldReadFunction<any>,
	taxRate?: FieldPolicy<any> | FieldReadFunction<any>,
	taxedPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	unitPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	variant?: FieldPolicy<any> | FieldReadFunction<any>,
	variantId?: FieldPolicy<any> | FieldReadFunction<any>,
	variantName?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderLineItemConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | OrderLineItemConnectionKeySpecifier)[];
export type OrderLineItemConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderLineItemEdgeKeySpecifier = ('cursor' | 'node' | OrderLineItemEdgeKeySpecifier)[];
export type OrderLineItemEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderShippingLineKeySpecifier = ('id' | 'shippingMethod' | 'subtotal' | 'taxBehavior' | 'taxRate' | 'taxedPrice' | 'total' | OrderShippingLineKeySpecifier)[];
export type OrderShippingLineFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	shippingMethod?: FieldPolicy<any> | FieldReadFunction<any>,
	subtotal?: FieldPolicy<any> | FieldReadFunction<any>,
	taxBehavior?: FieldPolicy<any> | FieldReadFunction<any>,
	taxRate?: FieldPolicy<any> | FieldReadFunction<any>,
	taxedPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PageInfoV2KeySpecifier = ('endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | PageInfoV2KeySpecifier)[];
export type PageInfoV2FieldPolicy = {
	endCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	startCursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentDtoKeySpecifier = ('id' | 'intendedAmount' | 'orderId' | 'paidAmount' | 'paymentGatewayId' | 'paymentMethod' | 'pspReference' | 'refundedAmount' | PaymentDtoKeySpecifier)[];
export type PaymentDtoFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	intendedAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	orderId?: FieldPolicy<any> | FieldReadFunction<any>,
	paidAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentGatewayId?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentMethod?: FieldPolicy<any> | FieldReadFunction<any>,
	pspReference?: FieldPolicy<any> | FieldReadFunction<any>,
	refundedAmount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentDtoConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | PaymentDtoConnectionKeySpecifier)[];
export type PaymentDtoConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentDtoEdgeKeySpecifier = ('cursor' | 'node' | PaymentDtoEdgeKeySpecifier)[];
export type PaymentDtoEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentGatewayKeySpecifier = ('channelIds' | 'id' | 'name' | PaymentGatewayKeySpecifier)[];
export type PaymentGatewayFieldPolicy = {
	channelIds?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentGatewayChannelMismatchErrorKeySpecifier = ('message' | PaymentGatewayChannelMismatchErrorKeySpecifier)[];
export type PaymentGatewayChannelMismatchErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentGatewayConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | PaymentGatewayConnectionKeySpecifier)[];
export type PaymentGatewayConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentGatewayEdgeKeySpecifier = ('cursor' | 'node' | PaymentGatewayEdgeKeySpecifier)[];
export type PaymentGatewayEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentGatewayNotFoundErrorKeySpecifier = ('message' | PaymentGatewayNotFoundErrorKeySpecifier)[];
export type PaymentGatewayNotFoundErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentGatewaySessionInitializeFailedErrorKeySpecifier = ('message' | PaymentGatewaySessionInitializeFailedErrorKeySpecifier)[];
export type PaymentGatewaySessionInitializeFailedErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentMethodKeySpecifier = ('copy' | 'name' | PaymentMethodKeySpecifier)[];
export type PaymentMethodFieldPolicy = {
	copy?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentSessionKeySpecifier = ('paymentGateway' | PaymentSessionKeySpecifier)[];
export type PaymentSessionFieldPolicy = {
	paymentGateway?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostalCodeInfoKeySpecifier = ('exampleList' | 'examples' | 'fieldName' | 'isRequired' | 'regex' | PostalCodeInfoKeySpecifier)[];
export type PostalCodeInfoFieldPolicy = {
	exampleList?: FieldPolicy<any> | FieldReadFunction<any>,
	examples?: FieldPolicy<any> | FieldReadFunction<any>,
	fieldName?: FieldPolicy<any> | FieldReadFunction<any>,
	isRequired?: FieldPolicy<any> | FieldReadFunction<any>,
	regex?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PriceKeySpecifier = ('discountedPrice' | 'id' | 'taxBehavior' | 'validFrom' | 'validTo' | 'value' | PriceKeySpecifier)[];
export type PriceFieldPolicy = {
	discountedPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	taxBehavior?: FieldPolicy<any> | FieldReadFunction<any>,
	validFrom?: FieldPolicy<any> | FieldReadFunction<any>,
	validTo?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductKeySpecifier = ('attributeAssignments' | 'categories' | 'collections' | 'description' | 'heroVariant' | 'id' | 'metadata' | 'name' | 'priceRange' | 'slug' | 'tags' | 'variants' | 'variantsCount' | 'vendor' | ProductKeySpecifier)[];
export type ProductFieldPolicy = {
	attributeAssignments?: FieldPolicy<any> | FieldReadFunction<any>,
	categories?: FieldPolicy<any> | FieldReadFunction<any>,
	collections?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	heroVariant?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	priceRange?: FieldPolicy<any> | FieldReadFunction<any>,
	slug?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	variants?: FieldPolicy<any> | FieldReadFunction<any>,
	variantsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	vendor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductDiscountKeySpecifier = ('id' | 'name' | 'validFrom' | 'validUntil' | 'value' | ProductDiscountKeySpecifier)[];
export type ProductDiscountFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	validFrom?: FieldPolicy<any> | FieldReadFunction<any>,
	validUntil?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductDiscountAbsoluteValueKeySpecifier = ('value' | ProductDiscountAbsoluteValueKeySpecifier)[];
export type ProductDiscountAbsoluteValueFieldPolicy = {
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductDiscountRelativeValueKeySpecifier = ('factor' | ProductDiscountRelativeValueKeySpecifier)[];
export type ProductDiscountRelativeValueFieldPolicy = {
	factor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductPriceRangeKeySpecifier = ('maxPrice' | 'minPrice' | ProductPriceRangeKeySpecifier)[];
export type ProductPriceRangeFieldPolicy = {
	maxPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	minPrice?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductVariantKeySpecifier = ('availability' | 'barcode' | 'id' | 'image' | 'media' | 'metadata' | 'name' | 'price' | 'product' | 'selectedAttributes' | 'sku' | ProductVariantKeySpecifier)[];
export type ProductVariantFieldPolicy = {
	availability?: FieldPolicy<any> | FieldReadFunction<any>,
	barcode?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	media?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	selectedAttributes?: FieldPolicy<any> | FieldReadFunction<any>,
	sku?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductVariantAvailabilityKeySpecifier = ('availableForPurchase' | 'availableQuantity' | 'stockPolicy' | ProductVariantAvailabilityKeySpecifier)[];
export type ProductVariantAvailabilityFieldPolicy = {
	availableForPurchase?: FieldPolicy<any> | FieldReadFunction<any>,
	availableQuantity?: FieldPolicy<any> | FieldReadFunction<any>,
	stockPolicy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductVariantConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | ProductVariantConnectionKeySpecifier)[];
export type ProductVariantConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductVariantEdgeKeySpecifier = ('cursor' | 'node' | ProductVariantEdgeKeySpecifier)[];
export type ProductVariantEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductVariantNotFoundErrorKeySpecifier = ('message' | ProductVariantNotFoundErrorKeySpecifier)[];
export type ProductVariantNotFoundErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductsConnectionKeySpecifier = ('aggregates' | 'edges' | 'facets' | 'nodes' | 'pageInfo' | 'totalCount' | ProductsConnectionKeySpecifier)[];
export type ProductsConnectionFieldPolicy = {
	aggregates?: FieldPolicy<any> | FieldReadFunction<any>,
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	facets?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductsEdgeKeySpecifier = ('cursor' | 'node' | ProductsEdgeKeySpecifier)[];
export type ProductsEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('cart' | 'categories' | 'category' | 'collection' | 'collections' | 'countries' | 'customer' | 'node' | 'order' | 'paymentGateways' | 'product' | 'products' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	cart?: FieldPolicy<any> | FieldReadFunction<any>,
	categories?: FieldPolicy<any> | FieldReadFunction<any>,
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	collection?: FieldPolicy<any> | FieldReadFunction<any>,
	collections?: FieldPolicy<any> | FieldReadFunction<any>,
	countries?: FieldPolicy<any> | FieldReadFunction<any>,
	customer?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>,
	order?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentGateways?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	products?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RelativeShippingMethodRateKeySpecifier = ('id' | 'rate' | RelativeShippingMethodRateKeySpecifier)[];
export type RelativeShippingMethodRateFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	rate?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RelativeValueKeySpecifier = ('percentage' | RelativeValueKeySpecifier)[];
export type RelativeValueFieldPolicy = {
	percentage?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SelectedAttributeKeySpecifier = ('attribute' | 'attributeValue' | 'name' | 'value' | SelectedAttributeKeySpecifier)[];
export type SelectedAttributeFieldPolicy = {
	attribute?: FieldPolicy<any> | FieldReadFunction<any>,
	attributeValue?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ShippingMethodNotFoundErrorKeySpecifier = ('message' | ShippingMethodNotFoundErrorKeySpecifier)[];
export type ShippingMethodNotFoundErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StoreKeySpecifier = ('id' | StoreKeySpecifier)[];
export type StoreFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StripePaymentGatewayKeySpecifier = ('channelIds' | 'id' | 'isTest' | 'name' | 'publishableKey' | StripePaymentGatewayKeySpecifier)[];
export type StripePaymentGatewayFieldPolicy = {
	channelIds?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isTest?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	publishableKey?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StripePaymentSessionKeySpecifier = ('clientSecret' | 'id' | 'paymentGateway' | 'paymentIntentId' | StripePaymentSessionKeySpecifier)[];
export type StripePaymentSessionFieldPolicy = {
	clientSecret?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentGateway?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentIntentId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SwatchAttributeValueKeySpecifier = ('color' | 'id' | 'media' | 'metadata' | 'value' | SwatchAttributeValueKeySpecifier)[];
export type SwatchAttributeValueFieldPolicy = {
	color?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	media?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TaxPortionKeySpecifier = ('name' | 'rate' | TaxPortionKeySpecifier)[];
export type TaxPortionFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	rate?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TaxRateKeySpecifier = ('composition' | 'rate' | 'taxPortions' | TaxRateKeySpecifier)[];
export type TaxRateFieldPolicy = {
	composition?: FieldPolicy<any> | FieldReadFunction<any>,
	rate?: FieldPolicy<any> | FieldReadFunction<any>,
	taxPortions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TaxedPriceKeySpecifier = ('gross' | 'net' | 'tax' | TaxedPriceKeySpecifier)[];
export type TaxedPriceFieldPolicy = {
	gross?: FieldPolicy<any> | FieldReadFunction<any>,
	net?: FieldPolicy<any> | FieldReadFunction<any>,
	tax?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TextAttributeValueKeySpecifier = ('id' | 'metadata' | 'value' | TextAttributeValueKeySpecifier)[];
export type TextAttributeValueFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypeIdKeySpecifier = ('decode' | 'hasType' | TypeIdKeySpecifier)[];
export type TypeIdFieldPolicy = {
	decode?: FieldPolicy<any> | FieldReadFunction<any>,
	hasType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypeIdDecodedKeySpecifier = ('encode' | 'hasType' | 'id' | 'suffix' | 'type' | TypeIdDecodedKeySpecifier)[];
export type TypeIdDecodedFieldPolicy = {
	encode?: FieldPolicy<any> | FieldReadFunction<any>,
	hasType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	suffix?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnitPriceKeySpecifier = ('discountedPrice' | 'taxBehavior' | 'value' | UnitPriceKeySpecifier)[];
export type UnitPriceFieldPolicy = {
	discountedPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	taxBehavior?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateCartLineItemsInsufficientStockErrorKeySpecifier = ('message' | UpdateCartLineItemsInsufficientStockErrorKeySpecifier)[];
export type UpdateCartLineItemsInsufficientStockErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserErrorKeySpecifier = ('message' | UserErrorKeySpecifier)[];
export type UserErrorFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ValueObjectKeySpecifier = ('copy' | ValueObjectKeySpecifier)[];
export type ValueObjectFieldPolicy = {
	copy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ZoneInfoKeySpecifier = ('code' | 'name' | 'postalCodeRegex' | ZoneInfoKeySpecifier)[];
export type ZoneInfoFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	postalCodeRegex?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	AbsoluteShippingMethodRate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AbsoluteShippingMethodRateKeySpecifier | (() => undefined | AbsoluteShippingMethodRateKeySpecifier),
		fields?: AbsoluteShippingMethodRateFieldPolicy,
	},
	AddressAlreadyExistsError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddressAlreadyExistsErrorKeySpecifier | (() => undefined | AddressAlreadyExistsErrorKeySpecifier),
		fields?: AddressAlreadyExistsErrorFieldPolicy,
	},
	AddressNotFoundError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddressNotFoundErrorKeySpecifier | (() => undefined | AddressNotFoundErrorKeySpecifier),
		fields?: AddressNotFoundErrorFieldPolicy,
	},
	Attribute?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AttributeKeySpecifier | (() => undefined | AttributeKeySpecifier),
		fields?: AttributeFieldPolicy,
	},
	AttributeAssignment?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AttributeAssignmentKeySpecifier | (() => undefined | AttributeAssignmentKeySpecifier),
		fields?: AttributeAssignmentFieldPolicy,
	},
	AttributeValue?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AttributeValueKeySpecifier | (() => undefined | AttributeValueKeySpecifier),
		fields?: AttributeValueFieldPolicy,
	},
	AttributeValueConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AttributeValueConnectionKeySpecifier | (() => undefined | AttributeValueConnectionKeySpecifier),
		fields?: AttributeValueConnectionFieldPolicy,
	},
	AttributeValueEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AttributeValueEdgeKeySpecifier | (() => undefined | AttributeValueEdgeKeySpecifier),
		fields?: AttributeValueEdgeFieldPolicy,
	},
	BaseAddress?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BaseAddressKeySpecifier | (() => undefined | BaseAddressKeySpecifier),
		fields?: BaseAddressFieldPolicy,
	},
	Cart?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartKeySpecifier | (() => undefined | CartKeySpecifier),
		fields?: CartFieldPolicy,
	},
	CartAddDiscountCodeNotFoundError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartAddDiscountCodeNotFoundErrorKeySpecifier | (() => undefined | CartAddDiscountCodeNotFoundErrorKeySpecifier),
		fields?: CartAddDiscountCodeNotFoundErrorFieldPolicy,
	},
	CartAddress?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartAddressKeySpecifier | (() => undefined | CartAddressKeySpecifier),
		fields?: CartAddressFieldPolicy,
	},
	CartAuthenticationFailedError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartAuthenticationFailedErrorKeySpecifier | (() => undefined | CartAuthenticationFailedErrorKeySpecifier),
		fields?: CartAuthenticationFailedErrorFieldPolicy,
	},
	CartAuthorizationFailedError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartAuthorizationFailedErrorKeySpecifier | (() => undefined | CartAuthorizationFailedErrorKeySpecifier),
		fields?: CartAuthorizationFailedErrorFieldPolicy,
	},
	CartAvailableShippingMethod?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartAvailableShippingMethodKeySpecifier | (() => undefined | CartAvailableShippingMethodKeySpecifier),
		fields?: CartAvailableShippingMethodFieldPolicy,
	},
	CartAvailableShippingMethodRate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartAvailableShippingMethodRateKeySpecifier | (() => undefined | CartAvailableShippingMethodRateKeySpecifier),
		fields?: CartAvailableShippingMethodRateFieldPolicy,
	},
	CartCompletePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartCompletePayloadKeySpecifier | (() => undefined | CartCompletePayloadKeySpecifier),
		fields?: CartCompletePayloadFieldPolicy,
	},
	CartCompletionDiscountCodeAlreadyUsedError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartCompletionDiscountCodeAlreadyUsedErrorKeySpecifier | (() => undefined | CartCompletionDiscountCodeAlreadyUsedErrorKeySpecifier),
		fields?: CartCompletionDiscountCodeAlreadyUsedErrorFieldPolicy,
	},
	CartCompletionDiscrepancyError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartCompletionDiscrepancyErrorKeySpecifier | (() => undefined | CartCompletionDiscrepancyErrorKeySpecifier),
		fields?: CartCompletionDiscrepancyErrorFieldPolicy,
	},
	CartCreatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartCreatePayloadKeySpecifier | (() => undefined | CartCreatePayloadKeySpecifier),
		fields?: CartCreatePayloadFieldPolicy,
	},
	CartDiscountCodeAddPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartDiscountCodeAddPayloadKeySpecifier | (() => undefined | CartDiscountCodeAddPayloadKeySpecifier),
		fields?: CartDiscountCodeAddPayloadFieldPolicy,
	},
	CartDiscountCodeMaxApplicationsReachedError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartDiscountCodeMaxApplicationsReachedErrorKeySpecifier | (() => undefined | CartDiscountCodeMaxApplicationsReachedErrorKeySpecifier),
		fields?: CartDiscountCodeMaxApplicationsReachedErrorFieldPolicy,
	},
	CartDiscountCodeRemovePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartDiscountCodeRemovePayloadKeySpecifier | (() => undefined | CartDiscountCodeRemovePayloadKeySpecifier),
		fields?: CartDiscountCodeRemovePayloadFieldPolicy,
	},
	CartLineItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartLineItemKeySpecifier | (() => undefined | CartLineItemKeySpecifier),
		fields?: CartLineItemFieldPolicy,
	},
	CartLineItemConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartLineItemConnectionKeySpecifier | (() => undefined | CartLineItemConnectionKeySpecifier),
		fields?: CartLineItemConnectionFieldPolicy,
	},
	CartLineItemEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartLineItemEdgeKeySpecifier | (() => undefined | CartLineItemEdgeKeySpecifier),
		fields?: CartLineItemEdgeFieldPolicy,
	},
	CartLineItemPriceNotFoundError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartLineItemPriceNotFoundErrorKeySpecifier | (() => undefined | CartLineItemPriceNotFoundErrorKeySpecifier),
		fields?: CartLineItemPriceNotFoundErrorFieldPolicy,
	},
	CartLineItemsAddPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartLineItemsAddPayloadKeySpecifier | (() => undefined | CartLineItemsAddPayloadKeySpecifier),
		fields?: CartLineItemsAddPayloadFieldPolicy,
	},
	CartLineItemsInsufficientStockError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartLineItemsInsufficientStockErrorKeySpecifier | (() => undefined | CartLineItemsInsufficientStockErrorKeySpecifier),
		fields?: CartLineItemsInsufficientStockErrorFieldPolicy,
	},
	CartLineItemsNotFoundError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartLineItemsNotFoundErrorKeySpecifier | (() => undefined | CartLineItemsNotFoundErrorKeySpecifier),
		fields?: CartLineItemsNotFoundErrorFieldPolicy,
	},
	CartLineItemsRemovePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartLineItemsRemovePayloadKeySpecifier | (() => undefined | CartLineItemsRemovePayloadKeySpecifier),
		fields?: CartLineItemsRemovePayloadFieldPolicy,
	},
	CartLineItemsUpdatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartLineItemsUpdatePayloadKeySpecifier | (() => undefined | CartLineItemsUpdatePayloadKeySpecifier),
		fields?: CartLineItemsUpdatePayloadFieldPolicy,
	},
	CartNotFoundError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartNotFoundErrorKeySpecifier | (() => undefined | CartNotFoundErrorKeySpecifier),
		fields?: CartNotFoundErrorFieldPolicy,
	},
	CartPaymentSessionInitializePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartPaymentSessionInitializePayloadKeySpecifier | (() => undefined | CartPaymentSessionInitializePayloadKeySpecifier),
		fields?: CartPaymentSessionInitializePayloadFieldPolicy,
	},
	CartReplicatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartReplicatePayloadKeySpecifier | (() => undefined | CartReplicatePayloadKeySpecifier),
		fields?: CartReplicatePayloadFieldPolicy,
	},
	CartReplicateStockChangeError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartReplicateStockChangeErrorKeySpecifier | (() => undefined | CartReplicateStockChangeErrorKeySpecifier),
		fields?: CartReplicateStockChangeErrorFieldPolicy,
	},
	CartReplicateStrictValidationFailedError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartReplicateStrictValidationFailedErrorKeySpecifier | (() => undefined | CartReplicateStrictValidationFailedErrorKeySpecifier),
		fields?: CartReplicateStrictValidationFailedErrorFieldPolicy,
	},
	CartReplicateVariantNotFoundError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartReplicateVariantNotFoundErrorKeySpecifier | (() => undefined | CartReplicateVariantNotFoundErrorKeySpecifier),
		fields?: CartReplicateVariantNotFoundErrorFieldPolicy,
	},
	CartShippingLine?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartShippingLineKeySpecifier | (() => undefined | CartShippingLineKeySpecifier),
		fields?: CartShippingLineFieldPolicy,
	},
	CartShippingLineAddPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartShippingLineAddPayloadKeySpecifier | (() => undefined | CartShippingLineAddPayloadKeySpecifier),
		fields?: CartShippingLineAddPayloadFieldPolicy,
	},
	CartShippingLineNotFoundError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartShippingLineNotFoundErrorKeySpecifier | (() => undefined | CartShippingLineNotFoundErrorKeySpecifier),
		fields?: CartShippingLineNotFoundErrorFieldPolicy,
	},
	CartShippingLineRemovePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartShippingLineRemovePayloadKeySpecifier | (() => undefined | CartShippingLineRemovePayloadKeySpecifier),
		fields?: CartShippingLineRemovePayloadFieldPolicy,
	},
	CartShippingLinesSetPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartShippingLinesSetPayloadKeySpecifier | (() => undefined | CartShippingLinesSetPayloadKeySpecifier),
		fields?: CartShippingLinesSetPayloadFieldPolicy,
	},
	CartUpdatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartUpdatePayloadKeySpecifier | (() => undefined | CartUpdatePayloadKeySpecifier),
		fields?: CartUpdatePayloadFieldPolicy,
	},
	CartUpdatePriceChannelNotFoundError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartUpdatePriceChannelNotFoundErrorKeySpecifier | (() => undefined | CartUpdatePriceChannelNotFoundErrorKeySpecifier),
		fields?: CartUpdatePriceChannelNotFoundErrorFieldPolicy,
	},
	Category?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CategoryKeySpecifier | (() => undefined | CategoryKeySpecifier),
		fields?: CategoryFieldPolicy,
	},
	CategoryConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CategoryConnectionKeySpecifier | (() => undefined | CategoryConnectionKeySpecifier),
		fields?: CategoryConnectionFieldPolicy,
	},
	CategoryEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CategoryEdgeKeySpecifier | (() => undefined | CategoryEdgeKeySpecifier),
		fields?: CategoryEdgeFieldPolicy,
	},
	Collections?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CollectionsKeySpecifier | (() => undefined | CollectionsKeySpecifier),
		fields?: CollectionsFieldPolicy,
	},
	CollectionsConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CollectionsConnectionKeySpecifier | (() => undefined | CollectionsConnectionKeySpecifier),
		fields?: CollectionsConnectionFieldPolicy,
	},
	CollectionsEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CollectionsEdgeKeySpecifier | (() => undefined | CollectionsEdgeKeySpecifier),
		fields?: CollectionsEdgeFieldPolicy,
	},
	CountryInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CountryInfoKeySpecifier | (() => undefined | CountryInfoKeySpecifier),
		fields?: CountryInfoFieldPolicy,
	},
	CreateCartAddressDoesNotHaveCountryCodeError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateCartAddressDoesNotHaveCountryCodeErrorKeySpecifier | (() => undefined | CreateCartAddressDoesNotHaveCountryCodeErrorKeySpecifier),
		fields?: CreateCartAddressDoesNotHaveCountryCodeErrorFieldPolicy,
	},
	CreateCartAuthenticationFailedError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateCartAuthenticationFailedErrorKeySpecifier | (() => undefined | CreateCartAuthenticationFailedErrorKeySpecifier),
		fields?: CreateCartAuthenticationFailedErrorFieldPolicy,
	},
	CreateCartAuthorizationFailedError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateCartAuthorizationFailedErrorKeySpecifier | (() => undefined | CreateCartAuthorizationFailedErrorKeySpecifier),
		fields?: CreateCartAuthorizationFailedErrorFieldPolicy,
	},
	CreateCartChannelDoesNotSupportCountryError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateCartChannelDoesNotSupportCountryErrorKeySpecifier | (() => undefined | CreateCartChannelDoesNotSupportCountryErrorKeySpecifier),
		fields?: CreateCartChannelDoesNotSupportCountryErrorFieldPolicy,
	},
	CreateCartChannelDoesNotSupportCurrencyError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateCartChannelDoesNotSupportCurrencyErrorKeySpecifier | (() => undefined | CreateCartChannelDoesNotSupportCurrencyErrorKeySpecifier),
		fields?: CreateCartChannelDoesNotSupportCurrencyErrorFieldPolicy,
	},
	CreateCartChannelHasNoCountriesError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateCartChannelHasNoCountriesErrorKeySpecifier | (() => undefined | CreateCartChannelHasNoCountriesErrorKeySpecifier),
		fields?: CreateCartChannelHasNoCountriesErrorFieldPolicy,
	},
	CreateCartChannelNotFoundError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateCartChannelNotFoundErrorKeySpecifier | (() => undefined | CreateCartChannelNotFoundErrorKeySpecifier),
		fields?: CreateCartChannelNotFoundErrorFieldPolicy,
	},
	CreateCartFailedNotAllLineItemsCouldBeAddedError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateCartFailedNotAllLineItemsCouldBeAddedErrorKeySpecifier | (() => undefined | CreateCartFailedNotAllLineItemsCouldBeAddedErrorKeySpecifier),
		fields?: CreateCartFailedNotAllLineItemsCouldBeAddedErrorFieldPolicy,
	},
	CreateCartPriceChannelNotFoundError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateCartPriceChannelNotFoundErrorKeySpecifier | (() => undefined | CreateCartPriceChannelNotFoundErrorKeySpecifier),
		fields?: CreateCartPriceChannelNotFoundErrorFieldPolicy,
	},
	CreateCartShippingAddressDoesNotHaveShippingZonesError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateCartShippingAddressDoesNotHaveShippingZonesErrorKeySpecifier | (() => undefined | CreateCartShippingAddressDoesNotHaveShippingZonesErrorKeySpecifier),
		fields?: CreateCartShippingAddressDoesNotHaveShippingZonesErrorFieldPolicy,
	},
	Customer?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerKeySpecifier | (() => undefined | CustomerKeySpecifier),
		fields?: CustomerFieldPolicy,
	},
	CustomerAccessToken?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerAccessTokenKeySpecifier | (() => undefined | CustomerAccessTokenKeySpecifier),
		fields?: CustomerAccessTokenFieldPolicy,
	},
	CustomerAccessTokenCreatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerAccessTokenCreatePayloadKeySpecifier | (() => undefined | CustomerAccessTokenCreatePayloadKeySpecifier),
		fields?: CustomerAccessTokenCreatePayloadFieldPolicy,
	},
	CustomerAccessTokenRefreshPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerAccessTokenRefreshPayloadKeySpecifier | (() => undefined | CustomerAccessTokenRefreshPayloadKeySpecifier),
		fields?: CustomerAccessTokenRefreshPayloadFieldPolicy,
	},
	CustomerActivatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerActivatePayloadKeySpecifier | (() => undefined | CustomerActivatePayloadKeySpecifier),
		fields?: CustomerActivatePayloadFieldPolicy,
	},
	CustomerAddress?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerAddressKeySpecifier | (() => undefined | CustomerAddressKeySpecifier),
		fields?: CustomerAddressFieldPolicy,
	},
	CustomerAddressConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerAddressConnectionKeySpecifier | (() => undefined | CustomerAddressConnectionKeySpecifier),
		fields?: CustomerAddressConnectionFieldPolicy,
	},
	CustomerAddressCreatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerAddressCreatePayloadKeySpecifier | (() => undefined | CustomerAddressCreatePayloadKeySpecifier),
		fields?: CustomerAddressCreatePayloadFieldPolicy,
	},
	CustomerAddressDeletePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerAddressDeletePayloadKeySpecifier | (() => undefined | CustomerAddressDeletePayloadKeySpecifier),
		fields?: CustomerAddressDeletePayloadFieldPolicy,
	},
	CustomerAddressEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerAddressEdgeKeySpecifier | (() => undefined | CustomerAddressEdgeKeySpecifier),
		fields?: CustomerAddressEdgeFieldPolicy,
	},
	CustomerAddressUpdatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerAddressUpdatePayloadKeySpecifier | (() => undefined | CustomerAddressUpdatePayloadKeySpecifier),
		fields?: CustomerAddressUpdatePayloadFieldPolicy,
	},
	CustomerEmailAlreadyConfirmedError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerEmailAlreadyConfirmedErrorKeySpecifier | (() => undefined | CustomerEmailAlreadyConfirmedErrorKeySpecifier),
		fields?: CustomerEmailAlreadyConfirmedErrorFieldPolicy,
	},
	CustomerGroup?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerGroupKeySpecifier | (() => undefined | CustomerGroupKeySpecifier),
		fields?: CustomerGroupFieldPolicy,
	},
	CustomerGroupConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerGroupConnectionKeySpecifier | (() => undefined | CustomerGroupConnectionKeySpecifier),
		fields?: CustomerGroupConnectionFieldPolicy,
	},
	CustomerGroupEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerGroupEdgeKeySpecifier | (() => undefined | CustomerGroupEdgeKeySpecifier),
		fields?: CustomerGroupEdgeFieldPolicy,
	},
	CustomerInvalidActivationTokenError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerInvalidActivationTokenErrorKeySpecifier | (() => undefined | CustomerInvalidActivationTokenErrorKeySpecifier),
		fields?: CustomerInvalidActivationTokenErrorFieldPolicy,
	},
	CustomerInvalidPasswordError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerInvalidPasswordErrorKeySpecifier | (() => undefined | CustomerInvalidPasswordErrorKeySpecifier),
		fields?: CustomerInvalidPasswordErrorFieldPolicy,
	},
	CustomerNotFoundError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerNotFoundErrorKeySpecifier | (() => undefined | CustomerNotFoundErrorKeySpecifier),
		fields?: CustomerNotFoundErrorFieldPolicy,
	},
	CustomerPasswordResetPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerPasswordResetPayloadKeySpecifier | (() => undefined | CustomerPasswordResetPayloadKeySpecifier),
		fields?: CustomerPasswordResetPayloadFieldPolicy,
	},
	CustomerPasswordResetTokenPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerPasswordResetTokenPayloadKeySpecifier | (() => undefined | CustomerPasswordResetTokenPayloadKeySpecifier),
		fields?: CustomerPasswordResetTokenPayloadFieldPolicy,
	},
	CustomerRegisterFailedError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerRegisterFailedErrorKeySpecifier | (() => undefined | CustomerRegisterFailedErrorKeySpecifier),
		fields?: CustomerRegisterFailedErrorFieldPolicy,
	},
	CustomerRegisterPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerRegisterPayloadKeySpecifier | (() => undefined | CustomerRegisterPayloadKeySpecifier),
		fields?: CustomerRegisterPayloadFieldPolicy,
	},
	CustomerUpdatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerUpdatePayloadKeySpecifier | (() => undefined | CustomerUpdatePayloadKeySpecifier),
		fields?: CustomerUpdatePayloadFieldPolicy,
	},
	DiscountApplication?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DiscountApplicationKeySpecifier | (() => undefined | DiscountApplicationKeySpecifier),
		fields?: DiscountApplicationFieldPolicy,
	},
	DiscountApplicationConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DiscountApplicationConnectionKeySpecifier | (() => undefined | DiscountApplicationConnectionKeySpecifier),
		fields?: DiscountApplicationConnectionFieldPolicy,
	},
	DiscountApplicationEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DiscountApplicationEdgeKeySpecifier | (() => undefined | DiscountApplicationEdgeKeySpecifier),
		fields?: DiscountApplicationEdgeFieldPolicy,
	},
	DiscountCodeDto?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DiscountCodeDtoKeySpecifier | (() => undefined | DiscountCodeDtoKeySpecifier),
		fields?: DiscountCodeDtoFieldPolicy,
	},
	DiscountedPrice?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DiscountedPriceKeySpecifier | (() => undefined | DiscountedPriceKeySpecifier),
		fields?: DiscountedPriceFieldPolicy,
	},
	Facet?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FacetKeySpecifier | (() => undefined | FacetKeySpecifier),
		fields?: FacetFieldPolicy,
	},
	FacetValue?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FacetValueKeySpecifier | (() => undefined | FacetValueKeySpecifier),
		fields?: FacetValueFieldPolicy,
	},
	InvalidCredentialsError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvalidCredentialsErrorKeySpecifier | (() => undefined | InvalidCredentialsErrorKeySpecifier),
		fields?: InvalidCredentialsErrorFieldPolicy,
	},
	InvalidPasswordError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvalidPasswordErrorKeySpecifier | (() => undefined | InvalidPasswordErrorKeySpecifier),
		fields?: InvalidPasswordErrorFieldPolicy,
	},
	InvalidRefreshTokenError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvalidRefreshTokenErrorKeySpecifier | (() => undefined | InvalidRefreshTokenErrorKeySpecifier),
		fields?: InvalidRefreshTokenErrorFieldPolicy,
	},
	InvalidTokenError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvalidTokenErrorKeySpecifier | (() => undefined | InvalidTokenErrorKeySpecifier),
		fields?: InvalidTokenErrorFieldPolicy,
	},
	KeyValuePairOfStringAndString?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | KeyValuePairOfStringAndStringKeySpecifier | (() => undefined | KeyValuePairOfStringAndStringKeySpecifier),
		fields?: KeyValuePairOfStringAndStringFieldPolicy,
	},
	LineShippingMethod?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LineShippingMethodKeySpecifier | (() => undefined | LineShippingMethodKeySpecifier),
		fields?: LineShippingMethodFieldPolicy,
	},
	ManualPaymentGateway?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ManualPaymentGatewayKeySpecifier | (() => undefined | ManualPaymentGatewayKeySpecifier),
		fields?: ManualPaymentGatewayFieldPolicy,
	},
	Media?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MediaKeySpecifier | (() => undefined | MediaKeySpecifier),
		fields?: MediaFieldPolicy,
	},
	MediaConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MediaConnectionKeySpecifier | (() => undefined | MediaConnectionKeySpecifier),
		fields?: MediaConnectionFieldPolicy,
	},
	MediaEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MediaEdgeKeySpecifier | (() => undefined | MediaEdgeKeySpecifier),
		fields?: MediaEdgeFieldPolicy,
	},
	Money?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MoneyKeySpecifier | (() => undefined | MoneyKeySpecifier),
		fields?: MoneyFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Node?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NodeKeySpecifier | (() => undefined | NodeKeySpecifier),
		fields?: NodeFieldPolicy,
	},
	Order?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderKeySpecifier | (() => undefined | OrderKeySpecifier),
		fields?: OrderFieldPolicy,
	},
	OrderConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderConnectionKeySpecifier | (() => undefined | OrderConnectionKeySpecifier),
		fields?: OrderConnectionFieldPolicy,
	},
	OrderEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderEdgeKeySpecifier | (() => undefined | OrderEdgeKeySpecifier),
		fields?: OrderEdgeFieldPolicy,
	},
	OrderLineItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderLineItemKeySpecifier | (() => undefined | OrderLineItemKeySpecifier),
		fields?: OrderLineItemFieldPolicy,
	},
	OrderLineItemConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderLineItemConnectionKeySpecifier | (() => undefined | OrderLineItemConnectionKeySpecifier),
		fields?: OrderLineItemConnectionFieldPolicy,
	},
	OrderLineItemEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderLineItemEdgeKeySpecifier | (() => undefined | OrderLineItemEdgeKeySpecifier),
		fields?: OrderLineItemEdgeFieldPolicy,
	},
	OrderShippingLine?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderShippingLineKeySpecifier | (() => undefined | OrderShippingLineKeySpecifier),
		fields?: OrderShippingLineFieldPolicy,
	},
	PageInfoV2?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PageInfoV2KeySpecifier | (() => undefined | PageInfoV2KeySpecifier),
		fields?: PageInfoV2FieldPolicy,
	},
	PaymentDto?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentDtoKeySpecifier | (() => undefined | PaymentDtoKeySpecifier),
		fields?: PaymentDtoFieldPolicy,
	},
	PaymentDtoConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentDtoConnectionKeySpecifier | (() => undefined | PaymentDtoConnectionKeySpecifier),
		fields?: PaymentDtoConnectionFieldPolicy,
	},
	PaymentDtoEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentDtoEdgeKeySpecifier | (() => undefined | PaymentDtoEdgeKeySpecifier),
		fields?: PaymentDtoEdgeFieldPolicy,
	},
	PaymentGateway?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentGatewayKeySpecifier | (() => undefined | PaymentGatewayKeySpecifier),
		fields?: PaymentGatewayFieldPolicy,
	},
	PaymentGatewayChannelMismatchError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentGatewayChannelMismatchErrorKeySpecifier | (() => undefined | PaymentGatewayChannelMismatchErrorKeySpecifier),
		fields?: PaymentGatewayChannelMismatchErrorFieldPolicy,
	},
	PaymentGatewayConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentGatewayConnectionKeySpecifier | (() => undefined | PaymentGatewayConnectionKeySpecifier),
		fields?: PaymentGatewayConnectionFieldPolicy,
	},
	PaymentGatewayEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentGatewayEdgeKeySpecifier | (() => undefined | PaymentGatewayEdgeKeySpecifier),
		fields?: PaymentGatewayEdgeFieldPolicy,
	},
	PaymentGatewayNotFoundError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentGatewayNotFoundErrorKeySpecifier | (() => undefined | PaymentGatewayNotFoundErrorKeySpecifier),
		fields?: PaymentGatewayNotFoundErrorFieldPolicy,
	},
	PaymentGatewaySessionInitializeFailedError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentGatewaySessionInitializeFailedErrorKeySpecifier | (() => undefined | PaymentGatewaySessionInitializeFailedErrorKeySpecifier),
		fields?: PaymentGatewaySessionInitializeFailedErrorFieldPolicy,
	},
	PaymentMethod?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentMethodKeySpecifier | (() => undefined | PaymentMethodKeySpecifier),
		fields?: PaymentMethodFieldPolicy,
	},
	PaymentSession?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentSessionKeySpecifier | (() => undefined | PaymentSessionKeySpecifier),
		fields?: PaymentSessionFieldPolicy,
	},
	PostalCodeInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PostalCodeInfoKeySpecifier | (() => undefined | PostalCodeInfoKeySpecifier),
		fields?: PostalCodeInfoFieldPolicy,
	},
	Price?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PriceKeySpecifier | (() => undefined | PriceKeySpecifier),
		fields?: PriceFieldPolicy,
	},
	Product?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductKeySpecifier | (() => undefined | ProductKeySpecifier),
		fields?: ProductFieldPolicy,
	},
	ProductDiscount?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductDiscountKeySpecifier | (() => undefined | ProductDiscountKeySpecifier),
		fields?: ProductDiscountFieldPolicy,
	},
	ProductDiscountAbsoluteValue?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductDiscountAbsoluteValueKeySpecifier | (() => undefined | ProductDiscountAbsoluteValueKeySpecifier),
		fields?: ProductDiscountAbsoluteValueFieldPolicy,
	},
	ProductDiscountRelativeValue?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductDiscountRelativeValueKeySpecifier | (() => undefined | ProductDiscountRelativeValueKeySpecifier),
		fields?: ProductDiscountRelativeValueFieldPolicy,
	},
	ProductPriceRange?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductPriceRangeKeySpecifier | (() => undefined | ProductPriceRangeKeySpecifier),
		fields?: ProductPriceRangeFieldPolicy,
	},
	ProductVariant?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductVariantKeySpecifier | (() => undefined | ProductVariantKeySpecifier),
		fields?: ProductVariantFieldPolicy,
	},
	ProductVariantAvailability?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductVariantAvailabilityKeySpecifier | (() => undefined | ProductVariantAvailabilityKeySpecifier),
		fields?: ProductVariantAvailabilityFieldPolicy,
	},
	ProductVariantConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductVariantConnectionKeySpecifier | (() => undefined | ProductVariantConnectionKeySpecifier),
		fields?: ProductVariantConnectionFieldPolicy,
	},
	ProductVariantEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductVariantEdgeKeySpecifier | (() => undefined | ProductVariantEdgeKeySpecifier),
		fields?: ProductVariantEdgeFieldPolicy,
	},
	ProductVariantNotFoundError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductVariantNotFoundErrorKeySpecifier | (() => undefined | ProductVariantNotFoundErrorKeySpecifier),
		fields?: ProductVariantNotFoundErrorFieldPolicy,
	},
	ProductsConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductsConnectionKeySpecifier | (() => undefined | ProductsConnectionKeySpecifier),
		fields?: ProductsConnectionFieldPolicy,
	},
	ProductsEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductsEdgeKeySpecifier | (() => undefined | ProductsEdgeKeySpecifier),
		fields?: ProductsEdgeFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	RelativeShippingMethodRate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RelativeShippingMethodRateKeySpecifier | (() => undefined | RelativeShippingMethodRateKeySpecifier),
		fields?: RelativeShippingMethodRateFieldPolicy,
	},
	RelativeValue?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RelativeValueKeySpecifier | (() => undefined | RelativeValueKeySpecifier),
		fields?: RelativeValueFieldPolicy,
	},
	SelectedAttribute?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SelectedAttributeKeySpecifier | (() => undefined | SelectedAttributeKeySpecifier),
		fields?: SelectedAttributeFieldPolicy,
	},
	ShippingMethodNotFoundError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ShippingMethodNotFoundErrorKeySpecifier | (() => undefined | ShippingMethodNotFoundErrorKeySpecifier),
		fields?: ShippingMethodNotFoundErrorFieldPolicy,
	},
	Store?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StoreKeySpecifier | (() => undefined | StoreKeySpecifier),
		fields?: StoreFieldPolicy,
	},
	StripePaymentGateway?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StripePaymentGatewayKeySpecifier | (() => undefined | StripePaymentGatewayKeySpecifier),
		fields?: StripePaymentGatewayFieldPolicy,
	},
	StripePaymentSession?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StripePaymentSessionKeySpecifier | (() => undefined | StripePaymentSessionKeySpecifier),
		fields?: StripePaymentSessionFieldPolicy,
	},
	SwatchAttributeValue?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SwatchAttributeValueKeySpecifier | (() => undefined | SwatchAttributeValueKeySpecifier),
		fields?: SwatchAttributeValueFieldPolicy,
	},
	TaxPortion?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TaxPortionKeySpecifier | (() => undefined | TaxPortionKeySpecifier),
		fields?: TaxPortionFieldPolicy,
	},
	TaxRate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TaxRateKeySpecifier | (() => undefined | TaxRateKeySpecifier),
		fields?: TaxRateFieldPolicy,
	},
	TaxedPrice?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TaxedPriceKeySpecifier | (() => undefined | TaxedPriceKeySpecifier),
		fields?: TaxedPriceFieldPolicy,
	},
	TextAttributeValue?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TextAttributeValueKeySpecifier | (() => undefined | TextAttributeValueKeySpecifier),
		fields?: TextAttributeValueFieldPolicy,
	},
	TypeId?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TypeIdKeySpecifier | (() => undefined | TypeIdKeySpecifier),
		fields?: TypeIdFieldPolicy,
	},
	TypeIdDecoded?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TypeIdDecodedKeySpecifier | (() => undefined | TypeIdDecodedKeySpecifier),
		fields?: TypeIdDecodedFieldPolicy,
	},
	UnitPrice?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnitPriceKeySpecifier | (() => undefined | UnitPriceKeySpecifier),
		fields?: UnitPriceFieldPolicy,
	},
	UpdateCartLineItemsInsufficientStockError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateCartLineItemsInsufficientStockErrorKeySpecifier | (() => undefined | UpdateCartLineItemsInsufficientStockErrorKeySpecifier),
		fields?: UpdateCartLineItemsInsufficientStockErrorFieldPolicy,
	},
	UserError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserErrorKeySpecifier | (() => undefined | UserErrorKeySpecifier),
		fields?: UserErrorFieldPolicy,
	},
	ValueObject?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ValueObjectKeySpecifier | (() => undefined | ValueObjectKeySpecifier),
		fields?: ValueObjectFieldPolicy,
	},
	ZoneInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ZoneInfoKeySpecifier | (() => undefined | ZoneInfoKeySpecifier),
		fields?: ZoneInfoFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;