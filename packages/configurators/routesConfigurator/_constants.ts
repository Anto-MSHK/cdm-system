import { FieldType } from "@decorators/models/_types";
import { typeValidator } from "./utils/validator";
import { MethodType } from "./_types";

export const GET_METHOD = "operation:get";
export const CREATE_METHOD = "operation:create";
export const UPDATE_METHOD = "operation:update";
export const DELETE_METHOD = "operation:delete";

export const GET: MethodType = {
  method: GET_METHOD,
  param: {
    name: "id",
    validator: typeValidator("param", "id", FieldType.UUID),
    input: "param",
  },
};
export const CREATE: MethodType = {
  method: CREATE_METHOD,
};
export const UPDATE: MethodType = {
  method: UPDATE_METHOD,
  param: {
    name: "id",
    validator: typeValidator("param", "id", FieldType.UUID, true),
    input: "param",
  },
};
export const DELETE: MethodType = {
  method: DELETE_METHOD,
  param: {
    name: "id",
    validator: typeValidator("param", "id", FieldType.UUID, true),
    input: "param",
  },
};
