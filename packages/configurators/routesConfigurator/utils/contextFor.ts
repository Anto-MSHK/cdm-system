import { AppConfiguratorConfig } from "@configurators/index";
import { Request, RequestHandler, Response } from "express";
import { HandlerParams } from "../_types";
import { ServerConfig } from "../../../server/index";
import { logger } from "packages/logger";

export const contextFor =
  (
    handler: (
      context: HandlerParams
    ) => (res: Response, req: Request) => RequestHandler,
    config: ServerConfig,
    operId: string
  ) =>
  async (res: Response, req: Request) => {
    let curEndpoint = undefined;
    let curRoute = undefined;
    config.routes.find((route) => {
      const operations = Object.keys(route.operations).map((key) => {
        return route.operations[key];
      });
      curEndpoint = operations.find((oper) => oper.id === operId);
      curRoute = route.routeName;
    });
    if (curEndpoint && curRoute)
      return handler({
        db: config.db,
        route: { routeName: curRoute, operation: curEndpoint },
      })(res, req);
    else
      return res.send({
        message: "It is impossible to match the endpoint and the handler",
      });
  };
