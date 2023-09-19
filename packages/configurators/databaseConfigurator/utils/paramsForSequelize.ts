import { FieldType } from "@decorators/_types";
import { Model as ModelCDM } from "@models/Model";

import { DataTypes, Model, ModelAttributeColumnOptions } from "sequelize";

const TYPE_TABLE = {
  [FieldType.STRING]: DataTypes.STRING,
  [FieldType.NUMBER]: DataTypes.NUMBER,
  [FieldType.BOOLEAN]: DataTypes.BOOLEAN,
};

interface SequelizeModelParams {
  [key: string]: Partial<ModelAttributeColumnOptions<Model<any, any>>>;
}

const SPECIAL_CONFIG: SequelizeModelParams = {
  id: { primaryKey: true, autoIncrement: true },
};

export function paramsForSequelize(
  model: ModelCDM
): [string, SequelizeModelParams] {
  const modelName = model._getConfig().modelName as string;
  const fields = model._getAllFields();
  let sequelizeFields: SequelizeModelParams = {};

  for (let key in fields) {
    const curFieldConfig = fields[key];
    sequelizeFields[key] = {
      type: TYPE_TABLE[curFieldConfig.type],
      allowNull: !curFieldConfig.required,
      unique: curFieldConfig.unique,
      defaultValue: curFieldConfig.defaultValue,
      ...SPECIAL_CONFIG[key],
    };
  }

  return [modelName, sequelizeFields];
}
