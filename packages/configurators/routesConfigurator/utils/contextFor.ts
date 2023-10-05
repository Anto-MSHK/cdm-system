import { AppConfiguratorConfig } from "@configurators/index";
import { Request, RequestHandler, Response } from "express";
import { ErrorType, HandlerParams } from "../_types";
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
  async (req: Request, res: Response) => {
    let curEndpoint = undefined;
    let curRoute = undefined;
    config.routes.forEach((route) => {
      const operations = Object.keys(route.operations).map((key) => {
        return route.operations[key];
      });
      const curOper = operations.find((oper) => oper.id === operId);
      if (curOper) {
        curEndpoint = curOper;
        curRoute = route.routeName;
      }
    });
    if (curEndpoint && curRoute)
      return handler({
        db: config.db,
        curRoute: { routeName: curRoute, operation: curEndpoint },
        allRoutes: config.routes,
      })(req as any, res as any);
    else
      return res.status(500).send({
        message: "Unknown error",
      } as ErrorType);
  };
