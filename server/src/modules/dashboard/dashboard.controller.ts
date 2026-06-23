import type { Request, Response, NextFunction } from "express";
import { dashboardService } from "./dashboard.service";
import { ApiResponse } from "../../utils/ApiResponse";

export const dashboardController = {
  async getStats(_req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await dashboardService.getStats();
      res.json(ApiResponse.success(stats));
    } catch (err) {
      next(err);
    }
  },
};
