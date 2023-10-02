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
  method: // тип метода
  | typeof GET_ONE_METHOD
    | typeof GET_ALL_METHOD
    | typeof CREATE_METHOD
    | typeof UPDATE_METHOD
    | typeof DELETE_METHOD;
  additionalPath?: string; // дополнительная приставка к основному адресу
  // пример: основной адрес - /book/
  // дополнительная приставка - add-author
  // в итоге - /book/add-author
  param?: FieldInRoute; // параметры адресной строки
  queries?: FieldInRoute[]; // query параметры
  body?: string[]; // body параметры
  id: string;
};

export type RoutesConfigType<T = any> = MethodType<T>[];
