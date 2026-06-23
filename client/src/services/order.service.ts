import { axiosInstance } from "@/lib/axios";

export const orderService = {
  getAll: async () => {
    const res = await axiosInstance.get("/orders");
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await axiosInstance.get(`/orders/${id}`);
    return res.data.data;
  },
  create: async (data: { items: { productId: string; name: string; price: number; quantity: number }[]; address: string }) => {
    const res = await axiosInstance.post("/orders", data);
    return res.data.data;
  },
  updateStatus: async (id: string, status: string) => {
    const res = await axiosInstance.patch(`/orders/${id}/status`, { status });
    return res.data.data;
  },
};
