import { Payment } from "./payment.model";
import { Order } from "../orders/order.model";
import { ApiError } from "../../utils/ApiError";

export const paymentService = {
  async create(data: { orderId: string; method: string }) {
    const order = await Order.findById(data.orderId);
    if (!order) throw new ApiError(404, "Order not found");

    const payment = await Payment.create({
      orderId: data.orderId,
      method: data.method,
      amount: order.total,
      status: "completed",
    });

    order.status = "preparing";
    await order.save();

    return payment;
  },
};
