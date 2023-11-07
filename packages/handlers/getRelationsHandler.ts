import { HandlerType } from "./_types";
import { ErrorType } from "@configurators/routesConfigurator/_types";
import translate from "../i18n/i18next";
import { v4 as uuidv4 } from "uuid";
import { logger } from "packages/logger";
import { matchedData } from "express-validator";
import { usefulFieldsFromSequelize } from "@configurators/databaseConfigurator/utils/usefulFieldsFromSequelize";
import { findModel } from "./utils/findModel";
import { capitalizeFirstLetter } from "./../utils/capitalizeFirstLetter/capitalizeFirstLetter";
/**
 * Обработчик запроса на получение всех данных сущности
 */
export const getRelationsHandler: HandlerType =
  (context) => async (req, res) => {
    const { name } = matchedData(req, {
      includeOptionals: true,
      locations: ["params"],
    });
    const [foundModel, curCdmModel] = findModel(
      context.db,
      context.curModel?.modelName as string
    );

    if (!foundModel)
      return res.status(404).send({
        message: translate("not-found-model", {
          model: context.curModel?.modelName,
        }),
      } as ErrorType);

    const model = usefulFieldsFromSequelize(
      Object.values((foundModel.model as any).tableAttributes),
      curCdmModel?._getModelParams().fields as any
    );

    const references = model
      .map((param) => {
        if (param.references) return param;
        else return undefined;
      })
      .filter((param) => param !== undefined);

    const curReferenceModel = references.find((ref) =>
      ref?.fieldName.toLowerCase().includes(name.toLowerCase())
    )?.references?.model;

    if (!curReferenceModel)
      return res.status(404).send({
        message: translate("not-found-model", {
          model: name,
        }),
      } as ErrorType);

    const content = await context.db.models[
      capitalizeFirstLetter(name)
    ].findAll();

    return res.send(content);
  };
