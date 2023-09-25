import { FieldType } from "@decorators/models/_types";
import { query, body, param, ValidationChain } from "express-validator";

export const inputType = {
  query,
  body,
  param,
};

const typeValid: {
  [key: string]: keyof ValidationChain;
} = {
  [FieldType.NUMBER]: "isNumeric",
  [FieldType.STRING]: "isString",
  [FieldType.BOOLEAN]: "isBoolean",
  [FieldType.UUID]: "isUUID",
};

export const typeValidator = (
  input: keyof typeof inputType,
  name: string,
  type: FieldType,
  required?: boolean
) => {
  const validObj = inputType[input](name)[typeValid[type] as "isString"]();
  if (required) validObj.notEmpty();
  return validObj;
};
