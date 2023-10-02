import { HandlerParams } from "@configurators/routesConfigurator/_types";
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
