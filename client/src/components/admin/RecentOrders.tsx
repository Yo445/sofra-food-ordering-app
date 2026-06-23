"use client";

import { useTranslation } from "react-i18next";

interface Order {
  _id: string;
  userId?: { name: string };
  total: number;
  status: string;
}

export function RecentOrders({ orders }: { orders: Order[] }) {
  const { t } = useTranslation();

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      delivered: t("order.delivered"),
      preparing: t("order.preparing"),
      on_the_way: t("order.onTheWay"),
      pending: t("order.placed"),
      cancelled: t("order.cancelled"),
    };
    return map[status] || status;
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-zinc-800 mb-4">{t("admin.recentOrders")}</h2>
      {orders.length === 0 ? (
        <p className="text-sm text-zinc-400">No recent orders.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order._id} className="flex items-center justify-between text-sm">
              <span className="text-zinc-600">{order.userId?.name || t("admin.table.unknown")}</span>
              <span className="font-medium text-zinc-800">${order.total.toFixed(2)}</span>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                {statusLabel(order.status)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
