import {
  CREATE_METHOD,
  DELETE_METHOD,
  GET_ALL_METHOD,
  GET_ONE_METHOD as GET_ONE_METHOD,
  UPDATE_METHOD,
} from "@configurators/routesConfigurator/_constants";
import { typeValidator } from "@configurators/routesConfigurator/utils/typeValidator";
import { MethodType } from "./_types";
import { FieldType } from "@decorators/models/_types";

// ключ для сохранения конфигурации роутов
export const ROUTES_CONFIG_KEY = "models:routesConfig";

/**
 * Функция конфигурации запроса на получение всех записей сущности
 */
export function GET_ALL(): MethodType<any> {
  return { method: GET_ALL_METHOD };
}
/**
 * Функция конфигурации запроса на получение одной записи сущности (по id)
 */
export function GET_ONE(): MethodType<any> {
  return {
    method: GET_ONE_METHOD,
    param: {
      name: "id",
      validator: typeValidator("path", "id", FieldType.UUID),
      input: "path",
    },
  };
}
/**
 * Функция конфигурации запроса на создание записи сущности
 * @param {string[] | undefined} body - параметры которые нужно передавать в body запроса (по умолчанию - все кроме "id")
 */
export function CREATE<T>(body?: (keyof T)[]): MethodType<T> {
  return {
    method: CREATE_METHOD,
    body: body as string[],
  };
}
/**
 * Функция конфигурации запроса на изменение записи сущности (по id)
 * @param {string[] | undefined} body - параметры которые нужно передавать в body запроса (по умолчанию - все кроме "id")
 */
export function UPDATE<T>(body?: (keyof T)[]): MethodType<T> {
  return {
    method: UPDATE_METHOD,
    param: {
      name: "id",
      validator: typeValidator("path", "id", FieldType.UUID, true),
      input: "path",
    },
    body: body as string[],
  };
}
/**
 * Функция конфигурации запроса на удаление записи сущности (по id)
 */
export function DELETE(): MethodType<any> {
  return {
    method: DELETE_METHOD,
    param: {
      name: "id",
      validator: typeValidator("path", "id", FieldType.UUID, true),
      input: "path",
    },
  };
}
