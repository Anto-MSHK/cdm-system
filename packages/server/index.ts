import express, { Application, Request, Response } from "express";
import { DB } from "@configurators/databaseConfigurator/_types";

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

  config.db.sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Synced db.");
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });

  try {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(`Error occurred: ${error}`);
  }
}
