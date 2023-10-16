import { HandlerType } from "./_types";
import { ErrorType } from "@configurators/routesConfigurator/_types";
import { matchedData } from "express-validator";
import translate from "packages/i18n/i18next";

/**
 * Обработчик запроса на получение записи сущности
 */
export const getOneHandler: HandlerType = (context) => async (req, res) => {
  const { id } = matchedData(req, {
    includeOptionals: true,
    locations: ["params"],
  });
  const curModel = context?.curModel?.modelName as string;
  const content = await context.db.models[curModel].findOne({
    where: { id },
  });
  if (content) return res.send(content);
  else
    return res.status(404).send({
      message: translate("not-found-record", { model: curModel }),
    } as ErrorType);
};
