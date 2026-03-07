"use client";

import { createContext, useContext } from "react";
import { Cart } from "./types";

interface CartContextValue {
  cart?: Cart | null;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartContextProvider");
  }
  return context;
}

export default function CartProvider({
  cart,
  children,
}: {
  cart?: Cart | null;
  children: React.ReactNode;
}) {
  return (
    <CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>
  );
}
