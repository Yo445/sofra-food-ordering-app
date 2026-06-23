import { Order } from "./order.model";
import { ApiError } from "../../utils/ApiError";

export const orderService = {
  async create(data: { userId: string; items: { productId: string; name: string; price: number; quantity: number }[]; address: string }) {
    const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({
      userId: data.userId,
      items: data.items,
      total,
      address: data.address,
    });
    return order;
  },

  async getAll(userId?: string, role?: string) {
    const filter = role === "admin" ? {} : { userId };
    return Order.find(filter).sort({ createdAt: -1 }).populate("userId", "name email");
  },

  async getById(id: string, userId?: string, role?: string) {
    const order = await Order.findById(id).populate("userId", "name email");
    if (!order) throw new ApiError(404, "Order not found");
    const populated = order.userId as { _id: unknown };
    const ownerId = String(typeof populated === "object" ? populated._id : populated);
    if (role !== "admin" && ownerId !== userId) {
      throw new ApiError(403, "Not authorized to view this order");
    }
    return order;
  },

  async updateStatus(id: string, status: string) {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) throw new ApiError(404, "Order not found");
    return order;
  },
};
