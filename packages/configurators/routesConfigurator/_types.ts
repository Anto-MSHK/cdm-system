import { ValidationChain } from "express-validator";
import { inputType } from "./utils/typeValidator";
import { FieldConfig } from "@decorators/models/_types";

export type FieldInRoute = {
  name: string;
  validator: ValidationChain;
  input: keyof typeof inputType;
} & Partial<FieldConfig>;

export type OperationItemType = {
  fields: FieldInRoute[];
  endpoint: string;
  handler?: any;
  id: string;
  path?: string;
};

export type OperationType = {
  [key: string]: OperationItemType;
};

export type RouteType = {
  routeName: string;
  modelName?: string;
  operations: OperationType;
};

export interface ErrorType {
  message: string;
  inDevelopment?: boolean;
}
