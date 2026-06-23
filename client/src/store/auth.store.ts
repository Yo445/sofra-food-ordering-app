import { create } from "zustand";
import type { User } from "@/types/auth";

const STORAGE_KEY = "sofra_auth";

function loadFromStorage(): { user: User | null; token: string | null } {
  if (typeof window === "undefined") return { user: null, token: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { user: null, token: null };
}

function saveToStorage(user: User | null, token: string | null) {
  if (typeof window === "undefined") return;
  if (user && token) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("token");
  }
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

const initial = loadFromStorage();

export const useAuthStore = create<AuthState>((set) => ({
  user: initial.user,
  token: initial.token,
  isAdmin: initial.user?.role === "admin",
  setAuth: (user, token) => {
    saveToStorage(user, token);
    set({ user, token, isAdmin: user.role === "admin" });
  },
  logout: () => {
    saveToStorage(null, null);
    set({ user: null, token: null, isAdmin: false });
  },
}));
