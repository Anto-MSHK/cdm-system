import { FieldConfig, RelationshipConfig } from "@decorators/models/_types";
import { annotateHasOne } from "./relationships-service";
import Book from "src/Models/Book";

export const HasOne = (params: RelationshipConfig) => {
  return (target: Object, propertyName: string) => {
    annotateHasOne(target, propertyName, params);
  };
};
