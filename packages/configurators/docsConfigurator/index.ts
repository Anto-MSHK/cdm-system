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
  GET_ALL_METHOD,
  GET_ONE_METHOD,
  UPDATE_METHOD,
} from "@configurators/routesConfigurator/_constants";
import { saveConfigToFile } from "./utils/saveConfigToFile";

const MethodsType = {
  [GET_ALL_METHOD as string]: "get",
  [GET_ONE_METHOD as string]: "get",
  [UPDATE_METHOD as string]: "put",
  [CREATE_METHOD as string]: "post",
  [DELETE_METHOD as string]: "delete",
};

export function DocsConfigurator(
  routes: RouteType[],
  config: UserDocsConfig
): void {
  const paths: { [key: string]: SwaggerPath } = {};
  routes.forEach((r) => {
    let operations: { [key: string]: SwaggerMethod } = {};
    for (let operKey in r.operations as any) {
      const curFields: FieldInRoute[] = r.operations[operKey];
      let curMethod = MethodsType[operKey];

      const swaggerFields: SwaggerParam[] = curFields.map((field) => {
        return {
          name: field.name,
          type: field.type as any,
          required: field.required,
          in: field.input,
        };
      });
      if (operKey !== GET_ONE_METHOD) {
        operations[curMethod] = {
          parameters: swaggerFields,
          tags: [r.routeName],
        };
      } else
        paths[`/${r.routeName}/{id}`] = {
          get: { parameters: swaggerFields, tags: [r.routeName] },
        };
    }
    paths[`/${r.routeName}/`] = { ...operations };
  });
  saveConfigToFile({ swagger: "2.0", ...config, paths });
}
