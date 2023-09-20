import {
  ATTRIBUTES_KEY,
  ENTITY_KEY,
  MODEL_CONFIG_KEY,
} from "@decorators/_constants";
import { FieldConfig, FieldType, ModelConfig } from "@decorators/_types";
import { Field } from "@decorators/models/field";
import { paramsForSequelize } from "packages/configurators/databaseConfigurator/utils/paramsForSequelize";

export class Model {
  @Field({ type: FieldType.UUID })
  id?: string;

  _getConfig(): ModelConfig & { _entity: string } {
    return {
      _entity: Reflect.getMetadata(ENTITY_KEY, this),
      ...Reflect.getMetadata(MODEL_CONFIG_KEY, this),
    };
  }

  _getAllFields(): { [key: string]: FieldConfig } {
    return Reflect.getMetadata(ATTRIBUTES_KEY, this);
  }

  _getSequelizeConfig() {
    return paramsForSequelize(this);
  }
}
