import "reflect-metadata";

import { Model } from "@models/Model";
import { StartServer } from "@server/index";
import { logger } from "packages/logger";
import { DatabaseConfigurator } from "@configurators/databaseConfigurator";
import { RoutesConfigurator } from "./routesConfigurator";
import { DocsConfigurator } from "./docsConfigurator";
import translate from "packages/i18n/i18next";

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
  DocsConfigurator(routes, db.models, {
    info: {
      title: "CDM-server",
      description: translate("swagger-desc"),
      version: "0.4.0",
    },
    basePath: "/",
    host: `localhost:${config.serverPort || 3000}`,
  });
  logger.info("DB Data configuration - completed");
  StartServer({ db, routes, port: config.serverPort || 3000 });
}
