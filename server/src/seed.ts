import bcrypt from "bcryptjs";
import { connectDB } from "./config/db";
import { User } from "./modules/auth/user.model";
import { logger } from "./utils/logger";

async function seed() {
  await connectDB();

  const existing = await User.findOne({ email: "admin@sofra.com" });
  if (existing) {
    logger.info("Admin user already exists");
    process.exit(0);
  }

  const hashed = await bcrypt.hash("123Abc@d", 10);
  await User.create({
    name: "Admin",
    email: "admin@sofra.com",
    password: hashed,
    role: "admin",
  });

  logger.info("Admin user created: admin@sofra.com / 123Abc@d");
  process.exit(0);
}

seed();
