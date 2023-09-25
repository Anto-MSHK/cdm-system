import "reflect-metadata";

import { Model } from "@models/Model";
import { DatabaseConfigurator } from "@configurators/databaseConfigurator";
import { StartServer } from "@server/index";
import { logger } from "packages/logger";
import { RoutesConfigurator } from "./routesConfigurator";

export interface AppConfiguratorConfig {
  serverPort: number;
  database: {
    dialect: "postgres";
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
}

export async function AppConfigurator(
  models: Model[],
  config: AppConfiguratorConfig
) {
  const db = DatabaseConfigurator(models, config["database"]);
  const routes = RoutesConfigurator(models);
  logger.info("DB Data configuration - completed");
  StartServer({ db, port: config.serverPort || 3000 });
}
