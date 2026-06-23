"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import type { Product } from "@/types/product";

export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => productService.getAll(),
  });

export const useProduct = (id: string) =>
  useQuery<Product>({
    queryKey: ["products", id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["create-product"],
    mutationFn: (data: FormData) => productService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["update-product"],
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      productService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["delete-product"],
    mutationFn: (id: string) => productService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};
