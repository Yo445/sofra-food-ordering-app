"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/store/cart.store";
import { Button } from "@/components/common/Button";

export function CartSummary() {
  const { t } = useTranslation();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const delivery = subtotal > 0 ? 2.99 : 0;
  const total = subtotal + delivery;

  return (
    <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-zinc-800 mb-3">{t("cart.summary")}</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-zinc-600">
          <span>{t("cart.subtotal", { count: items.length })}</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-zinc-600">
          <span>{t("cart.delivery")}</span>
          <span>{delivery === 0 ? "$0.00" : `$${delivery.toFixed(2)}`}</span>
        </div>
        <hr className="border-zinc-200" />
        <div className="flex justify-between font-semibold text-zinc-800">
          <span>{t("cart.total")}</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <Button className="mt-5 w-full" size="lg" onClick={() => router.push("/checkout")}>
        {t("cart.checkout")}
      </Button>
    </div>
  );
}
