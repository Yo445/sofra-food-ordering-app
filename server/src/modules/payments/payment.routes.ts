import { Router } from "express";
import { paymentController } from "./payment.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";

const router = Router();

router.post("/create", authenticate, authorize("customer"), paymentController.create);

export default router;
