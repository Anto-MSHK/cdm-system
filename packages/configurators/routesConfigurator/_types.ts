import { ValidationChain } from "express-validator";
import { inputType } from "./utils/typeValidator";
import { FieldConfig } from "@decorators/models/_types";

export type FieldInRoute = {
  name: string;
  validator: ValidationChain;
  input: keyof typeof inputType;
} & Partial<FieldConfig>;

export type OperationType = {
  [key: string]: { fields: FieldInRoute[]; endpoint: string };
};

export type RouteType = {
  routeName: string;
  operations: OperationType;
};
