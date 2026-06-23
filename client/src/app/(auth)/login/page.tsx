"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useLogin } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const login = useLogin();

  useEffect(() => {
    if (user) {
      router.replace(user.role === "admin" ? "/admin/dashboard" : "/menu");
    }
  }, [user, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login.mutateAsync({ email, password });
      const u = useAuthStore.getState().user;
      router.push(u?.role === "admin" ? "/admin/dashboard" : "/menu");
    } catch {
      setError(t("auth.login.failed"));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl shadow-amber-200/50">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-amber-800">{t("app.name")}</h1>
            <p className="mt-1 text-sm text-zinc-500">{t("auth.login.title")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label={t("auth.login.email")}
              type="email"
              placeholder={t("auth.login.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />

            <Input
              label={t("auth.login.password")}
              type="password"
              placeholder={t("auth.login.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                {error}
              </div>
            )}

            <Button type="submit" loading={login.isPending} className="w-full" size="lg">
              {t("auth.login.submit")}
            </Button>
          </form>

          <div className="mt-6 space-y-2 text-center">
            <p className="text-sm text-zinc-500">
              {t("auth.login.noAccount")}{" "}
              <Link href="/signup" className="font-medium text-amber-700 hover:text-amber-800">
                {t("auth.login.signup")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
