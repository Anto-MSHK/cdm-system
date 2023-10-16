import { fieldParametersForSequelize } from "@configurators/databaseConfigurator/utils/fieldParametersForSequelize";
import { HandlerType } from "packages/handlers/_types";

/**
 * Обработчик запроса на получение имнфорации о всех существующих моделях
 */
export const getModels: HandlerType = (context) => async (req, res) => {
  const models = Object.keys(context.db.models).map((key) => {
    return context.db.models[key];
  });
  const curModels = await Promise.all(
    models.map(async (m) => ({
      modelName: m.name,
      fields: fieldParametersForSequelize(
        Object.values((m as any).tableAttributes)
      ),
      count: await m.count(),
    }))
  );
  return res.send(curModels);
};
