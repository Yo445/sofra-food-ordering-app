"use client";

import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { getImageUrl } from "@/lib/image";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";
import type { Product } from "@/types/product";

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
  const { t } = useTranslation();
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price.toString() || "");
  const [category, setCategory] = useState(product?.category || "");
  const [description, setDescription] = useState(product?.description || "");
  const [stock, setStock] = useState(product?.stock?.toString() || "0");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState(getImageUrl(product?.image) || "");
  const [error, setError] = useState("");

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const loading = createProduct.isPending || updateProduct.isPending;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("price", price);
      fd.append("category", category);
      fd.append("description", description);
      fd.append("stock", stock);
      if (image) fd.append("image", image);

      if (product) {
        await updateProduct.mutateAsync({ id: product._id, data: fd });
      } else {
        await createProduct.mutateAsync(fd);
      }
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("admin.form.failed"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}
      <Input label={t("admin.form.name")} value={name} onChange={(e) => setName(e.target.value)} placeholder={t("admin.form.namePlaceholder")} />
      <Input label={t("admin.form.price")} type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder={t("admin.form.pricePlaceholder")} />
      <Input label={t("admin.form.category")} value={category} onChange={(e) => setCategory(e.target.value)} placeholder={t("admin.form.categoryPlaceholder")} />
      <Input label={t("admin.form.stock")} type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder={t("admin.form.stockPlaceholder")} />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-zinc-700">{t("admin.form.image")}</label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-zinc-500 file:mr-3 file:rounded-lg file:border-0 file:bg-amber-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-amber-700 hover:file:bg-amber-200"
        />
        {preview && (
          <img
            src={preview}
            alt={t("common.preview")}
            className="mt-2 h-32 w-32 rounded-lg border object-cover"
          />
        )}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-zinc-700">{t("admin.form.description")}</label>
        <textarea
          placeholder={t("admin.form.descriptionPlaceholder")}
          className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Button type="submit" loading={loading}>
        {product ? t("admin.form.update") : t("admin.form.create")}
      </Button>
    </form>
  );
}
