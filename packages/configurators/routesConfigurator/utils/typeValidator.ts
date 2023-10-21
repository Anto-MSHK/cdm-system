import { FieldConfig, FieldType, RegexType } from "@decorators/models/_types";
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
  [FieldType.DATE]: "isDate",
  [FieldType.UUID]: "isUUID",
};

/**
 * Валидация параметра через библиотеку express-validator
 * @param {string} input - тип передачи параметра в запросе (path, query, body)
 * @param {string} name - имя параметра (должно совпадать с именем поля в модели)
 * @param {FieldConfig} field - тип параметра
 */
export const typeValidator = (
  input: keyof typeof inputType,
  name: string,
  field: FieldConfig
) => {
  const validObj = inputType[input](name)
    [typeValid[field.type] as "isString"]()
    .withMessage(typeValid[field.type]);
  if (field?.required) validObj.notEmpty();
  if (field?.regex) {
    if (field.regex.name !== "custom")
      validObj[field.regex.name as "isString"]();
    else if (field.regex.regex) validObj.matches(field.regex.regex);
  }
  if (field?.min || field?.max) {
    validObj.isLength({ min: field.min, max: field.max });
  }

  if (field.enum) {
    validObj.isIn(field.enum);
  }

  return validObj;
};
