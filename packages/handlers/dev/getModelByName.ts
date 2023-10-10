import { fieldParametersForSequelize } from "@configurators/databaseConfigurator/utils/fieldParametersForSequelize";
import { ErrorType } from "@configurators/routesConfigurator/_types";
import { HandlerType } from "packages/handlers/_types";

/**
 * Обработчик запроса на получение информации о модели и её роутах
 */
export const getModelByName: HandlerType = (context) => async (req, res) => {
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
