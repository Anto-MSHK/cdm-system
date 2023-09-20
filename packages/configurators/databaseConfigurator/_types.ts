import { Sequelize } from "sequelize";
import { ModelCtor } from "sequelize-typescript";

export interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  models: { [key: string]: ModelCtor };
}
