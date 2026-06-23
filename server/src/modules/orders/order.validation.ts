import { z } from "zod";

const orderItemSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
  address: z.string().min(5, "Address is required"),
});

export const updateStatusSchema = z.object({
  status: z.enum(["pending", "preparing", "on_the_way", "delivered", "cancelled"]),
});
