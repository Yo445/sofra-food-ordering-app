"use client";

import { useTranslation } from "react-i18next";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cart.store";
import { getImageUrl } from "@/lib/image";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23fef3c7' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' fill='%23d97706' font-size='18' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

export function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation();
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div className="group cursor-pointer rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-3 h-32 w-full overflow-hidden rounded-lg bg-amber-50 sm:h-40">
        <img
          src={getImageUrl(product.image) || PLACEHOLDER}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="font-semibold text-zinc-800 group-hover:text-amber-700 transition-colors">
        {product.name}
      </h3>
      <p className="mt-0.5 text-sm text-zinc-500 line-clamp-1">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-bold text-amber-700">${product.price.toFixed(2)}</span>
        <button
          onClick={handleAdd}
          className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-amber-700"
        >
          {t("menu.add")}
        </button>
      </div>
    </div>
  );
}
