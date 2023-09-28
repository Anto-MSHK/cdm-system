import { FieldInRoute } from "@configurators/routesConfigurator/_types";
import { GET_ONE, GET_ALL, UPDATE, CREATE, DELETE } from "./_constants";
import {
  GET_ALL_METHOD,
  GET_ONE_METHOD,
  CREATE_METHOD,
  UPDATE_METHOD,
  DELETE_METHOD,
} from "./../../configurators/routesConfigurator/_constants";

export type MethodType<T = { [key: string]: any }> = {
  method:
    | typeof GET_ONE_METHOD
    | typeof GET_ALL_METHOD
    | typeof CREATE_METHOD
    | typeof UPDATE_METHOD
    | typeof DELETE_METHOD;
  param?: FieldInRoute;
  queries?: FieldInRoute[];
  body?: string[];
};

// export type ModelParams<T> =

export type RoutesConfigType<T = any> = MethodType<T>[];
