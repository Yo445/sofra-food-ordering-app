"use client";

import { useTranslation } from "react-i18next";
import { Loader } from "@/components/common/Loader";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { useOrders } from "@/hooks/useOrders";

export default function AdminOrdersPage() {
  const { t } = useTranslation();
  const { data: orders, isLoading, refetch } = useOrders();

  if (isLoading) return <div className="p-6"><Loader /></div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t("admin.page.orders")}</h1>
      <OrdersTable orders={orders ?? []} onUpdate={() => refetch()} />
    </div>
  );
}
