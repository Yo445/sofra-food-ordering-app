export interface Order {
  _id: string;
  userId?: { name?: string };
  items: OrderItem[];
  status: "pending" | "preparing" | "on_the_way" | "delivered" | "cancelled";
  total: number;
  address: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}
