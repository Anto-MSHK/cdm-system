import { FieldConfig, HasOneConfig } from "@decorators/models/_types";
import { annotateOnlyOneAt } from "./relationships-service";
import Book from "src/Models/Book";

export const OnlyOneAt = (params: HasOneConfig) => {
  return (target: Object, propertyName: string) => {
    annotateOnlyOneAt(target, propertyName, params);
  };
};
