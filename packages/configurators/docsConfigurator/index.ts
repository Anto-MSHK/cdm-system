import { RouteType } from "@configurators/routesConfigurator/_types";
import { UserDocsConfig } from "./_types";

import { saveConfigToFile } from "./utils/saveConfigToFile";
import { MethodsType } from "@decorators/routes/_constants";
import { routesService } from "./service/routesService";
import { definitionsService } from "./service/definitionsService";
import { ModelCtor } from "sequelize-typescript";

export function DocsConfigurator(
  routes: RouteType[],
  models: { [key: string]: ModelCtor },
  config: UserDocsConfig
): void {
  const swaggerPaths = routesService(routes);
  const swaggerDefinitions = definitionsService(models, routes);
  saveConfigToFile({
    swagger: "2.0",
    paths: swaggerPaths,
    definitions: swaggerDefinitions,
    ...config,
  });
}
