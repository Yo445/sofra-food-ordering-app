import { axiosInstance } from "@/lib/axios";

export const productService = {
  getAll: async () => {
    const res = await axiosInstance.get("/products");
    return res.data.data;
  },
  getById: async (id: string) => {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data.data;
  },
  create: async (data: FormData | Record<string, unknown>) => {
    const isFormData = data instanceof FormData;
    const res = await axiosInstance.post("/products", data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return res.data.data;
  },
  update: async (id: string, data: FormData | Record<string, unknown>) => {
    const isFormData = data instanceof FormData;
    const res = await axiosInstance.put(`/products/${id}`, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return res.data.data;
  },
  remove: async (id: string) => {
    await axiosInstance.delete(`/products/${id}`);
  },
};
