import {
  FieldInRoute,
  OperationType,
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
import { MethodType } from "@decorators/routes/_types";

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
  const paths: {
    [key: string]: {
      [key: string]: { fields: FieldInRoute[]; endpoint: string; tag: string };
    };
  } = {};
  routes.forEach((r) => {
    for (let operKey in r.operations) {
      const path = `/${r.routeName}/${r.operations[operKey].endpoint}`;
      paths[path] = {
        [operKey]: { ...r.operations[operKey], tag: r.routeName },
        ...paths[path],
      };
    }
  });
  const swaggerPaths: { [key: string]: SwaggerPath } = {};
  for (let path in paths) {
    let operations: { [key: string]: SwaggerMethod } = {};
    for (let method in paths[path]) {
      const curFields: FieldInRoute[] = paths[path][method].fields;
      const curTag: string = paths[path][method].tag;
      let curMethod = MethodsType[method];
      const swaggerFields: SwaggerParam[] = curFields.map((field) => {
        return {
          name: field.name,
          type: field.type as any,
          required: field.required,
          in: field.input,
        };
      });
      if (method !== GET_ONE_METHOD) {
        operations[curMethod] = {
          parameters: swaggerFields,
          tags: [curTag],
        };
      } else
        swaggerPaths[`${path}{id}`] = {
          get: { parameters: swaggerFields, tags: [curTag] },
        };
    }
    swaggerPaths[path] = { ...operations };
  }
  saveConfigToFile({ swagger: "2.0", paths: swaggerPaths, ...config });
}
