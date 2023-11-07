import {
  CREATE_METHOD,
  DELETE_METHOD,
  GET_ALL_METHOD,
  GET_ONE_METHOD,
  UPDATE_METHOD,
  GET_RELATION_METHOD,
} from "@configurators/routesConfigurator/_constants";
import { typeValidator } from "@configurators/routesConfigurator/utils/typeValidator";
import { MethodType } from "./_types";
import { FieldType } from "@decorators/models/_types";
import { v4 as uuidv4 } from "uuid";
import { getAllHandler } from "packages/handlers/getAllHandler";
import { getOneHandler } from "packages/handlers/getOneHandler";
import { createHandler } from "packages/handlers/createHandler";
import { updateHandler } from "packages/handlers/updateHandler";
import { deleteHandler } from "packages/handlers/deleteHandler";
import { getRelationsHandler } from "packages/handlers/getRelationsHandler";
// ключ для сохранения конфигурации роутов
export const ROUTES_CONFIG_KEY = "models:routesConfig";

export const MethodsType = {
  [GET_ALL_METHOD as string]: "get",
  [GET_RELATION_METHOD as string]: "get",
  [GET_ONE_METHOD as string]: "get",
  [UPDATE_METHOD as string]: "put",
  [CREATE_METHOD as string]: "post",
  [DELETE_METHOD as string]: "delete",
};

/**
 * Функция конфигурации запроса на получение всех записей сущности
 */
export function GET_ALL(): MethodType<any> {
  return { method: GET_ALL_METHOD, id: uuidv4(), handler: getAllHandler };
}
/**
 * Функция конфигурации запроса на получение одной записи сущности (по id)
 */
export function GET_ONE(): MethodType<any> {
  return {
    id: uuidv4(),
    method: GET_ONE_METHOD,
    param: {
      name: "id",
      type: FieldType.UUID,
      validator: typeValidator("path", "id", { type: FieldType.UUID }),
      input: "path",
      required: true,
    },
    handler: getOneHandler,
  };
}
/**
 * Функция конфигурации запроса на получение записей связанной сущности (по имени)
 */
export function GET_RELATION(): MethodType<any> {
  return {
    id: uuidv4(),
    method: GET_RELATION_METHOD,
    param: {
      name: "name",
      type: FieldType.STRING,
      validator: typeValidator("path", "name", { type: FieldType.STRING }),
      input: "path",
      required: true,
    },
    handler: getRelationsHandler,
    additionalPath: "relations",
  };
}
/**
 * Функция конфигурации запроса на создание записи сущности
 * @param {string[] | undefined} body - параметры которые нужно передавать в body запроса (по умолчанию - все кроме "id")
 */
export function CREATE<T>(body?: (keyof T)[]): MethodType<T> {
  return {
    id: uuidv4(),
    method: CREATE_METHOD,
    body: body as string[],
    handler: createHandler,
  };
}
/**
 * Функция конфигурации запроса на изменение записи сущности (по id)
 * @param {string[] | undefined} body - параметры которые нужно передавать в body запроса (по умолчанию - все кроме "id")
 */
export function UPDATE<T>(body?: (keyof T)[]): MethodType<T> {
  return {
    id: uuidv4(),
    method: UPDATE_METHOD,
    param: {
      name: "id",
      type: FieldType.UUID,
      validator: typeValidator("path", "id", {
        type: FieldType.UUID,
        required: true,
      }),
      input: "path",
      required: true,
    },
    body: body as string[],
    handler: updateHandler,
  };
}
/**
 * Функция конфигурации запроса на удаление записи сущности (по id)
 */
export function DELETE(): MethodType<any> {
  return {
    id: uuidv4(),
    method: DELETE_METHOD,
    param: {
      name: "id",
      type: FieldType.UUID,
      validator: typeValidator("path", "id", {
        type: FieldType.UUID,
        required: true,
      }),
      input: "path",
      required: true,
    },
    handler: deleteHandler,
  };
}
