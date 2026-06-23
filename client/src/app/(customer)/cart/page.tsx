"use client";

import { useTranslation } from "react-i18next";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCartStore } from "@/store/cart.store";

export default function CartPage() {
  const { t } = useTranslation();
  const items = useCartStore((s) => s.items);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">{t("cart.title")}</h1>
      {items.length === 0 ? (
        <p className="text-center text-zinc-400 py-8">{t("cart.empty")}</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <CartSummary />
        </>
      )}
    </div>
  );
}
