import { ValidationChain } from "express-validator";
import { inputType } from "./utils/typeValidator";
import { FieldConfig } from "@decorators/models/_types";

export type FieldInRoute = {
  name: string;
  validator: ValidationChain;
  input: keyof typeof inputType;
} & Partial<FieldConfig>;

export type RouteType = {
  routeName: string;
  operations: { [key: string]: FieldInRoute[] };
};
