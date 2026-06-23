"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ProductForm } from "./ProductForm";
import type { Product } from "@/types/product";

interface ProductModalProps {
  open: boolean;
  product?: Product;
  onClose: () => void;
}

export function ProductModal({ open, product, onClose }: ProductModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-800">
            {product ? t("admin.page.editProduct") : t("admin.page.createProduct")}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none text-zinc-400 hover:text-zinc-600"
          >
            &times;
          </button>
        </div>
        <ProductForm product={product} onSuccess={onClose} />
      </div>
    </div>
  );
}
