import { HandlerType } from "./_types";
import { ErrorType } from "@configurators/routesConfigurator/_types";
import translate from "./../i18n/i18next";
import { v4 as uuidv4 } from "uuid";
import { logger } from "packages/logger";
import { matchedData } from "express-validator";
/**
 * Обработчик запроса на получение всех данных сущности
 */
export const updateHandler: HandlerType = (context) => async (req, res) => {
  const { id } = matchedData(req, {
    includeOptionals: true,
    locations: ["params"],
  });
  const body = matchedData(req, {
    includeOptionals: true,
    locations: ["body"],
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

    await Promise.all(
      Object.entries(body).map(async (param) => {
        if (param[1] === "00000000-0000-0000-0000-000000000000") {
          await candidate?.update({ [param[0]]: null });
        } else await candidate?.update({ [param[0]]: param[1] });
      })
    );

    await candidate.reload();
    return res.send(candidate);
  } catch (error) {
    logger.error(error);
    return res.status(500).send({
      message: translate("unknown"),
    } as ErrorType);
  }
};
