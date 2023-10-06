import { Request, Response } from "express";
import { ErrorType, HandlerParams } from "./_types";
import { getPath } from "./utils/getPath";

export const GET_ONE_METHOD = "operation:get_one";
export const GET_ALL_METHOD = "operation:get_all";
export const CREATE_METHOD = "operation:create";
export const UPDATE_METHOD = "operation:update";
export const DELETE_METHOD = "operation:delete";

export const DEV_ROUTE_NAME = "dev";
/**
 * Обработчик по умолчанию
 */
export const defaultHandler =
  (context: HandlerParams) => (req: Request, res: Response) => {
    return res.send({
      message: `${getPath(
        context.curRoute.routeName,
        context.curRoute.operation
      )} - default handler (endpoint in development)`,
      inDevelopment: true,
    } as ErrorType);
  };
