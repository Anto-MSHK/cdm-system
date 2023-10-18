import { DB } from "@configurators/databaseConfigurator/_types";
import {
  OperationItemType,
  RouteType,
} from "@configurators/routesConfigurator/_types";
import { Request, Response } from "express";

interface HandlerParams {
  curRoute: { routeName: string; operation: OperationItemType };
  curModel?: { modelName: string; modelLabel?: string };
  db: DB;
  allRoutes: RouteType[];
}

export type HandlerType<O = undefined> = (
  context: HandlerParams
) => (req: Request, res: Response) => Promise<Response>;
