import { ENTITY_KEY } from "../_constants";
import { EntityConfig, ModelConfig } from "../_types";

export function annotateEntity(target: Function, options: EntityConfig) {
  setEntity(target.prototype, options);
}

function setEntity(target: Function, options: EntityConfig) {
  Reflect.defineMetadata(ENTITY_KEY, options.entity, target);
}
