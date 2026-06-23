"use client";

import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service";

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });
};

export const useSignup = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      authService.signup({ name, email, password }),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout);
  return logout;
};
