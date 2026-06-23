"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export function QuickActions() {
  const { t } = useTranslation();

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-zinc-800 mb-4">{t("admin.quickActions")}</h2>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/products"
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 transition-colors"
        >
          {t("admin.addProduct")}
        </Link>
        <Link
          href="/admin/orders"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
        >
          {t("admin.viewOrders")}
        </Link>
        <Link
          href="/admin/products"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
        >
          {t("admin.manageProducts")}
        </Link>
      </div>
    </div>
  );
}
