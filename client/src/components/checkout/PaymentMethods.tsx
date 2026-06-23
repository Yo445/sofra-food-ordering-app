"use client";

import { useTranslation } from "react-i18next";

interface PaymentMethodsProps {
  value: string;
  onChange: (v: string) => void;
}

export function PaymentMethods({ value, onChange }: PaymentMethodsProps) {
  const { t } = useTranslation();

  const methods = [
    { id: "cod", label: t("checkout.cod") },
    { id: "card", label: t("checkout.card") },
  ];

  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-zinc-700">{t("checkout.payment")}</label>
      <div className="flex gap-4">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            className={`rounded-xl border px-5 py-3 text-sm font-medium transition-all ${
              value === m.id
                ? "border-amber-600 bg-amber-50 text-amber-700"
                : "border-zinc-300 text-zinc-600 hover:border-zinc-400"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}
