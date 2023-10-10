import { fieldParametersForSequelize } from "@configurators/databaseConfigurator/utils/fieldParametersForSequelize";
import { HandlerType } from "packages/handlers/_types";

/**
 * Обработчик запроса на получение имнфорации о всех существующих моделях
 */
export const getModels: HandlerType = (context) => async (req, res) => {
  const models = Object.keys(context.db.models).map((key) => {
    return context.db.models[key];
  });
  return res.send(
    models.map((m) => ({
      modelName: m.name,
      fields: fieldParametersForSequelize(
        Object.values((m as any).tableAttributes)
      ),
    }))
  );
};
