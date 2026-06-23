"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/services/order.service";
import type { Order } from "@/types/order";

export const useOrders = () =>
  useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: () => orderService.getAll(),
  });

export const useOrderDetail = (id: string) =>
  useQuery<Order>({
    queryKey: ["orders", id],
    queryFn: () => orderService.getById(id),
    enabled: !!id,
  });

export const useCreateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["create-order"],
    mutationFn: (data: {
      items: { productId: string; name: string; price: number; quantity: number }[];
      address: string;
    }) => orderService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
};

export const useUpdateOrderStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["update-order-status"],
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      orderService.updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
};
