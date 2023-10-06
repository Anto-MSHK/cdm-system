import {
  FieldInRoute,
  RouteType,
} from "@configurators/routesConfigurator/_types";
import { SwaggerMethod, SwaggerParam, SwaggerPath } from "../_types";
import { MethodsType } from "@decorators/routes/_constants";
import { getResponseType } from "../utils/getResponseType";
import { swaggerDescWithMethod, swaggerFieldTypes } from "../_constants";
import translate from "packages/i18next";
import { DEV_ROUTE_NAME } from "@configurators/routesConfigurator/_constants";

export function routesService(routes: RouteType[]) {
  const paths: {
    [key: string]: {
      [key: string]: {
        fields: FieldInRoute[];
        endpoint: string;
        tag: string;
        path: string;
      };
    };
  } = {};
  routes.forEach((r) => {
    if (r.routeName !== DEV_ROUTE_NAME)
      for (const operKey in r.operations) {
        const path = `/${r.routeName}/${
          r.operations[operKey].endpoint
            ? r.operations[operKey].endpoint + "/"
            : ""
        }`;
        paths[path] = {
          [operKey]: { ...r.operations[operKey], tag: r.routeName },
          ...paths[path],
        } as any;
      }
  });
  const swaggerPaths: { [key: string]: SwaggerPath } = {};
  for (const path in paths) {
    let operations: { [key: string]: SwaggerMethod } = {};
    for (const method in paths[path]) {
      const curFields: FieldInRoute[] = paths[path][method].fields;
      const curTag: string = paths[path][method].tag;
      const curMethod = MethodsType[method];
      const swaggerFields: SwaggerParam[] = curFields
        .map((field) => {
          if (field.input === "path" || field.input === "query")
            return {
              name: field.name,
              type: swaggerFieldTypes[field.type as string],
              description: translate("type-ref") + field.type,
              required: field.required,
              in: field.input,
            };
          else return undefined;
        })
        .filter((f) => f) as SwaggerParam[];

      if (curFields.find((f) => f.input === "body"))
        swaggerFields.push({
          in: "body",
          name: "object",
          type: "object",
          schema: {
            $ref: `#/definitions/${method}-${curTag}`,
          },
        });
      const pathParam = curFields.find((f) => f.input === "path");
      const swaggerMethod = {
        parameters: swaggerFields,
        responses: getResponseType(curMethod, curTag),
        tags: [curTag],
        summary: translate(swaggerDescWithMethod[method], {
          model: curTag,
        }),
        operationId: method,
      };
      if (pathParam) {
        const pathWithParam = `${path}{${pathParam.name}}`;
        if (!swaggerPaths[pathWithParam]) swaggerPaths[pathWithParam] = {};
        swaggerPaths[pathWithParam][curMethod as keyof SwaggerPath] =
          swaggerMethod;
      } else operations[curMethod] = swaggerMethod;
    }
    swaggerPaths[path] = { ...operations };
  }
  return swaggerPaths;
}
