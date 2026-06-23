import { Router } from "express";
import { orderController } from "./order.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";
import { validate } from "../../middleware/validate.middleware";
import { createOrderSchema, updateStatusSchema } from "./order.validation";

const router = Router();

router.post("/", authenticate, authorize("customer"), validate(createOrderSchema), orderController.create);
router.get("/", authenticate, orderController.getAll);
router.get("/:id", authenticate, orderController.getById);
router.patch("/:id/status", authenticate, authorize("admin"), validate(updateStatusSchema), orderController.updateStatus);

export default router;
