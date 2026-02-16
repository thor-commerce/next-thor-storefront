"use server";

import { getClient } from "@/lib/thor/apollo-client";
import { STORE, THOR_CART_COOKIE_NAME } from "@/lib/thor/config";
import { cookies } from "next/headers";
import { NAVBAR_CART_QUERY } from "./queries";
import { CACHE_TAGS } from "@/constants";
import {
  CartReplicateMutation,
  CartReplicateMutationVariables,
  CartState,
  ReplicationStrategy,
} from "@/__generated__/thor/graphql";
import { getServerContext } from "@/utils/server";
import { CART_CREATE_MUTATION, CART_REPLICATE_MUTATION } from "./mutations";
import { revalidateTag } from "next/cache";
import { getCurrencyByCountryCode } from "@/utils/countries";

export async function removeCartCookie() {
  try {
    const cookieStore = await cookies();
    cookieStore.set(THOR_CART_COOKIE_NAME, "", { maxAge: -1 });
  } catch (e) {
    console.error("Error removing checkout cookie", e);
  }
}

export async function getCartIdFromCookies() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(THOR_CART_COOKIE_NAME)?.value || "";
  return cartId;
}

export async function saveCartIdToCookie(cartId: string) {
  const shouldUseHttps = process.env.NODE_ENV === "production";
  const cookieStore = await cookies();
  cookieStore.set(THOR_CART_COOKIE_NAME, cartId, {
    sameSite: "lax",
    secure: shouldUseHttps,
  });
}

export async function cleanupCartCookieIfNeeded(cartId: string) {
  const { data } = await getClient().query({
    query: NAVBAR_CART_QUERY,
    variables: {
      id: cartId,
    },
    context: {
      fetchOptions: { tags: [CACHE_TAGS.cart] },
    },
  });

  const cart = data?.cart;

  if (!cart || cart.state === CartState.Ordered) {
    await removeCartCookie();
    return;
  }

  const { country } = await getServerContext();
  let changesCount = 0;
  if (
    cart.store?.id !== STORE.DEFAULT ||
    country.currencies[0] !== cart.currency
  ) {
    const { data } = await getClient().mutate<
      CartReplicateMutation,
      CartReplicateMutationVariables
    >({
      mutation: CART_REPLICATE_MUTATION,
      variables: {
        input: {
          cartId: cart.id,
          currency: country.currencies[0],
          storeId: STORE.DEFAULT,
          strategy: ReplicationStrategy.SkipUnavailable,
        },
      },
    });

    if (data?.cartReplicate.cart?.id) {
      await saveCartIdToCookie(data.cartReplicate.cart.id);
      changesCount++;
    }
  }

  if (changesCount > 0) {
    revalidateTag(CACHE_TAGS.cart);
  }
}

const createCart = ({
  currency,
  storeId,
  countryCode,
}: {
  currency: string;
  storeId: string;
  countryCode: string;
}) =>
  getClient().mutate({
    mutation: CART_CREATE_MUTATION,
    variables: {
      input: {
        currency,
        storeId,
        countryCode,
      },
    },
  });

export async function findOrCreateCart({
  storeId,
  cartId,
  country,
}: {
  cartId?: string;
  storeId: string;
  country: string;
}) {
  const currency = getCurrencyByCountryCode(country);

  if (!cartId) {
    return (
      await createCart({
        currency,
        storeId,
        countryCode: country,
      })
    ).data?.cartCreate?.cart;
  }

  const { data } = await getClient().query({
    query: NAVBAR_CART_QUERY,
    variables: {
      id: cartId,
    },
  });

  const cart = data?.cart;

  if (cart) {
    return cart;
  }

  const createResponse = await createCart({
    currency,
    storeId,
    countryCode: country,
  });

  const createdCart = createResponse.data?.cartCreate?.cart;
  if (createdCart) {
    return createdCart;
  }

  const createErrors = createResponse.data?.cartCreate?.errors
    ?.map((error) =>
      "message" in error && error.message
        ? `${error.__typename}: ${error.message}`
        : error.__typename
    )
    .join(", ");

  throw new Error(createErrors || "Cart creation failed");
}
