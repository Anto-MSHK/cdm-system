import { ValidationChain } from "express-validator";
import { inputType } from "./utils/typeValidator";
import { FieldConfig } from "@decorators/models/_types";
import { DB } from "@configurators/databaseConfigurator/_types";
import { getModels } from "./dev/handlers";
import { RequestHandler, Response } from "express";

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
  operations: OperationType;
};

export interface HandlerParams {
  curRoute: { routeName: string; operation: OperationItemType };
  db: DB;
  allRoutes: RouteType[];
}

export interface ErrorType {
  message: string;
  inDevelopment?: boolean;
}
