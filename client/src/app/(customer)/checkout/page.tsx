"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { AddressForm } from "@/components/checkout/AddressForm";
import { PaymentMethods } from "@/components/checkout/PaymentMethods";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { useCartStore } from "@/store/cart.store";
import { useCreateOrder } from "@/hooks/useOrders";
import { useCreatePayment } from "@/hooks/usePayment";

export default function CheckoutPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const createOrder = useCreateOrder();
  const createPayment = useCreatePayment();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [error, setError] = useState("");

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      setError(t("checkout.addressRequired"));
      return;
    }
    setError("");

    try {
      const order = await createOrder.mutateAsync({
        items: items.map((i) => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        address,
      });

      await createPayment.mutateAsync({ orderId: order._id, method: paymentMethod });

      clearCart();
      router.push(`/tracking/${order._id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("checkout.failed"));
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-zinc-400">{t("cart.empty")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">{t("checkout.title")}</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}

      <AddressForm value={address} onChange={setAddress} />
      <PaymentMethods value={paymentMethod} onChange={setPaymentMethod} />
      <OrderSummary loading={createOrder.isPending} onSubmit={handlePlaceOrder} />
    </div>
  );
}
