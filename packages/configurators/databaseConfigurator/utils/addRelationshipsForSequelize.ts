import { FieldType } from "@decorators/models/_types";
import { Model as ModelCDM } from "@models/Model";
import { DB } from "../_types";

export function addRelationshipsForSequelize(
  modelsDB: DB["models"],
  modelsCDM: ModelCDM[]
): void {
  for (let key in modelsDB) {
    const curModelCDM = modelsCDM.find((m) => m.relation() === key);
    const curModelDB = modelsDB[key];
    const hasOneModels = curModelCDM?._getAllFields().hasOneModels;
    const hasManyModels = curModelCDM?._getAllFields().hasManyModels;

    if (hasOneModels && hasOneModels.length > 0) {
      hasOneModels.forEach((m) => {
        if (m.model) {
          modelsDB[m.model].hasOne(curModelDB, {
            foreignKey: m.model.toLocaleLowerCase(),
          });
          curModelDB.belongsTo(modelsDB[m.model], {
            foreignKey: m.model.toLocaleLowerCase(),
          });
        } else throw new Error("Сопоставление связей невозможно.");
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
        } else throw new Error("Сопоставление связей невозможно.");
      });
    }
  }
}
