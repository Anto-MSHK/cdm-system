import { HandlerType } from "./_types";
import { ErrorType } from "@configurators/routesConfigurator/_types";
import translate from "./../i18n/i18next";
import { v4 as uuidv4 } from "uuid";
/**
 * Обработчик запроса на получение всех данных сущности
 */
export const createHandler: HandlerType = (context) => async (req, res) => {
  const body = req.body;
  const curModel = context?.curModel?.modelName as string;
  try {
    const content = await context.db.models[curModel].create({
      id: uuidv4(),
      ...body,
    });
    return res.send(content);
  } catch (error) {
    return res.status(500).send({
      message: translate("unknown"),
    } as ErrorType);
  }
};
