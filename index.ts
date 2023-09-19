import "reflect-metadata";

import { Field } from "@decorators/models/field";
import {
  ATTRIBUTES_KEY,
  ENTITY_KEY,
  MODEL_CONFIG_KEY,
} from "@decorators/_constants";
import { FieldType } from "@decorators/_types";
import { ContactModel } from "packages/models/ContactModel";
import { ModelConfig } from "@decorators/models/modelConfig";

@ModelConfig()
class Book extends ContactModel {
  @Field({ type: FieldType.STRING })
  name: string | undefined;
  @Field({ type: FieldType.STRING })
  ISBN: string | undefined;
}

let book = new Book();

console.log(book._getConfig());
console.log(book._getAllFields());
