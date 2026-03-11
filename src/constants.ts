export const CACHE_TAGS = {
    cart: "cart",
    customer: "customer",
    order: "order",
} as const;

export const getCartCacheTag = (cartId: string) => `${CACHE_TAGS.cart}:${cartId}`;
