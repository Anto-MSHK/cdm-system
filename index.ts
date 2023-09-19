import "reflect-metadata";

import { ModelConfig } from "@decorators/models/modelConfig";
import { Field } from "@decorators/models/field";
import { FieldType } from "@decorators/_types";
import { ContactModel } from "@models/ContactModel";

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
