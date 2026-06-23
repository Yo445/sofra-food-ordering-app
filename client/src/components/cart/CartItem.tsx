"use client";

import { useTranslation } from "react-i18next";
import type { CartItem as CartItemType } from "@/store/cart.store";
import { useCartStore } from "@/store/cart.store";
import { QuantitySelector } from "./QuantitySelector";

export function CartItem({ item }: { item: CartItemType }) {
  const { t } = useTranslation();
  const { removeItem } = useCartStore();

  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div>
        <h3 className="font-medium text-zinc-800">{item.name}</h3>
        <p className="text-sm text-zinc-500">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-4">
        <QuantitySelector itemId={item.id} quantity={item.quantity} />
        <span className="w-16 text-right font-semibold text-zinc-800">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <button
          onClick={() => removeItem(item.id)}
          className="text-xs text-red-500 hover:text-red-700 transition-colors"
        >
          {t("cart.remove")}
        </button>
      </div>
    </div>
  );
}
