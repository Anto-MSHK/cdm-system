import { FieldConfig, HasOneConfig } from "@decorators/models/_types";
import { annotateHasMany } from "./relationships-service";

export const HasMany = (params: HasOneConfig) => {
  return (target: Object, propertyName: string) => {
    annotateHasMany(target, propertyName, params);
  };
};
