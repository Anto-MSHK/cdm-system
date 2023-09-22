import {
  ATTRIBUTES_KEY,
  ENTITY_KEY,
  MANY_AT_KEY,
  MODEL_CONFIG_KEY,
  ONLY_ONE_AT_KEY,
} from "@decorators/_constants";
import { FieldConfig, FieldType, ModelConfig } from "@decorators/models/_types";
import { Field } from "@decorators/models/field/field";
import { paramsForSequelize } from "packages/configurators/databaseConfigurator/utils/paramsForSequelize";

type Relation = {
  model: string;
  relation: typeof MANY_AT_KEY | typeof ONLY_ONE_AT_KEY;
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
    onlyOneAtModels: Relation[];
    manyAtModels: Relation[];
  } {
    const attributes = Reflect.getMetadata(ATTRIBUTES_KEY, this);
    const onlyOneAtModels = Reflect.getMetadata(ONLY_ONE_AT_KEY, this);
    const manyAtModels = Reflect.getMetadata(MANY_AT_KEY, this);
    return {
      fields: attributes,
      onlyOneAtModels: onlyOneAtModels || undefined,
      manyAtModels: manyAtModels || undefined,
    };
  }

  _getSequelizeConfig() {
    return paramsForSequelize(this);
  }
}
