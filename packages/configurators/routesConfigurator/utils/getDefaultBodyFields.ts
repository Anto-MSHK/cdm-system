import { FieldConfig } from "@decorators/models/_types";

/**
 * Берёт body параметры по уполчанию (все кроме "id" и полей-связей).
 * @param {any} modelFields - поля сущности
 */
export function getDefaultBodyFields(modelFields: {
  [key: string]: FieldConfig;
}) {
  const bodyParams = Object.keys(modelFields).filter((key) => key !== "id");
  return bodyParams;
}
