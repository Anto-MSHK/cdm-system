import {
  FieldInRoute,
  RouteType,
} from "@configurators/routesConfigurator/_types";
import { ModelCtor } from "sequelize-typescript";
import {
  SwaggerDefinitions,
  SwaggerParam,
  SwaggerPropertiesDefinition,
} from "../_types";
import { usefulFieldsFromSequelize } from "@configurators/databaseConfigurator/utils/usefulFieldsFromSequelize";
import { MethodsType } from "@decorators/routes/_constants";
import { swaggerFieldTypes } from "../_constants";
import translate from "packages/i18n/i18next";

export function definitionsService(
  models: {
    [key: string]: ModelCtor;
  },
  routes: RouteType[]
) {
  const swaggerDefinitions: SwaggerDefinitions = {};
  for (const model in models) {
    let curModel = models[model];
    const allField = usefulFieldsFromSequelize(
      Object.values((curModel as any).tableAttributes)
    );
    const properties: { [key: string]: SwaggerPropertiesDefinition } = {};
    const required: string[] = [];
    allField.forEach((f) => {
      properties[f.fieldName] = {
        type: swaggerFieldTypes[f.type.toLocaleLowerCase()],
        description: translate("type-ref") + f.type,
      };
      if (!f.allowNull) required.push(f.fieldName);
    });
    swaggerDefinitions[model] = {
      type: "object",
      properties,
      required,
      description: translate("def", { model }),
    };
  }
  routes.forEach((route) => {
    for (let endpoint in route.operations) {
      const curOper = route.operations[endpoint];
      const name = `${endpoint}-${route.routeName}`;
      if (curOper.fields.find((f) => f.input === "body")) {
        swaggerDefinitions[name] = {
          type: "object",
          properties: {},
          description: translate("def-dto", {
            path: curOper.path,
            model: route.routeName,
          }),
        };
        curOper.fields.forEach((f) => {
          if (f.input === "body" && f.type)
            swaggerDefinitions[name].properties[f.name] = {
              type: swaggerFieldTypes[f.type],
              description: translate("type-ref") + f.type,
            };
        });
      }
    }
  });

  return swaggerDefinitions;
}
