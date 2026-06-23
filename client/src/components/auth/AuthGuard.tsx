"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function AuthGuard({ children, requireAdmin }: AuthGuardProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("sofra_auth");
      if (!stored) {
        router.replace("/login");
      }
    } else if (requireAdmin && user.role !== "admin") {
      router.replace("/menu");
    }
  }, [user, requireAdmin, router]);

  if (!user) return null;
  if (requireAdmin && user.role !== "admin") return null;

  return <>{children}</>;
}
