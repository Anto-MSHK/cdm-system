import { FieldConfig, RelationshipConfig } from "@decorators/models/_types";
import { annotateHasMany } from "./relationships-service";

export const HasMany = (params: RelationshipConfig) => {
  return (target: Object, propertyName: string) => {
    annotateHasMany(target, propertyName, params);
  };
};
