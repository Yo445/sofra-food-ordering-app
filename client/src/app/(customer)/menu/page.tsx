"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SearchBar } from "@/components/menu/SearchBar";
import { ProductGrid } from "@/components/menu/ProductGrid";
import { Loader } from "@/components/common/Loader";
import { useProducts } from "@/hooks/useProducts";

export default function CustomerPage() {
  const { t } = useTranslation();
  const { data: products, isLoading } = useProducts();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!products) return [];
    const q = search.toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [search, products]);

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-zinc-800 mb-2">{t("menu.title")}</h1>
      <p className="text-zinc-500 mb-6">{t("menu.subtitle")}</p>
      <SearchBar value={search} onChange={setSearch} />
      {isLoading ? <Loader /> : <ProductGrid products={filtered} />}
    </div>
  );
}
