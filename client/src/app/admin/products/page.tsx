"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "@/components/common/Loader";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { ProductModal } from "@/components/admin/ProductModal";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/types/product";

export default function ProductsPage() {
  const { t } = useTranslation();
  const { data: products, isLoading, refetch } = useProducts();
  const [showCreate, setShowCreate] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  if (isLoading) return <div className="p-6"><Loader /></div>;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("admin.page.products")}</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
        >
          {t("admin.addProduct")}
        </button>
      </div>

      <ProductsTable
        products={products ?? []}
        onEdit={(p) => setEditingProduct(p)}
        onDelete={() => refetch()}
      />

      <ProductModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
      />

      <ProductModal
        open={!!editingProduct}
        product={editingProduct ?? undefined}
        onClose={() => setEditingProduct(null)}
      />
    </div>
  );
}
