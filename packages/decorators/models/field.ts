import { annotateField } from "../field-service";

export interface FieldConfig {
  type?: string;
}

export function Field(params: FieldConfig) {
  return function (target: Object, propertyName: string) {
    annotateField(target, propertyName, params);
  };
}
