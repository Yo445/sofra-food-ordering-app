"use client";

import { useTranslation } from "react-i18next";

interface Stats {
  totalOrders: number;
  revenue: number;
  totalProducts: number;
  totalCustomers: number;
}

export function DashboardStats({ stats }: { stats: Stats }) {
  const { t } = useTranslation();

  const cards = [
    { label: t("admin.stats.orders"), value: stats.totalOrders, color: "bg-amber-100 text-amber-700" },
    { label: t("admin.stats.revenue"), value: `$${stats.revenue.toFixed(2)}`, color: "bg-green-100 text-green-700" },
    { label: t("admin.stats.products"), value: stats.totalProducts, color: "bg-blue-100 text-blue-700" },
    { label: t("admin.stats.customers"), value: stats.totalCustomers, color: "bg-purple-100 text-purple-700" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-zinc-500">{card.label}</p>
          <p className={`mt-1 text-2xl font-bold ${card.color.split(" ")[1]}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
