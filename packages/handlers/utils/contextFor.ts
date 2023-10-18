import { Request, Response } from "express";
import { ErrorType } from "../../configurators/routesConfigurator/_types";
import { ServerConfig } from "../../server/index";
import { HandlerType } from "packages/handlers/_types";
import translate from "../../i18n/i18next";
import _ from "lodash";

export const contextFor =
  (handler: HandlerType, config: ServerConfig, operId: string) =>
  async (req: Request, res: Response) => {
    let curEndpoint = undefined;
    let curRoute: string | undefined = undefined;
    let curModel: string | undefined = undefined;
    config.routes.forEach((route) => {
      const operations = Object.keys(route.operations).map((key) => {
        return route.operations[key];
      });
      const curOper = operations.find((oper) => oper.id === operId);
      if (curOper) {
        curEndpoint = curOper;
        curRoute = route.routeName;
        curModel = route.modelName;
      }
    });
    const curCdmModel = config.db.cdmModels.find(
      (m) => m._getConfig().modelName === curModel
    );
    const curModelConfig = curCdmModel?._getConfig();
    if (curEndpoint && curRoute)
      return handler({
        db: config.db,
        curRoute: { routeName: curRoute, operation: curEndpoint },
        curModel: curModel
          ? {
              modelName: curModel,
              modelLabel: curModelConfig
                ? curModelConfig.modelLabel
                : undefined,
            }
          : undefined,
        allRoutes: config.routes,
      })(req as any, res as any);
    else
      return res.status(500).send({
        message: translate("unknown"),
      } as ErrorType);
  };
