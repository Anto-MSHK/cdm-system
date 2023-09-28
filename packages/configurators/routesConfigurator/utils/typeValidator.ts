import { FieldType } from "@decorators/models/_types";
import { query, body, param, ValidationChain } from "express-validator";

export const inputType = {
  query,
  body,
  path: param,
};

const typeValid: {
  [key: string]: keyof ValidationChain;
} = {
  [FieldType.NUMBER]: "isNumeric",
  [FieldType.STRING]: "isString",
  [FieldType.BOOLEAN]: "isBoolean",
  [FieldType.UUID]: "isUUID",
};

/**
 * Валидация параметра через библиотеку express-validator
 * @param {string} input - тип передачи параметра в запросе (path, query, body)
 * @param {string} name - имя параметра (должно совпадать с именем поля в модели)
 * @param {FieldType} type - тип параметра
 * @param {boolean} required - обязателен ли параметр
 */
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
