"use client";

import { useMutation } from "@tanstack/react-query";
import { paymentService } from "@/services/payment.service";

export const useCreatePayment = () =>
  useMutation({
    mutationKey: ["create-payment"],
    mutationFn: (data: { orderId: string; method: string }) =>
      paymentService.process(data),
  });
