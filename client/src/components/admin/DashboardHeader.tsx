"use client";

import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/auth.store";

export function DashboardHeader() {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-zinc-800">
        {t("admin.welcome", { name: user?.name || "Admin" })}
      </h1>
      <p className="mt-1 text-zinc-500">{t("admin.today")}</p>
    </div>
  );
}
