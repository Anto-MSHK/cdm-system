import { usefulFieldsFromSequelize } from "@configurators/databaseConfigurator/utils/usefulFieldsFromSequelize";
import { ErrorType } from "@configurators/routesConfigurator/_types";
import { HandlerType } from "packages/handlers/_types";
import translate from "./../../i18n/i18next";

/**
 * Обработчик запроса на получение информации о модели и её роутах
 */
export const getModelByName: HandlerType = (context) => async (req, res) => {
  const { name } = req.params;
  const models = Object.keys(context.db.models).map((key) => {
    return { name: key, model: context.db.models[key] };
  });
  const allModelRoutes = context.allRoutes.find((r) =>
    r.routeName.includes(name.toLowerCase())
  );
  const foundModel = models.find(
    (m) => m.name.toLowerCase() === name.toLowerCase()
  );
  const cdmModels = context.db.cdmModels;
  const curCdmModel = cdmModels.find(
    (cm) => cm._getConfig().modelName === foundModel?.name
  );
  if (!foundModel)
    return res.status(404).send({
      message: translate("not-found-model", { model: name }),
    } as ErrorType);
  else
    return res.send({
      modelName: foundModel.name,
      modelLabel: curCdmModel?._getConfig().modelLabel,
      fields: usefulFieldsFromSequelize(
        Object.values((foundModel.model as any).tableAttributes),
        curCdmModel?._getModelParams().fields as any
      ),
      routs: allModelRoutes,
      count: await foundModel.model.count(),
    });
};
