import { usefulFieldsFromSequelize } from "@configurators/databaseConfigurator/utils/usefulFieldsFromSequelize";
import { HandlerType } from "./_types";
import { ErrorType } from "@configurators/routesConfigurator/_types";
import { ModelCtor } from "sequelize-typescript";
import { getFindConfig } from "./utils/getFindConfig";

/**
 * Обработчик запроса на получение всех данных сущности
 */
export const getAllHandler: HandlerType = (context) => async (req, res) => {
  const curModel = context?.curModel?.modelName as string;
  let { include, exclude } = getFindConfig(context.db, curModel);

  const content = await context.db.models[curModel].findAll({
    include,
    attributes: { exclude },
  });

  return res.send(content);
};
