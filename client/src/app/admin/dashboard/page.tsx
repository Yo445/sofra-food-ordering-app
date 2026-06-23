"use client";

import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { RecentOrders } from "@/components/admin/RecentOrders";
import { QuickActions } from "@/components/admin/QuickActions";
import { Loader } from "@/components/common/Loader";
import { useDashboardStats } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading || !stats) return <div className="p-6 md:p-8"><Loader /></div>;

  return (
    <div className="p-6 md:p-8">
      <DashboardHeader />
      <DashboardStats stats={stats} />
      <div className="mt-8">
        <RecentOrders orders={stats.recentOrders} />
      </div>
    </div>
  );
}
