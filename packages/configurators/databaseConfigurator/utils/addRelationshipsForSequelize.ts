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
    const onlyOneAtModels = curModelCDM?._getAllFields().onlyOneAtModels;
    const manyAtModels = curModelCDM?._getAllFields().manyAtModels;

    if (onlyOneAtModels && onlyOneAtModels.length > 0) {
      onlyOneAtModels.forEach((m) => {
        if (m.model) {
          modelsDB[m.model].hasMany(curModelDB, {
            foreignKey: m.linkFieldName,
          });
          curModelDB.belongsTo(modelsDB[m.model], {
            foreignKey: m.linkFieldName,
          });
        } else throw new Error("Сопоставление связей невозможно.");
      });
    }
    if (manyAtModels && manyAtModels.length > 0) {
      manyAtModels.forEach((m) => {
        if (m.model) {
          const through = `${m.model}${key}s`;
          modelsDB[m.model].belongsToMany(curModelDB, {
            through,
          });
          curModelDB.belongsToMany(modelsDB[m.model], {
            through,
          });
        } else throw new Error("Сопоставление связей невозможно.");
      });
    }
  }
}
