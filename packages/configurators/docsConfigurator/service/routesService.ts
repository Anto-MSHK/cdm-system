import {
  FieldInRoute,
  RouteType,
} from "@configurators/routesConfigurator/_types";
import { SwaggerMethod, SwaggerParam, SwaggerPath } from "../_types";
import { MethodsType } from "@decorators/routes/_constants";

export function routesService(routes: RouteType[]) {
  const paths: {
    [key: string]: {
      [key: string]: { fields: FieldInRoute[]; endpoint: string; tag: string };
    };
  } = {};
  routes.forEach((r) => {
    for (const operKey in r.operations) {
      const path = `/${r.routeName}/${
        r.operations[operKey].endpoint
          ? r.operations[operKey].endpoint + "/"
          : ""
      }`;
      paths[path] = {
        [operKey]: { ...r.operations[operKey], tag: r.routeName },
        ...paths[path],
      };
    }
  });
  const swaggerPaths: { [key: string]: SwaggerPath } = {};
  for (const path in paths) {
    let operations: { [key: string]: SwaggerMethod } = {};
    for (const method in paths[path]) {
      const curFields: FieldInRoute[] = paths[path][method].fields;
      const curTag: string = paths[path][method].tag;
      const curMethod = MethodsType[method];
      const swaggerFields: SwaggerParam[] = curFields.map((field) => ({
        name: field.name,
        type: field.type as any,
        required: field.required,
        in: field.input,
      }));
      const pathParam = curFields.find((f) => f.input === "path");
      if (pathParam) {
        if (!swaggerPaths[`${path}{${pathParam.name}}`])
          swaggerPaths[`${path}{${pathParam.name}}`] = {};
        swaggerPaths[`${path}{${pathParam.name}}`][
          curMethod as keyof SwaggerPath
        ] = {
          parameters: swaggerFields,
          tags: [curTag],
        };
      } else
        operations[curMethod] = {
          parameters: swaggerFields,
          tags: [curTag],
        };
    }
    swaggerPaths[path] = { ...operations };
  }
  return swaggerPaths;
}
