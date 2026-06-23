import type { Request, Response, NextFunction } from "express";
import { productService } from "./product.service";
import { ApiResponse } from "../../utils/ApiResponse";

export const productController = {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getAll();
      res.json(ApiResponse.success(products));
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.getById(req.params.id as string);
      res.json(ApiResponse.success(product));
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = { ...req.body };
      if (req.file) body.image = `/uploads/${req.file.filename}`;
      const product = await productService.create(body);
      res.status(201).json(ApiResponse.success(product, "Product created"));
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const body = { ...req.body };
      if (req.file) body.image = `/uploads/${req.file.filename}`;
      const product = await productService.update(req.params.id as string, body);
      res.json(ApiResponse.success(product, "Product updated"));
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await productService.remove(req.params.id as string);
      res.json(ApiResponse.success(null, "Product deleted"));
    } catch (err) {
      next(err);
    }
  },
};
