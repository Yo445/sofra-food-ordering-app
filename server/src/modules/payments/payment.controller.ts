import type { Request, Response, NextFunction } from "express";
import { paymentService } from "./payment.service";
import { ApiResponse } from "../../utils/ApiResponse";

export const paymentController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payment = await paymentService.create(req.body);
      res.status(201).json(ApiResponse.success(payment, "Payment processed"));
    } catch (err) {
      next(err);
    }
  },
};
