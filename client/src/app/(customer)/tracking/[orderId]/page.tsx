"use client";

import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Loader } from "@/components/common/Loader";
import { OrderTimeline } from "@/components/tracking/OrderTimeline";
import { OrderStatusCard } from "@/components/tracking/OrderStatusCard";
import { useOrderDetail } from "@/hooks/useOrders";

export default function TrackingPage() {
  const { t } = useTranslation();
  const params = useParams();
  const orderId = params.orderId as string;
  const { data: order, isLoading } = useOrderDetail(orderId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {isLoading ? (
        <Loader />
      ) : order ? (
        <>
          <h1 className="text-2xl font-bold text-zinc-800 mb-6">
            {t("tracking.title", { id: order._id.slice(-4) })}
          </h1>
          <OrderStatusCard status={order.status} />
          <OrderTimeline status={order.status} />
        </>
      ) : (
        <p className="text-center text-zinc-400 py-8">{t("order.notFound")}</p>
      )}
    </div>
  );
}
