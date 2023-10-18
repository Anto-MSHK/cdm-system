import { usefulFieldsFromSequelize } from "@configurators/databaseConfigurator/utils/usefulFieldsFromSequelize";
import { HandlerType } from "packages/handlers/_types";

/**
 * Обработчик запроса на получение имнфорации о всех существующих моделях
 */
export const getModels: HandlerType = (context) => async (req, res) => {
  const models = Object.keys(context.db.models).map((key) => {
    return context.db.models[key];
  });
  const cdmModels = context.db.cdmModels;
  const curModels = await Promise.all(
    models.map(async (m) => {
      const curCdmModel = cdmModels.find(
        (cm) => cm._getConfig().modelName === m.name
      );
      return {
        modelLabel: curCdmModel?._getConfig().modelLabel,
        modelName: m.name,
        fields: usefulFieldsFromSequelize(
          Object.values((m as any).tableAttributes),
          curCdmModel?._getModelParams().fields as any
        ),
        count: await m.count(),
      };
    })
  );
  return res.send(curModels);
};
