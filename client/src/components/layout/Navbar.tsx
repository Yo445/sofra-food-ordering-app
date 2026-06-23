"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/auth.store";
import { useLogout } from "@/hooks/useAuth";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";

export function Navbar() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, isAdmin } = useAuthStore();
  const logout = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const customerLinks = [
    { href: "/menu", label: t("menu.title") },
    { href: "/cart", label: t("nav.cart") },
    { href: "/orders", label: t("nav.orders") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-amber-200/60 bg-white/70 px-4 py-3 backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={isAdmin ? "/admin/dashboard" : "/menu"} className="text-xl font-bold text-amber-800 hover:text-amber-700 transition-colors">
            {t("app.name")}
          </Link>
          {user && !isAdmin && (
            <>
              <nav className="hidden items-center gap-4 text-sm sm:flex">
                {customerLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-zinc-500 hover:text-amber-700 transition-colors">{link.label}</Link>
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
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          {user && (
            <>
              <span className="hidden text-sm text-zinc-500 sm:inline">{user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-600"
              >
                {t("nav.logout")}
              </button>
            </>
          )}
          {!user && (
            <>
              <Link href="/signup" className="text-sm text-zinc-500 hover:text-amber-700 transition-colors">{t("nav.signup")}</Link>
              <Link href="/login" className="text-sm text-zinc-500 hover:text-amber-700 transition-colors">{t("nav.login")}</Link>
            </>
          )}
        </div>
      </div>
      {menuOpen && user && !isAdmin && (
        <nav className="mt-2 flex flex-col border-t border-amber-200/60 pt-2 text-sm sm:hidden">
          {customerLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="py-2 text-zinc-500 hover:text-amber-700 transition-colors">{link.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
