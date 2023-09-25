import { ValidationChain } from "express-validator";
import {
  GET_METHOD,
  CREATE_METHOD,
  UPDATE_METHOD,
  DELETE_METHOD,
} from "./_constants";
import { inputType } from "./utils/validator";

export type FieldInRoute = {
  name: string;
  validator: ValidationChain;
  input: keyof typeof inputType;
};

export type MethodType = {
  method:
    | typeof GET_METHOD
    | typeof CREATE_METHOD
    | typeof UPDATE_METHOD
    | typeof DELETE_METHOD;
  param?: FieldInRoute;
  queries?: FieldInRoute[];
};