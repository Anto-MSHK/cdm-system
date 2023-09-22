import { EntityConfig } from "@decorators/models/_types";
import { annotateEntity } from "@decorators/models/entity/entity-service";

export function Entity(metadata: EntityConfig) {
  return function (target: Function) {
    annotateEntity(target, metadata);
  };
}
