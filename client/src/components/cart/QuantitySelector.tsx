"use client";

import { useCartStore } from "@/store/cart.store";

export function QuantitySelector({ itemId, quantity }: { itemId: string; quantity: number }) {
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);

  const handleDecrement = () => {
    if (quantity <= 1) {
      removeItem(itemId);
    } else {
      addItem({ id: itemId, name: "", price: 0, quantity: -1 });
    }
  };

  const handleIncrement = () => {
    addItem({ id: itemId, name: "", price: 0, quantity: 1 });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDecrement}
        className="rounded border px-2 py-1 text-sm hover:bg-zinc-100"
      >
        -
      </button>
      <span className="w-6 text-center">{quantity}</span>
      <button
        onClick={handleIncrement}
        className="rounded border px-2 py-1 text-sm hover:bg-zinc-100"
      >
        +
      </button>
    </div>
  );
}
