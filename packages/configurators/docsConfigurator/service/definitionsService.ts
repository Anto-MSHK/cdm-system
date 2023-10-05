import {
  FieldInRoute,
  RouteType,
} from "@configurators/routesConfigurator/_types";
import { ModelCtor } from "sequelize-typescript";
import { SwaggerDefinitions, SwaggerPropertiesDefinition } from "../_types";
import { fieldParametersForSequelize } from "@configurators/databaseConfigurator/utils/fieldParametersForSequelize";
import { MethodsType } from "@decorators/routes/_constants";

export function definitionsService(
  models: {
    [key: string]: ModelCtor;
  },
  routes: RouteType[]
) {
  const swaggerDefinitions: SwaggerDefinitions = {};
  for (const model in models) {
    let curModel = models[model];
    const allField = fieldParametersForSequelize(
      Object.values((curModel as any).tableAttributes)
    );
    const properties: { [key: string]: SwaggerPropertiesDefinition } = {};
    const required: string[] = [];
    allField.forEach((f) => {
      properties[f.fieldName] = {
        type: f.type.toLocaleLowerCase() as any,
      };
      if (!f.allowNull) required.push(f.fieldName);
    });
    swaggerDefinitions[model] = { type: "object", properties, required };
  }
  routes.forEach((route) => {
    for (let endpoint in route.operations) {
      const curOper = route.operations[endpoint];
      const name = `${MethodsType[endpoint]}_${curOper.path}_DTO`;
      if (curOper.fields.find((f) => f.input === "body")) {
        swaggerDefinitions[name] = {
          type: "object",
          properties: {},
        };
        curOper.fields.forEach((f) => {
          if (f.input === "body")
            swaggerDefinitions[name].properties[f.name] = {
              type: f.type as any,
            };
        });
      }
    }
  });

  return swaggerDefinitions;
}
