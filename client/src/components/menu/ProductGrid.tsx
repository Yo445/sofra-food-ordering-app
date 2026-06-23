"use client";

import { useTranslation } from "react-i18next";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
      {products.length === 0 && (
        <p className="col-span-full text-center text-zinc-400 py-8">{t("menu.noProducts")}</p>
      )}
    </div>
  );
}
