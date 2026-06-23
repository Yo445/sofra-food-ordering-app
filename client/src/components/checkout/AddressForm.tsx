"use client";

import { useTranslation } from "react-i18next";

interface AddressFormProps {
  value: string;
  onChange: (v: string) => void;
}

export function AddressForm({ value, onChange }: AddressFormProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-zinc-700">{t("checkout.address")}</label>
      <input
        type="text"
        placeholder={t("checkout.addressPlaceholder")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>
  );
}
