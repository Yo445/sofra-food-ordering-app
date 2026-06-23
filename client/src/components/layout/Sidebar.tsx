"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="w-64 border-r bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">{t("nav.admin")}</h2>
      <nav className="space-y-2">
        <Link href="/admin/dashboard" className="block rounded px-3 py-2 hover:bg-zinc-100">{t("nav.dashboard")}</Link>
        <Link href="/admin/products" className="block rounded px-3 py-2 hover:bg-zinc-100">{t("nav.products")}</Link>
        <Link href="/admin/orders" className="block rounded px-3 py-2 hover:bg-zinc-100">{t("nav.orders")}</Link>
      </nav>
    </aside>
  );
}
