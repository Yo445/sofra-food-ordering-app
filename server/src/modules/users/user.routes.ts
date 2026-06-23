import { Router } from "express";
import { userController } from "./user.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.get("/profile", authenticate, userController.getProfile);

export default router;
