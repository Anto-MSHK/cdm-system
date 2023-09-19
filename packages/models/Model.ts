import {
  ATTRIBUTES_KEY,
  ENTITY_KEY,
  MODEL_CONFIG_KEY,
} from "@decorators/_constants";
import { FieldType } from "@decorators/_types";
import { Field } from "@decorators/models/field";

export class Model {
  @Field({ type: FieldType.STRING, unique: true, required: true })
  id: string | undefined;

  _getConfig() {
    return {
      _entity: Reflect.getMetadata(ENTITY_KEY, this),
      ...Reflect.getMetadata(MODEL_CONFIG_KEY, this),
    };
  }

  _getAllFields() {
    return Reflect.getMetadata(ATTRIBUTES_KEY, this);
  }
}
