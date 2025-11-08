import Cart, { CartSkeleton } from "@/features/cart/cart";
import { Suspense } from "react";

export default async function CartPage() {
  return (
    <Suspense fallback={<CartSkeleton />}>
      <Cart />
    </Suspense>
  );
}
