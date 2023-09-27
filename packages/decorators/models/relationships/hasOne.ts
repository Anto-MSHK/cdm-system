import { FieldConfig, HasOneConfig } from "@decorators/models/_types";
import { annotateHasOne } from "./relationships-service";
import Book from "src/Models/Book";

export const HasOne = (params: HasOneConfig) => {
  return (target: Object, propertyName: string) => {
    annotateHasOne (target, propertyName, params);
  };
};
