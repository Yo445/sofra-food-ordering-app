import { Router } from "express";
import { productController } from "./product.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";
import { validate } from "../../middleware/validate.middleware";
import { upload } from "../../config/upload";
import { createProductSchema, updateProductSchema } from "./product.validation";

const router = Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post("/", authenticate, authorize("admin"), upload.single("image"), validate(createProductSchema), productController.create);
router.put("/:id", authenticate, authorize("admin"), upload.single("image"), validate(updateProductSchema), productController.update);
router.delete("/:id", authenticate, authorize("admin"), productController.remove);

export default router;
