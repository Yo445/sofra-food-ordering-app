"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useSignup } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";

export default function SignupPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const signup = useSignup();

  useEffect(() => {
    if (user) {
      router.replace("/menu");
    }
  }, [user, router]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError(t("auth.signup.nameRequired"));
      return;
    }
    if (password.length < 6) {
      setError(t("auth.signup.passwordMin"));
      return;
    }
    if (password !== confirm) {
      setError(t("auth.signup.passwordMismatch"));
      return;
    }

    try {
      await signup.mutateAsync({ name, email, password });
      router.push("/menu");
    } catch {
      setError(t("auth.signup.failed"));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl shadow-amber-200/50">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-amber-800">{t("app.name")}</h1>
            <p className="mt-1 text-sm text-zinc-500">{t("auth.signup.title")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label={t("auth.signup.name")}
              type="text"
              placeholder={t("auth.signup.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />

            <Input
              label={t("auth.signup.email")}
              type="email"
              placeholder={t("auth.signup.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />

            <Input
              label={t("auth.signup.password")}
              type="password"
              placeholder={t("auth.signup.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />

            <Input
              label={t("auth.signup.confirm")}
              type="password"
              placeholder={t("auth.signup.confirmPlaceholder")}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
            />

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                {error}
              </div>
            )}

            <Button type="submit" loading={signup.isPending} className="w-full" size="lg">
              {t("auth.signup.submit")}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            {t("auth.signup.hasAccount")}{" "}
            <Link href="/login" className="font-medium text-amber-700 hover:text-amber-800">
              {t("auth.signup.login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
