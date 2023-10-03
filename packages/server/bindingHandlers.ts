import { Application, Request, Response } from "express";
import { contextFor } from "../configurators/routesConfigurator/utils/contextFor";
import { ServerConfig } from "./index";
import { getPath } from "@configurators/routesConfigurator/utils/getPath";
import { MethodsType } from "@decorators/routes/_constants";

export function bindingHandlers(app: Application, config: ServerConfig) {
  config.routes.forEach((route) => {
    for (let oper in route.operations) {
      const curOper = route.operations[oper];
      app[MethodsType[oper] as keyof Application](
        getPath(route.routeName, curOper),
        contextFor(curOper.handler as any, config, curOper.id)
      );
    }
  });
}
