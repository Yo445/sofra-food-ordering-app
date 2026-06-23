import { axiosInstance } from "@/lib/axios";

export const dashboardService = {
  getStats: async () => {
    const res = await axiosInstance.get("/dashboard/stats");
    return res.data.data;
  },
};
