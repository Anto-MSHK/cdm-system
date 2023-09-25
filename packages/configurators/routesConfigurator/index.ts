import { Model } from "@models/Model";
import {
  CREATE,
  DELETE,
  DELETE_METHOD,
  GET,
  GET_METHOD,
  UPDATE,
} from "./_constants";
import { typeValidator } from "./utils/validator";
import { FieldInRoute } from "./_types";

export function RoutesConfigurator(models: Model[]): any {
  const routes: {
    routeName: string;
    operations: { [key: string]: FieldInRoute[] };
  }[] = [];
  models.forEach((model) => {
    const modelConfig = model._getConfig();
    const allFields = model._getAllFields().fields;
    const operations = [GET, CREATE, DELETE, UPDATE];
    let validators: { [key: string]: FieldInRoute[] } = {};

    for (const operation of operations) {
      validators[operation.method] = [];
      if (operation.method !== GET_METHOD && operation.method !== DELETE_METHOD)
        for (const key in allFields) {
          const field = allFields[key];
          if (key !== "id")
            validators[operation.method].push({
              name: key,
              validator: typeValidator("body", key, field.type, field.required),
              input: "body",
              ...field,
            });
        }
      const additionalQueries = operation.queries || [];
      validators[operation.method] = [
        ...validators[operation.method],
        ...additionalQueries,
      ];
      if (operation.param) validators[operation.method].push(operation.param);
    }

    routes.push({
      routeName: modelConfig.modelName?.toLowerCase() as string,
      operations: validators,
    });
  });

  return routes;
}
