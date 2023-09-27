import {
  ATTRIBUTES_KEY,
  ENTITY_KEY,
  HAS_MANY_KEY,
  MODEL_CONFIG_KEY,
  HAS_ONE_KEY,
} from "@decorators/_constants";
import { FieldConfig, FieldType, ModelConfig } from "@decorators/models/_types";
import { Field } from "@decorators/models/field/field";
import { paramsForSequelize } from "packages/configurators/databaseConfigurator/utils/paramsForSequelize";

type Relation = {
  model: string;
  relation: typeof HAS_MANY_KEY | typeof HAS_ONE_KEY;
  linkFieldName: string;
};
export class Model {
  @Field({ type: FieldType.UUID })
  id?: string;

  relation(): string {
    return this._getConfig().modelName as string;
  }

  _getConfig(): ModelConfig & { _entity: string } {
    return {
      _entity: Reflect.getMetadata(ENTITY_KEY, this),
      ...Reflect.getMetadata(MODEL_CONFIG_KEY, this),
    };
  }

  _getAllFields(): {
    fields: { [key: string]: FieldConfig };
    hasOneModels: Relation[];
    hasManyModels: Relation[];
  } {
    const attributes = Reflect.getMetadata(ATTRIBUTES_KEY, this);
    const hasOneModels = Reflect.getMetadata(HAS_ONE_KEY, this);
    const hasManyModels = Reflect.getMetadata(HAS_MANY_KEY, this);
    return {
      fields: attributes,
      hasOneModels: hasOneModels || undefined,
      hasManyModels: hasManyModels || undefined,
    };
  }

  _getSequelizeConfig() {
    return paramsForSequelize(this);
  }
}
