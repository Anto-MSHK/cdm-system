import { FieldConfig } from "@decorators/_types";
import { annotateField } from "./field-service";

export function Field(params: FieldConfig) {
  return function (target: Object, propertyName: string) {
    annotateField(target, propertyName, params);
  };
}
