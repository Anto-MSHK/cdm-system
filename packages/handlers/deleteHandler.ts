import { HandlerType } from "./_types";
import { ErrorType } from "@configurators/routesConfigurator/_types";
import translate from "./../i18n/i18next";
import { v4 as uuidv4 } from "uuid";
import { logger } from "packages/logger";
import { matchedData } from "express-validator";
/**
 * Обработчик запроса на получение всех данных сущности
 */
export const deleteHandler: HandlerType = (context) => async (req, res) => {
  const { id } = matchedData(req, {
    includeOptionals: true,
    locations: ["params"],
  });
  const curModel = context?.curModel?.modelName as string;
  try {
    const candidate = await context.db.models[curModel].findOne({
      where: { id },
    });
    if (!candidate)
      return res.status(404).send({
        message: translate("not-found-record", { model: curModel }),
      } as ErrorType);
    await candidate?.destroy();
    return res.send(id);
  } catch (error) {
    logger.error(error);
    return res.status(500).send({
      message: translate("unknown"),
    } as ErrorType);
  }
};
