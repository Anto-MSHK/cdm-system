import express, { Application, Request, Response } from "express";
import { DB } from "@configurators/databaseConfigurator/_types";
import { logger } from "packages/logger";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import swaggerConfig from "./swagger.json";
interface ServerConfig {
  port: number;
  db: DB;
}

export function StartServer(config: ServerConfig) {
  const app: Application = express();
  const port = config.port;
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: `Welcome to API!`,
    });
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

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
