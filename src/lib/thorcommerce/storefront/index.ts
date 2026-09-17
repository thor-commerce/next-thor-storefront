import "server-only";

import { getCartIdFromCookies, saveCartIdToCookie } from "@/features/cart/utils";
import { auth } from "@/lib/auth";
import { getRequestContext } from "@/lib/request-context";
import {
	CartAddressStateDocument,
	CartCompleteDocument,
	CartCompleteMutationVariables,
	CartCreateDocument,
	CartCreateMutationVariables,
	CartDocument,
	CartLineItemsAddDocument,
	CartLineItemsRemoveDocument,
	CartLineItemsUpdateDocument,
	CartPaymentSessionInitializeDocument,
	CartReplicateDocument,
	CartShippingLinesSetDocument,
	CartShippingLinesSetMutationVariables,
	CartState,
	CartUpdateDocument,
	CartUpdateMutationVariables,
	CategoryListDocument,
	CategoryListQueryVariables,
	CheckoutCartDocument,
	CollectionListDocument,
	CollectionListQueryVariables,
	CurrentCustomerDocument,
	CustomerActivateDocument,
	CustomerActivateMutationVariables,
	CustomerRegisterDocument,
	CustomerResetPasswordDocument,
	CustomerResetPasswordMutationVariables,
	CustomerResetPasswordTokenDocument,
	CustomerResetPasswordTokenMutationVariables,
	HomePageDocument,
	NavigationDocument,
	OrderDocument,
	PaymentGatewaysDocument,
	ProductDetailDocument,
	ProductListDocument,
	ProductListQueryVariables,
	ReplicationStrategy,
	TypedDocumentString,
} from "@/lib/thorcommerce/storefront/generated/types.generated";
import type {
	CartAddressInput,
	CartFragment,
	CurrentCustomerQuery,
} from "@/lib/thorcommerce/storefront/generated/types.generated";
import { getStorefrontGraphqlEndpoint } from "@/lib/thorcommerce/storefront/endpoint";
import { removeEdgesAndNodes } from "@/lib/thorcommerce/utils";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

type StorefrontApiError = {
	message?: string;
	[key: string]: unknown;
};

type StorefrontApiResponse<TData> = {
	data?: TData;
	errors?: StorefrontApiError[];
	message?: string;
	[key: string]: unknown;
};

export async function storefrontFetch<TData, TVariables>({
	headers: additionalHeaders,
	query,
	variables,
}: {
	headers?: HeadersInit;
	query: TypedDocumentString<TData, TVariables>;
	variables?: TVariables;
}): Promise<TData> {
	const storefrontApiKey = process.env.THOR_STOREFRONT_API_KEY;

	if (!storefrontApiKey) {
		throw new Error("Missing THOR_STOREFRONT_API_KEY environment variable");
	}

	const sessionCtx = await auth.api.getSession({
		headers: await headers(),
	});

	const response = await fetch(getStorefrontGraphqlEndpoint(), {
		method: "POST",
		cache: "no-store",
		headers: {
			"Content-Type": "application/json",
			...Object.fromEntries(new Headers(additionalHeaders)),
			"X-Thor-Storefront-Token": storefrontApiKey,
			//Include the Authorization header if we have a session token, this allows Thor to validate the user and return user-specific data special prices and etc....
			...(sessionCtx ? { Authorization: `Bearer ${sessionCtx.session.token}` } : {}),
		},
		body: JSON.stringify({
			query: query.toString(),
			variables,
		}),
	});

	const responseBody = await response.text();
	let json: StorefrontApiResponse<TData>;

	try {
		json = JSON.parse(responseBody) as StorefrontApiResponse<TData>;
	} catch {
		console.error("Thor Storefront API returned an invalid response", {
			status: response.status,
			statusText: response.statusText,
		});

		throw new Error(`Storefront API error: ${response.status} ${response.statusText}`);
	}

	if (!response.ok || json.errors?.length) {
		const errorMessage =
			json.errors
				?.map((error) => error.message)
				.filter((message): message is string => Boolean(message))
				.join("\n") || json.message;

		console.error("Thor Storefront API request failed", {
			status: response.status,
			statusText: response.statusText,
		});

		throw new Error(errorMessage || `Storefront API error: ${response.status} ${response.statusText}`);
	}

	if (json.data == null) throw new Error("The Storefront API returned no data.");
	return json.data;
}

export async function getNavigation() {
	const data = await storefrontFetch({ query: NavigationDocument });
	return {
		categories: removeEdgesAndNodes(data.categories),
		collections: removeEdgesAndNodes(data.collections),
	};
}

export async function getHomePageData() {
	const context = await getRequestContext();

	const data = await storefrontFetch({
		query: HomePageDocument,
		variables: {
			storeId: context.store,
			currency: context.currency,
			priceChannel: context.priceChannel,
		},
	});

	return data;
}

export async function getCollectionList({
	slug,
	sortDirection,
	after,
	sortKey,
	query,
}: Pick<CollectionListQueryVariables, "slug" | "sortDirection" | "sortKey" | "query" | "after">) {
	const context = await getRequestContext();

	const data = await storefrontFetch({
		query: CollectionListDocument,
		variables: {
			after,
			storeId: context.store,
			currency: context.currency,
			priceChannel: context.priceChannel,
			sortDirection: sortDirection,
			sortKey: sortKey,
			slug: slug,
			query,
		},
	});

	if (!data.collection) notFound();

	return {
		pageInfo: data.collection.products.pageInfo,
		facets: data.collection.products.facets,
		name: data.collection.name,
		products: removeEdgesAndNodes(data.collection.products),
		totalCount: data.collection.products.totalCount,
	};
}

export async function getCategoryList({
	slug,
	sortDirection,
	after,
	query,
	sortKey,
}: Pick<CategoryListQueryVariables, "slug" | "sortDirection" | "sortKey" | "query" | "after">) {
	const context = await getRequestContext();

	const data = await storefrontFetch({
		query: CategoryListDocument,
		variables: {
			after,
			storeId: context.store,
			currency: context.currency,
			priceChannel: context.priceChannel,
			sortDirection: sortDirection,
			sortKey: sortKey,
			slug: slug,
			query: query,
		},
	});

	if (!data.category) notFound();

	//generate breadcrumbs from category ancestors, accumulating slugs so each href includes its parents
	const ancestorCrumbs = data.category.ancestors.reduce<{ label: string; href: string }[]>(
		(acc, ancestor) => {
			const parentPath = acc.length > 0 ? acc[acc.length - 1].href : "/categories";
			acc.push({
				label: ancestor.name,
				href: `${parentPath}/${ancestor.slug}`,
			});
			return acc;
		},
		[],
	);

	const lastAncestorPath =
		ancestorCrumbs.length > 0 ? ancestorCrumbs[ancestorCrumbs.length - 1].href : "/categories";

	const breadcrumbs = [
		{ label: "Home", href: "/" },
		...ancestorCrumbs,
		{ label: data.category.name, href: `${lastAncestorPath}/${data.category.slug}` },
	];

	return {
		pageInfo: data.category.products.pageInfo,
		name: data.category.name,
		facets: data.category.products.facets,
		products: removeEdgesAndNodes(data.category.products)
			//We filter out products with no variants, as they are not purchasable and likely not intended to be shown in the product listing, this can happen if a product has variants but all of them are out of stock or unpublished, in both cases the product itself is still returned by the API but we don't want to show it in the listing
			.filter((p) => p.variants.totalCount > 0),
		totalCount: data.category.products.totalCount,
		breadcrumbs,
	};
}

export const getProductList = async ({
	sortDirection,
	after,
	sortKey,
	query,
}: Pick<ProductListQueryVariables, "sortDirection" | "sortKey" | "query" | "after">) => {
	const context = await getRequestContext();

	const data = await storefrontFetch({
		query: ProductListDocument,
		variables: {
			after,
			storeId: context.store,
			currency: context.currency,
			priceChannel: context.priceChannel,
			sortDirection: sortDirection,
			sortKey: sortKey,
			query: query,
		},
	});

	if (!data.products)
		return { products: [], totalCount: 0, facets: [], pageInfo: { hasNextPage: false, endCursor: null } };

	return {
		pageInfo: data.products.pageInfo,
		products: removeEdgesAndNodes(data.products)
			//We filter out products with no variants, as they are not purchasable and likely not intended to be shown in the product listing, this can happen if a product has variants but all of them are out of stock or unpublished, in both cases the product itself is still returned by the API but we don't want to show it in the listing
			.filter((p) => p.variants.totalCount > 0),
		totalCount: data.products.totalCount,
		facets: data.products.facets,
	};
};

export const getProductDetail = async ({ slug }: { slug: string }) => {
	const context = await getRequestContext();

	const data = await storefrontFetch({
		query: ProductDetailDocument,
		variables: {
			slug,
			store: context.store,
			currency: context.currency,
			priceChannel: context.priceChannel,
		},
	});

	const product = data.product;
	if (!product) return null;

	// A selector must see every variant, including combinations beyond the first page.
	while (product.variants.pageInfo.hasNextPage) {
		const after = product.variants.pageInfo.endCursor;
		if (!after) throw new Error("Product variant pagination returned no cursor");
		const page = await storefrontFetch({
			query: ProductDetailDocument,
			variables: {
				slug,
				store: context.store,
				currency: context.currency,
				priceChannel: context.priceChannel,
				after,
			},
		});
		if (!page.product || page.product.variants.pageInfo.endCursor === after) {
			throw new Error("Unable to load the remaining product variants");
		}
		product.variants.edges = [...(product.variants.edges ?? []), ...(page.product.variants.edges ?? [])];
		product.variants.pageInfo = page.product.variants.pageInfo;
	}
	return product;
};

export const customerRegister = async (email: string) => {
	const data = await storefrontFetch({
		query: CustomerRegisterDocument,
		variables: {
			input: {
				email,
			},
		},
	});

	return data.customerRegister;
};

export const customerActivate = async (variables: CustomerActivateMutationVariables) => {
	const data = await storefrontFetch({
		query: CustomerActivateDocument,
		variables: variables,
	});

	return data.customerActivate;
};

export const customerPasswordResetToken = async (variables: CustomerResetPasswordTokenMutationVariables) => {
	const data = await storefrontFetch({
		query: CustomerResetPasswordTokenDocument,
		variables,
	});

	return data.customerPasswordResetToken;
};

export const customerPasswordReset = async (variables: CustomerResetPasswordMutationVariables) => {
	const data = await storefrontFetch({
		query: CustomerResetPasswordDocument,
		variables,
	});

	return data.customerPasswordReset;
};

type CustomerAddress = NonNullable<NonNullable<CurrentCustomerQuery["customer"]>["defaultShippingAddress"]>;

const mapCustomerAddress = (
	address: CustomerAddress | null | undefined,
	email: string | null | undefined,
): CartAddressInput | undefined => {
	if (!address) {
		return undefined;
	}

	return {
		firstName: address.firstName ?? undefined,
		lastName: address.lastName ?? undefined,
		company: address.company ?? undefined,
		address1: address.address1 ?? undefined,
		address2: address.address2 ?? undefined,
		city: address.city ?? undefined,
		postalCode: address.postalCode ?? undefined,
		state: address.state ?? undefined,
		countryCode: address.countryCode ?? undefined,
		phone: address.phone ?? undefined,
		email: email ?? undefined,
	};
};

const getCustomerCartDefaults = async () => {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		return {};
	}

	const data = await storefrontFetch({ query: CurrentCustomerDocument });
	const customer = data.customer;

	if (!customer) {
		throw new Error("The authenticated session did not resolve a Thor customer");
	}

	const firstAddress = customer.addresses.edges?.[0]?.node;
	const shippingAddress = customer.defaultShippingAddress ?? firstAddress;
	const billingAddress = customer.defaultBillingAddress ?? shippingAddress;

	return {
		customerId: customer.id,
		customerEmail: customer.email ?? undefined,
		shippingAddress: mapCustomerAddress(shippingAddress, customer.email),
		billingAddress: mapCustomerAddress(billingAddress, customer.email),
	};
};

const createCart = async (variables: CartCreateMutationVariables) => {
	const [customerDefaults, context] = await Promise.all([getCustomerCartDefaults(), getRequestContext()]);
	const shippingAddress = variables.input.shippingAddress ?? customerDefaults.shippingAddress;
	const res = await storefrontFetch({
		query: CartCreateDocument,
		variables: {
			input: {
				...customerDefaults,
				...variables.input,
				shippingAddress: {
					...shippingAddress,
					countryCode: shippingAddress?.countryCode ?? context.country.toUpperCase(),
				},
			},
		},
	});

	if (res.cartCreate.cart?.id) {
		await saveCartIdToCookie(res.cartCreate.cart.id);
	}
	return res;
};

const attachCustomerToCart = async (
	cart: CartFragment,
	context: Awaited<ReturnType<typeof getRequestContext>>,
) => {
	const customerDefaults = await getCustomerCartDefaults();
	const customerChanged = Boolean(
		customerDefaults.customerId && cart.customerId !== customerDefaults.customerId,
	);
	let needsShippingAddress = Boolean(customerDefaults.shippingAddress && customerChanged);

	if (customerDefaults.shippingAddress && !customerChanged) {
		const addressState = await storefrontFetch({
			query: CartAddressStateDocument,
			variables: { id: cart.id },
		});
		needsShippingAddress = !addressState.cart?.shippingAddress?.address1;
	}

	if (!customerDefaults.customerId || (!customerChanged && !needsShippingAddress)) {
		return cart;
	}

	const updateResult = await storefrontFetch({
		query: CartUpdateDocument,
		variables: {
			input: {
				cartId: cart.id,
				customerId: customerDefaults.customerId,
				customerEmail: customerDefaults.customerEmail,
				shippingAddress: needsShippingAddress ? customerDefaults.shippingAddress : undefined,
				billingAddress: customerChanged ? customerDefaults.billingAddress : undefined,
			},
		},
	});
	const customerCart = updateResult.cartUpdate.cart;

	if (!customerCart || updateResult.cartUpdate.errors?.length) {
		throw new Error("Unable to attach the authenticated customer to the cart");
	}

	if (!customerChanged || customerCart.lineItemsQuantity === 0) {
		return customerCart;
	}

	// Replication resolves every line again using the customer groups now stored on
	// the cart. This prevents hosted checkout from discovering a price change.
	const replicateResult = await storefrontFetch({
		query: CartReplicateDocument,
		variables: {
			input: {
				cartId: customerCart.id,
				currency: context.currency,
				priceChannelId: context.priceChannel,
				storeId: context.store,
				strategy: ReplicationStrategy.Strict,
			},
		},
	});
	const repricedCart = replicateResult.cartReplicate.cart;

	if (!repricedCart) {
		throw new Error("Unable to reprice the cart for the authenticated customer");
	}

	await saveCartIdToCookie(repricedCart.id);
	return repricedCart;
};

export async function findOrCreateCart() {
	const context = await getRequestContext();
	const cartId = await getCartIdFromCookies();

	//if the cart dosn't exist, create a new one, this can happen if the user is visiting for the first time or if the cart has been cleared from cookies, in both cases we want to create a new cart for the user
	if (!cartId) {
		return (
			await createCart({
				input: {
					currency: context.currency,
					priceChannelId: context.priceChannel,
					storeId: context.store,
				},
			})
		)?.cartCreate?.cart;
	}

	const response = await storefrontFetch({
		query: CartDocument,
		variables: {
			id: cartId,
		},
	});

	const cart = response.cart?.state === CartState.Ordered ? null : response.cart;

	// If the cart is not found (e.g., it was cleared from the backend), create a new one. This ensures the user always has a cart to work with.
	if (!cart) {
		return (
			await createCart({
				input: {
					currency: context.currency,
					priceChannelId: context.priceChannel,
					storeId: context.store,
				},
			})
		).cartCreate?.cart;
	}

	// A direct market URL can bypass the market picker. Preserve every line when repricing.
	if (cart.currency !== context.currency || cart.store?.id !== context.store) {
		const result = await storefrontFetch({
			query: CartReplicateDocument,
			variables: {
				input: {
					cartId: cart.id,
					currency: context.currency,
					storeId: context.store,
					priceChannelId: context.priceChannel,
					strategy: ReplicationStrategy.Strict,
				},
			},
		});
		if (!result.cartReplicate.cart) throw new Error("Unable to reprice the cart for this market.");
		await saveCartIdToCookie(result.cartReplicate.cart.id);
		return attachCustomerToCart(result.cartReplicate.cart, context);
	}

	// Repair carts created before the storefront price channel was configured, including older replicated carts.
	if ((cart.priceChannel?.id ?? null) !== (context.priceChannel ?? null)) {
		const result = await storefrontFetch({
			query: CartUpdateDocument,
			variables: { input: { cartId: cart.id, priceChannelId: context.priceChannel ?? null } },
		});
		if (result.cartUpdate.errors?.length || !result.cartUpdate.cart) {
			throw new Error("Unable to update the cart pricing context");
		}
		return attachCustomerToCart(result.cartUpdate.cart, context);
	}

	return attachCustomerToCart(cart, context);
}

export async function getCart() {
	const cartId = await getCartIdFromCookies();

	if (!cartId) {
		return null;
	}

	const response = await storefrontFetch({
		query: CartDocument,
		variables: {
			id: cartId,
		},
	});

	if (response.cart?.state === CartState.Ordered) {
		return null;
	}

	return response?.cart;
}

export async function addToCart(lines: { variantId: string; quantity: number }[]) {
	const cartId = await getCartIdFromCookies();
	const response = await storefrontFetch({
		query: CartLineItemsAddDocument,
		variables: {
			input: {
				cartId,
				lineItems: lines.map((line) => ({
					variantId: line.variantId,
					quantity: line.quantity,
				})),
			},
		},
	});

	return response.cartLineItemsAdd;
}

export async function updateCartLineItems(lines: { lineItemId: string; quantity: number }[]) {
	const cartId = await getCartIdFromCookies();

	const response = await storefrontFetch({
		query: CartLineItemsUpdateDocument,
		variables: {
			input: {
				cartId,
				lineItems: lines,
			},
		},
	});

	return response.cartLineItemsUpdate;
}

export async function removeFromCart(lineIds: string[]) {
	const cartId = await getCartIdFromCookies();

	const response = await storefrontFetch({
		query: CartLineItemsRemoveDocument,
		variables: {
			input: {
				cartId,
				lineItemIds: lineIds,
			},
		},
	});

	return response.cartLineItemsRemove;
}

export async function updateCart(variables: CartUpdateMutationVariables) {
	const response = await storefrontFetch({
		query: CartUpdateDocument,
		variables,
	});

	return response.cartUpdate;
}

export async function setCartShippingLines(variables: CartShippingLinesSetMutationVariables) {
	const response = await storefrontFetch({
		query: CartShippingLinesSetDocument,
		variables,
	});

	return response.cartShippingLinesSet;
}

export async function getUser() {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		return null;
	}

	const data = await storefrontFetch({
		query: CurrentCustomerDocument,
	});

	return data.customer;
}

export async function getCheckoutCart(id: string) {
	const data = await storefrontFetch({
		query: CheckoutCartDocument,
		variables: {
			id,
		},
	});

	return data.cart;
}

export async function getPaymentGateways(cartId: string) {
	const data = await storefrontFetch({
		query: PaymentGatewaysDocument,
		variables: {
			cartId,
		},
	});

	return removeEdgesAndNodes(data.paymentGateways);
}

export async function cartPaymentSessionInitialize({
	cartId,
	gatewayId,
}: {
	cartId: string;
	gatewayId: string;
}) {
	const data = await storefrontFetch({
		query: CartPaymentSessionInitializeDocument,
		variables: {
			input: {
				cartId: cartId,
				gatewayId: gatewayId,
			},
		},
	});

	return data.cartPaymentSessionInitialize;
}

export async function completeCart(variables: CartCompleteMutationVariables) {
	const data = await storefrontFetch({
		query: CartCompleteDocument,
		variables,
	});

	return data.cartComplete;
}

export async function getOrder(id: string) {
	const data = await storefrontFetch({
		query: OrderDocument,
		variables: {
			id,
		},
	});

	return data.order;
}
