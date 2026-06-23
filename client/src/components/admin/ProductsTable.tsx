"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Product } from "@/types/product";
import { getImageUrl } from "@/lib/image";
import { useDeleteProduct } from "@/hooks/useProducts";
import { ConfirmModal } from "@/components/common/ConfirmModal";

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: () => void;
}

export function ProductsTable({ products, onEdit, onDelete }: ProductsTableProps) {
  const { t } = useTranslation();
  const deleteProduct = useDeleteProduct();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteProduct.mutate(deleteTarget, {
      onSuccess: () => {
        setDeleteTarget(null);
        onDelete();
      },
    });
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              <th className="px-5 py-3 text-sm font-semibold text-zinc-600">{t("admin.table.image")}</th>
              <th className="px-5 py-3 text-sm font-semibold text-zinc-600">{t("admin.table.name")}</th>
              <th className="px-5 py-3 text-sm font-semibold text-zinc-600">{t("admin.table.category")}</th>
              <th className="px-5 py-3 text-sm font-semibold text-zinc-600">{t("admin.table.price")}</th>
              <th className="px-5 py-3 text-sm font-semibold text-zinc-600">{t("admin.table.stock")}</th>
              <th className="px-5 py-3 text-sm font-semibold text-zinc-600">{t("admin.table.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50">
                <td className="px-5 py-4">
                  <img
                    src={getImageUrl(product.image) || "/placeholder.svg"}
                    alt={product.name}
                    className="h-10 w-10 rounded-lg border object-cover"
                  />
                </td>
                <td className="px-5 py-4 font-medium text-zinc-800">{product.name}</td>
                <td className="px-5 py-4 text-sm text-zinc-500">{product.category}</td>
                <td className="px-5 py-4 text-sm text-zinc-700">${product.price.toFixed(2)}</td>
                <td className="px-5 py-4 text-sm text-zinc-700">{product.stock ?? 0}</td>
                <td className="px-5 py-4 flex gap-3">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-sm font-medium text-amber-700 hover:text-amber-800 hover:underline"
                  >
                    {t("admin.table.edit")}
                  </button>
                  <button
                    onClick={() => setDeleteTarget(product._id)}
                    className="text-sm font-medium text-red-600 hover:text-red-800 hover:underline"
                  >
                    {t("admin.table.delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        open={!!deleteTarget}
        title={t("admin.table.delete")}
        message={t("admin.table.deleteConfirm")}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteProduct.isPending}
      />
    </>
  );
}
