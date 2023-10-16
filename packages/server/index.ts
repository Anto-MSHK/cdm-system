import express, { Application, Request, Response } from "express";
import { DB } from "@configurators/databaseConfigurator/_types";
import { logger } from "packages/logger";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import { DOCS_FILE_PATH } from "@configurators/docsConfigurator/utils/saveConfigToFile";
import { RouteType } from "@configurators/routesConfigurator/_types";
import { bindingHandlers } from "../handlers/utils/bindingHandlers";
import cors from "cors";

export interface ServerConfig {
  port: number;
  db: DB;
  routes: RouteType[];
}

export function StartServer(config: ServerConfig) {
  const app: Application = express();
  const port = config.port;
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  bindingHandlers(app, config);

  let swaggerConfig = undefined;
  try {
    if (fs.existsSync(DOCS_FILE_PATH)) {
      const fileData = fs.readFileSync(DOCS_FILE_PATH, "utf8");
      try {
        swaggerConfig = JSON.parse(fileData);
        if (swaggerConfig) {
          app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
          logger.info("Docs - Is deployed");
        } else {
          logger.warn("Docs - Not deployed");
        }
      } catch (parseError) {
        logger.warn("Docs - The documentation file is corrupted");
      }
    }
  } catch (err) {}

  config.db.sequelize
    .sync({ force: true })
    .then(() => {
      logger.info("DB launch - completed");
    })
    .catch((err) => {
      logger.error("DB launch - error");
      logger.error(err.message);
    });

  try {
    app.listen(port, () => {
      logger.info(`Server startup - performed on ${port} port`);
    });
  } catch (error) {
    logger.error("Server startup - error");
    logger.error(error);
  }
}
