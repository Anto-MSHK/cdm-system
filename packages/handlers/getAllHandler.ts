import { HandlerType } from "./_types";
import { ErrorType } from "@configurators/routesConfigurator/_types";

/**
 * Обработчик запроса на получение всех данных сущности
 */
export const getAllHandler: HandlerType = (context) => async (req, res) => {
  const curModel = context?.curModel?.modelName as string;
  const content = await context.db.models[curModel].findAll();
  return res.send(content);
};
