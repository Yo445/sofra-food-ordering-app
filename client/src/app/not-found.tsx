"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-amber-700">{t("notFound.title")}</h1>
      <p className="mt-4 text-lg text-zinc-500">{t("notFound.message")}</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-amber-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-700"
      >
        {t("notFound.home")}
      </Link>
    </div>
  );
}
