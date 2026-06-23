import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { corsOptions } from "./config/cors";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/user.routes";
import productRoutes from "./modules/products/product.routes";
import orderRoutes from "./modules/orders/order.routes";
import paymentRoutes from "./modules/payments/payment.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorHandler);

export default app;
