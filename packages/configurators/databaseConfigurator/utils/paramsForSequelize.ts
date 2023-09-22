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
  [FieldType.NUMBER]: DataTypes.NUMBER,
  [FieldType.BOOLEAN]: DataTypes.BOOLEAN,
};

interface SequelizeModelParams {
  [key: string]: Partial<ModelAttributeColumnOptions<Model<any, any>>>;
}

const SPECIAL_CONFIG: SequelizeModelParams = {
  id: {
    primaryKey: true,
    allowNull: false,
    //  defaultValue: Sequelize.fn("uuid_generate_v4"),
  },
};

export function paramsForSequelize(
  model: ModelCDM
): [string, SequelizeModelParams] {
  const modelName = model._getConfig().modelName as string;
  const onlyOneAtRels = model._getAllFields().onlyOneAtModels;
  const manyAtRels = model._getAllFields().manyAtModels;
  const fields = model._getAllFields().fields;
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
