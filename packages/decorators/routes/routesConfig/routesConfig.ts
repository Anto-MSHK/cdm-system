import { RoutesConfigType } from "../_types";
import { annotateRoutes } from "./routesConfig-service";

/**
 * Декоратор для настройки endpoints сущности. Если не использовать, то создадутся все возможные endpoints.
 * @param {RoutesConfigType | undefined} metadata - массив конфигураций запросов (заполняется через функции GET_ONE, GET_ALL, CREATE, UPDATE, DELETE)
 */
export function RoutesConfig<T>(metadata?: RoutesConfigType<T>) {
  return function (target: Function) {
    annotateRoutes(target, metadata);
  };
}
