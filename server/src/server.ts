import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/db";
import { logger } from "./utils/logger";

async function main() {
  await connectDB();

  app.listen(env.port, () => {
    logger.info(`Server running on http://localhost:${env.port}`);
  });
}

main();
