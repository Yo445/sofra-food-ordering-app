"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Loader } from "@/components/common/Loader";
import { useOrders } from "@/hooks/useOrders";

const statusStyles: Record<string, string> = {
  delivered: "bg-green-100 text-green-700",
  preparing: "bg-amber-100 text-amber-700",
  on_the_way: "bg-blue-100 text-blue-700",
  pending: "bg-zinc-100 text-zinc-600",
  cancelled: "bg-red-100 text-red-600",
};

export default function OrdersPage() {
  const { t } = useTranslation();
  const { data: orders, isLoading } = useOrders();

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      delivered: t("order.delivered"),
      preparing: t("order.preparing"),
      on_the_way: t("order.onTheWay"),
      pending: t("order.placed"),
      cancelled: t("order.cancelled"),
    };
    return map[status] || status.replace(/_/g, " ");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">{t("orders.title")}</h1>
      {isLoading ? (
        <Loader />
      ) : !orders || orders.length === 0 ? (
        <p className="text-center text-zinc-400 py-8">{t("orders.empty")}</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/tracking/${order._id}`}
              className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
            >
              <div>
                <p className="font-semibold text-zinc-800">{t("tracking.title", { id: order._id.slice(-4) })}</p>
                <p className="text-sm text-zinc-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-zinc-800">${order.total.toFixed(2)}</p>
                <span
                  className={`inline-block mt-1 rounded-full px-3 py-0.5 text-xs font-medium capitalize ${
                    statusStyles[order.status] || "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  {statusLabel(order.status)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
