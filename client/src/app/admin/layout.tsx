"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/auth.store";
import { Loader } from "@/components/common/Loader";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("sofra_auth");
      if (!stored) {
        router.push("/login");
      }
    } else if (user.role !== "admin") {
      router.push("/menu");
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navLinks = [
    { href: "/admin/dashboard", label: t("admin.dashboard") },
    { href: "/admin/products", label: t("admin.products") },
    { href: "/admin/orders", label: t("admin.orders") },
  ];

  if (!user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <header className="flex items-center justify-between border-b border-amber-200/60 bg-white/70 px-4 py-3 backdrop-blur sm:px-6">
        <div className="flex items-center gap-6">
          <a href="/admin/dashboard" className="text-xl font-bold text-amber-800 hover:text-amber-700 transition-colors">{t("admin.title")}</a>
          <nav className="hidden items-center gap-4 text-sm sm:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-zinc-500 hover:text-amber-700 transition-colors">{link.label}</a>
            ))}
          </nav>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex sm:hidden rounded-md p-2 text-zinc-500 hover:bg-amber-100 hover:text-amber-700 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-zinc-500 sm:inline">{user.name}</span>
          <LanguageSwitcher />
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            {t("admin.logout")}
          </button>
        </div>
      </header>
      {menuOpen && (
        <nav className="flex flex-col border-b border-amber-200/60 bg-white/70 px-4 py-2 text-sm sm:hidden">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="py-2 text-zinc-500 hover:text-amber-700 transition-colors">{link.label}</a>
          ))}
        </nav>
      )}
      {children}
    </div>
  );
}
