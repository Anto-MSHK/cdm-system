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

export default new Book();
