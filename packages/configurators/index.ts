import { Model } from "@models/Model";

export interface AppConfiguratorConfig {
  database: {
    dialect: "postgres";
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
}

export async function AppConfigurator(
  models: Model[],
  config: AppConfiguratorConfig
) {}
