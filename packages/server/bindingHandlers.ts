import { Application, Request, Response } from "express";
import { contextFor } from "../configurators/routesConfigurator/utils/contextFor";
import { ServerConfig } from "./index";
import { getPath } from "@configurators/routesConfigurator/utils/getPath";
import { MethodsType } from "@decorators/routes/_constants";
import express from "express";
import { body, validationResult, ValidationChain } from "express-validator";

const validate = (validations: ValidationChain[]) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if ((result as any).errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

export function bindingHandlers(app: Application, config: ServerConfig) {
  config.routes.forEach((route) => {
    for (let oper in route.operations) {
      const curOper = route.operations[oper];
      app[MethodsType[oper] as keyof Application](
        getPath(route.routeName, curOper),
        validate(curOper.fields.map((f) => f.validator)),
        contextFor(curOper.handler as any, config, curOper.id)
      );
    }
  });
}
