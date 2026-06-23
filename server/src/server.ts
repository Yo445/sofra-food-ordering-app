import { exec } from "child_process";
import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/db";
import { logger } from "./utils/logger";

async function main() {
  await connectDB();

  app.listen(env.port, () => {
    const url = `http://localhost:${env.port}`;
    const docsUrl = `${url}/api-docs`;
    logger.info(`Server running on ${url}`);
    logger.info(`Swagger docs at ${docsUrl}`);

    const cmd =
      process.platform === "darwin"
        ? `open ${docsUrl}`
        : process.platform === "win32"
          ? `start "" "${docsUrl}"`
          : `xdg-open ${docsUrl}`;
    exec(cmd);
  });
}

main();
