import { Request, Response } from "express";
import { HandlerParams } from "./_types";
import { getPath } from "./utils/getPath";

export const GET_ONE_METHOD = "operation:get_one";
export const GET_ALL_METHOD = "operation:get_all";
export const CREATE_METHOD = "operation:create";
export const UPDATE_METHOD = "operation:update";
export const DELETE_METHOD = "operation:delete";

export const defaultHandler =
  (context: HandlerParams) => (req: Request, res: Response) => {
    return res.send({
      message: `${getPath(
        context.route.routeName,
        context.route.operation
      )} - It is impossible to match the endpoint and the handler`,
    });
  };
