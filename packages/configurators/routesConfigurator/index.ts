import { Model } from "@models/Model";
import { OperationType, RouteType } from "./_types";
import { bodyParamsService } from "./services/bodyParamsService";
import { DELETE_METHOD, GET_ALL_METHOD, GET_ONE_METHOD } from "./_constants";
import {
  GET_ALL,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
} from "@decorators/routes/_constants";
import { getDefaultBodyFields } from "./utils/getDefaultBodyFields";
import { dev_route } from "./dev/route";
import { getPath } from "./utils/getPath";

export function RoutesConfigurator(models: Model[]): any {
  const routes: RouteType[] = [];
  models.forEach((model) => {
    const modelConfig = model._getConfig(); // конфигурация модели
    const modelParams = model._getModelParams(); // параметры модели и все её связи
    const modelEndPoints = model._getRoutes() || [
      DELETE(),
      UPDATE(),
      CREATE(),
      GET_ONE(),
      GET_ALL(),
    ]; // все endpoints модели
    let operations: OperationType = {};
    const modelName = modelConfig.modelName?.toLowerCase() as string;

    for (const endPoint of modelEndPoints) {
      operations[endPoint.method] = {
        fields: [],
        endpoint: endPoint.additionalPath || "", // дополнительный путь
        id: endPoint.id,
      };
      if (
        endPoint.method !== GET_ONE_METHOD &&
        endPoint.method !== GET_ALL_METHOD &&
        endPoint.method !== DELETE_METHOD
      ) {
        // если метод требует body параметры
        if (!endPoint.body)
          endPoint.body = getDefaultBodyFields(modelParams.fields);
        bodyParamsService(
          modelParams,
          operations[endPoint.method].fields,
          endPoint.body,
          endPoint.method
        );
      }
      // добавление query параметров (если есть)
      const additionalQueries = endPoint.queries || [];
      operations[endPoint.method].fields = [
        ...operations[endPoint.method].fields,
        ...additionalQueries,
      ];
      // добавление path параметров (если есть)
      if (endPoint.param)
        operations[endPoint.method].fields.push(endPoint.param);

      operations[endPoint.method].path = getPath(
        modelName,
        operations[endPoint.method]
      );

      operations[endPoint.method].handler = endPoint.handler;
    }

    routes.push({
      routeName: modelName,
      modelName: modelConfig.modelName as string,
      operations,
    });
  });

  routes.push(dev_route);

  return routes;
}
