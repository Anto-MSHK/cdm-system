import { EntityConfig } from "@decorators/_types";
import { annotateEntity } from "@decorators/models/entity-service";

export function Entity(metadata: EntityConfig) {
  return function (target: Function) {
    annotateEntity(target, metadata);
  };
}
