import { Model } from "@models/Model";
import { AppConfiguratorConfig } from "..";
import { ModelCtor } from "sequelize-typescript";
import { DB } from "./_types";
import { Sequelize } from "sequelize";

export function DatabaseConfigurator(
  models: Model[],
  config: AppConfiguratorConfig["database"]
): DB {
  let db: DB = {
    sequelize: new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        dialect: config.dialect,
        host: config.host,
      }
    ),
    Sequelize: Sequelize,
    models: {},
  };

  models.forEach((model) => {
    const [modelName, fields] = model._getSequelizeConfig();
    db.models[modelName] = db.sequelize.define(
      modelName,
      fields as any
    ) as ModelCtor;
  });

  return db;
}
