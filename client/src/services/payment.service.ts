import { axiosInstance } from "@/lib/axios";

export const paymentService = {
  process: async (data: { orderId: string; method: string }) => {
    const res = await axiosInstance.post("/payments/create", data);
    return res.data.data;
  },
};
