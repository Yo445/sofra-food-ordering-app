import { Product } from "./product.model";
import { ApiError } from "../../utils/ApiError";

export const productService = {
  async getAll() {
    return Product.find().sort({ createdAt: -1 });
  },

  async getById(id: string) {
    const product = await Product.findById(id);
    if (!product) throw new ApiError(404, "Product not found");
    return product;
  },

  async create(data: { name: string; description?: string; price: number; category: string; stock?: number }) {
    return Product.create(data);
  },

  async update(id: string, data: Record<string, unknown>) {
    const product = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!product) throw new ApiError(404, "Product not found");
    return product;
  },

  async remove(id: string) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new ApiError(404, "Product not found");
  },
};
