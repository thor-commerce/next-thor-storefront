"use server";

import { CACHE_TAGS } from "@/constants";
import { getCartIdFromCookies } from "@/features/cart/utils";
import { auth } from "@/lib/auth";
import { getRequestContext } from "@/lib/request-context";
import { CartCreateDocument, CartCreateMutationVariables, CartDocument, CartLineItemsAddDocument, CartLineItemsRemoveDocument, CartLineItemsUpdateDocument, CategoriesDocument, CategoryListDocument, CategoryListQueryVariables, CollectionListDocument, CollectionListQueryVariables, CollectionsDocument, CustomerActivateDocument, CustomerActivateMutationVariables, CustomerRegisterDocument, CustomerResetPasswordDocument, CustomerResetPasswordMutationVariables, CustomerResetPasswordTokenDocument, CustomerResetPasswordTokenMutationVariables, ProductDetailDocument, ProductListDocument, ProductListQueryVariables, TypedDocumentString } from "@/lib/thorcommerce/storefront/generated/types.generated";
import { removeEdgesAndNodes } from "@/lib/thorcommerce/utils";
import { cacheLife, cacheTag } from "next/cache";
import { headers } from "next/headers";

const endpoint = `https://api.thorcommerce.io/${process.env.THOR_PROJECT}/storefront/graphql`;

export async function storefrontFetch<TData, TVariables>({
    headers: HeadersInit,
    query,
    variables,
}: {
    headers?: HeadersInit;
    query: TypedDocumentString<TData, TVariables>;
    variables?: TVariables;
}): Promise<TData> {


    const sessionCtx = await auth.api.getSession({
        headers: await headers()
    });


    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...HeadersInit,
            //Include the Authorization header if we have a session token, this allows Thor to validate the user and return user-specific data special prices and etc....
            ...(sessionCtx ? { Authorization: `Bearer ${sessionCtx.session.token}` } : {}),
        },
        body: JSON.stringify({
            query: query.toString(),
            variables,
        }),
    });

    if (!response.ok) {
        throw new Error(`Storefront API error: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
        throw new Error(json.errors.map((e: { message: string }) => e.message).join("\n"));
    }

    return json.data as TData;
}

export async function getCollections() {
    const context = await getRequestContext();

    const data = await storefrontFetch({
        query: CollectionsDocument,
        variables: {
            storeId: context.store,
            currency: context.currency
        },
    })

    return removeEdgesAndNodes(data.collections);
}

export async function getCollectionList({ slug, sortDirection, sortKey }: Pick<CollectionListQueryVariables, "slug" | "sortDirection" | "sortKey">) {
    const context = await getRequestContext();

    const data = await storefrontFetch({
        query: CollectionListDocument,
        variables: {
            storeId: context.store,
            currency: context.currency,
            sortDirection: sortDirection,
            sortKey: sortKey,
            slug: slug
        },
    })

    if (!data.collection)
        return { name: "", products: [], totalCount: 0 };

    return {
        name: data.collection.name, products: removeEdgesAndNodes(data.collection.products), totalCount: data.collection.products.totalCount
    };
}

export async function getCategories() {
    const context = await getRequestContext();

    const data = await storefrontFetch({
        query: CategoriesDocument,
        variables: {
            storeId: context.store,
            currency: context.currency
        },
    })

    return removeEdgesAndNodes(data.categories);
}

export async function getCategoryList({ slug, sortDirection, sortKey }: Pick<CategoryListQueryVariables, "slug" | "sortDirection" | "sortKey">) {
    const context = await getRequestContext();

    const data = await storefrontFetch({
        query: CategoryListDocument,
        variables: {
            storeId: context.store,
            currency: context.currency,
            sortDirection: sortDirection,
            sortKey: sortKey,
            slug: slug
        },
    })

    if (!data.category)
        return { name: "", products: [], totalCount: 0 };

    return {
        name: data.category.name, products: removeEdgesAndNodes(data.category.products), totalCount: data.category.products.totalCount
    };
}

export const getProductList = async ({ sortDirection, sortKey }: Pick<ProductListQueryVariables, "sortDirection" | "sortKey">) => {

    const context = await getRequestContext();

    const data = await storefrontFetch({
        query: ProductListDocument,
        variables: {
            storeId: context.store,
            currency: context.currency,
            sortDirection: sortDirection,
            sortKey: sortKey
        },
    })

    if (!data.products)
        return { products: [], totalCount: 0 };

    return { products: removeEdgesAndNodes(data.products), totalCount: data.products.totalCount };
}

export const getProductDetail = async ({ slug }: { slug: string }) => {

    const context = await getRequestContext();

    const data = await storefrontFetch({
        query: ProductDetailDocument,
        variables: {
            slug,
            store: context.store,
            currency: context.currency,
        },
    })

    return data.product;
}


export const customerRegister = async (email: string) => {
    const data = await storefrontFetch({
        query: CustomerRegisterDocument,
        variables: {
            input: {
                email
            }
        }
    })

    return data.customerRegister;
}

export const customerActivate = async (variables: CustomerActivateMutationVariables) => {
    const data = await storefrontFetch({
        query: CustomerActivateDocument,
        variables: variables
    })

    return data.customerActivate;
}

export const customerPasswordResetToken = async (variables: CustomerResetPasswordTokenMutationVariables) => {
    const data = await storefrontFetch({
        query: CustomerResetPasswordTokenDocument,
        variables
    })

    return data.customerPasswordResetToken;
}

export const customerPasswordReset = async (variables: CustomerResetPasswordMutationVariables) => {
    const data = await storefrontFetch({
        query: CustomerResetPasswordDocument,
        variables
    })

    return data.customerPasswordReset;
}



const createCart = async (variables: CartCreateMutationVariables) =>
    storefrontFetch({
        query: CartCreateDocument,
        variables: variables
    });



export async function getCart() {
    "use cache: private";
    cacheTag(CACHE_TAGS.cart);
    cacheLife("seconds");
    const context = await getRequestContext();
    const cartId = await getCartIdFromCookies();

    //if the cart dosn't exist, create a new one, this can happen if the user is visiting for the first time or if the cart has been cleared from cookies, in both cases we want to create a new cart for the user
    if (!cartId) {
        return (
            await createCart({
                input: {
                    currency: context.currency,
                    storeId: context.store
                }
            })
        )?.cartCreate?.cart;
    }

    const response = await storefrontFetch({
        query: CartDocument,
        variables: {
            id: cartId,
        },
    });

    const cart = response?.cart;

    // If the cart is not found (e.g., it was cleared from the backend), create a new one. This ensures the user always has a cart to work with.
    return cart || (await createCart({
        input: {
            currency: context.currency,
            storeId: context.store
        }
    })).cartCreate?.cart;
}


export async function addToCart(lines: { variantId: string; quantity: number }[]) {
    const cartId = await getCartIdFromCookies();

    const response = await storefrontFetch({
        query: CartLineItemsAddDocument,
        variables: {
            input: {
                cartId,
                lineItems: lines.map(line => ({
                    variantId: line.variantId,
                    quantity: line.quantity
                }))
            }
        }
    })

    return response.cartLineItemsAdd;
}

export async function updateCartLineItems(lines: { lineItemId: string; quantity: number }[]) {
    const cartId = await getCartIdFromCookies();

    const response = await storefrontFetch({
        query: CartLineItemsUpdateDocument,
        variables: {
            input: {
                cartId,
                lineItems: lines
            }
        }
    })

    return response.cartLineItemsUpdate;
}

export async function removeFromCart(lineIds: string[]) {
    const cartId = await getCartIdFromCookies();

    const response = await storefrontFetch({
        query: CartLineItemsRemoveDocument,
        variables: {
            input: {
                cartId,
                lineItemIds: lineIds
            }
        }
    })

    return response.cartLineItemsRemove;
}
