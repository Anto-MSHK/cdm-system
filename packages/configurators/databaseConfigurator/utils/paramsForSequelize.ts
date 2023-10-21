import { FieldType } from "@decorators/models/_types";
import { Model as ModelCDM } from "@models/Model";

import {
  DataTypes,
  Model,
  ModelAttributeColumnOptions,
  Sequelize,
} from "sequelize";

const TYPE_TABLE = {
  [FieldType.UUID]: DataTypes.UUID,
  [FieldType.STRING]: DataTypes.STRING,
  [FieldType.NUMBER]: DataTypes.INTEGER,
  [FieldType.BOOLEAN]: DataTypes.BOOLEAN,
  [FieldType.DATE]: DataTypes.DATE,
};

interface SequelizeModelParams {
  [key: string]: Partial<ModelAttributeColumnOptions<Model<any, any>>>;
}

const SPECIAL_CONFIG: SequelizeModelParams = {
  id: {
    primaryKey: true,
    allowNull: false,
  },
};

export function paramsForSequelize(
  model: ModelCDM
): [string, SequelizeModelParams] {
  const modelName = model._getConfig().modelName as string;
  const fields = model._getModelParams().fields;
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
