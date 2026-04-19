"use client";

import { Cart } from "@/features/cart/types";
import { createContext, use, useContext } from "react";

type CartContextType = {
	cartPromise: Promise<Cart | undefined | null>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
	children,
	cartPromise,
}: {
	children: React.ReactNode;
	cartPromise: Promise<Cart | undefined | null>;
}) {
	return <CartContext.Provider value={{ cartPromise }}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}

	const cart = use(context.cartPromise);

	return {
		cart,
	};
}
