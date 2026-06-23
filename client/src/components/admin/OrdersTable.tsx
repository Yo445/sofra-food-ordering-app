"use client";

import { useTranslation } from "react-i18next";
import type { Order } from "@/types/order";
import { useUpdateOrderStatus } from "@/hooks/useOrders";

interface OrdersTableProps {
  orders: Order[];
  onUpdate: () => void;
}

const STATUS_FLOW = ["pending", "preparing", "on_the_way", "delivered"];

const statusStyles: Record<string, string> = {
  pending: "bg-zinc-100 text-zinc-600",
  preparing: "bg-amber-100 text-amber-700",
  on_the_way: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

export function OrdersTable({ orders, onUpdate }: OrdersTableProps) {
  const { t } = useTranslation();
  const updateStatus = useUpdateOrderStatus();

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

  const handleStatus = (orderId: string, current: string) => {
    const idx = STATUS_FLOW.indexOf(current);
    if (idx === -1 || idx >= STATUS_FLOW.length - 1) return;
    updateStatus.mutate(
      { id: orderId, status: STATUS_FLOW[idx + 1] },
      { onSuccess: onUpdate }
    );
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50">
            <th className="px-5 py-3 text-sm font-semibold text-zinc-600">{t("admin.table.order")}</th>
            <th className="px-5 py-3 text-sm font-semibold text-zinc-600">{t("admin.table.customer")}</th>
            <th className="px-5 py-3 text-sm font-semibold text-zinc-600">{t("admin.table.items")}</th>
            <th className="px-5 py-3 text-sm font-semibold text-zinc-600">{t("admin.table.total")}</th>
            <th className="px-5 py-3 text-sm font-semibold text-zinc-600">{t("admin.table.status")}</th>
            <th className="px-5 py-3 text-sm font-semibold text-zinc-600">{t("admin.table.date")}</th>
            <th className="px-5 py-3 text-sm font-semibold text-zinc-600">{t("admin.table.action")}</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50">
              <td className="px-5 py-4 font-medium text-zinc-800">#{order._id.slice(-4)}</td>
              <td className="px-5 py-4 text-sm text-zinc-500">
                {order.userId?.name || t("admin.table.unknown")}
              </td>
              <td className="px-5 py-4 text-sm text-zinc-700">{order.items?.length ?? 0}</td>
              <td className="px-5 py-4 text-sm text-zinc-700">${order.total.toFixed(2)}</td>
              <td className="px-5 py-4">
                <span
                  className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${statusStyles[order.status] || "bg-zinc-100 text-zinc-600"}`}
                >
                  {statusLabel(order.status)}
                </span>
              </td>
              <td className="px-5 py-4 text-sm text-zinc-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="px-5 py-4">
                {order.status !== "delivered" && order.status !== "cancelled" && (
                  <button
                    onClick={() => handleStatus(order._id, order.status)}
                    className="text-xs font-medium text-amber-700 hover:text-amber-800 hover:underline"
                  >
                    {t("admin.table.markStatus", {
                      status: statusLabel(STATUS_FLOW[STATUS_FLOW.indexOf(order.status) + 1]),
                    })}
                  </button>
                )}
                {order.status === "delivered" && <span className="text-xs text-zinc-400">&mdash;</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
