import {
  SequelizeTableParams,
  fieldParametersForSequelize,
} from "@configurators/databaseConfigurator/utils/fieldParametersForSequelize";
import {
  ErrorType,
  HandlerParams,
} from "@configurators/routesConfigurator/_types";
import express, { Express, Request, Response } from "express";

export const getModels =
  (context: HandlerParams) => (req: Request, res: Response) => {
    const models = Object.keys(context.db.models).map((key) => {
      return context.db.models[key];
    });
    return res.send(
      models.map((m) => ({
        modelName: m.name,
        fields: (m as any).tableAttributes,
      }))
    );
  };

export const getModelByName =
  (context: HandlerParams) => (req: Request, res: Response) => {
    const { name } = req.params;
    const models = Object.keys(context.db.models).map((key) => {
      return { name: key, model: context.db.models[key] };
    });
    const allModelRoutes = context.allRoutes.find((r) =>
      r.routeName.includes(name)
    );
    const foundModel = models.find(
      (m) => m.name.toLowerCase() === name.toLowerCase()
    );
    if (!foundModel)
      return res
        .status(404)
        .send({ message: `Model "${name}" not found` } as ErrorType);
    else
      return res.send({
        modelName: foundModel.name,
        fields: fieldParametersForSequelize(
          Object.values((foundModel.model as any).tableAttributes)
        ),
        routs: allModelRoutes,
      });
  };
