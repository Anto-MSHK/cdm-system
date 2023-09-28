import { ROUTES_CONFIG_KEY } from "../_constants";
import { RoutesConfigType } from "../_types";

export function annotateRoutes(
  target: Function,
  options: RoutesConfigType | undefined
) {
  setRoutes(target.prototype, options);
}

function setRoutes(target: Function, options: RoutesConfigType | undefined) {
  Reflect.defineMetadata(ROUTES_CONFIG_KEY, options, target);
}
