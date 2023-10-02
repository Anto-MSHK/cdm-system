import "reflect-metadata";

import { Model } from "@models/Model";
import { StartServer } from "@server/index";
import { logger } from "packages/logger";
import { DatabaseConfigurator } from "@configurators/databaseConfigurator";
import { RoutesConfigurator } from "./routesConfigurator";
import { DocsConfigurator } from "./docsConfigurator";

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
  DocsConfigurator(routes, {
    info: {
      title: "CDM-server",
      description: "Customizable data management system",
      version: "0.0.1",
    },
    basePath: "/",
    host: `localhost:${config.serverPort || 3000}`,
  });
  logger.info("DB Data configuration - completed");
  StartServer({ db, routes, port: config.serverPort || 3000 });
}
