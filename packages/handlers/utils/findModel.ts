import { DB } from "@configurators/databaseConfigurator/_types";
import { Model } from "@models/Model";
import { ModelCtor } from "sequelize-typescript";

export function findModel(
  db: DB,
  name: string
): [
  (
    | {
        name: string;
        model: ModelCtor;
      }
    | undefined
  ),
  Model | undefined
] {
  const models = Object.keys(db.models).map((key) => {
    return { name: key, model: db.models[key] };
  });
  const foundModel = models.find(
    (m) => m.name.toLowerCase() === name.toLowerCase()
  );
  const cdmModels = db.cdmModels;
  const curCdmModel = cdmModels.find(
    (cm) => cm._getConfig().modelName === foundModel?.name
  );

  return [foundModel, curCdmModel];
}
