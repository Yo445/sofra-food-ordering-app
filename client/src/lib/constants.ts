export const APP_NAME = "Sofra";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const ORDER_STATUS = {
  PENDING: "pending",
  PREPARING: "preparing",
  ON_THE_WAY: "on_the_way",
  DELIVERED: "delivered",
} as const;
