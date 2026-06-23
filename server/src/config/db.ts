import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "../utils/logger";

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(env.mongodbUri);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}
