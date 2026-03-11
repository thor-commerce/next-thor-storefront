"use server";

import { gql } from "@/__generated__/thor";
import { CartLineItemsAddMutation, CartLineItemsAddMutationVariables } from "@/__generated__/thor/graphql";
import { CACHE_TAGS, getCartCacheTag } from "@/constants";
import { getClient } from "@/lib/thor/apollo-client";
import { getServerContext } from "@/utils/server";
import { updateTag } from "next/cache";
import invariant from "tiny-invariant";
import { findOrCreateCart, getCartIdFromCookies, saveCartIdToCookie } from "../cart/utils";

const CART_ADD_ITEMS_MUTATION = gql(/* GraphQL */ `
	mutation CartLineItemsAdd($input: CartLineItemsAddInput!) {
		cartLineItemsAdd(input: $input) {
			cart {
				id
			}
			errors {
				__typename
			}
		}
	}
`);

export async function addItem(data: FormData) {
	invariant(data, "Submitted form without data");

	const selectedVariantID = data.get("variantId")?.toString();

	//can i acccess the url from inside here?

	const cartId = await getCartIdFromCookies();
	const { store, country } = await getServerContext();

	const cart = await findOrCreateCart({
		cartId,
		storeId: store,
		country: country.code.toUpperCase(),
	});

	invariant(cart, "Cart not found or created");

	await saveCartIdToCookie(cart.id);

	if (!selectedVariantID) {
		return;
	}
	const cartLineItemsAddResponse = await getClient().mutate<
		CartLineItemsAddMutation,
		CartLineItemsAddMutationVariables
	>({
		mutation: CART_ADD_ITEMS_MUTATION,
		variables: {
			input: {
				cartId: cart.id,
				lineItems: [
					{
						variantId: selectedVariantID,
						quantity: 1, // Default to adding one item
					},
				],
			},
		},
	});

	if (!cartLineItemsAddResponse.data?.cartLineItemsAdd) {
		return;
	}

	updateTag(CACHE_TAGS.cart);
	updateTag(getCartCacheTag(cart.id));
}
