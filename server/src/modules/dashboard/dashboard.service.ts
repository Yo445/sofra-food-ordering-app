import { Order } from "../orders/order.model";
import { Product } from "../products/product.model";
import { User } from "../auth/user.model";

export const dashboardService = {
  async getStats() {
    const [
      totalOrders,
      completedOrders,
      revenueResult,
      totalProducts,
      totalCustomers,
      recentOrders,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ status: "delivered" }),
      Order.aggregate([
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
      Product.countDocuments(),
      User.countDocuments({ role: "customer" }),
      Order.find().sort({ createdAt: -1 }).limit(5).populate("userId", "name email"),
    ]);

    return {
      totalOrders,
      completedOrders,
      revenue: revenueResult[0]?.total || 0,
      totalProducts,
      totalCustomers,
      recentOrders,
    };
  },
};
