import "dotenv/config";
import { defineConfig } from "prisma/config";
import { config } from "./src/config/config.js";

if (!config.db_url) {
  throw new Error("Database url missing");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: config.db_url,
  },
});
