"use client";

import { useCartStore } from "@/store/cart.store";

export function useCart() {
  const { items, addItem, removeItem, clearCart } = useCartStore();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, total, count, addItem, removeItem, clearCart };
}
