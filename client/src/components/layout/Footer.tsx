"use client";

import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white py-8 text-center text-sm text-zinc-500">
      &copy; {year} {t("footer.rights")}
    </footer>
  );
}
