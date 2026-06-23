import type { Request, Response, NextFunction } from "express";
import { userService } from "./user.service";
import { ApiResponse } from "../../utils/ApiResponse";

export const userController = {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await userService.getProfile(req.user!.userId);
      res.json(ApiResponse.success(profile));
    } catch (err) {
      next(err);
    }
  },
};
