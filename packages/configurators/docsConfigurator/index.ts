import {
  FieldInRoute,
  RouteType,
} from "@configurators/routesConfigurator/_types";
import {
  SwaggerMethod,
  SwaggerParam,
  SwaggerPath,
  UserDocsConfig,
} from "./_types";
import {
  CREATE_METHOD,
  DELETE_METHOD,
  GET_METHOD,
  UPDATE_METHOD,
} from "@configurators/routesConfigurator/_constants";
import { saveConfigToFile } from "./utils/saveConfigToFile";

export function DocsConfigurator(
  routes: RouteType[],
  config: UserDocsConfig
): void {
  const paths: { [key: string]: SwaggerPath } = {};
  routes.forEach((r) => {
    let operations: { [key: string]: SwaggerMethod } = {};
    for (let operKey in r.operations as any) {
      const curFields: FieldInRoute[] = r.operations[operKey];
      let curMethod: "get" | "post" | "put" | "delete" = "get";
      if (operKey === GET_METHOD) curMethod = "get";
      else if (operKey === UPDATE_METHOD) curMethod = "put";
      else if (operKey === CREATE_METHOD) curMethod = "post";
      else if (operKey === DELETE_METHOD) curMethod = "delete";
      const swaggerFields: SwaggerParam[] = curFields.map((field) => {
        return {
          name: field.name,
          type: field.type as any,
          required: field.required,
          in: field.input,
        };
      });
      operations[curMethod] = { parameters: swaggerFields };
    }
    paths[`/${r.routeName}/`] = { ...operations };
  });
  saveConfigToFile({ swagger: "2.0", ...config, paths });
}
