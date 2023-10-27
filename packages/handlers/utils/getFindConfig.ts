import { usefulFieldsFromSequelize } from "@configurators/databaseConfigurator/utils/usefulFieldsFromSequelize";
import { ModelCtor } from "sequelize-typescript";
import { DB } from "@configurators/databaseConfigurator/_types";

export function getFindConfig(db: DB, modelName: string) {
  const fields = usefulFieldsFromSequelize(
    Object.values((db.models[modelName] as any).tableAttributes)
  );
  const models = Object.values(db.models);

  let include: ModelCtor[] = [],
    exclude: string[] = [];

  fields.forEach((f) => {
    if (f.references) {
      include.push(
        models.find((m) => m.tableName === f.references?.model) as ModelCtor
      );
      exclude.push(f.fieldName);
    }
  });
  return { include, exclude };
}
