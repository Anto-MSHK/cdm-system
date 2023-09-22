import { FieldConfig, HasOneConfig } from "@decorators/models/_types";
import { annotateManyAt } from "./relationships-service";

export const ManyAt = (params: HasOneConfig) => {
  return (target: Object, propertyName: string) => {
    annotateManyAt(target, propertyName, params);
  };
};
