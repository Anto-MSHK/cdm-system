import {
  CREATE_METHOD,
  DELETE_METHOD,
  GET_ALL_METHOD,
  GET_ONE_METHOD,
  UPDATE_METHOD,
} from "@configurators/routesConfigurator/_constants";
import { SwaggerParam } from "./_types";

export const swaggerFieldTypes: { [key: string]: SwaggerParam["type"] } = {
  uuid: "string",
  string: "string",
  number: "number",
  date: "string",
};
export const swaggerDescWithMethod: { [key: string]: any } = {
  [GET_ALL_METHOD as string]: "get-all",
  [GET_ONE_METHOD as string]: "get-one",
  [CREATE_METHOD as string]: "post",
  [UPDATE_METHOD as string]: "put",
  [DELETE_METHOD as string]: "delete",
};
