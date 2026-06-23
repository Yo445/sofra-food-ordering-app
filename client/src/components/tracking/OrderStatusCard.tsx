"use client";

import { useTranslation } from "react-i18next";

const statusIcons: Record<string, string> = {
  pending: "🕐",
  preparing: "👨‍🍳",
  on_the_way: "🚚",
  delivered: "✅",
  cancelled: "❌",
};

export function OrderStatusCard({ status }: { status: string }) {
  const { t } = useTranslation();

  const label = {
    pending: t("order.placed"),
    preparing: t("order.preparing"),
    on_the_way: t("order.onTheWay"),
    delivered: t("order.delivered"),
    cancelled: t("order.cancelled"),
  }[status] || status;

  return (
    <div className="mb-6 rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
      <span className="text-4xl">{statusIcons[status] || "📋"}</span>
      <h2 className="mt-3 text-xl font-bold text-zinc-800">{label}</h2>
    </div>
  );
}
