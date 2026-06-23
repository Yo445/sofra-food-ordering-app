import { axiosInstance } from "@/lib/axios";

export const authService = {
  login: async (email: string, password: string) => {
    const res = await axiosInstance.post("/auth/login", { email, password });
    return res.data.data;
  },
  signup: async (data: { name: string; email: string; password: string }) => {
    const res = await axiosInstance.post("/auth/signup", data);
    return res.data.data;
  },
};
