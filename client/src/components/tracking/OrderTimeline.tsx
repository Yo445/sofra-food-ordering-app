"use client";

import { useTranslation } from "react-i18next";

const STEPS = ["pending", "preparing", "on_the_way", "delivered"] as const;

export function OrderTimeline({ status }: { status: string }) {
  const { t } = useTranslation();
  const current = STEPS.indexOf(status as (typeof STEPS)[number]);

  const label = (step: string) => {
    const map: Record<string, string> = {
      pending: t("order.timeline.placed"),
      preparing: t("order.timeline.preparing"),
      on_the_way: t("order.timeline.onTheWay"),
      delivered: t("order.timeline.delivered"),
    };
    return map[step] || step;
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2">
            <div className="relative">
              {i > 0 && (
                <div className="absolute -left-6 top-1/2 hidden h-0.5 w-4 -translate-y-1/2 bg-amber-200 sm:block" />
              )}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  i <= current ? "bg-amber-600 text-white" : "bg-zinc-200 text-zinc-400"
                }`}
              >
                {i + 1}
              </div>
            </div>
            <p
              className={`text-xs font-medium ${
                i <= current ? "text-amber-700" : "text-zinc-400"
              }`}
            >
              {label(step)}
            </p>
            {i < STEPS.length - 1 && (
              <div className="ml-2 h-0.5 w-8 bg-amber-200 sm:hidden" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
