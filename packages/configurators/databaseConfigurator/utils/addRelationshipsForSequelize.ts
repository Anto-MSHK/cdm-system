import { FieldType } from "@decorators/models/_types";
import { Model as ModelCDM } from "@models/Model";
import { DB } from "../_types";
import { logger } from "packages/logger";

export function addRelationshipsForSequelize(
  modelsDB: DB["models"],
  modelsCDM: ModelCDM[]
): void {
  try {
    for (let key in modelsDB) {
      const curModelCDM = modelsCDM.find((m) => m._relation() === key);
      const curModelDB = modelsDB[key];
      const hasOneModels = curModelCDM?._getModelParams().hasOneModels;
      const hasManyModels = curModelCDM?._getModelParams().hasManyModels;

      if (hasOneModels && hasOneModels.length > 0) {
        hasOneModels.forEach((m) => {
          if (m.model) {
            modelsDB[m.model].hasOne(curModelDB, {
              foreignKey: m.model.toLocaleLowerCase(),
            });
            curModelDB.belongsTo(modelsDB[m.model], {
              foreignKey: m.model.toLocaleLowerCase(),
            });
          } else
            throw new Error(
              "It is not possible to compare relationships between models"
            );
        });
      }
      if (hasManyModels && hasManyModels.length > 0) {
        hasManyModels.forEach((m) => {
          if (m.model) {
            curModelDB.hasMany(modelsDB[m.model], {
              foreignKey: key.toLowerCase(),
            });
            modelsDB[m.model].belongsTo(curModelDB, {
              foreignKey: key.toLowerCase(),
            });
          } else
            throw new Error(
              "It is not possible to compare relationships between models"
            );
        });
      }
    }
  } catch (error) {
    logger.error(error);
  }
}
