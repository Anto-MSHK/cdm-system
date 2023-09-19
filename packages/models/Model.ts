import {
  ATTRIBUTES_KEY,
  ENTITY_KEY,
  MODEL_CONFIG_KEY,
} from "@decorators/_constants";
import { FieldConfig, FieldType, ModelConfig } from "@decorators/_types";
import { Field } from "@decorators/models/field";

export class Model {
  @Field({ type: FieldType.NUMBER })
  id?: number;

  _getConfig(): ModelConfig & { _entity: string } {
    return {
      _entity: Reflect.getMetadata(ENTITY_KEY, this),
      ...Reflect.getMetadata(MODEL_CONFIG_KEY, this),
    };
  }

  _getAllFields(): { [key: string]: FieldConfig } {
    return Reflect.getMetadata(ATTRIBUTES_KEY, this);
  }
}
