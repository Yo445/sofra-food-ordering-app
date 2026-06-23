import type { Request, Response, NextFunction } from "express";
import { orderService } from "./order.service";
import { ApiResponse } from "../../utils/ApiResponse";

export const orderController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.create({
        userId: req.user!.userId,
        ...req.body,
      });
      res.status(201).json(ApiResponse.success(order, "Order placed"));
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await orderService.getAll(req.user!.userId, req.user!.role);
      res.json(ApiResponse.success(orders));
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.getById(req.params.id as string, req.user!.userId, req.user!.role);
      res.json(ApiResponse.success(order));
    } catch (err) {
      next(err);
    }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.updateStatus(req.params.id as string, req.body.status);
      res.json(ApiResponse.success(order, "Status updated"));
    } catch (err) {
      next(err);
    }
  },
};
